Ext.define('Atlas.benefitplan.view.Configuration.CopyPopulationGroupWin', {
    extend: 'Ext.window.Window',
	height : 400,
	width : 780,
	reference: 'copyPopulationGroupsWindow',
	title: 'Copy Population Groups',
	iconCls: 'x-fa fa-question-circle',
	closable: false,
	draggable: false,
	resizable: false,
	layout: {
		type : 'vbox',
		align : 'stretch'
	},
	items: [
		{
			xtype: 'label',
			flex: 1,
			html: 'Please select the group details you would like to copy: ',
			style: 'font-weight: bold;'
		},
		{
			xtype: 'label',
			flex: 1,
			html: 'Enter a new Plan Program Code for the new Population Group Benefit Package(s) you would like to copy'
		},
		{
			xtype: 'toolbar',
			reference: 'accountselection',
			//height : 50,
			flex: 1,
			layout: 'hbox',
			items: [
				{
					xtype: 'combobox',//accounts
					fieldLabel: 'Select Account',
					labelWidth: 100,
					allowBlank: false,
					displayField: 'AcctName',
					valueField: 'AcctSK',
					bind: {
						store: '{accountdetails}'
					},
					itemId: 'accountselection',
					name: 'accountselection',
					queryMode: 'local',
					emptyText: 'Select Account',
					listeners: {
						select: 'onSelectAccount'
					}
				},
				{
					xtype: 'combo',
					fieldLabel: 'Copy from Group:',
					emptyText: 'Choose a group',
					displayField: 'GrpName',
					reference: 'copyfromgrpcombo',
					valueField: 'GrpSK',
					queryMode: 'local',
					bind: {
						store: '{basicdetails}'
					},
					listeners: {
						select: 'onclickselect'
					}
				}
			]
		},
		{
			xtype: 'panel',
			layout: 'fit',
			flex:8,
			scrollable: true,
			items: [
				{
					xtype: 'grid',
					reference: 'copypopgrid',
					itemId: 'copypopgrid',
					bind: {
						store: '{copypopulationgroups}'
					},
					viewConfig: {
						loadMask: false
					},
					plugins: [
						{
							ptype: 'rowediting',
							clicksToEdit: 2,
							clicksToMoveEditor: 1,
							autoScroll: true,
							listeners: {
								edit: function (editor, context, eOpts) {
									var win = context.grid.up('window');
									var parenCtlr = win.parentController;
									parenCtlr.getViewModel().set('planPgmChange',context.record.get('NewPlanPgmCode'));
								}
							}
						}
					],
					columns: [
						{
							header: 'Population Group',
							flex: 1,
							dataIndex: 'PopGrpName'
						},
						{
							header: 'PBP',
							flex: 1,
							dataIndex: 'PBPName'
						},
						{
							header: 'Effective Start Date',
							dataIndex: 'EfctvStartDt',
							formatter: 'date("n/j/Y")',
							flex: 1
						},
						{
							header: 'Effective End Date',
							dataIndex: 'EfctvEndDt',
							formatter: 'date("n/j/Y")',
							flex: 1
						},
						{
							header: 'Existing Plan Program Code',
							flex: 1,
							dataIndex: 'PlanPgmCode'
						},
						{
							header: 'New Plan Program Code',
							dataIndex: 'NewPlanPgmCode',
							flex: 1,
							editor: {
								vtype: 'atlasAlphaNumDash',
								allowBlank: false,
								xtype: 'textfield',
								maxLength: 25,
								enforceMaxLength: true
							}
						},
						
						{
							dataIndex: 'CurrentUser',
							hidden: true
						}
					]
				}
			]
		}
    ],
	bbar: [
	'->',
	{
		xtype: 'button',
		reference:'saveButton',
		itemId: 'saveButton',
		text: 'Save',
		bind:{
		disabled: '{!planPgmChange}'
		},
		handler: 'onSave'
	},
	{
		xtype: 'button',
		itemId: 'closit',
		text: 'Cancel',
		handler: 'onClositClick'
	}
]
});
