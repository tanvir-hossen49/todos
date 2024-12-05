import { toggleCheckBox } from "@/store/todoSlice";
import { useDispatch } from 'react-redux';
import DrawerComponent from "../Drawer/DrawerComponent";
import TodoItem from "./TodoItem";

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
          <TodoItem
            key={id}
            id={id}
            isChecked={isChecked}
            level={level}
            onCheckboxClick={handleCheckboxClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
