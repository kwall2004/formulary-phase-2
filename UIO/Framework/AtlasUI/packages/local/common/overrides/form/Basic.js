/**
 * nestedIndex support
 */
Ext.define('Atlas.common.overrides.form.Basic', {
    override: 'Ext.form.Basic',

    compatibility: '6.2.0',

    findField: function (id) {
        return this.getFields().findBy(function (f) {
            //Added nestedIndex property check
            return f.id === id || f.name === id || f.nestedIndex === id || f.dataIndex === id;
        });
    },

    loadRecord: function (record, nested) {
        this._record = record;
        return this.setValues(record.getData(), nested);
    },


    setValues: function (values, nested) {
        var me = this,
            v, vLen, val, fields, i = 0, len;

        function setVal(fieldId, val) {
            var field = me.findField(fieldId);
            if (field) {
                field.setValue(val);
                if (me.trackResetOnLoad) {
                    field.resetOriginalValue();
                }
            }
        }

        function setValNested(field, data) {
            var key, value;

            if (field) {
                key = field.nestedIndex || field.dataIndex;
                value = eval('data.' + key);
                field.setValue(value);

                if (me.trackResetOnLoad) {
                    field.resetOriginalValue();
                }
            }
        }

        // Suspend here because setting the value on a field could trigger
        // a layout, for example if an error gets set, or it's a display field
        Ext.suspendLayouts();

        if (nested) {
            // Load data based on form fields, rather than record names

            //Get fields
            fields = this.getFields().items;
            len = fields.length;

            for (; i < len; i++) {
                setValNested(fields[i], values);
            }

        } else {
            if (Ext.isArray(values)) {
                // array of objects
                vLen = values.length;

                for (v = 0; v < vLen; v++) {
                    val = values[v];

                    setVal(val.id, val.value);
                }
            } else {
                // object hash
                Ext.iterate(values, setVal);
            }
        }

        Ext.resumeLayouts(true);
        return this;
    },

    updateRecord: function (record, nested) {
        var me = this,
            obj = {},
            i = 0,
            fields, values, len, name, modifiedFieldNames;

        record = record || me._record;
        if (!record) {
            //<debug>
            Ext.raise("A record is required.");
            //</debug>
            return this;
        }

        if (nested) {
            // Get only modified ones. This eliminates second step of validation data against original value
            // This in fact will loop the form fields, so there is no need for second pass
            values = me.getFieldValues(true);
        } else {
            fields = record.self.fields;
            values = me.getFieldValues();

            len = fields.length;

            for (; i < len; ++i) {
                name = fields[i].name;

                if (values.hasOwnProperty(name)) {
                    obj[name] = values[name];
                }
            }
        }

        record.beginEdit();
        modifiedFieldNames = nested ? record.set(values, null, {nested: true}) : record.set(obj);
        nested ? record.endEdit(false, modifiedFieldNames) : record.endEdit();

        return this;
    }
});