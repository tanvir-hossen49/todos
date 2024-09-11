import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import CreateTodoForm from "./CreateTodoForm";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setTasks } from "@/store/todoSlice";  // Import the Redux action
import { useState } from "react";

const TodoDrawer = ({ date }) => {
  
  const [todos, setTodos] = useState([]);
  const { handleSubmit, reset, register, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const addTodos = (data) => {
    const updatedTodos = todos.map((todo, index) => ({
      ...todo,
      level: data.todo[index],
    }));
    
    const organizedData = {
      [date]: [
        { 
          title: data.heading,
          todos: updatedTodos
        }
      ]
    };
    dispatch(setTasks(organizedData));
    reset();
  };

  return (
    <DrawerContent className="flex flex-col min-h-[500px] mx-20 mb-10">
      <DrawerHeader>
        <DrawerTitle>Create Todo</DrawerTitle>
      </DrawerHeader>

      <form onSubmit={handleSubmit(addTodos)} className="flex-grow">
        <CreateTodoForm register={register} errors={errors} todos={todos} setTodos={setTodos}/>

        <DrawerFooter className="mt-auto my-4">
          <div className="flex gap-4">
            <DrawerClose>
              <Button type="submit">Submit</Button>
            </DrawerClose>

            <DrawerClose>
              <Button>Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
};

export default TodoDrawer;
