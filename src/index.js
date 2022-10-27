import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
    titleChanged,
    taskRemoved,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    taskCreated
} from './store/tasks';
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

    const createTask = () => {
        dispatch(taskCreated());
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
        <div className="container mt-5">
            <button className="btn btn-success mb-3" onClick={createTask}>
                Новая задача
            </button>
            <h1>Задачи на сегодня</h1>
            <div>
                {state.map((el) => (
                    <div key={el.id} className="d-flex">
                        <div className="m-2">
                            {el.completed ? <i className="bi bi-check-square"></i> : <i className="bi bi-square"></i>}
                        </div>
                        <div className="m-2">{el.title} </div>
                        <button className="btn btn-outline-secondary btn-sm m-2" onClick={() => changeTitle(el.id)}>
                            Пометить
                        </button>
                        <button
                            className="btn btn-outline-success btn-sm m-2"
                            onClick={() => dispatch(completeTask(el.id))}>
                            Готово
                        </button>
                        <button className="btn btn-outline-danger btn-sm m-2" onClick={() => deleteTask(el.id)}>
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
