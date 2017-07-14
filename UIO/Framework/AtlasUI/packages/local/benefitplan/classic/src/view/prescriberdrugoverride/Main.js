/**
 * Created by n6570 on 11/3/2016.
 */
Ext.define('Atlas.benefitplan.view.prescriberdrugoverride.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.prescriberdrugoverride',
    title: 'Prescriber Drug Override',
    controller: 'benefitplan-prescriberdrugoverridecontroller',
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
            prescriberdrugoverridelist: {
                model: 'Atlas.benefitplan.model.PrescriberDrugOverrideList',
                sorters: 'PrescbrDrugOvrrdListSK',
                autoLoad: true,
                listeners: {update: 'storeUpdated'}
            },
            prescriberdrugoverrides: {
                model: 'Atlas.benefitplan.model.PrescriberDrugOverride',
                sorters: 'PrescbrDrugOvrrdDtlSK',
                autoLoad: true
            },
            prescribers: {
                model: 'Atlas.benefitplan.model.Prescribers',
                sorters: 'PrescbrSK',
                autoLoad: false
            }
        }
    },
    items: [
        {
            xtype: 'form',
            title: 'Prescriber Drug Override',
            titleAlign: 'center'

        },
        {
            reference: 'PrescriberDrugOverrideForm',
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
                        }
                    ]
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
                                    flex: 1,
                                    xtype: 'grid',
                                    itemId: 'refPrescriberDrugOverRideListGrid',
                                    reference: 'refPrescriberDrugOverRideListGrid',
                                    minHeight: 300,
                                    bind: {
                                        store: '{prescriberdrugoverridelist}'
                                    },
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
                                            dataIndex: 'PrescbrDrugOvrrdListName',
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
                                            dataIndex: 'PrescbrDrugOvrrdListSK',
                                            hidden: true,
                                            hideable: false
                                        }

                                    ],
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            itemId: 'addRow',
                                            handler: 'onPrescrDrugListGridAddRowClick'
                                        }/*,
                                         {
                                         text: 'Remove Row',
                                         itemId: 'removeRow',
                                         handler: 'onPrescrDrugListGridRemoveRowClick',
                                         bind: {
                                         disabled: '{!refPrescriberDrugOverRideListGrid.selection}'
                                         }
                                         }*/
                                    ],
                                    listeners: {
                                        selectionchange: 'onPrescrDrugListGridSelectionChange',
                                        canceledit: 'onPrescrDrugListGridItemCancelEdit',
                                        edit: 'onPrescrDrugListGridItemComplete',
                                        validateedit:'onPrescrDrugListGridValidateEdit',
                                        beforeedit:'onPrescrDrugListGridBeforeEdit'

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
                                    flex: 1,
                                    xtype: 'grid',
                                    itemId: 'refPrescriberDrugOverridesGrid',
                                    reference: 'refPrescriberDrugOverridesGrid',
                                    minHeight: 300,
                                    bind: {
                                        store: '{prescriberdrugoverrides}'
                                    },
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    plugins: [
                                        {
                                            ptype: 'rowediting',
                                            reference: 'rowediting',
                                            clicksToEdit: 2,
                                            clicksToMoveEditor: 1,
                                            id: 'rowEditing'
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
                                                emptyText: 'Select Effective End Date',
                                                format: 'n/j/Y',
                                                itemId: 'EfctvStartDt',
                                                fieldLabel: 'Effective Start Date',
                                                allowBlank: false,
                                                validator: function (val) {
                                                    return ((new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) && (new Date(val) <= new Date(this.up().up().up().up().down().getComponent('refPrescriberDrugOverRideListGrid').getSelection()[0].getData().EfctvEndDt)) && (new Date(val) >= new Date(this.up().up().up().up().down().getComponent('refPrescriberDrugOverRideListGrid').getSelection()[0].getData().EfctvStartDt))) ? true : "Must be less than Effective End Date and within range of List Effective dates";
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
                                                    return ((new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) && (new Date(val) <= new Date(this.up().up().up().up().down().getComponent('refPrescriberDrugOverRideListGrid').getSelection()[0].getData().EfctvEndDt)) && (new Date(val) >= new Date(this.up().up().up().up().down().getComponent('refPrescriberDrugOverRideListGrid').getSelection()[0].getData().EfctvStartDt))) ? true : "Must be less than Effective End Date and within range of List Effective dates";
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
                                                minChars: 3,
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
                                            dataIndex: 'PrescbrDrugOvrrdDtlSK',
                                            hidden: true,
                                            hideable: false
                                        },
                                        {
                                            dataIndex: 'PrescbrSK',
                                            hidden: true,
                                            hideable: false
                                        },
                                        {
                                            text: 'NDC',
                                            flex: 1,
                                            dataIndex: 'NDC',
                                            editor: {
                                                xtype: 'textfield',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            text: 'Label Name',
                                            flex: 1,
                                            dataIndex: 'DrugLblName',
                                            editor: {
                                                xtype: 'textfield',
                                                allowBlank: false
                                            }
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
                                            handler: 'onprescriberdrugGridAddRowClick',
                                            bind: {
                                                disabled: '{!refPrescriberDrugOverRideListGrid.selection}'
                                            }

                                        }/*,
                                         {
                                         text: 'Remove Row',
                                         itemId: 'removeRow',
                                         handler: 'onPrescriberDrugGriddRemoveRowClick',
                                         bind: {
                                         disabled: '{!refPrescriberDrugOverridesGrid.selection}'
                                         }
                                         }*/
                                    ],
                                    listeners: {
                                        canceledit: 'onPrescriberdrugGridItemCancelEdit',
                                        edit: 'onPrescriberdrugGridItemComplete',
                                        validateedit:'onPrescribersGridItemValidateEdit',
                                        beforeEdit: 'onPrescribersdrugGridItemBeforeEdit'
                                    }


                                }]
                        }
                    ]
                }
            ]

        }],
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