import {SimpleElement} from "./SimpleElement.js";

export class CheckBox extends SimpleElement {
    constructor(id, parentId) {
        super(id);
        this._parentId = parentId;
    }

    generateNode() {
        let node = super.generateNode();

        let div = document.createElement('div');
        let input = document.createElement('input');
        input.type = 'checkbox';
        div.appendChild(input);
        div.appendChild(node);
        input.name = this._parentId;

        return div;
    }
}