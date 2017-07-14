Ext.define('Atlas.pharmacy.view.outreach.PharmacyOutreachGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'pharmacyoutreachgrid',
    iconCls: 'fa fa-user-md',

    bind: '{jobqueueattachments}',

    reference: 'PharmacyOutreachGrid',

    // session: true,

    title: 'Job Queue Attachments',

    flex: 1,// 100% height

    selModel: {
        type: 'rowmodel',
        singleSelect: false
    },

    columns: {
        defaults: {
            flex: 1
        },
        items: [{
            xtype: 'actioncolumn',
            hideable : false,
            text: 'View',
            align: 'center',
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-edit',
                tooltip: 'View Attachment',
                isDisabled: function (view, rowIndex, colIndex, item, record)  {

                    if (record.data.DocumentID == 0) {
                        item.tooltip = "Disabled";
                        return true;
                    }
                    else {
                        item.tooltip = "View Attachment";

                    }

                },
                handler: function (grid, rowIndex) {
                    var gridPanel = grid.up('panel');
                    var topPanel = gridPanel.up('panel');
                    var ndtmCtlr = topPanel.controller;
                    ndtmCtlr.onViewClick(grid, rowIndex);
                }
            }]
        },{
            xtype: 'actioncolumn',
            hideable : false,
            text: 'Delete',
            align: 'center',

            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-minus-circle',
                tooltip: 'Delete Attachment',
                handler: function (grid, rowIndex) {
                    var gridPanel = grid.up('panel');
                    var topPanel = gridPanel.up('panel');
                    var ndtmCtlr = topPanel.controller;
                    ndtmCtlr.onConfirmDeleteClick(grid, rowIndex);
                }
              /*  isDisabled: function (view, rowIndex, colIndex, item, record)  {
                    if (record.data.DocumentID == 0) {
                        item.tooltip = "Disabled";
                        return true;
                    }
                    else {
                        item.tooltip = "Delete Attachment";
                    }
                }*/

            }]
        },
            {
                text: 'Doc ID',
                dataIndex: 'DocumentID',
                hidden:true
            },
            {
                text: 'Job Num',
                dataIndex: 'jNum',
                hidden:true
            },
            {
                text: 'Parent Job Num',
                dataIndex: 'parentJobNum',
                hidden:true
            },
            {
                text: 'Child Job Num(s)',
                dataIndex: 'ChildJobNums',
                hidden:true
            },
            {
                text: 'Type',
                dataIndex: 'RecordType'
            },
            {
            text: 'Status',
            dataIndex: 'StatusDescription'
        }, {
            text: 'Job Status',
            dataIndex: 'ChildStatus',
            align: 'center'
        }, {
            text: 'Description',
            dataIndex: 'DESCRIPTION',
            flex: 2
        },
            {
                text: 'File Name',
                dataIndex: 'fileName',
                hidden:true
            },
            {
                text: 'Document Type',
                dataIndex: 'inOut',
                hidden:true
            },{
            text: 'Attachment / Submitted Date',
            dataIndex: 'SubmittedDate',
            xtype: 'datecolumn',
            format: 'm/d/y H:i:s',
            align: 'center'
        }, {
            text: 'Completion Date',
            dataIndex: 'faxDate',
            xtype: 'datecolumn',
            format: 'm/d/y H:i:s',
            align: 'center'
        }, {
            xtype: 'actioncolumn',
            hideable : false,
            text: 'Enrollments',
            align: 'center',

            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-sticky-note',
                tooltip: 'Enroll Candidates',
                handler: function (grid, rowIndex) {
                    //debugger;
                    var gridPanel = grid.up('panel');
                    var topPanel = gridPanel.up('panel');
                    var ndtmCtlr = topPanel.controller;
                    ndtmCtlr.onSubmitContractsAttemptedClick(grid, rowIndex);

                },
                isDisabled: function (view, rowIndex, colIndex, item, record)  {

                    if (record.data.DocumentID == 0) {
                        item.tooltip = "Disabled";
                        return true;
                    }
                    else {
                        if (record.data.parentJobNum != '' && record.data.parentJobNum != '0') {
                            item.tooltip = "Disabled";
                            return true
                        }
                        else {
                            if (record.data.ChildJobNums != '' && record.data.ChildJobNums != '0') {
                                item.tooltip = "Already enrolled";
                                return true
                            }
                            else {
                                item.tooltip = "Enroll Candidates";
                                return false;
                            }
                        }
                    }

                }


            }]
        }, {
            xtype: 'actioncolumn',
            hideable : false,
            text: 'XLS',
            align: 'center',

            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-file-excel-o',
                tooltip: 'Enrollment Results',
                handler: function (grid, rowIndex) {
                    var gridPanel = grid.up('panel');
                    var topPanel = gridPanel.up('panel');
                    var ndtmCtlr = topPanel.controller;
                    ndtmCtlr.onXLSClick(grid, rowIndex);
                },
                isDisabled: function (view, rowIndex, colIndex, item, record)  {

                    if (record.data.ChildJobNums != '' && record.data.ChildJobNums != '0'
                        && record.data.ChildDocIDs != '' && record.data.ChildDocIDs != '0') {
                        item.tooltip = "Enrollment Results";
                        return false;
                    }
                    else {
                        item.tooltip = "Disabled";
                        return true;
                    }
                }

            }]
        }]
    },

    listeners: {
        rowdblclick: 'onGridDblClick',
        'afterrender': function (grid) {
            var view = grid.getView();

/*
            var tip = Ext.create('Ext.tip.ToolTip', {
                // The overall target element.
                target: view.el,
                // Each grid row causes its own separate show and hide.
                delegate: view.itemSelector,
                // Moving within the row should not hide the tip.
                trackMouse: true,
                // Render immediately so that tip.body can be referenced prior to the first show.
                renderTo: Ext.getBody(),
                listeners: {
                    // Change content dynamically depending on which element triggered the show.
                    beforeshow: function updateTipBody(tip) {
                        var date = view.getRecord(tip.triggerElement).get('SubmittedDate');
                        var dateDisplay = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
                        tip.update(dateDisplay + ' - ' + view.getRecord(tip.triggerElement).get('SubmittedBy'));
                    }
                }
            });
*/
        }
    },
    tools: [/*{
        type: 'plus',
        tooltip: 'Add Attachment',
        handler: function (event, toolEl, panel) {
            console.log("-- ADD ATTACHMENT COMRADE! ");;
        }
    },{
        type: 'refresh',
        tooltip: 'Refresh form Data',
        handler: function (event, toolEl, panel) {
            this.up().up().store.load();
        }
    }*/],

    dockedItems: [{
        xtype: 'toolbar',
        itemId: 'gridTbar',
        dock: 'top',
        flex: 1,
        items: ['->',{
            xtype: 'button',
            text: 'Add Attachment',
            //handler: 'showAddAttachmentPopUp'
            handler: function(button, event) {
                //debugger;

                var gridPanel = button.up('panel');
                var topPanel = gridPanel.up('panel');
                var ndtmCtlr = topPanel.controller;
                ndtmCtlr.showAddAttachmentPopUp(button, event, 'myClassNameDriver');
            }
            //handler: 'showAddAttachmentPopUp' // Want to pass an additional
                                     // parameter to this handler.
        }]
    },{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: 'true',
        pageSize: 25,
        bind: {
            store: '{jobqueueattachments}'
        }
    }]
});
