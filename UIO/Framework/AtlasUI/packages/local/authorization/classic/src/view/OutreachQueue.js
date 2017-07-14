/*
* Last Developer: Sheeloo Sachan
* Date: 11-20-2016
* Previous Developers: [Todd Urbanowicz],Srujith Cheruku
* Origin: Merlin - Authorization
* Description: Gives users a place to view their outreach queue
*/

Ext.define('Atlas.authorization.view.OutreachQueue', {
	extend: 'Ext.panel.Panel',
	xtype: 'OutreachQueue',
	title: 'OutreachQueue',
	controller : 'outreachQueueController',
	viewModel: 'OutreachQueueViewModel',
	layout: 'accordion',
	loadMask: true,
	items: [
		{
					xtype: 'grid',
					title: 'Decision - Outreach Pending',
					extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
					itemId: 'grdDecisionOutReachPending',
					viewModel: {
						type: 'common-shared-editgridmodel'
					},
					bind: {
						store: '{outreachPendingDecisionStore}'
					},
					listeners:{
						itemmouseenter: function(view, record, item, index, e, options)
						{
							if (record.getData().Notes != '') {
								Ext.fly(item).set({'data-qtip': Ext.Date.format(record.getData().NoteDate, 'm/d/Y') + ' - ' + record.getData().Notes});
							}
						}
					},
					columns: [
						{
							xtype: 'widgetcolumn',
							width: 40,
							hideable: false,
							widget: {
								xtype: 'button',
								text: '',
								iconCls: 'fa fa-long-arrow-right',
								handler: 'onRowClick',
								hideable: false
							}
						}, {
							text: 'Attempts Made',
							width: 120,
							dataIndex: 'AttemptsMade'
						}, {
							text: 'Auth ID',
							dataIndex: 'AuthID'
						}, {
							text: 'Contact Name',
							width: 120,
							dataIndex: 'ContactName'
						}, {
							text: 'Member Name',
							width: 120,
							dataIndex: 'MemberName'
						}, {
							text: 'Member ID',
							dataIndex: 'MemberID'
						}, {
							text: 'Drug',
							dataIndex: 'LN',
							width: 150
						}
						, {
							text: 'Hours Remaining',
							dataIndex: 'HrsToProcess',
							width: 120,
							renderer: function (value, metaData, record, row, col, store, gridView) {

								var item = record.data.HrsRem.toString();
								item = (item == '') ? '' : item;
								if (item.indexOf('-') > -1) {
									var cDisplay = item.indexOf('.') > -1 ? item.replace(".", ":") : item;
									return '<SPAN style="COLOR: red">' + cDisplay + '</SPAN>'
								}
								else {
									return '<SPAN style="COLOR: green">' + item + '</SPAN>';
								}
							}
						}
						, {
							text: 'Decision Status',
							width: 150,
							dataIndex: 'AuthStatusDesc'
						}, {
							text: 'Decision Date/Time',
							width: 150,
							dataIndex: 'DecisionDateTime'
						}
						, {
							text: 'Determination',
							width: 150,
							dataIndex: 'OutreachDetermination'
						}, {
							text: 'Urgency',
							dataIndex: 'UrgencyTypeDesc'
						}, {
							text: 'Last Contact Date/Time',
							width: 200,
							dataIndex: 'LastContactDateTime'
						}],
					dockedItems: [
						{
							dock: 'bottom',
							xtype: 'pagingtoolbar',
							displayInfo: true,
							pageSize: 25
						}]

		},

		{
			xtype: 'grid',
			title: 'AOR - Outreach Pending',
			extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
			itemId: 'grdAOROutReachPending',
			viewModel: {
				type: 'common-shared-editgridmodel'
			},
			bind: {
				store: '{outreachAORStore}'
			},
			listeners:{
				itemmouseenter: function(view, record, item, index, e, options)
				{
					if (record.getData().Notes != '') {
						Ext.fly(item).set({'data-qtip': Ext.Date.format(record.getData().NoteDate, 'm/d/Y') + ' - ' + record.getData().Notes});
					}
				}
			},
			dockedItems: [
				{
					dock: 'bottom',
					xtype: 'pagingtoolbar',
					displayInfo: true,
					pageSize: 24
				}],
			plugins: [
				{
					ptype: 'cellediting',
					clicksToEdit: 2,
					autoCancel: false
				}
			],
			columns: [
				{
					xtype: 'widgetcolumn',
					width:40,
					widget: {
						xtype: 'button',
						text: '',
						iconCls: 'fa fa-long-arrow-right',
						handler: 'onRowClick'
					}
				},{
					text: 'Attempts Made',
					dataIndex: 'AttemptsMade',
					width:120
				},{
					text: 'Auth ID',
					dataIndex: 'AuthID'
				},{
					text: 'Contact Name',
					width:150,
					dataIndex: 'ContactName'
				},{
					text: 'Member Name',
					width:150,
					dataIndex: 'MemberName'
				},{
					text: 'Member ID',
					dataIndex: 'MemberID'
				},{
					text: 'Drug',
					dataIndex: 'LN',
					width:150
				},{
					text: 'Auth Status',
					dataIndex: 'AuthStatusDesc'
				},{
					text: 'Determination',
					width:150,
					dataIndex: 'OutreachDetermination'
				},{
					text: 'Urgency',
					dataIndex: 'UrgencyTypeDesc'
				},
				{text: 'Last Contact Date/Time',
					width:180,
					dataIndex: 'LastContactDateTime'}
				]
		}

	]
});
