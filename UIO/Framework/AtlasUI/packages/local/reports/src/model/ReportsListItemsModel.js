
Ext.define('Atlas.reports.model.ReportsListItemsModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'reportslistitemsmodel',
    fields: [
        {name: 'ListDescription', type: 'string'},
        {name: 'ListItem', type: 'string'}

    ],
    /*data: [
        {"abbr": 'ListItem', "name": 'ListDescription'}
    ],*/
    proxy: {
        url: 'portal/{0}/listdetail'
    }
});

