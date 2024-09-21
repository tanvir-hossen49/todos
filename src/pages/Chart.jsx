import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Chart = () => {
    const { startOfWeek } = useSelector((state) => state.calendar);
    const tasks = useSelector((state) => state.todos.tasks); 

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const days = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));

        const data = WEEKDAY_NAMES.map((name, i) => {
            const date = format(days[i], 'd-M-yyyy');
            let totalTodo = 0;
            let completedTodo = 0;
            
            if (tasks[date]) {
                tasks[date].forEach((task) => {
                    totalTodo += task.todos.length;
                    completedTodo += task.todos.filter(todo => todo.isChecked).length;
                });
            }

            return {
                day: name,
                totalTodo,
                completedTodo,
            };
        });
        setChartData(data);
    }, [startOfWeek, tasks]);

    const chartConfig = {
        totalTodo: {
            label: "Total Todo",
            color: "#2563eb",
        },
        completedTodo: {
            label: "Completed Todo",
            color: "#60a5fa",
        },
    };

    return (
        <div>
            <h1 className="my-6 text-center text-xl font-bold">Todos Per Week</h1>

            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart data={chartData} width={500} height={300}>

                    <YAxis dataKey="totalTodo" 
                        label={{ value: 'Total Todos', angle: -90, position: 'insideLeft' }}
                    />
                    
                    <XAxis dataKey="day" tickMargin={10} />

                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    
                    <Bar dataKey="totalTodo" fill="var(--color-totalTodo)" radius={4} />
                    <Bar dataKey="completedTodo" fill="var(--color-completedTodo)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default Chart;
