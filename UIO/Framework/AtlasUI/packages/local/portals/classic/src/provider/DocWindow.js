/**
 * Created by c4539 on 12/2/2016.
 */
Ext.define('Atlas.portals.view.provider.DocWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsproviderdocwindow',
    controller: 'portalsproviderdocwindow',
    items:[
        {
            xtype: 'form',
            reference: 'docForm',
            items: [
                {
                    xtype: 'container',
                    style: {
                        padding: '10px'
                    },
                    defaults: {
                        listeners: {
                            change: 'onCheckboxChanged'
                        }
                    },
                    items: [
                        {
                            xtype: 'checkbox',
                            name: 'all',
                            boxLabel: 'All'
                        },
                        {
                            xtype: 'checkbox',
                            reference: 'planOfCare',
                            name: 'planOfCare',
                            boxLabel: 'Plan of Care Document'
                        },
                        {
                            xtype: 'checkbox',
                            reference: 'memObjProfile',
                            name: 'memObjProfile',
                            boxLabel: 'Member Object Profile'
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
                        handler: 'processDocument',
                        bind: {
                            disabled: '{isOkDisabled}'
                        }
                    },
                    {
                        text: 'Cancel',
                        handler: 'cancelDocument'
                    }
                ]
            }
        }
    ]
});