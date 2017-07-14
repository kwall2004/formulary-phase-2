/**
 * Created by j2560 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.view.contactdetails.Main', {
    extend: 'Ext.panel.Panel',
    title: 'Contact Details',
    xtype: 'benefitplancontactdetails',
    controller: 'contactdetails',
    modelValidation: true, listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        formulas: {
            priorityRange: {
                single: true,
                get: function () {
                    var myArray = [];
                    myArray[0] = ['Select', null];
                    for (var i = 1; i <= 20; i++) {
                        myArray[i] = [i, i];
                    }
                    return {
                        fields: ['display', 'value'],
                        data: myArray
                    };
                }
            }
        },
        data: {
            contactsGrid: null,
            editingGrid: false,
            changed: false,
            validforms: false
        },
        stores: {
            entitycontacts: {
                model: 'Atlas.benefitplan.model.EntityContact',
                remoteFilter: true
            },
            communicationtypes: {
                fields: ['commValue', 'commType'],
                data: [
                    [1, "Phone"],
                    [2, "Fax"],
                    [3, "EMail"]
                ]
            },
            countrycodes: {
                model: 'Atlas.benefitplan.model.CountryCode',
                autoLoad: true
            },
            stateprovincecodes: {
                model: 'Atlas.benefitplan.model.StateProvinceCode',
                proxy: {
                    extraParams: {
                        isoCountryCodeSK: 1
                    },
                    type: 'benefitplan',
                    url: '/stateprovincecode'
                }
            }
        }
    },
    atlasId: 0,
    rootSK: 0,
    entityType: 0,
    efctvStartDt: 0,
    efctvEndDt: 0,
    layout: 'border',
    items: [{
        xtype: 'panel',
        title: 'Tenant Hierarchy',
        region: 'west',
        split: true,
        width: 250,
        collapsible: true,
        collapseDirection: 'left',
        layout: 'fit',
        items: [{
            xtype: 'benefitplan-tenanthierarchy-tree'
        }]
    }, {
        xtype: 'form',
        itemId: 'contact-details-section',
        reference: 'contactForm',
        region: 'center',
        title: 'Contacts',
        scrollable: 'true',
        layout: 'fit',
        items: [{
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                width: '50%'
            },
            items: [{
                xtype: 'fieldset',
                title: 'Contacts',
                items: [{
                    xtype: 'grid',
                    width: '100%',
                    bind: '{entitycontacts}',
                    reference: 'contactsGrid',
                    listeners: {
                        select: 'contactDetailSelect'
                    },
                    viewConfig: {
                        loadMask: false
                    },
                    columns: [{
                        text: 'First Name',
                        dataIndex: 'FirstName',
                        flex: 1
                    }, {
                        text: 'Last Name',
                        dataIndex: 'LastName',
                        flex: 1
                    }, {
                        text: 'Company',
                        dataIndex: 'Company',
                        flex: 1
                    }, {
                        text: 'Responsibility',
                        dataIndex: 'CntctRespCode',
                        flex: 1
                    }]
                }, {
                    xtype: 'checkbox',
                    boxLabel: 'View only Active Contacts',
                    reference: 'activeContacts',
                    checked: false,
                    listeners: {
                        change: 'onActiveCheck'
                    }
                }]
            }, {
                xtype: 'fieldset',
                title: 'Contact Detail',
                scrollable: 'y',
                layout: 'vbox',
                bind: {
                    disabled: '{!contactsGrid.selection}'
                },
                defaults: {
                    xtype: 'fieldset',
                    width: '100%'
                },
                items: [{
                    title: 'Contact Name',
                    reference: 'contactDetailContainer',
                    defaults: {
                        xtype: 'textfield',
                        listeners: {
                            change: 'onItemChanged'
                        },
                        required: true
                    },
                    items: [{
                        xtype: 'container',
                        itemId: 'contactDetailSections',
                        width: '100%',
                        plugins: 'responsive',
                        responsiveConfig: {
                            'width < 1500': {
                                layout: {
                                    type: 'box',
                                    vertical: true,
                                    pack: 'start'
                                }
                            },
                            'width >= 1500': {
                                layout: {
                                    type: 'box',
                                    vertical: false,
                                    pack: 'center'
                                }
                            }
                        },
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 130,
                            listeners: {
                                change: 'onItemChanged'
                            },
                            required: true
                        },
                        items: [{
                            fieldLabel: 'First Name:',
                            plugins: 'responsive',
                            labelWidth: 130,
                            responsiveConfig: {
                                'width < 1500': {
                                    width: '100%'
                                },
                                'width >= 1500': {
                                    width: '50%'
                                }
                            },
                            bind: '{contactsGrid.selection.FirstName}'
                        }, {
                            fieldLabel: 'Last Name:',
                            plugins: 'responsive',
                            labelWidth: 130,
                            responsiveConfig: {
                                'width < 1500': {
                                    width: '100%'
                                },
                                'width >= 1500': {
                                    width: '50%'
                                }
                            },
                            bind: '{contactsGrid.selection.LastName}'
                        }]
                    }, {
                        fieldLabel: 'Print Name:',
                        plugins: 'responsive',
                        labelWidth: 130,
                        responsiveConfig: {
                            'width < 1500': {
                                width: '99%'
                            },
                            'width >= 1500': {
                                width: '50%'
                            }
                        },
                        bind: '{contactsGrid.selection.PrintName}'
                    }, {
                        fieldLabel: 'Title:',
                        plugins: 'responsive',
                        labelWidth: 130,
                        responsiveConfig: {
                            'width < 1500': {
                                width: '99%'
                            },
                            'width >= 1500': {
                                width: '50%'
                            }
                        },
                        bind: '{contactsGrid.selection.Title}'
                    }, {
                        fieldLabel: 'Company:',
                        plugins: 'responsive',
                        labelWidth: 130,
                        responsiveConfig: {
                            'width < 1500': {
                                width: '99%'
                            },
                            'width >= 1500': {
                                width: '50%'
                            }
                        },
                        bind: '{contactsGrid.selection.Company}'
                    }, {
                        fieldLabel: 'Responsibility:',
                        plugins: 'responsive',
                        labelWidth: 130,
                        responsiveConfig: {
                            'width < 1500': {
                                width: '99%'
                            },
                            'width >= 1500': {
                                width: '50%'
                            }
                        },
                        bind: '{contactsGrid.selection.CntctRespCode}'
                    }, {
                        xtype: 'container',
                        itemId: 'contactDetailSection',
                        width: '100%',
                        plugins: 'responsive',
                        responsiveConfig: {
                            'width < 1500': {
                                layout: {
                                    type: 'box',
                                    vertical: true,
                                    pack: 'start'
                                }
                            },
                            'width >= 1500': {
                                layout: {
                                    type: 'box',
                                    vertical: false,
                                    pack: 'center'
                                }
                            }
                        },
                        defaults: {
                            listeners: {
                                change: 'onItemChanged'
                            },
                            required: true
                        },
                        items: [{
                            xtype: 'datefield',
                            fieldLabel: 'Effective Start Date:',
                            reference: 'contactStartDate',
                            name: 'EfctvStartDt',
                            itemId: 'EfctvStartDt',
                            format: 'n/j/Y',
                            validator: function (val) {
                                return (new Date(val) < new Date(this.up().up().down('[itemId="EfctvEndDt"]').getValue())) ? true : "Must be less than Effective End Date";
                            },
                            labelWidth: 130,
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1500': {
                                    width: '100%'
                                },
                                'width >= 1500': {
                                    width: '50%'
                                }
                            },
                            bind: '{contactsGrid.selection.EfctvStartDt}'
                        }, {
                            xtype: 'combobox',
                            reference: 'priorityCombo',
                            fieldLabel: 'Priority',
                            displayField: 'display',
                            allowBlank: false,
                            editable: false,
                            selectOnFocus: false,
                            valueField: 'value',
                            emptyText: 'Select',
                            plugins: 'responsive',
                            labelWidth: 130,
                            responsiveConfig: {
                                'width < 1500': {
                                    width: '100%'
                                },
                                'width >= 1500': {
                                    width: '50%'
                                }
                            },
                            bind: {store: '{priorityRange}'}
                        }]
                    }, {
                        xtype: 'datefield',
                        format: 'n/j/Y',
                        name: 'EfctvEndDt',
                        itemId: 'EfctvEndDt',
                        fieldLabel: 'Effective End Date:',
                        reference: 'contactEndDate',
                        validator: function (val) {
                            return (new Date(val) > new Date(this.up().down('[itemId="contactDetailSection"]').down('[itemId="EfctvStartDt"]').getValue())) ? true : "Must be greater than Effective Start Date";
                        },
                        plugins: 'responsive',
                        labelWidth: 130,
                        responsiveConfig: {
                            'width < 1500': {
                                width: '99%'
                            },
                            'width >= 1500': {
                                width: '50%'
                            }
                        },
                        bind: '{contactsGrid.selection.EfctvEndDt}'
                    }]
                },
                    {
                        title: 'Contact Address',
                        reference: 'contactAddressContainer',
                        defaults: {
                            xtype: 'container',
                            width: '100%',
                            required: true
                        },
                        items: [{
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1500': {
                                    layout: {
                                        type: 'box',
                                        vertical: true,
                                        pack: 'start'
                                    }
                                },
                                'width >= 1500': {
                                    layout: {
                                        type: 'box',
                                        vertical: false,
                                        pack: 'center'
                                    }
                                }
                            },
                            defaults: {
                                listeners: {
                                    change: 'onItemChanged'
                                },
                                required: true
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Address 1:',
                                plugins: 'responsive',
                                labelWidth: 130,
                                responsiveConfig: {
                                    'width < 1500': {
                                        width: '100%'
                                    },
                                    'width >= 1500': {
                                        width: '50%'
                                    }
                                },
                                bind: '{contactsGrid.selection.ContactAddress.AddrLine1}'
                            }, {
                                fieldLabel: 'State:',
                                xtype: 'combobox',
                                reference: 'stateProvinceCode',
                                minChars: 1,
                                queryMode: 'local',
                                allowBlank: false,
                                typeAhead: true,
                                displayField: 'StPrvncDesc',
                                valueField: 'StPrvncCodeSK',
                                plugins: 'responsive',
                                labelWidth: 130,
                                responsiveConfig: {
                                    'width < 1500': {
                                        width: '100%'
                                    },
                                    'width >= 1500': {
                                        width: '50%'
                                    }
                                },
                                bind: {
                                    store: '{stateprovincecodes}',
                                    disabled: '{!countryCode.value}'
                                }
                            }]
                        },
                            {
                                plugins: 'responsive',
                                responsiveConfig: {
                                    'width < 1500': {
                                        layout: {
                                            type: 'box',
                                            vertical: true,
                                            pack: 'start'
                                        }
                                    },
                                    'width >= 1500': {
                                        layout: {
                                            type: 'box',
                                            vertical: false,
                                            pack: 'center'
                                        }
                                    }
                                },
                                defaults: {
                                    xtype: 'textfield',
                                    listeners: {
                                        change: 'onItemChanged'
                                    },
                                    required: true
                                },
                                items: [{
                                    fieldLabel: 'Address 2:',
                                    plugins: 'responsive',
                                    labelWidth: 130,
                                    responsiveConfig: {
                                        'width < 1500': {
                                            width: '100%'
                                        },
                                        'width >= 1500': {
                                            width: '50%'
                                        }
                                    },
                                    bind: '{contactsGrid.selection.ContactAddress.AddrLine2}'
                                }, {
                                    fieldLabel: 'Postal Code:',
                                    plugins: 'responsive',
                                    labelWidth: 130,
                                    responsiveConfig: {
                                        'width < 1500': {
                                            width: '100%'
                                        },
                                        'width >= 1500': {
                                            width: '50%'
                                        }
                                    },
                                    bind: '{contactsGrid.selection.ContactAddress.PostalCode}'
                                }]
                            },
                            {
                                plugins: 'responsive',
                                responsiveConfig: {
                                    'width < 1500': {
                                        layout: {
                                            type: 'box',
                                            vertical: true,
                                            pack: 'start'
                                        }
                                    },
                                    'width >= 1500': {
                                        layout: {
                                            type: 'box',
                                            vertical: false,
                                            pack: 'center'
                                        }
                                    }
                                },
                                defaults: {
                                    xtype: 'textfield',
                                    listeners: {
                                        change: 'onItemChanged'
                                    },
                                    vtype: 'atlasAlphaNum'
                                },
                                items: [{
                                    fieldLabel: 'City:',
                                    bind: '{contactsGrid.selection.ContactAddress.City}',
                                    plugins: 'responsive',
                                    labelWidth: 130,
                                    responsiveConfig: {
                                        'width < 1500': {
                                            width: '100%'
                                        },
                                        'width >= 1500': {
                                            width: '50%'
                                        }
                                    },
                                    required: true
                                }, {
                                    fieldLabel: 'Country:',
                                    reference: 'countryCode',
                                    minChars: 1,
                                    queryMode: 'local',
                                    name: 'country',
                                    xtype: 'combobox',
                                    emptyText: 'Select',
                                    allowBlank: false,
                                    typeAhead: true,
                                    displayField: 'ISOCntryCode1',
                                    valueField: 'ISOCntryCodeSK',
                                    publishes: 'value',
                                    bind: {
                                        store: '{countrycodes}'
                                    },
                                    plugins: 'responsive',
                                    labelWidth: 130,
                                    responsiveConfig: {
                                        'width < 1500': {
                                            width: '100%'
                                        },
                                        'width >= 1500': {
                                            width: '50%'
                                        }
                                    },
                                    listeners: {
                                        select: 'stateProvinceLoad',
                                        change: 'stateProvinceClear'
                                    }
                                }]
                            }]
                    },
                    {
                        title: 'Phone/Fax/E-Mail',
                        xtype: 'grid',
                        forceFit: true,
                        minHeight: 250,
                        viewConfig: {
                            loadMask: false
                        },
                        width: '100%',
                        reference: 'PhoneFaxEmailContainer',
                        plugins: [{
                            ptype: 'rowediting',
                            clicksToEdit: 2,
                            clicksToMoveEditor: 1,
                            autoCancel: false
                        }],
                        bind: '{contactsGrid.selection.ContactCommunications}',
                        listeners: {
                            validateedit: 'validateGrid',
                            beforeedit: 'onGridItemStartEdit',
                            canceledit: 'onGridItemCancelEdit',
                            edit: 'onGridItemComplete'
                        },
                        tbar: [{
                            xtype: 'button',
                            text: 'Add Row',
                            handler: 'addPhoneFaxEmailRow',
                            bind: {
                                disabled: '{editingGrid}'
                            }
                        }, {
                            xtype: 'button',
                            text: 'Remove Row',
                            handler: 'removePhoneFaxEmailRow'
                        }],
                        columns: [{
                            dataIndex: 'CommunicationTypeRaw',
                            width: '50%',
                            editor: {
                                xtype: 'combobox',
                                queryMode: 'local',
                                emptyText: 'Select',
                                editable: false,
                                selectOnFocus: false,
                                displayField: 'commType',
                                valueField: 'commType',
                                bind: {
                                    store: '{communicationtypes}'
                                }
                            }
                        }, {
                            dataIndex: 'Value',
                            width: '50%',
                            editor: {
                                xtype: 'textfield',
                                itemId: 'commValue'
                            }
                        }]
                    }]
            }]
        }],
        bbar: [
            {
                text: 'Add New Contact',
                handler: 'addContactDetailsOnClick'
            }, {
                text: 'Export Contacts',
                handler: 'onExportContacts'

            }, '->',
            {
                text: 'Cancel',
                handler: 'onCancel',
                bind: {
                    disabled: '{!contactsGrid.selection}'
                }
            },
            {
                text: 'Save',
                handler: 'onSave',
                bind: {
                    disabled: '{!validforms || editingGrid}'
                }
            }
        ]
    }]
});