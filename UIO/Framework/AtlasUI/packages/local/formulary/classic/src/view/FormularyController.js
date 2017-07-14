/**
 * Created by mkorivi on 9/29/2016.
 */




Ext.define('Atlas.formulary.view.FormularyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formulary',


    init: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        var StoreFormularyList = vm.getStore('StoreFormularyList');
        if(StoreFormularyList)
        StoreFormularyList.getProxy().setExtraParam('pagination', false);
        if(view.menuId != null)
        {
            var menuStore = vm.getStore('menu'),
                proxy = menuStore.getProxy();

            proxy.setExtraParam('pRootMenu', view.menuId);
            proxy.setExtraParam('pLevels', 1);

            menuStore.on({
                load: 'onMenuLoad',
                scope: me,
                single: true // Remove listener after Load
            });

            menuStore.load();
        }
    },

    onMenuLoad: function (store, records, success) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            menu = view.lookup('menu'),
            items = [],
            i = 0,
            iLen = records.length,
            defaultMenu = -1,
            route;



        for (; i < iLen; i++) {
            items.push({
                text: records[i].get('menuTitle'),
                route: records[i].get('route')
            });

            if (records[i].get('defaultMenu')) {
                defaultMenu = i;
            }
        }

        menu.getMenu().add(items);

        if (defaultMenu > -1) {
            route = items[defaultMenu].route;
            view.add({
                xclass: Atlas.common.Util.classFromRoute(route),
                title: items[defaultMenu].text,
                route: route,
                closable: false
            });
            view.setActiveTab(0);
        }

    },

    onMenuClick: function (menu, item) {
        var me = this,
            view = me.getView(),
            cards = view.getLayout().getLayoutItems(),
            created = false,
            len = cards.length,
            i = 0;

        //Check if the tab exists
        for (; i < len; i++) {
            if (cards[i].route === item.route) {
                created = true;
                view.setActiveTab(cards[i]);
            };
        }

        if (!created) {
            view.add({
                xclass: Atlas.common.Util.classFromRoute(item.route),
                route: item.route,
                title: item.text
            });
            view.setActiveTab(len);
        }
    },
    onFormularyListChange: function (combo, record) {
        var me = this;
        var vm = this.getViewModel();
        var queryDbModel = Ext.create('Atlas.common.model.shared.QueryDb');
        queryDbModel.getProxy().setExtraParam('pBuffer', 'formularyMaster');
        queryDbModel.getProxy().setExtraParam('pField', 'AtlasFormularyVersion');
        queryDbModel.getProxy().setExtraParam('pWhere', 'formularyId = ' + record.get('FormularyID')+ ' AND formularyVersion = '+ record.get('FormularyVersion'));
        queryDbModel.load({
            callback: function (value) {
                if (value.data.AtlasFormularyVersion != "0" && value.data.AtlasFormularyVersion != "") {
                    vm.set('isAtlasFormulary',true);
                    me.getView().down('#lblAtlasFormulary').setHtml("<b>This Formulary can only be edited from Atlas Formulary</b>");
                }
                else {
                    vm.set('isAtlasFormulary',false);
                    me.getView().down('#lblAtlasFormulary').setHtml("");
                }
                me.LoadFormulary(record);
            }
        });

    },
    LoadFormulary:function(record)
    {
        var me=this;
        var vm = this.getViewModel();
        vm.set('masterrecord', record);
        vm.set('formularyaction', 'UPD');
        var StoreFormularyInfo = vm.get('StoreFormularyInfo');
        StoreFormularyInfo.getProxy().setExtraParam('pFormularyID', vm.get('masterrecord.FormularyID'));
        StoreFormularyInfo.getProxy().setExtraParam('pFormularyVersion', vm.get('masterrecord.FormularyVersion'));
        StoreFormularyInfo.load(
            {

                scope: this,
                failure: function (record, operation) {
                    //do something if the load failed
                },


                success: function (record, operation) {


                },
                callback: function (record, operation, success) {
                    var forminfo = me.getView().down('formularygeneralinfo');
                    //forminfo.getForm().reset();
                    var theViewModel = me.getView().down('formularygeneralinfo').getViewModel();

                    theViewModel.set('rec', record[0]);

                    var StoreTiers = me.getView().getViewModel().get('StoreTiers');
                    StoreTiers.getProxy().setExtraParam('piFormularyID', vm.get('masterrecord.FormularyID'));
                    StoreTiers.on({
                        load: 'LoadTiers',
                        single: true // Remove listener after Load
                    });
                    StoreTiers.load();
                    me.onDataSourceLoadInit('', record[0]);
                    var stat = vm.get('masterrecord.Stat');

                    forminfo.getForm().getFields().each(function(field) {
                        field.setReadOnly(false);
                    });

                    me.getView().down('#gridTiers').setDisabled(false);
                    me.getView().down('#menuCreateNewFormuVer').setDisabled(false);
                    me.getView().down('#menuCopyFormulary').setDisabled(false);
                    me.cbxFormularyList_SelectHandlerinfo(record[0].data.EffectiveDate);

                    //If the Formulary has been approved, Pending PD Approval or Pending MD Approval:: Do not allow any changes to it
                    if( stat == "2" || stat == "3" || stat == "4" || vm.get('isAtlasFormulary'))
                    {
                        forminfo.getForm().getFields().each(function(field) {
                            field.clearInvalid();
                            field.setReadOnly(true);
                        });
                        me.getView().down('#gridTiers').setDisabled(true);
                        me.getView().down('#btnSave').setDisabled(true);

                    }
                    else
                    {
                        me.getView().down('#btnSave').setDisabled(false);
                    }
                    if(vm.get('isAtlasFormulary'))
                    {
                        me.getView().down('#menuCreateNewFormuVer').setDisabled(true);
                    }

                }
            });
        this.fireEvent('FormularyListChange', record.data);
    },
    ReloadFormulary: function (record) {
        var me=this;
        var vm = this.getViewModel();
        vm.set('masterrecord', record);
        vm.set('formularyaction', 'UPD');
        var StoreFormularyInfo = vm.get('StoreFormularyInfo');
        StoreFormularyInfo.getProxy().setExtraParam('pFormularyID', vm.get('masterrecord.FormularyID'));
        StoreFormularyInfo.getProxy().setExtraParam('pFormularyVersion', vm.get('masterrecord.FormularyVersion'));
        StoreFormularyInfo.load(
            {

                scope: this,
                failure: function (record, operation) {
                    //do something if the load failed
                },


                success: function (record, operation) {


                },
                callback: function (record, operation, success) {
                    var forminfo = me.getView();
                    //forminfo.getForm().reset();
                    var theViewModel = me.getView().getViewModel();

                    theViewModel.set('rec', record[0]);

                    var StoreTiers = me.getView().getViewModel().get('StoreTiers');
                    StoreTiers.getProxy().setExtraParam('piFormularyID', vm.get('masterrecord.FormularyID'));
                    StoreTiers.on({
                        load: 'LoadTiers',
                        single: true // Remove listener after Load
                    });
                    StoreTiers.load();
                    me.onDataSourceLoadInit('', record[0]);
                    var stat = vm.get('masterrecord.Stat');

                    forminfo.getForm().getFields().each(function(field) {
                        field.setReadOnly(false);
                    });

                    me.getView().down('#gridTiers').setDisabled(false);
                    me.getView().down('#menuCreateNewFormuVer').setDisabled(false);
                    me.getView().down('#menuCopyFormulary').setDisabled(false);
                    me.cbxFormularyList_SelectHandlerinfo(record[0].data.EffectiveDate);

                    //If the Formulary has been approved, Pending PD Approval or Pending MD Approval:: Do not allow any changes to it
                    if( stat == "2" || stat == "3" || stat == "4" || theViewModel.get('isAtlasFormulary'))
                    {
                        forminfo.getForm().getFields().each(function(field) {
                            field.clearInvalid();
                            field.setReadOnly(true);
                        });
                        me.getView().down('#gridTiers').setDisabled(true);
                        me.getView().down('#btnSave').setDisabled(true);

                    }
                    else
                    {
                        me.getView().down('#btnSave').setDisabled(false);
                    }
                    if(theViewModel.get('isAtlasFormulary'))
                    {
                        me.getView().down('#menuCreateNewFormuVer').setDisabled(true);
                    }

                }
            });
        this.fireEvent('FormularyListChange', record.data);
    },
    LoadTiers:function()
    {
        var StoreTiers = this.getView().getViewModel().get('StoreTiers');
        if(StoreTiers.data.length>0) {
            for (var i = 0; i < StoreTiers.data.items.length; i++) {
                if (StoreTiers.data.items[i].data.exceptionTiercode == null || StoreTiers.data.items[i].data.exceptionTiercode == "") {
                    StoreTiers.data.items[i].data.exceptionTiercode = "NA";
                }
            }
        }
        this.getView().down('#gpformularyTiers').setStore(StoreTiers);
    },
    onDataSourceLoadInit: function (combo, record) {
        var view = this.getView(),
            vm = this.getViewModel();
        var StoreDrugType=vm.getParent().getStore('StoreDrugType');
        if(StoreDrugType!=null)
            StoreDrugType.filter('charString',record.data.dataSource);
        else {
            StoreDrugType=vm.getStore('StoreDrugType');
            if(StoreDrugType!=null)
                StoreDrugType.filter('charString',record.data.dataSource);
        }
        view.down('#ExcDrug').setValue(null);
        view.down('#ExcDrug').setRawValue(null);
        view.down('#ExcRoute').setValue('');
        view.down('#ExcRoute').setRawValue('');
        if (record.data.dataSource == 'MDB') {

            this.GetMSCodes("BPK048");
            this.GetMSCodes("M25A072");

        }
        else {
            this.GetFDBCodes("RouteCodes");
            this.GetFDBCodes("DCCCodes");
        }
    },
    onDataSourceLoad: function (combo, record) {
        var view = this.getView(),
            vm = this.getViewModel();
        var StoreDrugType=vm.getParent().getStore('StoreDrugType');
        if(StoreDrugType!=null)
            StoreDrugType.filter('charString',record.data.value);
        else {
            StoreDrugType=vm.getStore('StoreDrugType');
            if(StoreDrugType!=null)
                StoreDrugType.filter('charString',record.data.value);
        }
        view.down('#ExcDrug').setValue(null);
        view.down('#ExcDrug').setRawValue(null);
        view.down('#ExcRoute').setValue('');
        view.down('#ExcRoute').setRawValue('');


        if (record.data.value == 'MDB') {

            this.GetMSCodes("BPK048");
            this.GetMSCodes("M25A072");

        }
        else {
            this.GetFDBCodes("RouteCodes");
            this.GetFDBCodes("DCCCodes");
        }

    },
    GetFDBCodes: function (sListName) {
        var view = this.getView(),
            vm = view.getViewModel(),
            cbxExcDrug = view.down('#ExcDrug'),
            cbxExcRoute = view.down('#ExcRoute'),
            masterrecord = vm.get('masterrecord'),
            arrValues = new Array(),
            arrValues2 = new Array();

        // var i = 0;


        if (sListName == 'DCCCodes') {

            var StoreExcTPACodesFDB = this.getView().getViewModel().get('StoreExcTPACodesFDB');
            StoreExcTPACodesFDB.load();
            cbxExcDrug.setStore(StoreExcTPACodesFDB);
            if(masterrecord!=null) {
                arrValues = vm.get('masterrecord.excTPARestrictionCodes').split(',');
                cbxExcDrug.setValue(arrValues);
            }


        }
        else {

            var StoreExcRtOfAdminFDB = this.getView().getViewModel().get('StoreExcRtOfAdminFDB');
            StoreExcRtOfAdminFDB.load();
            cbxExcRoute.setStore(StoreExcRtOfAdminFDB)
            if(masterrecord!=null) {
                arrValues2 = vm.get('masterrecord.excRouteOfAdminCodes').split(',');
                cbxExcRoute.setValue(arrValues2);
            }

        }


    },


    GetMSCodes: function (sListName) {
        var vm = this.getViewModel(),
            masterrecord = vm.get('masterrecord'),
            arrValues = new Array(),
            arrValues2 = new Array();
        var view = this.getView(),
            cbxExcDrug = view.down('#ExcDrug'),
            cbxExcRoute = view.down('#ExcRoute')
        if (sListName == 'BPK048') {

            var StoreExcTPACodesMSB = this.getView().getViewModel().get('StoreExcTPACodesMSB');
            StoreExcTPACodesMSB.getProxy().setExtraParam('plistName', sListName);
            StoreExcTPACodesMSB.load({
                callback: function (record, operation, success) {


                },
                success: function (request, response) {

                }
            });
            cbxExcDrug.setStore(StoreExcTPACodesMSB);
            if(masterrecord!=null) {
                arrValues = vm.get('masterrecord.excTPARestrictionCodes').split(',');
                cbxExcDrug.setValue(arrValues);
            }

        }
        else if (sListName == "M25A072") {

            var StoreExcRtOfAdminMSB = this.getView().getViewModel().get('StoreExcRtOfAdminMSB');
            StoreExcRtOfAdminMSB.getProxy().setExtraParam('plistName', sListName);
            StoreExcRtOfAdminMSB.load();
            cbxExcRoute.setStore(StoreExcRtOfAdminMSB);
            if(masterrecord!=null) {
                arrValues2 = vm.get('masterrecord.excRouteOfAdminCodes').split(',');
                cbxExcRoute.setValue(arrValues2);
            }

        }

    },

    gpFormularyDetail_beforeedit:function(dv, grid) {
        this.BindExceptionTier();
    },
    onAddClick: function () {

        var view = this.getView();
        var vm = view.up('formularyinfo').getViewModel();
        var pFormularyId = vm.get('masterrecord.FormularyID'),
        FormularyTierID = vm.get('masterrecord.FormularyTierID');
        this.BindExceptionTier();
        var storeGrid = view.down('#gpformularyTiers').getStore();
        storeGrid.insert(0, {
            FormularyID: pFormularyId,
            FormularyTierID: '',
            TierCode: '',
            TierDesc: '',
            exceptionTiercode:null,
            nonPartDTierCode: ''
        });
        view.down('#gpformularyTiers').plugins[0].startEdit(0, 0);
        view.down('#gpformularyTiers').getView().refresh();
    }
    ,

    onRemoveClick: function () {

        var view = this.getView();
        var grid = view.down('#gpformularyTiers');
        var sm = grid.getSelectionModel();
        var store = grid.getStore();
        //rowEditing.cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    }
    ,

    CreateNewFormulary: function () {

        var vm = this.getView().up('formularyinfo').getViewModel();
        vm.set('masterrecord', null);
        vm.set('createformulary', true);
        vm.set('formularyaction', 'NEW');
        var view = this.getView();
        view.up().down('#lblAtlasFormulary').setText('');
        view.up().down('#formularyList').setValue('');
        var theViewModel = this.getView('formularygeneralinfo').getViewModel();
        theViewModel.set('rec', null);

    //    var storeGrid = view.down('#gpformularyTiers');
     //   storeGrid.getStore().removeAll();

        var StoreTiers = this.getView().getViewModel().get('StoreTiers');
        StoreTiers.getProxy().setExtraParam('piFormularyID', '');
        StoreTiers.on({
            load: 'LoadTiers',
            single: true // Remove listener after Load
        });
        StoreTiers.load();
        view.down('#EffectiveDate').setValue('');
        view.down('#FormularyName').setDisabled(false);
        view.down('#btnSave').setDisabled(false);
        var forminfo = this.getView();
        forminfo.getForm().getFields().each(function(field) {
            field.setReadOnly(false);
        });
        view.down('#gridTiers').setDisabled(true);

        //  storeGrid.getStore().sync();


    }
    ,

    CreateNewVersion: function () {
        var view = this.getView();
        var vm = view.up('formularyinfo').getViewModel();
        vm.set('formularyaction', 'NEW_VER');
        vm.set('createformulary', false);
        view.down('#FormularyName').setDisabled(true);
        view.down('#btnSave').setDisabled(false);
        var forminfo = this.getView('formularygeneralinfo');
        forminfo.getForm().getFields().each(function(field) {
            field.setReadOnly(false);
        });
        view.down('#gridTiers').setDisabled(false);
        Ext.MessageBox.alert("PBM", "Selected formulary version will be used to copy all details to new version.<br>Please enter a new Effective Date and click 'Save' to copy formulary.", this.showResult, this);

    }
    ,

    CopyFormulary: function () {
        var view = this.getView();
        var vm = view.up('formularyinfo').getViewModel();
        vm.set('formularyaction', 'COPY');
        vm.set('createformulary', false);
        view.down('#btnSave').setDisabled(false);
        view.down('#FormularyName').setDisabled(false);
        var forminfo = this.getView();
        forminfo.getForm().getFields().each(function(field) {
            field.setReadOnly(false);
        });
        view.down('#gridTiers').setDisabled(false);
        Ext.MessageBox.alert("PBM", "Selected formulary version will be used to copy all details to new version.<br>Please enter a new Effective Date and click 'Save' to copy formulary.", this.showResult, this);

    }
    ,



    SaveTiers: function () {

        var view = this.getView();
        var storeGrid = view.down('#gpformularyTiers');
        var store = storeGrid.getStore()
        var saveAction = [{
            "Create": {"key": 'Action', "value": 'Add'},
            "Update": {"key": 'Action', "value": 'Update'},
            "Delete": {"key": 'Action', "value": 'Delete'}
        }];
        var vm = view.up('formularyinfo').getViewModel();
        var pFormularyId = vm.get('masterrecord.FormularyID');
        vm.set('createformulary', false);
        var saveData = Atlas.common.utility.Utilities.saveData([store], 'formulary/rx/formularytiertable/update', 'ttFormularyTiers', [true], {
                'pFormularyId': pFormularyId

            },
            saveAction, ['pResult ', 'pMessage ']);

        store.reload();

    }
    ,
    rendererTierBasis: function (value) {
        var viewModel=this.getViewModel();
        var StoreTierBasis= viewModel.getParent().getStore('StoreTierBasis');
        var r=  StoreTierBasis.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },
    SaveData: function () {
        var me=this;
        var view = this.getView();
        var InfoEffectiveDate = view.up().down('#InfoEffectiveDate');
        var vm = this.getView().up('formularyinfo').getViewModel(),
            currentModel = this.getView('formularygeneralinfo').getViewModel(),
            createformulary = vm.get('createformulary'),
            action = vm.get('formularyaction'),
            listexcTPARestrictionCodes = view.down('#ExcDrug').getValue(),
            listexcRouteOfAdminCodes = view.down('#ExcRoute').getValue(),
            sFldList = '',
            sFldVals = '',
            excTPARestrictionCodes = '',
            excRouteOfAdminCodes = '',
            effDate = Ext.Date.format(view.down('#EffectiveDate').getValue(), 'm/d/Y');
        if (listexcTPARestrictionCodes.length > 0) {
            excTPARestrictionCodes = listexcTPARestrictionCodes.join();
        }
        if (listexcRouteOfAdminCodes.length > 0) {
            excRouteOfAdminCodes = listexcRouteOfAdminCodes.join();
        }
        if (this.getView('formularygeneralinfo').getForm().isValid()) {
            var rec = currentModel.get('rec');
            if (action != '') {
                if (action == 'NEW' && createformulary == true) {
                    var fieldList = 'FormularyName,Stat,EffectiveDate,dataSource,formularyType,drugTypeFunction,ActiveDays,excTPARestrictionCodes,excRouteOfAdminCodes,incExcOTC,PDFPrintFunction,autoAddNewDrugs';
                    var fieldValue = view.down('#FormularyName').getValue() + '|' + '1' + '|' + effDate + '|' + view.down('#dataSource').getValue() + '|' ;
                    if(view.down('#formularyType').getValue()==null)
                    {
                        fieldValue=fieldValue+"";
                    }
                    else
                    {
                        fieldValue=fieldValue+view.down('#formularyType').getValue();
                    }
                    fieldValue =fieldValue  + '|' + view.down('#drugTypeFunction').getValue() + '|' ;
                    if(view.down('#activeDays').getValue()==null||view.down('#activeDays').getValue()=="")
                    {
                        fieldValue=fieldValue+"365";
                    }
                    else
                    {
                        fieldValue=fieldValue+view.down('#activeDays').getValue();
                    }
                    fieldValue=fieldValue + '|' + excTPARestrictionCodes + '|' +
                        excRouteOfAdminCodes + '|' + view.down('#incExcOTC').getValue() + '|' + view.down('#pdfPrintFunction').getValue() + '|' + view.down('#autoAddNewDrugs').getValue();

                    var theStore = {"pFieldList": fieldList, "pFieldValues": fieldValue};
                    saveAction = [
                        {"Save": {"key": 'mode', "value": 'A'}}
                    ];
                    var saveData = Atlas.common.utility.Utilities.saveData([theStore], 'formulary/rx/newformulary/update', null, [false], {},
                        saveAction, ['piFormID', 'result']);
                    if (saveData.code == 0) {
                        vm.set('masterrecord.FormularyID', saveData.piFormID);


                        var storeGrid = view.down('#gpformularyTiers');
                        var store = storeGrid.getStore()
                        var saveAction = [{
                            "Create": {"key": 'Action', "value": 'Add'},
                            "Update": {"key": 'Action', "value": 'Update'},
                            "Delete": {"key": 'Action', "value": 'Delete'}
                        }];
                        vm.set('createformulary', false);
                        var saveTiers = Atlas.common.utility.Utilities.saveData([store], 'formulary/rx/formularytiertable/update', 'ttFormularyTiers', [true], {
                                'pFormularyId': saveData.piFormID
                            },
                            saveAction, ['pResult ', 'pMessage ']);
                        store.on({
                            load: 'LoadTiers',
                            single: true // Remove listener after Load
                        });
                        store.reload();
                        Ext.MessageBox.alert("Success", "New Formulary " + view.down('#FormularyName').getValue() + " successfully created.", this.showResult, this);
                        var StoreFormularyList = vm.get('StoreFormularyList');
                        StoreFormularyList.load({

                            callback: function (record, operation, success) {
                                view.up().down('#formularyList').setValue(vm.get('masterrecord.FormularyID'));
                                view.up().down('#formularyList').setRawValue(view.down('#FormularyName').getValue());
                                view.down('#EffectiveDate').setValue("");
                                view.down('#EffectiveDate').clearInvalid();
                                view.down('#ExcDrug').setValue("");
                                view.down('#ExcRoute').setValue("");
                                view.up().down('#lblFormularyVersion').setValue("1");
                                view.up().down('#lblStatus').setValue("Draft");
                                view.up().down('#InfoEffectiveDate').setValue(effDate);
                                var record={};
                                record={"FormularyID":vm.get('masterrecord.FormularyID'),"FormularyVersion":1,"Stat":1,"excTPARestrictionCodes":excTPARestrictionCodes,"excRouteOfAdminCodes":excRouteOfAdminCodes};
                                me.ReloadFormulary(record);
                                vm.set('formularyaction', 'UPD');
                               //  currentModel.set('rec', vm.get('masterrecord'));
                            }

                        });

                    }

                }
                else if (action == 'NEW_VER') {

                    var sParam = vm.get('masterrecord.FormularyID') + "|" + vm.get('masterrecord.FormularyVersion') + "|" + effDate;


                    var sReportName = "Create Formulary Version |" + vm.get('masterrecord.FormularyName');
                    var sProgramName = "setFormularyCreateNewVersion.p";
                    var pParameters = sParam;
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
                    var extraParameters = {
                        'pDescription': sReportName,
                        'pProgramName': sProgramName,
                        'pParameters': pParameters,
                        'pRunMode': 2,
                        'pProgramType': "batch",
                        'pSaveDocument': false,
                        'pFaxNumber': ''
                    }
                    var returnField = ['pJobNumber'];
                    var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                        saveAction, returnField);
                    if (submitJobReturn.code == 0) {
                        vm.set('formularyaction', 'UPD');
                        var record={};
                        record={"FormularyID":vm.get('masterrecord.FormularyID'),"FormularyVersion":vm.get('masterrecord.FormularyVersion'),"Stat":vm.get('masterrecord.Stat'),"excTPARestrictionCodes":excTPARestrictionCodes,"excRouteOfAdminCodes":excRouteOfAdminCodes};
                        me.ReloadFormulary(record);
                        Ext.MessageBox.alert('PBM', "Create Formulary Version Job # " + submitJobReturn.pJobNumber + " has been successfully queued. Please review the Job Status in the Job Queue.", this.showResult, this);


                    }

                }
                else if (action == 'COPY') {
                    var sParam = vm.get('masterrecord.FormularyID') + "|" + vm.get('masterrecord.FormularyVersion') + "|" + view.down('#FormularyName').getValue() + "|" + effDate;

                    var sReportName = "Copy Formulary Version";
                    var sProgramName = "setFormularyCreateNewVersion.p";
                    var pParameters = sParam;
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
                    var extraParameters = {
                        'pDescription': sReportName,
                        'pProgramName': sProgramName,
                        'pParameters': pParameters,
                        'pRunMode': 2,
                        'pProgramType': "batch",
                        'pSaveDocument': false,
                        'pFaxNumber': ''
                    }
                    var returnField = ['pJobNumber'];
                    var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                        saveAction, returnField);
                    if (submitJobReturn.code == 0) {
                        vm.set('formularyaction', 'UPD');
                        var record={};
                        record={"FormularyID":vm.get('masterrecord.FormularyID'),"FormularyVersion":vm.get('masterrecord.FormularyVersion'),"Stat":vm.get('masterrecord.Stat'),"excTPARestrictionCodes":vm.get('masterrecord.excTPARestrictionCodes'),"excRouteOfAdminCodes":vm.get('masterrecord.excRouteOfAdminCodes')};
                        me.ReloadFormulary(record);
                        Ext.MessageBox.alert("PBM", "Copy Formulary Job # " + submitJobReturn.pJobNumber + " has been successfully queued. Please review the Job Status in the Job Queue.", this.showResult, this);
                    }

                }
                else if (action == 'UPD') {
                    sFldList = 'FormularyName,Stat,EffectiveDate,dataSource,formularyType,drugTypeFunction,ActiveDays,excTPARestrictionCodes,excRouteOfAdminCodes,incExcOTC,PDFPrintFunction,autoAddNewDrugs';
                    sFldVals = view.down('#FormularyName').getValue() + '|' + '1' + '|' + effDate + '|' + view.down('#dataSource').getValue() + '|' ;
                    if(view.down('#formularyType').getValue()==null)
                    {
                        sFldVals=sFldVals+"";
                    }
                    else
                    {
                        sFldVals=sFldVals+view.down('#formularyType').getValue();
                    }
                    sFldVals= sFldVals    + '|' +
                        view.down('#drugTypeFunction').getValue() + '|' ;
                    if(view.down('#activeDays').getValue()==null||view.down('#activeDays').getValue()=="")
                    {
                        sFldVals=sFldVals+"365";
                    }
                    else
                    {
                        sFldVals=sFldVals+view.down('#activeDays').getValue();
                    }
                    sFldVals=sFldVals + '|' + excTPARestrictionCodes + '|' +
                        excRouteOfAdminCodes + '|' + view.down('#incExcOTC').getValue() + '|' + view.down('#pdfPrintFunction').getValue() + '|' + view.down('#autoAddNewDrugs').getValue();
                    var theStore = {"pFieldList": sFldList, "pFieldValues": sFldVals};
                    saveAction = [
                        {"Save": {"key": 'mode', "value": 'A'}}
                    ];
                    var saveData = Atlas.common.utility.Utilities.saveData([theStore], 'formulary/rx/formularymaster/update', null, [false], {
                            'piFormID': vm.get('masterrecord.FormularyID'),
                            'piFormVsn': vm.get('masterrecord.FormularyVersion')
                        },
                        saveAction, ['result']);
                    if (saveData.code == 0) {

                        var storeGrid = view.down('#gpformularyTiers');
                        store = storeGrid.getStore()
                        var saveAction = [{
                            "Create": {"key": 'Action', "value": 'Add'},
                            "Update": {"key": 'Action', "value": 'Update'},
                            "Delete": {"key": 'Action', "value": 'Delete'}
                        }];
                        vm.set('createformulary', false);
                        var saveTiers = Atlas.common.utility.Utilities.saveData([store], 'formulary/rx/formularytiertable/update', 'ttFormularyTiers', [true], {
                                'pFormularyId': vm.get('masterrecord.FormularyID')

                            },
                            saveAction, ['pResult ', 'pMessage ']);
                        store.on({
                            load: 'LoadTiers',
                            single: true // Remove listener after Load
                        });
                        store.reload();
                        var StoreFormularyList = vm.get('StoreFormularyList');
                        StoreFormularyList.load({

                            callback: function (record, operation, success) {
                                view.up().down('#formularyList').setValue(vm.get('masterrecord.FormularyID'));
                                view.up().down('#formularyList').setRawValue(vm.get('masterrecord.FormularyName'));
                                InfoEffectiveDate.setValue(new Date(effDate));
                            }

                        });
                        InfoEffectiveDate.setValue(new Date(effDate));
                        Ext.MessageBox.alert("Success", "Formulary information successfully updated.", this.showResult, this);


                    }

                }

            }


        }
        else {
            Ext.Msg.alert('Validation Error', 'Please fix all the validation errors before saving the data.');
        }


    },

    BindExceptionTier: function () {

        var datar = new Array();

        var view = this.getView();
        var Grid = view.down('#gpformularyTiers');
        var storeGrid = view.down('#gpformularyTiers').getStore();
        var StoreTiersException = this.getView().getViewModel().get('StoreTiersException');
        var TierCode = 'NA';
        //TierCodeObj.TierCode = 'NA';
        //datar.push(TierCode);
        for (var i = 0; i < storeGrid.data.length; i++) {
            var record = storeGrid.getAt(i);
            if(record.data.TierCode!=""&& !record.phantom) {
                datar.push(record.data.TierCode);
            }

        }

        var gridCols = Grid.columns;
        // var store = gridCols[4].getEditor().getStore('#StoreTiersException');

        var theCombobox = gridCols[4].getEditor();
        theCombobox.setStore(datar);

         StoreTiersException.loadData(datar);


    },
    cbxFormularyList_SelectHandlerinfo:function(EffectiveDate)
    {
        var view=this.getView();
        view.down('#EffectiveDate').setValue(EffectiveDate);

    }


})


;