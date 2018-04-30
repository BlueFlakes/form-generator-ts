import {Question} from "./formGenerator/survey/question/Question.js";
import {QuestionView} from "./formGenerator/survey/question/QuestionView.js";
import {idGenerator} from "./shared/IdGenerator.js";
import {
    FieldGeneratorStrategyIdentity,
    FieldGeneratorStrategies
} from "./formGenerator/simpleElements/FieldGeneratorStrategies.js";
import {Form} from "./formGenerator/survey/Form.js";
import {SectionView} from "./formGenerator/survey/section/SectionView.js";
import {Section} from "./formGenerator/survey/section/Section.js";
import {ContainerView} from "./formGenerator/survey/universalContainer/ContainerView.js";
import {Container} from "./formGenerator/survey/universalContainer/Container.js";
import {Button} from "./formGenerator/simpleElements/Button.js";
import {TitleInput} from "./formGenerator/simpleElements/TitleInput.js";
import {SectionEnum} from "./formGenerator/survey/section/Section.js";


const ApplicationController = (function () {
    const form = new Form();

    {
        document.getElementById('render__form').addEventListener('click', function () {
            form.clearWindow();
            form.render();
        });

        document.getElementById('add__textInput').addEventListener('click', function () {
            let question = createQuestion(idGenerator.nextId(), FieldGeneratorStrategyIdentity.none);
            addNewQuestionIntoSurvey(question, []);
        });

        document.getElementById('add__datetime').addEventListener('click', function () {
            let question = createQuestion(idGenerator.nextId(), FieldGeneratorStrategyIdentity.datetimeBoxStrategy);
            addNewQuestionIntoSurvey(question, []);
        });

        document.getElementById('add__textArea').addEventListener('click', function () {
            let question = createQuestion(idGenerator.nextId(), FieldGeneratorStrategyIdentity.textAreaStrategy);
            addNewQuestionIntoSurvey(question, []);
        });

        document.getElementById('delete__form').addEventListener('click', function () {
            form.clearWindow();
            form.clearSections();
        });

        document.getElementById('add__radioQuestion').addEventListener('click', function () {
            let question = createQuestion(idGenerator.nextId(), FieldGeneratorStrategyIdentity.radioBoxStrategy);
            let btn = createButton('radio', question);

            addNewQuestionIntoSurvey(question, [btn]);
        });

        document.getElementById('add__checkbox').addEventListener('click', function () {
            let question = createQuestion(idGenerator.nextId(), FieldGeneratorStrategyIdentity.checkBoxStrategy);
            let btn = createButton('checkbox', question);

            addNewQuestionIntoSurvey(question, [btn]);
        })
    }

    function createButton(buttonName, question) {
        return new Button(idGenerator.nextId(), buttonName, () => question.addSimpleElement());
    }
    
    function addNewQuestionIntoSurvey(question, options) {

        let specialOptions = createSimpleContainer(idGenerator.nextId(), 'spec');

        options.forEach((opt) => {
            specialOptions.putNode(opt.getId(), opt);
        });

        let titleContainer = createSimpleContainer(idGenerator.nextId(), 'title');
        let titleInput = new TitleInput(idGenerator.nextId());
        titleContainer.putNode(titleInput.getId(), titleInput);

        let section = createSection(idGenerator.nextId(), 'survey');
        section.addToSectionBody(SectionEnum.TitleSection, titleContainer);
        section.addToSectionBody(SectionEnum.QuestionSection, question);
        section.addToSectionBody(random(), specialOptions);

        section.inject();

        question.addSimpleElement();

        form.put(section.getId(), section);
    }
    
    function random() {
        // random mean that we are not interested in this ID but still we don't want any collision
        return idGenerator.nextId();
    }

    function createQuestion(id, type) {
        let fieldGenerator = FieldGeneratorStrategies.createFieldGeneratorByIdentity(type);

        let questionViewCreator = function (viewId) {
            return new QuestionView(viewId);
        };

        return new Question(id, questionViewCreator, type, fieldGenerator);
    }

    function createSection(id, mainContainerIdentity) {
        let sectionViewCreator = (id) => {
            return new SectionView(id, mainContainerIdentity);
        };

        return new Section(id, sectionViewCreator);
    }
    
    function createSimpleContainer(id, containerIdentity) {
        let containerViewCreator = (id) => {
            return new ContainerView(id);
        };

        return new Container(id, containerIdentity, containerViewCreator);
    }
})();