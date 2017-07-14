/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.casedetails.ContactLog', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCasedetailsContactLog',
    title: 'Contact Log',
    tbar: {
        // xtype: 'casedetailshome'
    },
    items: [{
        xtype: 'hboxform',
        defaults: {
            xtype: 'button'
        },
        items: [{
            iconCls: 'fa fa-plus',
            text: 'Add'
        }, {
            iconCls: 'fa fa-folder',
            text: 'Update'
        }, {
            iconCls: 'fa fa-minus',
            text: 'Delete'
        }]
    }, {
        xtype: 'grid',
        height: 400,
        columns: [{
            text: 'Case #',
            dataIndex: 'caseNumber'
        }, {
            text: 'Subject',
            dataIndex: 'subject'
        }, {
            text: 'Reason',
            dataIndex: 'reason'
        }, {
            text: 'Status',
            dataIndex: 'status'
        }, {
            text: 'User',
            dataIndex: 'user'
        }, {
            text: 'Type',
            dataIndex: 'type'
        }, {
            text: 'CallTime',
            dataIndex: 'callTime'
        }],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Displaying: ',
            emptyMsg: "No data to display"
        }
    }]
});