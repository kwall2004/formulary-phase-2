Ext.define('Atlas.member.view.MemLocksMedication', {
    extend: 'Ext.form.Panel',
    xtype: 'member-memlocksmedication',
    controller: 'memlocksmedicationcontroller',
    layout: 'fit',
    width:200,
    viewModel: 'memlocks',
    items:[{
        xtype: 'fieldcontainer',
        layout: 'vbox',
        items:[
            {
                xtype: 'combobox',
                itemId: 'cbxDrugLevel',
                fieldLabel: 'Drug Level',
                displayField: 'ListDescription',
                allowBlank:false,
                valueField: 'ListItem',
                bind: {
                    store: '{StoreDrugLevel}'
                },
                listeners: {
                    select: 'cbxDrugLevel_Select'
                }
            },
            {
                xtype: 'combobox',
                itemId: 'cbxDrugSubLevel',
                fieldLabel: 'Drug Type',
                allowBlank:false,
                displayField: 'ListDescription',
                valueField: 'ListItem',
                bind: {
                    store: '{StoreDrugSubLevel}'
                }
            },
            {
                xtype : 'drugtypeahead',
                itemId : 'cbxGCN',
                fieldLabel : 'Drug Code',
                hideLabel : false,
                allowBlank:false,
                emptyText:'[e.g. Nexium]',
                matchFieldWidth: false,
                forceSelection:true,
                disabled:true,
                displayField : 'GCN_SEQNO',
                valueField : 'GCN_SEQNO'
            },
            {
                xtype: 'gpitypeahead',
                itemId: 'cbxGPI',
                fieldLabel: 'Drug Code',
                allowBlank:false,
                disabled:true,
                emptyText: '[e.g. Cycloserine]',
                displayField: 'GPIName',
                valueField: 'GPICode',
                hidden:true
            },
            {
                xtype : 'drugtypeahead',
                itemId : 'cbxNDC',
                fieldLabel : 'Drug Code',
                emptyText:'[e.g. Nexium]',
                allowBlank:false,
                disabled:true,
                matchFieldWidth: false,
                forceSelection:true,
                displayField : 'NDC',
                valueField : 'NDC',
                hidden:true
            },
            {xtype:'textfield',fieldLabel:'Drug Code',  itemId : 'txtOther',hidden:true,allowBlank:false, disabled:true},
            {
                xtype: 'hidden', itemId: 'hdnRecipientId',name:'hdnRecipientId'
            }
        ]
    }],

    dockedItems:[{
        xtype:'toolbar',
        dock:'bottom',
        items:[
            {xtype: 'button', text:'Save', iconCls:'fa fa-save', itemId : 'btnSaveAnswersList', handler: 'onSaveClick'},
            {xtype: 'button', text:'Cancel', iconCls:'fa fa-remove', handler: 'onCancelClick'}
        ]
    }]
});