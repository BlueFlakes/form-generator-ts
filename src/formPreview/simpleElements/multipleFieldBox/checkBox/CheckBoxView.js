import {MultipleFieldsBoxView} from "../MultipleFieldsBoxView.js";
import {DOM} from "../../../../shared/Constants.js";

export class CheckBoxView extends MultipleFieldsBoxView {
    injectEventListener(id) {
        let onEvent = DOM.onEvent.click;

        DOM.attach.event.byId(id, onEvent, e => {
            this._multipleFieldsVM.notifyObservers({
                isChecked: e.target.checked,
                value: e.target.id
            });
        });
    }
}