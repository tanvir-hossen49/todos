import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toggleCheckBox } from "@/store/todoSlice";
import { useDispatch } from 'react-redux';
import DrawerComponent from "./DrawerComponent";

const Tasks = ({ task, date }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = (todoId) => {
    dispatch(toggleCheckBox({ date, id: todoId }));
  };

  return (
    <div className="mr-2">
      <div className="mb-4 min-w-[150px] overflow-auto rounded-[6px] p-2 bg-white dark:bg-[#2f2f2f]">
        <DrawerComponent date={date} task={task} />

        {task.todos.map(({ id, isChecked, level }) => (
          <div key={id} className="flex mt-2 items-center space-x-2 w-full">
            <div className={`w-4 h-4 border-2 rounded
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


            <Label htmlFor={id} className="cursor-pointer font-normal w-full">
              {level}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
