Ext.define('Atlas.claims.view.detail.ClaimsAdvancedSearchForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'claimsAdvancedSearchForm',

    requires: ['Atlas.claims.view.detail.ClaimsAdvancedSearchGrid'],

    bodyPadding: 10,
    items: [{
            xtype: 'form',
            cls: 'claimsSearchForm',
            items: [{
                xtype: 'container',
                ui: 'slated',
                layout: 'hbox',
                    //bind: '{modules}',
                items: [{
                    xtype: 'textfield',
                    width: 400,
                    name: 'claimsSearchMemberField',
                    fieldLabel: 'Member',
                    emptyText: '(e.g. John)'
                }, {
                    xtype: 'datefield',
                    name: 'claimsSearchServiceDateField01',
                    fieldLabel: 'Service Date',
                    flex: 2,
                    margin: '0 0 0 12'
                }, {
                    xtype: 'datefield',
                    name: 'claimsSearchServiceDateField02',
                    fieldLabel: '',
                    flex: 1,
                    margin: '0 0 0 12'
                },{
                    xtype: 'displayfield',
                    flex: 6
                }, {
                    xtype: 'button',
                    text: 'Help',
                    listeners: {
                        // click: 'doClickHelp'
                        click: function() {
                            Ext.Msg.show({
                                title: 'Help window',
                                message: 'This is where the help contents will go.',
                                buttons: Ext.Msg.OK
                            });
                        }
                    } ,
                    iconCls: 'x-fa fa-question-circle',
                    flex: 1
                }]
            }, {
                xtype: 'container',
                ui: 'slated',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    name: 'claimsSearchPrescriberField',
                    fieldLabel: 'Prescriber',
                    width: 400
                },{
                    xtype: 'textfield',
                    name: 'claimsSearchProviderField',
                    fieldLabel: 'Provider',
                    flex: 5,
                    margin: '0 0 0 12',
                    emptyText: '(e.g. Target Pharmacy MI 48188)'
                }, {
                    xtype: 'displayfield',
                    flex: 5
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                ui: 'slated',
                items: [{
                    xtype: 'textfield',
                    name: 'claimsSearchNDCField',
                    fieldLabel: 'NDC',
                    width: 400,
                    emptyText: '(e.g. Nexium)'
                }, {
                    xtype: 'textfield',
                    name: 'claimsSearchGCNField',
                    fieldLabel: 'GCN',
                    flex: 5,
                    margin: '0 0 0 12',
                    emptyText: '(e.g. Nexium)'
                }, {
                    xtype: 'displayfield',
                    flex: 5
                }]
            }, {
                xtype: 'container',
                ui: 'slated',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    name: 'claimsSearchRxField',
                    fieldLabel: 'Rx Number',
                    width: 400
                }, {
                    xtype: 'combobox',
                    name: 'claimsSearchSortByField01',
                    fieldLabel: 'Sort By',
                    flex: 0.5,
                    margin: '0 0 0 12'
                }, {
                    xtype: 'combobox',
                    name: 'claimsSearchSortByField02',
                    fieldLabel: 'And',
                    flex: 0.5,
                    margin: '0 0 0 12'
                }, {
                    xtype: 'displayfield',
                    flex: 1
                }]

            }],
            buttons: [{
                text: 'Reset',
                listeners: {
                    //click: 'doClaimsSearchReset'
                }
                //iconCls: 'x-fa fa-check'
            }, {
                text: 'Search',
                formBind: true,
                listeners: {},
                iconCls: 'x-fa fa-search'
            }]
        }, {
            xtype: 'claimsAdvancedSearchGrid'
        }]
});
