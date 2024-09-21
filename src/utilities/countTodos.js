export const countTodos = (tasks, startDate, endDate) => {
    let totalTodo = 0;
    let completedTodo = 0;

    // Iterate over tasks by date
    Object.keys(tasks).forEach((dateKey) => {
        const taskDate = dateKey;

        // Check if taskDate is within the range
        if (taskDate >= startDate && taskDate <= endDate) {
            tasks[dateKey].forEach((task) => {
                totalTodo += task.todos.length;
                completedTodo += task.todos.filter(todo => todo.isChecked).length;
            });
        }
    });

    return { totalTodo, completedTodo };
};
