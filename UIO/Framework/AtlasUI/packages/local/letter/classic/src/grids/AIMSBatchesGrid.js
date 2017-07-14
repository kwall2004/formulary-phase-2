/**
 * Developer: Tremaine Grant
 * Description: This view used for the grid in the member locks section.
 */

Ext.define('Atlas.letter.grids.AIMSBatchesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'letter.AIMSBatchesGrid',
    bind: {
        store: '{aimsbatchesdata}'
    },
    height: '100%',
    viewConfig: {
        listeners: {
            rowclick: 'onRecordSelectAIMSBatches'
        }
    },
    columns: [
        {text: 'Select', xtype: 'checkcolumn', dataIndex: 'batchSelect', hideable: false},
        {text: 'AIMS Job Number', dataIndex: 'AIMSJobNum', flex: 1},
        {text: 'Number of Documents', dataIndex: 'DocCount', flex: 1}
    ],
    dockedItems: [{
        dock: 'bottom',
        xtype: 'pagingtoolbar',
        bind: {
            store: '{aimsbatchesdata}'
        },
        displayInfo: true,
        pageSize: 15
    }]
});
