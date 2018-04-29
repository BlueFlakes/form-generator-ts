export class QuestionView {
    constructor(id, inputsHolderStrategy) {
        this._questionsContainerIdentity = `question__container-${id}`;
        this._inputsHolderStrategy = inputsHolderStrategy;
    }

    removeChildNode(simpleElementId) {
        let childNode = document.getElementById(simpleElementId);
        let parentNode = document.getElementById(this._questionsContainerIdentity);

        parentNode.removeChild(childNode);
    }

    injectSimpleElement(simpleElement) {
        let child = this._applyHolderStrategyOnSimpleElementNode(simpleElement);
        document.getElementById(this._questionsContainerIdentity).appendChild(child);
        simpleElement.injectEventListener();
    }

    _applyHolderStrategyOnSimpleElementNode(simpleElement) {
        let node = simpleElement.generateNode();
        return this._inputsHolderStrategy(node)
    }

    injectContainerWithChildNodes(simpleElements, outerContainerIdentity) {
        let element = document.createElement('div');
        element.id = this._questionsContainerIdentity;

        simpleElements.forEach((currentSimpleElement) => {
            let elementView = this._applyHolderStrategyOnSimpleElementNode(currentSimpleElement);
            element.appendChild(elementView);
        });

        document.getElementById(outerContainerIdentity).appendChild(element);
        simpleElements.forEach((currentSimpleElement) => {
            currentSimpleElement.injectEventListener();
        })
    }

    removeThisQuestion() {
        let question = document.getElementById(this._questionsContainerIdentity);
        let parent = question.parentNode;

        parent.removeChild(question);
    }
}