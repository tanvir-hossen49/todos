import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

const TasksSkeleton = () => {
    return (
        <div className="mr-2">
            <div className="mb-4 rounded-[6px] p-2 bg-white dark:bg-[#2f2f2f]">
                {Array.from(7).map(() => (
                    <div className='flex mt-2 items-center space-x-2 w-full'>
                        <Checkbox />
                        <Label> </Label>
                    </div>  
                ))}
            </div>
        </div>
    );
};

export default TasksSkeleton;