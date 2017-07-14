Ext.define('Atlas.portals.view.registration.RxPrescriberRegistration', {
    extend: 'Ext.window.Window',
    xtype: 'rxprescriberregistration',

    controller: 'rxprescriberregistrationcontroller',
    viewModel: {
        formulas: {
            finishButtonFormula: function (get) {
                return !get('movenext.disabled') && !get('termsCheckBox.checked');
            }
        },
        stores: {
            states: {
                type: 'clonestore',
                model: 'Atlas.portals.prescriber.model.ListItemsMrx',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'states'
                    },
                    url: 'portal/{0}/listitemsmrx'
                }
            },

            securityquestions: {
                type: 'clonestore',
                model: 'Atlas.portals.prescriber.model.ListItemsMrx',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'PrescPortalSecQues'
                    },
                    url: 'portal/{0}/listitemsmrx'
                }
            }
        },
        data: {
            currentStep: '',
            ttPrescriberDetails: {},
            finishDisabled: true
        }
    },

    title: 'Prescriber Registration',
    height: 550,
    width: 600,
    padding: 10,
    layout: 'card',
    reference: 'cardItems',
    modal: true,
    items: [
        {
            cls: 'card-panel',
            id: 'card-0',
            padding: 5,
            html: '<p><b>Welcome to the Prescriber Registration!</b></p>' +
                '<p>Following information is required to register</p>' +
                '<ul><li>NPI Number</li><li>Email Address</li><li>DEA Number</li><li>State License Number</li></ul>'
        },
        {
            id: 'card-1',
            cls: 'card-panel',
            xtype: 'form',
            padding: 5,
            reference: 'registrationForm1',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                labelWidth: 130,
                padding: 3,
                msgTarget: 'side'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'firstName',
                    fieldLabel: 'First Name',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'lastName',
                    fieldLabel: 'Last Name',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'npi',
                    fieldLabel: 'NPI',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'dea',
                    fieldLabel: 'DEA Number',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    reference: 'licenseState',
                    name: 'licenseState',
                    fieldLabel: 'State Licensed',
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'value',
                    valueField: 'value',
                    publishes: 'value',
                    bind: {
                        store: '{states}'
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'licenseNumber',
                    fieldLabel: 'License Number',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'License Exp Date',
                    name: 'expirationDate',
                    format: 'm/d/Y'
                }
            ]
        },
        {
            id: 'card-2',
            cls: 'card-panel',
            xtype: 'form',
            scrollable: true,
            padding: 5,
            reference: 'registrationForm2',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                labelWidth: 130,
                padding: 3,
                msgTarget: 'side'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'address',
                    fieldLabel: 'Address',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'address2',
                    fieldLabel: 'Address 2'
                },
                {
                    xtype: 'textfield',
                    name: 'city',
                    fieldLabel: 'City',
                    allowBlank: false
                },
                {
                    xtype: 'displayfield',
                    reference: 'providerState',
                    fieldLabel: 'State',
                    bind: '{licenseState.selection.name}'
                },
                {
                    xtype: 'textfield',
                    name: 'zip',
                    fieldLabel: 'Zip',
                    allowBlank: false,
                    emptyText: 'XXXXX-XXXX OR XXXXX'
                },
                {
                    xtype: 'textfield',
                    name: 'phone',
                    fieldLabel: 'Phone No',
                    allowBlank: false,
                    emptyText: '(123)-456-7894',
                    plugins: {
                        ptype: 'phonenumberformatter'
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'fax',
                    fieldLabel: 'Fax',
                    allowBlank: false,
                    emptyText: '(123)-456-7894',
                    plugins: {
                        ptype: 'phonenumberformatter'
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'email',
                    fieldLabel: 'Email Address',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    reference: 'question1',
                    name: 'question1',
                    fieldLabel: 'Security Question 1',
                    allowBlank: false,
                    emptyText: '[Please Select]',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    bind: {
                        store: '{securityquestions}'
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'answer1',
                    fieldLabel: 'Answer 1',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    reference: 'question2',
                    name: 'question2',
                    fieldLabel: 'Security Question 2',
                    allowBlank: false,
                    emptyText: '[Please Select]',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    bind: {
                        store: '{securityquestions}'
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'answer2',
                    fieldLabel: 'Answer 2',
                    allowBlank: false
                }
            ]
        },
        {
            id: 'card-3',
            cls: 'card-panel',
            xtype: 'form',
            padding: 5,
            reference: 'registrationForm3',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                labelWidth: 130,
                padding: 10
            },
            items: [
                {
                    layout: 'fit',
                    flex: 1,
                    scrollable: true,
                    padding: 0,
                    margin: 0,
                    html:   '<b> Terms and Conditions for Use of Provider Portal</b><br /><br />' +
                        'By using the Meridian Health Plan Provider Portal, the registered provider, practice, or other authorized registered entity (“Provider”) agrees to the following terms and conditions, which may be changed or updated from time to time by Meridian Health Plan at its sole discretion. <br /><br />' +
                        'Please read this Provider Use Agreement carefully before using this portal or submitting any information. By clicking on “I agree,” or by using this portal, you, on behalf of yourself or the registered Provider, acknowledge and confirm that: <br /><br /><br />' +
                        '(1)	You have read and understand all of the terms and conditions of this Provider Use Agreement; <br />' +
                        '(2)	You either are the Provider identified in the profile accessed through this portal, or are working with the express authorization of the Provider identified in the profile; <br />' +
                        '(3)	If using this portal on behalf of a Provider, you have full authority to bind the Provider to all of the terms and conditions of this Provider Use Agreement and you hereby do bind the Provider.<br />' +
                        '(4)	You agree not to use the Provider Portal for any purposes which fall outside its intended purposes or for any profit-making or other unauthorized or illegal use. <br />' +
                        '(5)	You agree to abide by all applicable laws and regulations governing patient privacy and privacy of protected health information (PHI). <br /><br />' +
                        '<b>Patient Privacy and Protected Health Information (PHI)</b><br /><br />' +
                        '(1)	The Provider agrees to comply with all applicable federal and state laws, including the Health Insurance Portability and Accountability Act of 1996, as amended (HIPAA) and the Health Information Technology for Economic and Clinical Health Act of 2009 (HITECH). The Provider agrees that the Provider and the Provider’s employees will not use or disclose Protected Health Information (PHI) in any manner that will violate applicable state or federal law.<br />' +
                        '(2)	The Provider agrees not to cause or permit PHI to be disclosed to any person or entity other than authorized officers or employees to whom disclosure is necessary to carry out treatment, payment, or operations.<br />' +
                        '(3)	The Provider agrees not to use PHI for any unauthorized or illegal use.<br />' +
                        '(4)	The Provider agrees to inform every person authorized to use PHI of the obligations described in this agreement. The Provider agrees to take all steps necessary to stop unauthorized access or use of PHI. <br />' +
                        '(5)	The Provider agrees to report immediately to Meridian Health Plan any actual or suspected unauthorized use, duplication or disclosure of PHI or any breach of unsecured PHI (as defined in the HITECH Act §13402(H)), including the identity of each person whose PHI has been or can reasonably believed to have been involved in any unauthorized use, duplication, or disclosure. .<br />' +
                        '(6)	The Provider agrees to access only the minimum necessary information, as defined by 45 C.F.R. § 514 and pursuant to the requirements set forth in the HITECH Act §13405 (b), to carry out treatment, payment, or operations.<br />' +
                        '(7)	Provider agrees not to alter, add to, delete, or attempt to alter, add to or deleted PHI. <br /><br />' +
                        '<b>Third Party Access</b><br /><br />' +
                        '(1)	Third parties who access the Provider Portal must obtain express authorization from the Provider.<br />' +
                        '(2)	Third parties must abide by all of the terms and conditions applicable to Providers.<br /><br />' +
                        '<b>Proprietary Information</b><br /><br />' +
                        'In addition to PHI, Provider will have access to certain information belonging to Meridian Health Plan including trade secrets and other information that is proprietary or confidential. This includes, without limitation, prescription drug formularies, medical policies, and approval criteria (“Proprietary Information”). Provider agrees to hold any such Proprietary Information strictly confidential to the same degree as a reasonable person would hold his or her own proprietary and confidential information. <br /><br />' +
                        '<b>Intended Purposes:</b><br /></br>' +
                        'Intended purposes include, but are not limited to, the following: <br /><br />' +
                        'For Primary Care Physicians: <br /><br />' +
                        '•	Verify eligibility for a Meridian Health Plan member' +
                        '•	Run your own eligibility list' +
                        '•	Enter PCP authorizations online' +
                        '•	Enter corporate authorizations online' +
                        '•	Run patient profiles on assigned members' +
                        '•	Download HEDIS reports' +
                        '•	Submit claims and view claim status' +
                        '•	Access complete Provider Directory' +
                        '•	Self-report HEDIS data<br /><br />' +
                        'For Specialists/Hospitals:<br /><br />' +
                        '•	Verify authorizations online' +
                        '•	Verify eligibility for ANY Meridian Medicaid recipient' +
                        '•	View scope/status of referrals and authorization notes' +
                        '•	Request PCP authorization to see member before visit occurs' +
                        '•	Status claims<br /><br />' +
                        '<b>Provider Breach</b><br /><br />' +
                        'A violation of this agreement by the Provider is a material breach and will result in the immediate termination of access to PHI. At the request of Meridian Health Plan, the Provider must destroy all duplicate copies of PHI, in either written or electronic form. <br /><br />' +
                        '<b>Indemnification</b><br /><br />' +
                        'Provider agrees to indemnify and hold Meridian Health Plan and all of its subsidiaries or affiliates harmless against any and all liability, loss, damages, and costs assessed to Meridian Health Plan arising out of any action, award, judgment, or settlement relating to Provider’s access to, use of, or disclosure of PHI or Proprietary Information. <br /><br />'
                }
            ],
            bbar: [
                {
                    xtype: 'checkbox',
                    name: 'termsCheckBox',
                    reference: 'termsCheckBox',
                    boxLabel: 'I Agree',
                    checked: false,
                    uncheckedValue: false,
                    flex: 1
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            reference: 'moveprev',
            text: 'Prev',
            iconCls: 'x-fa fa-arrow-left',
            handler: 'movePrev',
            disabled: true
        },
        {
            reference: 'movenext',
            text: 'Next',
            iconCls: 'x-fa fa-arrow-right',
            handler: 'nextButton',
            publishes: 'disabled'
        },
        {
            reference: 'finish',
            text: 'Finish',
            handler: 'saveRegistration',
            disabled: true,
            bind: {
                disabled: '{finishButtonFormula}'
            }
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'label',
                    cls: 'login-label',
                    text: 'Please enter information',
                    reference: 'registrationStatus'
                }
            ]
        },
        {
            xtype: 'label',
            dock: 'top',
            cls: 'login-label',
            reference: 'regSuccessMsg'
        }
    ]
});
