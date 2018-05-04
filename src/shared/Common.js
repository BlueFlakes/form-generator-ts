export const leftSideContextAdder = function (fn, ...ctx) {
    return function (...args) {
        return fn([...ctx, ...args]);
    };
};

export const rightSideContextAdder = function (fn, ...ctx) {
    return function (...args) {
        return fn([...args, ...ctx]);
    };
};

export function instanceConstructor(Constructor) {
    return function (params) {
        return new Constructor(...params);
    };
}