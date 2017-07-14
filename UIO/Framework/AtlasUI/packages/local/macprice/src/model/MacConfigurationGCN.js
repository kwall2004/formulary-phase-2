
Ext.define('Atlas.macprice.model.MacConfigurationGCN', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'GCN_SEQNO',
    fields: [
        {name: 'GCN_SEQNO', type: 'number'},
        {name: 'UserMAC', type: 'string'},
        {name: 'SysMAC', type: 'string'},
        {name: 'PctChange', type: 'string'},
        {name: 'MarkedUpMAC', type: 'string'},
        {name: 'AvgMAC', type: 'string'},
        {name: 'FULInd', type: 'boolean'},
        {name: 'LastUpdatedDate', dateFormat: 'Y-m-d'},
        {name: 'LastUpdateBy', type: 'string'},
        {name: 'ObsoleteDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'NewGCN', type: 'boolean'},
        {name: 'Included', type: 'boolean'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/macbygcn',
        timeout: 120000
    }
});