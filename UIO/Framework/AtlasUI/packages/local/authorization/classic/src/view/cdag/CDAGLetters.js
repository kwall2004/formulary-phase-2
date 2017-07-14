/**
 * Created by agupta on 9/7/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGLetters', {
    extend: 'Ext.panel.Panel',
    xtype: 'cdagletters',
    controller: 'cdagletterscontroller',
    viewModel: 'cdaglettersviewmodel',
    flex: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height: '100%',
    width: '100%',
    items: [
        {
            xtype: 'grid',
            itemId : 'GridPanel1',
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Create Letter',
                    iconCls: 'fa fa-file-o',
                    itemId : 'LetterMenuButton',
                    menu: [
                        /*{
                            text: 'Medicaid PA Denial',
                            value: 'formularygeneralinfo'
                        }
                        , {
                            text: 'Intervention',
                            value: 'formularygeneralinfo'
                        }*/

                    ]
                }
            ],
            flex: 10,
            columns: {
                items: [
                    {text: 'Letter Type', dataIndex: 'LetterTypeDesc', width: 150},
                    {text: 'Letter Name', dataIndex: 'letterName', width: 200},
                    {
                        text: 'Create Date',
                        dataIndex: 'createDate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y',
                        width: 220
                    },
                    {text: 'Create By', dataIndex: 'createUser', width: 150},
                    {
                        text: 'Approve Date',
                        dataIndex: 'approvedDate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y',
                        width: 220
                    },
                    {text: 'Approve By', dataIndex: 'approvedUser', width: 350},
                    {
                        text: 'Sent Date',
                        dataIndex: 'sentDate',
                        xtype: 'datecolumn',
                        renderer:function(value)
                        {
                            if(value)
                                return Ext.util.Format.date(value, 'm/d/Y H:i:s');
                            // return Atlas.common.Util.setdateformat(value);
                        },
                        width: 220
                    },
                    {
                        text: 'AIMS Date',
                        dataIndex: 'POBoxDropDate',
                        xtype: 'datecolumn',
                        renderer:function(value)
                        {
                            if(value)
                                return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s');
                                // return Atlas.common.Util.setdateformat(value);
                        },
                        width: 220
                    },
                    {
                        text: 'PO Box Drop Date',
                        dataIndex: 'POBoxDropDate02',
                        xtype: 'datecolumn',
                        renderer:function(value)
                        {
                            if(value)
                                return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s');
                                // return Atlas.common.Util.setdateformat(value);
                        },
                        width: 220
                    },
                    {text: 'Sent User', dataIndex: 'sentUser', width: 150 , hidden: true},
                    {text: 'System ID', dataIndex: 'systemID', width: 150 , hidden: true},
                    {text: 'Assign To', dataIndex: 'assignTo', width: 150 , hidden: true},
                    {text: 'Document ID', dataIndex: 'documentID', width: 150 , hidden: true},
                    {text: 'Letter ID', dataIndex: 'letterID', width: 150 , hidden: true},
                    {text: 'Letter Type', dataIndex: 'letterType', width: 150 , hidden: true},
                    {text: 'Carrier', dataIndex: 'CarrierName', width: 150 , hidden: true},
                    {text: 'Account', dataIndex: 'AccountName', width: 150 , hidden: true},
                    {text: 'LOB', dataIndex: 'LOBName', width: 150 , hidden: true}

                ]
            },
            selectionModel : {
                singleSelect : true
            },
            listeners : {
                itemclick: 'onLetterRowSelect'
            },
            bind: '{storeLetters}'
        },
        {
            xtype: 'panel',
            itemId: 'hdnContainer',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hidAuthID'},
                {xtype: 'hidden', itemId: 'hiddenKey'},
                {xtype: 'hidden', itemId: 'hidLOB'}
            ]
        }
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        bind: '{storeLetters}',
        pageSize: 15,
        dock: 'bottom',
        displayInfo: true
    }]
});
