import { useSelector } from "react-redux";

const useCountTodos = () => {
    const tasks = useSelector((state) => state.todos.tasks);

    let totalTodo = 0;
    let completedTodo = 0;

    Object.keys(tasks).forEach((dateKey) => {
        tasks[dateKey].forEach((task) => {
            totalTodo += task.todos.length;
            completedTodo += task.todos.filter(todo => todo.isChecked).length;
        });
    });

    return { totalTodo, completedTodo };
};

export default useCountTodos;
