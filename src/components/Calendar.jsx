import { lazy, Suspense } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { formateDate } from "@/utilities/formateDate";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCheckBox } from "@/store/todoSlice";

const TodoDrawer = lazy(() => import('./TodoDrawer'));

const Calendar = ({ weeksName, getWeekDays, currentDate, currentMonth, currentYear }) => {
  const dispatch = useDispatch();
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
                      <Drawer>
                        <DrawerTrigger>
                          <Button 
                            className="dark:bg-[#202020]"
                            variant="outline" 
                            size="icon"
                            aria-label="Create a new todo"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <Suspense fallback={<div>Loading...</div>}>
                            <TodoDrawer date={formateDate(date.day, currentMonth + 1, currentYear)} />
                          </Suspense>
                        </DrawerContent>
                      </Drawer>
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
                      <div key={task.title} className="mr-2">
                        <div className="mb-4 rounded-[6px] p-2 bg-white dark:bg-[#2f2f2f]">
                          <Drawer>
                            <DrawerTrigger className="w-full">
                              <h3>{task.title}</h3>
                            </DrawerTrigger>

                            <DrawerContent>
                              <Suspense fallback={<div>Loading...</div>}>
                                <TodoDrawer
                                  date={formateDate(date.day, currentMonth + 1, currentYear)}
                                  task={task}
                                />
                              </Suspense>
                            </DrawerContent>
                          </Drawer>

                          {task.todos.map(todo => (
                            <div key={todo.id} className='flex mt-2 items-center space-x-2 w-full'>
                              <Checkbox 
                                id={todo.id} 
                                checked={todo.isChecked}
                                onClick={() => dispatch(toggleCheckBox(
                                  { 
                                    date: formateDate(date.day, currentMonth + 1, currentYear),
                                    id: todo.id 
                                  }
                                ))}
                              />
                              <Label htmlFor={todo.id} className="cursor-pointer w-full">
                                {todo.level}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
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
