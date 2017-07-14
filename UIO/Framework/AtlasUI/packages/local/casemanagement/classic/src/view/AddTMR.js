/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.AddTMR', {
    extend: 'Ext.window.Window',
    xtype: 'casemanagementAddTMR',
    //itemId : 'compoundgcnwindow',
    title: 'Add TMR Details',
    itemId:'winTMR',
    width: 600,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            itemId: 'frmTMR',
            defaults: {
                labelWidth: 200
            },
            frame: true, items: [
            {
                xtype: 'datefield',
                fieldLabel: 'TMR Date',
                allowBlank: false,
                itemId: 'dtTMRDate',
                format: 'm/d/Y',
                name: 'TMRDate'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'CMR Date',
                itemId: 'dtCMRDate2',
                format: 'm/d/Y',
                name: 'CMRDate'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    labelWidth: 200
                },
                items: [
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'TMR Description',
                        itemId: 'txtTMRDesc',
                        name: 'targetedReviews'
                    }
                ]
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Intervention Date',
                itemId: 'dtInterventionDate2',
                format: 'm/d/Y',
                name: 'interventionDate'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    labelWidth: 200
                },
                items: [
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'Intervention Description',
                        itemId: 'txtInterventionDesc2',
                        name: 'prescInterventions'
                    }
                ]
            },
            {
                xtype: 'combobox',
                itemId: 'cbxTherapyChangeType2',
                fieldLabel: 'Therapy Change Type',
                displayField: 'name',
                valueField: 'value',
                name:'therapyChangeType',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreTherapyChangeType}'
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Therapy Change Date',
                itemId: 'dtTherapyChangeDate2',
                format: 'm/d/Y',
                name: 'therapyChangeDate'
            },
            {
                xtype: 'prescribertypeahead',
                itemId: 'cbxPreTMR',
                fieldLabel: 'NPI',
                emptyText: '[e.g. Dr. Smith]',
                displayField: 'fullname',
                valueField: 'npi'
            },
            {
                xtype: 'hidden', itemId: 'lblPrescriberName2',name:'prescriberName'
            },
            {
                xtype: 'hidden', itemId: 'hdnParentsystemIDTMR',name:'systemID'
            }
        ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'fa fa-save',
                    handler: 'SaveTMRDetails',
                    itemId: 'btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Close',
                    handler: 'btnCloseTMRClick',
                    itemId: 'btnClose'
                }
            ]
        }]
})
