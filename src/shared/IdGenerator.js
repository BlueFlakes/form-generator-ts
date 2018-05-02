import {contextAdder} from "./Common.js";

export const idGenerator = (function () {
    let id = 0;

    return Object.freeze({
        nextId: function () {
            return ++id;
        }
    });
}());

export const idAdder = (function (idGenerator) {
    return function (fn) {
        let newId = idGenerator.nextId();
        return contextAdder(fn, newId);
    };
}(idGenerator));