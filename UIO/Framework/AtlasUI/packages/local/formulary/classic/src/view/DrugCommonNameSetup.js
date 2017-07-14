/**
 * Created by s6627 on 10/3/2016.
 */
Ext.define('Atlas.formulary.view.DrugCommonNameSetup', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugcommonnamesetup',
    /*viewModel: {
     type: 'cdagviewmodel'
     },*/
    viewModel: 'drugcommonnamesetupviewmodel',

    //itemId: 'cdagmain',
    title: 'Drug Common Name Setup',
    controller: 'drugcommonnamesetupcontroller',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [

        {

                    xtype: 'grid',
                    itemId: 'gpDrugSetup',
                    flex: 10,
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Drug GCN', dataIndex: 'GCNSeqNo',
                                editor: {
                                    xtype: 'drugtypeahead',
                                    emptyText: '[e.g. Nexium]',
                                    allowBlank: false,
                                    displayField: 'GCN_SEQNO',
                                    valueField: 'GCN_SEQNO',
                                    itemId: 'cbxDrugNDC',
                                    width: 400,
                                    hideLabel: true,
                                    listConfig: {
                                        // Custom rendering template for each item
                                        userCls: 'common-key-value-boundlist',
                                        getInnerTpl: function (abc, c) {
                                            return '<h4>GCN-{GCN_SEQNO}</h4>' +
                                                '<h5>Brand-<span>{BN}</span></h5>'
                                        }
                                    },
                                    listeners: {
                                        select: 'cbxDrugNDC_Select'
                                    }
                                }
                            },
                            {
                                text: 'Common Name (Formulary PDF)', dataIndex: 'drugCommonName',
                                editor: {
                                    xtype: 'combobox',
                                    allowBlank: false,
                                    displayField: 'BN',
                                    valueField: 'BN',
                                    bind: {
                                        store: '{StoreGCNBrandName}'
                                    }
                                }
                            }
                        ]
                    },
                    plugins: {
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        errorSummary: false,
                        autoCancel: false,
                        listeners: {
                            'canceledit': function (rowEditing, context) {
                                if (context.record.phantom) {
                                    context.store.remove(context.record);
                                }
                            },
                            'edit': function (rowEditing, context) {
                                if (context.record.dirty) {
                                    // context.grid.columns[3].items[0].hidden = false;
                                    //context.grid.getView().refresh();
                                }

                            }
                        }
                    },
                    listeners: {
                        beforeedit: 'gpFormularyDetail_beforeedit'
                    },
                    bind: '{storeDrugCommonNameSetup}'

      }
    ],
    dockedItems:[
        {
            xtype:'toolbar',dock:'top',
            items:[
                {
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'fa  fa-plus-circle',
                    handler: 'btnAddClick'
                },
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'fa  fa-minus-circle',
                    handler: 'btnRemoveClick'
                }
            ]
        },
        {

                    xtype:'toolbar',dock:'bottom',
                    items:[
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'btnSaveClick',
                            itemId: 'btnSave'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storeDrugCommonNameSetup}',
                    displayInfo: true,
                    hideRefresh:true,
                    dock: 'bottom'
                }

    ]
})
