import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Delete, Edit, Plus } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from './ui/input';

const CreateTodoForm = ({ register, errors, todos, setTodos }) => {
    // Add a new todo field
    const addTodoBox = () => {
        const newTodo = { id: Date.now(), level: "", isChecked: false };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    // Handle checkbox changes
    const handleCheckBox = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
            )
        );
    };

    return (
        <div className='mt-8'>
            <Textarea
                label='textarea'
                rows={1}
                placeholder='Heading Of Your Task'
                className="w-full h-auto text-3xl font-bold overflow-hidden p-2 focus:outline-none focus:ring-0"
                type='text'
                {...register('heading', {
                    required: true,
                    maxLength: 20
                })}
            />
            {errors.heading && (
                <p className="text-red-500 text-xs italic">
                    Please fill out this field. Heading should be less than 20 characters.
                </p>
            )}

            {todos.map((todo, index) => (
                <div key={todo.id} className='ml-2 my-4 overflow-auto max-h-[190px] custom-scrollbar'>
                    <div className='flex items-center justify-between mt-2'>
                        <div className="flex items-center space-x-2 w-5/6">
                            <Checkbox
                                checked={todo.isChecked}
                                onClick={() => handleCheckBox(todo.id)}
                                { ...register(`checkbox[${index}]`)}
                            />
                            <Input
                                type="text"
                                className="p-1 text-base border-1 border-b dark:border-b-white border-b-black outline-none bg-transparent w-1/2"
                                {...register(`todo[${index}]`, {
                                    required: true
                                })}
                                placeholder="Enter task level"
                                defaultValue={todo.level}
                            />
                        </div>

                        <div className='flex w-1/6 items-center justify-end gap-x-3'>
                            <Button
                                className="p-2"
                                variant="outline"
                                onClick={() => {/* Edit handler logic */}}
                            >
                                <Edit />
                            </Button>

                            <Button
                                className="p-2"
                                variant="outline"
                                onClick={() =>
                                    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id))
                                }
                            >
                                <Delete />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            <div className='mt-5'>
                <Button
                    className="px-2 py-1 flex gap-2 dark:bg-transparent mb-0"
                    variant="outline"
                    onClick={addTodoBox}
                >
                    <Plus />
                    <span>Add a property</span>
                </Button>
            </div>
        </div>
    );
};

export default CreateTodoForm;
