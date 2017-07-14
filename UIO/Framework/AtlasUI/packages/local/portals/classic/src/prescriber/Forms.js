Ext.define('Atlas.portals.view.prescriber.Forms', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxprescriberforms',
    title: 'Documents And Forms',

    viewModel: 'forms',
    controller: 'formsview',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'panel',
            scrollable: true,
            region: 'west',
            title: 'Prior Auth Forms',
            flex: 1,
            split: true,
            reference: 'treelistContainer',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            items: [
                {
                    xtype: 'treelist',
                    bind: '{paFormTree}',
                    listeners: {
                        itemclick: 'onDocumentClick'
                    }
                },
                {
                    xtype: 'treelist',
                    itemId: 'formsTreeList',
                    reference: 'treelist',
                    bind: '{formstree}',
                    listeners: {
                        itemclick: 'onDocumentClick'
                    }
                }
            ]
        },
        {
            xtype: 'tabpanel',
            region: 'east',
            flex: 3,
            itemId: 'formDocsTabPanel',
            layout: {
                type: 'vbox',
                align: 'strech'
            }
        }
    ]
});