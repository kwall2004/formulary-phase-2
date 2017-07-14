/**
 * Last Developer: Jeff Huffman
 * Previous Developers: []
 * Origin: prescriberportal-searchpriorauth-createaudit
 * Description: Plan Search
 **/
Ext.define('Atlas.pharmacy.view.PortalUsers', {
    extend: 'Ext.form.Panel',
    xtype: 'pharmacy-portalusers',
    viewModel: 'pharmacy-portalusers',
    controller: 'pharmacy-portalusers',
    title: 'Pharmacy Portal Users',
    scrollable: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'box',
                    html: ' Search by'
                },
                {
                    xtype: 'segmentedbutton',
                    reference: 'btnSearchType',
                    bind: '{value}',
                    items: [
                        {
                            text: 'Relationship',
                            hint: '[Relationship]',
                            action: 'RelationshipId',
                            value: 'RelationshipId',
                            tooltip: 'Search Relationship Contract'
                        },
                        {
                            text: 'Pharmacy',
                            hint: '[Pharmacy]',
                            action: 'Pharmacy',
                            value: 'Pharmacy',
                            tooltip: 'Search Pharmacy Contract',
                            pressed: true
                        }
                    ],
                    listeners: {
                        toggle: 'onSearchTypeToggle'
                    }
                },
                {
                    xtype: 'providertypeahead',
                    reference: 'cbxPharmSearch',
                    displayField: 'Pharname',
                    valueField: 'ncpdpId',
                    forceSelection: true,
                    emptyText: '[e.g. Target Pharmacy MI 48188]',
                    width: 250,
                    value: '',
                    listeners: {
                        select: 'onCbxSelect'
                    }
                },
                {
                    xtype: 'relationshiptypeahead',
                    reference: 'cbxRelationshipSearch',
                    displayField: 'Relationshipname',
                    valueField: 'relationshipID',
                    emptyText: '[e.g. CVS MI]',
                    forceSelection: true,
                    width: 250,
                    value: '',
                    listeners: {
                        select: 'onCbxSelect'
                    },
                    hidden: false
                }, {
                    xtype: 'button',
                    text: 'View Pharmacy',
                    iconCls: 'fa fa-user',
                    handler: 'onRouteToPharmacyClick',
                    tooltip: 'Go To Pharmacy Details',
                    reference: 'btnPharmacy'
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
                iconCls: 'fa fa-pencil-square-o',
                text: 'Edit Pharmacy',
                itemId: 'btnEditUser',
                handler: 'onEditUser'
            }, {
                xtype: 'button',
                iconCls: 'fa fa-save',
                text: 'Save',
                itemId: 'btnSave',
                handler: 'onSave'
            }, {
                xtype: 'button',
                iconCls: 'fa fa-times',
                text: 'Cancel',
                itemId: 'btnCancel',
                handler: 'onCancel'
            }, {
                xtype: 'button',
                iconCls: 'fa fa-pencil',
                text: 'Set / Reset Password',
                itemId: 'btnSetResetPw',
                handler: 'onSetResetPw'
            }]
        }],

    items: [{
        xtype: 'form',
        itemId: 'pucForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        /*
         FIELD NcpdpID               LIKE PharmacyUserMaster.NCPDPId
         FIELD RelationshipId        LIKE PharmacyUserMaster.relationshipId
         FIELD UserName              LIKE PharmacyUserMaster.UserName
         FIELD ContactName           LIKE PharmacyUserMaster.ContactName
         FIELD Email                 LIKE PharmacyUserMaster.Email
         FIELD Phone                 LIKE PharmacyUserMaster.Phone
         FIELD Active                LIKE PharmacyUserMaster.Active
         FIELD AccountLocked         LIKE PharmacyUserMaster.accountLocked
         FIELD PasswordChangeDate    LIKE PharmacyUserMaster.PasswordChangeDate
         FIELD Lastlogin             LIKE PharmacyUserMaster.lastloginDateTime
         FIELD SystemID              LIKE PharmacyUserMaster.systemID.


         "success": true,
         "total": 0,
         "data": [{"AccountLocked":false,
         "Active":true,
         "UserName":"ALPH5682",
         "Email":"christopher.taylor@mhplan.com",
         "PasswordChangeDate":"2016-08-04",
         "Lastlogin":"2016-08-11T10:26:56.188-04:00",
         "RelationshipId":"",
         "Phone":"(586)-713-8970",
         "SystemID":347.332728361,
         "NcpdpID":"2302610","ContactName":"ChristopherTaylor"}],
         "metadata": {},
         "message":[
         {"code": 0, "type": "HTTP", "message": "Success", "dataindex": ""}
         ]

         */
        items: [{
            xtype: 'panel',
            cls: 'card-panel',
            title: 'Pharmacy Information',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'User Name',
                    tgtName: 'userName',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{pharmacyUserMasterRec.UserName}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'
                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Relationship Id',
                    tgtName: 'relationshipId',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{pharmacyUserMasterRec.RelationshipId}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'NCPDP ID ',
                    tgtName: 'ncpdpId',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{pharmacyUserMasterRec.NcpdpID}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Contact Name',
                    tgtName: 'contactName',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{pharmacyUserMasterRec.ContactName}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Phone',
                    tgtName: 'phone',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{pharmacyUserMasterRec.Phone}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left',
                    tgtVtype: 'phone',
                    tgtMaskRe: /[0-9]/,
                    tgtMinLength: 14,
                    tgtMaxLength: 14,
                    tgtEnforceMaxLength: 14,
                    tgtPlugins: {
                        ptype: 'phonenumberformatter'
                    }
                }
            }, {
                xtype: 'member-memberprofile-mpudisplaycontainer',
                itemConfig: {
                    tgtLabel: 'Email',
                    tgtName: 'email',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{pharmacyUserMasterRec.Email}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'

                }
            }, {
                xtype: 'pharmacy-pucdisplaycontainerchkbx',
                itemConfig: {
                    tgtLabel: 'Active:',
                    tgtName: 'active',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{pharmacyUserMasterRec.Active}',
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
                xtype: 'pharmacy-pucdisplaycontainerchkbx',
                itemConfig: {
                    tgtLabel: 'Locked:',

                    tgtName: 'accountLocked',
                    tgtIcon: 'fa fa-search',
                    tgtBind: '{pharmacyUserMasterRec.AccountLocked}',
                    tgtLblWidth: 210,
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
                    tgtBind: '{fmtPassChageDate}',
                    tgtLblWidth: 200,
                    tgtLblAlign: 'left'
                }
            }]
        }]
    }],
    initComponent: function () {
        var me = this;
        me.callParent();  // actually build whats calling initComp
    }

});
