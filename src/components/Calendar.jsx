import { lazy, Suspense } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import TasksSkeleton from "./Skeleton/TasksSkeleton";
import DrawerComponent from "./DrawerComponent";

const Tasks = lazy(() => import("./Tasks"));

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ days }) => {
  const tasks = useSelector((state) => state.todos);
  const currentDate = new Date();

  const findTaskForDate = (date) => tasks.tasks[date] || [];
  
  const isCurrentDate = (day) => {
    return format(day, 'd') === format(currentDate, 'd') &&
    format(day, 'M') === format(currentDate, 'M');
  }

  const formatDayLabel = (date) => {
    const day = format(date, 'd');
    if (day === "1") {
      return format(date, 'MMM-d');
    }

    return day;
  };

  const renderDateLabel = (day) => {
    if (isCurrentDate(day)) {
      return (
        <div 
          className="flex justify-center items-center w-7 h-7 bg-white 
          dark:bg-[#b15a27] rounded-full"
        >
          {format(day, 'd')}
        </div>
      );
    }
    return <div>{formatDayLabel(day)}</div>;
  };

  return (
    <div className="mt-5">
      <Table className="w-full">
        <TableHeader className="sticky top-0 dark:bg-[#1a1a1a] dark:text-[#ffffff70] z-10">
          <TableRow>
            {WEEKDAY_NAMES.map((name) => (
              <TableHead key={name} className="text-center">
                {name}
              </TableHead>  
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="h-[calc(100vh-70px)]">
            {days.map((day) => {
              const formattedDate = format(day, 'd-M-yyyy');

              return (
              <TableCell
                key={formattedDate}
                className="h-full align-top p-2 group" 
                style={{ width: `${100 / 7}%` }}
              >
                <>
                  <div className="flex justify-between items-center">
                    <div className="invisible group-hover:visible">
                      <DrawerComponent date={formattedDate} />
                    </div>

                    <div className="ml-auto text-base">
                      {renderDateLabel(day)} 
                    </div>
                  </div>

                  <div>
                    {findTaskForDate(formattedDate).map((task, index) => (
                      <Suspense key={index} fallback={<TasksSkeleton />}>
                        <Tasks 
                          task={task}
                          date={formattedDate}
                        />
                      </Suspense>
                    ))}
                  </div>
                </>
              </TableCell>
            )})}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Calendar;
