import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { titleChanged, taskRemoved, completeTask, loadTasks, getTasks, getTasksLoadingStatus } from './store/tasks';
import createStore from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getErrors } from './store/errors';

const store = createStore();

const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const errors = useSelector(getErrors());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        dispatch(taskRemoved(taskId));
    };

    if (isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (errors.length) {
        return (
            <>
                <h1 style={{ color: 'red' }}>Ошибка</h1>
                <p>{errors}</p>
            </>
        );
    }

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
                            <button onClick={() => dispatch(completeTask(el.id))}>Готово</button>
                            <span> &#8226; </span>
                            <button onClick={() => deleteTask(el.id)}>Удалить</button>
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
