export class TextInput {
    constructor(id) {
        this._id = id;
        this._currentValue = null;
    }

    injectEventListener() {
        document.getElementById(this._id).addEventListener('keyup', (e) => {
            this._currentValue = e.target.value;
        });
    }

    getCurrentValue() {
        return this._currentValue;
    }

    getId() {
        return this._id;
    }

    generateNode() {
        let element = document.createElement('input');
        element.type = "text";
        element.value = this.getCurrentValue();
        element.id = this._id;
        return element;
    }
}