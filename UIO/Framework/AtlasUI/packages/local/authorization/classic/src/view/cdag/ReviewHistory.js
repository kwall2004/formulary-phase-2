/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/18/2016
* Origin: MERLIN - Authorization
* Description: Main page for the Review History
**/

Ext.define('Atlas.authorization.view.cdag.ReviewHistory', {
	extend: 'Ext.panel.Panel',
	xtype: 'CDAGReviewHistory',
	
	items: [{
		xtype: 'hboxform',

		items: [{
			xtype: 'grid',
			title: 'Status History',
			frame: true,

		    columns: [{
		        dataIndex: 'authStatus',
		        text: 'Auth Status'
		    },{
		        dataIndex: 'dateTime',
		        text: 'Update Date/Time'
		    },{
		        dataIndex: 'userName',
		        text: 'User Name'
		    }]
		},{
			xtype: 'grid',
			title: 'Case History',
			frame: true,

		    columns: [{
		        dataIndex: 'fieldDescription',
		        text: 'Field Description'
		    },{
		        dataIndex: 'fieldValue',
		        text: 'Field Value'
		    }]
		}]
	}]
});