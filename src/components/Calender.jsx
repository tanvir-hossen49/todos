import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateTodoDrawer from "./CreateTodoDrawer";
import { getToday } from "@/utilities/getToday";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Calendar = ({ weeksName, getWeekDays, currentDate, currentMonth, currentYear }) => {
  const [properties, setProperties] = useState([]);
  const [todiesTodo, setTodiesTodo] = useState([]);
  const [clickDay, setClickDay] = useState(currentDate);
  const [todoDate, setTodoDate] = useState(currentDate);

  useEffect(() => {
    setTodoDate(getToday(clickDay, currentMonth + 1, currentYear))
  }, [clickDay])

  useEffect(() => {
    try {
        const allTodo = JSON.parse(localStorage.getItem("Todos")) || [];
        setProperties(allTodo);
    } catch (error) {
        console.error("Failed to load todos from local storage:", error);
    }
  }, []);

  const getTodos = (date) => {
    date = getToday(date, currentMonth + 1, currentYear);     
    const todo = properties.filter(todo => todo.date === date);
    return todo;
  }

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
                    <div className="invisible group-hover:visible" onClick={() => {
                      setClickDay(date.day)
                    }}>
                      <CreateTodoDrawer todoDate={todoDate}/>
                    </div>

                    <div className="ml-auto text-base">
                      {date.day === new Date().getDate() && currentDate.getMonth() === currentMonth ? (
                        <>
                          <div className="flex justify-center items-center w-7 h-7 bg-white dark:bg-[#b15a27] rounded-full">
                            <span>{date.day}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {date.day}
                          <div>{date.day === 1 && date.monthName}</div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    {
                      properties.length !== 0 && getTodos(date.day).map((todo) => 
                        <div key={todo.id} className="mr-2">
                          <div className="mb-4 rounded-[6px] p-2 dark:bg-[#2f2f2f]">
                            <h3>{todo.title}</h3>
                              {
                                todo.todos.map(todo => 
                                  <div className='flex mt-2 items-center space-x-2 w-full'>
                                    <Checkbox 
                                      id={todo.level} 
                                      checked={todo.isChecked} 
                                    />
                                    <Label htmlFor={todo.level} className="cursor-pointer w-full">
                                      {todo.level}
                                    </Label>
                                  </div>
                                )
                              }
                          </div>
                        </div>
                      )
                    }
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
