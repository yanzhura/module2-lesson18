export function logger(store) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            console.log('Вызов Logger Middleware');
            return next(action);
        };
    };
}
