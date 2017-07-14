/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.view.PCNRuleDetails', {
    extend: 'Ext.grid.Panel',

    controller: 'plan-planpcnruledetails',
    viewModel: 'plan-planpcnsetup',

    xtype: 'plan-pcnruledetails',
    title: 'PCN Rule Details:',
    reference: 'pcnruledetailgridRef',
    itemId:'pcnruledetailgridRef',
    layout: 'fit',

    bind: {
        store: '{pcnrulesetupdetails}',
        selection: '{selectedRow}'
    },
    listeners: {
        select: 'selectRuleDetail'
    },
    plugins: [{
        ptype: 'rowediting',
        reference: 'rowediting',
        triggerEvent: 'celldblclick',
        removeUnmodified: true,
        pluginId: 'rowEditing',
        listeners: {
            cancelEdit: 'cancelEditButton',
            edit: 'completeEdit',
            beforeEdit: 'beforeEdit'

        }
        /*clicksToMoveEditor: 1,
         errorSummary: false,
         autoCancel: false,
         listeners: {
         cancelEdit: 'cancelEditButton',
         edit: 'completeEdit',
         beforeEdit: 'beforeEdit'
         }*/
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                iconCls: 'x-fa fa-plus-circle',
                handler: 'onAddPCNRule',
                //alignment: 'right',
                // id: 'btnAdd',
                text: 'Add'
            }, {
                iconCls: 'x-fa fa-remove',
                handler: 'onRemoveButtonClick',
                bind: {
                    disabled: true
                },
                //alignment: 'right',
                // id: 'btnRemove',
                text: 'Remove'
            },
            '->',
            {
                xtype: 'button',
                text: 'Save',
                bind: {
                    disabled: true
                },
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onPCNRuleDetailSave'
            }


        ]
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        //bind: { 'store': '{planGroupsPaged}'},
        dock:'bottom',
        displayInfo: true,
        hideRefresh: true
    },
    columns: {
        defaults: {
            flex: 1
        },
        items: [
            {
                //xtype: 'hidden',
                text: 'PCN Code',
                dataIndex: 'PCNCode',
                editor: {
                    allowBlank: true,
                    readOnly: true
                },
                hidden : true
            },
            {
                text: 'Rx Group Code',
                dataIndex: 'RxGroupCode',
                editor: {
                    allowBlank: false
                }
            }, {
                // text: 'Auto Enroll',
                // dataIndex: 'AutoEnroll',
                // xtype: 'checkcolumn',
                // editor:{
                //     xtype: 'checkbox',allowBlank: true,checked: false,inputValue: true,
                //     uncheckedValue: false
                // },
                // bind: {
                //     disabled: '{!record.isEditing}'
                // },
                // disabled: true
                text: 'Auto Enroll',
                dataIndex: 'AutoEnroll',
                // listeners: {
                //     beforecheckchange: function () {
                //         return false;
                //     }
                // },
                editor: {
                    xtype: 'checkbox',
                    inputValue: true,
                    uncheckedValue: false,
                    checked: true
                },
                renderer: function (value) {
                    if (value)
                        return 'Yes';
                    else
                        return 'No';
                }

            },

            {
                text: 'Plan Group Name',
                dataIndex: 'PlangroupId',
                renderer: 'planGroupNameRenderer',
                editor: {
                    xtype: 'combobox',
                    allowBlank: false,
                    reference: 'plangroup',
                    emptyText: 'e.g. MHP Medicare 2011',
                    minChars: 4,
                    queryParam: 'pWhere',
                    bind: {
                        store: '{plangroups}'
                    },
                   //  listeners: {
                   //      select: 'onPlangroupSelect',
                   //      beforequery: function(record){
                   //          record.query = new RegExp(record.query, 'ig');
                   //          record.forceAll = true;
                   //      }
                   //
                   // },
                    listeners:{
                        select: 'onPlangroupSelect',
                        beforequery: function (queryPlan) {
                            var me = this;
                            if (queryPlan.query.length < 3) {
                                return;
                            }
                            if(queryPlan.query !='') {
                                queryPlan.query =' wrdidx contains ' + queryPlan.query+ "* ";
                            }

                        }
                    },
                    listConfig: {
                        getInnerTpl: function () {
                            // here you place the images in your combo
                            var tpl = '<div>' +
                                '<b>{planGroupCode}</b><br/>' +
                                '{planGroupName}<br/>' +
                                '{lobName}<br/>' +
                                '{accountName}</div>';
                            return tpl;
                        }
                    },
                    //reference: 'plangroupcombo',
                    forceSelection: true,
                    name: 'plangroup',
                    displayField: 'planGroupName',
                    valueField: 'planGroupId',
                    hideTrigger:true,
                    typeAhead: false,
                    autoSelect: true
                }
            },
            {
                text: 'Plan Benefit Name',
                dataIndex: 'PlanbenefitId',
                renderer: 'planBenefitRenderer',
                editor: {
                    xtype: 'combobox',
                    allowBlank: false,
                    autoLoadOnValue: true,
                    displayField: 'BenefitName',
                    reference: 'cbxplanBenefit',
                    valueField: 'planBenefitId',
                    bind: {store: '{planbenefitlistItem}'
                    }
                }
            },
            {
                text: 'Partner Id',
                dataIndex: 'PartnerId',
                editor: {
                    allowBlank: false
                }
            }, {
                text: 'FilePrefix',
                dataIndex: 'FilePrefix',
                editor: {
                    allowBlank: false
                }
            }, {
                text: 'Effective Date',
                dataIndex: 'EffectiveDate',
                xtype: 'datecolumn',
                //format: 'm/d/Y',
                editor: {
                    xtype: 'datefield',
                    allowBlank: false
                }
            }, {
                text: 'Termination Date',
                dataIndex: 'TerminationDate',
                xtype: 'datecolumn',
               // format: 'm/d/Y',
                editor: {
                    xtype: 'datefield',
                    allowBlank: true
                }
            }, {
                text: 'Allowed Reject Code',
                dataIndex: 'AllowedRejectCodes',
                renderer: 'onRejectionCodeRender',
                editor: {
                    xtype: 'combobox',
                    multiSelect: true,
                    queryMode: 'local',
                    reference: 'allowedRejectCodeCombo',
                    listConfig: {
                        getInnerTpl: function(value) {
                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {id} - {' + value+ '}</div>';
                        }
                    },
                    allowBlank: true,
                    autoSelect:true,
                    autoLoadOnValue: true,
                    displayField: 'value',
                    valueField: 'id',
                    bind: {store: '{rejectedcodes}'}
                }
            }, {
                text: 'Allowed Pharmacy Types',
                dataIndex: 'AllowedPharmacyTypes',
                renderer: 'onAllowedPharmachyRender',

                editor: {
                    xtype: 'combobox',
                    multiSelect: true,
                    queryMode: 'local',
                    reference: 'pharmacyTypeCombo',
                    listConfig: {
                        getInnerTpl: function(name) {
                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + name+ '}</div>';
                        }
                    },
                    allowBlank: true,
                    autoSelect:true,
                    autoLoadOnValue: true,
                    displayField: 'name',
                    valueField: 'value',
                    bind: {store: '{pharmacytypes}'}
                }
            }, {
                text: 'Allowed NCPDP IDs',
                dataIndex: 'AllowedNCPDPIds',
                editor: {
                    allowBlank: true
                }
            }, {
                text: 'Email Recipients',
                dataIndex: 'EmailRecipientList',
                editor: {
                    allowBlank: true
                }
            }, {
                text: 'Secondary Message',
                dataIndex: 'SecondaryMessage',
                editor: {
                    allowBlank: true
                }
            },
            {
                xtype: 'widgetcolumn',
                align: 'center',
                hideable : false,
                widget: {
                    xtype: 'button',
                    width:75,
                    text: 'Reject',
                    iconCls: 'x-action-col-icon x-fa fa-undo',
                    bind: {

                        tooltip: 'Reject '
                    },
                    handler: 'onUndoChangeClick'

                },
                onWidgetAttach: function(col, widget, rec) {

                    widget.setVisible(rec.get('isUpdated'));
                    col.mon(col.up('gridpanel').getView(), {
                        itemupdate: function() {
                            widget.setVisible(rec.get('isUpdated'));
                        }
                    });
                }

            }
            /*{
             text: '',
             xtype: 'widgetcolumn',
             isEditable: false,
             widget: {
             // xtype: 'panel',
             xtype: 'container',
             itemId: 'pcnRuleDetailId',
             width: 75,
             // bind: true,
             border: false,
             bind: {
             hidden: '{!record.isUpdated}'
             },
             items: [
             {
             xtype: 'button',
             text: 'Reject',
             handler: 'onUndoChangeClick',
             iconCls: 'x-action-col-icon x-fa fa-undo',
             width: 75,
             border: false,
             bind: {
             hidden: '{!record.isUpdated}'
             }
             }

             ]
             }
             }*/
        ]
    }
});