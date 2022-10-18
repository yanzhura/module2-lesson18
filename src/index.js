import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as actions from './store/actions';
import { inititeStore } from './store/store';

const store = inititeStore();

const App = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    }, []);

    const completeTask = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId));
    };

    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChanged(taskId));
    };

    return (
        <>
            <h1>Задачи на сегодня</h1>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        {el.completed ? <span>&#9745; </span> : <span>&#9744; </span>}
                        <span>{el.title} </span>
                        <span>
                            <button onClick={() => changeTitle(el.id)}>Пометить</button>
                            <span> &#8226; </span>
                            <button onClick={() => completeTask(el.id)}>Готово</button>
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
