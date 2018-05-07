import {SectionView} from "./SectionView.js";

export class SectionVM {
    constructor(section) {
        this._section = section;
        this._sectionView = new SectionView(this);
        this._additionalContainerAttributes = new Map();
    }

    injectNode(parentId) {
        let contextData = {
            id: this._section.getId(),
            parentId: parentId
        };

        let sectionElementsIterator = this._section.getSectionElementsIterator();
        this._sectionView.injectNode(contextData, sectionElementsIterator, this._additionalContainerAttributes);
    }

    addComponent(component) {
        this._section.add(component);
    }

    setContainerAttribute(identity, value) {
        this._additionalContainerAttributes.set(identity, value);
    }
}