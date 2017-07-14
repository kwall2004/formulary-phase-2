Ext.define('Atlas.benefitplan.view.Configuration.TenantDetails', {
	extend: 'Ext.panel.Panel',
	itemId: 'tenantdetailview',
	title: 'Tenant Configuration',
	titleAlign: 'center',
	alias: 'widget.benefitplan-tenantdetails',
	controller: 'benefitplan-tenantconfigurationcontroller',
	viewModel: {
		data: {
			changed: false,
			validforms: false,
			editinggrid: false
		},
		stores: {
			navigationBreadCrumb: {
				model : 'Atlas.benefitplan.model.BreadCrumb',
				listeners: {
					'load': 'onBreadCrumbLoad'
				}
			},
			basicdetails: {
				model: 'Atlas.benefitplan.model.Tenant'
			}
		}
	},
	layout: 'border',
	items: [
		{
			xtype: 'fieldset',
			reference: 'breadcrumbarea',
			region: 'north',
			items: [
			]
		},
		{
			xtype: 'panel',
			region: 'center',
			layout: 'border',
			itemId: 'centersection',
			items: [
				{
					xtype: 'form',
					trackResetOnLoad: true,
					itemId: 'detailsection',
					region: 'west',
					width: '50%',
					items: [
						{
							xtype: 'fieldset',
							height: '100%',
							title: 'Tenant',
							itemId: 'detailsectionfieldset',
							defaults: {
								labelWidth: 165,
								allowBlank: false,
								listeners: {
									change: 'onItemChanged'
								}
							},
							items: [
								{
									//The system must validate that the Effective End Date is not prior to Effective Start Date.
									xtype: 'textfield',
									maxLength: 80,
									name: 'TenantName',
									fieldLabel: 'Tenant Name',
									plugins: 'responsive',
									responsiveConfig: {
										'width < 1300': {
											labelAlign: 'true'
										},
										'width >= 1300': {
											labelAlign: 'left'
										}
									},
									vtype: 'atlasAlphaNumDash'
								},
								{
									xtype: 'datefield',
									name: 'EfctvStartDt',
									itemId: 'EfctvStartDt',
									format: 'n/j/Y',
									fieldLabel: 'Effective Start Date',
									plugins: 'responsive',
									responsiveConfig: {
										'width < 1300': {
											labelAlign: 'top'
										},
										'width >= 1300': {
											labelAlign: 'left'
										}
									},
									validator: function (val) {
										return (new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) ? true : "Must be less than Effective End Date";
									}
								},
								{
									xtype: 'datefield',
									name: 'EfctvEndDt',
									itemId: 'EfctvEndDt',
									format: 'n/j/Y',
									fieldLabel: 'Effective End Date',
									plugins: 'responsive',
									responsiveConfig: {
										'width < 1300': {
											labelAlign: 'top'
										},
										'width >= 1300': {
											labelAlign: 'left'
										}
									},
									validator: function (val) {
										return (new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) ? true : "Must be greater than Effective Start Date";
									}
								}
							]
						}
					]
				},
				{
					xtype: 'benefitplan-address',
					itemId: 'addresssection',
					region: 'east',
					width: '50%'
				}
			]
		},
		{
			xtype: 'panel',
			reference: 'southsection',
			region: 'south',
			items: [
				{
					xtype: 'tenantIndustryIdentifier-grid',
					itemId: 'tenantIndustryIdentifier-grid',
					reference: 'tenantIndustryIdentifier-grid'
				}
			]
		}
	],
	bbar:[
		{
			itemId: 'CreateNewChildButton',
			text: 'Create New Account',
			handler: 'onCreateNewChildClick',
			bind: {
				disabled: '{changed}'
			}
		},
		{
			itemId: 'ViewContactsButton',
			text: 'View Contacts',
			handler: 'onViewContactsClick',
			bind: {
				disabled:  '{tenantHierarchyEntityId==0}'
			}
		},
		'->',
		{
			itemId: 'CancelButton',
			text: 'Cancel',
			handler: 'onCancelClick'
		},
		{
			itemId: 'SaveButton',
			text: 'Save',
			handler: 'onSaveClick',
			bind: {
				disabled: '{!validforms || editinggrid}'
			}
		}
	]
});
