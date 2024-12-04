import { toggleCheckBox } from "@/store/todoSlice";
import { useDispatch } from 'react-redux';
import DrawerComponent from "../Drawer/DrawerComponent";

const Tasks = ({ task, date }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = (todoId) => {
    dispatch(toggleCheckBox({ date, id: todoId }));
  };

  return (
    <div className="mr-2">
      <div className="mb-4 min-w-[150px] overflow-auto rounded-[6px] p-2
        dark:shadow-[1px_1px_0px_3px_rgba(0,_255,_255,_0.1)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
      >
        <DrawerComponent date={date} task={task} />

        {task.todos.map(({ id, isChecked, level }) => (
          <div 
            key={id} 
            className="flex mt-2 items-center space-x-2 w-full"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCheckboxClick(id)}
            onClick={() => handleCheckboxClick(id)}
          >
            <div 
              role="checkbox"
              aria-label="checkbox"
              aria-checked={isChecked}
              id={id}
              className={`w-5 h-[18px] border-2 rounded
              ${isChecked ? "bg-green-500 border-green-500" : "border-red-500"}
              transition-colors duration-300`}
            >
            </div>
            
            <div className="cursor-pointer font-normal w-full" >
              {level}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
