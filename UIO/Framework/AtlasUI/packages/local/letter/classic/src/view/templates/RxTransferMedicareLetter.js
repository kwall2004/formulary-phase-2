/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.RxTransferMedicareLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'RxTransferMedicareLetter',
    itemId: 'fsTemplate',
    title: 'Rx Transfer Letter Template - Medicare',
    autoScroll: true,
    region: 'center',
    layout: {
        type: 'vbox'
    },
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 150,
        width: '50%'
    },
    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Pharmacy Type',
            itemId: 'Freetext1',
            name: 'Freetext1',
            displayField: 'ListDescription',
            emptyText: '[Pharmacy Type]',
            valueField: 'ListValue',
            dataIndex: 'ListValue',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: false,
            store: {
                fields: ['ListValue', 'ListDescription'],
                data: [
                    {"ListValue": "retail", "ListDescription": "Retail"},
                    {"ListValue": "specialty", "ListDescription": "Specialty"},
                    {"ListValue": "mail-order", "ListDescription": "Mail-Order"}
                ]
            }
        },
        {
            xtype: 'form',
            layout: 'hbox',
            isFormField: false,
            style: 'background: #ffffff',
            items: [
                {
                    xtype: 'drugtypeahead',
                    name: 'cbxNDC',
                    itemId: 'cbxNDC',
                    fieldLabel: 'Medication/Quantity',
                    emptyText: '[e.g. 00247008500 or ACETAMINOPHEN]',
                    reference: 'gcnseq',
                    displayField: 'LN',
                    valueField: 'LN',
                    isFormField: false,
                    forceSelection: true,
                    labelWidth: 150,
                    flex: 6,
                    listConfig: {
                        userCls: 'common-key-value-boundlist',
                        getInnerTpl: function () {
                            return '<h5>NDC:<span>{NDC}</span></h5>' +
                                '<h5>Label:<span>{LN}</span></h5>' +
                                '<h5>Brand:<span>{BN}</span></h5>' +
                                '<h5>GCN:<span>{GCN_SEQNO}</span></h5>'
                        }
                    }
                },
                {xtype: 'textfield', name: 'medicationQty', itemId: 'medicationQty', flex: 1.5},
                {
                    xtype: 'button',
                    name: 'btnAddMedQty',
                    text: 'Add Medication to Freetext',
                    handler: 'addMedQty',
                    isFormField: false,
                    flex: 2.5
                }
            ]
        },
        {
            fieldLabel: ' ',
            labelSeparator: '',
            itemId: 'Freetext6',
            name: 'Freetext6',
            allowBlank: false,
            labelAlign: 'right',
            bind: {
                value: '{vmMedQtyList.vmMedQty1}'
            }
        },
        {
            fieldLabel: ' ', labelSeparator: '', itemId: 'Freetext7', name: 'Freetext7',
            bind: {
                value: '{vmMedQtyList.vmMedQty2}'
            }
        },
        {
            fieldLabel: ' ', labelSeparator: '', itemId: 'Freetext8', name: 'Freetext8',
            bind: {
                value: '{vmMedQtyList.vmMedQty3}'
            }
        },
        {
            fieldLabel: ' ', labelSeparator: '', itemId: 'Freetext9', name: 'Freetext9',
            bind: {
                value: '{vmMedQtyList.vmMedQty4}'
            }
        },
        {
            fieldLabel: ' ', labelSeparator: '', itemId: 'Freetext10', name: 'Freetext10',
            bind: {
                value: '{vmMedQtyList.vmMedQty5}'
            }
        },
        {
            fieldLabel: ' ', labelSeparator: '', itemId: 'Freetext11', name: 'Freetext11',
            bind: {
                value: '{vmMedQtyList.vmMedQty6}'
            }
        },
        {fieldLabel: 'Explanation', itemId: 'Freetext2', name: 'Freetext2', allowBlank: false},
        {
            xtype: 'providertypeahead',
            name: 'cbxPharmacy',
            itemId: 'cbxPharmacy',
            fieldLabel: 'Pharmacy Name(NPI)',
            reference: 'prescId',
            displayField: 'Pharname',
            valueField: 'npi',
            forceSelection: true,
            isFormField: false,
            emptyText: '[e.g. Target Pharmacy MI 48188]',
            listeners: {
                select: 'onPharmacySelect'
            }
        },
        {fieldLabel: 'NCPDP ID', itemId: 'Freetext4', name: 'Freetext4', readOnly: true, allowBlank: false},
        {
            fieldLabel: ' ',
            labelSeparator: '',
            itemId: 'Freetext3',
            name: 'Freetext3',
            readOnly: true,
            allowBlank: false,
            labelAlign: 'right'
        },
        {
            fieldLabel: 'Year',
            itemId: 'Freetext5',
            name: 'Freetext5',
            allowBlank: false,
            maskRe: /[0-9]/,
            minLength: 4,
            maxLength: 4,
            enforceMaxLength: 4
        }
    ]
});