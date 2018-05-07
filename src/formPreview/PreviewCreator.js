import {Question} from "./survey/question/Question.js";
import {QuestionVM} from "./survey/question/QuestionVM.js";
import {QuestionView} from "./survey/question/QuestionView.js";
import {MultipleFieldsBoxVM} from "./simpleElements/multipleFieldBox/MultipleFieldsBoxVM.js";

import {
    UpdateStrategies,
    UpdateStrategiesEnum
} from "./observerPattern/UpdateStrategies.js";
import {rightSideContextAdder} from "../shared/Common.js";
import {ArrayList} from "../shared/ArrayList.js";
import {CheckBoxVM} from "./simpleElements/multipleFieldBox/checkBox/CheckBoxVM.js";
import {RadioBoxVM} from "./simpleElements/multipleFieldBox/radiobox/RadioBoxVM.js";
import {Section} from "./survey/section/Section.js";
import {SectionVM} from "./survey/section/SectionVM.js";
import {FieldGeneratorStrategyIdentity} from "../formGenerator/simpleElements/FieldGeneratorStrategies.js";
import {TitleInputVM} from "./simpleElements/titleInput/TitleInputVM.js";
import {PreviewSectionsContainer} from "./survey/section/PreviewSectionsContainer.js";
import {SimpleElement} from "./simpleElements/SimpleElement.js";
import {SimpleElementVM} from "./simpleElements/simpleVM/SimpleElementVM.js";

export const previewCreator = (function () {
    let previewSectionsContainer = new PreviewSectionsContainer("survey");

    return Object.freeze({
        injectPreviewMode: injectPreviewMode
    });

    function injectPreviewMode(form) {
        previewSectionsContainer.clear();
        let generatedSections = form.getSections();
        loadGeneratedSectionsToPreviewElements(generatedSections);

        previewSectionsContainer.inject();

        function loadGeneratedSectionsToPreviewElements(generatedSections) {
            generatedSections.forEach((section, sectionID) => {
                let titleVM = getTitleVMFromGeneratedSection(section);
                let questionVM = getFilledQuestionVMFromGeneratedSection(section);

                let prevSectionVM = (function (id) {
                    let previewSection = new Section(id);
                    return new SectionVM(previewSection);
                }(sectionID));

                prevSectionVM.addComponent(titleVM);
                prevSectionVM.addComponent(questionVM);
                previewSectionsContainer.addSection(prevSectionVM);
            });
        }
        
        function getTitleVMFromGeneratedSection(generatedSection) {
            let titleInput = generatedSection.getTitle();

            let id = titleInput.getId();
            let content = titleInput.getCurrentValue();
            let title = new SimpleElement(id, content);
            return new TitleInputVM(title);
        }

        function getFilledQuestionVMFromGeneratedSection(generatedSection) {
            let generatedQuestion = generatedSection.getQuestion();

            let questionID = generatedQuestion.getId();
            let questionType = generatedQuestion.getQuestionType();
            let {convertedSimpleElements, updateStrategyIdentity} =
                getSimpleElementsResolver(questionType)(generatedQuestion);

            let strategy = UpdateStrategies.getStrategyCreatorByIdentity(updateStrategyIdentity);
            let questionModel = new Question(questionID);

            let questionVM = new QuestionVM(questionModel, strategy);
            convertedSimpleElements.forEach(function (element) {
                questionVM.addSimpleNode(element);
            });

            return questionVM;
        }
    }
}());

function getSimpleElementsResolver(type) {
    switch (type) {
        case FieldGeneratorStrategyIdentity.radioBoxStrategy:
            return function radioElementsConverter(question) {
                let convertedElements = multipleFieldsConverter(question, function (simpleElementModel) {
                    return new RadioBoxVM(simpleElementModel);
                });

                return {
                    convertedSimpleElements: convertedElements,
                    updateStrategyIdentity: UpdateStrategiesEnum.checkBoxUpdate
                };
            };

        case FieldGeneratorStrategyIdentity.checkBoxStrategy:
            return function radioElementsConverter(question) {
                let convertedElements = multipleFieldsConverter(question, function (simpleElementModel) {
                    return new CheckBoxVM(simpleElementModel);
                });

                return {
                    convertedSimpleElements: convertedElements,
                    updateStrategyIdentity: UpdateStrategiesEnum.simpleUpdate
                };
            };

        case FieldGeneratorStrategyIdentity.simpleStrategy:
            return function (question) {
                let convertedElements = multipleFieldsConverter(question, function (simpleElementModel) {
                    return new SimpleElementVM(simpleElementModel);
                });

                return {
                    convertedSimpleElements: convertedElements,
                    updateStrategyIdentity: UpdateStrategiesEnum.simpleUpdate
                };
            };

        default:
            throw "Invalid converter strategy identity";
    }

    function multipleFieldsConverter(question, constructor) {
        let simpleElements = question.getSimpleElements();
        let temp = new ArrayList();

        simpleElements.forEach(el => {
            let content = el.getCurrentValue();
            let id = el.getId();

            let checkBoxModel = new SimpleElement(id, content);
            let boxVM = constructor(checkBoxModel);

            temp.add(boxVM);
        });

        return temp;
    }

}