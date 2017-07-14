/**
 * Created by c4539 on 10/28/2016.
 */
Ext.define('Atlas.portals.view.hpmember.MemberProfile', {
    extend: 'Ext.Container',
    controller: 'portalshpmembermemberprofileController',
    xtype: 'portalshpmembermemberprofile',
    viewModel:'portalsMemberMHPMemberProfileViewModel',
    title: 'My Profile',
    scrollable: 'y',
    items: {
        xtype: 'form',
        reference: 'memberForm',
        title: 'Member Profile',
        cls: 'card-panel',
        bodyPadding: '15 50 15 15',
        width: 680,
        items: [{
            xtype: 'container',
            layout: 'vbox',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Member Information',
                    width: 600,
                    defaults: {
                        labelWidth: 110,
                        xtype: 'textfield',
                        style: {padding: '5px'},
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            fieldLabel: 'First Name',
                            name: 'firstName',
                            reference: 'firstName',
                            editable: false,
                            width:500
                        },
                        {
                            fieldLabel: 'Middle Name',
                            name: 'middleName',
                            reference: 'middleName',
                            editable: false,
                            width:500
                        },
                        {
                            fieldLabel: 'Last Name',
                            name: 'lastName',
                            reference: 'lastName',
                            editable: false,
                            width:500
                        },
                        {
                            fieldLabel: 'Address 1',
                            name: 'address1',
                            reference: 'address1',
                            allowBlank: false,
                            width:500,
                            bind: {
                                editable: '{canEdit}'
                            }
                        },
                        {
                            fieldLabel: 'Address 2',
                            name: 'address2',
                            reference: 'address2',
                            width: 500,
                            bind: {
                                editable: '{canEdit}'
                            }
                        },
                        {
                            fieldLabel: 'City',
                            name: 'city',
                            reference: 'city',
                            allowBlank: false,
                            width: 500,
                            bind: {
                                editable: '{canEdit}'
                            }
                        },{
                            fieldLabel: 'State',
                            xtype: 'combo',
                            name: 'stateCombo',
                            reference: 'stateCombo',
                            width: 500,
                            bind: {
                                readOnly: '{!canEdit}'
                            }
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Zip',
                            name: 'zip',
                            reference: 'zip',
                            width: 500,
                            bind: {
                                editable: '{canEdit}'
                            }
                        }
                    ]
                },{
                    xtype: 'fieldset',
                    title: 'Contact Information',
                    width: 600,
                    defaults: {
                        labelWidth: 110,
                        style: {padding: '5px'},
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            fieldLabel: 'Current Email',
                            xtype: 'textfield',
                            name: 'email',
                            reference: 'email',
                            width:500,
                            allowBlank: false,
                            bind: {
                                editable: '{canEdit}'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaultType: 'radiofield',
                            items :[{
                                boxLabel: 'Receive Email Notices',
                                name: 'emailNotices',
                                reference: 'receiveEmailNotice',
                                bind: {
                                    disabled: '{!canEdit}'
                                }
                            },{
                                boxLabel: 'Unsubscribe',
                                name: 'emailNotices',
                                reference: 'unsubscribeEmail',
                                style :{ padding: '0 0 0 20px'},
                                bind: {
                                    disabled: '{!canEdit}'
                                }
                            }]
                        },
                        {
                            fieldLabel: 'Home',
                            xtype: 'textfield',
                            name: 'home',
                            reference: 'homePhone',
                            maskRe: new RegExp(/[0-9\()\-]/),
                            maxLength: 14,
                            enableKeyEvents: true,
                            allowBlank: false,
                            listeners: {
                                keypress: 'formatPhone'
                            },
                            bind: {
                                editable: '{canEdit}'
                            }
                        },
                        {
                            fieldLabel: 'Work',
                            xtype: 'textfield',
                            name: 'work',
                            reference: 'workPhone',
                            maskRe: new RegExp(/[0-9\()\-]/),
                            maxLength: 14,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'formatPhone'
                            },
                            bind: {
                                editable: '{canEdit}'
                            }
                        },
                        {
                            fieldLabel: 'Cell',
                            xtype: 'textfield',
                            name: 'cell',
                            reference: 'cellPhone',
                            maskRe: new RegExp(/[0-9\()\-]/),
                            maxLength: 14,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'formatPhone'
                            },
                            bind: {
                                editable: '{canEdit}'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaultType: 'radiofield',
                            items :[{
                                boxLabel: 'Receive Text Messages',
                                name: 'textNotices',
                                reference: 'receiveTextMessages',
                                bind: {
                                    disabled: '{!canEdit}'
                                }
                            },{
                                boxLabel: 'Unsubscribe',
                                name: 'textNotices',
                                reference: 'unsubscribeText',
                                style :{ padding: '0 0 0 20px'},
                                bind: {
                                    disabled: '{!canEdit}'
                                }
                            }]
                        }
                    ]
                }
            ]
        },{
            xtype: 'button',
            text: 'Save Profile',
            reference: 'saveProfile',
            handler: 'onSaveClick',
            width: 115,
            bind: {
                hidden: '{!canEdit}'
            }
        }]
    }
});