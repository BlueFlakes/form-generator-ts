import {MultipleFieldsBoxView} from "../MultipleFieldsBoxView.js";
import {DOM} from "../../../../shared/Constants.js";

export class RadioBoxView extends MultipleFieldsBoxView {
    injectEventListener(id) {
        let onEvent = DOM.onEvent.change;

        DOM.attach.event.byId(id, onEvent, e => {
            this._multipleFieldsVM.notifyObservers({
                value: e.target.id
            });
        });
    }
}