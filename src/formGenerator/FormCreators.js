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
    return Button.createWithSettledId(buttonName, task);
}

export function createFilledSection(question, options) {
    let optionsContainer = createAdditionalOptionsContainer(options);
    let titleContainer = createTitleContainer();

    return createSectionContainer(titleContainer, question, optionsContainer);

    function createTitleContainer() {
        let temp = createSimpleContainer("title");

        let titleInput = TitleInput.createWithSettledId();
        let titleID = titleInput.getId();

        temp.putNode(titleID, titleInput);

        return temp;
    }

    function createAdditionalOptionsContainer(additionalOptions) {
        let temp = createSimpleContainer("spec");

        additionalOptions.forEach(opt => {
            let optId = opt.getId();
            temp.putNode(optId, opt);
        });

        return temp;
    }

    function createSectionContainer(title, question, additionals) {
        let section = createSection("survey");

        section.addToSectionBody(SectionEnum.TitleSection, title);
        section.addToSectionBody(SectionEnum.QuestionSection, question);

        let randomId = random();
        section.addToSectionBody(randomId, additionals);
        return section;
    }
}

export function random() {
    // random mean that we are not interested in this ID but still we don't want any collision
    return idGenerator.nextId();
}

export function createQuestion(type) {
    let fieldGenerator = FieldGeneratorStrategies.createFieldGeneratorByIdentity(type);
    let questionViewCreator = id => new QuestionView(id);

    return Question.createWithSettledId(questionViewCreator, type, fieldGenerator);
}

export function createSection(mainContainerIdentity) {
    let sectionViewCreator = id => new SectionView(id, mainContainerIdentity);
    return Section.createWithSettledId(sectionViewCreator);
}

export function createSimpleContainer(identity) {
    let containerViewCreator = id => new ContainerView(id);
    return Container.createWithSettledId(identity, containerViewCreator);
}