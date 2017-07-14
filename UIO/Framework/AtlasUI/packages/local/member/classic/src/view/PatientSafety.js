/*
 Last Developer: Srujith Cheruku
 Previous Developers: [Srujith Cheruku]
 Origin: Merlin - Member
 Description: A view that allows the user to search for Patient safety and see details about them in a grid and also select based on Alert type.
 */
Ext.define('Atlas.member.view.PatientSafety', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-patientsafety',
    title: 'Patient Safety',
    controller: 'patientSafetyController',
    viewModel: 'patientSafetyModel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [
        {
            xtype: 'form',
            itemId: 'searchForm',
            items: [{
                xtype: 'fieldset',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                    pack: 'start'
                },
                name: 'searchFormFields',
                title: 'Advanced Filter',
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Alert Type:',
                        labelWidth: 85,
                        columnWidth: 0.25,
                        name: 'alertType',
                        displayField: 'Subject',
                        valueField: 'Subject',
                        forceSelection: true,
                        matchFieldWidth: false,
                        value: 'All',
                        bind: {
                            store: '{storeAlertType}'
                        },
                        allowBlank: false,
                        reference: 'alertType'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Date From',
                        columnWidth: 0.25,
                        labelWidth: 70,
                        name: 'dateFrom',
                        reference: 'dateFrom',
                        itemId: 'dateFrom',
                        emptyText: 'mm/dd/yyyy',
                        format: 'm/d/Y',
                        placeHolder: 'mm/dd/yyyy',
                        value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
                        maxValue: new Date(),
                        listeners: {
                            select: 'validateDateRange',
                            focusleave: 'validateDateRange'
                        }
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Date To',
                        columnWidth: 0.25,
                        labelWidth: 70,
                        name: 'dateTo',
                        reference: 'dateTo',
                        itemId: 'dateTo',
                        emptyText: 'mm/dd/yyyy',
                        format: 'm/d/Y',
                        placeHolder: 'mm/dd/yyyy',
                        value: new Date(),
                        listeners: {
                            select: 'validateDateRange',
                            focusleave: 'validateDateRange'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Search',
                        reference: 'search',
                        iconCls: 'x-fa fa-search',
                        handler: 'onSearch'
                    },
                    {
                        xtype: 'box',
                        width: 10
                    }]
                //{
                //    xtype: 'button',
                //    text: 'Reset',
                //    handler: 'onReset',
                //    iconCls: 'x-fa fa-rotate-left'
                //}

            }]
        },
        {
            xtype: 'panel',
            title: 'Search Results',
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            flex: 3,
            scrollable: true,
            items: [{
                xtype: 'gridpanel',
                frame: true,
                flex: 3,
                scrollable: true,
                reference: 'patientSafetyGrid',
                columns: [
                    {
                        text: 'Alert Type',
                        flex: 1,
                        dataIndex: 'AlertType'
                    },
                    {
                        text: 'Alert Date',
                        flex: 1,
                        dataIndex: 'CreateDateTime',
                        renderer: function (value) {
                            var createDateTime = '';
                            if (value) {
                                createDateTime = Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                            }
                            return createDateTime
                        }
                    },
                    {
                        text: 'Member Id',
                        dataIndex: 'RecipID',
                        ignoreExport: false,
                        xtype: 'widgetcolumn',
                        widget: {
                            xtype: 'button',
                            flex: 1,
                            iconCls: 'x-fa fa-user-plus',
                            handler: 'onMemberClick'
                        }
                    },
                    {
                        text: 'COC Member',
                        dataIndex: 'COCMember'

                    },
                    {
                        text: 'Claim Id',
                        dataIndex: 'ClaimID',
                        ignoreExport: false,
                        autoWidth: true,
                        xtype: 'widgetcolumn',
                        widget: {
                            xtype: 'button',
                            iconCls: 'x-fa fa-file-text-o',
                            handler: 'onClaimClick'
                        }
                    },
                    {
                        text: 'Plan Group',
                        flex: 3,
                        dataIndex: 'PlanGroupName'
                    },
                    {
                        text: 'Additional Info',
                        flex: 5,
                        dataIndex: 'Descr'
                    },
                    {
                        xtype: 'actioncolumn',
                        dataIndex: 'DocumentID',
                        text: 'Acknowledge', hideable: false,
                        items: [{
                            iconCls: 'x-fa fa-check',
                            tooltip: 'Click to flag this fax as acknowledged.',
                            handler: 'onAcknowledgeClick'

                        }]
                    },
                    /*{
                     text: 'Letter',
                     xtype: 'actioncolumn',
                     items: [{
                     iconCls: 'x-fa fa-envelope-o',
                     tooltip: 'letter',
                     handler: 'onLetterClick'
                     }]
                     },*/
                    {
                        text: 'Create Case',
                        xtype: 'actioncolumn', hideable: false,
                        items: [{
                            iconCls: 'x-fa fa-pencil-square-o',
                            tooltip: 'Create Case',
                            handler: 'onCreateCaseClick'
                        }]
                    },
                    {
                        text: 'Create Contact Log',
                        xtype: 'actioncolumn', hideable: false,
                        items: [{
                            iconCls: 'x-fa fa-mobile',
                            title: 'Create Contact Log',
                            tooltip: 'Create Contact Log',
                            handler: 'onCreateContactLogClick'
                        }]
                    }
                ],
                bind: '{patientSafetyAlerts}',
                dockedItems: [{
                    dock: 'bottom',
                    xtype: 'pagingtoolbar',
                    bind: {
                        store: '{patientSafetyAlerts}'
                    },
                    pageSize: 10,
                    displayInfo: true
                }]
            }]
        },
        {
            xtype: 'window',
            reference: 'createCaseWindow',
            closable: false,
            title: 'Create Case',
            region: 'north',
            layout: 'column',
            onEsc: function () {
                return false;
            },
            defaults: {
                xtype: 'container',
                width: 500,
                columnWidth: 0.5,
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    labelWidth: 110
                }
            },
            modal: true,
            items: [
                {
                    xtype: 'form',
                    itemId: 'createCaseForm',
                    items: [
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            forceSelection: true,
                            queryMode: 'local',
                            name: 'assignTo',
                            fieldLabel: 'Assign To',
                            allowBlank: false,
                            bind: {store: '{assigntouser}'},
                            displayField: 'userName',
                            valueField: 'userName'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Follow up Date',
                            name: 'followUpDate',
                            format: 'm/d/Y',
                            allowBlank: false
                        },
                        {
                            xtype: 'textareafield',
                            grow: true,
                            allowBlank: false,
                            name: 'notes',
                            fieldLabel: 'Notes',
                            anchor: '100%'
                        }
                    ],
                    buttons: [
                        {
                            text: 'Save',
                            reference: 'save',
                            handler: 'onSave'
                        },
                        {
                            text: 'Cancel',
                            handler: 'onCancel'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'window',
            reference: 'contactLogWindow',
            title: 'Contact Log',
            region: 'north',
            scrollable: true,
            width: 1000,
            height: 760,
            modal: true,
            items: [
                {
                    xtype: 'contactlogwindow'
                }
            ]
        }
    ]
});

