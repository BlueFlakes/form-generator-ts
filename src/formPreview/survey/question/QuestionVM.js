import {QuestionView} from "./QuestionView.js";
import {Observer} from "../../observerPattern/Observer.js";
import {ValueHolder} from "../../observerPattern/ValueHolder.js";
import {Question} from "./Question.js";

export class QuestionVM {
    constructor(question, updateStrategyCreator) {
        this._question = question;

        let valueHolder = this._question._getValueHolderAccessOnlyByVM();
        let updateStrategy = updateStrategyCreator(valueHolder);
        this._observer = new Observer(updateStrategy);

        this._questionView = new QuestionView(this);
        this._additionalContainerAttributes = new Map();
    }

    getQuestionId() {
        return this._question.getId();
    }

    getQuestionValue() {
        return this._question.getCurrentValue();
    }

    addSimpleNode(nodeCreator) {
        let parentId = this._question.getId();
        let ctxData = Object.freeze({
            parentId: parentId
        });

        let node = nodeCreator(ctxData);
        node.addObserver(this._observer);
        this._question.addSimpleElement(node);
    }

    setContainerAttribute(identity, value) {
        this._additionalContainerAttributes.set(identity, value);
    }

    injectNode() {
        let simpleElements = this._question.getSimpleElementsIterator();
        return this._questionView.injectContainer(
                                    this._question,
                                    simpleElements,
                                    this._additionalContainerAttributes);
    }
}