import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Calender = ({
  weeksName,
  getWeekDays,
  currentDate,
  currentMonth,
}) => {
  return (
    <div className="mt-5">
      <Table className="">
        <TableHeader className="dark:text-[#ffffff70]">
          <TableRow>
            {weeksName.map(name => (
              <TableHead key={name} className="text-center">
                {name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="h-full">
            {getWeekDays().map((date) => (
              <TableCell
                key={date.day}
                className="h-[100vh] w-full text-right align-top p-2"
                style={{ height: '100vh', width: `${100 / getWeekDays().length}%` }} // Distribute equal space
              >
                {date.day === new Date().getDate() && currentDate.getMonth() === currentMonth ? (
                  <div className="flex justify-center items-center w-6 h-6 bg-white dark:bg-[#b15a27] rounded-full ml-auto">
                    <span>{date.day}</span>
                  </div>
                ) : (
                  <>
                    {date.day}
                    <div>{date.day === 1 ? date.monthName : ""}</div>
                  </>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>


      </Table>
    </div>
  );
};

export default Calender;
