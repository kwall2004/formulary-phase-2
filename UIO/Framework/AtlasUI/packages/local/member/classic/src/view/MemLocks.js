/**
 * Created by j2487 on 10/4/2016.
 * Member --> Menu --> Locks view screen
 */
Ext.define('Atlas.member.view.MemLocks', {
    extend: 'Ext.panel.Panel',
    title: 'Member Locks',
    xtype: 'member-memlocks',
    controller: 'memlocks',
    viewModel: 'memlocks',

    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 5,
    items: [
        {
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    title: 'Pharmacy Locks IN',
                    flex: 2,
                    xtype: 'grid',
                    itemId: 'PharmacyLocksGrid',
                    reference: 'pharmacyLocksGrid',
                    height: '50%',
                    width: '100%',
                    autoScroll: true,
                    loadMask: true,

                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'fa fa-plus-circle',
                            itemId: 'btnAddPharmacy',
                            handler: 'onAddPharmacyClick'
                        },
                        {
                            xtype: 'button',
                            text: 'Change',
                            iconCls: 'fa fa-edit',
                            itemId: 'btnEdit',
                            handler: 'btnEditPharmacy_Click'
                        },
                        {
                            xtype: 'button',
                            text: 'Remove',
                            itemId: 'btnRemovePharmacy',
                            handler: 'onRemovePharmacyClick',
                            iconCls: 'fa fa-minus-circle'
                        },
                        {
                            xtype: 'button',
                            text: 'Save Pharmacy Locks',
                            itemId: 'btnSavePharmacyLocks',
                            iconCls: 'fa fa-plus-circle',
                            hidden: true,
                            handler: 'onPharmacyLockSaveClick'
                        }
                    ],

                    bind: {
                        store: '{memlockspharmacy}'
                    },

                    columns: [
                        {text: 'Pharmacy', flex: 1, dataIndex: 'lockName'},
                        {text: 'Current NCPDP', flex: 1, dataIndex: 'currentLockID'},
                        {text: 'Status', flex: 1, dataIndex: 'currentStatus'},
                        {text: 'Proposed Status', flex: 1, dataIndex: 'toBeStatus'},
                        {text: 'Proposed NCPDP', flex: 1, dataIndex: 'newLockID'},
                        {text: 'Office Contact', flex: 1, dataIndex: 'officeContact'},
                        {text: 'Office Contact Ph.', flex: 1, dataIndex: 'officeContactPhone'},
                        {text: 'Carrier', flex: 1, dataIndex: 'Carrier'},
                        {text: 'Account', flex: 1, dataIndex: 'Account'},
                        {text: 'LOB', flex: 1, dataIndex: 'LOB'}
                    ],

                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        displayInfo: 'true',
                        pageSize: 25,
                        bind: {
                            store: '{memlockspharmacy}'
                        },
                        displayMsg: 'Pharmacy Locks {0} - {1} of {2}'
                    }]
                },
                {
                    title: 'Medication Locks OUT',
                    flex: 1,
                    xtype: 'gridpanel',
                    itemId: 'MedicationGrid',
                    height: '50%',
                    width: '100%',
                    autoScroll: true,
                    loadMask: true,
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'fa fa-plus-circle',
                            itemId: 'btnMedicationAdd',
                            handler: 'onAddMedicationClick'
                        },
                        {
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'fa fa-minus-circle',
                            itemId: 'btnMedicationRemove',
                            handler: 'onRemoveMedicationClick'
                        }
                    ],

                    bind: {
                        store: '{memlocksmedication}'
                    },

                    columns: [
                        {text: 'Drug Level', flex: 1, dataIndex: 'LockIdType'},
                        {
                            text: 'Drug Type',
                            dataIndex: 'LockIdSubType',
                            renderer: function (rec) {
                                switch (rec) {
                                    case 0:
                                        return 'All';
                                        break;
                                    case 1:
                                        return 'Specialty';
                                        break;
                                    case 2:
                                        return 'Generics';
                                        break;
                                    case 3:
                                        return 'Single Source Brand';
                                        break;
                                    case 4:
                                        return 'Multi Source Brand';
                                        break;
                                    default:
                                        return rec;
                                }
                            }
                        },
                        {text: 'Drug Code', flex: 1, dataIndex: 'Id'},
                        {text: 'Medication', flex: 1, dataIndex: 'names'}
                    ],

                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        displayInfo: 'true',
                        pageSize: 25,
                        bind: {
                            store: '{memlocksmedication}'
                        },
                        displayMsg: 'Medication Locks {0} - {1} of {2}'
                    }]
                }
            ]
        },
        {
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    title: 'Prescriber Locks IN',
                    flex: 2,
                    xtype: 'gridpanel',
                    itemId: 'PrescriberGrid',
                    height: '50%',
                    width: '100%',
                    autoScroll: true,
                    loadMask: true,
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'fa fa-plus-circle',
                            itemId: 'btnAddProvider',
                            handler: 'onAddPrescriberClick'
                        },
                        {
                            xtype: 'button',
                            text: 'Change',
                            iconCls: 'fa fa-edit',
                            itemId: 'btnEditPresc',
                            handler: 'onEditPrescriber_Click'
                        },
                        {
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'fa fa-minus-circle',
                            itemId: 'btnRemovePresc',
                            handler: 'onRemovePrescriberClick'
                        }
                    ],
                    bind: {
                        store: '{memlocksprescriber}'
                    },

                    columns: [
                        {text: 'Prescriber', flex: 1, dataIndex: 'lockName'},
                        {text: 'Current NPI', flex: 1, dataIndex: 'currentLockID'},
                        {text: 'Status', flex: 1, dataIndex: 'currentStatus'},
                        {text: 'Proposed Status', flex: 1, dataIndex: 'toBeStatus'},
                        {text: 'Proposed NPI', flex: 1, dataIndex: 'newLockID'},
                        {text: 'Office Contact', flex: 1, dataIndex: 'officeContact'},
                        {text: 'Office Contact Ph.', flex: 1, dataIndex: 'officeContactPhone'},
                        {text: 'Carrier', flex: 1, dataIndex: 'Carrier'},
                        {text: 'Account', flex: 1, dataIndex: 'Account'},
                        {text: 'LOB', flex: 1, dataIndex: 'LOB'}
                    ],

                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        displayInfo: 'true',
                        pageSize: 25,
                        bind: {
                            store: '{memlocksprescriber}'
                        },
                        displayMsg: 'Provider Locks {0} - {1} of {2}'
                    }]
                },
                {
                    title: 'DEA Drugs Locks OUT',
                    flex: 1,
                    xtype: 'form',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    autoScroll: true,
                    height: '50%',
                    width: '100%',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            boxLabel: 'Select All',
                            itemId: 'chkDeaAll',
                            listeners: {
                                change: 'onChangeSelectAll'
                            }
                        },
                        {
                            xtype: 'checkboxfield', boxLabel: 'Schedule I', itemId: 'chkDea1', name: 'DEASchedule1',
                            listeners: {
                                change: 'CheckUnCheck'
                            }
                        },
                        {
                            xtype: 'checkboxfield', boxLabel: 'Schedule II', itemId: 'chkDea2', name: 'DEASchedule2',
                            listeners: {
                                change: 'CheckUnCheck'
                            }
                        },
                        {
                            xtype: 'checkboxfield', boxLabel: 'Schedule III', itemId: 'chkDea3', name: 'DEASchedule3',
                            listeners: {
                                change: 'CheckUnCheck'
                            }
                        },
                        {
                            xtype: 'checkboxfield', boxLabel: 'Schedule IV', itemId: 'chkDea4', name: 'DEASchedule4',
                            listeners: {
                                change: 'CheckUnCheck'
                            }
                        },
                        {
                            xtype: 'checkboxfield', boxLabel: 'Schedule V', itemId: 'chkDea5', name: 'DEASchedule5',
                            listeners: {
                                change: 'CheckUnCheck'
                            }
                        }
                    ],

                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [
                            '->',
                            {xtype: 'button', text: 'Save DEA Locks', itemId: 'btnSaveDEALocks',handler:'SaveDEALocks', iconCls: 'fa fa-save'}
                        ]
                    }]
                }
            ]
        },
        {
            xtype: 'hidden', itemId: 'hdnApprover'
        }
    ]
});
