import { createStore } from 'redux';
import { taskReducer } from './taskReducer';

const tasks = [
    { id: 1, title: 'Купить продуктов', completed: false },
    { id: 2, title: 'Погулять с собакой', completed: false },
    { id: 3, title: 'починить кран на кухне', completed: false }
];

export function inititeStore() {
    return createStore(taskReducer, tasks);
}
