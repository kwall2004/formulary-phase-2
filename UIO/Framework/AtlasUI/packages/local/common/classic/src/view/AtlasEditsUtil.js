Ext.define('Atlas.common.view.AtlasEditsUtil', {
    className: 'AtlasEditsUtil',
    methodName: '',
    validEmail: function (wEmailString) {
        /*
         returns true if valid email
         return false if invalid email
         */
        var ereg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (testResult = ereg.test(wEmailString)) {
            return true;
        }
        else {
            return false;
        }
    }
});