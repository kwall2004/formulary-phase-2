/**
 * Created by b6636 on 1/3/2017.
 */
Ext.define('Atlas.view.auth.HpMemberActivation', {
    extend: 'Ext.window.Window',
    title: 'Member Online Account Activation',
    width: 450,
    closable: false,
    autoShow: true,
    modal: true,
    viewModel: {
        data: {
            activationCode: null,
            email: null
        },
        stores: {
            listItems: {
                model: 'Atlas.portals.hpmember.model.MemberMHPRegistrationModel'
            },
            portalmemberfuncs: {
                model: 'Atlas.portals.hpmember.model.PortalMemberFuncs'
            }
        }
    },
    controller: 'auth-hpmemberactivation',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Clear',
                    reference: 'clearButton',
                    bind: {
                        disabled: '{!username.value}'
                    },
                    handler: 'onClear'
                },
                '->',
                {
                    text: 'Activate',
                    reference: 'activateButton',
                    handler: 'onActivate'
                }
            ]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'displayfield',
                    flex: 1,
                    bind: {
                        value: '{errorMessage}'
                    }
                }
            ]
        }],
    defaultButton: 'activateButton',
    items: [
        {
            xtype: 'container',
            layout: 'center',

            items: [
                {
                    xtype: 'form',
                    reference: 'activateForm',
                    defaults: {
                        xtype: 'textfield',
                        anchor: '100%',
                        msgTarget: 'side',
                        labelWidth: 100,
                        width: 300
                    },
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'memberId',
                            fieldLabel: 'Member ID',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'datefield',
                            name: 'memberDOB',
                            fieldLabel: 'Date of Birth',
                            allowBlank: false,
                            format: 'm/d/Y',
                            altFormats: 'm/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                            flex: 1
                        },
                        {
                            xtype: 'combo',
                            reference: 'stateCombo',
                            fieldLabel: 'State',
                            store: {
                                fields: ['name'],
                                data: [
                                    {name: 'IL'},
                                    {name: 'MI'}
                                ]
                            },
                            displayField: 'name',
                            valueField: 'name',
                            name: 'stateCombo',
                            allowBlank: false,
                            listeners: {
                                change: 'hidePlanSelect'
                            }
                        },
                        {
                            xtype: 'combo',
                            reference: 'planList',
                            name: 'planList',
                            fieldLabel: 'Select Plan',
                            allowBlank: false,
                            flex: 1,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            listeners: {
                                beforerender: 'getListItems',
                                change: 'onPlanChange'
                            },
                            bind: {
                                hidden: '{hiddenForIL}',
                                disabled: '{hiddenForIL}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'center',
            margin: 5,
            items: [
                {
                    xtype: 'image',
                    reference: 'planImage',
                    height: 188,
                    width: 300
                }],
            bind: {
                hidden: '{memberCardHidden}'
            }
        }
    ]
});