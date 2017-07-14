Ext.define('Atlas.benefitplan.view.Configuration.PopulationGroupDetails', {
	extend: 'Ext.panel.Panel',
	itemId: 'populationgroupdetailview',
	title: 'Population Group Configuration',
	titleAlign: 'center',
	alias: 'widget.benefitplan-populationgroupdetails',
	controller: 'benefitplan-populationgroupconfigurationcontroller',
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
				model: 'Atlas.benefitplan.model.PopulationGroup'
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
							title: 'Population Group',
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
                                    name: 'PopGrpName',
                                    fieldLabel: 'Population Group Name',
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
									validator: function (val) {
										return (new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) ? true : "Must be less than Effective End Date";
									},
                                    plugins: 'responsive',
                                    responsiveConfig: {
                                        'width < 1300': {
											labelAlign: 'top'
                                        },
                                        'width >= 1300': {
											labelAlign: 'left'
                                        }
                                    },
									fieldLabel: 'Effective Start Date'
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
								},
								{
									xtype: 'textfield',
									maxLength: 80,
									name: 'CntrctID',
									fieldLabel: 'Contract ID',
                                    plugins: 'responsive',
                                    responsiveConfig: {
                                        'width < 1300': {
											labelAlign: 'top'
                                        },
                                        'width >= 1300': {
											labelAlign: 'left'
                                        }
                                    },
									allowBlank: true
								},
								{
									xtype: 'textfield',
									maxLength: 50,
									name: 'HIOSPlanID',
									vtype: 'alphanum',
									fieldLabel: 'HIOS Plan ID',
                                    plugins: 'responsive',
                                    responsiveConfig: {
                                        'width < 1300': {
											labelAlign: 'top'
                                        },
                                        'width >= 1300': {
											labelAlign: 'left'
                                        }
                                    },
									allowBlank: true
								},
								{
									xtype: 'checkbox',
									name: 'UseAddrasDefaultforEnrlmtInd',
									fieldLabel: 'Default enrollment address',
									boxLabel: 'Default enrollment address',
									hideLabel: true,
									uncheckedValue: false
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
					xtype: 'populationGroupPlanBenefitPackageSummary-grid',
					itemId: 'populationGroupPlanBenefitPackageSummary-grid',
					reference: 'populationGroupPlanBenefitPackageSummary-grid'
				}
			]
		}
	],
	bbar: [
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
