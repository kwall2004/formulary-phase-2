/**
 * This Class represents the PIC License Tab within the Pharmacy Information tab of Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.pharmacy.PicLicense', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-piclicense',
    reference: 'picLicenseRef',
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
                    reference: 'picLicInforFormRef',
                    title: 'PIC License Information',
                    overflowY: true,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'top'
                    },
                    defaults: {
                        width: 350,
                        labelWidth: 120
                        //padding: 5
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            padding: '20 0 0 5',
                            fieldLabel: 'PIC Name',
                            name: 'PICName'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PIC License #',
                            name: 'PICLicenseNum'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'PIC Exp. Date',
                            name: 'PICExpDate',
                            format: 'm/d/Y'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'PIC Verf. Date',
                            format: 'm/d/Y',
                            name: 'PICVerfDate'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'PIC OIG Verf. Date',
                            format: 'm/d/Y',
                            name: 'PICOIGVerfDate'
                        },

                        {
                            xtype: 'combo',
                            fieldLabel: 'PIC OIG Action',
                            name: 'PICOIGAction',
                            bind: {
                                store: ['Yes', 'No']
                            },
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'PIC SAM Verf. Date',
                            name: 'PICSAMVerfDate',
                            format: 'm/d/Y'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'PIC SAM Action',
                            name: 'PICSAMAction',
                            bind: {
                                store: ['Yes', 'No']
                            },
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        }
                    ]
                },

                {
                    xtype: 'panel',
                    title: 'PIC Lic History',
                    flex: 1,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            reference: 'picLicInfoGridRef',
                            bind: {
                                store: '{pharmacylicinfo}'
                            },
                            columns: [
                                {text: 'Updated On', flex: 1, dataIndex: 'updatedOn', renderer:function(value)
                                {
                                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y')
                                }},
                                {text: 'Updated By', flex: 1, dataIndex: 'updatedBy'},
                                {text: 'PIC Name', flex: 1, dataIndex: 'PICName'},
                                {text: 'PIC License Num', flex: 1, dataIndex: 'PICLicenseNum', align: 'center'},
                                {text: 'PIC Exp. Date', flex: 1, formatter: 'date("m/d/Y")', dataIndex: 'PICExpDate'},
                                {
                                    text: 'PIC Verification Date',
                                    flex: 1,
                                    formatter: 'date("m/d/Y")',
                                    dataIndex: 'PICVerfDate',
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