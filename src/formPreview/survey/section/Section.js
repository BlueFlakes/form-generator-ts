import {ArrayList} from "../../../shared/ArrayList.js";

export class Section {
    constructor(id) {
        this._id = id;
        this._sectionContainer = new ArrayList();
    }

    getId() {
        return this._id;
    }

    add(section) {
        this._sectionContainer.add(section);
    }

    getSectionElementsIterator() {
        return this._sectionContainer.iterator();
    }
}