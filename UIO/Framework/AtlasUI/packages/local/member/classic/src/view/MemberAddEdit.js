/**
 * Created by j2487 on 10/3/2016.
 * View page for member registration
 */
Ext.define('Atlas.member.view.MemberAddEdit', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-memberaddedit',
    title: 'Member Registration',
    layout: 'border',
    controller: 'memberedit',
    viewModel: 'member',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',

            items: [
                {
                    xtype: 'membertypeahead',
                    emptyText: '[MemberID Name SSN MeridianRxID ]',
                    fieldLabel: 'Member', width: '30%',
                    itemId: 'cbxMember',
                    labelWidth: 55,
                    listeners: {
                        select: 'onMemberSelection'
                    }
                }, '-',
                {
                    xtype: 'displayfield',
                    fieldLabel: 'MRx ID',
                    itemId: 'lblMrxId',
                    labelWidth: 50,
                    bind: '{masterrecord.recipientID}'
                }, '-',
                {
                    xtype: 'combobox',
                    fieldLabel: 'Family Member',
                    itemId: 'cboMemberList',
                    valueField: 'recipientID',
                    displayField: 'MemberName',
                    bind: {
                        store: '{memberfamilystore}'
                    },
                    listeners: {
                        select: 'cboMemberList_Onselect'
                    },
                    queryMode : 'local'
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            itemId: 'tbrBottom',
            items: [
                '->',

                {
                    xtype: 'button',
                    text: 'Create a New Member',
                    iconCls: 'fa fa-user',
                    itemId: 'btnCreateMember',
                    disabled: false,
                    listeners: {click: 'onCreateClick'}
                },
                {
                    xtype: 'button',
                    text: 'Edit Member',
                    iconCls: 'fa fa-edit',
                    listeners: {click: 'onEditClick'},
                    disabled: true,
                    itemId: 'btnEditMember'
                },
                {
                    xtype: 'button',
                    text: 'Create Enrollment',
                    iconCls: 'fa fa-user-plus',
                    disabled: true,
                    itemId: 'btnCreateEnrollment',
                    listeners: {click: 'onEnrollClick'}
                },
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'fa fa-save',
                    listeners: {click: 'onSaveClick'},
                    itemId: 'btnSave',
                    disabled: true
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    iconCls: 'fa fa-remove',
                    listeners: {click: 'onCancelClick'},
                    itemId: 'btnCancel',
                    disabled: true
                }
            ]
        }
    ],
    items: [
        {
            region: 'north',
            height: '51%',
            xtype: 'container', scrollable: true,
            defaults: {
                readOnly: true
            },
            itemId: 'nortContainer',
            items: [
                {
                    layout: 'vbox',
                    height: '100%',
                    xtype: 'form',
                    itemId: 'formid',
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            //height: 230,
                            itemId: 'enroll',

                            items: [
                                {
                                    xtype: 'form',
                                    itemId: 'fpEnrollmentInfo',
                                    collapsible: true,
                                    collapsed: true,
                                    layout: 'hbox',
                                    width: '100%',
                                    height: 230,
                                    disabled: true,
                                    items: [
                                        {

                                            layout: 'vbox',
                                            width: '50%',
                                            height: 210,
                                            defaults: {
                                                width: '60%',
                                                labelWidth: 150
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Member ID',
                                                    itemId: 'memId',
                                                    name: 'memberID',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'plangrouptypeahead',
                                                    fieldLabel: 'Plan Group',
                                                    itemId: 'cmbSearchPlanGroups',
                                                    name: 'plangroupname',
                                                    emptyText: '[e.g. MHP Medicare 2011]',
                                                    listeners: {
                                                        select: 'onPlanSelection'
                                                    },
                                                    displayField: 'planGroupName',
                                                    valueField: 'planGroupId',
                                                    allowBlank: false

                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Plan Benefit',
                                                    itemId: 'cmbSearchPlanBenefit',
                                                    displayField: 'planBenefitCode',
                                                    valueField: 'planBenefitId',
                                                    listeners: {
                                                        select: 'onBenefitSelection'
                                                    },
                                                    bind: {
                                                        store: '{PlanBenefitStore}'
                                                    },
                                                    listConfig: {
                                                        userCls: 'common-key-value-boundlist',
                                                        getInnerTpl: function () {
                                                            return '<h4>{planBenefitCode}</h4>' +
                                                                '<h5><span>{planGroupName}, {carrierName}</span></h5>'
                                                        }
                                                    },
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Program Group Code',
                                                    itemId: 'cbxMCSProgGroupCode',
                                                    displayField: 'progDescription',
                                                    valueField: 'progDescription',
                                                    listeners: {
                                                        select: 'onProgramGroupCodeSelection'
                                                    }//,
                                                    //bind: {
                                                    //    store: '{storeMCSProgGroupCode}'
                                                    //}
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Effective Date',
                                                    itemId: 'effdate',
                                                    allowBlank: false,
                                                    format : 'm/d/Y'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Termination Date',
                                                    itemId: 'termdate',
                                                    format : 'm/d/Y'

                                                },
                                                {xtype: 'textfield', fieldLabel: 'Person Code', itemId: 'pcode'}
                                            ]
                                        },
                                        {
                                            layout: 'vbox',
                                            width: '50%',
                                            height: 210,
                                            defaults: {
                                                width: '60%',
                                                labelWidth: 150
                                            },
                                            items: [
                                                {xtype: 'checkbox', fieldLabel: 'Alt Ins Indicator', itemId: 'ind'},
                                                {xtype: 'textfield', fieldLabel: 'Alt Ins ID', itemId: 'altid'},
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Alt Ins Carrier Name',
                                                    itemId: 'altcname'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Alt Ins Effective Date',
                                                    itemId: 'altedate',
                                                    format : 'm/d/Y'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Alt Ins Termination Date',
                                                    itemId: 'alttdate',
                                                    format : 'm/d/Y'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Relationship',
                                                    itemId: 'relation',
                                                    bind: {
                                                        store: '{relationshipcodestore}'
                                                    },
                                                    queryMode: 'local',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    allowBlank: false
                                                },
                                                {xtype: 'textfield', fieldLabel: 'HICN', itemId: 'hicn'}
                                            ]
                                        }
                                    ]
                                }
                            ]

                        },
                        {
                            layout: 'hbox',
                            height: 200,
                            width: '100%',
                            scrollable: true,
                            items: [
                                {
                                    xtype: 'form',
                                    flex: 1,
                                    title: 'Member General Information', height: 200,
                                    layout: 'vbox',
                                    itemId: 'fpGeneralInfo',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'First Name',
                                            name: 'firstname',
                                            itemId: 'fname',
                                            width: '80%',
                                            disabled: true,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Middle Name',
                                            name: 'middlename',
                                            itemId: 'mname',
                                            disabled: true,
                                            width: '80%'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Last Name',
                                            name: 'lastname',
                                            itemId: 'lname',
                                            width: '80%',
                                            disabled: true,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'container',
                                            width: '80%',itemId:'GenInfoContainer1',
                                            //disabled: true,
                                            layout: 'column',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Suffix',
                                                    name: 'suffix', disabled: true,
                                                    itemId: 'suffix',
                                                    width: '40%'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'DOB',
                                                    name: 'birthDate', disabled: true,
                                                    itemId: 'bdate',
                                                    width: '40%',
                                                    listeners: {
                                                        blur: 'checkValidBirthDate'
                                                    },
                                                    allowBlank: false,
                                                    format : 'm/d/Y'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            width: '80%',
                                            layout: 'column',itemId:'GenInfoContainer2',
                                            //disabled: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'SSN',
                                                    name: 'socSecNum', disabled: true,
                                                    maskRe: /[0-9]/,
                                                    itemId: 'ssn',
                                                    maxLength: 9,
                                                    enforceMaxLength: 9,
                                                    minLength: 9,
                                                    width: '40%'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Gender',
                                                    name: 'gender', disabled: true,
                                                    itemId: 'gender',
                                                    bind: {store: '{genderstore}'},
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    width: '40%',
                                                    queryMode: 'local',
                                                    allowBlank: false,
                                                    forceSelection : true
                                                }
                                            ]
                                        }]
                                },
                                {
                                    xtype: 'form',
                                    flex: 1,
                                    title: 'Other Information', width: '50%', height: 200,
                                    itemId: 'fpOtherInfo',
                                    layout: 'vbox',
                                    defaults:{
                                      labelWidth:130
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Primary Recipient',
                                            itemId: 'txtTempPrimaryRecipient',
                                            width: '80%',
                                            hidden: true,
                                            disabled: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keyup: 'txtTempPrimaryRecipient_Keyup'
                                            }

                                        },
                                        {
                                            xtype: 'membertypeahead',
                                            fieldLabel: 'Primary Recipient',
                                            itemId: 'precipient',
                                            name: 'precipient',
                                            width: '80%',
                                            disabled: true,
                                            listeners: {
                                                select: 'precipient_Select'
                                            },
                                            valueField: 'trecipientID'//,
                                            //displayField: 'tfirstName'
                                        },
                                        {
                                            xtype: 'container',
                                            //disabled: true,
                                            defaults:{
                                                labelWidth:130
                                            },
                                            layout: 'column',itemId:'OtherInfoContainer1',
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Death Date',
                                                    name: 'deathDate',disabled: true,
                                                    itemId: 'ddate',
                                                    format : 'm/d/Y'
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    fieldLabel: 'Mobile Access',
                                                    name: 'mobileAcess',disabled: true,
                                                    itemId: 'maccess'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            //disabled: true,
                                            layout: 'column',itemId:'OtherInfoContainer2',
                                            defaults:{
                                            labelWidth:130
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Martial Status',
                                                    itemId: 'mstatus',disabled: true,
                                                    bind: {store: '{martialstatusstore}'},
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    queryMode: 'local',
                                                    forceSelection : true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Mobile Pin',disabled: true, maskRe: /[0-9]/,
                                                    itemId: 'mpin',
                                                    name: 'mpin'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            //disabled: true,
                                            layout: 'column',itemId:'OtherInfoContainer3',
                                            defaults:{
                                                labelWidth:130
                                            },
                                            items: [
                                                {xtype: 'textfield', fieldLabel: 'Race', itemId: 'race', name: 'race',disabled: true},
                                                {xtype: 'checkbox', fieldLabel: 'Restrict Access', itemId: 'raccess',disabled: true}
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Language Code',
                                            disabled: true,
                                            itemId: 'langcode',
                                            name: 'langCode'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            flex: 1,
                            width: '100%',
                            height: 240,
                            scrollable: true,
                            items: [
                                {
                                    xtype: 'form',
                                    flex: 1,
                                    title: 'Member Contact Information', height: 240,
                                    itemId: 'fpContactInfo',
                                    //defaults: {readOnly: true},
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'Address same as primary recipient',
                                            itemId: 'ChkAddressSamePrimaryRecp',
                                            disabled: true,margin:'0 0 0 115',
                                            listeners: {
                                                change: 'ChkAddressSamePrimaryRecp_Change'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Address Type',
                                            itemId: 'addresstype',
                                            name: 'Home_addresstype',
                                            store: ['Home'],
                                            disabled: true,
                                            width: '80%'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Address',
                                            name: 'Home_Address1',
                                            itemId: 'haddress1',
                                            disabled: true,
                                            width: '80%'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            name: 'Home_Address2',
                                            itemId: 'haddress2',
                                            margin: '0 0 0 106',
                                            disabled: true,
                                            width: '80%'
                                        },

                                        {
                                            xtype: 'container',
                                            layout: 'column',itemId:'ContactInfoContainer1',
                                            //disabled: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'City',
                                                    name: 'Home_City',disabled: true,
                                                    itemId: 'hcity'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'State',
                                                    name: 'Home_State',disabled: true,
                                                    itemId: 'hstate'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'column',itemId:'ContactInfoContainer2',
                                            //disabled: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Zip Code:',
                                                    name: 'home_zipCode',disabled: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 10,
                                                    minLength: 5,
                                                    itemId: 'hzip'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Home Phone',
                                                    name: 'homephone_ContactInfo',
                                                    itemId: 'hphone',disabled: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 14,
                                                    enforceMaxLength: 14,
                                                    minLength: 14,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        'keypress': {
                                                            fn: 'formatPhoneNumber'
                                                        }
                                                    }
                                                }
                                            ]
                                        },

                                        {
                                            xtype: 'container',
                                            layout: 'column',itemId:'ContactInfoContainer3',
                                            //disabled: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Cell Phone',
                                                    name: 'cell_ContactInfo',
                                                    itemId: 'cphone',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 14,disabled: true,
                                                    enforceMaxLength: 14,
                                                    minLength: 14,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        'keypress': {
                                                            fn: 'formatPhoneNumber'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Work Phone',
                                                    name: 'workphone_ContactInfo',
                                                    itemId: 'wphone',
                                                    maskRe: /[0-9]/,disabled: true,
                                                    maxLength: 14,
                                                    enforceMaxLength: 14,
                                                    minLength: 14,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        'keypress': {
                                                            fn: 'formatPhoneNumber'
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Email',
                                            disabled: true,
                                            name: 'email_ContactInfo',
                                            itemId: 'email',
                                            width: '80%',
                                            regex: /^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/
                                        }
                                    ]
                                },
                                {
                                    xtype: 'form',
                                    flex: 1,
                                    title: 'Guardian/Responsible Party Information',
                                    height: 240,
                                    itemId: 'fpGuardianInfo',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',itemId:'RespPartyContainer1',
                                            //disabled: true,
                                            items: [
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'ChkPrimaryRecipient',disabled: true,
                                                    itemId: 'ChkPrimaryRecipient',
                                                    listeners: {
                                                        change: 'checkPrimaryRecipient_Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    name: 'dfPrimaryAsGuardian',disabled: true,
                                                    itemId: 'dfPrimaryAsGuardian',
                                                    fieldLabel: 'Primary as Guardian'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',itemId:'RespPartyContainer2',
                                            //disabled: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Name',disabled: true,
                                                    name: 'respFirstName',
                                                    itemId: 'rfname',
                                                    allowBlank: false
                                                },
                                                {xtype: 'textfield', name: 'respMiddleName', itemId: 'rmname',disabled: true},
                                                {xtype: 'textfield', name: 'respLastName', itemId: 'rlname',disabled: true,
                                                    allowBlank: false}
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Address',
                                            disabled: true,
                                            name: 'resp_address1',
                                            itemId: 'raddress1',
                                            width: '80%',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            disabled: true,
                                            name: 'resp_address2',
                                            itemId: 'raddress2',
                                            margin: '0 0 0 106',
                                            width: '80%'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'column',itemId:'RespPartyContainer3',
                                            //disabled: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'City',
                                                    name: 'resp.city',disabled: true,
                                                    itemId: 'rcity',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'State',
                                                    name: 'resp_state',disabled: true,
                                                    itemId: 'rstate',
                                                    allowBlank: false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Zip',
                                            disabled: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            minLength: 5,
                                            itemId: 'rzip',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'column',itemId:'RespPartyContainer4',
                                            //disabled: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Home Phone',
                                                    name: 'respHomePhone_ContactInfo',
                                                    itemId: 'rhphone',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 14,
                                                    enforceMaxLength: 14,disabled: true,
                                                    minLength: 14,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        'keypress': {
                                                            fn: 'formatPhoneNumber'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Work Phone',
                                                    name: 'respWorkPhone_ContactInfo',
                                                    itemId: 'rwphone',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 14,disabled: true,
                                                    enforceMaxLength: 14,
                                                    minLength: 14,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        'keypress': {
                                                            fn: 'formatPhoneNumber'
                                                        }
                                                    }
                                                }
                                            ]
                                        }]
                                }
                            ]
                        }

                    ]
                }
            ]
        },
        {
            region: 'south',
            height: '49%',
            width: '100%',
            xtype: 'grid',
            bind: {
                store: '{membercoveragehistorystore}'
            },
            selModel: {
                selType: 'rowmodel', // rowmodel is the default selection model
                mode: 'SINGLE' // Allows selection of multiple rows
            },
            listeners: {
                itemdblclick: 'editEnrollment'
            },
            title: 'Member Coverage History',
            itemId: 'coverageGrid',
            columns: [
                {text: '#',dataIndex:'rowNum',width:50},
                {text: 'Member ID', dataIndex: 'tmemberId', width: 150},
                {text: 'Carrier', dataIndex: 'tCarrierName', width: 250},
                {text: 'LOB', dataIndex: 'tCarrierLOBName', width: 120},
                {text: 'Group', dataIndex: 'tPlanGroupName', width: 200},
                {
                    text: 'Effective Date',
                    dataIndex: 'tEffDate',
                    width: 120,
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    filter: {type: 'date'}
                },
                {
                    text: 'Termination Date',
                    dataIndex: 'tTermDate',
                    width: 120,
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    filter: {type: 'date'}
                },
                {text: 'Coverage Code', dataIndex: 'coverageCode'},
                {text: 'Person Code', dataIndex: 'PersonCode'},
                {text: 'Alt. Ins. Carrier', dataIndex: 'tAltInsCarrierName', width: 120},
                {text: 'Alt. Ins. Member ID', dataIndex: 'tAltInsMemberID', width: 120},
                {
                    text: 'Overrided Through',
                    width: 200,
                    dataIndex: 'altInsOverrideEndDate',
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    filter: {type: 'date'}
                }
            ]
        },
        {
            xtype: 'panel',
            itemId: 'hdnContainer_MemberAddEdit',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hdnDataSource'},
                {xtype: 'hidden', itemId: 'hiddenKey'},
                {xtype: 'hidden', itemId: 'hiddenAction'},
                {xtype: 'hidden', itemId: 'hiddenGroupID'},
                {xtype: 'hidden', itemId: 'hidMemMenuID'},
                {xtype: 'hidden', itemId: 'hidMemRxid'},
                {xtype: 'hidden', itemId: 'hiddenSSnNumber'},
                {xtype: 'hidden', itemId: 'hiddenSystemID'},
                {xtype: 'hidden', itemId: 'hiddenEnrollmentSystemID'},
                {xtype: 'hidden', itemId: 'hiddenresult'},
                {xtype: 'hidden', itemId: 'hiddenRecpientId'},
                {xtype: 'hidden', itemId: 'hiddenPrimaryId'},
                {xtype: 'hidden', itemId: 'hidPlanGroupId'},
                {xtype: 'hidden', itemId: 'hidPlanGroupStatusCode'},
                {xtype: 'hidden', itemId: 'hdnParentPlanGroupId'},
                {xtype: 'hidden', itemId: 'hdnParentPlanBenefitId'},
                {xtype: 'hidden', itemId: 'hdnParentPlanBenefitStatus'},
                {xtype: 'hidden', itemId: 'hidProgGroupCode'},
                {xtype: 'hidden', itemId: 'hidProgBenefitCode'},
                {xtype: 'hidden', itemId: 'hiddenRecipientId'},
                {xtype: 'hidden', itemId: 'hdnAction'},
                {xtype: 'hidden', itemId: 'hdnRequestIDCard'},
                {xtype: 'hidden', itemId: 'hiddenMemberId'},
                {xtype: 'hidden', itemId: 'hiddenLOBId'},
                {xtype: 'hidden', itemId: 'hidCovPlanGroupId'},
                {xtype: 'hidden', itemId: 'hidCovPlanBenefitId'},
                {xtype: 'hidden', itemId: 'hidMemberDetailsSystemId'},
                {xtype: 'hidden', itemId: 'hdnIsForcefullyEnroll'},
                {xtype: 'hidden', itemId: 'hiddenPrimaryRecipient'},
                {xtype: 'hidden', itemId: 'hdnResultValue'},
                {xtype: 'hidden', itemId: 'hdnMemberId'}

            ]
        }
    ]
});


