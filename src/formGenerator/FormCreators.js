import {ContainerView} from "./survey/universalContainer/ContainerView.js";
import {Button} from "./simpleElements/Button.js";
import {Section, SectionEnum} from "./survey/section/Section.js";
import {SectionView} from "./survey/section/SectionView.js";
import {FieldGeneratorStrategies} from "./simpleElements/FieldGeneratorStrategies.js";
import {Question} from "./survey/question/Question.js";
import {TitleInput} from "./simpleElements/TitleInput.js";
import {idGenerator} from "../shared/IdGenerator.js";
import {QuestionView} from "./survey/question/QuestionView.js";
import {Container} from "./survey/universalContainer/Container.js";

export function createButton(buttonName, question, task=() => question.addSimpleElement()) {
    let newId = idGenerator.nextId();
    return new Button(newId, buttonName, task);
}

export function createFilledSection(question, options) {

    let specialOptions = (function (additionalOptions) {
        let newId = idGenerator.nextId();
        let temp = createSimpleContainer(newId, "spec");

        additionalOptions.forEach(opt => {
            let optId = opt.getId();
            temp.putNode(optId, opt);
        });

        return temp;
    }(options));

    let titleContainer = (function () {
        let containerId = idGenerator.nextId();
        let temp = createSimpleContainer(containerId, "title");

        let nextId = idGenerator.nextId();
        let titleInput = new TitleInput(nextId);

        let titleID = titleInput.getId();
        temp.putNode(titleID, titleInput);

        return temp;
    }());

    let section = (function (title, question, additionals) {
        let sectionId = idGenerator.nextId();
        createSection(sectionId, "survey");
        
        section.addToSectionBody(SectionEnum.TitleSection, title);
        section.addToSectionBody(SectionEnum.QuestionSection, question);

        let randomId = random();
        section.addToSectionBody(randomId, additionals);

    }(titleContainer, question, specialOptions));

    return section;
}

export function random() {
    // random mean that we are not interested in this ID but still we don't want any collision
    return idGenerator.nextId();
}

export function createQuestion(type, id=idGenerator.nextId()) {
    let fieldGenerator = FieldGeneratorStrategies.createFieldGeneratorByIdentity(type);

    let questionViewCreator = function (viewId) {
        return new QuestionView(viewId);
    };

    return new Question(id, questionViewCreator, type, fieldGenerator);
}

export function createSection(id, mainContainerIdentity) {
    let sectionViewCreator = id => {
        return new SectionView(id, mainContainerIdentity);
    };

    return new Section(id, sectionViewCreator);
}

export function createSimpleContainer(id, containerIdentity) {
    let containerViewCreator = id => {
        return new ContainerView(id);
    };

    return new Container(id, containerIdentity, containerViewCreator);
}