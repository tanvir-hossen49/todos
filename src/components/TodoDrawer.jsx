import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import CreateTodoForm from "./CreateTodoForm";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { deleteTask, setTasks, updateTask } from "@/store/todoSlice";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const TodoDrawer = ({ date, task }) => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState(task?.todos || []);
  const { toast } = useToast();

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

  const handleDeleteTask = () => {
    toast({
      variant: "destructive",
      title: "Are you sure?",
      description: "Do you really want to delete this task? This action is irreversible.",
      bgColor: 'bg-red-500 border-none',
      action: (
        <ToastAction 
          altText="Confirm delete" 
          onClick={() => {
            dispatch(deleteTask({ date, id: task.id }));
          }}
        >
          Delete
        </ToastAction>
      ),
    });
  };

  return (
    <DrawerContent className="dark:text-white text-black flex flex-col min-h-[500px] mx-20 mb-10">
      <DrawerHeader>
        <DrawerTitle>{task ? "Edit Task" : "Create Todo"}</DrawerTitle>
      </DrawerHeader>

      <form onSubmit={handleSubmit(addTodos)} className="flex-grow">
        <CreateTodoForm 
          register={register} 
          errors={errors} 
          todos={todos} 
          setTodos={setTodos}
        />

        <DrawerFooter className="mt-auto my-4">
          <div className="flex gap-4">
            <DrawerClose>
              <Button type="submit">
                {task ? "Update" : "Submit"}
              </Button>
            </DrawerClose>
            
            {task &&
              <DrawerClose>
                <Button 
                  className="dark:bg-red-500 dark:text-white"
                  onClick={handleDeleteTask}
                >
                  Delete
                </Button>
              </DrawerClose>
            }

            <DrawerClose>
              <Button type="button">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
};

export default TodoDrawer;
