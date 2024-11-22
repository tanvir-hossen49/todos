import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { deleteTask, setTasks, updateTask } from "@/store/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { ToastAction } from "@/components/ui/toast";
import { useToastHelper } from "@/utilities/showToastMsg";
import { getSelectedDays } from "@/utilities/getSelectedDays";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { addDays, format } from "date-fns";
import BorderAccording from "./SelectModel/BorderAccording";

const TodoForm = lazy(() => import("./TodoForm"));

const TodoDrawer = ({ date, task }) => {
  const { showToastMsg } = useToastHelper();
  const dispatch = useDispatch();
  const [todos, setTodos] = useState(task?.todos || []);
  
  const { 
    handleSubmit, 
    reset, 
    register, 
    getValues, 
    unregister, 
    formState: { errors } 
  } = useForm({ defaultValues: { heading: task?.title || "" } });

  const model = {
    "Namaz": {
    todos: [
        { id: 1234234, level: "Faza", isChecked: true },
        { id: 2342345, level: "Zohor", isChecked: true },
        { id: 1234532, level: "Asor", isChecked: true },
        { id: 4564534, level: "Magrib", isChecked: true },
    ]},
    "BBA 2nd Year": {
    todos: [
        { id: 1234234, level: "Faza", isChecked: true },
        { id: 2342345, level: "Zohor", isChecked: true },
        { id: 1234532, level: "Asor", isChecked: true },
        { id: 4564534, level: "Magrib", isChecked: true },
    ]},
  }

  const handleAddOrUpdateTask = (data) => {
    const updatedTodos = todos.map((todo, index) => ({
      ...todo,
      level: data.todo[index],
    }));

    if (task) {
      dispatch(updateTask({ id: task.id, date, title: data.heading, todos: updatedTodos }));
    } else {
      const newTask = {
        id: uuidv4(),
        title: data.heading,
        todos: updatedTodos,
      };
      dispatch(setTasks({ [date]: [newTask] }));
    }

    reset();
  };

  const handleRepeatedTasks = (endDay) => {
    const data = getValues();

    if(data.heading === '') return

    if(task) {
      let [day, month, year] = date.split("-").map(Number);
      date = new Date(year, month - 1, day);
      let updatedDate = addDays(date, 1);
      date = format(updatedDate, "dd-MM-yyyy");
    }

    const days = getSelectedDays(date, endDay);

    days.forEach(date => {
      const updatedTodos = todos.map((todo, index) => ({
        ...todo,
        id: uuidv4(),
        level: data.todo[index],
      }));

      const newTask = {
        id: uuidv4(),
        title: data.heading,
        todos: updatedTodos
      };
      
      const organizedData = {
        [date]: [newTask]
      };
      
      dispatch(setTasks(organizedData));
    })
  }

  const handleDeleteTask = () => {
    showToastMsg({
      variant: "destructive",
      title: "Are you sure?",
      description: "Do you really want to delete this task? This action is irreversible.",
      bgColor: "bg-red-500 border-none",
      action: (
        <ToastAction 
          altText="Confirm delete" 
          onClick={() => dispatch(deleteTask({ date, id: task.id }))}
        >
          Delete
        </ToastAction>
      ),
    });
  };

  const Dropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button type="button">Add This Task Next</Button>
      </DropdownMenuTrigger>

      <DrawerClose>
        <DropdownMenuContent align="center" className="bg-white text-black">
          {[1, 3, 7, 10, 30].map((day) => (
            <DropdownMenuItem
              key={day}
              onClick={() => handleRepeatedTasks(day)}
              className="cursor-pointer text-[1rem] px-6 py-1.5 transition-all duration-500 hover:bg-green-500 hover:text-white"
            >
              {day} Days
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DrawerClose>
    </DropdownMenu>
  );

  const ActionButtons = () => (
    <div className="flex flex-row flex-wrap gap-2 w-full items-start">
      <DrawerClose>
        <Button type="submit">{task ? "Update" : "Submit"}</Button>
      </DrawerClose>
      {task && (
        <DrawerClose>
          <Button 
            className="dark:bg-red-500 dark:text-white" 
            onClick={handleDeleteTask}
          >
            Delete
          </Button>
        </DrawerClose>
      )}
      <Dropdown />
      <DrawerClose>
        <Button>Cancel</Button>
      </DrawerClose>
    </div>
  );

  return (
    <DrawerContent className="md:min-h-[500px] min-h-[600px] md:mx-20 mx-5 mb-10">
      <div className="md:flex justify-between flex-1">
        {/* Left Section */}
        <div className="flex-1 md:border-r mb-2 border-white md:border-1">
          <DrawerHeader>
            <DrawerTitle className="underline decoration-wavy">
              {task ? "Edit Task" : "Create Todo"}
            </DrawerTitle>
          </DrawerHeader>

          <form onSubmit={handleSubmit(handleAddOrUpdateTask)}>
            <Suspense fallback={<div>Loading...</div>}>
              <TodoForm
                register={register}
                unregister={unregister}
                getValues={getValues}
                showToastMsg={showToastMsg}
                errors={errors}
                todos={todos}
                setTodos={setTodos}
              />
            </Suspense>
            <DrawerFooter>
              <ActionButtons />
            </DrawerFooter>
          </form>
        </div>

        {/* Right Section */}
        {!task && 
          <div className="flex-1">
            <DrawerHeader>
              <DrawerTitle className="underline decoration-wavy">Select Your Model</DrawerTitle>

              <div className="mt-4 font-semibold space-y-2">
                <BorderAccording />
              </div>
            </DrawerHeader>
          </div>
        }
      </div>
    </DrawerContent>
  );
};

export default TodoDrawer;
