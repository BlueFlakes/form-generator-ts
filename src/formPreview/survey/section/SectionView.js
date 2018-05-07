import {DOM} from "../../../shared/Constants.js";

export class SectionView {
    constructor(sectionVM) {
        this._sectionVM = sectionVM;
    }

    injectNode(contextData, sectionElementsIterator, containerAttributes) {
        let div = DOM.create.element("div");
        injectAdditionalContainerAttributes(div, containerAttributes);
        let sectionId = contextData.id;
        div.id = sectionId;

        let outerContainerId = contextData.parentId;
        DOM.attach.child.byId(outerContainerId, div);

        while (sectionElementsIterator.hasNext()) {
            let sectionElement = sectionElementsIterator.next();
            sectionElement.injectNode({
                parentId: sectionId
            });
        }

        function injectAdditionalContainerAttributes(container, attributes) {
            attributes.forEach((value, field) => {
                container[field] = value;
            });
        }
    }
}