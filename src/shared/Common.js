export const contextAdder = function (fn, ...ctx) {
    return function (...args) {
        return fn([...ctx, ...args]);
    };
};

export function instanceConstructor(Constructor) {
    return function (params) {
        return new Constructor(...params);
    };
}