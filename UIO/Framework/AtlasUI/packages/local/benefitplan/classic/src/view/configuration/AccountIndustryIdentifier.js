/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.view.configuration.AccountIndustryIdentifier', {
    extend: 'Ext.form.FieldSet',
    controller: 'accountIndustryIdentifierController',
    alias: 'widget.accountIndustryIdentifier-grid',
    reference: 'accountIndustryIdentifierGrid',
    title: 'BIN/PCN/Payer ID Setup',
    scrollable: 'true',
    height: 300,
    layout: 'fit',

    viewModel: {
        data:{
            changeAccountValue: false
        },
        stores:
        {
            accountIndustryIdentifier:
            {
                model: 'Atlas.benefitplan.model.AccountIndustryIdentifier',
                proxy: {
                    type: 'benefitplan',
                    url: '/AccountIndustryIdentifier'
                }
            },
            tenantIndustryIdentifier: {
                type: 'tenantIndustryIdentifier-store'
            },
            payerTypes:
            {
                type: 'industryIdentifierType-store'
            },
            valuesCombo:
            {
                model: 'Atlas.benefitplan.model.TenantIndustryIdentifier',
                proxy: {
                    type: 'benefitplan',
                    url: '/TenantIndustryIdentifier'
                }
            },
            typesCombo: {
                model: 'Atlas.benefitplan.model.AccountIndustryIdentifierTypes'
            }
        }
    },
    items: [
        {
            xtype: 'grid',
            title: 'BIN/PCN/PayerIDs',
            itemId:'BCNGrid',
            reference:'bcnGrid',
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
                autoCancel: false,
                pluginId: 'rowEditing'
            }],
            viewConfig: {
                loadMask: false
            },
            bind: {
                store: '{accountIndustryIdentifier}'
            },
            columns: [
                {
                    dataIndex: 'AcctTypeKey',
                    hidden: true
                },
                {
                    dataIndex: 'ValueID',
                    hidden: true
                },
                {
                    dataIndex: 'TenantTypeKey',
                    hidden: true
                },
                {
                    header: 'Type',
                    dataIndex: 'IndustryIdentifier',
                    flex: 1,
                    editor: {
                        xtype: 'combo',
                        typeAhead: true,
                        allowBlank: false,
                        forceSelection: true,
                        queryMode: 'local',
                        name: 'payerTypes',
                        displayField: 'Type',
                        valueField: 'IndustryIdentifier',
                        bind: {
                            store: '{typesCombo}'
                        },
                        listeners: {
                            select: 'onPayerTypeSelected'
                        }
                    },
                    renderer:'onRender'
                },
                {
                    header: 'Value',
                    dataIndex: 'Value',
                    flex: 1,
                    editor: {
                        xtype: 'combobox',
                        forceSelection: true,
                        name: 'Value',
                        itemId: 'Value',
                        allowBlank: false,
                        displayField: 'Value',
                        valueField: 'Value',
                        validator: function(val){
                            if(this.up().down('[dataIndex="IndustryIdentifier"]').getValue() == 20) // BIN
                            {
                                var rec = this.up().up().getStore('accountIndustryIdentifier').findExact('Value', val);
                                if(rec > -1)
                                {
                                    return "This BIN value is already added to this account.";
                                }
                                return (val.length == 6 && !isNaN(val) && val.indexOf('.') == -1)? true : "Value must be 6-digit number";
                            }
                            if(this.up().down('[dataIndex="IndustryIdentifier"]').getValue() == 10) // PCN
                            {
                                var rec = this.up().up().getStore('accountIndustryIdentifier').findExact('Value', val);
                                if(rec > -1)
                                {
                                    return "This PCN value is already added to this account.";
                                }
                                return (val.length <=32) ? true : "Must be maximum of 32 characters.";
                            }
                            if(this.up().down('[dataIndex="IndustryIdentifier"]').getValue() == 30) // PayerID
                            {
                                var rec = this.up().up().getStore('accountIndustryIdentifier').findExact('Value', val);
                                if(rec > -1)
                                {
                                    return "This PayerID value is already added to this account.";
                                }
                                return (val.length <=32) ? true : "Must be maximum of 32 characters.";
                            }
                        },
                        bind: {
                            store: '{valuesCombo}'
                        },
                        listeners: {
                            select: 'onPayerValueSelected'
                        }
                    }
                   //,renderer:'onRenderValues'
                }
                ],

            tbar: [

                {
                    text: 'Add Row',
                    handler: 'onAddClick'
                },
                {
                    text: 'Remove Row',
                    reference: 'removeRow',
                    handler: 'onRemoveClick',
                    bind:{
                        disabled: '{!changeAccountValue}'

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