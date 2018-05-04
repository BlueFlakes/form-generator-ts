export class CheckBox {
    constructor(contextData, id, label) {
        this._id = id;
        this._parentId = contextData.parentId;
        this._label = label;
    }

    getId() {
        return this._id;
    }

    getParentId() {
        return this._parentId;
    }

    getLabel() {
        return this._label;
    }
}