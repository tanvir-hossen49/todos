import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toggleCheckBox } from "@/store/todoSlice";
import { useDispatch } from 'react-redux';
import DrawerComponent from "./DrawerComponent";

const Tasks = ({ task, date }) => {
    const dispatch = useDispatch();

    return (
        <div key={task.title} className="mr-2">
            <div className="mb-4 rounded-[6px] p-2 bg-white dark:bg-[#2f2f2f]">
                <DrawerComponent date={date} task={task}/>

                {task.todos.map(todo => (
                    <div key={todo.id} className='flex mt-2 items-center space-x-2 w-full'>
                        <Checkbox 
                            id={todo.id} 
                            checked={todo.isChecked}
                            onClick={() => dispatch(toggleCheckBox(
                                { 
                                    date: date,
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
    );
};

export default Tasks;