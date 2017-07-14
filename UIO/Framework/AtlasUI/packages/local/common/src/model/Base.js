Ext.define('Atlas.common.model.Base', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.identifier.Uuid',
        'Atlas.common.data.proxy.Layer7',

        // Require validators and custom fields here
        'Atlas.common.model.field.PhoneNumber',
        'Atlas.common.model.field.ZipCode',
        'Atlas.common.data.field.Array',
        'Atlas.common.data.field.ObjectArray',
        'Ext.data.validator.Length',
        'Ext.data.validator.Email'
    ],

    idProperty: 'id', // defaults to id, added for clarity
    identifier: 'uuid', // uuid, sequential or negative

    schema: {
        id: 'atlas',
        namespace: 'Atlas',
        proxy: {
            type: 'layer7',
            extraParam: {pagination: false} // Whoever added this line- this does not work!
        }
    },

    saveDelimiter: '|',

    /**
     * Returns object containing prepared data for save - fields and their values as delimeted strings
     * @param all
     * @returns {{fields: string, values: string}}
     */
    getSaveData: function (all) {
        var me = this,
            ret = {},
            data = me.getProxy().getWriter().getRecordData(me),
            content = all ? data : me.modified,
            fieldsMap = me.fieldsMap,
            names = [],
            values = [],
            raw = [],
            field, name, value;

        if (content) {
            for (name in content) {
                value = data[name];

                field = fieldsMap[name];
                if (field) {
                    names.push(name);
                    values.push(value);
                    raw[name] = value
                }
            }
        }

        return {
            fields: names.join(me.saveDelimiter),
            values: values.join(me.saveDelimiter),
            raw: raw
        }
    }
});
