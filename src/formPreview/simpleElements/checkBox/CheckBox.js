export class CheckBox {
    constructor(contextData, id, label) {
        this._id = id;
        this._parentId = contextData.parentId;
        this._label = label;

        this._isChecked = false;
    }

    getId() {
        return this._id;
    }

    isChecked() {
        return this._isChecked;
    }

    toggle() {
        this._isChecked = !this._isChecked;
    }

    getParentId() {
        return this._parentId;
    }

    getLabel() {
        return this._label;
    }
}