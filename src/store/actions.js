import * as actionTypes from './actionTypes';

export function taskCompleted(id) {
    return {
        type: actionTypes.taskUpdated,
        payload: { id, completed: true }
    };
}

export function titleChanged(id) {
    return {
        type: actionTypes.taskUpdated,
        payload: { id, title: 'Срочно! ' }
    };
}

export function taskDeleted(id) {
    return {
        type: actionTypes.taskDeleted,
        payload: { id }
    };
}
