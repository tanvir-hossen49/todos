import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { PlusIcon } from "lucide-react";
import CreateTodoForm from "./CreateTodoForm";

const CreateTodoDrawer = () => {
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

                <CreateTodoForm />

                <DrawerFooter>
                    <div className="flex gap-4">
                        <Button>Submit</Button>
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