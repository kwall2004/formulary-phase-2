Ext.define('Atlas.prescriber.view.Detail', {
    extend: 'Ext.tab.Panel',

    viewModel: {
        data:{
            masterrecord: null
        },
        stores: {
            prescribers: {
                type: 'prescribers'
            }
        }
    },

    controller: 'prescriber-detail',
    title: 'Prescriber Detail',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'combo',
                labelWidth: 85,
                width: 350,
                fieldLabel: 'Prescriber',
                emptyText: 'Enter prescriber name',
                bind: {
                    store: '{prescribers}'
                },
                listConfig: {
                    getInnerTpl: function () {
                        // here you place the images in your combo
                        var tpl = '<div>' +
                            '{fullname}<br/>' +
                            '{loccity}, {locstate}</div>';
                        return tpl;
                    }
                },
                listeners: {
                    select: 'onPrescriberSelect'
                },
                reference: 'prescribercombo',
                queryMode: 'local',
                name: 'prescriber',
                displayField: 'fullname',
                valueField: 'npi'
            },
            '->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                handler: 'onNewClick',
                text: 'New Prescriber'
            }, {
                xtype: 'splitbutton',
                text: 'Menu',
                hidden: true,
                defaults: {
                    handler: 'onMenuClick'
                },
                menu: [
                    // these will render as dropdown menu items when the arrow is clicked:
                    {
                        text: 'General Information',
                        routePath: ''  //used to change the route to load the subsection
                    },
                    {
                        text: 'Prior Auth',
                        routePath: ''
                    },
                    {
                        text: 'Claims',
                        routePath: ''
                    },
                    {
                        text: 'Contact Log',
                        routePath: ''
                    },
                    {
                        text: 'Fax & Attachments',
                        routePath: ''
                    }
                ]
            }
        ]
    }],
    defaults: {
        closable: false
    },
    items: [
        {
            xtype: 'prescriber-general'
        },
        {
            xtype: 'prescriber-priorauth'
        },
        {
            xtype: 'prescriber-contactlog'
        },
        {
            xtype: 'prescriber-claims'
        },
        {
            xtype: 'prescriber-fax'
        }
    ]
});