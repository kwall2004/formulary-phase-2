
Ext.define('Atlas.admin.view.EDIPartnerInfo', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-edipartnerinfo',
    title: 'EDI Partner Info',
    controller: 'edipartnerinfocontroller',
    viewModel: 'edipartnerinfoviewmodel',
    reference: 'admin-edipartnerinfo',
    layout: 'border',
    items:[
        {
            region: 'center',
            layout: 'border',
            //flex: 1,
            items:[
                {
                    xtype : 'panel',
                    region: 'center',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items : [
                        {
                            xtype: 'grid',
                            flex: 3.5,
                            multiSelect: false,
                            itemId:'gdeditpartnerinto',
                            title:'EDI Partner Info',
                            height:300,
                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        text: 'Partner ID',
                                        dataIndex: 'partnerId'
                                    },
                                    {
                                        text: 'Partner Name',
                                        dataIndex: 'partnerName'
                                    },
                                    {
                                        text: 'EDI Path',
                                        dataIndex: 'ediPath'
                                    },
                                    {
                                        text: 'IP Address',
                                        dataIndex: 'ipAddress'
                                    },
                                    {
                                        text: 'EIN',
                                        dataIndex: 'ein'
                                    }
                                ]
                            },
                            bind: {
                                store: '{edipartnerinfo}'
                            },
                            listeners: {
                                itemclick: 'gdeditpartnerinto_itemclick'
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId:'gdeditpartnerinto_add',
                                            text: 'Create New Partner',
                                            iconCls: 'x-fa fa-plus-circle',
                                            listeners: {
                                                click: 'gdeditpartnerinto_add'
                                            }
                                        }, {
                                            xtype: 'button',
                                            disabled:true,
                                            text: 'Update',
                                            itemId:'gdeditpartnerinto_edit',
                                            iconCls: 'x-fa fa-edit',
                                            listeners: {
                                                click: 'gdeditpartnerinto_edit'
                                            }
                                        }
                                    ]
                                }
                                /*
                                 , {
                                 xtype: 'pagingtoolbar',
                                 dock: 'bottom',
                                 displayInfo: 'true',
                                 bind: {
                                 store: '{edipartnerinfo}'
                                 }
                                 }
                                 */
                            ]
                        },
                        {
                            xtype : 'panel',
                            flex : 2.5,
                            autoScroll : true,
                            overFlowX : 'scroll',
                            overFlowY : 'scroll',
                            items : [
                                {
                                    xtype: 'fieldset',
                                    title: 'EDI Options',
                                    minWidth : 650,
                                    items:[
                                        {
                                            xtype:'form',
                                            itemId:'editoptionsform',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items:[
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    defaults:{
                                                        disabled:true
                                                    },
                                                    items:[
                                                        {xtype: 'combobox', fieldLabel: 'ISA Qualifier', name:'ISAQualifier',
                                                            bind: {
                                                                store: '{edipartnerinfoqualifiers}'
                                                            },
                                                            queryMode: 'local'

                                                        },
                                                        {xtype: 'combobox', fieldLabel: 'Plan Qualifier',name:'planQualifier',
                                                            bind: {
                                                                store: '{edipartnerinfoqualifiers}'
                                                            },
                                                            queryMode: 'local'

                                                        },
                                                        {xtype: 'textfield', fieldLabel: 'MRx ID', name:'planSubmitterId'},
                                                        {xtype: 'checkbox', fieldLabel: 'Zip Files', name:'Zip'},
                                                        {xtype: 'checkbox', fieldLabel: 'Send Individual Files', name:'sendIndividualFile'},
                                                        {xtype: 'checkbox', fieldLabel: 'Send Secure Email', name:'sendSecureEmail'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    defaults:{
                                                        disabled:true
                                                    },
                                                    items:[
                                                        {xtype: 'textfield', fieldLabel: 'Input Dir', name:'inputDir'},
                                                        {xtype: 'textfield', fieldLabel: 'Export Dir', name:'exportDir'},
                                                        {xtype: 'textfield', fieldLabel: 'PGP Key', name:'pgpkeyname'},
                                                        {xtype: 'textfield', fieldLabel: 'Command', name:'sendcmd'},
                                                        {xtype: 'checkbox', fieldLabel: 'Send Download Confirmations', name:'sendDownloadConf'}
                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]
                        },

                        {
                            xtype: 'grid',
                            itemId:'gdcontactinfo',
                            flex: 4,
                            title:'Contact Info',
                            multiSelect: false,
                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        text: 'Last Name',
                                        dataIndex: 'LastName'
                                    },
                                    {
                                        text: 'First Name',
                                        dataIndex: 'FirstName'
                                    },
                                    {
                                        text: 'Phone',
                                        dataIndex: 'Phone'
                                    },
                                    {
                                        text: 'Email',
                                        dataIndex: 'Email'
                                    }
                                ]
                            },
                            bind: {
                                store: '{edipartnercontactinfo}'
                            },
                            listeners: {
                                itemclick: 'gdcontactinfo_itemclick'
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Add',
                                            disabled:true,
                                            itemId:"gdcontactinfo_add",
                                            iconCls: 'x-fa fa-plus-circle',
                                            listeners: {
                                                click: 'gdcontactinfo_add'
                                            }
                                        }, {
                                            xtype: 'button',
                                            text: 'Update',
                                            disabled:true,
                                            itemId:"gdcontactinfo_edit",
                                            iconCls: 'x-fa fa-edit',
                                            listeners: {
                                                click: 'gdcontactinfo_edit'
                                            },
                                            bind: {
                                                disabled: '{!admin-edipartnerinfo.selection}'
                                            }
                                        }, {
                                            xtype: 'button',
                                            text: 'Delete',
                                            disabled:true,
                                            itemId:"gdcontactinfo_remove",
                                            iconCls: 'x-fa fa-minus-circle',
                                            listeners: {
                                                click: 'gdcontactinfo_remove'
                                            },
                                            bind: {
                                                disabled: '{!admin-edipartnerinfo.selection}'
                                            }
                                        }
                                    ]
                                }
                                /*, {
                                 xtype: 'pagingtoolbar',
                                 dock: 'bottom',
                                 displayInfo: 'true',
                                 bind: {
                                 store: '{edipartnerinfo}'
                                 }
                                 }*/
                            ]
                        }
                    ]
                }

            ]
        },
        {
            region: 'east',
            itemId:'gdeditpartnerrelationship',
            flex: 1,
            xtype: 'grid',
            multiSelect: false,
            title:'EDI Partner Relationship',
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'NCPDP ID',
                        dataIndex: 'NCPDPID'
                    },
                    {
                        text: 'Pharmacy Name',
                        dataIndex: 'PharmacyName'
                    },
                    {
                        text: 'Relationship ID',
                        dataIndex: 'RelationshipID'
                    },
                    {
                        text: 'Relationship Name',
                        dataIndex: 'RelationshipName'
                    },
                    {
                        text: 'Payment Center ID',
                        dataIndex: 'PaymentCenterId'
                    },
                    {
                        text: 'Effective Date',
                        dataIndex: 'EffectiveDate', renderer : Ext.util.Format.dateRenderer('m/d/Y')
                    },
                    {
                        text: 'Terminated Date',
                        dataIndex: 'TermDate', renderer : Ext.util.Format.dateRenderer('m/d/Y')
                    }

                ]
            },
            bind: {
                store: '{ediPartnerRelationMasterExt}'
            },
            listeners: {
                itemclick: 'gdeditpartnerrelationship_itemclick'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            disabled:true,
                            itemId:'gdeditpartnerrelationship_add',
                            iconCls: 'x-fa fa-plus-circle',
                            listeners: {
                                click: 'gdeditpartnerrelationship_add'
                            }
                        }, {
                            xtype: 'button',
                            text: 'Update',
                            itemId:'gdeditpartnerrelationship_edit',
                            disabled:true,
                            iconCls: 'x-fa fa-edit',
                            listeners: {
                                click: 'gdeditpartnerrelationship_edit'
                            },
                            bind: {
                                disabled: '{!admin-edipartnerinfo.selection}'
                            }
                        }, {
                            xtype: 'button',
                            text: 'Delete',
                            itemId:'gdeditpartnerrelationship_remove',
                            disabled:true,
                            iconCls: 'x-fa fa-minus-circle',
                            listeners: {
                                click: 'gdeditpartnerrelationship_remove'
                            },
                            bind: {
                                disabled: '{!admin-edipartnerinfo.selection}'
                            }
                        }
                    ]
                }
                /*, {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: 'true',
                    bind: {
                        store: '{edipartnerinfo}'
                    }
                }*/
            ]
        }
    ]






});
