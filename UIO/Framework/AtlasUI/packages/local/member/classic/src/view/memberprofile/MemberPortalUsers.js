/**
 * Last Developer: Jeff Huffman
 * Previous Developers: []
 * Origin: prescriberportal-searchpriorauth-createaudit
 * Description: Plan Search
 **/
Ext.define('Atlas.member.view.memberprofile.MemberPortalUsers', {
    extend: 'Ext.form.Panel',
    xtype: 'member-memberprofile-memberportalusers',
    viewModel: 'memberportalusers',
    controller: 'memberportalusers',
    title: 'Member Portal Users',
    scrollable: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            items: [
                {
                    xtype: 'label',
                    text: 'Member'
                },
                {
                    xtype: 'membertypeahead',
                    name: 'memberSearch',
                    emptyText: '[MemberID Name SSN MeridianRxID]',
                    reference: 'memberSearch',
                    minWidth: '350',
                    listeners: {
                        select: 'onMemberSelection'
                    }
                },
                {
                    xtype: 'button',
                    tooltip: 'View more Member info',
                    iconCls: 'fa fa-user',
                    itemId: 'btnMember',
                    handler: 'onMemberClick'
                }, {
                    xtype: 'button',
                    tooltip: 'Member Portal',
                    iconCls: 'fa fa-external-link',
                    itemId: 'btnMemberPortal',
                    handler: 'onMemberPortalClick'
                }, '->', {
                    xtype: 'fieldcontainer',
                    itemId: 'mbrRegisterFC',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'fit'
                    },
                    items: [{
                        xtype: 'container',
                        padding: '2px, 2px, 2px, 2px',   // T L R B
                        itemId: "mbrRegisterContainer",
                        items: [{
                            xtype: 'image',
                            height: 20,
                            width: 20
                            //src: 'resources/images/locked.png'
                        }]
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Member Registered On:',
                        itemId: 'mbrRegisterField',
                        value: ''
                    }]
                }]
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [{
                xtype: 'button',
                text: 'Edit a User',
                iconCls: 'fa fa-pencil-square-o',
                itemId: 'btnEditUser',
                handler: 'onEditUser'
            }, {
                xtype: 'button',
                text: 'Save',
                iconCls: 'fa fa-save',
                itemId: 'btnSave',
                handler: 'onSave'
            }, {
                xtype: 'button',
                text: 'Cancel',
                iconCls: 'fa fa-times',
                itemId: 'btnCancel',
                handler: 'onCancel'
            }, {
                xtype: 'button',
                text: 'Set / Reset Password',
                iconCls: 'fa fa-pencil',
                itemId: 'btnSetResetPw',
                handler: 'onSetResetPw'
            }]
        }],

    items: [{
        xtype: 'form',
        itemId: 'mpuForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            cls: 'card-panel',
            title: 'Member Information',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Member User Name',
                    tgtName: 'userName',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{mbrUserMasterRec.userName}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'
                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Recipient Id',
                    tgtName: 'recipientId',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{listRec.recipientID}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Member Id',
                    tgtName: 'memberId',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{listRec.memberID}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'First Name',
                    tgtName: 'firstName',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{listRec.firstName}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Last Name',
                    tgtName: 'lastName',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{listRec.lastName}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'DOB',
                    tgtName: 'dob',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{listRec.dobFormat}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Email',
                    tgtName: 'email',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{mbrUserMasterRec.email}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'SSN',
                    tgtName: 'ssn',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{fmtLast4SSN}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Carrier:',
                    tgtName: 'carrier',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{listRec.carrierName}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainerchkbox',
                itemConfig: {
                    tgtLabel: 'Active:',
                    tgtName: 'active',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{mbrUserMasterRec.active}',
                    tgtLblWidth: 210,
                    tgtLblAlign: 'left'
                }
            }]
        }, {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'General Information',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Login Device:',
                    tgtName: 'loginDevice',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{mbrUserMasterRec.loginDevice}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'
                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Last Login:',
                    tgtName: 'lastLogin',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{fmtLastLoginDate}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Password Change Date:',
                    tgtName: 'passwordChgDate',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{fmtPWChgDate}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'
                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainerchkbox',
                itemConfig: {
                    tgtLabel: 'Mobile Access:',
                    tgtName: 'mobileAccess',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{mbrUserMasterRec.mobileAccess}',
                    tgtLblWidth: 210,
                    tgtLblAlign: 'left'
                }
            }]

        }]
    }],
    initComponent: function () {
        //debugger;
        // It was decided to use the init method in the MemberPortalUsersController.js
        // to ensure the buttons are disabled on initial load.
        var me = this;
        me.callParent();  // actually build whats calling initComp
        // Must be called after me.callParent so its built.
        //var curViewController = me.getController();
        //var curViewModel = me.getViewModel()
        //curViewController.disableButtonsByType(curViewModel.data.cDisableAll);
    }
    /*
     constructor: function(configs) {
     // ------------------------------------------------------
     // You only use this method if you need to modify incoming arguments
     // before they actually get initialized in the component.
     // ------------------------------------------------------
     this.callParent(arguments);  // Creates Class, calls initComponent
     this.initConfig(configs);
     }
     */

});
