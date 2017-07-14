/**
 * Created by m4542 on 10/13/2016.
 */
Ext.define('Atlas.portals.view.hpmember.RequestIdCard', {
    extend: 'Ext.panel.Panel',
    title: 'Request ID Card',
    reference: 'requestIdRef',
    xtype: 'portals-hpmember-RequestIdCard',
    controller: 'requestIdController',
    viewModel: 'requestIdViewModel',
    items: [
        {
            xtype: 'form',
            title: 'Request ID Card',
            reference: 'requestidcard',
            cls: 'card-panel',
            bodyPadding: '15 50 15 15',
            width: 680,
            items: [{
                xtype: 'fieldset',
                title: 'Member Info',
                width: 600,
                defaults: {
                    labelWidth: 110,
                    width: 500,
                    style: {
                        padding:'5px'
                    }
                },
                items: [
                {
                    xtype: 'combo',
                    reference: 'familyCombo',
                    fieldLabel: 'Family',
                    name: 'Family',
                    itemId: "familyCombo",
                    hiddenName:'familyCombo',
                    displayField: 'name',
                    valueField: 'value',
                    listeners: {
                        select: 'onFamilySelected'
                    },
                    emptyText: 'Select a type'
                },
                {
                    xtype: 'combo',
                    reference: 'lob',
                    fieldLabel: 'LOB',
                    name: '@primaryLOB',
                    itemId: "lob",
                    hiddenName:'lob',
                    displayField: 'name',
                    valueField: 'value',
                    triggerAction: 'all',
                    hidden: true,
                    hideable: false
                },
                {
                    xtype: 'textfield',
                    name: '@dispMemberID',
                    readOnly: true,
                    fieldLabel: 'Member ID'
                },
                {
                    xtype: 'textfield',
                    name: 'lastName',
                    readOnly: true,
                    fieldLabel: 'Last Name'
                },
                {
                    xtype: 'textfield',
                    name: 'firstName',
                    readOnly: true,
                    fieldLabel: 'First Name'
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
                        text: 'Request ID Card',
                        align: 'center',
                        iconCls: 'x-fa fa-share-square-o',
                        width: 200,
                        listeners: {
                            click: 'requestIdCard'
                        }
                    }
                }]
            },
            {
                xtype: 'container',
                bind: {
                    html: '<span style="color: red;">{statusMessage}</span>'
                }
            }]
        }
    ]
    });