Ext.define('Atlas.common.overrides.grid.plugin.Exporter', {
    override: 'Ext.grid.plugin.Exporter',

    compatibility: '6.2.0',

    extractGroups: function(group, columns){
        var store = this.cmp.getStore(),
            len = store.getCount(),
            lenCols = columns.length,
            i, j, record, row, col, useRenderer, v;

        // we could also export grouped stores
        for(i = 0; i < len; i++){
            record = store.getAt(i);
            row = group.addRow();

            for(j = 0; j < lenCols; j++){
                col = columns[j];
                // each column has a config 'ignoreExport' that can tell us to ignore the column on export
                if(!col.ignoreExport) {
                    // if there is no `exportStyle` format for the column then we use the existing formatter
                    useRenderer = !Ext.isEmpty(col.initialConfig.formatter) && Ext.isEmpty(col.formatter) && !col.exportStyle && (col.exportStyle && !col.exportStyle.format);
                    v = record.get(col.dataIndex);

                    row.addCell({
                        value: useRenderer ? col.renderer(v) : v
                    });
                }
            }
        }

        return group;
    }
});
