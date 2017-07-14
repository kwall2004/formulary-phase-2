Ext.define('Atlas.common.overrides.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    compatibility: '6.2.0',

    shouldUpdateCell: function (record, changedFieldNames) {
        // If the column has a renderer which peeks and pokes at other data,
        // return 1 which means that a whole new TableView item must be rendered.
        //
        // Note that widget columns shouldn't ever be updated.
        if (!this.preventUpdate) {
            if (this.hasCustomRenderer) {
                return 1;
            }

            // If there is a changed field list, and it's NOT a custom column renderer
            // (meaning it doesn't peek at other data, but just uses the raw field value),
            // we only have to update it if the column's field is among those changes.
            if (changedFieldNames) {
                var len = changedFieldNames.length,
                    i = 0, field, idx, idxArrPos, hasNested = !!this.nestedIndex;

                if (hasNested) {
                    idx = this.nestedIndex.split('.')[0]; // get root field name
                    // If name has an Array part we have to trim it off
                    idxArrPos = idx.indexOf('[');
                    if (idxArrPos > 0) {
                        idx = idx.substr(0, idxArrPos);
                    }
                }

                for (; i < len; ++i) {
                    field = changedFieldNames[i];
                    if (field === idx || field === this.dataIndex || field === record.idProperty) {
                        return 2;
                    }
                }
            } else {
                return 2;
            }
        }
    }
});