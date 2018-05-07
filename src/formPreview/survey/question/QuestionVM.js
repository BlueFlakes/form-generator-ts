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

    addSimpleNode(node) {
        node.addObserver(this._observer);
        this._question.addSimpleElement(node);
    }

    setContainerAttribute(identity, value) {
        this._additionalContainerAttributes.set(identity, value);
    }

    injectNode(contextData) {
        let simpleElements = this._question.getSimpleElementsIterator();

        let ids = {
            id: this._question.getId(),
            parentId: contextData.parentId
        };

        return this._questionView.injectContainer(
                                    ids,
                                    simpleElements,
                                    this._additionalContainerAttributes);
    }
}