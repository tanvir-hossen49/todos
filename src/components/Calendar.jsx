import { lazy, Suspense } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import TasksSkeleton from "./Skeleton/TasksSkeleton";

const Tasks = lazy(() => import("./Tasks"));
const DrawerComponent = lazy(() => import("./DrawerComponent"));

const Calendar = ({ days, currentDate }) => {
  const tasks = useSelector((state) => state.todos);

  const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const findTaskForDate = (date) => tasks.tasks[date] || [];

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
            {days.map((day) => (
              <TableCell
                key={day}
                className="h-full align-top p-2 group" 
                style={{ width: `${100 / 7}%` }}
              >
                <>
                  <div className="flex justify-between items-center">
                    <div className="invisible group-hover:visible">
                      <Suspense fallback={<div>Loading...</div>}>
                        <DrawerComponent date={format(day, 'd-M-yyyy')} />
                      </Suspense>
                    </div>

                    <div className="ml-auto text-base">
                      { format(day, 'd') === format(currentDate, 'd') &&
                        format(day, 'M') === format(currentDate, 'M') ? 
                        <div className="flex justify-center items-center w-7 h-7 bg-white dark:bg-[#b15a27] rounded-full">
                          {format(day, 'd')}
                        </div> 
                        : format(day, 'd') === "1" ? <div>
                          {format(day, 'MMM-d')}
                        </div> :
                        <div> {format(day, 'd')} </div>} 
                    </div>
                  </div>

                  <div>
                    {findTaskForDate(format(day, 'd-M-yyyy')).map((task) => (
                      <Suspense fallback={<TasksSkeleton />}>
                        <Tasks 
                          task={task}
                          date={format(day,'d-M-yyyy')}
                        />
                      </Suspense>
                    ))}
                  </div>
                </>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Calendar;
