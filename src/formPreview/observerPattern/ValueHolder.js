export class ValueHolder {
    constructor(initialValue) {
        this._value = initialValue;
    }

    setValue(v) {
        this._value = v;
    }

    getValue() {
        return this._value;
    }
}