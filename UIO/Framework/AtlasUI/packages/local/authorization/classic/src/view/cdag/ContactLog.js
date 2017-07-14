/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/18/2016
* Origin: MERLIN - Authorization
* Description: Main page for Contact Log
**/

Ext.define('Atlas.authorization.view.cdag.ContactLog', {
	extend: 'Ext.panel.Panel',
	xtype: 'CDAGContactLog',

	items: [{
		xtype: 'toolbar',

		defaults: {
			xtype: 'button'
		},

		items: [{
			iconCls: 'fa fa-plus-circle',
			text: 'Add'
		},{
			iconCls: 'fa fa-pencil',
			text: 'Update'
		},{
			iconCls: 'fa fa-minus-circle',
			text: 'Delete'
		}]
	},{
		xtype: 'grid',

		columns: [{
	        dataIndex: 'caseNumber',
	        text: 'Case Number'
	    },{
	        dataIndex: 'subject',
	        text: 'Subject'
	    },{
	        dataIndex: 'reason',
	        text: 'Reason'
	    },{
	        dataIndex: 'status',
	        text: 'Status'
	    },{
	        dataIndex: 'user',
	        text: 'User'
	    },{
	        dataIndex: 'type',
	        text: 'Type'
	    },{
	        dataIndex: 'callTime',
	        text: 'Call Time'
	    }],

	    dockedItems: [{
	        xtype: 'pagingtoolbar',
	        dock: 'bottom'
	    }]
	}]
});