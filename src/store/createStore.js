export function createStore(reducer, initialState) {
    let state = initialState;
    let listeners = [];

    const getState = () => {
        return state;
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        for (let l of listeners) {
            l();
        }
    };

    const subscribe = (listener) => {
        listeners.push(listener);
    };

    return { getState, dispatch, subscribe };
}
