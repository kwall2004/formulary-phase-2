Ext.define('Atlas.finance.view.check.CheckMasterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-checkmaster',

    listen: {
        controller: {
            'finance-check-advsearch': {
                selected: 'onSelected'
            }
        }
    },

    init: function () {
        var me = this,
            vm = me.getViewModel(),
            view = this.getView();
        if (view) {
            view.down('#btnAddNotes').setDisabled(!view.parentSystemId);
            if (view.parentSystemId) {
                this.getNotes();
            }
        }

    },

    onAdvancedSearch: function () {
        var me = this,
            vm = me.getViewModel();

        if (!me.searchWin) {
            me.searchWin = Ext.create('Atlas.finance.view.check.AdvancedSearch', {
               // autoShow: true,
                closeAction: 'hide' // Keep window around and don't destroy
            });
        }
        me.getView().add(me.searchWin);
        me.searchWin.show();
    },

    onSearchTypeToggle: function (seg, button) {
        var me = this,
            vm = me.getViewModel(),
            field = me.lookup('searchfield'),
            searchBy = button.action,
            hint = button.hint;

        vm.set('searchEmptyText', hint);
        vm.set('searchBy', searchBy);

        if (searchBy === 'checkNumber') {
            vm.set('searchValue', vm.get('checkNum'));
        } else {
            vm.set('searchValue', vm.get('eftId'));
        }

        field.setValue(vm.get('searchValue'));
    },

    onSearch: function (value) {
        var me = this,
            vm = me.getViewModel(),
            myView = me.getView();

        if (myView.up('[reference = workspaceTabs]').getActiveTab() === myView){
            if (!value) {
                //Ext.Msg.alert('Message', 'Please enter ' + vm.get('searchEmptyText').toUpperCase());
                Ext.Msg.alert('Message', 'Please enter a valid check number');
                return false;
            }

            if (vm.get('searchBy') === 'checkNumber') {
                vm.set('checkNum', value);
            } else {
                vm.set('eftId', value);
            }

            vm.set('searchValue', value);

            me.searchForChecks();
        }
    },

    onSelected: function (checkNum, eftId) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView();

        if (view.up('[reference = workspaceTabs]').getActiveTab() === view){
            if (checkNum !== 0) {
                view.down('segmentedbutton').items.items[0].setPressed();
                vm.set('checkNum', checkNum);
                vm.set('searchBy', 'checkNumber');
                vm.set('searchValue', vm.get('checkNum'));
            } else {
                view.down('segmentedbutton').items.items[1].setPressed();
                vm.set('eftId', eftId);
                vm.set('searchBy', 'eftTraceId');
                vm.set('searchValue', vm.get('eftId'));
            }

            me.searchForChecks();
        }
    },

    searchForChecks: function () {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            storeCheckMasterDetail = vm.getStore('checkmasterdetail'),
            storeVendorLedgerDetail = vm.getStore('vendorledgerdetail'),
            storeClaimRADetail = view.lookup('checkMasterGrid').getStore(),
            searchStr = "";

        if (vm.get('searchBy') === 'checkNumber') {
            searchStr = "checkNum='" + vm.get('checkNum') + "'";
        } else {
            searchStr = "eftTraceId='" + vm.get('eftId') + "'";
        }

        storeCheckMasterDetail.on({
            load: 'onLoadCheckMaster',
            scope: me,
            single: true
        });

        storeCheckMasterDetail.load({
            params: {
                pWhere: searchStr
            }
        });

        storeVendorLedgerDetail.on({
            load: 'onLoadVendorLedger',
            scope: me,
            single: true
        });

        storeVendorLedgerDetail.load({
            params: {
                pWhere: searchStr
            }
        });

        //main grid
        storeClaimRADetail.on({
            load: 'onLoadClaimRADetail',
            scope: me,
            single: true
        });

        // storeClaimRADetail.load({
        //     params: {
        //         pWhere: searchStr
        //     }
        // });
        storeClaimRADetail.getProxy().setExtraParam('pWhere', searchStr);
        storeClaimRADetail.load();
    },

    onLoadCheckMaster: function (store, records, success) {
        var me = this,
            view = this.getView(),
            vm = me.getViewModel();

        if (records.length) {
            var recData = records[0].getData();

            vm.set('checkmasterrec', recData);
            vm.set('isRecord', true);
            vm.set('parentSystemId', recData.systemID);
            me.reloadNotes(recData.systemID);
        } else {
            vm.set('isRecord', false);
            vm.set('checkmasterrec', '');
            vm.set('ledgerSeq', '');
            vm.set('vendorledgerrec', '');
            me.reloadNotes('');

            if (vm.get('searchBy') === 'checkNumber') {
                Ext.MessageBox.alert("Check Master", "Check Number " + vm.get('checkNum') + " not found");
            } else {
                Ext.MessageBox.alert("Check Master", "EFT Trace ID " + vm.get('eftId') + " not found");
            }
        }
    },

    onLoadVendorLedger: function (store, records, success) {
        var me = this,
            vm = me.getViewModel();

        if (records.length) {
            vm.set('vendorledgerrec', records[0].getData());
        }
    },

    onLoadClaimRADetail: function (store, records, success) {
        var me = this,
            vm = me.getViewModel();

        if (records.length) {
            vm.set('ledgerSeq', records[0].get('ledgerSeq'));
        }
    },

    onOpenPaymentDetail: function (grid, rowIndex, colIndex) {
        var vm = this.getViewModel(),
            rec = grid.getStore().getAt(rowIndex),
            transactionId = rec.get('transactionID');
        var win = Ext.create('Ext.window.Window', {
            title: 'Pricing Detail',
            height: 400,
            width: 600,
            layout: 'fit',
            modal : true,
            items: [{
                xtype: 'ClaimDetailStatusDrugPricing',
                viewConfig: {
                    stripeRows: true,
                    getRowClass: function (record, index) {
                        var result = "";
                        if (record.data.DESCRIPTION == 'Total Amt Due') {
                            //result = 'disabled-row';
                            result = 'm-red-color';
                        }
                        return result;
                    }
                },
                viewModel: {
                    parent: vm
                },
                dockedItems: [
                    {
                        //TODO this style needs to go into the theme stylesheet, but with all the merge issues, I'm not even going there right now.
                        xtype: 'container',
                        html: "<style>.disabled-row{color: red;}</style>"
                    }
                ]
            }]
        });

        var drugpricingstore = vm.getStore('drugpricing');
        var pricing = vm.getStore('pricing');
        var storePlanPricing = vm.getStore('storePlanPricing');

        pricing.getProxy().setExtraParam('pClaimID', transactionId);
        pricing.getProxy().setExtraParam('pPlanPricing', 'false');
        storePlanPricing.getProxy().setExtraParam('pClaimID', transactionId);
        storePlanPricing.getProxy().setExtraParam('pPlanPricing', 'true');
        drugpricingstore.getProxy().setExtraParam('pClaimID', transactionId);
        drugpricingstore.load({
            success: function (record, operation) {
            },
            callback: function (record, operation) {
                pricing.load();
                storePlanPricing.load();
                if (record.length > 0) {
                    //vm.set('dispensedquantity', 'Dispensed Quantity = ' + record[0].get('paid'));
                    var dispensedquantityrecord = drugpricingstore.findRecord('DESCRIPTION', 'Dispensed Quantity');
                    if (dispensedquantityrecord) {
                        drugpricingstore.remove(dispensedquantityrecord);
                    }
                }
                else {
                    vm.set('dispensedquantity', '');
                }

            }
        });

        var fieldlist = '@applyPlanPricing';
        var claimmaster = Ext.create('Atlas.common.model.ClaimMasterData');

        claimmaster.getProxy().setExtraParam('pPlanID', 'HPM');
        claimmaster.getProxy().setExtraParam('pTransactionID', transactionId);
        claimmaster.getProxy().setExtraParam('pFieldList', fieldlist);
        claimmaster.load({
            callback: function (record) {
                if (record.get('@applyPlanPricing') === 'True') {
                    vm.set('planpricing', true);
                } else {
                    vm.set('planpricing', false);
                }
            }
        });

        this.getView().add(win).show();
        // var win = Ext.create({
        //     xtype: 'ClaimDetailStatusDrugPricing',
        //     autoShow: false
        // });
        // this.getView().add(win).show();
    },

    onExcelClick: function () {
        var me = this,
            vm = me.getViewModel(),
            store = this.lookup('checkMasterGrid').getStore();

        Atlas.common.utility.Utilities.exportToExcel(store);
    },

    onERAClick: function (button) {
        var me = this,
            view = this.getView(),
            vm = me.getViewModel(),
            progName = 'make005010x221a1.p',
            storeReportInfo = vm.getStore('storeReportInfo');
        storeReportInfo.getProxy().setExtraParam('pReportProgName', progName);
        storeReportInfo.load({
            scope: this,
            callback: function (record, operation, success) {
                if (success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    me.createFilterForm(progName, objResp.metadata.pReportName, objResp.metadata.pRunMode, objResp.metadata.pReportId);
                    var rec = {
                        data: {
                            CategoryId: '',
                            CategoryName: '',
                            ReportModule: 'MERLIN',
                            RepportObject: 'Batch',
                            RptByDrugClass: false,
                            dataAccessFilterFlag: true,
                            //id:'',
                            isFav: 'no',
                            programName: progName,
                            reportID: objResp.metadata.pReportId,
                            reportName: objResp.metadata.pReportName,
                            //rowNum:'',
                            runMode: objResp.metadata.pRunMode,
                            usePlanLevelDATree: false,
                            remitBatchNum: vm.get('checkmasterrec').remitBatch,
                            ledgerSeqNum : vm.get('ledgerSeq')
                            ////userGroup:Atlas.user.
                        }
                    };
                    vm.getStore('dataaccessReport').getProxy().setExtraParam('pUserName', Atlas.user.un);
                    vm.getStore('dataaccessReport').getProxy().setExtraParam('pExpandToLevel', 'PG');
                    vm.getStore('dataaccessReport').load();
                    var datasourcePicker = {
                        xtype: 'common-tri-treepicker',
                        width: 500,
                        name: 'dataaccess',
                        store: vm.getStore('dataaccessReport'),
                        pickerURL: 'system/rx/dataaccesstree/update', //required for apply
                        displayField: 'nodeName',
                        emptyText: 'Data Access List',
                        toolbarText: 'Data Access List',
                        hideApply: true,
                        itemId: 'rptDataAccessTree'
                    };
                    var reportFilterWindow = new Atlas.reports.view.FilterWindow(
                        {
                            title: 'Report Filter',
                            autoShow: true,
                            viewModel: {
                                parent: vm,
                                data: {
                                    masterrecord: null, //This is what the form binds to on successful load of MemberMaster
                                    record: rec
                                },
                                stores: {
                                    reportfilterdata: {
                                        model: 'Atlas.reports.model.ReportFilterModel',
                                        session: true
                                    },
                                    comboboxlistsdata: {
                                        model: 'Atlas.reports.model.ReportsListItemsModel',
                                        session: true,
                                        storeId: 'rptListsStore',
                                        autoLoad: true
                                    },
                                    reportsubmitdata: {
                                        model: 'Atlas.reports.model.ReportSubmitModel',
                                        session: true,
                                        storeId: 'rptSubmitStore',
                                        root: 'message'
                                    },
                                    useraccessplangroup: {
                                        model: 'Atlas.reports.model.UserAccessPlanGroupModel',
                                        storeId: 'rptUserAccessPlanGroupStoreId',
                                        root: 'metadata',
                                        session: true
                                    }
                                }
                            }
                        });
                    if(rec.data.dataAccessFilterFlag) {
                        reportFilterWindow.down('#filterFormItems').add({
                            xtype: 'fieldset',
                            title: 'My Data Access Filter',
                            itemId: 'filterWindowDataAccessTree',
                            hidden : true
                            //items: []
                        });
                        reportFilterWindow.down('#filterWindowDataAccessTree').add(datasourcePicker);
                    }
                }
            }
        });




        // If dataAccessFilterFlag, add DataAccessTree to window object
        // if (rec.data.dataAccessFilterFlag) {
        //     reportFilterWindow.down('#filterFormItems').add({
        //         xtype: 'fieldset',
        //         title: 'My Data Access Filter',
        //         itemId: 'filterWindowDataAccessTree'
        //         //items: []
        //     });
        //     reportFilterWindow.down('#filterWindowDataAccessTree').add(datasourcePicker);
        // }
        // var me = this,
        //     vm = this.getViewModel(),
        //     view = this.getView(),
        //     progName = 'make005010x221a1.p';
        // var storeReportInfo = vm.getStore('storeReportInfo');
        // storeReportInfo.getProxy().setExtraParam('pReportProgName', progName);
        // storeReportInfo.load({
        //     scope: this,
        //     callback: function (record, operation, success) {
        //         if (success) {
        //             var objResp = Ext.decode(operation.getResponse().responseText);
        //             me.createFilterForm(progName, objResp.metadata.pReportName, objResp.metadata.pRunMode, objResp.metadata.pReportId);
        //         }
        //     }
        // });

    },

    createFilterForm: function (sPgm, sRptName, sRunMode, sRptId) {
        var me = this,
            vm = this.getViewModel(),
            rptModuleMerlin = 'MERLIN';
        var storeReportFilter = vm.getStore('storeReportFilter');
        storeReportFilter.getProxy().setExtraParam('pReportID', sRptId);
        storeReportFilter.load({
            scope: this,
            callback: function (record, operation, success) {
                if (success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.data.length != 0) {
                        var f = Ext.create('Ext.form.Panel', {
                            name: 'FormPanel1',
                            labelWidth: 150,
                            autoHeight: true
                        });
                        var storeReportsList = vm.getStore('storeReportsList');
                        storeReportsList.getProxy().setExtraParam('pShowAll', true);
                        storeReportsList.getProxy().setExtraParam('pShowFav', false);
                        storeReportsList.getProxy().setExtraParam('pReportModule', false);
                        storeReportsList.getProxy().setExtraParam('pReportObject', rptModuleMerlin);
                        //storeReportsList.getProxy().setExtraParam('',);
                    }
                }
            }
        });
    },

    onAddNotesClick: function (button) {

    },

    onEditNotesClick: function (button) {

    },

    onDeleteNotesClick: function (button) {

    },

    rowDblClick: function (grid, record) {
        var me = this,
            claimId = record.data.transactionID,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');

        me.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
            atlasId: claimId,
            menuId: menuId
        }, null);
    },

    //---------------------------------------------- Notes section
    getNotes: function () {
        var view = this.getView();
        if (view) {
            var parentSystemId = view.parentSystemId;
            view.down('#btnUpdateNotes').setDisabled(true);
            view.down('#btnDeleteNotes').setDisabled(true);
            var storeCheckMastersNotes = this.getViewModel().getStore('storeCheckMastersNotes');
            storeCheckMastersNotes.getProxy().setExtraParam('pParentSystemID', parentSystemId);
            storeCheckMastersNotes.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            if (objResp.data.length > 0) {
                                Ext.defer(function () {
                                    view.down('#gpNotes').getSelectionModel().select(0);
                                }, 300);
                            }
                        }
                    }
                }
            });
        }
    },

    onAddNotes: function () {
        var view = this.getView(),
            user = Atlas.user.un,
            winAddNotes = Ext.create(winNotes),
            today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');
        winAddNotes.show();
        view.add(winAddNotes);
        view.down('#noteUser').setValue(user);
        view.down('#noteDate').setValue(today);
        view.down('#btnSave').setText('Add');
        view.down('#winNotes').setTitle('Add');
    },

    onUpdateNotes: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            user = Atlas.user.un,
            winUpdateNotes = Ext.create(winNotes),
            today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');
        winUpdateNotes.show();
        view.add(winUpdateNotes);
        view.down('#noteDate').setValue(today);
        view.down('#noteUser').setValue(user);
        view.down('#btnSave').setText('Update');
        view.down('#winNotes').setTitle('Update');
        view.down('#txtDesc').setValue(vm.get('selectedNoteRecord').get('Note'));
        view.down('#txtSbj').setValue(vm.get('selectedNoteRecord').get('Subject'));
    },

    onDeleteNotes: function () {
        Ext.Msg.confirm('Delete', 'Are you sure you would like to delete selected note?', function (btn) {
            if (btn == 'yes') {
                var saveAction = [{"Save": {"key": "pMode", "value": "D"}}];
                var systemID = parseFloat(this.getViewModel().get('selectedNoteRecord').get('SystemID'));
                this.setNotes(systemID, '', '', saveAction);
            }
        }, this);
    },

    winNotesSave: function () {
        var saveAction = '',
            seconds = 0,
            systemID = 0,
            //now = Atlas.common.utility.Utilities.getLocalDateTime(),
            now = new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y H:i:s')),
            view = this.getView(),
            vm = this.getViewModel(),
            parentSystemId = parseFloat(view.parentSystemId),
            //then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0),
            then = new Date(now);
            then.setHours(0);
            then.setMinutes(0);
            then.setSeconds(0);
            then.setMilliseconds(1);

                //then = new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0))),
        var pFieldList = 'ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime';
        if (view.down('#winNotes').getTitle() == 'Add') {
            saveAction = [{"Save": {"key": "pMode", "value": "A"}}];
        }
        else if (view.down('#winNotes').getTitle() == 'Update') {
            saveAction = [{"Save": {"key": "pMode", "value": "U"}}];
            systemID = vm.get('selectedNoteRecord').get('SystemID');
        }
        //var d = new Date();
        var a = (now.getTime()/1000);
        var b = (then.getTime()/1000);
        seconds = (a-b);
        //seconds =((now.getTime()-now.getTimezoneOffset()*60000)%86400000);
        //seconds =((now.getTime()-now.getTimezoneOffset()*60)%86400);
        var pFieldValues = parseFloat(parentSystemId) + "|" + view.down('#txtSbj').getValue() + "|" + view.down('#txtDesc').getValue() + "|" + view.down('#noteUser').getValue() + "|" +  Ext.util.Format.date(now, 'm/d/Y')  + "|" + seconds;
        this.setNotes(systemID, pFieldList, pFieldValues, saveAction);
        if (view.down('#winNotes')) {
            view.down('#winNotes').close();
        }
    },

    setNotes: function (systemID, pFieldList, pFieldValues, saveAction) {
        var extraParameters = {
            psystemId: systemID,
            pFieldList: pFieldList,
            pFields: pFieldValues
        };
        var saveNotesData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], extraParameters,
            saveAction, null);
        if (saveNotesData.code != 0) {
            Ext.Msg.alert('Error', saveNotesData.message);
        }
        this.getNotes();
    },

    onGridRowSelect: function (me, record, tr, rowIndex, e, eOpts) {
        this.getView().down('#btnUpdateNotes').setDisabled(false);
        this.getView().down('#btnDeleteNotes').setDisabled(false);
        this.getViewModel().set('selectedNoteRecord', record);
    },

    winNotesClose: function () {
        this.getView().down('#winNotes').close();
    },

    reloadNotes: function (parentSystemId) {
        var view = this.getView();
        if (view) {
            view.parentSystemId = parentSystemId;
            view.down('#btnAddNotes').setDisabled(!view.parentSystemId);
            if (view.parentSystemId) {
                this.getNotes();
            }
        }
    },
    localizeDate: function (value, record)
    {
        var cd = Ext.util.Format.date(value, 'm/d/Y');
        var concat = cd +' '+Ext.String.trim(record.record.data.CreateTime);
        var dt = Ext.Date.parse(concat,'m/d/Y g:i:sa');
        var f = record.column.format;
        return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(dt.toString(),record.column.format);
    }

});

var winNotes = Ext.create('Ext.window.Window', {
    itemId: 'winNotes',
    height: 230,
    width: 300,
    layout: 'vbox',
    modal: true,
    items: [
        {xtype: 'textfield', itemId: 'txtSbj', fieldLabel: 'Subject'},
        {xtype: 'textarea', itemId: 'txtDesc', fieldLabel: 'Description'}
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {xtype: 'button', itemId: 'btnSave', handler: 'winNotesSave'},
                {xtype: 'button', text: 'Cancel', handler: 'winNotesClose'}
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {xtype: 'displayfield', itemId: 'noteDate',renderer:'localizeDate'}, '-',
                {xtype: 'displayfield', itemId: 'noteUser'}
            ]
        }
    ]
});

