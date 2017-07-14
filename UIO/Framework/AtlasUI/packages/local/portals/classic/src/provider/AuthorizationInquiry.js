/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Inquiry
 * Description: Gives users a place to view authorizations
 */
Ext.define('Atlas.portals.view.provider.AuthorizationInquiry', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderAuthorizationInquiry',
    title: 'Authorization Inquiry',
    controller: 'portalsProviderAuthorizationInquiryController',
    scrollable: 'y',
    viewModel: {
        stores: {
            authInquiryStore: {
                model: 'Atlas.portals.provider.model.MemberOdcdMasterApi'
            },
            memberODCDStore: {
                model: 'Atlas.portals.provider.model.MemberOdcdMasterApi'
            },
            RequestDetailStore:{
                model:'Atlas.portals.provider.model.MemberOdcdServicesApi'
            },
            memberODCDServiceStore:{
                model:'Atlas.portals.provider.model.MemberOdcdServicesApi'
            }
        },
        data: {
            recipientId: '',
            minServiceDate: '',
            memberTermDate: '',
            memberDetails:{},
            lobId: '',
            benefitPlanCode:'',
            odagAuthExtension: false,
            odagAuthExtensionMinDate: '',
            selectedAuth: {},
            reviewTypeStore: {},
            measureStore: {}
        }
    },

    items: [{
        xtype: 'form',
        reference: 'authorizationForm',
        title: 'Search',
        cls: 'card-panel',
        layout: 'hbox',
        align: 'center',
        scrollable: 'x',
        bbar: {
            xtype: 'toolbar',
            items: [{
                    xtype:'button',
                    text:'Search',
                    handler:'onSearchButtonClick'
                },{
                    xtype:'button',
                    text:'Clear',
                    handler:'onClearButtonClick'
                },{
                    xtype:'button',
                    text:'Visit Count',
                    handler:'onVisitCountClick'
                },{
                    xtype:'button',
                    reference: 'newAuthButton',
                    text:'New',
                    handler:'onNewButtonClick',
                    disabled: true
                }
            ]
        },
        defaults: {
            xtype: 'container',
            margin: '0 30 0 0'
        },
        items: [{
            defaults: {
                xtype: 'textfield'
            },
            items: [{
                fieldLabel: 'Request ID',
                reference: 'requestIdRef'
            }, {
                xtype:'datefield',
                fieldLabel: 'Start Date',
                reference: 'startDateRef',
                itemId: 'startDateRef',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30),
                allowBlank: false
            }, {
                xtype:'datefield',
                fieldLabel: 'End Date',
                reference: 'endDateRef',
                itemId: 'endDateRef',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                value: new Date(),
                allowBlank: false
            }, {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Member ID',
                    reference: 'memberIdRef',
                    listeners: {
                        blur: 'onMemberIDBlur'
                    }
                }, {
                    xtype: 'button',
                    text: 'Enter',
                    handler: 'onEnterClick',
                    scale: 'small'
                }]
            }]
        }, {
            defaults: {
                xtype: 'textfield',
                labelWidth: 165
            },
            items: [{
                xtype:'combo',
                fieldLabel: 'Level of Service',
                reference: 'LOSComboRef',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local',
                listeners:{
                    select: 'onLevelOfServiceSelect'
                }
            }, {
                xtype:'combo',
                fieldLabel: 'Procedure Category',
                reference: 'PCComboRef',
                displayField: 'procedureCategory',
                valueField: 'procedureCategoryID',
                queryMode: 'local',
                disabled: true
            }, {
                xtype:'combo',
                fieldLabel: 'Status',
                reference: 'statusComboRef',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local'
            }, {
                xtype: 'container',
                layout: {
                    align: 'center',
                    type: 'hbox'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Member Name',
                    reference: 'memberNameRef',
                    labelWidth: 165
                }, {
                    xtype:'button',
                    text:'Lookup',
                    handler:'onMemberLookupClick'
                }]
            }]
        }, {
            defaults: {
                xtype: 'textfield',
                labelWidth: 150
            },
            items: [{
                xtype:'combo',
                fieldLabel: 'Referring Provider',
                reference: 'providerComboRef',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local'
            }, {
                xtype: 'container',
                layout: {
                    align: 'center',
                    type: 'hbox'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Servicing Provider',
                    reference: 'servicingProvRef',
                    labelWidth: 150
                }, {
                    xtype: 'button',
                    text: 'Lookup',
                    handler: 'onProviderLookupClick'
                }]
            }, {
                xtype: 'container',
                layout: {
                    align: 'center',
                    type: 'hbox'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Servicing Facility',
                    reference: 'servicingfacRef',
                    labelWidth: 150
                }, {
                    xtype: 'button',
                    text: 'Lookup',
                    handler: 'onFacilityLookupClick'
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'PCP',
                reference: 'pcpRef',
                readOnly: true
            }]
        }]
    }, {
        xtype: 'gridpanel',
        title: 'Inquiries',
        cls: 'card-panel',
        reference: 'authInquiryGridRef',
        layout: 'fit',
        minHeight: 400,
        scrollable: true,
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            emptyMsg: 'No data to display.'
        },
        bind: {
            store: '{authInquiryStore}'
        },
        listeners: {
            itemclick: 'onAuthGridClick'
        },
        columns: [{
            dataIndex: 'requestID',
            text: 'Request ID'
        }, {
            xtype: 'actioncolumn',
            tooltip: 'Print Auth',
            align: 'center',
            sortable: 'false',
            renderer: function (value, meta, record) {
                if ((record.get('requestStatus') === 'Approved') || (record.get('requestStatus') === 'Denied Overturned')) {
                    return;
                }

                meta.style = 'display: none';
            },
            items: [{
                xtype: 'button',
                tooltip: 'Print',
                iconCls: 'x-fa fa-print',
                handler: 'onPrintAuth'
            }]
        }, {
            dataIndex: 'memberID',
            text: 'Member ID',
            flex: 1
        }, {
            dataIndex: 'memberName',
            text: 'Member Name',
            flex: 1
        }, {
            dataIndex: 'startDate',
            text: 'Start Date',
            width: 85,
            renderer: function(value) {
                var date = '';

                if (!value) { return date; }
                date = new Date(value);
                date.setDate(date.getDate() + 1);
                return Ext.Date.format(date, 'm/d/Y');
            }
        }, {
            dataIndex: 'endDate',
            text: 'End Date',
            width: 85,
            renderer: function(value) {
                var date = '';

                if (!value) { return date; }
                date = new Date(value);
                date.setDate(date.getDate() + 1);
                return Ext.Date.format(date, 'm/d/Y');
            }
        }, {
            dataIndex: 'PlaceOfServiceDesc',
            text: 'Place of Service',
            width: 175
        }, {
            dataIndex: 'procedureCategoryDesc',
            text: 'Proc Category',
            width: 125
        }, {
            dataIndex: 'requestStatus',
            text: 'Status',
            flex: 1
        }, {
            width: 150,
            dataIndex: 'levelOfServiceDesc',
            text: 'Level of Service',
            flex: 1
        }, {
            hidden: true,
            dataIndex: 'ServicingProviderID',
            text: 'ServicingProviderID'
        }, {
            hidden: true,
            dataIndex: 'servicingFacilityName',
            text: 'Service Facility'
        }, {
            hidden: true,
            dataIndex: 'RequestingProviderID',
            text: 'RequestingProviderID'
        }, {
            hidden: true,
            dataIndex: 'benefitPlanCode',
            text: 'BenefitPlanCode'
        }, {
            hidden: true,
            dataIndex: 'dbRowID',
            text: 'DbRowID'
        }, {
            hidden: true,
            dataIndex: 'recipientID',
            text: 'RecipientID'
        }, {
            hidden: true,
            dataIndex: 'servicingProviderName',
            text: 'Servicing Provider'
        }]
    }, {
        xtype: 'gridpanel',
        title: 'Details',
        reference: 'requestDetailGridRef',
        cls: 'card-panel',
        height: 400,
        plugins: [{
            ptype: 'rowediting',
            errorSummary: false
        }],
        listeners: {
            edit: 'onExtensionEdit',
            beforeedit: 'onExtensionBeforeEdit',
            canceledit: 'onExtensionCancelEdit'
        },
        bind: {
            store: '{RequestDetailStore}'
        },
        columns: [{
            xtype: 'actioncolumn',
            align: 'center',
            sortable: false,
            menuDisabled: true,
            width: 50,
            items: [{
                xtype: 'button',
                handler: 'addExtension',
                iconCls: 'x-fa fa-plus-circle',
                tooltip: 'Add Extension'
            }],
            renderer: function(value, metadata, record) {
                if ((record.data.serviceStatus === "Approved") || (record.data.serviceStatus === "Denied Overturned")) {
                    var lastServiceLineNum = 0;
                    var authServiceStore = this.up().up().getStore();
                    if (authServiceStore.getCount() > 0) {
                        maxId = authServiceStore.getAt(0).get('serviceLineNumber');
                        authServiceStore.each(function(rec) {
                            lastServiceLineNum = Math.max(maxId, rec.get('serviceLineNumber'));
                        });
                    }
                    if (record.data.serviceLineNumber !== lastServiceLineNum) {
                        metadata.style = "display:none;";
                    }
                } else {
                    metadata.style = "display:none;";
                }
            }
        }, {
            dataIndex: 'serviceLineNumber',
            text: '#',
            tooltip: 'Service ID',
            width: 50
        }, {
            dataIndex: 'serviceCode',
            text: 'Proc Code',
            width: 100
        }, {
            dataIndex: 'serviceDescription',
            text: 'Description',
            width: 200,
            sortable: false
        }, {
            dataIndex: 'startDate',
            text: 'Start Date',
            width: 120,
            renderer: function(value) {
                var date = '';

                if (!value) { return date; }
                date = new Date(value);
                date.setDate(date.getDate() + 1);
                return Ext.Date.format(date, 'm/d/Y');
            },
            editor: {
                xtype: 'datefield',
                itemId: 'startDate_Extension',
                allowBlank: false,
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy'
            }
        }, {
            dataIndex: 'endDate',
            text: 'End Date',
            width: 120,
            renderer: function(value) {
                var date = '';

                if (!value) { return date; }
                date = new Date(value);
                date.setDate(date.getDate() + 1);
                return Ext.Date.format(date, 'm/d/Y');
            },
            editor: {
                xtype: 'datefield',
                itemId: 'endDate_Extension',
                allowBlank: false,
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy'
            }
        }, {
            dataIndex: 'serviceReqUnits',
            text: 'Requested',
            width: 120,
            sortable: false,
            renderer: function(val, meta, record) {
                if (val) return val;
                else return '0.00';
            },
            editor: {
                xtype: 'numberfield',
                itemId: 'requested_Extension',
                minValue: 0
            }
        }, {
            dataIndex: 'serviceApprovedUnits',
            text: 'Approved',
            width: 120,
            renderer: function(val, meta, record) {
                if (val) return val;
                else return '0.00';
            }
        }, {
            dataIndex: 'measureDesc',
            text: 'Measure',
            width: 130,
            sortable: false,
            editor: {
                xtype: 'combobox',
                itemId: 'serviceMeasure_Extension',
                allowBlank: false,
                queryMode: 'local',
                displayField: 'listDescription',
                valueField: 'listItem',
                bind: {
                    store: '{measureStore}'
                }
            }
        }, {
            dataIndex: 'serviceStatus',
            text: 'Status',
            width: 80
        }, {
            dataIndex: 'reviewTypeDesc',
            text: 'Review Type',
            width: 120,
            editor: {
                xtype: 'combobox',
                itemId: 'reviewType_Extension',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                selectOnFocus: false,
                displayField: 'listDescription',
                valueField: 'listItem',
                bind: {
                    store: '{reviewTypeStore}'
                }
            }
        }, {
            xtype: 'actioncolumn',
            align: 'center',
            hidden: false,
            width: 50,
            sortable: false,
            menuDisabled: true,
            items: [{
                xtype: 'button',
                handler: 'attachAction',
                iconCls: 'x-fa fa-paperclip',
                tooltip: 'Attach'
            }]
        }, {
            xtype: 'actioncolumn',
            align: 'center',
            hidden: false,
            width: 50,
            items: [{
                xtype: 'button',
                handler: 'notesAction',
                iconCls: 'x-fa fa-sticky-note',
                tooltip: 'Notes'
            }]
        }]
    }]
});