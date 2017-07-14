/**
 * Created by agupta on 8/30/2016.
 */
Ext.define('Atlas.formulary.view.FormularyGeneralInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'formularygeneralinfo',
    itemId: 'formularygeneralinfo',
    title: 'Formulary General Information',
    controller: 'formulary',
    viewModel: {
        data: {
            rec: null
        }

    },

    scrollable: true,
    layout: 'hbox',

    items:[
        {
            xtype: 'panel',
            cls: 'card-panel',
            frame: true,
            autoscroll: true,
            itemId: 'formInfo',
            flex: 1,
            height: 900,
            width: '70%',
            items: [{
                xtype: 'fieldset',
                title: 'Formulary Info',
                Layout: 'form',
                defaults: {
                    anchor: '70%',
                    labelWidth: 200
                },

                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Formulary Name',
                        itemId: 'FormularyName',
                        name: 'FormularyName',
                        allowBlank: false,
                        bind: {value: '{rec.FormularyName}'},
                        readOnly: true
                    }
                    , {
                        xtype: 'combobox',
                        fieldLabel: 'Data Source',
                        readOnly: true,
                        itemId: 'dataSource',
                        name: 'dataSource',
                        allowBlank: false,
                        forceSelection: true,
                        emptyText: 'Data Source',
                        bind: {store: '{StoreDataSource}', value: '{rec.dataSource}'},
                        displayField: 'name',
                        valueField: 'value',
                        width: '250px',
                        listeners: {
                            select: 'onDataSourceLoad'
                        }
                    }
                    , {
                        xtype: 'combobox',
                        fieldLabel: 'Formulary Type',
                        readOnly: true,
                        itemId: 'formularyType',
                        forceSelection: true,
                        name: 'formularyType',
                        emptyText: 'Formulary Type',
                        bind: {store: '{StoreFormularyType}', value: '{rec.formularyType}'},
                        displayField: 'name',
                        valueField: 'value',
                        width: '250px'
                    }
                    , {
                        xtype: 'combobox',
                        fieldLabel: 'Drug Type',
                        readOnly: true,
                        itemId: 'drugTypeFunction',
                        name: 'drugTypeFunction',
                        allowBlank: false,
                        forceSelection: true,
                        emptyText: 'Drug Type',
                        bind: {store: '{StoreDrugType}', value: '{rec.drugTypeFunction}'},
                        displayField: 'ListDescription',
                        valueField: 'ListItem',
                        width: '250px'
                    }
                    , {
                        xtype: 'textfield',
                        fieldLabel: 'Drug Active Days',
                        emptyText: 'Default 365',
                        maskRe: /[0-9]/,
                        readOnly: true,
                        itemId: 'activeDays',
                        width: '250px',
                        bind: {value: '{rec.activeDays}'},
                        minValue: 0
                    }
                    , {
                        xtype: 'checkbox',
                        fieldLabel: 'Exclude OTC Drugs',
                        readOnly: true,
                        itemId: 'incExcOTC',
                        width: '250px',
                        bind: {value: '{rec.incExcOTC}'},
                        labelWidth: 205
                    }
                    , {
                        xtype: 'checkbox',
                        fieldLabel: 'Auto Add New Drugs',
                        readOnly: true,
                        itemId: 'autoAddNewDrugs',
                        width: '250px',
                        bind: {value: '{rec.autoAddNewDrugs}'},
                        labelWidth: 205
                    }
                    , {
                        xtype: 'datefield',
                        fieldLabel: 'Effective Date',
                        readOnly: true,
                        itemId: 'EffectiveDate',
                        width: '250px',
                        allowBlank: false,
                        format: 'm/d/Y',
                        emptyText: '[mm/dd/yyyy]',
                        validationEvent: 'change',
                        validator: function (value) {
                            var now = new Date;
                            if (value != '') {
                                var dateFragements = value.split('/');
                                var date = dateFragements[2] + "-" + dateFragements[0] + "-" + dateFragements[1];
                                var startDate = new Date(date);
                                new Date(startDate.setTime(startDate.getTime()))
                                if (startDate > now) {
                                    return true;
                                }
                                else {
                                    return 'Effective date must be greater than today date.';
                                }
                            }
                        }
                    }
                    , {
                        xtype: 'displayfield',
                        fieldLabel: 'Version',
                        readOnly: true,
                        itemId: 'FormularyVersion',
                        width: '250px',
                        bind: {value: '{rec.FormularyVersion}'},
                        fieldStyle: {'margin-left': '10px !important'}
                    }
                    , {
                        xtype: 'displayfield',
                        fieldLabel: 'Current Status',
                        readOnly: true,
                        itemId: 'Stat',
                        width: '250px',
                        bind: {value: '{rec.StatDesc}'},
                        fieldStyle: {'margin-left': '10px !important'}
                    }
                    , {
                        xtype: 'displayfield',
                        fieldLabel: 'Created Date',
                        readOnly: true,
                        itemId: 'CreateDateTime',
                        width: '250px',
                        bind: {value: '{rec.CreateDateTime}'},
                        renderer: function(value, field){
                            if(value != null){
                                return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                            }
                        },
                        //renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                        fieldStyle: {'margin-left': '10px !important'}
                    }
                    , {
                        xtype: 'displayfield',
                        fieldLabel: 'Created By',
                        readOnly: true,
                        itemId: 'CreateBy',
                        width: '250px',
                        bind: {value: '{rec.CreatedBy}'},
                        fieldStyle: {'margin-left': '10px !important'}
                    }
                    , {
                        xtype: 'displayfield',
                        fieldLabel: 'Associated Plan(s)',
                        readOnly: true,
                        itemId: 'AssociatedPlans',
                        bind: {value: '{rec.AssociatedPlans}'},
                        fieldStyle: {'margin-left': '10px !important'}
                    }
                    , {
                        xtype: 'textfield',
                        fieldLabel: 'Formulary Printing Program',
                        readOnly: true,
                        itemId: 'pdfPrintFunction',
                        width: '250px',
                        bind: {value: '{rec.pdfPrintFunction}'}
                    }

                ]
            },
                {
                    xtype: 'fieldset',
                    title: 'Formulary Exclusions',
                    itemId: 'FormExclusions',
                    collapsible: true,
                    Layout: 'form',
                    defaults: {
                        anchor: '70%',
                        labelWidth: 200
                    },

                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'ExcDrug',
                            fieldLabel: 'Exclude Drug Categories',
                            bind: {
                                store: '{StoreExcTPACodesFDB}'
                            },
                            displayField: 'name',
                            valueField: 'value',
                            name: 'queuelist',
                            readOnly: true,
                            multiSelect: true,
                            selectOnFocus: false,
                            forceSelection: true,
                            editable: true,
                            readOnly: true,
                            queryMode: 'local',
                            tpl: new Ext.XTemplate('<tpl for=".">'
                                + '<div class="x-boundlist-item" >'
                                + '<tpl if="this.checkStatus(values) == true">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked="true" >&nbsp;{name}'
                                + '</tpl>'
                                + '<tpl if="this.checkStatus(values) == false">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" >&nbsp;{name}'
                                + '</tpl>'
                                + '</div></tpl>',
                                {
                                    checkStatus: function (values) {
                                        if (this.field.up().up().up().getViewModel().getData().rec != null && this.field.up().up().up().getViewModel().getData().rec.data != null
                                            && this.field.up().up().up().getViewModel().getData().rec.data.excTPARestrictionCodes != null) {
                                            var storeRejectionCodes = this.field.up().up().up().getViewModel().getData().rec.data.excTPARestrictionCodes;
                                            // var rejectionCodeList = [];
                                            // rejectionCodeList = storeRejectionCodes.split(',');
                                            if(this.field.lastValue!="" &&this.field.lastValue!=null) {
                                                if (this.field.lastValue.indexOf(values.value) != -1)
                                                    return true;
                                            }
                                            return (storeRejectionCodes.indexOf(values.value) != -1 ? true : false);
                                        }
                                        return false;
                                    }

                                }
                            ),
                            listeners: {
                                select: function (combo, records) {
                                    var node;
                                    Ext.each(records, function (rec) {
                                        node = combo.getPicker().getNode(rec);
                                        Ext.get(node).down('input').dom.checked = true;
                                    });
                                },
                                beforedeselect: function (combo, rec) {
                                    var node = combo.getPicker().getNode(rec);
                                    Ext.get(node).down('input').dom.checked = false;
                                }
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{name}, ',
                                '</tpl>'
                            )
                            //tpl: new Ext.XTemplate('<tpl for=".">'
                            //    + '<div class="x-boundlist-item" >'
                            //    + '{name}'
                            //    + '</div></tpl>'
                            ////)
                            //listConfig: {
                            //    getInnerTpl: function () {
                            //        return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {name} </div>';
                            //    }
                            //}
                            //tpl: new Ext.XTemplate('<tpl for=".">'
                            //    + '<div class="x-boundlist-item" >'
                            //    + '{name}'
                            //    + '</div></tpl>'
                            //    //{
                            //    //    checkStatus: function(values){
                            //    //        debugger;
                            //    //        if(this.field.up().up().up().getViewModel().getData().rec !=null && this.field.up().up().up().getViewModel().getData().rec.data !=null
                            //    //            && this.field.up().up().up().getViewModel().getData().rec.data.excTPARestrictionCodes!=null) {
                            //    //            var storeRejectionCodes = this.field.up().up().up().getViewModel().getData().rec.data.excTPARestrictionCodes;
                            //    //            // var rejectionCodeList = [];
                            //    //            // rejectionCodeList = storeRejectionCodes.split(',');
                            //    //            if(this.field.lastValue.indexOf(values.value)!=-1)
                            //    //            return true;
                            //    //            return (storeRejectionCodes.indexOf(values.value) != -1 ? true : false);
                            //    //        }
                            //    //        return false;
                            //    //    }
                            //    //}
                            //)
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'ExcRoute',
                            forceSelection: true,
                            fieldLabel: 'Exclude Route of Admins.',
                            bind: {
                                store: '{StoreExcRtOfAdminFDB}'
                            },
                            displayField: 'name',
                            valueField: 'value',
                            name: 'queuelist',
                            multiSelect: true,
                            selectOnFocus: false,
                            editable: true,
                            readOnly: true,
                            queryMode: 'local',
                            tpl: new Ext.XTemplate('<tpl for=".">'
                                + '<div class="x-boundlist-item" >'
                                + '<tpl if="this.checkStatus(values) == true">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked="true" >&nbsp;{name}'
                                + '</tpl>'
                                + '<tpl if="this.checkStatus(values) == false">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" >&nbsp;{name}'
                                + '</tpl>'
                                + '</div></tpl>',
                                {
                                    checkStatus: function (values) {
                                        if (this.field.up().up().up().getViewModel().getData().rec != null && this.field.up().up().up().getViewModel().getData().rec.data != null
                                            && this.field.up().up().up().getViewModel().getData().rec.data.excRouteOfAdminCodes != null) {
                                            var storeRejectionCodes = this.field.up().up().up().getViewModel().getData().rec.data.excRouteOfAdminCodes;
                                            // var rejectionCodeList = [];
                                            // rejectionCodeList = storeRejectionCodes.split(',');
                                            if(this.field.lastValue!="" &&this.field.lastValue!=null) {
                                                if (this.field.lastValue.indexOf(values.value) != -1)
                                                    return true;
                                            }
                                            return (storeRejectionCodes.indexOf(values.value) != -1 ? true : false);
                                        }
                                        return false;
                                    }

                                }
                            ),
                            listeners: {
                                select: function (combo, records) {
                                    var node;
                                    Ext.each(records, function (rec) {
                                        node = combo.getPicker().getNode(rec);
                                        Ext.get(node).down('input').dom.checked = true;
                                    });
                                },
                                beforedeselect: function (combo, rec) {
                                    var node = combo.getPicker().getNode(rec);
                                    Ext.get(node).down('input').dom.checked = false;
                                }
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{name}, ',
                                '</tpl>'
                            )
                            //tpl: new Ext.XTemplate('<tpl for=".">'
                            //    + '<div class="x-boundlist-item" >'
                            //    + '{name}'
                            //    + '</div></tpl>'
                            //)
                        }
                        //, {xtype: 'tagfield', fieldLabel: 'Exclude Route of Admins.' ,readOnly: true,  itemId:  'ExcRoute',name:'Exc Route',  width:'250px', displayField:'name', valueField:'value',queryMode: 'local',
                        //    publishes: 'value'}

                    ]
                }]


        },

        {
            xtype :'panel',
            cls:'card-panel',
            flex:1,
            title:'Tiers',
            height: 900,
           disabled: true,
            itemId:'gridTiers',
            items: [{
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Add Tier',
                        handler: 'onAddClick',

                        iconCls: 'fa fa-plus-circle'
                    },'-',
                    {
                        xtype: 'button',
                        text: 'Delete Tier',
                        iconCls : 'fa fa-minus-circle',
                        handler: 'onRemoveClick'

                    }
                ],
                xtype: 'grid',
                itemId: 'gpformularyTiers',
                layout: 'fit',
                height: 800,
                padding: 10,
                defaults: {
                    anchor: '70%'

                },
                plugins: {
                    ptype: 'rowediting',
                    clicksToEdit: 1,
                    listeners: {
                        'canceledit': function (rowEditing, context) {
                            if (context.record.phantom) {
                                if(context.record.data.TierDesc=="")
                                context.store.remove(context.record);
                            }
                        }
                    }
                },
                listeners: {
                    beforeedit: 'gpFormularyDetail_beforeedit'
                },
                columns: [{
                    dataIndex: 'FormularyID',
                    hidden: true
                }, {
                    dataIndex: 'FormularyTierID',
                    hidden: true
                }, {
                    text: 'Tier Code',
                    dataIndex: 'TierCode',
                    editor:{
                        allowBlank: false,
                        xtype:'textfield',
                        maskRe: /[0-9]/

                    }

                }, {
                    text: 'Tier Basis',
                    dataIndex: 'TierDesc',
                    width: 200,
                    renderer: 'rendererTierBasis',
                    editor: {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        allowBlank: false,
                        displayField:'name',
                        valueField:'value',


                        bind: {
                            store: '{StoreTierBasis}'
                        }
                    }
                },

                    {
                        text: 'Exception Tier',
                        width: 200,
                        dataIndex: 'exceptionTiercode',
                        editor: {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            displayField:'TierCode',
                            itemId: 'TierException',
                            valueField:'TierCode'

                            // bind: {
                            //     store: '{StoreTiersException}'
                            // }
                        }
                    },
                    {
                        text: 'Non Part D Tier Code',
                        dataIndex: 'nonPartDTierCode',
                        editor:{
                            xtype: 'textfield'

                        }
                    }

                ]
            }]
        }

    ],
    dockedItems :{
        dock: 'bottom',
        xtype: 'toolbar',
        style: { borderColor: 'black', borderStyle: 'solid'},
        labelWidth: 20,
        items : [
            '->'
            ,{xtype: 'displayfield', fieldLabel: 'Formulary',  bind:{ value: '{rec.FormularyName}'}, labelWidth: 20}
            ,'-'
            ,{ xtype: 'displayfield', fieldLabel: 'Version',  bind:{ value: '{rec.FormularyVersion}'}, labelWidth: 20}

            ,'-'
            ,{
                xtype : 'button',
                text : 'Create New',
                iconCls : 'fa fa-plus-circle',
                menu: [{
                    text:'Copy Formulary',
                    itemId: 'menuCopyFormulary',
                    handler: 'CopyFormulary',
                    disabled: true

                },{
                    text:'Create New Formulary',
                    itemId: 'menuCreateNewFormu',
                    handler: 'CreateNewFormulary'
                },{
                    text:'Create New Version',
                    itemId: 'menuCreateNewFormuVer',
                    handler: 'CreateNewVersion',
                    disabled: true
                }]

            }
            ,'-'
            ,{ xtype : 'button', text : 'Save', iconCls : 'fa fa-save', disabled:true, itemId: 'btnSave', handler: 'SaveData'}


        ]
    }




});
