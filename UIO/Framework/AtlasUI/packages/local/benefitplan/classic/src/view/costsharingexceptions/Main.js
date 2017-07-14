/**
 * Created by s6393 on 10/24/2016.
 */
Ext.define('Atlas.benefitplan.view.costsharingexceptions.Main', {
    extend: 'Ext.form.Panel',
    title: 'Cost Sharing Exceptions',
    layout: 'fit',

    trackResetOnLoad: true,
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,

    controller: 'costSharingExceptionsController',
    viewModel: 'costSharingExceptionsViewModel',
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    items: [
        {
            xtype: 'container',
            layout: 'border',
            items: [
                {
                    xtype: 'benefitplan-progress',
                    region: 'north',
                    itemId: 'thermometerPanel'
                },
                {
                    xtype: 'container',
                    scrollable : true,
                    region: 'center',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Copay Exclusions',
                            items: [
                                /*Copay Exclusions Grid*/
                                {
                                    xtype: 'grid',

                                    reference:  'copayExclusionsGrid',
                                    minHeight: 200,
                                    defaults: {
                                        sortable: true,
                                        filter: {
                                            type: 'string'
                                        }
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        pluginId: 'rowEditing',
                                        reference: 'rowEditing',
                                        clicksToEdit: 2,
                                        clicksToMoveEditor: 1,
                                        autoCancel: false
                                    }],
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    columns: [
                                        {
                                            header: 'Exception Qualifier',
                                            dataIndex: 'CopayOvrrdQulfrTypeSK',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind:
                                                {
                                                    store: '{copayOverrideQualifierType}'
                                                },
                                                queryMode: 'local',
                                                name: 'copayOverrideQualifierType',
                                                displayField: 'CopayOvrrdQulfrTypeCode',
                                                valueField: 'CopayOvrrdQulfrTypeSK',
                                                publishes: 'CopayOvrrdQulfrTypeSK',
                                                listeners:{
                                                    change:'checkValidation'
                                                }

                                            },
                                            renderer:'getEditorDisplayValue'
                                        },
                                        {
                                            header: 'Value',
                                            dataIndex: 'CopayOvrrdVal',
                                            flex: 1,
                                            dirtyText: 'Value has been edited',
                                            editor: {
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                enableKeyEvents: true,
                                                maxLength: 14,
                                                listeners:{
                                                    focus: 'copayExclusionChange'
                                                }
                                            }
                                        },
                                        {
                                            header: 'Copay',
                                            dataIndex: 'CopayAmt',
                                            flex: 1,
                                            xtype: 'numbercolumn',
                                            formatter: 'usMoney',
                                            dirtyText: 'Copay Amount has been edited',
                                            editor: {
                                                xtype: 'numberfield',
                                                vtype: 'currency',
                                                allowBlank: false,
                                                enableKeyEvents: true,
                                                decimalPrecision : 0,
                                                hideTrigger : true,
                                                maxValue : 999,
                                                listeners: {
                                                    blur: function(oThis){
                                                        oThis.up().up().getColumns()[2].field.regex = /(?!^0*$)(?!^0*\.0*$)^\d{1,8}(\.\d{1,2})?$/ ;
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            header: 'Coinsurance %',
                                            dataIndex: 'CoinsurancePct',
                                            dirtyText: 'Coinsurance has been edited',
                                            xtype: 'numbercolumn',
                                            format: '0.00',
                                            renderer: function (value) {
                                                return value + '%';
                                            },
                                            flex: 1,
                                            editor: {
                                                vtype: 'percent',
                                                allowBlank: false,
                                                listeners: {
                                                    blur: function(oThis){
                                                        oThis.up().up().getColumns()[3].field.regex = /(?!^0*$)(?!^0*\.0*$)^\d{1,8}(\.\d{1,2})?$/ ;
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            header: 'Logic',
                                            dataIndex: 'CopayCoinsuranceLogicTypeSK',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind:
                                                {
                                                    store: '{copayCoinsuranceLogicType}'
                                                },
                                                queryMode: 'local',
                                                name: 'copayCoinsuranceLogicType',
                                                displayField: 'CopayCoinsuranceLogicTypeCode',
                                                valueField: 'CopayCoinsuranceLogicTypeSK'
                                            },
                                            renderer:'getEditorDisplayValue'
                                        }],
                                    listeners: {
                                        selectionchange: 'onSelectionChange',
                                        canceledit: 'onGridItemCancelEdit',
                                        edit: 'onGridItemComplete',
                                        beforeedit: 'onGridBeforeEdit',
                                        validateedit : 'validateEdit',
                                        itemdblclick: 'checkValidation'
                                    },
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onCopyExclusionsGridAddRowClick'
                                        },
                                        {
                                            text: 'Remove Row',
                                            handler: 'onCopyExclusionsGridRemoveRowClick',
                                            bind:
                                            {
                                                disabled: '{!copayExclusionsGrid.selection}'
                                            }
                                        }]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Dispense As Written Copay',
                            items: [
                                /*Dispense As Written Copay Grid*/
                                {
                                    xtype: 'grid',
                                    reference:'dispenseAsWrittenCopayGrid',
                                    minHeight: 200,
                                    defaults: {
                                        sortable: true,
                                        filter: {
                                            type: 'string'
                                        }
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        reference: 'rowediting',
                                        clicksToEdit: 2,
                                        clicksToMoveEditor: 1,
                                        pluginId: 'rowEditing',
                                        autoCancel: false
                                    }],
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    columns: [

                                        {
                                            header: 'DAW',
                                            dataIndex: 'DAWTypeSK',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{dispenseAsWrittenType}'
                                                },
                                                queryMode: 'local',
                                                name: 'DAWTypeSK',
                                                displayField: 'DAWTypeDesc',
                                                valueField: 'DAWTypeSK',
                                                publishes: 'DAWTypeSK'
                                            },
                                            renderer:'getEditorDisplayValue'
                                        },
                                        {
                                            header: 'Percentage of Drug Cost OR Cost Difference',
                                            dataIndex: 'BrandGenrcDifferenceInd',
                                            flex: 1,
                                            dirtyText: 'Percentage of Drug Cost OR Cost Difference has been edited',
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{BrandGenrcDifferenceIndStore}'
                                                },
                                                queryMode: 'local',
                                                displayField: 'display',
                                                valueField: 'BrandGenrcDifferenceInd',
                                                listeners: {
                                                    change: function(oThis){
                                                        var store = oThis.up().up().getStore();
                                                        var dataItems = store.data.items;
                                                        for(var i = 0; i<dataItems.length; i++){
                                                            if(oThis.getValue() == "true"){

                                                                oThis.up().up().columns[2].field.allowBlank = true;
                                                            }
                                                            else{
                                                                oThis.up().up().columns[2].field.allowBlank = false;

                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            renderer:'getEditorDisplayValue'
                                        },
                                        {
                                            header: 'Percentage',
                                            dataIndex: 'PctofDrugCost',
                                            xtype: 'numbercolumn',
                                            format: '0.00',
                                            renderer: function (value) {
                                                return value + '%';
                                            },
                                            flex: 1,
                                            dirtyText: 'Percentage has been edited',

                                            editor: {
                                                vtype: 'percent',
                                                hideTrigger : true
                                            }
                                        },
                                        {
                                            header: 'Apply Copay',
                                            dataIndex: 'ApplyCopayInd',
                                            stopSelection: true,
                                            renderer: function(aValue, aMetadata){
                                                aMetadata.style = "text-align: center";
                                                return '<div class="x-grid-checkcolumn' + (aValue != null && aValue == true ? '-checked' : '') + '"> </div>';
                                            },
                                            flex: 1,
                                            dirtyText: 'Apply Copay has been edited',
                                            editor: {
                                                xtype: 'checkbox',
                                                uncheckedValue: false,
                                                cls: 'x-grid-checkheader-editor'
                                            }

                                        },
                                        {
                                            header: 'Apply Difference to OOP',
                                            dataIndex: 'ApplyDifferencetoOOPInd',
                                            stopSelection: true,
                                            renderer: function(aValue, aMetadata){
                                                aMetadata.style = "text-align: center";
                                                return '<div class="x-grid-checkcolumn' + (aValue != null && aValue == true ? '-checked' : '') + '"> </div>';
                                            },
                                            flex: 1,
                                            dirtyText: 'Apply Difference to OOP has been edited',
                                            editor: {
                                                xtype: 'checkbox',
                                                uncheckedValue: false,
                                                cls: 'x-grid-checkheader-editor'
                                            }
                                        }],
                                    listeners: {
                                        selectionchange: 'onSelectionChange',
                                        canceledit: 'onGridItemCancelEdit',
                                        edit: 'onGridItemComplete',
                                        beforeedit: 'onGridBeforeEdit',
                                        validateedit:'validateDAWEdit'
                                    },

                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onDispenseAsWrittenCopayAddRowClick'
                                        },
                                        {
                                            text: 'Remove Row',
                                            handler: 'onDispenseAsWrittenCopayRemoveRowClick',
                                            bind:
                                            {
                                                disabled: '{!dispenseAsWrittenCopayGrid.selection}'
                                            }
                                        }]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Deductible Exceptions',
                            items: [
                                /*Deductible Exceptions Grid*/
                                {
                                    xtype: 'grid',
                                    reference:'deductibleExceptionsGrid',
                                    minHeight: 200,
                                    defaults: {
                                        sortable: true,
                                        filter: {
                                            type: 'string'
                                        }
                                    },
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        reference: 'rowediting',
                                        clicksToEdit: 2,
                                        clicksToMoveEditor: 1,
                                        pluginId: 'rowEditing',
                                        autoCancel: false
                                    }],
                                    columns: [
                                        {
                                            header: 'Deductible Exception Qualifier',
                                            dataIndex: 'DeducblExclQulfrTypeSK',
                                            dirtyText: 'Deductible Exception Qualifier has been edited',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                queryMode: 'local',
                                                bind: {
                                                    store: '{deductibleExclusionQualifierType}'
                                                },
                                                name: 'deductibleExceptionQualifiertType',
                                                displayField: 'DeducblExclQulfrTypeCode',
                                                valueField: 'DeducblExclQulfrTypeSK',
                                                publishes: 'DeducblExclQulfrTypeSK',
                                                listeners:{
                                                    change:'checkDeductibleValidation'

                                                }
                                            },
                                            renderer:'getEditorDisplayValue'
                                        },
                                        {
                                            header: 'Deductible Exception Value',
                                            dataIndex: 'DeducbleExclVal',
                                            flex: 1,
                                            dirtyText: 'Deductible Exception Value has been edited',
                                            editor: {
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                enableKeyEvents: true,
                                                maxLength: 14,
                                                listeners:{
                                                    focus:'deductibleExceptionChange'

                                                }
                                            }
                                        },
                                        {
                                            header: 'Counts Toward OOP',
                                            dataIndex: 'CntTowardsMOOPInd',
                                            flex: 1,
                                            renderer: function(aValue, aMetadata){
                                                aMetadata.style = "text-align: center";
                                                return '<div class="x-grid-checkcolumn' + (aValue != null && aValue == true ? '-checked' : '') + '"> </div>';
                                            },
                                            dirtyText: 'Counts Toward OOP has been edited',
                                            editor: {
                                                xtype: 'checkbox',
                                                cls: 'x-grid-checkheader-editor',
                                                uncheckedValue: false
                                            }
                                        }],
                                    listeners: {
                                        selectionchange: 'onSelectionChange',
                                        canceledit: 'onGridItemCancelEdit',
                                        edit: 'onGridItemComplete',
                                        beforeedit: 'onGridBeforeEdit',
                                        validateEdit: 'DeductibleExceptionValidateEdit',
                                        itemdblclick: 'checkDeductibleValidation'
                                    },
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onDeductibleExclusionGridAddRowClick'
                                        },
                                        {
                                            text: 'Remove Row',
                                            handler: 'onDeductibleExclusionGridRemoveRowClick',
                                            bind:
                                            {
                                                disabled: '{!deductibleExceptionsGrid.selection}'
                                            }
                                        }]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Fill Exceptions',
                            items: [
                                /*Fill Exceptions Grid*/
                                {
                                    xtype: 'grid',
                                    reference:'fillExceptionsGrid',
                                    minHeight:200,
                                    defaults: {
                                        sortable: true,
                                        filter: {
                                            type: 'string'
                                        }
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        reference: 'rowediting',
                                        clicksToEdit: 2,
                                        clicksToMoveEditor: 1,
                                        pluginId: 'rowEditing',
                                        autoCancel: false
                                    }],
                                    bind: {
                                        selection: '{selectedFillExceptionsGridRow}'
                                    },
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    columns: [
                                        {
                                            header: 'Pharmacy Type',
                                            dataIndex: 'PharmTypeSK',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{benefitPlanPharmacyType}'
                                                },
                                                queryMode: 'local',
                                                name: 'benefitPlanPharmacyType',
                                                displayField: 'PharmTypeCode',
                                                valueField: 'PharmTypeSK',
                                                publishes: 'PharmTypeSK'
                                            },
                                            renderer:'getEditorDisplayValue'
                                        },
                                        {
                                            header: 'Drug Class',
                                            dataIndex: 'DrugClsTypeSK',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{drugClassType}'
                                                },
                                                queryMode: 'local',
                                                name: 'DrugClsTypeSK',
                                                displayField: 'DrugClsTypeCode',
                                                valueField: 'DrugClsTypeSK',
                                                publishes: 'DrugClsTypeSK'
                                            },
                                            renderer:'getEditorDisplayValue'
                                        },
                                        {
                                            header: 'Fill Range Min. Amount',
                                            dataIndex: 'FillRngMinAmt',
                                            dirtyText: 'FillRange has been edited',
                                            flex: 1,
                                            editor: {
                                                itemId: 'FillRngMinAmt',
                                                xtype: 'textfield',
                                                vtype: 'numeric',
                                                allowBlank: false,
                                                validator: function (val) {
                                                    if (this.up().down('[itemId="FillRngMaxAmt"]').getValue() != '' && this.up().down('[itemId="FillRngMaxAmt"]').getValue() != null && val > this.up().down('[itemId="FillRngMaxAmt"]').getValue()) {
                                                        return "Must be less than or equal to Fill Range Max. Amount";
                                                    } else if (val < 1) {
                                                        return "Must be greater than 1";
                                                    } else if (val > 999) {
                                                        return "Must be less than 999";
                                                    } else {
                                                        return true;
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            header: 'Fill Range Max. Amount',
                                            dataIndex: 'FillRngMaxAmt',
                                            dirtyText: 'FillRange has been edited',
                                            flex: 1,
                                            editor: {
                                                itemId: 'FillRngMaxAmt',
                                                xtype: 'textfield',
                                                vtype: 'numeric',
                                                allowBlank: true,
                                                validator: function (val) {
                                                    if (val != null && val != '' && val < this.up().down('[itemId="FillRngMinAmt"]').getValue()) {
                                                        return "Must be greater than or equal to Fill Range Min. Amount";
                                                    } else if (val != null && val != '' && val < 1) {
                                                        return "Must be greater than 1";
                                                    } else if (val != null && val != '' && val > 999) {
                                                        return "Must be less than 999";
                                                    } else {
                                                        return true;
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            header: 'Change Qualifier',
                                            dataIndex: 'FillExcpChngQulfrTypeSK',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{fillExceptionChangeQualifierType}'
                                                },
                                                queryMode: 'local',
                                                name: 'FillExcpChngQulfrTypeSK',
                                                displayField: 'FillExcpChngQulfrTypeCode',
                                                valueField: 'FillExcpChngQulfrTypeSK',
                                                publishes: 'FillExcpChngQulfrTypeSK'
                                            },
                                            renderer:'getEditorDisplayValue'
                                        },{
                                            header: 'Multiplier',
                                            dataIndex: 'MultiplierAmt',
                                            xtype: 'numbercolumn',
                                            format: '0.0',
                                            dirtyText: 'Multiplier has been edited',
                                            flex: 1,
                                            editor: {
                                                reference: 'MultiplierAmtEditor',
                                                vtype: 'multiplier',
                                                allowBlank: false,
                                                hideTrigger : true,
                                                bind:{
                                                    disabled: '{!multiplierAmount}'
                                                }
                                            }
                                        }],

                                    listeners: {
                                        selectionchange: 'onSelectionChange',
                                        canceledit: 'onGridItemCancelEdit',
                                        edit: 'onGridItemComplete',
                                        beforeedit: 'onGridBeforeEdit',
                                        validateedit: 'onGridValidateEdit'
                                    },
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onFillExceptionsGridAddRowClick'
                                        },
                                        {
                                            text: 'Remove Row',
                                            handler: 'onFillExceptionsGridRemoveRowClick',
                                            bind:
                                            {
                                                disabled: '{!fillExceptionsGrid.selection}'
                                            }
                                        }]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            text: 'Cancel',
            handler : 'costSharingExceptionsBtnCancel'
        },
        {
            text: 'Save',
            handler : 'onCostSharingExceptionsSave',
            bind:{
                disabled: '{!changed}'
            }
        }
    ]
});