import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CreateTodoForm = () => {
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            inputRef.current.blur();   
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleAddProperty = () => {
        setProperties([...properties, { id: properties.length + 1, 
            label: `Property ${properties.length + 1}`, isEditing: true 
        }]);
    };

    const handleEditLabel = (id, newLabel) => {
        setProperties(properties.map(property => 
            property.id === id ? { ...property, label: newLabel } : property
        ));
    };

    const toggleEditMode = (id) => {
        setProperties(properties.map(property => 
            property.id === id ? { ...property, isEditing: !property.isEditing } : property
        ));
    };

    return (
        <div className='ml-5 w-2/3'>
            <Textarea
                ref={inputRef}
                type="text"
                className="w-full h-auto text-3xl font-bold overflow-hidden p-2 bg-transparent focus:outline-none focus:ring-0"
                placeholder='Heading Of Your Task'
                onChange={handleChange}
                value={value}
                rows={1}
                maxLength={25}
                onKeyDown={handleKeyDown}
            />
            <div className='flex flex-col gap-y-4 ml-2 my-4 overflow-auto max-h-[200px]' >
                {properties.map((property) => (
                    <div key={property.id} className="flex items-center space-x-2">
                        <Checkbox id={`property-${property.id}`} />

                        {property.isEditing ? (
                            <input 
                                type="text"
                                className="bg-transparent border-b border-gray-400 focus:border-blue-500 outline-none"
                                value={property.label}
                                onChange={(e) => handleEditLabel(property.id, e.target.value)}
                                onBlur={() => toggleEditMode(property.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') toggleEditMode(property.id);
                                }}
                            />
                        ) : (
                            <Label 
                                htmlFor={`property-${property.id}`}
                                onDoubleClick={() => toggleEditMode(property.id)}
                                className="cursor-pointer"
                            >
                                {property.label}
                            </Label>
                        )}
                    </div>
                ))}
            </div>

            <div className='mt-12'>
                <Button 
                    className="px-2 py-1 flex gap-2 dark:bg-transparent mb-0" 
                    variant="outline"
                    onClick={handleAddProperty}
                >
                    <Plus />
                    <span>Add a property</span>
                </Button>
            </div>
        </div>
    );
};

export default CreateTodoForm;
