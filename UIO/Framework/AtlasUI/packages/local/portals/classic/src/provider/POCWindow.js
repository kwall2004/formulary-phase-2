/**
 * Created by c4539 on 12/1/2016.
 */
Ext.define('Atlas.portals.provider.POCWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsproviderpocwindow',
    controller: 'portalsproviderpocwindow',
    items:[
        {
            xtype: 'form',
            reference: 'pocForm',
            items: [
                {
                    xtype: 'container',
                    style: {
                        padding: '10px'
                    },
                    items: [
                        {
                            xtype: 'radiofield',
                            name: 'approval',
                            fieldLabel: 'Approval',
                            boxLabel: 'Approved',
                            hideEmptyLabel: false,
                            checked: true,
                            inputValue: true
                        },
                        {
                            xtype: 'radiofield',
                            name: 'approval',
                            boxLabel: 'Not Approved',
                            hideEmptyLabel: false,
                            inputValue: false
                        },
                        {
                            xtype: 'textarea',
                            name: 'comments',
                            fieldLabel: 'Comments'
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
                        text: 'View POC',
                        handler: 'viewPoc'
                    },
                    {
                        text: 'Ok',
                        handler: 'processDecision'
                    },
                    {
                        text: 'Cancel',
                        handler: 'cancelDecision'
                    }
                ]
            }
        }
    ]
});