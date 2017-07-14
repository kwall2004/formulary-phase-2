/**
 * Created by mkorivi on 11/10/2016.
 */

Ext.define('Atlas.casemanagement.view.COCMemberInfo', {
    extend: 'Ext.tab.Panel',
    xtype: 'COCMemberInfo',
    region: 'center',
    layout: 'border',
    tabPosition: 'left',
    tabRotation: 0,
    controller: 'cocMemberInfoController',

    tabBar: {
        orientation: 'vertical',
        // turn off borders for classic theme.  neptune and crisp don't need this
        // because they are borderless by default
        border: false,
        margin: '20 5 20 5'
    },
    defaults: {
        textAlign: 'left'
    },
    items: [
        {
            title: 'Authorizations',
             flex:1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                xtype: 'panel',
                region: 'center',
                    title: 'Member Authorizations',
                    flex:.3,
                    scrollable: true,
                items: [
                    {
                        xtype: 'grid',
                        frame: true,
                        itemId: 'grdAuthorizations',
                        bind: {
                            store: '{StoreMemberAuth}'
                        },
                        reference: 'authorizationsGrid',
                        listeners: {
                            select: 'authorizationsDetailSelect'
                        },
                        columns: [
                            {text: 'Auth ID', dataIndex: 'AuthID', flex: 1, hidden: true},
                            {text: 'From', dataIndex: 'AuthFromDate', renderer: function(value, field){
                                return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                            }, xtype: 'datecolumn', flex: 1},
                            {text: 'To', dataIndex: 'AuthToDate', renderer: function(value, field){
                                return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                            }, xtype: 'datecolumn', flex: 1},
                            {text: 'St', dataIndex: 'authStatus', flex: 1},
                            {text: 'Code', dataIndex: 'AuthCode', flex: 1},
                            {text: 'Description', dataIndex: 'AuthCodeDesc', flex: 1},
                            {text: 'ProvId', dataIndex: 'ServiceProvider', flex: 1, hidden: true},
                            {text: 'Practioner', dataIndex: 'ServiceProviderName', flex: 1},
                            {text: 'FaclId', dataIndex: 'ServiceFacility', flex: 1, hidden: true},
                            {text: 'Facility', dataIndex: 'ServiceFacilityName', flex: 1},
                            {text: 'Lob', dataIndex: 'LobID', flex: 1}

                        ]
                    }]},
                    {
                        xtype: 'panel',
                        title: 'Authorization Detail',
                        flex:.7,
                        autoScroll: true,
                        overflowY: 'scroll',
                        overflowX: 'scroll',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        bind: {
                            disabled: '{!authorizationsGrid.selection}'
                        },
                        items: [
                            {
                                title: 'Auth Info',
                                xtype: 'fieldset',
                                autoScroll:true,
                                layout: 'column',
                                items: [
                                    {
                                        columnWidth: .4,
                                        height: 150,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Req/Auth ID',
                                                bind: '{authorizationsGrid.selection.AuthCode}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'From Date',
                                                renderer: Ext.util.Format.dateRenderer('n/j/Y'),
                                                bind: '{authorizationsGrid.selection.AuthFromDate}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Status',
                                                bind: '{authorizationsGrid.selection.authStatusDesc}'
                                            },
                                            {
                                                fieldLabel: 'LOB',
                                                xtype: 'displayfield',
                                                bind: '{authorizationsGrid.selection.LobID}'
                                            }
                                        ]
                                    },
                                    {
                                        columnWidth: .3,
                                        height: 150,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Type Id',
                                                bind: '{authorizationsGrid.selection.AuthID}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'To Date',
                                                renderer: Ext.util.Format.dateRenderer('n/j/Y'),
                                                bind: '{authorizationsGrid.selection.AuthToDate}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Approved',
                                                bind: '{authorizationsGrid.selection.NumVisits}' // TODO: need to display the number of visits based authStatus, if O || C then Display NumVisits else 0
                                            },
                                            {
                                                xtype: 'displayfield'
                                            }

                                        ]

                                    },
                                    {
                                        columnWidth: .3,
                                        height: 150,

                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Description',
                                                bind: '{authorizationsGrid.selection.AuthCodeDesc}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Place Of Service',
                                                bind: '{authorizationsGrid.selection.placeOFServiceDesc}'
                                            }, {
                                                xtype: 'displayfield',
                                                fieldLabel: 'DRG',
                                                bind: '{authorizationsGrid.selection.DRGCode}' + '{authorizationsGrid.selection.DRGDesc}'
                                            }, {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Discharge Status',
                                                bind: '{authorizationsGrid.selection.dischargeStatusDesc}'
                                            }

                                        ]

                                    }
                                ]
                            },
                            {
                                title: 'Service Info',
                                xtype: 'fieldset',
                                autoScroll:true,
                                layout: 'column',
                                items: [
                                    {
                                        columnWidth: .2,
                                        height: 100,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'PCP ID',
                                                bind: '{authorizationsGrid.selection.PCPNum}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Practitioner',
                                                bind: '{authorizationsGrid.selection.ServiceProvider}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Facility',
                                                bind: '{authorizationsGrid.selection.ServiceFacility}'
                                            }


                                        ]
                                    },
                                    {
                                        columnWidth: .4,
                                        height: 100,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Name',
                                                bind: '{authorizationsGrid.selection.PCPName}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Name',
                                                bind: '{authorizationsGrid.selection.ServiceProviderName}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Name',
                                                bind: '{authorizationsGrid.selection.ServiceFacilityName}'
                                            }


                                        ]

                                    },
                                    {
                                        columnWidth: .2,
                                        height: 100,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Phone',
                                                bind: '{authorizationsGrid.selection.PCPPhone}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Phone',
                                                bind: '{authorizationsGrid.selection.ServiceProviderPhone}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Phone',
                                                bind: '{authorizationsGrid.selection.ServiceFacilityPhone}'
                                            }


                                        ]

                                    },
                                    {
                                        columnWidth: .2,
                                        height: 100,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fax',
                                                bind: '{authorizationsGrid.selection.PCPFax}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fax',
                                                bind: '{authorizationsGrid.selection.ServiceProviderFax}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fax',
                                                bind: '{authorizationsGrid.selection.ServiceFacilityFax}'
                                            }


                                        ]
                                    }
                                ]
                            },
                            {
                                title: 'Diagnosis Info',
                                xtype: 'fieldset',
                                autoScroll:true,
                                layout: 'column',
                                items: [
                                    {
                                        columnWidth: .3,
                                        height: 100,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Primary',
                                                bind: '{authorizationsGrid.selection.DiagCode1}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Secondary',
                                                bind: '{authorizationsGrid.selection.DiagCode2}'
                                            }
                                        ]
                                    },
                                    {
                                        columnWidth: .3,
                                        height: 100,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Desc',
                                                bind: '{authorizationsGrid.selection.DiagDesc1}'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Desc',
                                                bind: '{authorizationsGrid.selection.DiagDesc2}'
                                            }

                                        ]

                                    },
                                    {
                                        columnWidth: .4,
                                        height: 100,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Medical Reason',
                                                bind: '{authorizationsGrid.selection.medicalReason}'
                                            },
                                            {
                                                xtype: 'displayfield'
                                            }

                                        ]

                                    }
                                ]
                            }
                        ]

                    }
            ],
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [


                        {
                            xtype: 'button',

                            text: 'Auth Notes',
                            itemId: 'btnAuthNotes',
                            // disabled: true,
                            handler: 'btnAuthNotesClick'
                        },
                        {
                            xtype: 'button',

                            text: 'Attachments',
                            itemId: 'btnAttachments',
                            //disabled: true
                            handler: 'btnAttachmentsClick'
                        }
                        ,
                        {
                            xtype: 'button',

                            text: 'Procedures',
                            itemId: 'btnProcedures',
                            handler: 'btnProceduresClick'
                        }
                    ]
                }
            ]
        }
        ,
        {title: 'Eligibility/ PCP History', height : '100%',
            layout: {
                type: 'vbox',
                align: 'stretch'
            }, items: [{xtype: 'eligibilityhistory'}]},
        {
            title: 'Institutional Claims',
            height : '100%',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'institutionalclaims'
                }
            ]
        },
        {title: 'Professional Claims',
            height : '100%',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },items: [{xtype: 'professionalclaims'}]},
        {
            title: 'HEDIS Summary',
            height : '100%',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'hedissummary'
                }
            ]
        },
        {title: 'Medicare HRA PDF', items: [{xtype: 'medicarehrapdf'}]}
    ]
});