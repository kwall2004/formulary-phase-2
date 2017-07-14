/**
 * Created by n6570 on 10/31/2016.
 */
Ext.define('Atlas.benefitplan.view.allowedprescribers.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.allowedprescribers',
    title: 'Allowed Prescribers',
    controller: 'benefitplan-allowedprescriberscontroller',
    layout: 'anchor',
    scrollable: true,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        data: {
            changed: false,
            editingListGrid: false,
            editingChildGrid: false
        },

        stores: {
            allowedprescriberslist: {
                model: 'Atlas.benefitplan.model.AllowedPrescribersList',
                sorters: 'AlwdPrescribersListSK',
                autoLoad: true,
                listeners: {update: 'storeUpdated'}
            },
            allowedprescribers: {
                model: 'Atlas.benefitplan.model.AllowedPrescribers',
                sorters: 'AlwdPrescribersDtlSK',
                autoLoad: true
            },
            prescribers: {
                model: 'Atlas.benefitplan.model.Prescribers',
                sorters: 'PrescbrSK',
                autoLoad: true
            }
        }
    },
    items: [
        {
            xtype: 'form',
            title: 'Allowed Prescribers',
            titleAlign: 'center'

        },
        {
            reference: 'AllowedPrescribersForm',
            xtype: 'form',
            anchor: '100% 100%',
            layout: 'border',
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    items: [
                        {
                            xtype: 'uxsearchfield',
                            reference: 'searchfield',
                            bind: {
                                emptyText: 'ListName'
                            },
                            listeners: {
                                clear: 'onClear',
                                search: 'onSearch'
                            }
                        }]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'panel',
                            scrollable: true,
                            layout: 'fit',
                            width: '100%',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'refAllowedPrescribersListGrid',
                                    reference: 'refAllowedPrescribersListGrid',
                                    multiselect:true,
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    plugins: [
                                        {
                                            ptype: 'rowediting',
                                            reference: 'rowEditing',
                                            clicksToEdit: 2,
                                            clicksToMoveEditor: 1,
                                            id: 'rowEditing'
                                        }
                                    ],
                                    columns: [
                                        {
                                            text: 'List Name',
                                            flex: 1,
                                            dataIndex: 'AlwdPrescribersListName',
                                            editor: {
                                                xtype: 'textfield',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            text: 'Effective Start Date',
                                            dataIndex: 'EfctvStartDt',
                                            formatter: 'date("n/j/Y")',
                                            flex: 1,
                                            allowBlank: false,
                                            editor: {
                                                xtype: 'datefield',
                                                emptyText: 'Select Effective End Date',
                                                format: 'n/j/Y',
                                                itemId: 'EfctvListStartDt',
                                                fieldLabel: 'Effective Start Date',
                                                allowBlank: false,
                                                validator: function (val) {
                                                    return (new Date(val) < new Date(this.up().getComponent('EfctvListEndDt').getValue())) ? true : "Must be less than Effective End Date";
                                                }
                                            }
                                        },
                                        {
                                            text: 'Effective End Date',
                                            dataIndex: 'EfctvEndDt',
                                            formatter: 'date("n/j/Y")',
                                            flex: 1,
                                            allowBlank: false,
                                            editor: {
                                                xtype: 'datefield',
                                                fieldLabel: 'Effective End Date',
                                                emptyText: 'Select Effective End Date',
                                                format: 'n/j/Y',
                                                itemId: 'EfctvListEndDt',
                                                allowBlank: false,
                                                validator: function (val) {
                                                    return (new Date(val) > new Date(this.up().getComponent('EfctvListStartDt').getValue())) ? true : "Must be greater than Effective Start Date";
                                                }
                                            }
                                        },
                                        {
                                            dataIndex: 'AlwdPrescribersListSK',
                                            hidden: true,
                                            hideable: false
                                        },
                                        {
                                            dataIndex: 'IsDeleted',
                                            hidden: true,
                                            hideable: false
                                        }
                                    ],
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            itemId: 'addRow',
                                            handler: 'onAlwdPrescrbListGridAddRowClick'
                                        }
                                    ],
                                    listeners: {
                                        selectionchange: 'onAlwdPrescrbListGridSelectionChange',
                                        canceledit: 'onAlwdPrescrbListGridItemCancelEdit',
                                        edit: 'onAlwdPrescrbListGridItemComplete',
                                        validateedit:'onAlwdPrescrbListGridValidateEdit',
                                        beforeedit:'onAlwdPrescrbListGridBeforeEdit'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            scrollable: true,
                            layout: 'fit',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'refAllowedPrescribersGrid',
                                    reference: 'refAllowedPrescribersGrid',
                                    plugins: [
                                        {
                                            ptype: 'rowediting',
                                            reference: 'rowediting',
                                            clicksToEdit: 2,
                                            clicksToMoveEditor: 1
                                        }
                                    ],
                                    columns: [
                                        {
                                            text: 'Effective Start Date',
                                            dataIndex: 'EfctvStartDt',
                                            formatter: 'date("n/j/Y")',
                                            flex: 1,
                                            allowBlank: false,
                                            editor: {
                                                xtype: 'datefield',
                                                emptyText: 'Select Effective Start Date',
                                                format: 'n/j/Y',
                                                itemId: 'EfctvStartDt',
                                                fieldLabel: 'Effective Start Date',
                                                allowBlank: false,
                                                validator: function (val) {
                                                    return ((new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) && (new Date(val) <= new Date(this.up().up().up().up().down().getComponent('refAllowedPrescribersListGrid').getSelection()[0].getData().EfctvEndDt)) && (new Date(val) >= new Date(this.up().up().up().up().down().getComponent('refAllowedPrescribersListGrid').getSelection()[0].getData().EfctvStartDt))) ? true : "Must be less than Effective End Date and within range of List Effective dates";
                                                }
                                            }
                                        },
                                        {
                                            text: 'Effective End Date',
                                            dataIndex: 'EfctvEndDt',
                                            formatter: 'date("n/j/Y")',
                                            flex: 1,
                                            allowBlank: false,
                                            editor: {
                                                xtype: 'datefield',
                                                fieldLabel: 'Effective End Date',
                                                emptyText: 'Select Effective End Date',
                                                format: 'n/j/Y',
                                                itemId: 'EfctvEndDt',
                                                allowBlank: false,
                                                validator: function (val) {
                                                    return ((new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) && (new Date(val) <= new Date(this.up().up().up().up().down().getComponent('refAllowedPrescribersListGrid').getSelection()[0].getData().EfctvEndDt)) && (new Date(val) >= new Date(this.up().up().up().up().down().getComponent('refAllowedPrescribersListGrid').getSelection()[0].getData().EfctvStartDt))) ? true : "Must be greater than Effective Start Date and within range of List Effective dates";
                                                }
                                            }
                                        },
                                        {
                                            text: 'Prescriber NPI',
                                            flex: 1,
                                            emptytext: 'select type',
                                            dataIndex: 'PrescbrSK',
                                            renderer: 'getNPIEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                emptyText: 'Select Type',
                                                bind: {
                                                    store: '{prescribers}'
                                                },
                                                allowBlank: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                queryMode: 'remote',
                                                displayField: 'PrescbrNPI',
                                                valueField: 'PrescbrSK',
                                                listeners: {
                                                    select: 'onNPISelectionChange'
                                                }
                                            }
                                        },
                                        {
                                            text: 'Prescriber First Name',
                                            flex: 1,
                                            dataIndex: 'PrescbrFirstName'
                                        },
                                        {
                                            text: 'Prescriber Last Name',
                                            flex: 1,
                                            dataIndex: 'PrescbrLastName'
                                        },
                                        {
                                            dataIndex: 'AlwdPrescribersDtlSK',
                                            hidden: true,
                                            hideable: false
                                        },
                                        {
                                            dataIndex: 'PrescbrSK',
                                            hidden: true,
                                            hideable: false
                                        },
                                        {
                                            dataIndex: 'IsDeleted',
                                            hidden: true,
                                            hideable: false
                                        },
                                        {
                                            dataIndex: 'CurrentUser',
                                            hidden: true,
                                            hideable: false
                                        }
                                    ],
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            itemId: 'addRow',
                                            handler: 'onPrescribersGridAddRowClick',
                                            bind: {
                                                disabled: '{!refAllowedPrescribersListGrid.selection}'
                                            }
                                        }
                                    ],
                                    listeners: {
                                        canceledit: 'onPrescribersGridItemCancelEdit',
                                        edit: 'onPrescribersGridItemComplete',
                                        validateedit: 'onPrescribersGridItemValidateEdit',
                                        beforeEdit: 'onPrescribersGridItemBeforeEdit'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
        {
            text: 'Cancel',
            handler: 'onCancelClick'
        },
        {
            text: 'Save',
            bind: {
                disabled: '{editingListGrid || editingChildGrid}'
            },
            handler: 'onSaveClick'
        }
    ]
});