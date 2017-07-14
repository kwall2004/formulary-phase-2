/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/18/2016
* Origin: MERLIN - Case Management
* Description: Main page for the External Reports page
**/

Ext.define('Atlas.casemanagement.view.ExternalReports', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCaseManagementExternalReports',
    title: 'External Reports',

    items: [{
    	xtype: 'panel',
    	title: 'Search',
    	collapsible: true,

    	items: [{
    		xtype: 'container',
            layout: 'hbox',

    		items: [{
                xtype: 'combo',
    			fieldLabel: 'State'
    		},{
                xtype: 'combo',
    			fieldLabel: 'Reports'
    		}]
    	},{
    		xtype: 'panel',
    		title: 'CoC Productivity Report by User',

    		items: [{
                xtype: 'datefield',
    			fieldLabel: 'Date From'
    		},{
                xtype: 'datefield',
    			fieldLabel: 'Date To'
    		},{
    			xtype: 'combo',
    			fieldLabel: 'User'
    		}]
    	},{
            xtype: 'button',
            text: 'Submit Job',
            iconCls: 'fa fa-print'
        },{
            xtype: 'button',
            text: 'Reset',
            iconCls: 'fa fa-repeat'
        }]
    },{
    	xtype: 'panel',
    	
    	header: {
    		items: [{
    			xtype: 'button',
    			iconCls: 'fa fa-refresh'
    		}]
    	},

    	items: [{
            xtype: 'grid',

            columns: [{
                dataIndex: 'view',
                text: 'View'
            },{
                dataIndex: 'jobNumber',
                text: 'Job Number'
            },{
                dataIndex: 'description',
                text: 'Description'
            },{
                dataIndex: 'status',
                text: 'Status'
            },{
                dataIndex: 'submittedBy',
                text: 'Submitted By'
            },{
                dataIndex: 'submitDateTime',
                text: 'Submit Date/Time'
            },{
                dataIndex: 'startDateTime',
                text: 'Start Date/Time'
            },{
                dateIndex: 'endDateTime',
                text: 'End Date/Time'
            }],

            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom'
            }]
        }]
    }]
});