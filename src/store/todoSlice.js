import { createSlice } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem('Todos')) || {};

const initialState = {
    tasks: {
      "23-8-2024":[
          {
            title: "Namaz",
            todos: [
                { id: 1234234, level: "Faza", isChecked: true },
                { id: 2342345, level: "Zohor", isChecked: true },
                { id: 1234532, level: "Asor", isChecked: true },
                { id: 4564534, level: "Magrib", isChecked: true },
            ]
          },
          {
            title: "Study",
            todos: [
                { id: 1234474, level: "Faza", isChecked: true },
                { id: 2342336, level: "Zohor", isChecked: true },
                { id: 1238532, level: "Asor", isChecked: true },
                { id: 4564584, level: "Magrib", isChecked: true },
            ]  
          }
      ], 
      "11-9-2024":[
          {
            title: "Namaz",
            todos: [
                { id: 1234234, level: "Faza", isChecked: true },
                { id: 2342345, level: "Zohor", isChecked: true },
                { id: 4523145, level: "Asor", isChecked: true },
                { id: 8763125, level: "Magrib", isChecked: true },
                { id: 5258254, level: "Isha", isChecked: true },
            ]
          },
          {
              title: "Study",
              todos: [
                  { id: 1234744, level: "Accounting", isChecked: true },
                  { id: 4523556, level: "Advanced Accounting", isChecked: true },
                  { id: 4567652, level: "Asor", isChecked: true },
                  { id: 7865455, level: "Magrib", isChecked: true },
              ]  
          }
      ]
   }
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

    }
  }
})

export const { setTasks, findTask, toggleCheckBox, updateTask } = todoSlice.actions;
export default todoSlice.reducer;