Ext.define('Atlas.prescriber.view.CreatePrescriber', {
    extend: 'Atlas.common.view.sharedviews.editablefieldset.Fieldset',
    xtype: 'prescriber-createprescriber',
    title: 'Create/Edit Prescriber',
    controller: 'createprescriber',
    viewModel: 'prescriber',
    scrollable: true,

    dialogxtype: 'prescriber-createprescribereditorwindow',
    Model: 'Atlas.common.model.Prescriber',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',

        items: [ {
            xtype: 'panel',
            iconCls: 'fa fa-user',
            width:23,
            iconMask: false
        },{
            xtype: 'prescribertypeahead',
            itemId: 'prescriberCombo',
            iconCls: 'x-fa fa-search',
            emptyText:'[NPI DEA PrescriberName]',
            fieldLabel: 'Prescriber',
            width: 500,
            listeners: {
                select: 'onPrescriberSelection'
            }
        }]
    },{
        xtype: 'toolbar',
        ui: 'footer',
        items: [
            {
                text: 'Add',
                iconCls: 'fa fa-plus',
                bind: {
                    hidden: '{!canCreate}',
                    disabled:'{createDisabled}'
                },
                handler: 'onAdd'
            },
            {
                text: 'Edit',
                itemId:'editFieldset',
                iconCls: 'fa fa-pencil-square-o',
                disabled:true,
                bind: {
                    hidden: '{!canEdit}',
                    disabled: '{editDisable}'
                },
                handler: 'onEdit'

            },
            {
                text: 'Remove',
                itemId:'deleteFieldset',
                iconCls: 'fa fa-minus',
                disabled:true,
                bind: {
                    hidden: '{!canDestroy}',
                    disabled: '{destroyDisabled}'
                },
                handler: 'onRemoveButtonClick'
            }]
    }],

    items: [{
        xtype: 'form',
        reference: 'createPrescriberForm',

        layout: 'hbox',

        items: [{
            xtype: 'panel',
            cls: 'card-panel',
            title: 'General Prescriber Information',
            flex: 1,
            defaults: {
                xtype: 'displayfield'
            },

            items: [{
                fieldLabel: 'NPI',
                name: 'npi',
                bind: {
                    value: "{masterrecord.npi}"
                }
            },{
                fieldLabel: 'Last Name',
                name: 'lastname',
                bind: {
                    value: "{masterrecord.lastname}"
                }
            },{
                fieldLabel: 'First Name',
                name: 'firstName',
                bind: {
                    value: "{masterrecord.firstname}"
                }
            },{
                fieldLabel: 'DEA',
                name: 'deaNum',
                bind: {
                    value: "{masterrecord.deaNum}"
                }
            },{
                fieldLabel: 'Degree',
                name: 'degree',
                bind: {
                    value: "{masterrecord.degree}"
                }
            },{
                fieldLabel: 'Specialty',
                name: 'Specialty',
                bind: {
                    value: "{masterrecord.Specialty}"
                }
            },{
                fieldLabel: 'State Licensed',
                name: 'licstate',
                bind: {
                    value: "{masterrecord.licstate}"
                }
            }, {
                xtype: 'container',
                margin: '10 0 0 0',
                layout: 'hbox',
                items:[{
                    xtype:'container',
                    html:'<label style="color:red; font-size:12px; font-weight:600">FWA Prescriber Lock:</label>'
                },{
                    xtype: 'checkboxfield',
                    itemId: 'FWAPrescriberCheckbox',
                    readOnly: true
                },{
                    xtype: 'combobox',
                    width:400,
                    itemId: 'ParentFWAPrescriberLockLOBField',
                    queryMode: 'local',
                    emptyText:   '[Select LOB]',
                    disabled:true,
                    bind: {
                        store: '{carrierlobsstore}'
                       // value: '{fieldrecord.FWAPrescriberLockLOB}'
                    },
                    multiSelect: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    listConfig: {
                        tpl: Ext.create('Ext.XTemplate',
                            '<div style="margin-top:5px"><tpl for=".">',
                            '<div class="boundList x-boundlist-item" style="display:table">',
                            '<span style="display:table-cell; vertical-align: middle;"><div class="chkbox" value={carrierLOBId}></div>{lobName}</span>',
                            '</div>',
                            '</tpl></div>'
                        )
                    },
                    disabled:true,
                    displayField: 'lobName',
                    valueField: 'carrierLOBId'
                }]
            },{
                    xtype:'container',
                    layout:'hbox',
                    items:[{
                        xtype:'container',
                        html:'<label style="color:red; font-size:12px; font-weight:600">Notes:</label>'
                    },{
                        xtype: 'textareafield',
                        disabled:true,
                        width:400,
                        name: 'prescriberLockNote',
                        bind: {
                            value: '{masterrecord.prescriberLockNote}'
                        }
                    }]
                }]
        },{
            xtype: 'panel',
            cls: 'card-panel',
            title: 'Location Information',
            flex: 1,

            defaults: {
                xtype: 'displayfield'
            },

            style: {
                'box-shadow': '0 0 5px rgba(0, 0, 0, 0.2)'
            },

            items: [{
                fieldLabel: 'Address 1',
                allowBlank:false,
                name: 'locaddr1',
                bind: {
                    value: "{masterrecord.locaddr1}"
                }
            },{
                fieldLabel: 'Address 2',
                allowBlank:false,
                name: 'locaddr2',
                bind: {
                    value: "{masterrecord.locaddr2}"
                }
            },{
                fieldLabel: 'Location City',
                allowBlank:false,
                name: 'loccity',
                bind: {
                    value: "{masterrecord.loccity}"
                }
            },{
                fieldLabel: 'State',
                allowBlank:false,
                name: 'locstate',
                bind: {
                    value: "{masterrecord.locstate}"
                }
            },{
                fieldLabel: 'Zip',
                allowBlank:false,
                name: 'zip',
                bind: {
                    value: "{masterrecord.zip}"
                }
            },{
                fieldLabel: 'Phone',
                name: 'locphone',
                bind: {
                    value: "{masterrecord.locphone}"
                }
            },{
                fieldLabel: 'Fax',
                name: 'locfax',
                bind: {
                    value: "{masterrecord.locfax}"
                }
            },{
                fieldLabel: 'Auth Fax',
                name: 'locauthfax',
                bind: {
                    value: "{masterrecord.locauthfax}"
                }
            }]
        }]
    }]
});