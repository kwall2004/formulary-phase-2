Ext.define('Atlas.reports.view.FilterWindowItems', {
    extend: 'Ext.form.Panel',
    xtype: 'reports-filterwindowitems',
    itemId: 'filterWindowItemsList',
    //config: {
    //    id: 'filterWindowItemsForm',
    //},
    padding: '5px',
    scrollable: true,
    items: [
        {
            xtype: 'form',
            name: 'filterFormItems',
            //id: 'filterFormItems',
            itemId: 'filterFormItems',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                labelWidth: 175,
                labelWrap: true
            },
            items: [

            ]
        }
    ]
});

