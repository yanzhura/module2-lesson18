import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';
import { generateTask } from '../utils/taskGenerator';
import { setError } from './errors';

const initialState = {
    entities: [],
    isLoading: true
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        received(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex((el) => el.id === action.payload.id);
            if (action.payload.completed) {
                state.entities[elementIndex].completed = true;
            } else if (action.payload.title) {
                state.entities[elementIndex].title = `${action.payload.title} ${state.entities[elementIndex].title}`;
            }
        },
        remove(state, action) {
            state.entities = state.entities.filter((el) => el.id !== action.payload.id);
        },
        taskRequested(state, action) {
            state.isLoading = true;
        },
        taskRequestFailed(state, action) {
            state.isLoading = false;
        },
        create(state, action) {
            state.entities.unshift(action.payload);
        }
    }
});

const { actions, reducer: taskReducer } = taskSlice;
const { received, update, remove, taskRequested, taskRequestFailed, create } = actions;

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(received(data));
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
    }
};

export const taskCreated = () => async (dispatch) => {
    const task = generateTask();
    try {
        const data = await todosService.create(task);
        dispatch(create(data));
    } catch (error) {}
};

export function completeTask(id) {
    return function (dispatch) {
        dispatch(update({ id, completed: true }));
    };
}

export function titleChanged(id) {
    return update({ id, title: 'Срочно! ' });
}

export function taskRemoved(id) {
    return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
