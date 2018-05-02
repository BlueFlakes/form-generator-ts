import {SimpleElement} from "./SimpleElement.js";
import {DOM} from "../../shared/Constants.js";

export class EnumeratedListElement extends SimpleElement {

    generateNode(currentIndex) {
        let currentNode = super.generateNode();

        let label = DOM.create.element("label");
        label.for = currentNode.id;
        label.textContent = currentIndex + 1;

        let simpleContainer = DOM.create.element("div");

        simpleContainer.appendChild(label);
        simpleContainer.appendChild(currentNode);

        return simpleContainer;
    }
}