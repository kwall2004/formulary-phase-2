/**
 * This Class represents the Dea License Tab within the Pharmacy Information tab of Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.pharmacy.DeaLicense', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-dealicense',
    reference: 'deaLicenseRef',
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
                    reference: 'deaLicFormRef',
                    title: 'DEA License Information',
                    overflowY: true,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'top'
                    },
                    defaults: {
                        width: 360,
                        labelWidth: 150,
                        padding: 5
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            padding: '20 0 0 5',
                            fieldLabel: 'DEA Registration ID',
                            name: 'DEARegistrationID'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'NCPDP DEA Number',
                            name: 'NCPDPDEAId',
                            disabled: true
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'DEA Exp. Date [NCPDP]',
                            name: 'DEAExpDateNCPDP',
                            disabled: true,
                            format: 'm/d/Y'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'DEA Exp. Date',
                            name: 'DEAExpDate',
                            format: 'm/d/Y'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'DEA Verf. Date',
                            name: 'DEAVerfDate',
                            format: 'm/d/Y'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Activity',
                            name: 'NTISActivity',
                            disabled: true
                        }
                    ]
                },

                {
                    xtype: 'panel',
                    title: 'DEA Lic History',
                    flex: 1,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            reference: 'deaLicGridRef',
                            bind: {
                                store: '{dealicensehistory}'
                            },
                            columns: [
                                {text: 'Updated On', flex: 1,  renderer:function(value)
                                {
                                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y')
                                }, dataIndex: 'updatedOn'},
                                {text: 'Updated By', flex: 1, dataIndex: 'updatedBy', align: 'center'},
                                {text: 'DEA Reg. ID', flex: 1, dataIndex: 'DEARegistrationID', align: 'center'},
                                {text: 'Expiration Date', flex: 1, formatter: 'date("m/d/Y")', dataIndex: 'DEAExpDate'},
                                {
                                    text: 'Verified Date',
                                    flex: 1,
                                    formatter: 'date("m/d/Y")',
                                    dataIndex: 'DEAVerfDate',
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