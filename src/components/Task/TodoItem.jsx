import React from 'react';

const TodoItem = ({ id, isChecked, level, onCheckboxClick }) => {
    return (
        <div
            key={id}
            className="flex mt-2 items-center space-x-2 w-full cursor-pointer"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onCheckboxClick(id)}
            onClick={() => onCheckboxClick(id)}
        >
            <div
                role="checkbox"
                aria-label="checkbox"
                aria-checked={isChecked}
                id={id}
                className={`w-5 h-[18px] border-2 rounded transition-colors duration-300 
                ${isChecked ? "bg-green-500 border-green-500" : "border-red-500"}`}
                onClick={onCheckboxClick}
            ></div>

            <div className="font-normal w-full">{level}</div>
        </div>
    );
};

export default TodoItem;