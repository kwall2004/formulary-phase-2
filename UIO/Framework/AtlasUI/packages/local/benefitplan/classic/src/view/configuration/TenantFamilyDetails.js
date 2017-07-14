Ext.define('Atlas.benefitplan.view.Configuration.TenantFamilyDetails', {
	extend: 'Ext.panel.Panel',
	itemId: 'tenantfamilydetailview',
	title: 'Tenant Family Configuration',
	titleAlign: 'center',
	alias: 'widget.benefitplan-tenantfamilydetails',
	controller: 'benefitplan-tenantfamilyconfigurationcontroller',
	viewModel: {
		data: {
			changed: false,
			validforms: false
		},
		stores: {
			navigationBreadCrumb: {
				model : 'Atlas.benefitplan.model.BreadCrumb',
				listeners: {
					'load': 'onBreadCrumbLoad'
				}
			},
			basicdetails: {
				model: 'Atlas.benefitplan.model.TenantFamily'
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
							title: 'Tenant Family',
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
									xtype: 'textfield',
									maxLength: 80,
									name: 'TenantFamName',
									fieldLabel: 'Tenant Family Name',
									plugins: 'responsive',
									responsiveConfig: {
										'width < 1300': {
											labelAlign: 'top'
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
		}
	],
	bbar:[
		{
			itemId: 'CreateNewChildButton',
			text: 'Create New Tenant',
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
				disabled: '{!validforms}'
			}
		}
	]
});
