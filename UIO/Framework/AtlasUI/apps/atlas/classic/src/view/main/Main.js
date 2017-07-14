Ext.define('Atlas.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Atlas.view.main.MainController',
        'Atlas.view.main.MainModel',
        'Ext.layout.container.Border'
    ],
    itemId:'mainViewPort',
    controller: 'main',
    viewModel: 'main',
    cls:'panelBorder',
    layout: 'border',

    items: [
        {
            xtype: 'container',
            region: 'center',
            reference: 'mainPanel',
            layout: {
                type: 'card'
            },
            items: []
        }

    ]
});
