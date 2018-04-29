export class SimpleElement {
    constructor(id) {
        this._id = id;
        this._currentValue = null;
    }

    injectEventListener() {
        document.getElementById(this._id).addEventListener('keyup', (e) => {
            this._currentValue = e.target.value;
            console.log(this._currentValue);
        });
    }

    getCurrentValue() {
        return this._currentValue;
    }

    setCurrentValue(recentValue) {
        this._currentValue = recentValue;
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