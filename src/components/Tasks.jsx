import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toggleCheckBox } from "@/store/todoSlice";
import { lazy, Suspense } from "react";
import { useDispatch } from 'react-redux';

const DrawerComponent = lazy(() => import("./DrawerComponent"));

const Tasks = ({ task, date }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = (todoId) => {
    dispatch(toggleCheckBox({ date, id: todoId }));
  };

  return (
    <div className="mr-2">
      <div className="mb-4 min-w-[160px] max-w-72 resize-x overflow-auto rounded-[6px] p-2 bg-white dark:bg-[#2f2f2f]">
        <Suspense fallback={<div>Loading...</div>}>
          <DrawerComponent date={date} task={task} />
        </Suspense>

        {task.todos.map(({ id, isChecked, level }) => (
          <div key={id} className="flex mt-2 items-center space-x-2 w-full">
            <div className={`w-5 h-5 border-2 rounded 
              ${isChecked ? "bg-green-700 border-green-500" : "bg-red-700 border-red-500"}
              transition-colors duration-300`}
            >
              <Checkbox
                id={id}
                checked={isChecked}
                onClick={() => handleCheckboxClick(id)}
                className="cursor-pointer opacity-0"
              />
            </div>


            <Label htmlFor={id} className="cursor-pointer w-full">
              {level}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
