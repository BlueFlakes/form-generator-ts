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

        DOM.attach.event("#render__form", DOM.OnEvent.click, function () {
            form.render();
        });

        DOM.attach.event("#delete__form", DOM.OnEvent.click, function () {
            form.clearSections();
        });

        (function attachQuestionCreators() {

            DOM.attach.event("#add__textInput", DOM.OnEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.simpleStrategy);
                handle(question, []);
            });

            DOM.attach.event("#add__datetime", DOM.OnEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.datetimeBoxStrategy);
                handle(question, []);
            });

            DOM.attach.event("#add__textArea", DOM.OnEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.textAreaStrategy);
                handle(question, []);
            });

            DOM.attach.event("#add__enumeratedList", DOM.OnEvent.click, function () {
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

            DOM.attach.event("#add__rangeList", DOM.OnEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.rangeListStrategy);
                handle(question, []);
            });

            DOM.attach.event("#add__radioQuestion", DOM.OnEvent.click, function () {
                let question = FormCreator.createQuestion(FieldGeneratorStrategyIdentity.radioBoxStrategy);
                let btn = FormCreator.createButton("radio", question);
                handle(question, [btn]);
            });

            DOM.attach.event("#add__checkbox", DOM.OnEvent.click, function () {
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