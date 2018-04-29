import {ShortTextInput} from "./ShortTextInput.js";

export class TitleInput extends ShortTextInput{
    generateNode() {
        let node = super.generateNode();
        node.placeholder = 'Title';

        return node;
    }
}