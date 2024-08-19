import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { PlusIcon } from "lucide-react";
import CreateTodoForm from "./CreateTodoForm";
import { useState } from "react";

const CreateTodoDrawer = () => {
    const [headingText, setHeadingText] = useState("");
    const [todos, setTodos] = useState([]);
    const [properties, setProperties] = useState([])
    const currentDate = new Date();

    const handleSubmit = () => {
        setProperties([...properties, {
            id: headingText,
            title: headingText,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), // August 15, 11 AM
            todos: todos
        }])
    };
    console.log(properties);
    
    
    return (
        <Drawer>
            <DrawerTrigger>
                <Button 
                    className="dark:bg-[#202020]" variant="outline" size="icon"
                >
                    <PlusIcon className="h-4 w-4"/>
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
                            <Button >Cancel</Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default CreateTodoDrawer;