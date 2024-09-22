import React from 'react';

const WeekNavigatorSkeleton = () => {
    return (
        <div className="flex items-center justify-between my-4 animate-pulse">
            <h2 className="bg-gray-200 dark:bg-[#4a4a4a] h-6 w-32 rounded"></h2>
            
            <div className="flex items-center gap-3 select-none">
                <span className="bg-gray-200 dark:bg-[#4a4a4a] h-4 w-8"></span>
                <span className="bg-gray-200 dark:bg-[#4a4a4a] h-4 w-8"></span>
                <span className="bg-gray-200 dark:bg-[#4a4a4a] h-4 w-8"></span>
            </div>
        </div>
    );
};

export default WeekNavigatorSkeleton;
