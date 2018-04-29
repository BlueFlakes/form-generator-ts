import {SimpleElement} from "./SimpleElement.js";

// I recommend to find another way for injecting Date ( like three fields with select )
// or inject automatically current date
export class Date extends SimpleElement {
    constructor(id) {
        super(id);
    }

    injectEventListener() {
        document.getElementById(this.getId()).addEventListener('change', (event) => {
            console.log(this.getId());
            this.setCurrentValue(event.target.value);
            console.log("value: " + event.target.value);
            console.log(this.getCurrentValue());
        })
    }

    generateNode() {
        let element = document.createElement('input');
        element.type = "date";
        element.value = this.getCurrentValue();
        element.id = this.getId();
        return element;
    }
}