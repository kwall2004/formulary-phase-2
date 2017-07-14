/**
 * Created by mkorivi on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.FDBDrugSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fdbdrugsearch',

    /**
     * Called when the view is created
     */
    init: function () {
        var view = this.getView();
        if(view.atlasId) {
            this.getNDCs(view.atlasId);
            this.getView().setTitle('Drug Search: '+ view.atlasId);
        }

        if (view.selectedField != undefined) {
            if (view.selectedField == 'NDC') {
                view.down('#cbxNDC').setValue(view.selectedValue);
                view.down('#cbxNDC').setRawValue(view.selectedValue);
            }

        }
    },

    btnDrugDetails_CLick: function (grid, rowIndex, colIndex) {

        var me = this,
            vm = this.getViewModel(),
            rec = grid.getStore().getAt(rowIndex),
            ndc = rec.get('DRUGCODE'),
            win;
        vm.set('NDC', ndc);
        win = Ext.create('Ext.window.Window', {

            title: 'Drug Details',
            height: 700,
            width: 1000,
            modal: true,
            itemId: 'winDrugDetails',
            layout: {
                type: 'fit'
            },
            listeners: {
                scope: me,
                'show': 'setDrugDetail'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'drugDetailInfo',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'

                            },
                            flex: 6,
                            items: [
                                {
                                    xtype: 'panel',
                                    collapsible: true,
                                    title: 'General Information',
                                    cls: 'card-panel',
                                    flex: 1,
                                    defaults: {
                                        xtype: 'displayfield',
                                        labelWidth: 130
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'NDC',
                                            name: 'NDC'
                                        },
                                        {
                                            fieldLabel: 'Labeler',
                                            name: '@mfg'
                                        },

                                        {
                                            fieldLabel: 'GCN',
                                            name: 'GCN_SEQNO'
                                        },
                                        {
                                            fieldLabel: 'Package Size',
                                            name: 'PS'
                                        },
                                        {
                                            fieldLabel: 'Label Name',
                                            name: 'LN'
                                        },
                                        {
                                            fieldLabel: 'Brand Name',
                                            name: 'BN'
                                        },
                                        {
                                            fieldLabel: 'Previous NDC',
                                            name: 'PNDC'
                                        },
                                        {
                                            fieldLabel: 'Repl. NDC',
                                            name: 'REPNDC'
                                        },
                                        {
                                            fieldLabel: 'Orange Book Code',
                                            name: 'OBC'
                                        },
                                        {
                                            fieldLabel: 'Repackaged Ind.',
                                            name: 'REPACKYesNo'
                                        },
                                        {
                                            fieldLabel: 'Unit Dose Ind.',
                                            name: 'UDYesNo'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    collapsible: true,
                                    cls: 'card-panel',

                                    defaults: {
                                        xtype: 'displayfield',
                                        labelWidth: 150
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Date of Add',
                                            name: 'DADDNC',
                                            dateFormat: 'm/d/Y',
                                            type: 'date',
                                            renderer: Ext.util.Format.dateRenderer('m/d/Y')
                                        },
                                        {
                                            fieldLabel: 'Obsolete Date',
                                            name: 'OBSDTEC',
                                            dateFormat: 'm/d/Y',
                                            type: 'date',
                                            renderer: Ext.util.Format.dateRenderer('m/d/Y')
                                        },
                                        {
                                            fieldLabel: 'Market Entry Date',
                                            name: 'HCFA_MRKC'
                                        },
                                        {
                                            fieldLabel: 'Term. Date',
                                            name: 'HCFA_TRMC'
                                        },
                                        {
                                            fieldLabel: 'CMS Unit Ind.',
                                            name: 'HCFA_UNITYesNo'
                                        },
                                        {
                                            fieldLabel: 'CMS Units Per Pkg.',
                                            name: 'HCFA_PS'
                                        },
                                        {
                                            fieldLabel: 'Drug Type',
                                            name: '@drugType'
                                        },
                                        {
                                            fieldLabel: 'DEA Code',
                                            name: 'DEA'
                                        },
                                        {
                                            fieldLabel: 'Generic Name Ind.',
                                            name: 'GNIYesNo'
                                        },
                                        {
                                            fieldLabel: 'Therapeutic Equiv. Ind.',
                                            name: 'GTIYesNo'
                                        },
                                        {
                                            fieldLabel: 'Drug Class',
                                            name: 'CL'
                                        }
                                    ]
                                }
                            ]

                        },
                        {
                            xtype: 'form',
                            flex: 4,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    cls: 'card-panel',
                                    title: 'AWP Change History',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            itemId: 'gridAWPChange',
                                            flex: 1,
                                            bind: {
                                                store: '{AWPPriceHistory}'
                                            },
                                            dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    bind: '{AWPPriceHistory}',
                                                    pageSize: 10,
                                                    displayInfo: true,
                                                    dock: 'bottom'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    flex: 1
                                                },
                                                items: [
                                                    {
                                                        text: 'Change Date',
                                                        dataIndex: 'priceDate',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    },
                                                    {
                                                        text: 'AWP',
                                                        dataIndex: 'price',
                                                        xtype: 'numbercolumn',
                                                        format: '$0,0.0000'
                                                    },
                                                    {text: 'Source', dataIndex: 'src'},
                                                    {
                                                        text: 'Last Modified',
                                                        dataIndex: 'lastModified',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    cls: 'card-panel',
                                    title: 'WAC Change History',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            itemId: 'gridWACChange',
                                            flex: 1,
                                            bind: {
                                                store: '{WACPriceHistory}'
                                            },
                                            dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    bind: '{WACPriceHistory}',
                                                    pageSize: 10,
                                                    displayInfo: true,
                                                    dock: 'bottom'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    flex: 1
                                                },
                                                items: [
                                                    {
                                                        text: 'Change Date',
                                                        dataIndex: 'priceDate',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    },
                                                    {
                                                        text: 'WAC',
                                                        dataIndex: 'price',
                                                        xtype: 'numbercolumn',
                                                        format: '$0,0.0000'
                                                    },
                                                    {text: 'Source', dataIndex: 'src'},
                                                    {
                                                        text: 'Last Modified',
                                                        dataIndex: 'lastModified',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]

                }

            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'btnPrint',
                            text: 'Print',
                            iconCls: 'x-fa fa-print',
                            handler: 'printWindow'
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },


    btnDrugInfo_CLick :function (event, sender) {
        var _pFields = "FormularyID,DrugCode,DrugCodeAddDate,DrugCodeObsoleteDate,Covered,GCN_SEQNO,NDDF_RxCUI,LN,BN,DrugType,ETC_ID,ETC_NAME,PARENT_ETC_ID,PARENT_ETC_NAME,ULTIMATE_PARENT_ETC_ID,ULTIMATE_PARENT_ETC_NAME,HICL_SEQNO,GNN60,SpecialtyDrugInd,TierCode,GenderRestriction,MinAge,MaxAge,PAName,PAMinAge,PAMaxAge,DaysSupply,DaysSupplyTimePeriod,Fills,FillsTimePeriod,QtyLmtTimePeriod,QLNotes,StepTherapyName,Notes,TextMessage,ResourceLink,OTC_IND,StepTherapyInd,PAInd,FormularyVersion,PartDExcludedDrug,MedicaidCarveOutDrug,Maint,RuleLevelID,LevelType,MedicaidFeeScreen,MedicarePAType,MedicareSTGrpCount,MedicareSTGrpDesc1,MedicareSTStepValue1,MedicareSTGrpDesc2,MedicareSTStepValue2,MedicareSTGrpDesc3,MedicareSTStepValue3,QtyLimit,extendedDaysSupply";
        var me = this;
        var vm = me.getViewModel();
        var grid = me.getView().down('#fdbDrug');
        var store = grid.getStore();
        var record = store.getAt(sender);
        if(record.data.formIdVsn == '')
        {
            Ext.MessageBox.alert("", "Formulary and Version Information not Passed.");
        }
        else {
            var StoreDrugFormularyDetails = vm.getStore('StoreDrugFormularyDetails');
            StoreDrugFormularyDetails.getProxy().setExtraParam('pDrugCode', record.data.DRUGCODE);
            StoreDrugFormularyDetails.getProxy().setExtraParam('pFormVsnLst', record.data.formIdVsn);
            StoreDrugFormularyDetails.getProxy().setExtraParam('pFields', _pFields);
            StoreDrugFormularyDetails.load();
            var win = Ext.create({
                xtype: 'formulary-FormularyDetails',
                modal: true,
                autoShow: true,
                viewModel: {
                    parent: me.getViewModel()
                }

            });
            this.getView().add(win);
            win.show();
        }

    },
    setDrugDetail: function () {

        var me = this,
            vm = this.getViewModel(),
            NDC = vm.get('NDC'),
            pFieldList = 'NDC,LBLRID,GCN_SEQNO,PS,DF,AD,LN,BN,PNDC,REPNDC,NDCFI,DADDNC,DUPDC,DESI,DESDTEC,DESI2,DES2DTEC,DEA,CL,GPI,HOSP,INNOV,IPI,MINI,MAINT,OBC,OBSDTEC,PPI,STPK,REPACK,TOP200,UD,CSP,NDL_GDGE,NDL_LNGTH,SYR_CPCTY,SHLF_PCK,SHIPPER,HCFA_FDA,HCFA_UNIT,HCFA_PS,HCFA_APPC,HCFA_MRKC,HCFA_TRMC,HCFA_TYP,HCFA_DESC1,HCFA_DESI1,UU,PD,LN25,LN25I,GPIDC,BBDC,HOME,INPCKI,OUTPCKI,OBC_EXP,PS_EQUIV,PLBLR,TOP50GEN,OBC3,GMI,GNI,GSI,GTI,NDCGI1,HCFA_DC,LN60,deleted,deletedDate,@drugType,@mfg,@CoverageGapDrug',

            winDrugDetails = this.getView().down('#winDrugDetails'),
            formDrugInfo = winDrugDetails.down('#drugDetailInfo'),
            StoreFDBDrugDetails = vm.getStore('StoreFDBDrugDetails'),
            AWPPriceHistory = vm.getStore('AWPPriceHistory'),
            WACPriceHistory = vm.getStore('WACPriceHistory');

        winDrugDetails.mask('Loading.....');

        StoreFDBDrugDetails.getProxy().setExtraParam('pDrugCode', NDC);
        StoreFDBDrugDetails.getProxy().setExtraParam('pFieldList', pFieldList);
        StoreFDBDrugDetails.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        formDrugInfo.loadRecord(records[0]);
                    }
                }
            }
        );

        AWPPriceHistory.getProxy().setExtraParam('pcNDC', NDC);
        AWPPriceHistory.getProxy().setExtraParam('pcPrcType', 'AWPUnit');
        AWPPriceHistory.load();

        WACPriceHistory.getProxy().setExtraParam('pcNDC', NDC);
        WACPriceHistory.getProxy().setExtraParam('pcPrcType', 'WACUnit');
        WACPriceHistory.load();

        winDrugDetails.unmask();
    },

    onSearch: function() {
        var view = this.getView(),
            ndc = view.down('#cbxNDC').getValue() != null ? view.down('#cbxNDC').getValue() : '';
        this.getNDCs(ndc);
    },

    getNDCs: function (ndc) {

        var view = this.getView(),
            vm = this.getViewModel(),
            gcn = view.down('#txtGCN').getValue() != null ? view.down('#txtGCN').getValue() : '',
            ln = "",
            bn = view.down('#cbxBN').getValue() != null ? view.down('#cbxBN').getValue() : '',
            etcId = view.down('#cbxETC').getValue() != null ? view.down('#cbxETC').getValue() : '',
            rxCUI = view.down('#txtRxCUI').getValue() != null ? view.down('#txtRxCUI').getValue() : '',
            ActiveOnly = '',
            sFormulary = '';

        if (view.down('#chkInactive').getValue() == true)
            ActiveOnly = 'ACTIVE';

        if (vm.get('record.FormularyID') != null && vm.get('record.FormularyVersion') != null) {
            sFormulary = vm.get('record.FormularyID') + "|" + vm.get('record.FormularyVersion');
        }

        var StoreDrugSearch = vm.get('StoreDrugSearch');
        StoreDrugSearch.getProxy().setExtraParam('pLN', ln);
        StoreDrugSearch.getProxy().setExtraParam('pBN', bn);
        StoreDrugSearch.getProxy().setExtraParam('pNDC', ndc);
        StoreDrugSearch.getProxy().setExtraParam('pGCN', gcn);
        StoreDrugSearch.getProxy().setExtraParam('pETC', etcId);
        StoreDrugSearch.getProxy().setExtraParam('pRxCUI', rxCUI);
        StoreDrugSearch.getProxy().setExtraParam('pSearchInitiative', ActiveOnly);
        StoreDrugSearch.getProxy().setExtraParam('pFormulary', sFormulary);
        StoreDrugSearch.load();


    },
    cbxFormularyList_OnSelect : function (combo, record) {
        this.getViewModel().set('record', record);
    },
    btnExportClick:function()
    {
        var me = this,
            //theView = me.getView(),
            theViewModel = me.getViewModel(),
            ExportExcelStore = theViewModel.getStore('StoreDrugSearch');

        Atlas.common.utility.Utilities.exportToExcel(ExportExcelStore);
    },
    btnExportClickDetails: function () {
        var me = this,
            //theView = me.getView(),
            theViewModel = me.getViewModel(),
            ExportStore = theViewModel.getStore('StoreDrugFormularyDetails');

        Atlas.common.utility.Utilities.exportToExcel(ExportStore);
    },
    printWindow: function () {
        window.print();
    }


});