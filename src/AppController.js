import {idGenerator} from "./shared/IdGenerator.js";
import {
    FieldGeneratorStrategyIdentity
} from "./formGenerator/simpleElements/FieldGeneratorStrategies.js";
import {Form} from "./formGenerator/survey/Form.js";
import * as FormCreator from "./formGenerator/FormCreators.js";

const ApplicationController = (function () {
    const form = new Form();

    {
        document.getElementById('render__form').addEventListener('click', function () {
            form.render();
        });

        document.getElementById('add__textInput').addEventListener('click', function () {
            let question = FormCreator.createQuestion(idGenerator.nextId(), FieldGeneratorStrategyIdentity.none);
            handle(question, []);
        });

        document.getElementById('add__datetime').addEventListener('click', function () {
            let question = FormCreator.createQuestion(idGenerator.nextId(),
                                                      FieldGeneratorStrategyIdentity.datetimeBoxStrategy);
            handle(question, []);
        });

        document.getElementById('add__textArea').addEventListener('click', function () {
            let question = FormCreator.createQuestion(idGenerator.nextId(),
                                                      FieldGeneratorStrategyIdentity.textAreaStrategy);
            handle(question, []);
        });

        document.getElementById('delete__form').addEventListener('click', function () {
            form.clearSections();
        });

        document.getElementById('add__enumeratedList').addEventListener('click', function () {
            let question = FormCreator.createQuestion(idGenerator.nextId(),
                                                      FieldGeneratorStrategyIdentity.enumeratedListStrategy);

            let btn = FormCreator.createButton('option', question, () => {
                question.addSimpleElement();
                question.reRender();
            });

            handle(question, [btn]);
            question.reRender();
        });

        document.getElementById('add__rangeList').addEventListener('click', function () {
            let question = FormCreator.createQuestion(idGenerator.nextId(),
                                                      FieldGeneratorStrategyIdentity.rangeListStrategy);

            handle(question, []);
        });

        document.getElementById('add__radioQuestion').addEventListener('click', function () {
            let question = FormCreator.createQuestion(idGenerator.nextId(),
                                                      FieldGeneratorStrategyIdentity.radioBoxStrategy);

            let btn = FormCreator.createButton('radio', question);

            handle(question, [btn]);
        });

        document.getElementById('add__checkbox').addEventListener('click', function () {
            let question = FormCreator.createQuestion(idGenerator.nextId(),
                                                      FieldGeneratorStrategyIdentity.checkBoxStrategy);

            let btn = FormCreator.createButton('checkbox', question);

            handle(question, [btn]);
        })
    }
    
    function handle(question, options) {
        let section = FormCreator.createFilledSection(question, options);

        section.inject();
        question.addSimpleElement();

        form.put(section.getId(), section);
    }
})();