import {idGenerator} from "../../shared/IdGenerator.js";
import {
    FieldGeneratorStrategies,
    FieldGeneratorStrategyIdentity
} from "./FieldGeneratorStrategies.js";
import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";
import {SimpleElement} from "./SimpleElement.js";

export class RangeList {
    constructor(id) {
        this._id = id;

        this._low = SimpleElement.createWithSettledId();
        this._max = SimpleElement.createWithSettledId();
    }

    getId() {
        return this._id;
    }

    generateNode() {
        let lowNode = this._low.generateNode();
        let lowLabel = createLabel(lowNode, "Low:");
        let lowContainer = attachIntoContainer(lowLabel, lowNode);

        let maxNode = this._max.generateNode();
        let maxLabel = createLabel(maxNode, "Max:");
        let maxContainer = attachIntoContainer(maxLabel, maxNode);

        let mainContainer = attachIntoContainer(lowContainer, maxContainer);
        mainContainer.id = this._id;

        return mainContainer;
        
        function attachIntoContainer(...elements) {
            let container = DOM.create.element("div");
            elements.forEach(el => {
                container.appendChild(el);
            });

            return container;
        }

        function createLabel(node, content) {
            let label = DOM.create.element("label");
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
        };
    }

    static createWithSettledId(...args) {
        return idAdder(this._rangeListCreator)(...args);
    }
}

RangeList._rangeListCreator = instanceConstructor(RangeList);