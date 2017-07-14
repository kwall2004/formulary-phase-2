/**
 * Created by m4542 on 10/5/2016.
 */
Ext.define('Atlas.portals.view.prescriber.MemberInformation', {
    extend: 'Ext.panel.Panel',
    title: 'Member Information',
    viewModel: 'myMembersViewModel',
    controller: 'memberInformationController',
    reference: 'memberinforeference',
    xtype: 'portals-prescriber-MemberInformation',
    requires: [
        'Ext.grid.feature.Grouping'
    ],
    items: [{
        xtype: 'panel',
        cls: 'card-panel',
        title: 'Selection',
        iconCls: 'fa fa-search',
        layout: 'hbox',

        items: [{
                xtype: 'portalmembertypeahead',
                fieldLabel: 'Search Member',
                name: 'member',
                reference: 'member',
                hideLabel: false,
                width: 350,
                listeners: {
                    select: 'onMemberSelected'
                }
            },
            {
                xtype: 'form',
                cls: 'formPanel',
                layout: 'hbox',
                reference: 'memberinfotoolbar',
                items: [{
                    xtype: 'displayfield',
                    labelWidth: 90,
                    fieldLabel: 'Member Name:',
                    name: 'fullname'
                },
                {
                    xtype: 'displayfield',
                    labelWidth: 30,
                    fieldLabel: 'DOB:',
                    name: 'birthdate'
                },
                {
                    xtype: 'displayfield',
                    labelWidth: 90,
                    fieldLabel: 'Enrollment Status:',
                    reference: 'dpyenrollmentStatus',
                    name: 'enrollmentStatus'
                }]
            }]
        },
        {
            xtype: 'form',
            cls: 'formPanel',
            reference: 'mymembersinformationform',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            items: [{
               xtype: 'form',
                cls: 'formPanel',
                title: '',
                items: [{
                    xtype: 'panel',
                    cls: 'card-panel',
                    title: 'Member General Information',
                    defaults: {
                        xtype: 'displayfield',
                        labelWidth: 160
                    },
                    items: [{
                        fieldLabel: 'First Name:',
                        name: 'firstname'
                    },{
                        fieldLabel: 'Middle Name:',
                        name: 'middlename'
                    },{
                        fieldLabel: 'Last Name:',
                        name: 'lastname'
                    },{
                        fieldLabel: 'Suffix:',
                        name: 'suffix'
                    },{
                        fieldLabel: 'Gender:',
                        name: 'gender'
                    },{
                        fieldLabel: 'Birth Date:',
                        name: 'birthdate'
                    },{
                        fieldLabel: 'Age:',
                        name: 'age'
                    },{
                        fieldLabel: 'SSN:',
                        name: 'socSecMasked'
                    },{
                        fieldLabel: 'Language:',
                        name: 'languageDescription'
                    },{
                        fieldLabel: 'Ethnicity/Race:',
                        name: 'race'
                    },{
                        fieldLabel: 'Deceased Date:',
                        name: 'deathDate'
                    },{
                        fieldLabel: 'Primary Care Physician:',
                        name: 'coCMember'
                    }]
                },
                {
                    xtype: 'panel',
                    cls: 'card-panel',
                    title: 'Plan Group Information',
                    defaults: {
                        xtype: 'displayfield'
                    },
                    items: [{
                        fieldLabel: 'Carrier:',
                        name: 'carrierName'
                    },{
                        fieldLabel: 'Account:',
                        name: 'accountName'
                    },{
                        fieldLabel: 'Plan Group:',
                        name: 'plangroupName'
                    }]
                }]
            },
            {
                xtype: 'form',
                cls: 'formPanel',
                title: '',
                items: [{
                    xtype: 'panel',
                    cls: 'card-panel',
                    title: 'Member Contact Information',
                    defaults: {
                        xtype: 'displayfield'
                    },
                    items: [{
                        fieldLabel: 'Address:',
                        name: 'homeAddress1'
                    },{
                        fieldLabel: 'County:',
                        name: 'countyDescription'
                    },{
                        fieldLabel: 'Home Phone:',
                        name: 'homephoneContactInfo'
                    },{
                        fieldLabel: 'Work Phone:',
                        name: 'workphoneContactInfo'
                    },{
                        fieldLabel: 'Cell Phone:',
                        name: 'cellContactInfo'
                    },{
                        fieldLabel: 'Email:',
                        name: 'emailContactInfo'
                    }]
                },
                {
                    xtype: 'panel',
                    cls: 'card-panel',
                    title: 'Guardian/Responsible Party Information',
                    defaults: {
                        xtype: 'displayfield'
                    },
                    items: [{
                        fieldLabel: 'Name:',
                        name: 'respFirstName'
                    },{
                        fieldLabel: 'Address:',
                        name: 'respaddress1'
                    },{
                        fieldLabel: 'Home Phone:',
                        name: 'respHomePhoneContactInfo'
                    },{
                        fieldLabel: 'Work Phone:',
                        name: 'respWorkPhoneContactInfo'
                    }]
                }]
            },
            {
                xtype: 'container',
                align: 'stretch',
                title: '',
                defaults: {
                    height: 250,
                    maxHeight: '300'
                },
                items: [
                    {
                        xtype: 'gridpanel',
                        cls: 'card-panel',
                        reference: 'priorauth',
                        title: 'Prior Authorizations',
                        bind: {
                            store: '{priorauthstore}'
                        },
                        height: 280,
                        tbar: {
                            xtype: 'toolbar',

                            items: [
                                {
                                    xtype: 'combo',

                                    reference: 'authStatus',

                                    fieldLabel: 'Auth Status',

                                    emptyText: 'Select a status',

                                    displayField: 'ListDescription',

                                    queryMode: 'local',

                                    valueField: 'ListDescription',

                                    bind: {
                                        store: '{priorAuthList}'
                                    },

                                    listeners: {
                                        select: 'refreshPriorAuth'
                                    }
                                }
                            ]
                        },
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            bind: {
                                store: '{priorauthstore}'
                            },
                            emptyMsg: 'No prior authorizations to display.'
                        },
                        columns: [
                            {text: 'Auth ID', dataIndex: 'AuthID', flex: 1},
                            {text: 'Medication', dataIndex: 'medication', flex: 1},
                            {text: 'Status', dataIndex: 'authStatus', flex: 1},
                            {
                                text: 'Created On',
                                dataIndex: 'createDate',
                                flex: 1,
                                renderer: function (value, meta, record) {
                                    if(value) {
                                        var timeString = value.split('T');
                                        return timeString[0];

                                    }
                                }
                                , formatter: 'date("m/d/Y")'

                            },
                            {text: 'Plan', dataIndex: 'PlanGroupName', flex: 1}
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        cls: 'card-panel',
                        reference: 'claims',
                        title: 'Claims',
                        bind: {
                            store: '{claimsstore}'
                        },
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            emptyMsg: 'No claims to display.'
                        },
                        columns: [
                            {text: 'Claim #', dataIndex: 'claimID', flex: 1},
                            {text: 'Medication', dataIndex: 'medication', width: 92},
                            {text: 'Status', dataIndex: 'stat', flex: 1},
                            {text: 'Service Date', dataIndex: 'svcdate', formatter: 'date("m/d/Y")',width: 103},
                            {text: 'Plan', dataIndex: 'planGroupName', flex: 1},
                            {
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                sortable: false,
                                hideable: false,
                                align: 'center',
                                text: 'Create PA',
                                items: [{
                                    xtype: 'button',
                                    handler: 'createPA',
                                    iconCls: 'x-fa fa-archive'
                                }],
                                renderer : function(value, meta, record) {
                                    this.items[0].hidden = record.get('stat') != 'Rejected';
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        cls: 'card-panel',
                        reference: 'hedis',
                        title: 'HEDIS',
                        bind: {
                            store: '{hedisstore}'
                        },
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            emptyMsg: 'No HEDIS to display.'
                        },
                        collapseFirst: false,
                        features: [{
                            ftype: 'grouping',
                            startCollapsed: true
                        }],
                        columns: [
                            {text: 'Help Text', dataIndex: 'helpText', flex: 1, hidden: true, groupable: false},
                            {text: 'Measure', dataIndex: 'measureDesc', flex: 1},
                            {text: 'Sub Measure', dataIndex: 'subMeasure', flex: 1, groupable: false},
                            {text: 'Due By', dataIndex: 'dueBy', flex: 1,formatter: 'date("m/d/Y")', groupable: false}
                        ]
                    }]
            }]
        }
    ]
});