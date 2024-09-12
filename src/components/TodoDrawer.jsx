import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import CreateTodoForm from "./CreateTodoForm";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setTasks, updateTask } from "@/store/todoSlice";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const TodoDrawer = ({ date, task }) => {
  const [todos, setTodos] = useState(task?.todos || []);
  const dispatch = useDispatch();

  const { handleSubmit, reset, register, formState: { errors } } = useForm({
    defaultValues: {
      heading: task?.title || '', 
    }
  });

  const addTodos = (data) => {
    const updatedTodos = todos.map((todo, index) => ({
      ...todo,
      level: data.todo[index],
    }));

    if(task) {
      // Update an existing task
      dispatch(updateTask({ id: task.id, date, title: data.heading, todos: updatedTodos }));
    } else {
      // Add a new task with a unique id
      const newTask = {
        id: uuidv4(),
        title: data.heading,
        todos: updatedTodos
      };

      const organizedData = {
        [date]: [newTask]
      };

      dispatch(setTasks(organizedData));
    }
    
    reset();
  };

  return (
    <DrawerContent className="dark:text-white text-black flex flex-col min-h-[500px] mx-20 mb-10">
      <DrawerHeader>
        <DrawerTitle>{task ? "Edit Task" : "Create Todo"}</DrawerTitle>
      </DrawerHeader>

      <form onSubmit={handleSubmit(addTodos)} className="flex-grow">
        <CreateTodoForm register={register} errors={errors} todos={todos} setTodos={setTodos} />

        <DrawerFooter className="mt-auto my-4">
          <div className="flex gap-4">
            <DrawerClose>
              <Button type="submit" className="bg-black dark:bg-white">{task ? "Update" : "Submit"}</Button>
            </DrawerClose>

            <DrawerClose>
              <Button className="bg-black dark:bg-white">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
};

export default TodoDrawer;
