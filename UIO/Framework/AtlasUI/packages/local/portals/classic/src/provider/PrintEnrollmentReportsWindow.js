/**
 * Created by c4539 on 12/2/2016.
 */
Ext.define('Atlas.portals.provider.PrintEnrollmentReportsWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsproviderprintenrollmentreportswindow',
    controller: 'portalsproviderprintenrollmentreportswindow',
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
                                store: '{provStore}',
                                hidden: '{!multipleGroups}'
                            }
                        },
                        {
                            xtype: 'radiofield',
                            name: 'report',
                            boxLabel: 'Separate report for each provider',
                            inputValue: '1',
                            checked: true
                        },
                        {
                            xtype: 'radiofield',
                            name: 'report',
                            boxLabel: 'Combined enrollment list',
                            inputValue: '2'
                        }
                    ]
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
                        handler: 'printReports'
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