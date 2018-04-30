import {CheckBox} from "./CheckBox.js";
import {Radio} from "./Radio.js";
import {Date} from "./Date.js";
import {TextArea} from "./TextArea.js";
import {SimpleElement} from "./SimpleElement.js";

export const FieldGeneratorStrategyIdentity = Object.freeze({
    radioBoxStrategy: 'radioBox',
    checkBoxStrategy: 'checkBox',
    none: 'None',
    textAreaStrategy: 'textArea',
    datetimeBoxStrategy: 'datetime'
});

export class FieldGeneratorStrategies {
    static createFieldGeneratorByIdentity(identity) {
        switch (identity) {
            case FieldGeneratorStrategyIdentity.none:
                return function (id) {
                    return new SimpleElement(id);
                };

            case FieldGeneratorStrategyIdentity.textAreaStrategy:
                return function (id) {
                    return new TextArea(id);
                };

            case FieldGeneratorStrategyIdentity.datetimeBoxStrategy:
                return function (id) {
                    return new Date(id);
                };

            case FieldGeneratorStrategyIdentity.radioBoxStrategy:
                return function (id, parentId) {
                    return new Radio(id, parentId);
                };

            case FieldGeneratorStrategyIdentity.checkBoxStrategy:
                return function (id, parentId) {
                    return new CheckBox(id, parentId);
                };
        }
    }
}