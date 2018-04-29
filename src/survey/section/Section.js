import {ArrayList} from "../../shared/ArrayList.js";

export class Section {
    constructor(id, sectionView) {
        this._id = `section__container-${id}`;
        this._sectionView = sectionView(this._id);

        this._sectionBody = new ArrayList();
    }

    addToSectionBody(part) {
        this._sectionBody.add(part);
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