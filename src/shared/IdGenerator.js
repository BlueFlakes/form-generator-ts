export const idGenerator = (function () {
    let id = 0;

    return Object.freeze({
        nextId: function () {
            return ++id;
        }
    })
})();