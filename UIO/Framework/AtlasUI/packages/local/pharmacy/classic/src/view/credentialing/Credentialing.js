/**
 * This class is the Main View of the Pharmacy Credentialing Module
 * This is the main page
 * @author : Leo
 */

Ext.define('Atlas.pharmacy.view.credentialing.Credentialing', {
    extend: 'Ext.panel.Panel',
    controller: 'pharmacy-credentialing',
    viewModel: 'pharmacy-credentialing',
    reference: 'credentiallingMainRef',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            reference: 'credentiallingMainTbRef',
            dock: 'top',
            items: [
                {
                    xtype: 'box',
                    html: ' Search by'
                },
                {
                    xtype: 'segmentedbutton',
                    itemId: 'searchtype',
                    items: [
                        {
                            text: 'Relationship',
                            searchType: 'RID',
                            tooltip: 'Search Relationship Contract',
                            pressed: true
                        },
                        {
                            text: 'Pharmacy',
                            searchType: 'NCPDPID',
                            tooltip: 'Search Pharmacy Contract'
                        }
                    ],
                    listeners: {
                        toggle: 'onToggleSearch'
                    }
                },
                {
                    xtype: 'relationshiptypeahead',
                    reference: 'relationSrchboxRef',
                    itemId: 'cbxRel',
                    displayField: 'Relationshipname',
                    valueField: 'relationshipID',
                    forceSelection: true,
                    width: 250,
                    emptyText: '[e.g. CVS MI]',
                    listeners: {
                        select: 'onSelectRelation'
                    }
                },
                {
                    xtype: 'providertypeahead',
                    reference: 'pharmaSrchboxRef',
                    itemId: 'cbxPhar',
                    displayField: 'Pharname',
                    hidden: true,
                    valueField: 'ncpdpId',
                    forceSelection: true,
                    width: 250,
                    emptyText: '[e.g. Target Pharmacy MI 48188]',
                    listeners: {
                        select: 'onSelectRelation'
                    }
                },
                {
                    text: 'View Pharmacy',
                    tooltip: 'Go To Pharmacy Details',
                    bind: {
                        disabled: '{!(hasNCPDPID && isPharma)}'
                    },
                    handler: 'onPharmacyClick'
                },
                {
                    text: 'Relationships',
                    bind: {
                        disabled: '{!(hasNCPDPID && isPharma)}'
                    },
                    handler: 'onRelationshipsClick'
                },
                '->',
                {
                    text: 'Add Credential Year',
                    bind: {disabled: '{!(canAddCredentialYear)}'},
                    handler: 'doAddCredDetailGenInfo'
                },
                {
                    text: 'Delete',
                    bind: {disabled: '{!(hasNCPDPID || hasRID)}'},
                    handler: 'doRemoveCredDetailGenInfo'

                }
            ]
        },
        {
            xtype: 'panel',
            dock: 'top',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            height: 320,
            items: [
                {
                    xtype: 'form',
                    title: 'Contract Entity Information',
                    itemId: 'pnlDescription',
                    scrollable: true,
                    reference: 'mainInfoFormRef',
                    flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            reference: 'relationRef',
                            layout: {
                                type: 'vbox',
                                align: 'left'
                            },
                            margin: ' 20 0 20',
                            defaults: {
                                xtype: 'displayfield',
                                width: 500,
                                labelWidth: 150
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    bind: {
                                        fieldLabel: '{relationshipLbl}'
                                    },
                                    name: 'RSrelationshipID'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Type',
                                    name: 'RSRelationTypeInfo'
                                }, {

                                    fieldLabel: 'Location',
                                    name: 'locationAddr',
                                    width: 1200,
                                    value: 'Address<br>City, State'
                                }, {

                                    fieldLabel: 'Mailing',
                                    name: 'mailingAddr',
                                    width: 1200,
                                    value: 'Address<br>City, State'
                                }, {

                                    fieldLabel: 'Contact',
                                    name: 'contactNameTitle',
                                    value: 'Contact'
                                }, {

                                    fieldLabel: 'Phone',
                                    name: 'RSphone',
                                    value: 'Phone Number'
                                }, {
                                    itemId: 'displayFax',
                                    fieldLabel: 'Fax',
                                    name: 'RSfaxNum',
                                    value: 'Fax Number'
                                }, {

                                    fieldLabel: 'Email',
                                    name: 'PMemail',
                                    value: 'Email'
                                }, {

                                    fieldLabel: 'Legal Business Name',
                                    name: 'PCpayCenterName'
                                }, {

                                    fieldLabel: 'Store Closure',
                                    // name: 'storeClosure'
                                    name: 'locCloseDate',
                                    renderer:function(value){
                                        if(value) {
                                            return '<span style="color: red;">' + value + '</span>';
                                        }
                                        return '';
                                    }
                                    
                                }, {

                                    fieldLabel: 'Contract Status',
                                    name: 'contractStatus',
                                    itemId: 'txtContractStatus'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Pharmacy Credentialing Log',
                    flex: 1,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    margin: '20',
                                    itemId: 'pharmaCredLogGrid',
                                    reference: 'pharmaCredLogGridRef',
                                    bind: {
                                        store: '{pharmacredlogmaster}'
                                    },
                                    columns: [
                                        {text: 'Credentialing Level', flex: 1, dataIndex: 'CredLevelDisp'},
                                        {text: 'Credentialing Type', flex: 1, dataIndex: 'CredDescr'},
                                        {
                                            text: 'Credentialing Start Date',
                                            flex: 1,
                                            dataIndex: 'CredCreateDate',
                                            formatter: 'date("m/d/Y")'
                                        },
                                        {
                                            text: 'Credentialing Complete Date',
                                            flex: 1,
                                            dataIndex: 'CredCompleteDate',
                                            formatter: 'date("m/d/Y")'
                                        },
                                        {text: 'Credentialing Result', flex: 1, dataIndex: 'CredResultDescr'},
                                        {text: 'Created By', flex: 1, dataIndex: 'CreatedBy'}
                                    ],
                                    selModel: {
                                        selType: 'checkboxmodel',
                                        mode: 'SINGLE',
                                        listeners: {
                                            beforeselect: 'onCredLogItemClick'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'tabpanel',
            reference: 'credHomeTabPnlRef',
            items: [
                {
                    xtype: 'pharmacy-credentialingdetail',
                    title: 'Credentialing Detail'
                },
                {
                    xtype: 'pharmacy-checklist',
                    title: 'Checklist'
                },
                {
                    xtype: 'pharmacy-pharmacyinfo',
                    itemId: 'pharmacyInformation',
                    title: 'Pharmacy Information'
                },
                {
                    xtype: 'pharmacy-communication',
                    title: 'Communication'
                },
                {
                    xtype: 'pharmacy-attachments',
                    itemId: 'pharmacyAttachments',
                    title: 'Fax/Attachments'
                },
                {
                    xtype: 'pharmacy-training',
                    title: 'Training'
                }
            ],
            listeners: {
                'tabchange': 'credHomeTabPnlRef_tabchange'
            }
        }
    ]
});