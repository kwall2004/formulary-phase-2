/**
 * Created by T4317 on 8/12/2016.
 * Last developer: j2487
 */
Ext.define('Atlas.member.view.HedisContact', {
    extend: 'Ext.window.Window',
    xtype: 'member-hediscontact',

    title: 'Hedis Contact',
    viewModel: 'member',
    controller: 'HedisContact',

    modal: true,
    closable: true,
    itemId: 'winHedisContact',

    width: 500,
    height: 600,

    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 10,
    defaults: {
        frame: true,
        bodyPadding: 10
    },
    items: [
        {
            height: 75,
            margin: '0 0 10 0',
            layout: 'fit',
            plain: true,
            items: [
                {
                    defaultType: 'displayfield',
                    fieldDefaults: {
                        labelWidth: 60
                    },
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    bodyPadding: 5,
                    border: false,
                    items: [
                        {
                            fieldLabel: 'MRx ID',
                            name: 'MRxID'
                        },
                        {
                            fieldLabel: 'Name',
                            name: 'memberName'
                        }]
                }]
        },
        {
            flex: 1,
            margin: '0 0 10 0',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            bodyPadding: 10,
            defaults: {
                frame: true,
                bodyPadding: 10
            },
            items: [
                {
                    flex: 1,
                    margin: '0 10 0 0',
                    title: 'Contact',
                    xtype: 'fieldset',
                    items: [
                        {
                            xtype: 'radiogroup',
                            columns: 1,
                            name: 'rb-contact',
                            items: [
                                {
                                    boxLabel: 'Member Contact',
                                    name: 'contact',
                                    inputValue: 'member',
                                    itemId: 'rdMemberContact'
                                }, {
                                    boxLabel: 'Provider Contact',
                                    name: 'contact',
                                    inputValue: 'provider',
                                    itemId: 'rdProviderContact'
                                }
                            ]
                        }
                    ]
                },
                {
                    flex: 1,
                    margin: '0 10 0 0',
                    title: 'Call',
                    xtype: 'fieldset',
                    items: [
                        {
                            xtype: 'radiogroup',
                            columns: 1,
                            name: 'rb-call',
                            items: [
                                {
                                    boxLabel: 'Inbound Call',
                                    name: 'call',
                                    inputValue: 'inbound',
                                    itemId: 'rdInboundCall'
                                }, {
                                    boxLabel: 'Outbound Call',
                                    name: 'call',
                                    inputValue: 'outbound',
                                    itemId: 'rdOutboundCall'
                                }
                            ]

                        }
                    ]
                }
            ]
        },
        {
            height: 10,
            margin: '0 0 10 0',
            xtype: 'checkbox',
            boxLabel: 'Resolved in First Call', itemId: 'chkResolvedCall'
        },
        {
            flex: 2,
            margin: '0 0 10 0',
            xtype: 'fieldset',
            title: 'Notes',
            layout: 'fit',
            plain: true,
            itemId: 'hedisNotes',
            items: [
                {
                    xtype: 'form',
                    defaultType: 'displayfield',
                    fieldDefaults: {
                        labelWidth: 100
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    bodyPadding: 5,
                    border: false,
                    items: [
                        {
                            fieldLabel: 'Completed Hedis',
                            name: 'completedHedis',
                            xtype: 'tagfield',
                            itemId: 'compHedis',
                            bind: {
                                store: '{memberhedissummary}'
                            },
                            valueField: 'measureDesc',
                            displayField: 'measureDesc',
                            listeners: {select: 'onMeasureSelect'},
                            createNewOnEnter: false,
                            queryMode: 'local',
                            createNewOnBlur: false,
                            filterPickList: false,
                            publishes: 'value',
                            name: 'compHedis'
                        },
                        {
                            xtype: 'textarea',
                            itemId: 'noteDesc',
                            name: 'noteDesc',
                            // Setting flex to 1 for textarea when no other component has flex
                            // is effectively tells the layout to strech the textarea vertically,
                            // taking all the space left after the fields above have been laid out.
                            flex: 1
                        }]
                }]
        }
    ],
    dockedItems: {
        dock: 'bottom',
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        bodyPadding: 10,
        defaults: {
            frame: true,
            bodyPadding: 10
        },
        items: [
            {
                xtype: 'combobox',
                reference:'planGroupCombo',
                fieldLabel: 'Plan Group',
                queryMode: 'local',
                allowBlank:false,
                bind: {store: '{memberplanstore}'},
                displayField: 'planGroupName',
                valueField: 'planGroupId',
                listeners: {
                    select: 'onMemberPlanSelect'
                }
            },
            {
                //TODO make sure this is hooked up to save to server.
                xtype: 'button',
                text: 'Save',
                handler: 'onSaveClick'
            },
            {
                xtype: 'button',
                text: 'Cancel',
                handler: function () {
                    this.up().up().destroy();
                }
            }]
    }

});