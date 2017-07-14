/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/18/2016
* Origin: MERLIN - Authorization
* Description: Main page for the Member Claim History
**/

Ext.define('Atlas.authorization.view.cdag.MemberClaimHistory', {
	extend: 'Ext.panel.Panel',
	xtype: 'CDAGMemberClaimHistory',

	items: [{
		xtype: 'panel',
		title: 'Search',
		collapsible: true,

		items: [{
			xtype: 'fieldset',
			title: 'Selection',
			
			items: [{
				xtype: 'hboxform',

				items: [{
					xtype: 'datefield',
					fieldLabel: 'Service Date From'
				},{
					fieldLabel: 'Member'
				},{
					fieldLabel: 'Pharmacy'
				}]
			},{
				xtype: 'hboxform',

				items: [{
					xtype: 'datefield',
					fieldLabel: 'Service Date To'
				},{
					fieldLabel: 'Drug'
				},{
					fieldLabel: 'Prescriber'
				}]
			},{
				xtype: 'hboxform',

				items: [{
					xtype: 'combo',
					fieldLabel: 'Claim Status'
				},{
					fieldLabel: 'GCN'
				},{
					fieldLabel: 'Rx Number'
				}]
			},{
				xtype: 'hboxform',

				items: [{
					fieldLabel: 'Auth ID'
				},{
					xtype: 'button',
					iconCls: 'fa fa-search',
					text: 'Search'
				},{
					xtype: 'label'
				}]
			}]
		}]
	},{
		xtype: 'CDAGMemberClaimHistoryGrid',

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',

            items: [{
				xtype: 'button',
				iconCls: 'fa fa-file-excel-o',
				text: 'Export to Excel'
			},{
				xtype: 'button',
				iconCls: 'fa fa-file-pdf-o',
				text: 'Export to PDF'
			}]
        }]
	}]
});