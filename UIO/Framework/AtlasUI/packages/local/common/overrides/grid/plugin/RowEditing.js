Ext.define('Atlas.common.overrides.grid.plugin.RowEditing', {
    override: 'Ext.grid.plugin.RowEditing',

    compatibility: '6.2.0',

    getContextFieldValues: function () {
        var editor = this.editor,
            context = this.context,
            record = context.record,
            newValues = {},
            originalValues = {},
            editors = editor.query('>[isFormField]'),
            len = editors.length,
            i, name, item, idx, idxArrPos, hasNested, tmpObj = {};

        for (i = 0; i < len; i++) {
            item = editors[i];
            name = item.nestedIndex || item.dataIndex;
            hasNested = !!item.nestedIndex;

            if (hasNested) {
                idx = name.split('.')[0]; // get root field name
                // If name has an Array part we have to trim it off
                idxArrPos = idx.indexOf('[');
                if (idxArrPos > 0) {
                    idx = idx.substr(0, idxArrPos);
                }

                tmpObj[idx] = Ext.clone(record.data[idx]);
            }

            originalValues[hasNested ? idx : name] = record.get(hasNested ? idx : name);

            if (hasNested) {
                eval('tmpObj.' + item.nestedIndex + '=item.getValue()');
                newValues[idx] = tmpObj[idx];
            } else {
                newValues[name] = item.getValue();
            }
        }

        Ext.apply(context, {
            newValues: newValues,
            originalValues: originalValues
        });
    }
});
