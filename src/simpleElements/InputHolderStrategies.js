export const HolderStrategyIdentity = Object.freeze({
    shortTextInput: 'shortTextInput',
    textArea: 'textArea',
    radioBoxStrategy: 'radioBoxStrategy',
    checkBoxStrategy: 'checkBoxStrategy'
});

export class InputHolderStrategies {
    static createHolderStrategyByIdentity(identity) {
        switch (identity) {
            case HolderStrategyIdentity.radioBoxStrategy:
                return multipleItemsStrategy().bind({}, 'radio');

            case HolderStrategyIdentity.checkBoxStrategy:
                return multipleItemsStrategy().bind({}, 'checkbox')
        }

        function multipleItemsStrategy() {
            return function (type, id) {
                return function (node) {
                    let div = document.createElement('div');
                    let input = document.createElement('input');
                    input.type = type;
                    div.appendChild(input);
                    div.appendChild(node);
                    input.name = id;

                    return div;
                }
            }
        }
    }
}