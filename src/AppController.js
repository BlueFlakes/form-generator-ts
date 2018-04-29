import {Question} from "./survey/question/Question.js";
import {QuestionView} from "./survey/question/QuestionView.js";
import {idGenerator} from "./shared/IdGenerator.js";
import {
    HolderStrategyIdentity,
    InputHolderStrategies
} from "./simpleElements/InputHolderStrategies.js";
import {Form} from "./survey/Form.js";
import {SectionView} from "./survey/section/SectionView.js";
import {Section} from "./survey/section/Section.js";
import {ContainerView} from "./survey/universalContainer/ContainerView.js";
import {Container} from "./survey/universalContainer/Container.js";
import {Button} from "./simpleElements/Button.js";
import {TitleInput} from "./simpleElements/TitleInput.js";
import {SectionEnum} from "./survey/section/Section.js";


const ApplicationController = (function () {
    const form = new Form();

    {
        document.getElementById('clear__form').addEventListener('click', function () {
            form.clearWindow();
        });

        document.getElementById('render__form').addEventListener('click', function () {
            form.render();
        });

        document.getElementById('add__radioQuestion').addEventListener('click', function () {
            addNewQuestionIntoSurvey('radio', HolderStrategyIdentity.radioBoxStrategy);
        });

        document.getElementById('add__checkbox').addEventListener('click', function () {
            addNewQuestionIntoSurvey('checkbox', HolderStrategyIdentity.checkBoxStrategy);
        })
    }
    
    function addNewQuestionIntoSurvey(buttonName, holderStrategyIdentity) {
        let id = idGenerator.nextId();

        let question = (function (newId, type) {
            let strategy = createHolderStrategy(type)(newId);
            return createQuestion(newId, strategy, type);

        })(id, holderStrategyIdentity);

        let specialOptionsContainerId = idGenerator.nextId();
        let specialOptions = createSimpleContainer(specialOptionsContainerId);
        let btn = new Button(idGenerator.nextId(), buttonName, () => question.addSimpleElement());
        specialOptions.addNode(btn.getId(), btn);


        let titleContainer = createSimpleContainer(idGenerator.nextId());
        let titleInput = new TitleInput(idGenerator.nextId());
        titleContainer.addNode(titleInput.getId(), titleInput);

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

    function createHolderStrategy(strategyIdentity) {
        return InputHolderStrategies.createHolderStrategyByIdentity(strategyIdentity);
    }

    function createQuestion(id, holderStrategy, type) {
        let questionView = new QuestionView(id, holderStrategy);
        return new Question(id, questionView, type);
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