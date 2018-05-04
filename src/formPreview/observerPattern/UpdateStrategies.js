export const UpdateStrategiesEnum = Object.freeze({
    simpleUpdate: "SimpleUpdateStrategy",
    radioUpdate: "RadioUpdateStrategy",
    checkBoxUpdate: "CheckBoxUpdateStrategy",

});

export class UpdateStrategies {

    static getStrategyCreatorByIdentity(identity) {
        switch (identity) {
            case UpdateStrategiesEnum.simpleUpdate:
                return simpleStrategy();

            case UpdateStrategiesEnum.radioUpdate:
                break;

            case UpdateStrategiesEnum.checkBoxUpdate:
                return checkBoxStrategy();

            default:
                throw "Invalid update strategy identity";

        }

        function simpleStrategy() {
            return function (valueHolder) {
                return function (context) {
                    valueHolder.setValue(context.value);
                };
            };
        }

        function checkBoxStrategy() {
            return function (valueHolder) {
                valueHolder.setValue([]);

                return function (context) {
                    let currentValues = valueHolder.getValue();
                    let newval = currentValues.splice(0,0, context.value);
                    valueHolder.setValue(newval);
                };
            };
        }
    }
}