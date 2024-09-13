import { Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const CalendarSkeleton = () => {
  const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
          <TableRow className="h-[calc(100vh-70px)]"></TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CalendarSkeleton;