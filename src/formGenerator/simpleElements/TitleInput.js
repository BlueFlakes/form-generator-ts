import {SimpleElement} from "./SimpleElement.js";

export class TitleInput extends SimpleElement {
    generateNode() {
        let node = super.generateNode();
        node.placeholder = "Title";

        return node;
    }
}