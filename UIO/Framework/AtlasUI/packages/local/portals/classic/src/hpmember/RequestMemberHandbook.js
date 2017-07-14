Ext.define('Atlas.portals.view.hpmember.RequestMemberHandbook', {
    extend: 'Ext.Container',
    title: 'Request Member Handbook',
    xtype: 'portalshpmemberrequestmemberhandbook',
    controller: 'portalshpmemberrequestmemberhandbook',
    viewModel: 'portalshpmemberrequestmemberhandbook',
    items: {
        xtype: 'form',
        title: 'Request Member Handbook',
        reference: 'requestForm',
        cls: 'card-panel',
        bodyPadding: '15 50 15 15',
        width: 680,
        items: [
            {
                xtype: 'fieldset',
                title: 'Member Info',
                width: 600,
                defaults: {
                    labelWidth: 110,
                    style: {padding: '5px'},
                    width: 500
                },

                items: [
                    {
                        xtype: 'combo',
                        reference: 'familyCombo',
                        name: 'familyCombo',
                        displayField: 'name',
                        valueField: 'value',
                        fieldLabel: 'Family',
                        listeners: {
                            select: 'onFamilySelected'
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'recipientID',
                        name: 'recipientID',
                        hidden: true
                    },
                    {
                        xtype: 'combo',
                        reference: 'lob',
                        name: 'lob',
                        fieldLabel: 'LOB',
                        displayField: 'name',
                        valueField: 'name',
                        queryMode: 'local'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'Member ID',
                        name: '@dispMemberID',
                        readOnly: true
                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'Last Name',
                        reference: 'lastName',
                        name: 'lastName',
                        readOnly: true
                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'First Name',
                        reference: 'firstName',
                        name: 'firstName',
                        readOnly: true
                    },
                    {
                        xtype: 'combo',
                        reference: 'language',
                        name: 'language',
                        fieldLabel: 'Language',
                        valueField: 'langCode',
                        displayField: 'lang',
                        queryMode: 'local',
                        emptyText: 'Choose Language',
                        bind: {
                            store: '{languages}'
                        }
                    },
                    {
                        xtype: 'container',
                        width: '100%',
                        layout: {
                            pack: 'center',
                            align: 'center',
                            type: 'hbox'
                        },
                        items: {
                            xtype: 'button',
                            bind: {
                                text: 'Request {planTitle} Member Handbook'
                            },
                            iconCls: 'x-fa fa-share-square-o',
                            handler: 'submitRequest',
                            align: 'center',
                            width: 200
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                bind: {
                    html: '<span style="color: red;">{statusMessage}</span>'
                }
            }
        ]
    }
});