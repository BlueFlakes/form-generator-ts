import {DOM} from "../../../shared/Constants.js";

export class QuestionView {
    constructor(questionVM) {
        this._questionVM = questionVM;
    }

    injectContainer(ids, simpleElementsIterator, additionalContainerAttributes) {
        let questionID = ids.id;
        let container = settleContainer(questionID, additionalContainerAttributes);

        let parentId = ids.parentId;
        DOM.attach.child.byId(parentId, container);

        appendChildNodes(questionID);

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

        function appendChildNodes(questionID) {
            let currentIndex = 0;

            while (simpleElementsIterator.hasNext()) {
                let simpleElement = simpleElementsIterator.next();
                simpleElement.injectNode({
                    parentId: questionID,
                    index: currentIndex++
                });
            }
        }
    }
}