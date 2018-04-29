import {SimpleElement} from "./SimpleElement.js";

export class Radio extends SimpleElement {
    constructor(id, parentId) {
        super(id);
        this._parentId = parentId;
    }

    generateNode() {
        let node = super.generateNode();

        let div = document.createElement('div');
        let input = document.createElement('input');
        input.type = 'radio';
        div.appendChild(input);
        div.appendChild(node);
        input.name = this._parentId;

        return div;
    }
}