Ext.define('Atlas.pharmacy.view.CreateEditPharmacy', {
    extend: 'Ext.Panel',
    controller: 'createeditpharmacycontroller',
    viewModel: 'createeditpharmacyviewmodel',
    title: 'Create/Edit Pharmacy',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    defaults: {
        anchor: '100%'
    },

    tbar: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'box',
                    html: '<i style="color:black;" class="fa fa-home fa-2x" aria-hidden="true"></i><span style="color:black;">PBM Created:</span>'
                },
                {
                    xtype: 'combobox',
                    itemId: 'cbxcreateeditusercreatedpharmacy',
                    emptyText: '[User Created Pharmacy]',
                    bind: {
                        store: '{storepbmcreated}'
                    },
                    width: 300,
                    tpl: Ext.create('Ext.XTemplate',
                        '</Html>'
                        + '<tpl for=".">'
                        + '<tpl if="xindex == 1">'
                        + '<table style="width: 500px;">'
                        + '<tr>'
                        + '<th style="font-weight: bold; padding: 3px;">NCPDP ID</th>'
                        + '<th style="font-weight: bold; padding: 3px;">NPI</th>'
                        + '<th style="font-weight: bold; padding: 3px;">Pharmacy Name</th>'
                        + '<th style="font-weight: bold; padding: 3px;">AddDate</th>'
                        + '</tr>'
                        + '</tpl>'
                        + '<tr class="x-boundlist-item">'
                        + '<td style="padding: 3px;">{NCPDPID}</td>'
                        + '<td style="padding: 3px;">{NPI}</td>'
                        + '<td style="padding: 3px;">{PharmacyName}</td>'
                        + '<td style="padding: 3px;">{AddDate}</td>'
                        + '</tr>'
                        + '<tpl if="xindex==0">'
                        + '</table>'
                        + '</tpl>'
                        + '</tpl>'
                        + '</Html>'),

                    listeners: {
                        select: 'onpbmcreatedChange'
                    },
                    pageSize: 10,
                    forceSelection: true,
                    queryMode: 'local',
                    name: 'cbxpbmcreated',
                    displayField: 'PharmacyName',
                    valueField: 'NCPDPID'
                }, {
                    xtype: 'box',
                    html: '<b>NCPDP:</b>'
                },
                {
                    xtype: 'providertypeahead',
                    itemId: 'cbxcreateeditpharmacyprovidertype',
                    displayField: 'Name',
                    valueField: 'ncpdpId',
                    width: 250,
                    emptyText: '[NCPDP Pharmacy]',
                    listeners: {
                        select: 'onpbmcreatedChange',
                        focusleave: 'onFocusLeave'
                    }
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'form',
            itemId: 'frmcreatededitpharmacy',
            flex: 1,
            layout: 'hbox',
            items: [
                {
                    xtype: 'panel',
                    itemId: 'pnlGeneralPrescriberInfo',
                    cls: 'card-panel',
                    title: 'General Prescriber Information',
                    flex: 1,
                    overflowY: true,
                    height: '100%',
                    defaults: {
                        labelWidth: 150
                    },
                    items: [
                        {
                            fieldLabel: 'NPI',
                            name: 'npi',
                            itemId: 'textnpi',
                            xtype: 'textfield',
                            reference: 'reftextnpi',
                            //regex: /\d{0,10}$/,
                            maskRe: /\d/,
                            regexText: "<b>Error</b></br>10-digit NPI is required.",
                            allowBlank: false,
                            maxLength: 10,
                            enforceMaxLength: 10,
                            minLength: 10

                        }, {
                            fieldLabel: 'NCPDP ID',
                            name: 'ncpdpid',
                            xtype: 'textfield', itemId: 'textncpdpid',
                            reference: 'reftextncpdpid',
                            allowBlank: false,
                            // regex: /\d{0,7}$/,
                            // regexText: "<b>Error</b></br>7-digit NCPDP ID is required.",
                            maskRe: /\d/,
                            maxLength: 7,
                            enforceMaxLength: 7,
                            minLength: 7

                        }, {
                            fieldLabel: 'Pharmacy Name',
                            name: 'name',
                            xtype: 'textfield',
                            reference: 'reftextpharmacyname',

                            itemId: 'textpharmacyname'

                        }, {
                            xtype: 'combobox',
                            fieldLabel: 'Pharmacy Type',
                            emptyText: '[Select a Pharmacy Type]',
                            name: '@PharmacyType',
                            itemId: 'cbxPharmacyType',
                            reference: 'refcbxPharmacyType',
                            displayField: 'name',
                            allowBlank: false,
                            valueField: 'value',
                            forceSelection: true,
                            bind: {
                                //  value: '{cdmodel.SupportStmtType}',
                                store: '{storeDispenserClass}'
                            }

                        }, {

                            xtype: 'combobox',
                            editable: true,
                            itemId: 'cbxServiceType',
                            displayField: 'name',
                            valueField: 'value',
                            reference: 'refcbxServiceType',
                            fieldLabel: 'Service Type',
                            emptyText: '[Select a Service Type]',
                            allowBlank: false,
                            queryMode: 'local',
                            bind: {
                                //value:'TypeCode{0}',
                                store: '{storeDispenserType}'
                            },
                            multiSelect: true,
                            forceSelection: true,
                            triggerAction: 'all',
                            listConfig: {
                                tpl: Ext.create('Ext.XTemplate',
                                    '<div style="margin-top:5px"><tpl for=".">',
                                    '<div class="boundList x-boundlist-item" style="display:table">',
                                    '<span style="display:table-cell; vertical-align: middle;"><div class="chkbox" value={value}></div>{name}</span>',
                                    '</div>',
                                    '</tpl></div>'
                                )
                            }
                        }, {
                            fieldLabel: 'Contact First Name',
                            name: 'contactFirstname',
                            xtype: 'textfield',
                            itemId: 'txtcontactfirstname'
                        }, {
                            fieldLabel: 'Contact Last Name',
                            name: 'contactLastname',
                            xtype: 'textfield',
                            itemId: 'txtcontactlastname'
                        }, {
                            fieldLabel: 'Contact Phone',
                            name: 'locPhone',
                            xtype: 'textfield',
                            itemId: 'txtcontactphone',
                            emptyText: '(xxx) xxx-xxx',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: function (e) {
                                    var val = e.rawValue;
                                    this.setValue(Atlas.common.Util.formatPhone(val));
                                }
                            }
                        }, {
                            fieldLabel: 'Contact Fax',
                            name: 'locFax',
                            xtype: 'textfield',
                            itemId: 'txtcontactfax',
                            emptyText: 'xxx-xxx-xxx',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: function (e) {
                                    var val = e.rawValue;
                                    this.setValue(Atlas.common.Util.formatfax(val));
                                }
                            }
                        }, {
                            fieldLabel: 'Contact Email',
                            name: 'locEmail',
                            xtype: 'textfield',
                            regex: /^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
                            regexText: "<b>Error</b></br>Invalid Email",
                            itemId: 'txtcontactemail'
                        }, {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [{
                                xtype: 'checkbox',
                                fieldLabel: 'FWA Pharmacy Lock ',
                                itemId: 'chkFWAPharmacylock',
                                name: 'PharmacyAdditionalInfoFWALockFlag',
                                listeners: {
                                    change: 'checkbox_change'
                                }
                            }, {
                                xtype: 'combobox',

                                itemId: 'cbxLineofBusiness',
                                displayField: 'lobName',
                                valueField: 'carrierLOBId',
                                fieldLabel: '',
                                disabled: true,
                                emptyText: '[Select LOB]',
                                queryMode: 'local',
                                bind: {
                                    //value:'TypeCode{0}',
                                    store: '{storeCarrierLOBs}'
                                },
                                multiSelect: true,
                                forceSelection: true,
                                triggerAction: 'all',
                                listConfig: {
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<div style="margin-top:5px"><tpl for=".">',
                                        '<div class="boundList x-boundlist-item" style="display:table">',
                                        '<span style="display:table-cell; vertical-align: middle;"><div class="chkbox" value={carrierLOBId}></div>{lobName}</span>',
                                        '</div>',
                                        '</tpl></div>'
                                    )
                                }
                            }]
                        }
                        , {
                            xtype: 'textareafield',
                            fieldLabel: 'Notes',
                            name: 'PharmacyAdditionalInfolockNote', itemId: 'txtnotes'
                        }]
                },
                {
                    xtype: 'panel',
                    cls: 'card-panel',
                    itemId: 'pnlLocationInfo',
                    title: 'Location Information',
                    overflowY: true,
                    height: '100%',
                    flex: 1,
                    defaults: {
                        labelWidth: 150
                    },

                    style: {
                        'box-shadow': '0 0 5px rgba(0, 0, 0, 0.2)'
                    },

                    items: [{
                        fieldLabel: 'Location Address',
                        name: 'locAddress1',
                        reference: 'reftxtlocaddress',
                        xtype: 'textfield',
                        allowBlank: false,
                        itemId: 'txtlocaddress'

                    }, {
                        fieldLabel: 'Location City',
                        name: 'locCity',
                        allowBlank: false,
                        reference: 'reftxtloccity',
                        xtype: 'textfield',
                        itemId: 'txtloccity'
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'State',
                        emptyText: '[Select a State]',
                        itemId: 'cbxLocationState',
                        reference: 'refcbxLocationState',
                        allowBlank: false,
                        name: 'locState',
                        displayField: 'value',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        bind: {
                            // value: 'locState',
                            store: '{storelocationstates}'
                        }
                    }, {
                        fieldLabel: 'ZIP',
                        name: 'locZip',
                        reference: 'reftxtlocZip',
                        allowBlank: false,
                        xtype: 'textfield',
                        itemId: 'txtlocZip',
                        // regex: /\d{0,10}$/,
                        maskRe: /\d/,
                        regexText: "<b>Error</b></br>Location Zip is required.",
                        maxLength: 5,
                        enforceMaxLength: 5,
                        minLength: 5
                    }, {
                        fieldLabel: 'Mailing Address',
                        name: 'mailAddress1',
                        xtype: 'textfield',
                        itemId: 'txtmailaddress'
                    }, {
                        fieldLabel: 'Mailing City',
                        name: 'mailCity',
                        xtype: 'textfield',
                        itemId: 'txtmailcity'
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'State',
                        name: 'mailState',
                        emptyText: '[Select a State]',
                        itemId: 'cbxMailingState',
                        displayField: 'value',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        bind: {
                            //   value: 'mailState',
                            store: '{storemailingstates}'
                        }
                    }, {
                        fieldLabel: 'Mailing Zip',
                        name: 'mailZip',
                        itemId: 'txtmailzip',
                        xtype: 'textfield',
                        maskRe: /\d/,
                        maxLength: 5,
                        enforceMaxLength: 5,
                        minLength: 5
                    }]
                }
            ]
        },
        {
            itemId: 'bbargroup',
            bbar: [
                {
                    xtype: 'displayfield',
                    value: 'Please fill in all required information',
                    itemId: 'displayFillIn',
                    fieldCls: 'm-red-color',
                    labelCls: 'm-red-color',
                    hidden: true
                },

                '->',
                {
                    xtype: 'button',
                    text: 'Create a Pharmacy',
                    iconCls: 'fa fa-plus-circle',
                    handler: 'btnCreateAPharmacyClick'
                },
                {
                    xtype: 'button',
                    text: 'Edit',
                    iconCls: 'fa fa-pencil-square-o',
                    handler: 'btnEditClick',
                    disabled: true
                },
                {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler: 'btnSaveClick', disabled: true},
                {xtype: 'button', text: 'Cancel', iconCls: 'fa fa-times', handler: 'btnCancelClick', disabled: true},
                {xtype: 'button', text: 'Delete', iconCls: 'fa fa-minus', handler: 'btnDeleteClick', disabled: true}

            ]
        },
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'box',
                    html: ''
                }
            ]
        },
        {
            xtype: 'grid',
            title: 'Relationships and Payment Centers',
            itemId: 'gpcreateeditpharmacy',
            flex: 1,
            tbar: [
                {
                    xtype: 'button',
                    itemId: 'btnAddRelationship',
                    text: 'Add Relationship',
                    iconCls: 'fa  fa-plus-circle',
                    disabled: true,
                    handler: 'btnAddRelationship'
                },
                {
                    xtype: 'button',
                    itemId: 'btnUpdateRelationship',
                    text: 'Update Relationship',
                    iconCls: 'fa  fa-save',
                    handler: 'btnUpdateRelationship', disabled: true
                },
                {
                    xtype: 'button',
                    itemId: 'btnDeleteRelationship',
                    text: 'Delete Relationship',
                    iconCls: 'fa  fa-remove',
                    handler: 'btnDeleteRelationship', disabled: true
                }
            ],
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'NCPDP', dataIndex: 'NcpdpId', hidden: true
                    },
                    {
                        text: 'RID', dataIndex: 'RelationShipId', hidden: true
                    },
                    {
                        text: 'Pharmacy Name', dataIndex: 'PharmacyName', hidden: true
                    },
                    {
                        text: 'RelationShip Name', dataIndex: 'RelationShipName', hidden: true
                    },


                    {
                        text: 'Pharmacy/Relationship', dataIndex: 'RelationShipId',
                        tpl: [
                            '<b>RelationshipId: </b><span>{RelationShipId} {RelationShipName}</span>'

                        ]
                    },
                    {
                        dataIndex: 'SystemID', hidden: true
                    },
                    {
                        text: 'PayCenter ID', dataIndex: 'PaycenterID'
                    },
                    {
                        text: 'PayCenter Name', dataIndex: 'paycenterName'
                    },
                    {
                        text: 'Remit and Reconciliation ID', dataIndex: 'remitAndReconId'
                    },
                    {
                        text: 'EffDate with Relationship', dataIndex: 'PharEffDate',
                        renderer: function (value, field) {
                            return Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                        }
                    }, {
                        text: 'TermDate with Relationship', dataIndex: 'PharTermdate',
                        renderer: function (value, field) {
                            if (value != null) {
                                return Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                            }
                        }
                    }
                ]
            },
            bind: '{storePharmacyRelationShipDetail}',
            listeners: {
                itemdblclick: 'gpcreateeditpharmacy_itemdblclick',
                itemclick: 'gpcreateeditpharmacy_itemclick'
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storePharmacyRelationShipDetail}',
                    displayInfo: true,
                    dock: 'bottom',
                    pageSize: 10
                }

            ]
        }
    ]
});