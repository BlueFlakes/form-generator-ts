import {SimpleElement} from "./SimpleElement.js";

export class EnumeratedListElement extends SimpleElement {

    generateNode(currentIndex) {
        let currentNode = super.generateNode();

        let label = document.createElement('label');
        label.for = currentNode.id;
        label.textContent = currentIndex + 1;

        let simpleContainer = document.createElement('div');

        simpleContainer.appendChild(label);
        simpleContainer.appendChild(currentNode);

        return simpleContainer;
    }
}