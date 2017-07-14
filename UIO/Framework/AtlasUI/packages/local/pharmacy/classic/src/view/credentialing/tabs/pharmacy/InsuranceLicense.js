/**
 * This Class represents the Insurance License Tab within the Pharmacy Information tab of Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.pharmacy.InsuranceLicense', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-inslicense',
    reference: 'insLicenseRef',
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'form',
                    title: 'Insurance License Information',
                    reference: 'insLicInfoFormRef',
                    overflowY: true,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'top'
                    },
                    defaults: {
                        width: 360,
                        labelWidth: 130,
                        padding: 5
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            padding: '20 0 0 5',
                            fieldLabel: 'Insurance Company',
                            name: 'InsuranceCompany'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Amount of Coverage',
                            name: 'AmountOfCoverage'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Insurance Account #',
                            name: 'InsuranceAccount'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Insurance Exp. Date',
                            name: 'InsuranceExpDate',
                            format: 'm/d/Y'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Insurance Verf. Date',
                            name: 'InsuranceVerfDate',
                            format: 'm/d/Y'
                        }
                    ]
                },

                {
                    xtype: 'panel',
                    title: 'Insurance Lic History',
                    flex: 1,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            reference: 'insLicInfoGridRef',
                            bind: {
                                store: '{inslicensehistory}'
                            },
                            columns: [
                                {text: 'Updated On', flex: 1,  renderer:function(value)
                                {
                                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y')
                                }, dataIndex: 'updatedOn'},
                                {text: 'Updated By', flex: 1, dataIndex: 'updatedBy', flex: 1, align: 'center'},
                                {text: 'Insurance name', flex: 1, dataIndex: 'InsuranceCompany'},
                                {text: 'Insurance Acc. #', flex: 1, dataIndex: 'InsuranceAccount'},
                                {
                                    text: 'Expiration Date',
                                    flex: 1,
                                    formatter: 'date("m/d/Y")',
                                    dataIndex: 'InsuranceExpDate',
                                    align: 'center'
                                },
                                {
                                    text: 'Verification Date',
                                    flex: 1,
                                    formatter: 'date("m/d/Y")',
                                    dataIndex: 'InsuranceVerfDate',
                                    align: 'center'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});