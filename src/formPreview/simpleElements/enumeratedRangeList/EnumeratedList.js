export class EnumeratedList {
    constructor(id, enumeratedListElements) {
        this._id = id;
        this._enumeratedListElements = enumeratedListElements;
    }

    getId() {
        return this._id;
    }

    getEnumeratedListElements() {
        return this._enumeratedListElements;
    }
}