import { lazy, Suspense } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import TasksSkeleton from "@/components/Skeleton/TasksSkeleton";
import DrawerComponent from "@/components/Drawer/DrawerComponent";
import useWeekDays from "@/hooks/useWeekDays";

const Task = lazy(() => import("@/components/Task/Task"));

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const tasks = useSelector((state) => state.todos);
  const weekDays = useWeekDays();

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
          className="flex justify-center items-center w-6 h-6 bg-white 
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
          <TableHeader className="sticky top-0 z-10">
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
              {weekDays.map((day) => {
                const formattedDate = format(day, 'd-M-yyyy');

                return (
                <TableCell
                  key={formattedDate}
                  className="h-full align-top p-2 group" 
                  style={{ width: `${100 / 7}%`}}
                >
                  <>
                    <div className="flex justify-between items-center">
                      <div
                        className="md:opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const button = e.target.querySelector("button");
                            if (button) {
                              button.click();
                            }
                          }}}
                      >
                        <DrawerComponent date={formattedDate} />
                      </div>
                      <div className="ml-auto text-sm">
                        {renderDateLabel(day)} 
                      </div>
                    </div>

                    <div>
                      {findTaskForDate(formattedDate).map((task, index) => (
                        <Suspense key={index} fallback={<TasksSkeleton />}>
                          <Task 
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
