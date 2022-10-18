import { taskUpdated } from './actionTypes';

export function taskReducer(state, action) {
    switch (action.type) {
        case taskUpdated:
            const newArray = [...state];
            const elementIndex = newArray.findIndex((el) => el.id === action.payload.id);
            if (action.payload.completed) {
                newArray[elementIndex].completed = true;
            } else if (action.payload.title) {
                newArray[elementIndex].title = `${action.payload.title} ${newArray[elementIndex].title}`;
            }

            return newArray;

        default:
            return state;
    }
}
