Ext.define('Atlas.portals.view.prescriber.CreatePriorAuth', {
    extend: 'Ext.Container',

    title: 'Create Prior Auth',

    scrollable: 'y',

    controller: 'portalsPrescriberCreatePriorAuthController',

    viewModel: 'portalsPrescriberCreatePriorAuthModel',

    layout: 'border',

    items: [
        {
            xtype: 'form',
            cls: 'formPanel',
            reference: 'priorAuthForm',

            region: 'north',

            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            defaults: {
                flex: 1
            },

            bbar: {
                xtype: 'container',

                items: {
                    xtype: 'displayfield',

                    fieldLabel: '<span style="color: red; font-size: smaller;">Asterisk (*) indicates this information is required.</span>',

                    labelSeparator: ' '
                }
            },

            items: [
                {
                    xtype: 'panel',
                    cls: 'card-panel',
                    title: 'Contract Entity Information',

                    defaults: {
                        minWidth: 350,
                        flex: 1,
                        labelWidth: 106
                    },

                    items: [
                        {
                            xtype: 'textfield',
                            hidden: true,
                            reference: 'AuthId',
                            name: 'AuthId'
                        },
                        {
                            xtype: 'container',

                            layout: {
                                type: 'hbox',

                                align: 'center'
                            },

                            width: 423,

                            items: [
                                {
                                    xtype: 'portalmembertypeahead',
                                    flex: 1,
                                    reference: 'MemberName',
                                    name: 'MemberName',
                                    fieldLabel: 'Member',
                                    labelWidth: 106,
                                    valueField: 'MemberName',
                                    hideLabel: false,
                                    allowBlank: false,

                                    listeners: {
                                        select: 'onMemberSelected'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Search',
                                    iconCls: 'x-fa fa-search',
                                    handler: 'showMemberWindow'
                                }
                            ]

                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            reference: 'RecipientId',
                            name: 'RecipientId'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            reference: 'MemberId',
                            name: 'MemberId'
                        },
                        {
                            xtype: 'datefield',
                            reference: 'memberDOB',
                            name: 'memberDOB',
                            fieldLabel: 'DOB',
                            format: 'Y/m/d',
                            allowBlank: false
                        },
                        {
                            xtype: 'combo',
                            reference: 'MemberGender',
                            name: 'MemberGender',
                            fieldLabel: 'Gender',
                            emptyText: 'Select Gender',
                            displayField: 'text',
                            valueField: 'value',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            reference: 'MemberPhone',
                            name: 'MemberPhone',
                            fieldLabel: 'Contact No',
                            emptyText: '(123) 456-7894',
                            maskRe: new RegExp(/[0-9\()\-]/),
                            maxLength: 14,
                            enableKeyEvents: true,

                            listeners: {
                                keypress: 'formatPhone'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',

                            items: [
                                {
                                    xtype: 'combo',
                                    reference: 'heightFt',
                                    fieldLabel: 'Height Ft. In',
                                    emptyText: 'Feet',
                                    minWidth: 221,
                                    maxWidth: 221,
                                    labelWidth: 106,
                                    displayField: 'value',
                                    valueField: 'value',

                                    listeners: {
                                        select: 'formatHeight'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    reference: 'heightIn',
                                    emptyText: 'Inch',
                                    minWidth: 125,
                                    maxWidth: 125,
                                    displayField: 'value',
                                    valueField: 'value',

                                    listeners: {
                                        select: 'formatHeight'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    hidden: true,
                                    name: 'MemberHt',
                                    reference: 'MemberHt'
                                }
                            ]
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'MemberWt',
                            name: 'MemberWt',
                            fieldLabel: 'Weight Lbs'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',

                            items: [
                                {
                                    xtype: 'numberfield',
                                    reference: 'MemberBMI',
                                    name: 'MemberBMI',
                                    fieldLabel: 'BMI',
                                    labelWidth: 106
                                },
                                {
                                    xtype: 'datefield',
                                    reference: 'MemberBMIDate',
                                    format: 'Y/m/d',
                                    name: 'MemberBMIDate',
                                    emptyText: 'Date Calculated'
                                }
                            ]
                        },
                        {
                            xtype: 'container',

                            layout: 'hbox',

                            items: [
                                {
                                    xtype: 'textfield',
                                    reference: 'MemberBP',
                                    name: 'MemberBP',
                                    fieldLabel: 'Blood Pressure',
                                    labelWidth: 106,
                                    emptyText: '123-456'
                                },
                                {
                                    xtype: 'datefield',
                                    reference: 'MemberBPDate',
                                    format: 'Y/m/d',
                                    name: 'MemberBPDate',
                                    emptyText: 'Taken On'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',

                    cls: 'card-panel',

                    title: 'Medication Information',

                    defaults: {
                        minWidth: 350,
                        flex: 1,
                        labelWidth: 117,
                        allowBlank: false
                    },

                    items: [
                        {
                            xtype: 'portalmedicationtypeahead',

                            emptyText: '[e.g. Nexium]',

                            reference: 'Medication',

                            name: 'Medication',

                            fieldLabel: 'Medication:',

                            listeners: {
                                select: 'onMedicationSelected'
                            },

                            width: 350
                        },
                        {
                            xtype: 'textfield',

                            hidden: true,

                            reference: 'GCNSeqNo',

                            name: 'GCNSeqNo'
                        },
                        {
                            xtype: 'textfield',

                            hidden: true,

                            reference: 'NDC',

                            name: 'NDC'
                        },
                        {
                            xtype: 'textarea',

                            reference: 'Strength',

                            name: 'Strength',

                            fieldLabel: 'Strength and <br> route of <br> Administration'
                        },
                        {
                            xtype: 'textfield',

                            reference: 'FREQUENCY',

                            name: 'FREQUENCY',

                            fieldLabel: 'Frequency'
                        },
                        {
                            xtype: 'textfield',

                            reference: 'Quantity',

                            name: 'Quantity',

                            fieldLabel: 'Quantity'
                        },
                        {
                            xtype: 'textfield',

                            reference: 'Diagnosis',

                            name: 'Diagnosis',

                            fieldLabel: 'Diagnosis'
                        },
                        {
                            xtype: 'textarea',

                            reference: 'Rationale',

                            name: 'Rationale',

                            fieldLabel: 'Rationale',

                            style: {
                                marginBottom: '10px'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',

                    cls: 'card-panel',

                    title: 'Prescriber Information',

                    defaults: {
                        minWidth: 350,
                        flex: 1,
                        labelWidth: 130,
                        allowBlank: false,
                        xtype: 'textfield'
                    },

                    items: [
                        {
                            reference: 'PrescriberName',

                            name: 'PrescriberName',

                            fieldLabel: 'Prescriber Name'
                        },
                        {
                            reference: 'PrescriberNPI',

                            name: 'PrescriberNPI',

                            fieldLabel: 'NPI'
                        },
                        {
                            reference: 'Specialty',

                            name: 'Specialty',

                            fieldLabel: 'Specialty'
                        },
                        {
                            reference: 'PresPhone',

                            name: 'PresPhone',

                            fieldLabel: 'Office Phone',

                            maskRe: new RegExp(/[0-9\()\-]/),

                            maxLength: 14,

                            enableKeyEvents: true,

                            listeners: {
                                keypress: 'formatPhone'
                            }
                        },
                        {
                            reference: 'PresFax',

                            name: 'PresFax',

                            fieldLabel: 'Office Fax',

                            maskRe: new RegExp(/[0-9\()\-]/),

                            maxLength: 14,

                            enableKeyEvents: true,

                            listeners: {
                                keypress: 'formatPhone'
                            }
                        },
                        {
                            reference: 'PresContactPerson',

                            name: 'PresContactPerson',

                            fieldLabel: 'Contact Person'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',

            region: 'center',

            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            defaults: {
                flex: 1
            },

            items: [
                {
                    xtype: 'container',

                    layout: 'border',

                    items: [
                        {
                            xtype: 'gridpanel',

                            region: 'north',

                            height: 250,

                            title: 'Drug Allergies',

                            cls: 'card-panel',

                            reference: 'allergyGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{memberAllergies}'
                            },

                            listeners: {
                                canceledit: 'cancelAllergyUpdate',
                                beforeedit: 'maybeEditAllergy'
                            },

                            columns: [
                                {
                                    text: 'Allergen',
                                    dataIndex: 'CONCEPT_ID_DESC',
                                    flex: 1,
                                    editor: {
                                        xtype: 'allergentypeahead',
                                        allowBlank: false,
                                        listeners: {
                                            select: 'setAllergenType'
                                        }
                                    }
                                },
                                { text: 'Allergen Concept Type', dataIndex: 'DAM_CONCEPT_ID_TYP_DESC', flex: 1 },
                                { text: 'Editable', dataIndex: 'Editable', hidden: true }
                            ],

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'button',

                                        text: 'Add',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addAllergy',

                                        bind: {
                                            disabled: '{viewOnly}'
                                        }
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Remove',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeAllergy',

                                        bind: {
                                            disabled: '{viewOnly}'
                                        }
                                    }
                                ]
                            },

                            bbar: {
                                xtype: 'pagingtoolbar',

                                displayInfo: true,

                                emptyMsg: 'No allergies to display.'
                            }
                        },
                        {
                            xtype: 'gridpanel',

                            region: 'center',

                            title: 'Previously Attempted Therapies',

                            cls: 'card-panel',

                            reference: 'therapyGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{previousTherapies}'
                            },

                            listeners: {
                                edit: 'updateTherapy',
                                canceledit: 'cancelTherapyUpdate'
                            },

                            columns: [
                                {
                                    text: 'Medication',
                                    dataIndex: 'Medication',
                                    flex: 1,
                                    editor: {
                                        xtype: 'portalmedicationtypeahead',
                                        emptyText: '[e.g. Nexium]',
                                        allowBlank: false
                                    }
                                },
                                {
                                    xtype: 'datecolumn',
                                    format: 'Y/m/d',
                                    text: 'Failure Date',
                                    dataIndex: 'FailureDate',
                                    flex: 1,
                                    editor: {
                                        xtype: 'datefield',
                                        allowBlank: false,
                                        format: 'm/d/Y',
                                        blankText: 'Failure date is required.'
                                    }
                                },
                                {
                                    text: 'Result of Therapy',
                                    dataIndex: 'TherResult',
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                }
                            ],

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'button',

                                        text: 'Add',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addTherapy',

                                        bind: {
                                            disabled: '{viewOnly}'
                                        }
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Remove',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeTherapy',

                                        bind: {
                                            disabled: '{viewOnly}'
                                        }
                                    }
                                ]
                            },

                            bbar: {
                                xtype: 'pagingtoolbar',

                                displayInfo: true,

                                emptyMsg: 'No therapies to display.'
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',

                    cls: 'card-panel',

                    title: 'Fax Attachments',

                    bind: {
                        store: '{fileAttachments}'
                    },

                    columns: [
                        {
                            xtype: 'actioncolumn',
                            menuDisabled: true,
                            sortable: false,
                            align: 'center',
                            text: 'View',
                            items: [{
                                xtype: 'button',
                                handler: 'openAttachment',
                                iconCls: 'x-fa fa-file-pdf-o'
                            }]
                        },
                        {
                            text: 'Description',
                            dataIndex: 'AttcDescr',
                            flex: 1
                        },
                        {
                            text: 'Date',
                            dataIndex: 'AttcDate',
                            flex: 1,
                            renderer: function(value) {
                                var date = '';

                                if (!value) { return date; }
                                date = new Date(value);
                                date.setDate(date.getDate() + 1);
                                return Ext.Date.format(date, 'Y/m/d');
                            }
                        },
                        {
                            text: 'AttachDocID',
                            dataIndex: 'DocumentID',
                            hidden: true
                        }
                    ],

                    tbar: {
                        xtype: 'toolbar',
                        items: {
                            xtype: 'button',
                            text: 'Add Attachment',
                            iconCls: 'x-fa fa-paperclip',
                            handler: 'addAttachment',
                            bind: {
                                disabled: '{viewOnly}'
                            }
                        }

                    },

                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        emptyMsg: 'No attachments to display.'
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',

            region: 'south',

            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'handleSave',
                    reference: 'saveButton',
                    bind: {
                        disabled: '{viewOnly}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Submit PA Request',
                    iconCls: 'x-fa fa-plus-circle',
                    handler: 'handleSubmit',
                    reference: 'submitButton',
                    bind: {
                        disabled: '{submitDisabled}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    iconCls: 'x-fa fa-times-circle',
                    handler: 'clearControls',
                    reference: 'cancelButton',
                    bind: {
                        disabled: '{viewOnly}'
                    }
                }
            ]
        }
    ]
});