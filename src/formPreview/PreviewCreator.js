import {Question} from "./survey/question/Question.js";
import {QuestionVM} from "./survey/question/QuestionVM.js";
import {QuestionView} from "./survey/question/QuestionView.js";
import {CheckBox} from "./simpleElements/checkBox/CheckBox.js";
import {CheckBoxVM} from "./simpleElements/checkBox/CheckBoxVM.js";
import {CheckBoxView} from "./simpleElements/checkBox/CheckBoxView.js";

import {
    UpdateStrategies,
    UpdateStrategiesEnum
} from "./observerPattern/UpdateStrategies.js";
import {rightSideContextAdder} from "../shared/Common.js";
import {ArrayList} from "../shared/ArrayList.js";

export function createPreview(form) {

    let sectionsMap = form.getSections();

    sectionsMap.forEach((section, sectionID) => {
        let generatedQuestion = section.getQuestion();
        let questionID = generatedQuestion.getId();

        let previewCheckBoxesCreators = (function () {
            let arr = new ArrayList();
            let simpleElements = generatedQuestion.getSimpleElements();

            simpleElements.forEach(el => {
                let content = el.getCurrentValue();
                let id = el.getId();

                let checkBoxCreator = rightSideContextAdder(params => {
                    let checkBoxModel = new CheckBox(...params);
                    return new CheckBoxVM(checkBoxModel);
                }, id, content);

                arr.add(checkBoxCreator);
            });

            return arr;
        }());

        let strategy = UpdateStrategies.getStrategyCreatorByIdentity(UpdateStrategiesEnum.checkBoxUpdate);
        let ctxData = Object.freeze({
            parentId: "survey"
        });

        let questionModel = new Question(ctxData, questionID);
        let questionVM = new QuestionVM(questionModel, strategy);

        previewCheckBoxesCreators.forEach(el => {
            questionVM.addSimpleNode(el);
        });

        questionVM.injectNode();
    });
}