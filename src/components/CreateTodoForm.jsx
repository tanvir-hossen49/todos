import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Delete, Edit, Plus } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from './ui/input';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const CreateTodoForm = ({ setHeadingText, headingText, todos, setTodos }) => {
    const { toast } = useToast();

    const textareaRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        textareaRef.current.focus();
    }, []);

    const handleBlur = (event) => {
        if (event.key === "Enter") {
            event.target.blur();
        }
    };

    const saveHeadingText = (text) => {
        if(text !== ""){
            textareaRef.current.blur();
            setHeadingText(text);
        } else{
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Heading field can't be blank. Please add your action Heading",
                bgColor: 'bg-red-500 border-none',
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    const handleNewTodo = () => {
        setTodos([...todos, { id: Date.now(), level: '', isChecked: false, isEditing: true }]);
    };

    const handleInputChange = (id, value) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, level: value } : todo
        ));
    };

    const saveTodo = (id) => {
        const todo = todos.find(todo => id === todo.id);
        
        if(todo.level !== "") {
            setTodos(todos.map(todo => 
                todo.id === id ? { ...todo, isEditing: false } : todo
            ));
        } else{
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Level field can't be blank. Please add your action",
                bgColor: 'bg-red-500 border-none',
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            inputRef.current.focus();
        }
    };

    const editTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, isEditing: true }
                : todo
        ));
    };
    
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleCheckboxChange = (id) => {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
        ));
    };
      
    const isAnyTodoEditing = todos.some(todo => todo.isEditing);

    return (
        <div className='mx-auto w-full p-5'>
            <Textarea
                type="text"
                className="w-full h-auto text-3xl font-bold overflow-hidden p-2 focus:outline-none focus:ring-0"
                onBlur={(e) => saveHeadingText(e.target.value)}
                onKeyDown={(e) => {
                    e.key === "Enter" && saveHeadingText(e.target.value)
                }}
                ref={textareaRef}
                placeholder='Heading Of Your Task'
                rows={1}
                maxLength={25}
            />

            <div className='ml-2 my-4 overflow-auto max-h-[190px] custom-scrollbar'>
                {
                    todos && todos.map((todo, index) => {
                        return (
                            <div key={todo.id} className='flex items-center justify-between mt-2'>
                                <div className="flex items-center space-x-2 w-5/6">
                                    <div className='flex items-center space-x-2 w-full'>
                                        <Checkbox 
                                            id={todo.level} 
                                            checked={todo.isChecked} 
                                            onClick={() => handleCheckboxChange(todo.id)} 
                                        />

                                        {
                                            todo.isEditing ? (
                                                <Input
                                                    type="text"
                                                    value={todo.level}
                                                    onChange={(e) => handleInputChange(todo.id, e.target.value)}
                                                    onBlur={() => saveTodo(todo.id)}
                                                    onKeyDown={(e) => handleBlur(e)}
                                                    className="p-1 text-base border-1 border-b border-b-white outline-none bg-transparent w-1/2"
                                                    autoFocus
                                                />
                                            ) : (
                                                <Label htmlFor={todo.level} className="cursor-pointer w-full">
                                                    {todo.level}
                                                </Label>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className='flex w-1/6 items-center justify-end gap-x-3'>
                                    <Button
                                        className="p-2"
                                        variant="outline"
                                        onClick={() => editTodo(todo.id)}
                                        disabled={isAnyTodoEditing && !todo.isEditing}
                                    >
                                        <Edit />
                                    </Button>

                                    <Button
                                        className="p-2"
                                        variant="outline"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        <Delete />
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <div className='mt-5'>
                <Button
                    onClick={handleNewTodo}
                    disabled={isAnyTodoEditing}
                    className="px-2 py-1 flex gap-2 dark:bg-transparent mb-0"
                    variant="outline"
                >
                    <Plus />
                    <span>Add a property</span>
                </Button>
            </div>
        </div>
    );
};

export default CreateTodoForm;
