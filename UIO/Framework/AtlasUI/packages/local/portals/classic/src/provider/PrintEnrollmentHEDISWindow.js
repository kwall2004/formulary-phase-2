/**
 * Created by c4539 on 12/28/2016.
 */
Ext.define('Atlas.portals.provider.PrintEnrollmentHEDISWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsproviderprintenrollmenthediswindow',
    controller: 'portalsproviderprintenrollmenthediswindow',

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
                            xtype: 'combo',
                            name: 'provider',
                            reference: 'provider',
                            fieldLabel: 'Provider',
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'value',
                            listeners: {
                                select: 'onProviderSelected'
                            }
                        },
                        {
                            xtype: 'combo',
                            reference: 'lob',
                            name: 'lob',
                            fieldLabel: 'LOB',
                            queryMode: 'local',
                            disabled: true
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
                        handler: 'printHEDIS'
                    },
                    {
                        text: 'Cancel',
                        handler: 'cancelHEDIS'
                    }
                ]
            }
        }
    ]
});