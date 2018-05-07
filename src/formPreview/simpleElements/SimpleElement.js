export class SimpleElement {
    constructor(id, content) {
        this._id = id;
        this._content = content;
    }

    getId() {
        return this._id;
    }

    getContent() {
        return this._content;
    }
}