import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { lazy, Suspense } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

const TodoDrawer = lazy(() => import('./TodoDrawer'));

const DrawerComponent = ({ date, task }) => {

  return (
    <Drawer>
      <DrawerTrigger>
        {task ? (
            <h3 className="font-semibold">{task.title}</h3>
        ) : (
            <Button
                className="mr-3 mb-1 bg-[#aee3dc] dark:bg-[#1a4747]"
                variant="outline" 
                size="icon"
                aria-label="Create a new todo"
            >
                <PlusIcon className="h-4 w-4" />
            </Button>
        )}
      </DrawerTrigger>

      <DrawerContent>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoDrawer date={date} task={task} />
        </Suspense>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
