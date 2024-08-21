import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { PlusIcon } from "lucide-react";
import CreateTodoForm from "./CreateTodoForm";
import { useEffect, useState } from "react";
import { getToday } from "@/utilities/getToday";

const CreateTodoDrawer = ({ todoDate }) => {
    const [headingText, setHeadingText] = useState("");
    const [todos, setTodos] = useState([]);
    const [properties, setProperties] = useState([]);
    const [todiesTodo, setTodiesTodo] = useState([])

    useEffect(() => {
        try {
            const allTodo = JSON.parse(localStorage.getItem("Todos")) || [];
            setProperties(allTodo);
            getTodiesTodos(allTodo)
        } catch (error) {
            console.error("Failed to load todos from local storage:", error);
        }
    }, []);

    const handleSubmit = () => {
        // Fetch existing todos from localStorage
        const existingTodos = JSON.parse(localStorage.getItem("Todos")) || [];
    
        // Create a new todo object
        const newTodo = {
            id: Date.now(),
            title: headingText,
            date: todoDate,
            todos: todos
        };
    
        // Append the new todo to the existing array
        const updatedTodos = [...existingTodos, newTodo];
    
        // Store the updated array in localStorage
        localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    
        // Update state with the new properties
        setProperties(updatedTodos);
    };

    const getTodiesTodos = (allTodos) => {
        const todo = allTodos.find(todo => todo.date === getToday());
        setTodiesTodo([...todiesTodo, todo])
    }
    
    return (
        <Drawer>
            <DrawerTrigger>
                <Button 
                    className="dark:bg-[#202020]" variant="outline" size="icon"
                    aria-label="Create a new todo"
                >
                    <PlusIcon className="h-4 w-4" />
                </Button>
            </DrawerTrigger>

            <DrawerContent className="min-h-[500px] mx-20 mb-10">
                <DrawerHeader>
                    <DrawerTitle>Create Todos</DrawerTitle>
                </DrawerHeader>
                
                <CreateTodoForm 
                    setHeadingText={setHeadingText} 
                    headingText={headingText}
                    todos={todos}
                    setTodos={setTodos}
                />

                <DrawerFooter>
                    <div className="flex gap-4">
                        <DrawerClose>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </DrawerClose>
                        
                        <DrawerClose>
                            <Button>Cancel</Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default CreateTodoDrawer;
