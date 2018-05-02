export const contextAdder = function (fn, ...ctx) {
    return function (...args) {
        return fn(...ctx, ...args);
    };
};