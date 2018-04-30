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
    return new Button(idGenerator.nextId(), buttonName, task);
}

export function createFilledSection(question, options) {

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

    return section;
}

export function random() {
    // random mean that we are not interested in this ID but still we don't want any collision
    return idGenerator.nextId();
}

export function createQuestion(id, type) {
    let fieldGenerator = FieldGeneratorStrategies.createFieldGeneratorByIdentity(type);

    let questionViewCreator = function (viewId) {
        return new QuestionView(viewId);
    };

    return new Question(id, questionViewCreator, type, fieldGenerator);
}

export function createSection(id, mainContainerIdentity) {
    let sectionViewCreator = (id) => {
        return new SectionView(id, mainContainerIdentity);
    };

    return new Section(id, sectionViewCreator);
}

export function createSimpleContainer(id, containerIdentity) {
    let containerViewCreator = (id) => {
        return new ContainerView(id);
    };

    return new Container(id, containerIdentity, containerViewCreator);
}