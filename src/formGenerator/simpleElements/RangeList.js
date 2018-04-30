import {SimpleElement} from "./SimpleElement.js";
import {idGenerator} from "../../shared/IdGenerator.js";

export class RangeList {
    constructor(id) {
        this._id = id;
        this._low = new SimpleElement(idGenerator.nextId());
        this._max = new SimpleElement(idGenerator.nextId());
    }

    generateNode() {
        let lowNode = this._low.generateNode();
        let lowLabel = createLabel(lowNode, 'Low:');
        let lowContainer = attachIntoContainer(lowLabel, lowNode);

        let maxNode = this._max.generateNode();
        let maxLabel = createLabel(maxNode, 'Max:');
        let maxContainer = attachIntoContainer(maxLabel, maxNode);

        let mainContainer = attachIntoContainer(lowContainer, maxContainer);
        mainContainer.id = this._id;

        return mainContainer;
        
        function attachIntoContainer(...elements) {
            let container = document.createElement('div');
            elements.forEach((el) => {
                container.appendChild(el);
            });

            return container;
        }

        function createLabel(node, content) {
            let label = document.createElement('label');
            label.for = node.id;
            label.textContent = content;

            return label;
        }
    }

    injectEventListener() {
        this._low.injectEventListener();
        this._max.injectEventListener();
    }

    getCurrentValue() {
        return {
            min: this._low,
            max: this._max
        }
    }
}