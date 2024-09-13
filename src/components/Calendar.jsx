import { lazy, Suspense } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { formateDate } from "@/utilities/formateDate";
import { useSelector } from "react-redux";
import DrawerComponent from "./DrawerComponent";
const Tasks = lazy(() => import("./Tasks"));

const Calendar = ({ weeksName, getWeekDays, currentDate, currentMonth, currentYear }) => {
  const tasks = useSelector((state) => state.todos);
  
  const findTaskForDate = (date) => tasks.tasks[date] || [];  

  return (
    <div className="mt-5">
      <Table className="w-full">
        <TableHeader className="sticky top-0 dark:bg-[#1a1a1a] dark:text-[#ffffff70] z-10">
          <TableRow>
            {weeksName.map((name) => (
              <TableHead key={name} className="text-center">
                {name}
              </TableHead>  
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="h-[calc(100vh-70px)]">
            {getWeekDays().map((date) => (
              <TableCell
                key={date.day}
                className="h-full align-top p-2 group" 
                style={{ width: `${100 / 7}%` }}
              >
                <>
                  <div className="flex justify-between items-center">
                    <div className="invisible group-hover:visible">
                      <DrawerComponent date={formateDate(date.day, currentMonth + 1, currentYear)} />
                    </div>

                    <div className="ml-auto text-base">
                      {date.day === new Date().getDate() && currentDate.getMonth() === currentMonth ? (
                        <div className="flex justify-center items-center w-7 h-7 bg-white dark:bg-[#b15a27] rounded-full">
                          <span>{date.day}</span>
                        </div>
                      ) : (
                        <>
                          {date.day}
                          <div>{date.day === 1 && date.monthName}</div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    {findTaskForDate(formateDate(date.day, currentMonth + 1, currentYear)).map((task) => (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Tasks 
                          task={task}
                          date={formateDate(date.day, currentMonth + 1, currentYear)}
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
