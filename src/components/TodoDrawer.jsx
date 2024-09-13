import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { deleteTask, setTasks, updateTask } from "@/store/todoSlice";
import { v4 as uuidv4 } from 'uuid';
import { ToastAction } from "@/components/ui/toast";
import { useToastHelper } from "@/utilities/showToastMsg";
import { getSelectedDays } from "@/utilities/getSelectedDays";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const CreateTodoForm = lazy(() => import('./CreateTodoForm'));

const TodoDrawer = ({ date, task }) => {
  const { showToastMsg } = useToastHelper();
  const dispatch = useDispatch();
  const [todos, setTodos] = useState(task?.todos || []);
  
  const { handleSubmit, reset, register, getValues, unregister, formState: { errors } } = useForm({
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

  const handleRepeatedTasks = (endDay) => {
    const data = getValues();
    const days = getSelectedDays(date, endDay); // startDay and EndDay
    
    const updatedTodos = todos.map((todo, index) => ({
      ...todo,
      id: uuidv4(),
      level: data.todo[index],
    }));

    days.forEach(date => {
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
    )
    
  }

  const handleDeleteTask = () => {
    showToastMsg({
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
    <DrawerContent className="min-h-[500px] mx-20 mb-10">
      <DrawerHeader>
        <DrawerTitle>{task ? "Edit Task" : "Create Todo"}</DrawerTitle>
      </DrawerHeader>

      <form onSubmit={handleSubmit(addTodos)}>
        <Suspense fallback={<div>Loading...</div>}>
          <CreateTodoForm 
            register={register} 
            unregister={unregister}
            getValues={getValues}
            showToastMsg={showToastMsg}
            errors={errors} 
            todos={todos}
            setTodos={setTodos}
          />
        </Suspense>

        <DrawerFooter className="my-3">
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

            <DropdownMenu className="w-full">
              <DropdownMenuTrigger>
                <Button type="button">
                  Add This Task Next
                </Button>
              </DropdownMenuTrigger>

              <DrawerClose>
                <DropdownMenuContent align="center" 
                  className="bg-white text-black"
                >
                  {[3,7,30].map(day => 
                    <DropdownMenuItem 
                      onClick={() => handleRepeatedTasks(day)}
                      className="hover:bg-orange-100 p-1"
                    >
                      {day} Days
                    </DropdownMenuItem>
                    
                  )}
                </DropdownMenuContent>
              </DrawerClose>

            </DropdownMenu>

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
