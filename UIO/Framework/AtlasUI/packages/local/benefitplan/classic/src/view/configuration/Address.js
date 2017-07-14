Ext.define('Atlas.benefitplan.view.Configuration.Address', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.benefitplan-address',
	controller: 'benefitplan-configurationaddresscontroller',
	viewModel: {
		data: {
			changedAddress: false,
			countrySelected: false,
			validaddressform: false,
			emptyAddressList: false
		},
		stores: {
			address: {
				model: 'Atlas.benefitplan.model.Address'
			},
			addresslist: {
				model: 'Atlas.benefitplan.model.AddressList'
			},
			countries: {
				model: 'Atlas.benefitplan.model.Countries',
				autoLoad: true
			},
			provinces: {
				model: 'Atlas.benefitplan.model.Provinces'
			},
			demographiclist: {
				model: 'Atlas.benefitplan.model.EntityAddress'
			}
		}
	},
	items: [
		{
			xtype: 'fieldset',
			height: '100%',
			itemId: 'addresssection',
			title: 'Address Information',
			items: [
				{
					xtype: 'container',
					itemId: 'addressselectionsection',
					layout: 'vbox',
					items: [
						{
							xtype: 'combobox',
							fieldLabel: 'Address Selection',
							bind: {
								store: '{addresslist}',
								disabled: '{emptyAddressList}'
							},
							itemId: 'addressselection',
							name: 'addressselection',
							publishes: 'Value',
							minChars: 0,
							displayField: 'Text',
							valueField: 'Value',
							queryMode: 'local',
							typeAhead: false,
							listeners:{
								'select': 'onAddressListSelect'
							}
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'addressselectionsection',
					layout: 'vbox',
					items: [
						{
							xtype: 'container',
							itemId: 'copyDemographicsSection',
							hidden: true,
							plugins: 'responsive',
							responsiveConfig: {
								'width < 1340': {
								    layout: {
                                        type: 'box',
                                        vertical: true,
                                        pack:'start'
                                    }
								},
								'width >= 1340': {
									layout:{
										type: 'box',
                                        vertical: false,
                                        pack: 'center'
									}
								}
							},
							items: [
								{
									xtype: 'button',
									itemId: 'CopyDemographicInformationButton',
									text: 'Copy Demographic Information',
									handler: 'onCopyDemographicInformationClick'
								},
								{
									xtype: 'combobox',
									bind: {
										store: '{demographiclist}'
									},
									itemId: 'demographicselection',
									name: 'demographicselection',
									publishes: 'Value',
									minChars: 0,
									displayField: 'Text',
									valueField: 'Value',
									queryMode: 'local',
									typeAhead: false
								}
							]
						},
						{
							xtype: 'combobox',
							fieldLabel: 'Address Selection',
							bind: {
								store: '{addresslist}',
								disabled: '{emptyAddressList}'
							},
							itemId: 'addressselection',
							name: 'addressselection',
							publishes: 'Value',
							minChars: 0,
							displayField: 'Text',
							valueField: 'Value',
							queryMode: 'local',
							typeAhead: false,
							listeners:{
								'select': 'onAddressListSelect'
							}
						}
					]
				},
				{
					xtype: 'form',
					trackResetOnLoad: true,
					itemId: 'addresssection',
					items: [
						{
							xtype: 'textfield',
							name: 'AddrLine1',
							itemId: 'AddrLine1',
							fieldLabel: 'Address 1',
							labelWidth: 100,
							maxLength: 55,
							allowBlank: false,
							listeners: {
								change: 'onAddressItemChanged'
							}
						},
						{
							xtype: 'textfield',
							name: 'AddrLine2',
							itemId: 'AddrLine2',
							fieldLabel: 'Address 2',
							labelWidth: 100,
							maxLength: 55,
							listeners: {
								change: 'onAddressItemChanged'
							}
						},
						{
							xtype: 'textfield',
							name: 'City',
							itemId: 'City',
							fieldLabel: 'City',
							labelWidth: 100,
							maxLength: 30,
							allowBlank: false,
							listeners: {
								change: 'onAddressItemChanged'
							}
						},
						{
							xtype: 'combobox',
							forceSelection: true,
							fieldLabel: 'State/Province',
							name: 'StPrvncCodeSK',
							itemId: "stateprovince",
							labelWidth: 100,
							allowBlank: false,
							minChars: 0,
							displayField: 'StPrvncDesc',
							valueField: 'StPrvncCodeSK',
							queryMode: 'local',
							typeAhead: true,
							listeners: {
								change: 'onAddressItemChanged'
							},
							bind: {
								disabled: '{!countrySelected}',
								store: '{provinces}'
							}
						},
						{
							xtype: 'textfield',
							name: 'PostalCode',
							itemId: 'PostalCode',
							labelWidth: 100,
							fieldLabel: 'Postal Code',
							allowBlank: false,
							validator: function (val) {
								var result = true;
								if(this.up().getComponent('country').getValue() == "1") {
									result = /^\d{5}(-\d{4})?$/.test(val);
								} else if (this.up().getComponent('country').getValue() == "2") {
									result = /^([ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]\d[ABCEGHJKLMNPRSTVW‌​XYZabceghjklmnprstvx‌​y])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvxy]\d)$/.test(val);
								}
								return (result) ? true : "Invalid postal code.";
							},
							listeners: {
								change: 'onAddressItemChanged'
							}
						},
						{
							xtype: 'combobox',
							forceSelection: true,
							fieldLabel: 'Country',
							name: 'ISOCntryCodeSK',
							itemId: 'country',
							labelWidth: 100,
							allowBlank: false,
							minChars: 0,
							displayField: 'ISOCntryCode1',
							valueField: 'ISOCntryCodeSK',
							queryMode: 'local',
							typeAhead: true,
							listeners: {
								change: 'onAddressItemChanged',
								select: 'onCountrySelected'
							},
							bind: {
								store: '{countries}'
							}
						},
						{
							xtype: 'datefield',
							name: 'EfctvStartDt',
							itemId: 'EfctvStartDt',
							labelWidth: 130,
							format: 'n/j/Y',
							fieldLabel: 'Effective Start Date',
							validator: function (val) {
								return ((new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) && (new Date(val) <= new Date(this.up().up().up().up().getComponent('detailsection').getComponent('detailsectionfieldset').getComponent('EfctvEndDt').getValue())) && (new Date(val) >= new Date(this.up().up().up().up().getComponent('detailsection').getComponent('detailsectionfieldset').getComponent('EfctvStartDt').getValue()))) ? true : "Must be less than Effective End Date and within range of Tenant Family Effective dates";
							},
							allowBlank: false,
							listeners: {
								change: 'onAddressItemChanged'
							}
						},
						{
							xtype: 'datefield',
							name: 'EfctvEndDt',
							itemId: 'EfctvEndDt',
							labelWidth: 130,
							format: 'n/j/Y',
							fieldLabel: 'Effective End Date',
							validator: function (val) {
								return ((new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) && (new Date(val) <= new Date(this.up().up().up().up().getComponent('detailsection').getComponent('detailsectionfieldset').getComponent('EfctvEndDt').getValue())) && (new Date(val) >= new Date(this.up().up().up().up().getComponent('detailsection').getComponent('detailsectionfieldset').getComponent('EfctvStartDt').getValue()))) ? true : "Must be greater than Effective Start Date and within range of Tenant Family Effective dates";
							},
							allowBlank: false,
							listeners: {
								change: 'onAddressItemChanged'
							}
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'addressbuttonsection',
					items: [
						{
							xtype: 'button',
							itemId: 'AddressCancelButton',
							text: 'Cancel',
							handler: 'onAddressCancelClick',
							bind: {
								disabled: '{!changedAddress}'
							}
						},
						{
							xtype: 'button',
							itemId: 'AddressAddButton',
							text: 'Add',
							handler: 'onAddressAddClick',
							bind: {
								disabled: '{!validaddressform}'
							}
						}
					]
				}
			]
		}
	]
});
