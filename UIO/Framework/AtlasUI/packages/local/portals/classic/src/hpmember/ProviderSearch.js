Ext.define('Atlas.portals.view.hpmember.ProviderSearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'hpmember-providersearch',
    controller: 'providerSearchController',
    viewModel: 'providerSearchViewModel',

    title: 'Provider Search',

    scrollable: true,
    items: [
        {
            title: 'Provider Search',
            cls: 'card-panel',

            items: [
                {
                    xtype: 'fieldset',
                    title: 'Search Provider By',
                    items: [
                        {
                            xtype: 'form',
                            cls: 'formPanel',
                            reference: 'providerSearchForm',
                            //layout: 'auto',
                            items: [{
                                xtype: 'container',
                                layout: 'hbox',

                                items: [{
                                    xtype: 'container',
                                    margin: '0 30 0 0',

                                    defaults: {
                                        labelWidth: 120,
                                        width: 400
                                    },

                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Provider Name:',
                                            name: 'providerName'
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'language',
                                            fieldLabel: 'Language:',
                                            displayField: 'name',
                                            valueField: 'id',
                                            bind: {
                                                store: '{languages}'
                                            },
                                            publishes: 'id',
                                            queryMode: 'local',
                                            lastquery: '',

                                            typeAhead: 'true',
                                            forceSelection: true
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'county',
                                            reference: 'countyCombo',
                                            fieldLabel: 'County:',
                                            displayField: 'name',
                                            valueField: 'id',
                                            bind: {
                                                store: '{counties}'
                                            },
                                            publishes: 'id',
                                            queryMode: 'local',

                                            typeAhead: 'local',
                                            forceSelection: true,
                                            listeners: {
                                                change: 'onCountyChange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            name: 'city',
                                            reference: 'cityCombo',
                                            fieldLabel: 'City',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'name',
                                            bind: {
                                                store: '{cities}'
                                            },
                                            typeAhead: true,
                                            forceSelection: true,
                                            disabled: true
                                        }
                                    ]
                                },
                                    {
                                        xtype: 'container',

                                        defaults: {
                                            labelWidth: 90,
                                            width: 370
                                        },

                                        items: [
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'Gender:',
                                                queryMode: 'local',
                                                lastquery: '',
                                                name: 'gender',
                                                displayField: 'name',
                                                valueField: 'id',
                                                bind: {
                                                    store: '{genders}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'Speciality:',
                                                queryMode: 'local',
                                                lastquery: '',
                                                name: 'specialty',
                                                displayField: 'value',
                                                valueField: 'id',
                                                bind: {
                                                    store: '{specialties}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'Affiliations:',
                                                queryMode: 'local',
                                                lastquery: '',
                                                name: 'affiliations',
                                                displayField: 'name',
                                                valueField: 'name',
                                                bind: {
                                                    store: '{affiliations}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'LOB:',
                                                queryMode: 'local',
                                                lastquery: '',
                                                name: 'lob',
                                                reference: 'lobCombo',
                                                allowBlank: 'false',
                                                forceSelection: 'true',
                                                typeAhead: 'true',
                                                displayField: 'name',
                                                valueField: 'name',
                                                bind: {
                                                    store: '{memberLobs}'
                                                },
                                                listeners: {
                                                    change: 'onMemberLobChange'
                                                }
                                            }
                                        ]
                                    }]
                            },{
                                xtype: 'toolbar',
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        inputValue: 'YES',
                                        uncheckedValue: 'NO',
                                        boxLabel: 'Show all providers accepting new members',
                                        name: 'newMembers',
                                        value: 'true',
                                        flex: 2
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Clear',
                                        //flex: 1,
                                        listeners: {
                                            click: 'onClear'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Search',
                                        //flex: 1,
                                        listeners: {
                                            click: 'onSearch'
                                        }
                                    }]
                            }]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Search Result',
                    items: [
                        {
                            xtype: 'container',
                            html: 'Select a Provider from the list below to view Provider Details'
                        },
                        {
                            xtype: 'grid',
                            reference: 'providerSearchResult',
                            bind: '{searchResultsPaged}',
                            columns: [
                                {
                                    text: 'Provider Name',
                                    //flex: 1,
                                    width: 200,
                                    dataIndex: 'fullName'
                                },
                                {
                                    text: 'County',
                                    //flex: 1,
                                    width: 100,
                                    dataIndex: 'countyDescription'
                                },
                                {
                                    text: 'City',
                                    //flex: 1,
                                    width: 100,
                                    dataIndex: 'City'
                                },
                                {
                                    text: 'Gender',
                                    //flex: 1,
                                    width: 75,
                                    dataIndex: 'Gender'
                                },
                                {
                                    xtype: 'booleancolumn',
                                    text: 'New Patients',
                                    //flex: 1,
                                    width: 110,
                                    dataIndex: 'newClients',
                                    trueText: 'Yes',
                                    falseText: 'No'

                                },
                                {
                                    text: 'LOB',
                                    //flex: 1,
                                    width: 80,
                                    dataIndex: 'lobID'
                                },
                                {
                                    text: 'Hospital Affiliations',
                                    //flex: 1,
                                    width: 150,
                                    dataIndex: 'Hospitals'
                                },
                                {
                                    text: 'Specialty',
                                    //flex: 1,
                                    width: 100,
                                    dataIndex: 'specDescription'
                                },
                                {
                                    text: 'Group Name',
                                    width: 150,
                                    dataIndex: 'groupName',
                                    hidden: true
                                },
                                {
                                    text: 'Address',
                                    width: 100,
                                    dataIndex: 'fullAddressSingleLine',
                                    hidden: true
                                },
                                {
                                    text: 'Phone',
                                    width: 80,
                                    dataIndex: 'formattedPhone',
                                    hidden: true
                                },
                                {
                                    text: 'Fax',
                                    width: 80,
                                    dataIndex: 'formattedFax',
                                    hidden: true
                                },
                                {
                                    text: 'Hrs',
                                    width: 100,
                                    dataIndex: 'hoursSingleLine',
                                    hidden: true
                                },
                                {
                                    text: 'Languages',
                                    width: 150,
                                    dataIndex: 'Languages',
                                    hidden: true
                                },
                                {
                                    text: 'Messages',
                                    width: 150,
                                    dataIndex: 'providerMessage',
                                    hidden: true
                                },
                                {
                                    text: 'Min Age',
                                    width: 75,
                                    dataIndex: 'ageLimitLow',
                                    hidden: true
                                },
                                {
                                    text: 'Max Age',
                                    width: 75,
                                    dataIndex: 'ageLimitHigh',
                                    hidden: true
                                },
                                {
                                    text: 'PCP ID',
                                    width: 80,
                                    dataIndex: 'provId',
                                    hidden: true
                                },
                                {
                                    text: 'Location ID',
                                    width: 80,
                                    dataIndex: 'locationID',
                                    hidden: true
                                },
                                {
                                    text: 'Affiliation',
                                    width: 100,
                                    dataIndex: 'Hospitals',
                                    hidden: true
                                },
                                {
                                    text: 'ADA',
                                    minWidth: 150,
                                    flex: 1,
                                    dataIndex: 'adaMessage'
                                }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                bind: '{searchResultsPaged}',
                                displayInfo: true,
                                hideRefresh: true
                            },
                            listeners: {
                                rowClick: 'onResultsRowClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Selected Provider Details',
                    reference: 'providerDetails',
                    layout: 'hbox',
                    bind: {
                        hidden: '{hideProviderDetails}'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            margin: '0 10 0 0',
                            title: 'Provider Details',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'displayfield',
                                labelWidth: 130
                            },
                            flex: 2,
                            items: [
                                {
                                    fieldLabel: 'Provider Name',
                                    bind: '{providerDetails.fullName}'
                                },
                                {
                                    fieldLabel: 'Group Name',
                                    bind: '{providerDetails.groupName}'
                                },
                                {
                                    fieldLabel: 'LOB',
                                    bind: '{providerDetails.lobID}'
                                },
                                {
                                    fieldLabel: 'Address',
                                    bind: '{providerDetails.fullAddress}'
                                },
                                {
                                    fieldLabel: 'Gender',
                                    bind: '{providerDetails.Gender}'
                                },
                                {
                                    fieldLabel: 'Phone',
                                    bind: '{providerDetails.formattedPhone}'
                                },
                                {
                                    fieldLabel: 'Fax',
                                    bind: '{providerDetails.formattedFax}'
                                },
                                {
                                    fieldLabel: 'Languages',
                                    bind: '{providerDetails.Languages}'
                                },
                                {
                                    fieldLabel: 'Provider Message',
                                    bind: '{providerDetails.providerMessage}'
                                },
                                {
                                    fieldLabel: 'Accessibility',
                                    bind: '{providerDetails.adaMessage}',
                                    shrinkWrap: 3
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'Office Hours',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'component',
                                    reference: 'hoursPanel',
                                    padding: 7,
                                    tpl: [
                                        '<tpl for=".">',
                                        '{.}<br>',
                                        '</tpl>'
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Change PCP',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            reference: 'effectiveDateCombo',
                            fieldLabel: 'Effective Date',
                            labelWidth: 120,
                            width: 400,
                            queryMode: 'local',
                            displayField: 'value',
                            valueField: 'value',
                            emptyText: '(MM/DD/YYYY)',
                            listeners: {
                                beforerender: 'initializeEffectiveDates'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Change My PCP',
                            listeners: {
                                click: 'onChangePCPClick'
                            },
                            bind: {
                                disabled: '{hideProviderDetails}'
                            },
                            margin: '4, 10, 0, 10'
                        },
                        {
                            xtype: 'combo',
                            reference: 'familyListCombo',
                            fieldLabel: 'Family',
                            labelWidth: 60,
                            width: 500,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            listeners: {
                                beforerender: 'initializeFamilyList'
                            },
                            bind: {
                                disabled: '{familyListDisabled}'
                            }
                        }
                    ]
                }
            ]
        }

    ]
});
