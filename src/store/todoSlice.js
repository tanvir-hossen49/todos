import { createSlice } from "@reduxjs/toolkit";

const allTasks = JSON.parse(localStorage.getItem('Todos')) || {};

const initialState = {
  tasks: allTasks
};

const updateLocalStorage = (tasks) => {
  localStorage.setItem('Todos', JSON.stringify(tasks));
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      const date = Object.keys(action.payload)[0];
      if (state.tasks[date]) {
        state.tasks[date] = [...state.tasks[date], ...action.payload[date]];
      } else {
        state.tasks[date] = action.payload[date];
      }

      updateLocalStorage(state.tasks);
    },
    updateTask: (state, action) => {
      const { id, date, title, todos } = action.payload;

      const findTasks = state.tasks[date];

      if (findTasks) {
        const task = findTasks.find(task => task.id === id);

        if (task) {
          task.title = title;
          task.todos = todos;
        }
      }

      updateLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      const { date, id } = action.payload;
    
      const findTasks = state.tasks[date];
    
      if (findTasks) {
        state.tasks[date] = findTasks.filter(task => task.id !== id);

        if (state.tasks[date].length === 0) {
          delete state.tasks[date];
        }
      }

      localStorage.setItem('Todos', JSON.stringify(state.tasks));
    },
    toggleCheckBox: (state, action) => {
      const { date, id } = action.payload;
      const targetedTask = state.tasks[date];
      if (targetedTask) {
        targetedTask.forEach(task => {
          task.todos = task.todos.map(todo =>
            todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
          );
        });
      }

      updateLocalStorage(state.tasks);
    }
  }
})

export const { setTasks, toggleCheckBox, updateTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
