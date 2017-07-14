/**
 * Created by s6627 on 11/9/2016.
 */
Ext.define('Atlas.casemanagement.view.IdentifyCandidates', {
    extend: 'Ext.panel.Panel',
    xtype: 'IdentifyCandidates',
    alias:'IdentifyCandidates',
    title: 'Idenfity Candidates',
    autoScroll: true,
    controller:'identifycandidatecontroller',
    viewModel: 'identifyCandidatesViewModel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [
        {
            xtype: 'fieldset',
            flex: 0.3,
            layout: 'fit',
            name:'searchFormFields',
            title: 'Candidates Identification Search',
            items: [{ xtype: 'casemanagement-identifyCandidatesMTM'} ]
        },
        {
            xtype: 'panel',
            flex: 0.7,
            layout: 'fit',
            title: 'Search Results',
            autoScroll: true,
            items: [{
                xtype:'grid',
                frame: true,
                autoScroll: true,
                scrollable: true,
                itemId:'jobQueueAttachmentsGrid',
                reference:'jobQueueAttachmentsGrid',
                tbar: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'Add Attachment',
                        handler: 'onAddAttachmentClick'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'fa fa-refresh',
                        handler:'refreshGrid'
                    }

                ],
                columns: [
                    {
                        dataIndex: 'DocumentID',
                        flex: 1,
                        text: 'Doc ID',
                        hidden:true
                    },
                    {
                        dataIndex: 'jNum',
                        flex: 1,
                        text: 'Job Num',
                        hidden:true
                    },
                    {
                        dataIndex: 'parentJobNum',
                        flex: 1,
                        text: 'Parent Job Num',
                        hidden:true
                    },
                    {
                        dataIndex: 'ChildJobNums',
                        flex: 1,
                        text: 'Child Job Num(s)',
                        hidden:true
                    },
                    {
                        text: 'View',
                        xtype: 'actioncolumn',
                        hideable : false,
                        flex: 1,
                        dataIndex: 'DocumentID',
                        items: [{
                            iconCls: 'x-fa fa-paperclip',
                            tooltip: 'View Attachment',
                            handler: 'onViewClick',
                            isDisabled : function(view, rowIndex, colIndex, item, record) {
                                if (record.data.DocumentID != '' && record.data.DocumentID != "0") {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                        }]

                    },
                    {
                        text: 'Delete',
                        xtype: 'actioncolumn',
                        hideable : false,
                        flex: 1,
                        dataIndex: 'DocumentID',
                        items: [{
                            iconCls: 'x-fa fa-trash-o',
                            tooltip: 'Delete Job',
                            handler: 'onDeleteClick'
                        }]
                    },
                    {
                        dataIndex: 'RecordType',
                        flex: 1,
                        text: 'Type'
                    }, {
                        dataIndex: 'StatusDescription',
                        flex: 1,
                        text: 'Status'
                    }, {
                        dataIndex: 'ChildStatus',
                        flex: 1,
                        text: 'Enroll Job Status'
                    }, {
                        dataIndex: 'DESCRIPTION',
                        flex: 1,
                        text: 'Description'
                    },
                    {
                        dataIndex: 'fileName',
                        flex: 1,
                        text: 'File Name',
                        hidden:true
                    },
                    {
                        dataIndex: 'inOut',
                        flex: 1,
                        text: 'Document Type',
                        hidden:true
                    }, {
                        dataIndex: 'SubmittedDate',
                        flex: 1,
                        text: 'Attachment / Submit Date',
                        renderer:function(value)
                        {
                            if(value && value!="") {
                                var strDate = '',
                                    arrtime=value.split('T')[1].split('.')[0],
                                    arrDate = value.split('T')[0].split('-');
                                if (arrDate.length == 3) {
                                    strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0] +" "+ arrtime;
                                }
                                return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(new Date(strDate), 'm/d/Y  H:i:s');
                            }
                        }
                    }, {
                        dataIndex: 'faxDate',
                        renderer:function(value)
                        {
                            if(value && value!="") {
                                var strDate = '',
                                    arrtime=value.split('T')[1].split('.')[0],
                                    arrDate = value.split('T')[0].split('-');
                                if (arrDate.length == 3) {
                                    strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0] +" "+ arrtime;
                                }
                                return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(new Date(strDate), 'm/d/Y  H:i:s');
                            }
                        },
                        flex: 1,
                        text: 'Completion Date'
                    },
                    {
                        text: 'Enroll Candidates',
                        xtype: 'actioncolumn',
                        hideable : false,
                        dataIndex: 'DocumentID',
                        flex: 1,
                        items: [{
                            iconCls: 'x-fa fa-pencil-square',
                            tooltip: 'Enroll Candidates',
                            handler: 'onEditEnrollClick',
                            isDisabled : function(view, rowIndex, colIndex, item, record) {
                                if (record.data.DocumentID == '0' || record.data.DocumentID == '') {
                                    return true;
                                    //this.items[0].tooltip="Disabled";
                                }
                                else if (record.data.parentJobNum != '' && record.data.parentJobNum != '0') {
                                    return true;
                                    //this.items[0].tooltip="Disabled";
                                }
                                else if (record.data.ChildJobNums != '' && record.data.ChildJobNums != '0') {
                                    return true;
                                    //this.items[0].tooltip="Already enrolled.";
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        ]

                    },
                    {
                        text: 'Results',
                        xtype: 'actioncolumn',
                        hideable : false,
                        flex: 1,
                        items: [{
                            iconCls: 'x-fa fa-file-excel-o',
                            tooltip: 'Enrollment Results',
                            handler: 'onResultsClick',
                            isDisabled : function(view, rowIndex, colIndex, item, record) {
                                if (record.data.ChildJobNums != '' && record.get('ChildJobNums') != "0" && record.data.ChildDocIDs != '' && record.get('ChildDocIDs') != "0") {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                        }]

                    }
                ],
               bind: '{StoreJobQueueAttachments}',
                dockedItems: [{
                    dock:'bottom',
                    xtype: 'pagingtoolbar',
                    displayInfo: 'true',
                    displayMsg: 'Displaying Rules {0} - {1} of {2}',
                    bind:{
                        store: '{StoreJobQueueAttachments}'
                    },
                    pageSize:25
                }],
                listeners: {
                    afterrender:'onGridAfterRender'
                }
            }]
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        defaults: {
            minWidth: 100
        },
        items: [
            {xtype:'combobox', fieldLabel: 'Case Type', displayField: 'jobGroupCode', valueField: 'systemID', queryMode: 'local',
                bind: { store: '{StoreJobGroup}', value: '{systemID}'}, reference: 'caseTypeCombo',itemId:'caseTypeCombo' , forceSelection:true,
                listeners:{ change: 'onCaseTypeChange' }
            }
        ]
    }]
});