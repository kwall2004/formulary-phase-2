/**
 * Created by d3973 on 2/24/2017.
 */
Ext.define('Atlas.common.view.AutoFormatDate', {
    singleton: true,

    autoFormatDate: function(myDatefield){
        var dateVal = myDatefield.getValue(),
            dateRawVal = myDatefield.getRawValue(),
            dateLength;

        if(dateVal){
            dateLength = dateRawVal.length;
        }
        else{
            return;
        }

        if((dateLength < 10) || (dateLength > 10)){
            var arrayDate = dateRawVal.split('/'),
                newArrayDate = [],
                newRawVal;

            function checkNumDigits(digitVal, expectedNumDigits){
                if (expectedNumDigits === digitVal.length){
                    return digitVal;
                }
                else if ((digitVal.length === 1) && (expectedNumDigits === 2)){
                    return '0' + digitVal;
                }
                else if ((digitVal.length === 2) && (expectedNumDigits === 4)){
                    return '20' + digitVal;
                }
                else {
                    return 'invalid';
                }
            }

            if (arrayDate.length !== 3){
                return;
            }

            newArrayDate[0] = checkNumDigits(arrayDate[0], 2);
            newArrayDate[1]= checkNumDigits(arrayDate[1], 2);
            newArrayDate[2]= checkNumDigits(arrayDate[2], 4);

            if((newArrayDate[0] === 'invalid') || (newArrayDate[1] === 'invalid') || (newArrayDate[2] === 'invalid')){
                return;
            }

            newRawVal = newArrayDate.join('/');

            myDatefield.setValue(newRawVal);
            //note: setRawValue is a private Sencha method
            myDatefield.setRawValue(newRawVal);
        }
    }
});