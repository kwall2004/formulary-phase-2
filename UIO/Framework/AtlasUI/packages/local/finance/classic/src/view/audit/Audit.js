Ext.define('Atlas.finance.view.audit.Audit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-audit',

    controller: 'finance-audit',
    viewModel: 'finance-audit',

    title: 'Audit Takebacks',

    layout: 'border',
    bodyBorder: false,

    updateRec: null,

    defaults: {
        anchor: '100%'
    },

    tbar: [{
        xtype: 'box',
        html: '<i class="x-fa fa-folder" aria-hidden="true"></i> <b> Audit ID </b>'
    },{
        xtype: 'uxsearchfield',
        reference: 'searchfield',
        text: 'Audit ID',
        width: 150,
        bind: {
            emptyText: '{searchEmptyText}',
            value: '{auditId}'
        },
        listeners: {
            search: 'onSearch'
        }
    },{
        text: 'Advanced Search',
        iconCls: 'x-fa fa-search',
        handler: 'onAdvancedSearch'
    }],

    items: [{
        xtype: 'grid',
        region: 'center',
        width: '70%',
        reference:'auditTakebackGrid',
        bind:{
            store:'{cloneaudittakebacks}'
        },
        tbar: [
            {xtype: 'button', text: 'Process', iconCls: 'x-fa fa-dot-circle-o', handler: 'onProcessClick'}
        ],
        columns: {
            items: [{
                xtype: 'widgetcolumn',
                text: 'Process',
                sortable: false,
                hideable: false,
                resizable: false,
                menuDisabled: true,
                dataIndex: 'selectedItems',
                widget: {
                    xtype: 'checkbox',
                    labelSeparator: '',
                    listeners: {
                        change: 'onCheckChange'
                    }
                },
                onWidgetAttach: function(col, widget, rec) {
                    var adjTranId = rec.get('adjustTransId'),
                        takebackType = rec.get('takebackType');
                    widget.setVisible(false);
                    if (((adjTranId === '') || (adjTranId === '0')) && (takebackType !== '')){
                        widget.setVisible(true);
                        widget.setFieldLabel('');
                        widget.setDisabled(false);
                    }
                    else if ((adjTranId !== '' ) && (adjTranId !== '0') && (takebackType !== '')){
                        widget.setVisible(true);
                        widget.setFieldLabel('<span class="m-red-color"><b>P</b></span>');
                        widget.setDisabled(true);
                    }
                    else {
                        widget.setVisible(false);
                        widget.setFieldLabel('');
                        widget.setDisabled(false);
                    }
                }
            },{
                text:'Audit Id',
                dataIndex:'auditId',
                hidden:true
            },{
                text:'Audit Type',
                dataIndex:'auditType',
                hidden:true
            },{
                text:'Audit Complete Dt.',
                dataIndex:'auditCompleteDate',
                hidden:true
            },{
                text:'Script Id',
                dataIndex:'scriptId',
                hidden:true
            },{
                xtype: 'widgetcolumn',
                text: 'Claim ID',
                dataIndex: 'transactionId',
                widget: {
                    xtype: 'button',
                    handler: 'onColumnBtn'
                },
                onWidgetAttach: function(col, widget, rec) {
                    widget.setVisible(false);
                    if ((rec.get('transactionId') !== '0') && (rec.get('transactionId') !== '$0.00')){
                        widget.setVisible(true);
                    }
                    else{
                        widget.setVisible(false);
                    }
                }
            },{
                text: 'Rx #',
                dataIndex: 'rxNum'
            },{
                text:'NCPDP ID',
                dataIndex:'ncpdpid',
                hidden:true
            },{
                text: 'Pharmacy Name',
                dataIndex: 'pharmacyName',
                flex: 1
            },{
                text:'Service Date',
                dataIndex:'serviceDate',
                hidden:true,
                renderer: 'renderSvcDate'
            },{
                text:'Qty',
                dataIndex:'qty',
                hidden:true
            },{
                xtype: 'widgetcolumn',
                text: 'Total Amt',
                dataIndex: 'totalAmt',
                widget: {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    handler: 'onOpenPayment'
                },
                onWidgetAttach: function(col, widget, rec) {
                    widget.setVisible(false);
                    if ((rec.get('totalAmt') !== '0') && (rec.get('totalAmt') !== '$0.00')){
                        widget.setVisible(true);
                    }
                    else{
                        widget.setVisible(false);
                    }
                }
            }, {
                text: 'TB Type',
                dataIndex: 'takebackTypeDescr'
            },{
                text:'Reason',
                dataIndex:'reason',
                hidden:true
            },{
                text: 'TB Qty.',
                dataIndex: 'takebackQty',
                renderer: function (v) {
                    return '<span class="m-red-color">' +Ext.util.Format.number(v,  "0,000.00"); + '</span>';
                }
            },{
                xtype: 'widgetcolumn',
                text: 'New Claim ID',
                dataIndex: 'adjustTransId',
                widget: {
                    xtype: 'button',
                    cls: 'auditBtn',
                    handler: 'onColumnBtn'
                },
                onWidgetAttach: function(col, widget, rec) {
                    widget.setVisible(false);
                    if ((rec.get('adjustTransId') !== '0') && (rec.get('adjustTransId') !== '$0.00')){
                        widget.setVisible(true);
                    }
                    else{
                        widget.setVisible(false);
                    }
                }
            }, {
                text: 'Process Date',
                xtype: 'datecolumn',
                dataIndex: 'processDate',
                hidden: true,
                format: 'm/d/Y'
            },{
                xtype: 'widgetcolumn',
                text: 'New Total Amt.',
                dataIndex: 'newTotalAmt',
                format: '$#,###,##0.00',
                widget: {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    cls: 'auditBtn',
                    handler: 'onOpenPayment'
                },
                renderer: function (v) {
                    return '<span class="m-red-color">' + Ext.util.Format.currency(v, '$', 2) + '</span>';
                }
            },{
                text:'Days Supply',
                dataIndex:'daysSupply',
                hidden:true
            },{
                text:'Medication',
                dataIndex:'medication',
                hidden:true
            },{
                text:'GCN',
                dataIndex:'gcnseqno',
                hidden:true
            },{
                text:'GPI',
                dataIndex:'GPICode',
                hidden:true
            },{
                dataIndex:'systemID',
                text:'System ID',
                hidden:true
            },{
                text:'Last Modified Date',
                xtype: 'datecolumn',
                dataIndex:'lastModified',
                hidden:true,
                format: 'm/d/Y'
            },{
                xtype: 'widgetcolumn',
                sortable: false,
                hideable: false,
                resizable: false,
                menuDisabled: true,
                widget: {
                    xtype: 'button',
                    text: 'Update',
                    iconCls: 'x-fa fa-edit',
                    handler: 'onUpdateClick'
                },
                onWidgetAttach: function(col, widget, rec) {
                    var adjTranId = rec.get('adjustTransId');

                    if((!adjTranId || adjTranId === '0') && (rec.get('takebackTypeDescr')) && (rec.get('auditCompleteDate'))){
                        widget.setDisabled(false);
                    }
                    else{
                        widget.setDisabled(true);
                    }
                }
            }]
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true'
        }]
    },{
        xtype: 'form',
        region: 'east',
        collapsible: true,
        floatable: false,
        width: '30%',
        scrollable: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'fieldset',
            title: 'Pharmacy',
            collapsible: true,
            defaults: {
                xtype: 'displayfield',
                labelWidth: 110
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    xtype: 'displayfield'
                },
                items: [{
                    fieldLabel: 'Contract Status:',
                    labelWidth: 107
                }, {
                    bind: {
                        hidden: '{!activeContract}'
                    },
                    userCls: 'fa fa-flag m-green-color',
                    padding: '7 0 0 0'
                }, {
                    bind: {
                        hidden: '{activeContract}'
                    },
                    userCls: 'fa fa-flag m-red-color',
                    padding: '7 0 0 0'
                }, {
                    bind: '{pharmacyContractStatus}'
                }]
            },{
                fieldLabel: 'NCPDP ID:',
                bind: '{pharmacymasterrec.ncpdpid}'
            },{
                fieldLabel: 'Pharmacy Name:',
                bind: '{pharmacymasterrec.legalBusinessName}'
            },{
                fieldLabel: 'Address:',
                bind: '{pharmacymasterrec.mailAddress1}'
            },{
                fieldLabel: 'City, State Zip:',
                renderer: function(val, dispField){
                    if (val){
                        var valArray =val.split('|'),
                            zipcode = valArray[2];

                        return valArray[0] + ', ' + valArray[1] + ' ' + zipcode.substr(0, 5) + '-' + zipcode.substr(5);
                    }
                },
                bind: '{pharmacymasterrec.mailCity}|{pharmacymasterrec.mailState}|{pharmacymasterrec.mailZip}'
            },{
                fieldLabel: 'Phone:',
                bind: '{pharmacymasterrec.locPhoneFormatted}'
            }]
        },{
            xtype: 'fieldset',
            title: 'Audit Detail',
            collapsible: true,layout:'form',
            defaults: {
                xtype: 'displayfield',
                labelWidth: 110
            },
            items: [{
                fieldLabel: 'Pass/Fail',
                itemId:'passed'
            },{
                fieldLabel: 'Complete Date:',
                itemId:'completeDate'
            },{
                fieldLabel: 'Auditor:',
                itemId:'assignTo'

            },{
                fieldLabel: 'Letter Date:',
                itemId:'ltrDate'
            },{
                fieldLabel: 'Days Remaining:',
                itemId:'daysRem'
            }]
        },{
            xtype: 'fieldset',
            title: 'Notes',
            itemId: 'fsNotes',
            width: '100%',
            height: '100%',
            layout: 'vbox',
            flex: 1,
            items: [
                {
                    xtype: 'finance-audit-notes',
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    parentSystemId: ''
                }
            ]
        }]
    }]
});