import BarChartComponent from "@/components/charts/BarChartComponent";
import PieChartComponent from "@/components/charts/PieChartComponent";

const Chart = () => {
    return (
        <div>
            <h1 className="my-6 text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1e5ee8] to-[#6babf9] p-4">
                Todos Per Week
            </h1>


            <div  className="flex justify-center items-center">
                <BarChartComponent />
                <PieChartComponent />
            </div>
        </div>
    );
};

export default Chart;
