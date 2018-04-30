import {ArrayList} from "../../../shared/ArrayList.js";

export const SectionEnum = Object.freeze({
    TitleSection: 'Title-Section',
    QuestionSection: 'Question-Section'
});

export class Section {
    constructor(id, sectionView) {
        this._id = `section__container-${id}`;
        this._sectionView = sectionView(this._id);

        this._sectionBody = new Map();
    }

    addToSectionBody(key, section) {
        this._sectionBody.set(key, section);
    }

    getId() {
        return this._id;
    }

    destroy() {
        this._sectionView.destroySection();
    }

    inject() {
        this._sectionView.createSection();

        let containerId = this._sectionView.getId();
        this._sectionBody.forEach((part) => part.inject(containerId));
    }
}