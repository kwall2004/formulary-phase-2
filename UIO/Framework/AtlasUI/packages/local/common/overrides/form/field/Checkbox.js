/**
 * Add support for custom checked Value
 * Here we are adding 'Y' as valid checker
 */
Ext.define('Atlas.common.overrides.form.field.Checkbox', {
    override: 'Ext.form.field.Checkbox',
    compatibility: '6.2.0',

    isChecked: function(rawValue, inputValue) {
        var ret = false;

        if (rawValue === true || rawValue === 'true') {
            ret = true;
        } else {
            if (inputValue !== 'on' && (inputValue || inputValue === 0) && (Ext.isString(rawValue) || Ext.isNumber(rawValue))) {
                ret = rawValue == inputValue;
            } else {
                ret = rawValue === 'Y' ||rawValue === '1' || rawValue === 1 || this.onRe.test(rawValue);
            }
        }
        return ret;
    }
});
