import {
    FieldGeneratorStrategyIdentity
} from "./formGenerator/simpleElements/FieldGeneratorStrategies.js";
import {Form} from "./formGenerator/survey/Form.js";
import * as FormCreator from "./formGenerator/FormCreators.js";
import {DOM} from "./shared/Constants.js";

const ApplicationController = (function () {
    "use strict";
    const form = new Form();

    (function attachEventListeners() {
        
        (function attachFormStateManagers() {
            DOM.attach.event.byId("render__form", DOM.onEvent.click, function () {
                form.render();
            });

            DOM.attach.event.byId("delete__form", DOM.onEvent.click, function () {
                form.clearSections();
            });
        }());

        (function attachQuestionCreators() {

            DOM.attach.event.byId("add__textInput", DOM.onEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.simpleStrategy);
                handle(question, []);
            });

            DOM.attach.event.byId("add__datetime", DOM.onEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.datetimeBoxStrategy);
                handle(question, []);
            });

            DOM.attach.event.byId("add__textArea", DOM.onEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.textAreaStrategy);
                handle(question, []);
            });

            DOM.attach.event.byId("add__enumeratedList", DOM.onEvent.click, function () {
                let question = (function () {
                    let strategyIdentity = FieldGeneratorStrategyIdentity.enumeratedListStrategy;
                    return FormCreator.createQuestion(strategyIdentity);
                }());
                
                let btn = (function (question) {
                    let btnStrategy = () => {
                        question.addSimpleElement();
                        question.reRender();
                    };

                    return FormCreator.createButton("option", question, btnStrategy);
                }(question));

                handle(question, [btn]);
                question.reRender();
            });

            DOM.attach.event.byId("add__rangeList", DOM.onEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.rangeListStrategy);
                handle(question, []);
            });

            DOM.attach.event.byId("add__radioQuestion", DOM.onEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.radioBoxStrategy);
                let btn = FormCreator.createButton("radio", question);
                handle(question, [btn]);
            });

            DOM.attach.event.byId("add__checkbox", DOM.onEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.checkBoxStrategy);
                let btn = FormCreator.createButton("checkbox", question);
                handle(question, [btn]);
            });

        }());
    }());

    function handle(question, options) {
        let section = FormCreator.createFilledSection(question, options);

        section.inject();
        question.addSimpleElement();

        let sectionId = section.getId();
        form.put(sectionId, section);
    }
}());