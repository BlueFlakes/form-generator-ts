import {idGenerator} from "../../shared/IdGenerator.js";
import {
    FieldGeneratorStrategies,
    FieldGeneratorStrategyIdentity
} from "./FieldGeneratorStrategies.js";
import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";

export class RangeList {
    constructor(id) {
        this._id = id;

        let elementGenerator = createSimpleElementGenerator();
        this._low = elementGenerator.createElement();
        this._max = elementGenerator.createElement();
        
        function createSimpleElementGenerator() {
            let strategyName = FieldGeneratorStrategyIdentity.simpleStrategy;
            let fieldGenerator = FieldGeneratorStrategies.createFieldGeneratorByIdentity(strategyName);

            return {
                createElement: function () {
                    let newId = idGenerator.nextId();
                    return fieldGenerator(newId);
                }
            };
        }
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