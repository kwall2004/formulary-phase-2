/**
 * Created by s6393 on 10/24/2016.
 */
Ext.define('Atlas.benefitplan.view.servicearea.Main', {
    extend: 'Ext.panel.Panel',
    title: 'Service Area Configuration',
    xtype: 'benefitplanservicearea',
    controller: 'benefitplanservicearea',
    viewModel: {
        data: {
            isCountryHidden: true,
            isStateHidden: true,
            isCountyHidden: true,
            currentSelection: null,
            selectedServiceAreaSK: null,
            serviceAreaSelected: false,
            changed: false,
            isReadOnly: false
        },
        stores: {
            bpserviceareaconfig: {
                model: 'Atlas.benefitplan.model.servicearea.ServiceAreas'

            },
            bpserviceareatree: {
                type: 'tree',
                defaultRootProperty: 'ChildrenNodes',
                proxy: {
                    type: 'memory'
                }
            },
            sacountrylookup: {
                model: 'Atlas.benefitplan.model.servicearea.LookupDetails'
            }
        }
    },
    atlasId: 0,
    canChangePBPBnftPlanList: false,
    pbpName: 0,
    layout: 'border',
    items: [
        {
            xtype: 'container',
            region: 'north',
            items: [{
                xtype: 'displayfield',
                reference: 'pbpnamefield',
                name: 'PBPName',
                selectOnFocus: false,
                editable: false,
                fieldLabel: 'PBP Name:'
            }]
        }, {
        xtype: 'fieldset',
        region: 'center',
        width: '100%',
        title: 'Service Area History',
        items: [            {
            xtype : 'label',
            cls:'m-red-color',
            reference: 'approvedInfo',
            text  : 'Package is Approved. Cannot modify service area!',
            hidden:true
        },
            {
            xtype: 'grid',
            minHeight: 200,
            height: '400px',
            bind: '{bpserviceareaconfig}',
                viewConfig: {
                    loadMask: false
                },
            reference: 'bpserviceareagrid',
            plugins: [{
                ptype: 'rowediting',
                clicksToEdit: 2,
                clicksToMoveEditor: 1,
                autoCancel: false,
                autoUpdate: true
            }],
            width: '100%',
            listeners: {
                select: 'selectHistoryRow',
                canceledit: 'onGridItemCancelEdit',
                selectionchange: 'onServiceAreaSelectionChange',
                edit: 'onGridItemComplete',
                beforeedit: 'onGridBeforeEdit'

            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'button',
                    text: 'Add Row',
                    handler: 'addHistoryRow',
                    bind: {
                        disabled: '{isReadOnly}'
                    }
                }, {
                    xtype: 'button',
                    text: 'Remove Row',
                    handler: 'removeHistoryRow',
                    bind: {
                        disabled: '{isReadOnly}'
                    }
                }]
            }],
            columns: [
                {
                dataIndex: 'SvcAreaName',
               // nestedIndex: 'ServiceAreas[0].SvcAreaName',
                header: 'Service Area Name',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },
                {
                dataIndex: 'EfctvStartDt',
                header: 'Effective Start',
                flex: 1,
                formatter: 'date("n/j/Y")',
                allowBlank: false,
                editor: {
                    xtype: 'datefield',
                    format: 'n/j/Y',
                    validator: function (val) {
                        return (new Date(val) < new Date(this.up().items.items[2].value)) ? true : "Must be less than Effective End Date";
                    },
                    allowBlank: false
                }
            },
                {
                dataIndex: 'EfctvEndDt',
              //  nestedIndex: 'ServiceAreas[2].EfctvEndDt',
                header: 'Effective End',
                flex: 1,
                formatter: 'date("n/j/Y")',
                editor: {
                    xtype: 'datefield',
                    format: 'n/j/Y',
                    validator: function (val) {
                        return (new Date(val) > new Date(this.up().items.items[1].value)) ? true : "Must be greater than Effective Start Date";
                    },
                    allowBlank: false
                }
                }, {
                    dataIndex: 'CurrentUser',
                    renderer: 'onCurrentUserRenderer',
                    hidden: true,
                    hideable: false
                }
            ]
        }]
    }, {
        xtype: 'container',
        region: 'south',
        width: '100%',
        height: '40%',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'fieldset',
            title: 'Service Area Hierarchy',
            reference: 'saHierarchyArea',
            flex: 1,
            scrollable: true,
            layout: {
                type:'vbox',
                align: 'stretch'
            },
            width: '100%',
            items: [{
                xtype: 'displayfield',
                reference: 'SvcAreaName',
                fieldLabel: 'Service Area Name:',
                labelWidth: 130,
                bind: '{bpserviceareagrid.selection.SvcAreaName}'
            }, {
                xtype: 'treepanel',
                bind: '{bpserviceareatree}',
                reference: 'sahierarchytree',
                rootVisible: false,
                columns: [{
                    xtype: 'treecolumn',
                    flex: 1,
                    dataIndex: 'EntityDescription'
                }]
            }]
        }, {
            xtype: 'grid',
            scrollable: 'vertical',
            title: 'Service Area Detail',
            height: '400px',
            flex: 1,
            layout: 'fit',
            reference: 'lookupgrid',
            bind: '{sacountrylookup}',
            viewConfig: {
                loadMask: false
            },
            listeners: {
                celldblclick: 'selectDetailItem'
            },
            width: '100%',
            columns: [{
                xtype: 'checkcolumn',
                reference: 'sacountrylookuptree',
                dataIndex: 'Selected',
                listeners:{
                    checkchange:'selectionChangeFunction'
                }, bind:{
                    disabled: '{isReadOnly}'
                }
            }, {
                width:250,
                dataIndex: 'LookupTypeDescription'
            }],
            dockedItems: [{
                xtype: 'toolbar',
                reference: 'sabreadcrumb',
                dock: 'top',
                items: [
                    {
                        xtype: 'checkbox',
                        boxLabel: 'Select All',
                        reference: 'saSelectAll',
                        listeners: {
                            change: 'onSelectAll'
                        }, bind: {
                            disabled: '{isReadOnly}'
                    }
                    },
                    {
                        xtype: 'button',
                        text: 'Country',
                        reference: 'saCountry',
                        handler: 'onCountry',
                        bind: {
                            hidden: '{isCountryHidden}',
                            disabled: '{isReadOnly}'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'State',
                        reference: 'saState',
                        handler: 'onState',
                        bind: {
                            hidden: '{isStateHidden}',
                            disabled: '{isReadOnly}'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'County/Zip',
                        reference: 'saCounty',
                        handler: 'onCounty',
                        bind: {
                            hidden: '{isCountyHidden}',
                            disabled: '{isReadOnly}'
                        }
                    }
                ]
            }]
        }]
    }],
    bbar: [
        '->',
        {
            text: 'Cancel',
            handler: 'onCancel',
            bind:{
                disabled: '{isReadOnly}'
            }
        },
        {
            text: 'Save',
            handler: 'onSave',
            bind: {
                disabled: '{!serviceAreaSelected || isReadOnly}'
            }
        }
    ]
});