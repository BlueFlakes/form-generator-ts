export const contextAdder = function (fn, ...ctx) {
    return function (...args) {
        let flattenParams = flatten([ctx, args]);
        return fn(flattenParams);
    };
};

function flatten(arr, result = []) {
    for (let i = 0, length = arr.length; i < length; i++) {
        const value = arr[i];
        if (Array.isArray(value)) {
            flatten(value, result);
        } else {
            result.push(value);
        }
    }
    return result;
}

export function instanceConstructor(Constructor) {
    return function (params) {
        return new Constructor(...params);
    };
}