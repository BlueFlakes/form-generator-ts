import {ArrayList} from "../../../shared/ArrayList.js";
import {DOM} from "../../../shared/Constants.js";

export class PreviewSectionsContainer {
    constructor(outerContainerId) {
        this._outerContainerId = outerContainerId;
        this._container = new ArrayList();
    }

    addSection(section) {
        this._container.add(section);
    }

    inject() {
        this._container.forEach(section => {
            section.injectNode(this._outerContainerId);
        });
    }

    clear() {
        this._container.clear();
    }
}