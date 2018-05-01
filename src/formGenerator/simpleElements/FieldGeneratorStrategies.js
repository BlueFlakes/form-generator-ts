import {CheckBox} from "./CheckBox.js";
import {Radio} from "./Radio.js";
import {Date} from "./Date.js";
import {TextArea} from "./TextArea.js";
import {SimpleElement} from "./SimpleElement.js";
import {EnumeratedListElement} from "./EnumeratedListElement.js";
import {RangeList} from "./RangeList.js";

export const FieldGeneratorStrategyIdentity = Object.freeze({
    radioBoxStrategy: 'radioBox',
    checkBoxStrategy: 'checkBox',
    simpleStrategy: 'simple',
    textAreaStrategy: 'textArea',
    datetimeBoxStrategy: 'datetime',
    enumeratedListStrategy: 'enumeratedList',
    rangeListStrategy: 'rangeList'
});

export class FieldGeneratorStrategies {
    // noinspection OverlyComplexFunctionJS
    static createFieldGeneratorByIdentity(identity) {
        switch (identity) {
            case FieldGeneratorStrategyIdentity.simpleStrategy:
                return function (id) {
                    return new SimpleElement(id);
                };

            case FieldGeneratorStrategyIdentity.enumeratedListStrategy:
                return function (id) {
                    return new EnumeratedListElement(id);
                };

            case FieldGeneratorStrategyIdentity.textAreaStrategy:
                return function (id) {
                    return new TextArea(id);
                };

            case FieldGeneratorStrategyIdentity.rangeListStrategy:
                return function (id) {
                    return new RangeList(id);
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