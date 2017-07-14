Ext.define('Atlas.common.overrides.form.Basic', {
    override: 'Ext.form.Basic',

    markInvalid: function(errors) {
        var me = this,
            e, eLen, error, value, key;

        function mark(fieldId, msg) {
            var field = me.findField(fieldId);
            if (field) {
                field.markInvalid(msg);
            }
        }
        if (Ext.isArray(errors)) {
            eLen = errors.length;
            for (e = 0; e < eLen; e++) {
                error = errors[e];
                mark(error.id || error.field, error.msg || error.message);
            }
        } else if (errors instanceof Ext.data.ErrorCollection) {
            eLen = errors.items.length;
            for (e = 0; e < eLen; e++) {
                error = errors.items[e];
                mark(error.field, error.message);
            }
        } else {
            for (key in errors) {
                if (errors.hasOwnProperty(key)) {
                    value = errors[key];
                    //Override - ignore boolean, ensures that only fields that have mesage will be marked
                    if (typeof value !== 'boolean') {
                        mark(key, value, errors);
                    }
                }
            }
        }
        return this;
    }
});