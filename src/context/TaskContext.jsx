
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { getTasks } from "../services/taskApi";

const TaskContext = createContext(null);
const STORAGE_KEY = "react-frontend-app-tasks";

const initialState = {
  tasks: [],
  loading: true,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

        case "UPDATE_TASK":
        return {
            ...state,
            tasks: state.tasks.map((task) =>
            task.id === action.payload.id
                ? { ...task, ...action.payload.updates }
                : task
            ),
        };

        case "DELETE_TASK":
        return {
            ...state,
            tasks: state.tasks.filter(
            (task) => task.id !== action.payload
            ),
        };

    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState
  );

  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);

        if (savedTasks !== null) {
          const parsedTasks = JSON.parse(savedTasks);

          if (!Array.isArray(parsedTasks)) {
            throw new Error("Invalid saved task data");
          }

          dispatch({
            type: "FETCH_SUCCESS",
            payload: parsedTasks,
          });

          return;
        }

        const data = await getTasks();

        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          payload: error.message,
        });
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    if (!state.loading && !state.error) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.tasks)
      );
    }
  }, [state.tasks, state.loading, state.error]);

  function addTask(taskData) {
    const newTask = {
      id: crypto.randomUUID(),
      todo: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      completed: false,
      userId: 1,
    };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  }

  function toggleTask(id) {
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });
  }

  function updateTask(id, updates) {
    dispatch({
        type: "UPDATE_TASK",
        payload: { id, updates },
    });
    }

    function deleteTask(id) {
    dispatch({
        type: "DELETE_TASK",
        payload: id,
    });
    }

  return (
    <TaskContext.Provider
      value={{ ...state, addTask, toggleTask, updateTask, deleteTask, }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks must be used inside TaskProvider"
    );
  }

  return context;
}
