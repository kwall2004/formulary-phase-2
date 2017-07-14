/**
 * Created by c4539 on 2/6/2017.
 */
Ext.define('Atlas.portals.provider.ExportEnrollmentReportsWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsproviderexportenrollmentreportswindow',
    controller: 'portalsproviderexportenrollmentreportswindow',
    items: [
        {
            xtype: 'form',
            reference: 'reportForm',
            items: [
                {
                    xtype: 'container',
                    style: {
                        padding: '10px'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Provider',
                            allowBlank: false,
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'value',
                            name: 'provider',
                            bind: {
                                store: '{provStore}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    reference: 'hiddenProviderExport',
                    height: 0,
                    width: 0,
                    visible: false,
                    bind: {
                        store: '{providersExport}'
                    },
                    plugins: [{
                        ptype: 'gridexporter'
                    }],
                    columns: [
                        { text: 'Member ID', dataIndex: 'dispMemberID'}, { text: 'Last Name', dataIndex: 'lastName'},
                        { text: 'First Name', dataIndex: 'firstName'}, { text: 'DOB', dataIndex: 'birthDate'},
                        { text: 'File Date', dataIndex: 'filedate'}, { text: 'Phone', dataIndex: 'Phone'},
                        { text: 'Address 1', dataIndex: 'Address1'}, { text: 'Address 2', dataIndex: 'Address2'},
                        { text: 'City', dataIndex: 'City'}, { text: 'State', dataIndex: 'State'}, { text: 'Zip', dataIndex: 'Zip'},
                        { text: 'PCP Id', dataIndex: 'pcpId'}, { text: 'PCP Name', dataIndex: 'pcpName'},
                        { text: 'CSHCS', dataIndex: 'cshcs'}, { text: 'Program Group', dataIndex: 'programGroup'},
                        { text: 'Line of Business', dataIndex: 'lineOfBusiness'}
                    ],
                    listeners: {
                        documentsave: 'cancelReports'
                    }
                }
            ],
            bbar: {
                xtype: 'toolbar',
                layout: {
                    pack: 'center'
                },
                items: [
                    {
                        text: 'Ok',
                        handler: 'exportReports'
                    },
                    {
                        text: 'Cancel',
                        handler: 'cancelReports'
                    }
                ]
            }
        }
    ]
});