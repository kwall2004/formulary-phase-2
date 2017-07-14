Ext.define('Atlas.portals.view.hpmember.HealthRiskAssessment', {
    extend: 'Ext.form.Panel',
    xtype: 'hpmember-healthriskassessment',
    controller: 'healthRiskAssessmentController',
    //viewModel: 'healthRiskAssessmentViewModel',
    requires: [
        'Ext.panel.Panel'
    ],
    region: 'center',
    title: 'Health Risk Assessment',
    layout: 'card',
    defaults: {
        // applied to each contained panel
        border: false
    },
    fieldDefaults: {
        msgTarget: 'side' // if set to side, the validation indicators show up to the far right
    },
    // just an example of one possible navigation scheme, using buttons
    tbar: [
        {
            id: 'card-aboutyou',
            text: 'About You',
            handler: function (btn) {
                this.up('form').getController().navigate(btn.up("panel"), 0);
            }
        },
        {
            id: 'card-medicalhistory',
            text: 'Medical History',
            handler: function (btn) {
                this.up('form').getController().navigate(btn.up("panel"), 1);
            }
        },
        {
            id: 'card-medications',
            text: 'Medications & Drugs',
            handler: function (btn) {
                this.up('form').getController().navigate(btn.up("panel"), 2);
            }
        }
    ],
    bbar: [
        {
            id: 'move-prev',
            text: 'Back',
            handler: function (btn) {
                this.up('form').getController().navigate(btn.up("panel"), "prev");
            },
            disabled: true
        },
        '->', // greedy spacer so that the buttons are aligned to each side
        {
            id: 'move-next',
            text: 'Next',
            handler: function (btn) {
                this.up('form').getController().navigate(btn.up("panel"), "next");
            }
        },
        {
            id: 'save',
            text: 'Save Draft',
            listeners: {
                click: 'onSubmit'
            }
        },
        {
            id: 'saveSubmit',
            text: 'Submit',
            listeners: {
                click: 'onSubmit'
            },
            disabled: true
        }
    ],
    // the panels (or "cards") within the layout
    items: [
        {
            id: 'card-0',
            cls: 'card-panel',
            title: 'Health Risk Assessment',

            scrollable: true,

            items: [{
                xtype: 'container',
                padding: 7,

                items: [
                    {
                    xtype: 'container',
                    html: '<h2>About You</h2>'
                    },
                    {
                        xtype: 'hiddenfield',
                        fieldLabel: 'Sequence Number',
                        name: 'seqNum'
                    },
                    {
                        xtype: 'hiddenfield',
                        fieldLabel: 'HRA Type',
                        name: 'hraType',
                        value: 'HRA'
                    },
                    {
                        xtype: 'hiddenfield',
                        fieldLabel: 'CompleteDate',
                        name: 'completeDate'
                    },
                    {
                        xtype: 'hiddenfield',
                        fieldLabel: 'Recipient ID',
                        name: 'recipientId'
                    },
                    {
                        xtype: 'fieldset',
                        title: '1. Have you received the Meridian Member ID Card?',

                        items: [{
                            xtype: 'radiogroup',
                            reference: 'receivedGoldPlanCard',
                            labelSeparator: '',
                            labelAlign: 'top',
                            // Arrange radio buttons into two columns, distributed vertically
                            columns: 4,
                            vertical: false,
                            items: [
                                {name: 'receivedGoldPlanCard', boxLabel: 'Yes', inputValue: 'Y'},
                                {name: 'receivedGoldPlanCard', boxLabel: 'No', inputValue: 'N'},
                                {name: 'receivedGoldPlanCard', boxLabel: 'Unknown', inputValue: 'U'},
                                {name: 'receivedGoldPlanCard', boxLabel: 'Decline to Answer', inputValue: 'R'}
                            ]
                        }]
                    },
                    {
                        xtype: 'fieldset',
                        title: '2. Where do you currently live?',

                        items: [{
                            xtype: 'radiogroup',
                            reference: 'currentlyLive',
                            labelSeparator: '',
                            labelAlign: 'top',
                            // Arrange radio buttons into two columns, distributed vertically
                            columns: 2,
                            vertical: false,
                            // If AssistedLiving is selected, require AssistedLivingFacility to be entered
                            items: [
                                {name: 'currentlyLive', boxLabel: 'Own house, apartment, townhouse or mobile home', inputValue: '01'},
                                {name: 'currentlyLive', boxLabel: 'Assisted Living Apartment', inputValue: '02'},
                                {name: 'currentlyLive', boxLabel: 'Group Home', inputValue: '03'},
                                {name: 'currentlyLive', boxLabel: 'Halfway House', inputValue: '04'},
                                {name: 'currentlyLive', boxLabel: 'Shelter', inputValue: '05'},
                                {name: 'currentlyLive', boxLabel: 'Transient/Motel/Hotel', inputValue: '06'},
                                {name: 'currentlyLive', boxLabel: 'Nursing Home', inputValue: '07'},
                                {name: 'currentlyLive', boxLabel: 'Homeless', inputValue: '08'},
                                {name: 'currentlyLive', boxLabel: 'Hospice', inputValue: '09'},
                                {name: 'currentlyLive', boxLabel: 'State Operated Hospital (SOH)', inputValue: '10'},
                                {name: 'currentlyLive', boxLabel: 'ICF - MR/DD Family', inputValue: '11'},
                                {name: 'currentlyLive', boxLabel: 'DD Center/State Institution for Developmental Disabilities', inputValue: '12'},
                                {name: 'currentlyLive', boxLabel: 'Mental Health Institution', inputValue: '13'}
                            ],
                            listeners: {
                                change: 'onCurrentlyLiveChange'
                            }
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Facility Name',
                            name: 'nameOfAssistedLivingFacility',
                            reference: 'nameOfAssistedLivingFacility',
                            disabled: true
                        }]
                    },{
                        xtype: 'fieldset',
                        title: '3. Is English your primary language?',

                        items: [{
                            xtype: 'radiogroup',
                            reference: 'englishPrimaryLanguage',
                            labelSeparator: '',
                            labelAlign: 'top',
                            // Arrange radio buttons into two columns, distributed vertically
                            columns: 2,
                            vertical: false,
                            items: [
                                {name: 'englishPrimaryLanguage', boxLabel: 'Yes', inputValue: 'Y'},
                                {name: 'englishPrimaryLanguage', boxLabel: 'No', inputValue: 'N'}
                            ],
                            listeners: {
                                change: 'onEnglishPrimaryLanguageChange'
                            }
                        },
                            {
                                xtype: 'radiogroup',
                                reference: 'whatIsPrimaryLanguage',
                                margin: '25 0 0 0',
                                fieldLabel: 'If no, please select your primary language:',
                                labelSeparator: '',
                                labelAlign: 'top',
                                columns: 3,
                                vertical: false,
                                items: [
                                    {name: "whatIsPrimaryLanguage", boxLabel: "Arabic", inputValue: "01"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "Chinese", inputValue: "02"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "French", inputValue: "03"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "German", inputValue: "04"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "Italian", inputValue: "05"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "Japanese", inputValue: "06"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "Polish", inputValue: "07"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "Spanish", inputValue: "08"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "Russian", inputValue: "09"},
                                    {name: "whatIsPrimaryLanguage", boxLabel: "Other", inputValue: "10"}
                                ],
                                listeners: {
                                    change: 'onPrimaryLanguageChange'
                                },
                                disabled: true // initial state is disabled
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Other Language',
                                name: 'otherPrimaryLanguage',
                                reference: 'otherPrimaryLanguage',
                                disabled: true
                            }]
                    },{
                        xtype: 'fieldset',
                        title: '4. How would you describe your cultural or ethnic origin?',

                        items: [{
                            xtype: 'radiogroup',
                            reference: "culturalEthnicOrigin",
                            labelSeparator: '',
                            labelAlign: 'top',
                            columns: 2,
                            vertical: false,
                            items: [
                                {name: "culturalEthnicOrigin", inputValue: "01", boxLabel: "White/Caucasian"},
                                {name: "culturalEthnicOrigin", inputValue: "02", boxLabel: "Black/African American"},
                                {name: "culturalEthnicOrigin", inputValue: "03", boxLabel: "Latino/Hispanic"},
                                {name: "culturalEthnicOrigin", inputValue: "04", boxLabel: "American Indian"},
                                {name: "culturalEthnicOrigin", inputValue: "05", boxLabel: "Middle Eastern"},
                                {name: "culturalEthnicOrigin", inputValue: "06", boxLabel: "Arab American"},
                                {name: "culturalEthnicOrigin", inputValue: "08", boxLabel: "Muslim"},
                                {name: "culturalEthnicOrigin", inputValue: "09", boxLabel: "Other"},
                                {name: "culturalEthnicOrigin", inputValue: "10", boxLabel: "Refused"},
                                {name: "culturalEthnicOrigin", inputValue: "11", boxLabel: "Two or More Races"},
                                {name: "culturalEthnicOrigin", inputValue: "12", boxLabel: "Asian"},
                                {name: "culturalEthnicOrigin", inputValue: "13", boxLabel: "Native Hawaiian or Pacific Islander"}
                            ],
                            listeners: {
                                change: 'onCulturalEthnicOriginGroupChange'
                            }
                        },
                            {
                                xtype: 'textfield',
                                itemId: 'otherCulturalEthnicOrigin',
                                name: 'otherCulturalEthnicOrigin',
                                reference: 'otherCulturalEthnicOrigin',
                                fieldLabel: 'Other Ethnic Origin',
                                disabled: true
                            }]
                    },{
                        xtype: 'fieldset',
                        title: '5. How tall are you?',

                        items: [{
                            xtype: 'fieldcontainer',
                            labelSeparator: '',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    name: 'patHeightFeet',
                                    reference: 'patHeightFeet',
                                    fieldLabel: 'Feet',
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false

                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'patHeightInches',
                                    reference: 'patHeightInches',
                                    fieldLabel: 'Inches',
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'patWeight',
                                    reference: 'patWeight',
                                    fieldLabel: 'Weight(lbs)',
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false
                                }
                            ]
                        }]
                    },{
                        xtype: 'fieldset',
                        title: '6. Are you pregnant?',

                        items: [{
                            xtype: 'radiogroup',
                            reference: 'isPregnant',
                            labelSeparator: '',
                            labelAlign: 'top',
                            columns: 2,
                            vertical: false,
                            items: [
                                {name: 'isPregnant', boxLabel: 'Yes', inputValue: 'Y'},
                                {name: 'isPregnant', boxLabel: 'No', inputValue: 'N'}
                            ],
                            listeners: {
                                change: 'onIsPregnantChange'
                            }
                        },                    {
                            xtype: 'datefield',
                            fieldLabel: 'Due Date',
                            name: 'dueDate',
                            reference: 'dueDate',
                            disabled: true
                        }]
                    },{
                        xtype: 'fieldset',
                        title: '7. Do you have a health care Power of Attorney?',

                        items: [{
                            xtype: 'radiogroup',
                            reference: 'powerOfAttorney', // field name is different than the fieldname returned by validator
                            labelSeparator: '',
                            labelAlign: 'top',
                            columns: 2,
                            vertical: false,
                            items: [
                                {name: 'powerOfAttorneyHra', boxLabel: 'Yes', inputValue: 'Y'},
                                {name: 'powerOfAttorneyHra', boxLabel: 'No', inputValue: 'N'}
                            ]
                        },
                            {
                                xtype: 'radiogroup',
                                reference: 'livingWillHRA',
                                margin: '25 0 0 0',
                                fieldLabel: 'Do you have a living will?',
                                labelSeparator: '',
                                labelAlign: 'top',
                                columns: 2,
                                vertical: false,
                                items: [
                                    {name: 'livingWillHra', boxLabel: 'Yes', inputValue: 'Y'},
                                    {name: 'livingWillHra', boxLabel: 'No', inputValue: 'N'}
                                ]
                            }]
                    },{
                        xtype: 'fieldset',
                        title: '8. What is the name of the physician/clinic you call when you need medical care?',

                        items: [                    {
                            xtype: 'textfield',
                            labelSeparator: '',
                            width: 600,
                            name: 'providerNameMedicalCare',
                            reference: 'providerNameMedicalCare'
                        }]
                    },{
                        xtype: 'fieldset',
                        title: '9. How long have you been with this physician?',

                        items: [                    {
                            xtype: 'fieldcontainer',
                            reference: 'howLongPhysicianContainer',
                            labelSeparator: '',
                            items: [
                                {
                                    xtype: 'textfield',
                                    reference: 'howLongPhysician',
                                    name: 'howLongPhysicianYear',
                                    fieldLabel: 'Years',
                                    listeners: {
                                        change: 'physicianMonthChange'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'howLongPhysicianMonth',
                                    fieldLabel: 'Months',
                                    listeners: {
                                        change: 'physicianMonthChange'
                                    }
                                }
                            ]
                        }]
                    },{
                        xtype: 'fieldset',
                        title: '10. Have you scheduled an appointment with your primary care physician?',

                        items: [{
                            xtype: 'radiogroup',
                            reference: 'hasAppt',
                            labelSeparator: '',
                            labelAlign: 'top',
                            columns: 2,
                            vertical: false,
                            items: [
                                {name: 'hasAppt', boxLabel: 'Yes', inputValue: 'Y'},
                                {name: 'hasAppt', boxLabel: 'No', inputValue: 'N'}
                            ],
                            listeners: {
                                change: 'onHasApptChange'
                            }
                        },
                            {
                                xtype: 'datefield',
                                margin: '25 0 0 0',
                                fieldLabel: 'When is the Appointment? (MM/DD/YYYY)',
                                name: 'pcpApptDate',
                                reference: 'pcpApptDate',
                                disabled: true,
                                format: 'm/d/Y'
                            }]
                    },{
                        xtype: 'fieldset',
                        title: '11. Are you under the care of a specialist?',

                        items: [                    {
                            xtype: 'radiogroup',
                            reference: 'careOfSpecialist',
                            fieldLabel: '',
                            labelSeparator: '',
                            labelAlign: 'top',
                            columns: 2,
                            vertical: false,
                            items: [
                                {name: 'careOfSpecialist', boxLabel: 'Yes', inputValue: 'Y'},
                                {name: 'careOfSpecialist', boxLabel: 'No', inputValue: 'N'}
                            ],
                            listeners: {
                                change: 'onCareOfSpecialistChange'
                            }
                        },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'If yes',
                                margin: '25 0 0 0',
                                //labelSeparator: '',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'What is their speciality?',
                                        name: 'specialistSpecialty',
                                        reference: 'specialistSpecialty',
                                        disabled: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'What is the name of your specialist?',
                                        name: 'specialistName',
                                        reference: 'specialistName',
                                        disabled: true
                                    }
                                ]
                            }]
                    },{
                        xtype: 'fieldset',
                        title: '12. Do you have other insurance?',

                        items: [                    {
                            xtype: 'radiogroup',
                            reference: 'hasOtherInsurance',
                            labelSeparator: '',
                            labelAlign: 'top',
                            //columns: 4,
                            vertical: false,
                            items: [
                                {name: 'hasOtherInsurance', boxLabel: 'Yes', inputValue: 'Y'},
                                {name: 'hasOtherInsurance', boxLabel: 'No', inputValue: 'N'},
                                {name: 'hasOtherInsurance', boxLabel: 'Unknown', inputValue: 'U'},
                                {name: 'hasOtherInsurance', boxLabel: 'Decline to Answer', inputValue: 'R'}
                            ],
                            listeners: {
                                change: 'onHasOtherInsuranceChange'
                            }
                        },
                            {
                                xtype: 'fieldcontainer',
                                reference: 'otherInsuranceContainer',
                                margin: '25 0 0 0',
                                fieldLabel: 'If yes',
                                //labelSeparator: '',
                                disabled: true,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Carrier',
                                        name: 'otherInsuranceCarrier',
                                        reference: 'otherInsuranceCarrier'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Policy Nbr',
                                        name: 'otherInsurancePolicyNum',
                                        reference: 'otherInsurancePolicyNum'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Effective Date (MM/DD/YYYY)',
                                        name: 'otherInsuranceEffectiveDate',
                                        reference: 'otherInsuranceEffectiveDate',
                                        format: 'm/d/Y'
                                    }
                                ]
                            }]
                    },{
                        xtype: 'fieldset',
                        title: '13. How would you rate your health compared to other people the same age?',

                        items: [                    {
                            xtype: 'radiogroup',
                            reference: 'overallHealth',
                            labelSeparator: '',
                            labelAlign: 'top',
                            //columns: 4,
                            vertical: false,
                            items: [
                                {name: 'overallHealth', boxLabel: 'Excellent', inputValue: 'Excellent'},
                                {name: 'overallHealth', boxLabel: 'Fair', inputValue: 'Fair'},
                                {name: 'overallHealth', boxLabel: 'Good', inputValue: 'Good'},
                                {name: 'overallHealth', boxLabel: 'Poor', inputValue: 'Poor'},
                                {name: 'overallHealth', boxLabel: 'Refused', inputValue: 'Refused'},
                                {name: 'overallHealth', boxLabel: 'Unknown', inputValue: 'Unknown'},
                                {name: 'overallHealth', boxLabel: 'Very Good', inputValue: 'Very Good'}
                            ]
                        }]
                    },{
                        xtype: 'fieldset',
                        title: '14. Do you eat a serving of fresh fruits and vegetables at least one a day?',

                        items: [                    {
                            xtype: 'radiogroup',
                            reference: 'fruitsVegetables',
                            labelSeparator: '',
                            labelAlign: 'top',
                            //columns: 4,
                            vertical: false,
                            items: [
                                {name: 'fruitsVegetables', boxLabel: 'Almost Always (6-7 days/wk)', inputValue: '01'},
                                {name: 'fruitsVegetables', boxLabel: 'Sometimes (3-5 days/wk)', inputValue: '02'},
                                {name: 'fruitsVegetables', boxLabel: 'Rarely (0-2 days/wk)', inputValue: '03'},
                                {name: 'fruitsVegetables', boxLabel: 'N/A', inputValue: '04'}
                            ]
                        }]
                    },{
                        xtype: 'fieldset',
                        title: '15. When was the last time you had a flu shot?',

                        items: [                    {
                            xtype: 'radiogroup',
                            reference: 'fluDate',
                            labelSeparator: '',
                            labelAlign: 'top',
                            //columns: 4,
                            vertical: false,
                            items: [
                                {name: 'fluShot', boxLabel: 'Less than 1 year ago', inputValue: '01'},
                                {name: 'fluShot', boxLabel: '1 year ago', inputValue: '02'},
                                {name: 'fluShot', boxLabel: '2 years ago', inputValue: '03'},
                                {name: 'fluShot', boxLabel: 'Never', inputValue: '04'},
                                {name: 'fluShot', boxLabel: 'Unknown', inputValue: '05'},
                                {name: 'fluShot', boxLabel: 'Refused', inputValue: '06'}
                            ]
                        }]
                    },{
                        xtype: 'fieldset',
                        title: '16. When was your last colorectal screening?',

                        items: [{
                            xtype: 'radiogroup',
                            reference: 'colorectalScreening',
                            labelSeparator: '',
                            labelAlign: 'top',
                            //columns: 4,
                            vertical: false,
                            items: [
                                {name: 'colorectalScreening', boxLabel: 'Less than 1 year ago', inputValue: '01'},
                                {name: 'colorectalScreening', boxLabel: '1 year ago', inputValue: '02'},
                                {name: 'colorectalScreening', boxLabel: '2 years ago', inputValue: '03'},
                                {name: 'colorectalScreening', boxLabel: 'Never', inputValue: '04'},
                                {name: 'colorectalScreening', boxLabel: 'Unknown', inputValue: '05'},
                                {name: 'colorectalScreening', boxLabel: 'Refused', inputValue: '06'}
                            ],
                            listeners: {
                                change: 'onColorectalScreeningChange'
                            }
                        },
                            {
                                xtype: 'datefield',
                                margin: '25 0 0 0',
                                fieldLabel: 'If in the past two (2) years, please provide the date if you can (MM/DD/YYYY)',
                                name: 'colorectalTestDate',
                                reference: 'colorectalTestDate',
                                disabled: true
                            }]
                    }
                ]
            }]
        }, {
            id: 'card-1',
            cls: 'card-panel',
            title: 'Health Risk Assessment',

            scrollable: true,

            items: [{
                xtype: 'container',
                padding: 7,

                items: [{
                    xtype: 'container',
                    html: '<h2>Medical History</h2>'
                },{
                    xtype: 'fieldset',
                    title: '17. Has a doctor ever told you that you have any of these conditions?',

                    items: [                    {
                        xtype: 'fieldcontainer',
                        labelSeparator: '',
                        labelAlign: 'top',
                        width: '100%',
                        layout: {
                            type: 'table',
                            columns: 3,
                            tableAttrs: {
                                style: {
                                    width: '100%'
                                }
                            }
                        },
                        items: [
                            {
                                html: 'Check if Yes&nbsp;&nbsp;&nbsp;&nbsp;',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                html: 'Condition',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                html: 'Confidence Level',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasAsthma',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
                                listeners: {
                                    change: 'onConditionChanged'
                                }
                            },
                            {
                                html: 'Asthma',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'radiogroup',
                                reference: 'hasAsthmaCondition',
                                disabled: true,
                                fieldLabel: '',
                                labelSeparator: '',
                                labelAlign: 'top',
                                vertical: false,
                                items: [
                                    {name: 'hasAsthmaCondition', boxLabel: 'Pretty Confident', inputValue: '1'},
                                    {name: 'hasAsthmaCondition', boxLabel: 'Somewhat Confident', inputValue: '2'},
                                    {name: 'hasAsthmaCondition', boxLabel: 'Not Confident', inputValue: '5'}
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasEmphysima',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
                                listeners: {
                                    change: 'onConditionChanged'
                                }
                            },
                            {
                                html: 'Emphysema/COPD',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'radiogroup',
                                reference: 'hasEmphysimaCondition',
                                disabled: true,
                                fieldLabel: '',
                                labelSeparator: '',
                                labelAlign: 'top',
                                //columns: 4,
                                vertical: false,
                                items: [
                                    {name: 'hasEmphysimaCondition', boxLabel: 'Pretty Confident', inputValue: '1'},
                                    {name: 'hasEmphysimaCondition', boxLabel: 'Somewhat Confident', inputValue: '2'},
                                    {name: 'hasEmphysimaCondition', boxLabel: 'Not Confident', inputValue: '5'}
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasHeartDisease',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
                                listeners: {
                                    change: 'onConditionChanged'
                                }
                            },
                            {
                                html: 'Heart Disease',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'radiogroup',name: 'hasHeartDiseaseCondition',
                                reference: 'hasHeartDiseaseCondition',
                                disabled: true,
                                fieldLabel: '',
                                labelSeparator: '',
                                labelAlign: 'top',
                                //columns: 4,
                                vertical: false,
                                items: [
                                    {name: 'hasHeartDiseaseCondition', boxLabel: 'Pretty Confident', inputValue: '1'},
                                    {name: 'hasHeartDiseaseCondition', boxLabel: 'Somewhat Confident', inputValue: '2'},
                                    {name: 'hasHeartDiseaseCondition', boxLabel: 'Not Confident', inputValue: '5'}
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'heartAttack',
                                inputValue: 'Y',
                                uncheckedValue: 'N'
                            },
                            {
                                html: 'Heart Attack',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                html: '',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasHighBloodPressure',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
                                listeners: {
                                    change: 'onConditionChanged'
                                }
                            },
                            {
                                html: 'High Blood Pressure (HTN)',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'radiogroup',
                                reference: 'hasHighBloodPressureCondition',
                                disabled: true,
                                fieldLabel: '',
                                labelSeparator: '',
                                labelAlign: 'top',
                                //columns: 4,
                                vertical: false,
                                items: [
                                    {name: 'hasHighBloodPressureCondition', boxLabel: 'Pretty Confident', inputValue: '1'},
                                    {name: 'hasHighBloodPressureCondition', boxLabel: 'Somewhat Confident', inputValue: '2'},
                                    {name: 'hasHighBloodPressureCondition', boxLabel: 'Not Confident', inputValue: '5'}
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                reference: 'hasCongestiveHeartFailure',
                                name: 'hasCongestiveHeartFailure',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
                                listeners: {
                                    change: 'onConditionChanged'
                                }
                            },
                            {
                                html: 'Congestive Heart Failure',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'radiogroup',
                                reference: 'hasCHFCondition',
                                disabled: true,
                                fieldLabel: '',
                                labelSeparator: '',
                                labelAlign: 'top',
                                //columns: 4,
                                vertical: false,
                                items: [
                                    {name: 'hasCHFCondition', boxLabel: 'Pretty Confident', inputValue: '1'},
                                    {name: 'hasCHFCondition', boxLabel: 'Somewhat Confident', inputValue: '2'},
                                    {name: 'hasCHFCondition', boxLabel: 'Not Confident', inputValue: '5'}
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hadStroke',
                                inputValue: 'Y',
                                uncheckedValue: 'N'
                            },
                            {
                                html: 'Stroke',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                html: '',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasDiabetes',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
                                listeners: {
                                    change: 'onConditionChanged'
                                }
                            },
                            {
                                html: 'Diabetes',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'radiogroup',
                                reference: 'hasDiabetesCondition',
                                disabled: true,
                                fieldLabel: '',
                                labelSeparator: '',
                                labelAlign: 'top',
                                //columns: 4,
                                vertical: false,
                                items: [
                                    {name: 'hasDiabetesCondition', boxLabel: 'Pretty Confident', inputValue: '1'},
                                    {name: 'hasDiabetesCondition', boxLabel: 'Somewhat Confident', inputValue: '2'},
                                    {name: 'hasDiabetesCondition', boxLabel: 'Not Confident', inputValue: '5'}
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasKidneyProblem',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
                                listeners: {
                                    change: 'onConditionChanged'
                                }
                            },
                            {
                                html: 'Kidney Problems',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'radiogroup',
                                reference: 'hasKidneyProblemCondition',
                                disabled: true,
                                fieldLabel: '',
                                labelSeparator: '',
                                labelAlign: 'top',
                                //columns: 4,
                                vertical: false,
                                items: [
                                    {name: 'hasKidneyProblemCondition', boxLabel: 'Pretty Confident', inputValue: '1'},
                                    {name: 'hasKidneyProblemCondition', boxLabel: 'Somewhat Confident', inputValue: '2'},
                                    {name: 'hasKidneyProblemCondition', boxLabel: 'Not Confident', inputValue: '5'}
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasCancer',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
                                listeners: {
                                    change: 'onConditionChanged'
                                }
                            },
                            {
                                html: 'Cancer',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'radiogroup',
                                reference: 'hasCancerCondition',
                                disabled: true,
                                fieldLabel: '',
                                labelSeparator: '',
                                labelAlign: 'top',
                                //columns: 4,
                                vertical: false,
                                items: [
                                    {name: 'hasCancerCondition', boxLabel: 'Pretty Confident', inputValue: '1'},
                                    {name: 'hasCancerCondition', boxLabel: 'Somewhat Confident', inputValue: '2'},
                                    {name: 'hasCancerCondition', boxLabel: 'Not Confident', inputValue: '5'}
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasVisionProblem',
                                inputValue: 'Y',
                                uncheckedValue: 'N'
                            },
                            {
                                html: 'Vision Problems',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                html: '',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                labelSeparator: '',
                                name: 'hasHearingProblem',
                                inputValue: 'Y',
                                uncheckedValue: 'N'
                            },
                            {
                                html: 'Hearing Problems',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            },
                            {
                                html: '',
                                baseCls: 'x-form-cb-label x-form-cb-label-default'
                            }
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '18. Do you have other medical conditions that we haven\'t listed yet?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'hasMedicalConditions',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'hasMedicalConditions', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'hasMedicalConditions', boxLabel: 'No', inputValue: 'N'}
                        ],
                        listeners: {
                            change: 'onHasMedicalConditionsChange'
                        }
                    },
                        {
                            xtype: 'checkboxgroup',
                            reference: 'medicalConditions',
                            margin: '25 0 0 0',
                            fieldLabel: 'If yes, check all that apply',
                            labelSeparator: '',
                            labelAlign: 'top',
                            // Arrange radio buttons into three columns, distributed vertically
                            columns: 3,
                            vertical: false,
                            items: [
                                {name: 'medicalConditions', boxLabel: 'Amputation', inputValue: 'Amputation'},
                                {name: 'medicalConditions', boxLabel: 'Anemia', inputValue: 'Anemia'},
                                {name: 'medicalConditions', boxLabel: 'Ankle Leg Swelling', inputValue: 'Ankle Leg Swelling'},
                                {name: 'medicalConditions', boxLabel: 'Arthritis', inputValue: 'Arthritis'},
                                {name: 'medicalConditions', boxLabel: 'Brain Injury', inputValue: 'Brain Injury'},
                                {name: 'medicalConditions', boxLabel: 'Cerebral Palsy', inputValue: 'Cerebral Palsy'},
                                {name: 'medicalConditions', boxLabel: 'Chronic Wound', inputValue: 'Chronic Wound'},
                                {name: 'medicalConditions', boxLabel: 'Cirrhosis', inputValue: 'Cirrhosis'},
                                {name: 'medicalConditions', boxLabel: 'Dialysis', inputValue: 'Dialysis'},
                                {name: 'medicalConditions', boxLabel: 'Hepatitis', inputValue: 'Hepatitis'},
                                {name: 'medicalConditions', boxLabel: 'HIV/AIDS', inputValue: 'HIV/AIDS'},
                                {name: 'medicalConditions', boxLabel: 'Mental Retardation', inputValue: 'Mental Retardation'},
                                {name: 'medicalConditions', boxLabel: 'Multiple Sclerosis', inputValue: 'Multiple Sclerosis'},
                                {name: 'medicalConditions', boxLabel: 'Osteoporosis', inputValue: 'Osteoporosis'},
                                {name: 'medicalConditions', boxLabel: 'Other heart conditions including heart valve disorders', inputValue: 'Other heart conditions including heart valve disorders'},
                                {name: 'medicalConditions', boxLabel: 'Pancreatitis', inputValue: 'Pancreatitis'},
                                {name: 'medicalConditions', boxLabel: 'Paralysis/Quadriplegia', inputValue: 'Paralysis/Quadriplegia'},
                                {name: 'medicalConditions', boxLabel: 'Parkinson\'s', inputValue: 'Parkinson\'s'},
                                {name: 'medicalConditions', boxLabel: 'Recent Fracture', inputValue: 'Recent Fracture'},
                                {name: 'medicalConditions', boxLabel: 'Seizure Disorder', inputValue: 'Seizure Disorder'},
                                {name: 'medicalConditions', boxLabel: 'Sickle Cell Disease', inputValue: 'Sickle Cell Disease'},
                                {name: 'medicalConditions', boxLabel: 'Spina Bfida', inputValue: 'Spina Bfida'},
                                {name: 'medicalConditions', boxLabel: 'Spinal Cord Injury', inputValue: 'Spinal Cord Injury'},
                                {name: 'medicalConditions', boxLabel: 'Transplant', inputValue: 'Transplant'},
                                {name: 'medicalConditions', boxLabel: 'Other', inputValue: 'Other',
                                    listeners: {
                                        change: 'onMedicalConditionsOtherChange'
                                    }
                                }
                            ],
                            disabled: true // initial state is disabled
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Other Medical Condition',
                            name: 'medicalConditionsOther',
                            reference: 'medicalConditionsOther',
                            disabled: true
                        }]
                },{
                    xtype: 'fieldset',
                    title: '19. Has a doctor told you that you have memory loss or are you being treated for serious memory problems?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'hasMemoryLoss',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'hasMemoryLoss', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'hasMemoryLoss', boxLabel: 'No', inputValue: 'N'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'treatedChronicPain',
                        fieldLabel: '20. Are you currently being treated for chronic pain?',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'treatedChronicPain', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'treatedChronicPain', boxLabel: 'No', inputValue: 'N'}
                        ],
                        listeners: {
                            change: 'onTreatedChronicPainChange'
                        }
                    },
                        {
                            xtype: 'radiogroup',
                            reference: 'chronicPainOptionsGroup',
                            margin: '25 0 0 0',
                            fieldLabel: 'If Yes, Please rate your pain on a scale of 0-10',
                            labelSeparator: '',
                            labelAlign: 'top',
                            disabled: true,
                            // Arrange radio buttons into two columns, distributed vertically
                            columns: 5,
                            vertical: false,
                            items: [
                                {name: 'chronicPainOptions', boxLabel: '0-1 No Pain', inputValue: '01'},
                                {name: 'chronicPainOptions', boxLabel: '2-3 Mild', inputValue: '02'},
                                {name: 'chronicPainOptions', boxLabel: '4-7 Moderate', inputValue: '03'},
                                {name: 'chronicPainOptions', boxLabel: '8-9 Severe', inputValue: '04'},
                                {name: 'chronicPainOptions', boxLabel: '10 Worst', inputValue: '05'}
                            ]
                        }]
                },{
                    xtype: 'fieldset',
                    title: '21. How many times have you been to the Emergency Room in the past 12 months?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'erPast12months',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 5,
                        vertical: false,
                        items: [
                            {name: 'erPast12months', boxLabel: 'N/A', inputValue: '00'},
                            {name: 'erPast12months', boxLabel: 'None', inputValue: '01'},
                            {name: 'erPast12months', boxLabel: 'Once', inputValue: '02'},
                            {name: 'erPast12months', boxLabel: '2 or 3 Times', inputValue: '03'},
                            {name: 'erPast12months', boxLabel: 'More than 3 Times', inputValue: '04'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '22. How many times have you stayed overnight as a patient in the hospital in the past 12 months?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'patientHospMedicalCondition',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 5,
                        vertical: false,
                        items: [
                            {name: 'patientHospMedicalCondition', boxLabel: 'N/A', inputValue: '00'},
                            {name: 'patientHospMedicalCondition', boxLabel: 'None', inputValue: '01'},
                            {name: 'patientHospMedicalCondition', boxLabel: 'Once', inputValue: '02'},
                            {name: 'patientHospMedicalCondition', boxLabel: '2 or 3 Times', inputValue: '03'},
                            {name: 'patientHospMedicalCondition', boxLabel: 'More than 3 Times', inputValue: '04'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '23. How many times have you visited a physician or clinic in the past 12 months?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'phyClinicPast12months',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 5,
                        vertical: false,
                        items: [
                            {name: 'phyClinicPast12months', boxLabel: 'N/A', inputValue: '00'},
                            {name: 'phyClinicPast12months', boxLabel: 'None', inputValue: '01'},
                            {name: 'phyClinicPast12months', boxLabel: 'Once', inputValue: '02'},
                            {name: 'phyClinicPast12months', boxLabel: '2 or 3 Times', inputValue: '03'},
                            {name: 'phyClinicPast12months', boxLabel: 'More than 3 Times', inputValue: '04'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '24. How many times have you stayed in a hospital for psychiatric treatment in the past 12 months?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'overnightPsychHospital',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 5,
                        vertical: false,
                        items: [
                            {name: 'overnightPsychHospital', boxLabel: 'N/A', inputValue: '00'},
                            {name: 'overnightPsychHospital', boxLabel: 'None', inputValue: '01'},
                            {name: 'overnightPsychHospital', boxLabel: 'Once', inputValue: '02'},
                            {name: 'overnightPsychHospital', boxLabel: '2 or 3 Times', inputValue: '03'},
                            {name: 'overnightPsychHospital', boxLabel: 'More than 3 Times', inputValue: '04'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '25. How many times have you visited a therapist or psychiatrist in the past 12 months?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'therapistPsychVisits',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 5,
                        vertical: false,
                        items: [
                            {name: 'therapistPsychVisits', boxLabel: 'N/A', inputValue: '00'},
                            {name: 'therapistPsychVisits', boxLabel: 'None', inputValue: '01'},
                            {name: 'therapistPsychVisits', boxLabel: 'Once', inputValue: '02'},
                            {name: 'therapistPsychVisits', boxLabel: '2 or 3 Times', inputValue: '03'},
                            {name: 'therapistPsychVisits', boxLabel: 'More than 3 Times', inputValue: '04'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '26. How many times have you been in a skilled nursing facility in the past 12 months?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'snfPast12Months',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 5,
                        vertical: false,
                        items: [
                            {name: 'snfPast12Months', boxLabel: 'N/A', inputValue: '00'},
                            {name: 'snfPast12Months', boxLabel: 'None', inputValue: '01'},
                            {name: 'snfPast12Months', boxLabel: 'Once', inputValue: '02'},
                            {name: 'snfPast12Months', boxLabel: '2 or 3 Times', inputValue: '03'},
                            {name: 'snfPast12Months', boxLabel: 'More than 3 Times', inputValue: '04'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '27. Have you fallen 2 or more times in the past year?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'haveFallen',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'haveFallen', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'haveFallen', boxLabel: 'No', inputValue: 'N'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '28. Are you afraid of falling?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'afraidOfFalling',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'afraidOfFalling', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'afraidOfFalling', boxLabel: 'No', inputValue: 'N'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '29. Do you have difficulty with any of the following activities due to your health or physical conditions?',

                    items: [                    {
                        xtype: 'checkboxgroup',
                        reference: 'hasMedicalConditionsGroup',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into three columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {
                                name: 'hasMedicalConditionsGroup',
                                boxLabel: 'Shopping for personal items',
                                name: 'shopPersonalItems',
                                inputValue: 'Y',
                                uncheckedValue: 'N'
                            },
                            {name: 'hasMedicalConditionsGroup', boxLabel: 'Preparing Meals', name: 'prepareMeals', inputValue: 'Y', uncheckedValue: 'N'},
                            {
                                name: 'hasMedicalConditionsGroup',
                                boxLabel: 'Managing money (keeping track of expenses/paying bills)',
                                name: 'manageMoney',
                                inputValue: 'Y',
                                uncheckedValue: 'N'
                            },
                            {
                                name: 'hasMedicalConditionsGroup',
                                boxLabel: 'Walking across the room',
                                name: 'walkAcrossRoom',
                                inputValue: 'Y',
                                uncheckedValue: 'N'
                            },
                            {name: 'hasMedicalConditionsGroup', boxLabel: 'Bathing or showering', name: 'bathOrShower', inputValue: 'Y', uncheckedValue: 'N'},
                            {name: 'hasMedicalConditionsGroup', boxLabel: 'Going to work', name: 'goingToWork', inputValue: 'Y', uncheckedValue: 'N'},
                            {
                                name: 'hasMedicalConditionsGroup',
                                boxLabel: 'Taking medications',
                                name: 'hasTroubleTakingMedications',
                                inputValue: 'Y',
                                uncheckedValue: 'N'
                            }
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '30. Do you need help at home due to your health problems?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'needHelpBecauseHealthProblems',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'needHelpBecauseHealthProblems', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'needHelpBecauseHealthProblems', boxLabel: 'No', inputValue: 'N'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '31. Do you have any special equipment needs?',
                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'hasEquipmentNeeds',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'hasEquipmentNeeds', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'hasEquipmentNeeds', boxLabel: 'No', inputValue: 'N'}
                        ],
                        listeners: {
                            change: 'onHasEquipmentNeedsChange'
                        }
                    },
                        {
                            xtype: 'checkboxgroup',
                            reference: 'adultEquipment',
                            margin: '25 0 0 0',
                            fieldLabel: 'If Yes, please indicate which one(s) from the list below.',
                            labelSeparator: '',
                            labelAlign: 'top',
                            // Arrange radio buttons into three columns, distributed vertically
                            columns: 3,
                            vertical: false,
                            items: [
                                {name: 'adultEquipment', boxLabel: 'Feeding Tube', inputValue: '01'},
                                {name: 'adultEquipment', boxLabel: 'Oxygen', inputValue: '02'},
                                {name: 'adultEquipment', boxLabel: 'Osotomy Care', inputValue: '03'},
                                {name: 'adultEquipment', boxLabel: 'Catheter Care', inputValue: '04'},
                                {name: 'adultEquipment', boxLabel: 'Suction Machine', inputValue: '05'},
                                {name: 'adultEquipment', boxLabel: 'Tracheotomy Care Supplies', inputValue: '06'},
                                {name: 'adultEquipment', boxLabel: 'Peritoneal Dialysis', inputValue: '07'},
                                {name: 'adultEquipment', boxLabel: 'Ventilator', inputValue: '08'},
                                {name: 'adultEquipment', boxLabel: 'Cane', inputValue: '09'},
                                {name: 'adultEquipment', boxLabel: 'Walker', inputValue: '10'},
                                {name: 'adultEquipment', boxLabel: 'Crutches', inputValue: '11'},
                                {name: 'adultEquipment', boxLabel: 'Wheelchair', inputValue: '12'},
                                {name: 'adultEquipment', boxLabel: 'Motorized Scooter or Wheelchair', inputValue: '13'},
                                {name: 'adultEquipment', boxLabel: 'Hospital Bed', inputValue: '14'},
                                {name: 'adultEquipment', boxLabel: 'Hoyer Lift', inputValue: '15'},
                                {name: 'adultEquipment', boxLabel: 'Lift Chair', inputValue: '16'},
                                {name: 'adultEquipment', boxLabel: 'C-Pap/BiPap', inputValue: '17'},
                                {name: 'adultEquipment', boxLabel: 'Nebulizer', inputValue: '18'},
                                {name: 'adultEquipment', boxLabel: 'Wound Vac/Wound Supplies', inputValue: '19'},
                                {name: 'adultEquipment', boxLabel: 'Special Mattress', inputValue: '20'}
                            ],
                            disabled: true // initial state is disabled
                        }]
                },{
                    xtype: 'fieldset',
                    title: '32. Over the past 2 weeks, have you felt down, depressed, or helpless?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'feelsHelpless',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'feelsHelpless', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'feelsHelpless', boxLabel: 'No', inputValue: 'N'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '33. Over the past 2 weeks, have you had little pleasure in doing things?',

                    items: [{
                        xtype: 'radiogroup',
                        reference: 'littleInterest',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'littleInterest', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'littleInterest', boxLabel: 'No', inputValue: 'N'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '34. Do you have, or have you ever been treate for one or more of the following conditions?',

                    items: [{
                        xtype: 'checkboxgroup',
                        reference: 'hraMentalHealth',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into three columns, distributed vertically
                        columns: 3,
                        vertical: false,
                        items: [
                            {name: 'hraMentalHealth', boxLabel: 'None', inputValue: '01'},
                            {name: 'hraMentalHealth', boxLabel: 'Anxiety Disorder', inputValue: '02'},
                            {name: 'hraMentalHealth', boxLabel: 'Attention Deficit Disorders', inputValue: '03'},
                            {name: 'hraMentalHealth', boxLabel: 'Bipolar Disorder', inputValue: '04'},
                            {name: 'hraMentalHealth', boxLabel: 'Eating Disorder', inputValue: '06'},
                            {name: 'hraMentalHealth', boxLabel: 'Obsessive-Compulsive Disorder', inputValue: '07'},
                            {name: 'hraMentalHealth', boxLabel: 'Personality Disorder', inputValue: '08'},
                            {name: 'hraMentalHealth', boxLabel: 'Post Tramatic Stress Disorder', inputValue: '09'},
                            {name: 'hraMentalHealth', boxLabel: 'Schizophrenia', inputValue: '10'},
                            {name: 'hraMentalHealth', boxLabel: 'Tourette\'s Disorder/TIC Disorder', inputValue: '11'},
                            {name: 'hraMentalHealth', boxLabel: 'Depression', inputValue: '12'},
                            {name: 'hraMentalHealth', boxLabel: 'Suicide Attempt', inputValue: '13'},
                            {name: 'hraMentalHealth', boxLabel: 'Substance Abuse', inputValue: '14'},
                            {name: 'hraMentalHealth', boxLabel: 'Other', inputValue: '15'}
                        ]
                    }]
                }
                ]
            }]
        },
        {
            id: 'card-2',
            cls: 'card-panel',
            title: 'Health Risk Assessment',
            scrollable: true,

            items: [{
                xtype: 'container',
                padding: 7,

                items: [{
                    xtype: 'container',
                    html: '<h2>Medication & Drugs</h2>'
                },{
                    xtype: 'fieldset',
                    title: '35. Do you take any medications that are prescribed by your doctor or healthcare provider?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'takeMedications',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'takeMedications', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'takeMedications', boxLabel: 'No', inputValue: 'N'}
                        ],
                        listeners: {
                            change: 'onTakeMedicationsChange'
                        }
                    },
                        {
                            xtype: 'radiogroup',
                            reference: 'howManyMeds',
                            margin: '25 0 0 0',
                            fieldLabel: 'If Yes: How many different medicines?',
                            labelSeparator: '',
                            labelAlign: 'top',
                            disabled: true,
                            // Arrange radio buttons into two columns, distributed vertically
                            columns: 3,
                            vertical: false,
                            items: [
                                {name: 'howManyMeds', boxLabel: '1-3', inputValue: '1-3'},
                                {name: 'howManyMeds', boxLabel: '4-7', inputValue: '4-7'},
                                {name: 'howManyMeds', boxLabel: '8 or more', inputValue: '8 or more'}
                            ]
                        }]
                },{
                    xtype: 'fieldset',
                    title: '36. How often do you have trouble taking your medication the way you have been told to take them?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'troubleTakingMeds',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 3,
                        vertical: false,
                        items: [
                            {name: 'troubleTakingMeds', boxLabel: 'I always take them as prescribed', inputValue: '01'},
                            {name: 'troubleTakingMeds', boxLabel: 'I sometimes take them as prescribed', inputValue: '02'},
                            {name: 'troubleTakingMeds', boxLabel: 'I seldom take them as prescribed', inputValue: '03'}
                        ],
                        disabled: true
                    }]
                },{
                    xtype: 'fieldset',
                    title: '37. Do you take any over the counter medications or herbal supplements every day?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'takeHerbalSupplement',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'takeHerbalSupplement', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'takeHerbalSupplement', boxLabel: 'No', inputValue: 'N'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '38. Do you smoke or use tobacco products?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'doesSmoke',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 5,
                        vertical: false,
                        items: [
                            {name: 'doesSmoke', boxLabel: 'No', inputValue: '01'},
                            {name: 'doesSmoke', boxLabel: 'Yes, and I might quit', inputValue: '02'},
                            {name: 'doesSmoke', boxLabel: 'Yes, but I\'m not ready to quit', inputValue: '03'},
                            {name: 'doesSmoke', boxLabel: 'Refused', inputValue: '04'},
                            {name: 'doesSmoke', boxLabel: 'Unknown', inputValue: '05'}
                        ],
                        listeners: {
                            change: 'onDoesSmokeChange'
                        }
                    },
                        {
                            xtype: 'radiogroup',
                            name: 'packsPerDay',
                            reference: 'packsPerDayGroup',
                            margin: '25 0 0 0',
                            fieldLabel: 'If Yes: How many packs per day?',
                            labelSeparator: '',
                            labelAlign: 'top',
                            // Arrange radio buttons into two columns, distributed vertically
                            columns: 3,
                            vertical: false,
                            items: [
                                {boxLabel: '1-3', inputValue: '1-3'},
                                {boxLabel: '4-7', inputValue: '4-7'},
                                {boxLabel: '8 or more', inputValue: '8 or more'}
                            ],
                            disabled: true
                        }]
                },{
                    xtype: 'fieldset',
                    title: '39. In the past 4 weeks, how many drinks of wine, beer, or other alcoholic beverages did you have?',

                    items: [                    {
                        xtype: 'radiogroup',
                        name: 'glassesPerDay',
                        reference: 'glassesPerDay',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 3,
                        vertical: false,
                        items: [
                            {boxLabel: '10 or more a week', inputValue: '01'},
                            {boxLabel: '6-9 a week', inputValue: '02'},
                            {boxLabel: '2-5 a week', inputValue: '03'},
                            {boxLabel: '1 drink or less a week', inputValue: '04'},
                            {boxLabel: 'No alcohol at all', inputValue: '05'},
                            {boxLabel: 'Refused', inputValue: '06'},
                            {boxLabel: 'Unknown', inputValue: '07'}
                        ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: '40. Do you use Street drugs or take medications not prescribed to you?',

                    items: [                    {
                        xtype: 'radiogroup',
                        reference: 'useStreetDrugs',
                        labelSeparator: '',
                        labelAlign: 'top',
                        // Arrange radio buttons into two columns, distributed vertically
                        columns: 2,
                        vertical: false,
                        items: [
                            {name: 'useStreetDrugs', boxLabel: 'Yes', inputValue: 'Y'},
                            {name: 'useStreetDrugs', boxLabel: 'No', inputValue: 'N'}
                        ],
                        listeners: {
                            change: 'useStreetDrugsChange'
                        }
                    },
                        {
                            xtype: 'checkboxgroup',
                            reference: 'streetDrugsUsed',
                            margin: '25 0 0 0',
                            fieldLabel: 'If Yes, please indicate which one(s) from the list below.',
                            labelSeparator: '',
                            labelAlign: 'top',
                            disabled: true,
                            // Arrange radio buttons into two columns, distributed vertically
                            columns: 3,
                            vertical: false,
                            items: [
                                {name: 'streetDrugsUsed', boxLabel: 'Amphetamines', inputValue: 'Amphetamines'},
                                {name: 'streetDrugsUsed', boxLabel: 'Cocaine', inputValue: 'Cocaine'},
                                {name: 'streetDrugsUsed', boxLabel: 'Crack', inputValue: 'Crack'},
                                {name: 'streetDrugsUsed', boxLabel: 'Ecstasy', inputValue: 'Ecstasy'},
                                {name: 'streetDrugsUsed', boxLabel: 'Fentanyl', inputValue: 'Fentanyl'},
                                {name: 'streetDrugsUsed', boxLabel: 'Hashish', inputValue: 'Hashish'},
                                {name: 'streetDrugsUsed', boxLabel: 'Heroin', inputValue: 'Heroin'},
                                {name: 'streetDrugsUsed', boxLabel: 'Inhalants', inputValue: 'Inhalants'},
                                {name: 'streetDrugsUsed', boxLabel: 'LSD', inputValue: 'LSD'},
                                {name: 'streetDrugsUsed', boxLabel: 'Marijuana', inputValue: 'Marijuana'},
                                {name: 'streetDrugsUsed', boxLabel: 'MDMA (Ecstasy)', inputValue: 'MDMA (Ecstasy)'},
                                {name: 'streetDrugsUsed', boxLabel: 'Mescaline', inputValue: 'Mescaline'},
                                {name: 'streetDrugsUsed', boxLabel: 'Methamphetamine', inputValue: 'Methamphetamine'},
                                {name: 'streetDrugsUsed', boxLabel: 'Methcathinone', inputValue: 'Methcathinone'},
                                {name: 'streetDrugsUsed', boxLabel: 'Opium', inputValue: 'Opium'},
                                {name: 'streetDrugsUsed', boxLabel: 'PCP', inputValue: 'PCP'},
                                {name: 'streetDrugsUsed', boxLabel: 'Refused', inputValue: 'Refused'},
                                {name: 'streetDrugsUsed', boxLabel: 'Steroids', inputValue: 'Steroids'},
                                {name: 'streetDrugsUsed', boxLabel: 'Unknown', inputValue: 'Unknown'}
                            ]
                        }]
                }
                ]
            }]
        }
    ]
});