import { Label, Pie, PieChart, Sector } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import useWeekDays from "@/hooks/useWeekDays";

const PieChartComponent = () => {
    const tasks = useSelector((state) => state.todos.tasks);
    const weekDays = useWeekDays();
    const [totalTodo, setTotalTodo] = useState(0);
    const [completedTodo, setCompletedTodo] = useState(0);

    useEffect(() => {
        let total = 0;
        let completed = 0;

        weekDays.forEach((day) => {
            const date = format(day, 'd-M-yyyy');
            
            if (tasks[date]) {
                tasks[date].forEach((task) => {
                    total += task.todos.length;
                    completed += task.todos.filter(todo => todo.isChecked).length;
                });
            }
        });

        // Update the state after completing the loop
        setTotalTodo(total);
        setCompletedTodo(completed);
    }, [tasks, weekDays]);

    // Updated chart data using dynamic values
    const chartData = [
        { name: "CompletedTodos", total: completedTodo, fill: "#60a5fa" },
        { name: "TotalTodos", total: totalTodo, fill: "#2563eb" },
    ];   

    const chartConfig = {
        CompletedTodos: {
            label: "Completed Todo",
        },TotalTodos: {
            label: "Total Todo",
        }
    };

    return (
        <div className="flex-1">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <PieChart
                    width={300}
                    height={300}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />

                    <Pie
                        data={chartData}
                        dataKey="total"
                        nameKey="name"
                        innerRadius={80}
                        strokeWidth={5}
                        activeIndex={0}
                        activeShape={({
                            outerRadius = 0,
                            ...props
                        }) => (
                            <Sector {...props} outerRadius={outerRadius + 10} />
                        )}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle" // Ensure proper vertical alignment
                                        >
                                        <tspan
                                            x={viewBox.cx}
                                            dy="-0.6em" // Adjusts the first text to appear slightly above center
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {totalTodo.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            dy="1.2em" // Spacing for the second line below the first
                                            className="fill-muted-foreground text-lg"
                                        >
                                            Total Todos
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            dy="1.2em" // Spacing for the third line below the second
                                            className="fill-muted-foreground text-lg"
                                        >
                                            {completedTodo.toLocaleString()} Completed
                                        </tspan>
                                        </text>
                                    );
                                }
                            }}
                        />

                    </Pie>

                    <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
            </ChartContainer>
        </div>
    );
};

export default PieChartComponent;
