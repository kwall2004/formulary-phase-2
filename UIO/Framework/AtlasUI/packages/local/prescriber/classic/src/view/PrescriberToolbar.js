Ext.define('Atlas.prescriber.view.PrescriberToolbar', {
    extend: 'Ext.tab.Panel',
    xtype: 'prescriber-prescribertoolbar',
    reference:'prescribertoolbar',
    title: 'Prescriber',
    controller: 'prescriber',
    viewModel: 'prescriber',
    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        flex:1,
        items: [
            {
                xtype: 'tbspacer',
                margin: '0 3 0 0'
            },
            {
                xtype: 'segmentedbutton',
                items: [
                    {
                        text: 'NPI',
                        tooltip: 'Search by NPI',
                        iconCls: 'x-fa fa-search',
                        action: 'npi',
                        pressed: true
                    },
                    {
                        text: 'Advanced',
                        tooltip: 'Search by Advanced',
                        iconCls: 'x-fa fa-search',
                        action: 'advanced'
                    }
                ],
                listeners: {
                    toggle: 'onSearchTypeToggle'
                }
            },
            {
                xtype: 'prescribertypeahead',
                reference:'advancedtextbox',
                bind:{
                    hidden:'{!isAdvancedSearch}'
                },
                flex:.8,
                displayField:'fullname',
                listeners:{
                    select:'onPrescriberSelection'
                }
            },
            {
                xtype: 'textfield',
                bind:{
                    hidden:'{!isNPISearch}'
                },
                reference:'npitextbox',
                emptyText:'[NPI]',
                maskRe:/[0-9]/,
                flex:.8,
                listeners:{
                    specialkey:'onNPIEnter'
                }
            },
            {
                xtype:'container',
                html:'|'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'NPI',
                labelWidth:30,
                bind:{
                    value:'{masterrecord.npi}'
                }
            },
            {
                xtype:'container',
                html:'|'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Prescriber Name',
                labelWidth:110,
                bind:{
                    value: '{masterrecord.fullnamestartwithlast}'

                }
            },
            {
                xtype:'container',
                html:'|'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Phone',
                name: 'locphone',
                labelWidth:50,
                bind:{
                    value:'{masterrecord.locphone}'
                }
            },
            '->',
            {
                xtype: 'button',
                reference: 'menu',
                text: 'Menu',
                iconCls: 'x-fa fa-bars',
                menu: {
                    plain: true,
                    listeners: {
                        click: 'onMenuClick'
                    }
                }
            }
        ]
    },

    defaults: {
        closable: true
    },

    items: []


});