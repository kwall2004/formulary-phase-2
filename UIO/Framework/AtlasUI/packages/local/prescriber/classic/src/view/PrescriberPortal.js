/**
 * Created by T4317 on 9/27/2016.
 */
Ext.define('Atlas.prescriber.view.PrescriberPortal', {
extend: 'Ext.form.Panel',
    xtype: 'prescriber-prescriberportal',
    title: 'Prescriber Portal Users',
    controller:'portalusers',
    viewModel: {
        data:{
            editPrescriber: true,
            save: true,
            cancel: true,
            passReset: true,
            approve: true
        }
    },
    scrollable: true,
    layout: {
        type: 'vbox'
    },
    defaults:{
        xtype: 'panel',
        cls: 'card-panel',
        layout: {
            type: 'vbox',
            align: 'fit'
        }
    },
    dockedItems: [
    {
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        items: [
            {
                xtype: 'panel',
                iconCls: 'fa fa-user',
                width:23,
                iconMask: false
            },
            {
                xtype: 'label',
                text: 'Prescriber:'
            },
            {
                xtype: 'prescribertypeahead',
                name: 'prescriberSearch',
                emptyText: '[NPI DEA PrescriberName Address]',
                reference: 'prescriberSearch',
                minWidth: '350',
                //enableKeyEvents: 'true',
                bind: {
                    //store:'{membermasterext}',
                    //store:'{membermasterext}',
                    //store: '{membermasterext}',
                    //value: '{fmtSearchDisplay}'
                },
                listeners: {
                    select: 'onPrescriberSelection'
                }

            },
            {
                xtype: 'button',
                itemId: 'btPrescriberInfo',
                tooltip: 'View more Prescriber info',
                iconCls:'fa fa-external-link',
                handler: 'onPrescriberClick'
            },'->', {
                xtype: 'panel',
                iconCls: 'fa fa-clock-o',
                width:23,
                iconMask: false
            },
            {
                xtype : 'displayfield',
                fieldLabel: 'Prescriber registered on:',
                bind: {
                    value: "{masterrecord.CreateDateTime}"
                }
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
            text: 'Edit Prescriber',
            itemId: 'btnEditUser',
            iconCls: 'fa fa-pencil-square-o',
            handler: 'onEditUser',
            bind:{
                disabled:'{editPrescriber}'
            }


        },{
            xtype: 'button',
            text: 'Save',
            iconCls: 'fa fa-save',
            itemId: 'btnSave',
            handler: 'onSave',
            bind:{
                disabled:'{save}'
            }

        },{
            xtype: 'button',
            text: 'Cancel',
            itemId: 'btnCancel',
            iconCls: 'fa fa-times',
            handler: 'onCancel',
            bind:{
                disabled:'{cancel}'
            }

        },{
            xtype: 'button',
            text: 'Set / Reset Password',
            itemId: 'btnSetResetPw',
            iconCls:'fa fa-pencil',
            handler: 'onSetResetPw',
            bind:{
                disabled:'{passReset}'
            }
        },{
            xtype: 'button',
            text: 'Approve',
            iconCls:'fa fa-check-circle-o',
            handler: 'onApprove',
            bind:{
                disabled:'{approve}'
            }
        }]
    }],


    items: [{
        title: 'Prescriber Information',
        iconCls: 'fa fa-medkit',
        items: [{
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'Prescriber User Name',
                tgtName: 'UserName',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'
            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'NPI',
                tgtName: 'npi',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'DEA',
                tgtName: 'DEA',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'First Name',
                tgtName: 'firstName',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'Last Name',
                tgtName: 'lastname',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'Address',
                tgtName: 'locaddr1',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'City',
                tgtName: 'loccity',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'State',
                tgtName: 'locstate',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'Zip',
                tgtName: 'formattedzip',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            reference:'email',
            itemConfig: {
                tgtLabel: 'Email',
                tgtName: 'Email',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainerchkbox',
            reference:'activeToggle',
            itemConfig: {
                tgtLabel: 'Active:',
                tgtName: 'Active',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'
            }
        }]
    }, {
        title: 'General Information',
        iconCls: 'fa fa-mobile',
        items: [{
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'Registration Status:',
                tgtName: 'registrationStatus',
                reference:'regStat',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'
            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'Login Device:',
                tgtName: 'LoginDevice',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'

            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'Last Login:',
                tgtName: 'lastLogin',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'
            }
        }, {
            xtype: 'member-memberprofile-mpudisplaycontainer',
            itemConfig: {
                tgtLabel: 'Password Change Date:',
                tgtName: 'PasswordChangeDate',
                tgtIcon: 'fa fa-search',
                tgtLblWidth: 200,
                tgtLblAlign: 'left'
            }
        }]

    }]/*,
    initComponent: function () {
        var me = this;
        me.callParent();  // actually build whats calling initComp
    }*/

});
