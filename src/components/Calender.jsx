import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateTodoDrawer from "./CreateTodoDrawer";

const Calendar = ({ weeksName, getWeekDays, currentDate, currentMonth }) => {

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
                className="h-full text-right align-top p-2 group" 
                style={{ width: `${100 / 7}%` }}
              >
                <div className="flex justify-between items-center">
                  <div className="invisible group-hover:visible"> 
                    <CreateTodoDrawer />
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
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Calendar;
