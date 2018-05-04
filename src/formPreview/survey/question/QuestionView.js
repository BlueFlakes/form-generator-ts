import {DOM} from "../../../shared/Constants.js";

export class QuestionView {
    constructor(questionVM) {
        this._questionVM = questionVM;
    }

    injectContainer(question, simpleElementsIterator, additionalContainerAttributes) {
        let questionID = question.getId();
        let container = settleContainer(questionID, additionalContainerAttributes);

        let parentId = question.getParentId();
        DOM.attach.child.byId(parentId, container);

        appendChildNodes();

        function settleContainer(id, additionalAttributes) {
            let div = DOM.create.element("div");
            div.id = id;
            addSpecialContainerAttributes(div, additionalAttributes);

            return div;

            function addSpecialContainerAttributes(container, attributes) {
                attributes.forEach((value, key) => {
                    container[key] = value;
                });
            }
        }

        function appendChildNodes() {
            let currentIndex = 0;

            while (simpleElementsIterator.hasNext()) {
                let simpleElement = simpleElementsIterator.next();
                simpleElement.injectNode(currentIndex++);
            }
        }
    }
}