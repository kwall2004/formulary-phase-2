/**
 * Created by s6393 on 9/29/2016.
 */
Ext.define('Atlas.benefitplan.view.configuration.TenantIndustryIdentifier', {
    extend: 'Ext.form.FieldSet',
    controller: 'tenantIndustryIdentifierController',
    alias: 'widget.tenantIndustryIdentifier-grid',
    reference: 'tenantIndustryIdentifierGrid',
    title: 'BIN/PCN/Payer ID Setup',
    scrollable: 'true',
    height: 300,
    layout: 'fit',
    viewModel: {
        data: {
            selectedIndustryIdentifier: -1,
            changeTenantData:false
        },
        stores: {
            tenantIndustryIdentifier: {
                type: 'tenantIndustryIdentifier-store'
            },
            payerTypes:
            {
                type: 'industryIdentifierType-store'
            }
        }
    },
    items: [
        {
            xtype: 'grid',
            title: 'BIN/PCN/PayerIDs',
            itemId:'BCNGrid',
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
            bind: {
                store: '{tenantIndustryIdentifier}'
            },

            columns: [
                {
                    text: 'ValueID',
                    dataIndex: 'ValueID',
                    hidden: true
                },
                {
                    text: 'TenantTypeKey',
                    dataIndex: 'TenantTypeKey',
                    hidden: true
                },{
                header: 'Type',
                dataIndex: 'IndustryIdentifier',
                flex: 1,
                editor: {
                    xtype: 'combo',

                    bind: {
                        store: '{payerTypes}'
                    },
                    allowBlank: false,
                    enableKeyEvents: true,
                    typeAhead: true,
                    forceSelection: true,
                    queryMode: 'local',
                    listeners: {
                        change: function(field, value) {
                            //debugger;
                            if(value == 20 || value == 10) {
                                this.up().down('[dataIndex="Description"]').setValue('Pharmacy');
                            }
                            else {
                                this.up().down('[dataIndex="Description"]').setValue('Medical');
                            }
                        }
                    },
                    name: 'payerTypes',
                    displayField: 'Text',
                    valueField: 'Value',
                    publishes: 'value'
                },
               renderer:'onRender'
            },
                {
                    header: 'Value',
                    dataIndex: 'Value',
                    flex: 1,
                    dirtyText: 'Value has been edited',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false,
                        enableKeyEvents: true,
                        validator: function(val){

                            if(this.up().down('[dataIndex="IndustryIdentifier"]').getValue() == 20) // BIN
                            {
                                var rec = this.up().up().getStore('tenantIndustryIdentifier').findRecord('Value', val, 0, false, false, true);
                                if(rec)
                                {
                                    return(rec.data.value == val) ? true : "Value must be unique.";
                                }
                                return (val.length == 6 && !isNaN(val) && val.indexOf('.') == -1)? true : "Value must be 6-digit number";
                            }
                            else
                            {
                                if(this.up().down('[dataIndex="IndustryIdentifier"]').getValue() == 10) // PCN
                                {
                                    var rec = this.up().up().getStore('tenantIndustryIdentifier').findRecord('Value', val, 0, false, false, true);
                                    if(rec)
                                    {
                                        return(rec.data.value == val) ? true : "Value must be unique.";
                                    }
                                    //!/[^a-zA-Z0-9]/.test(val)
                                }
                                if(this.up().down('[dataIndex="IndustryIdentifier"]').getValue() == 30) // PayerID
                                {
                                    var rec = this.up().up().getStore('tenantIndustryIdentifier').findRecord('Value', val, 0, false, false, true);
                                    if(rec)
                                    {
                                        return(rec.data.value == val) ? true : "Value must be unique.";
                                    }
                                }
                                return (val.length <= 32 && val.match(/^[0-9a-zA-Z]+$/) )? true : "Must be maximum of 32 alphanumeric characters.";
                            }
                        }
                    }
                },
                {
                    header: 'Description',
                    dataIndex: 'Description',
                    flex: 1,
                    dirtyText: 'Description has been edited',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    xtype: 'datecolumn',
                    header: 'Effective Start Date',
                    dataIndex: 'EfctvStartDt',
                    flex: 1,
                    format: 'n/j/Y',
                    editor: {
                        xtype: 'datefield',
                        emptyText: 'Select Effective End Date',
                        format: 'n/j/Y',
                        itemId: 'EfctvStartDt',
                        fieldLabel: 'Effective Start Date',
                        allowBlank: false,
                        validator: function (val) {
                            return (new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) ? true : "Must be less than Effective End Date";
                        }
                    }
                },
                {
                    xtype: 'datecolumn',
                    header: 'Effective End Date',

                    dataIndex: 'EfctvEndDt',
                    flex: 1,
                    format: 'n/j/Y',
                    editor: {
                        xtype: 'datefield',
                        fieldLabel: 'Effective End Date',
                        emptyText: 'Select Effective End Date',
                        format: 'n/j/Y',
                        itemId: 'EfctvEndDt',
                        allowBlank: false,
                        validator: function (val) {
                            return (new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) ? true : "Must be greater than Effective Start Date";
                        },
                        listeners: {
                            change: function (field, value) {
                                field.lookupViewModel().set('changed', true);
                            }
                        }
                    }
                }],

            tbar: [
                {
                    text: 'Add Row',
                    handler: 'onAddClick'
                },
                {
                    text: 'Remove Row',
                    reference: 'removeRow',
                    handler: 'onRemoveClick',
                    bind: {
                        disabled: '{!changeTenantData}'
                    }
                }],
            listeners: {
                selectionchange: 'onSelectionChange',
                beforeedit: 'onGridItemStartEdit',
                canceledit: 'onGridItemCancelEdit',
                edit: 'onGridItemComplete'
            }
        }

    ]

});
