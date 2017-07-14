/**
 * Created by s6393 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.view.planbenefitpackage.PlanBenefitPackageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.planbenefitpackage-search',
    id: 'Atlas.benefitplan.view.planbenefitpackage.PlanBenefitPackageController',

    /**
     * Called when the view is created
     */
    init: function() {
        Ext.getBody().mask('loading');
        var me = this;
        var vm = this.getViewModel();
        vm.set('popGrpSK', this.getView().atlasId);

        if(this.getView().atlasId > 0)
        {
            vm.set('hasPopGrpSK',  true);
            var store = vm.getStore('navigationBreadCrumb');
            store.getProxy().setExtraParams({
                'popGrpSK': vm.get('popGrpSK')
            });
            store.load(function(){
                Ext.getBody().unmask();
            });
        }
        else
        {
            Ext.getBody().unmask();
            vm.set('hasPopGrpSK',  false);
        }

    },
    listen : {
        controller : {
            '*': {
                PackageConfigurationSavedEvent: 'PackageConfigurationSaved',
                closePopulationGroupAssignBenefitPackageSearch: 'closePopulationGroupAssignBenefitPackageSearch'
            }
        }
    },
    closePopulationGroupAssignBenefitPackageSearch: function() {
        this.getView().close();
    },
    onViewElementsClick: function (combo , record , eOpts) {

        var me= this, vm = me.getViewModel();
        var selected =  me.getReferences().packagesearchgrid.getSelectionModel();
        selected.select(record);
        vm.set('PBPSK' ,selected.getSelection()[0].data.PBPSK);
        Ext.create('Atlas.benefitplan.view.populationgroup.AssociatedPopulations', {
            autoShow: true,
           viewModel:{
                data: {
                    rootSk: this.getViewModel().get('PBPSK')
                }
            }
        });
    },
    PackageConfigurationSaved:function(){
        //Not changing selected text of dropdown pbp
        this.onSearch(null);
    },

    onReset: function (bt) {
        bt.up('form').reset();
        this.getReferences().packagesearchgrid.getStore().removeAll();
    },
    onPlanBenefitPackageGridItemClick: function(grid, record, item) {
        if (this.getViewModel().get('hasPopGrpSK')) {
            this.onAssignPBPPopGrpClick();
        } else {
            this.onEditPackageClick();
        }
    },
    onSelectionChange: function () {
        var me = this;
        var selection =  me.getReferences().packagesearchgrid.getSelectionModel();
        if (selection.hasSelection())
        {
            var hasPopGrpSK  = this.getViewModel().get('hasPopGrpSK');
        }
    },
    onBreadCrumbLoad : function(store , records , successful , operation , eOpts ){
        if(this.getView().atlasId > 0)
        {
            var data = records[0].data,
                vm = this.getViewModel();
            this.setBreadCrumb(data, vm);
        }
    },
    setBreadCrumb : function(data, vm){
        var me = this;
        var bc = data,
        lim = '&nbsp;>&nbsp;';
        var breadcrumbarea = this.getReferences().breadcrumbarea;
        breadcrumbarea.removeAll();
        var label = Ext.create('Ext.form.Label', {
            html: '<b>'+ "Tenant Family: "+'<b>' + bc.TenantFamName  + '</b>' + lim,
            listeners: {
                render: function(c){
                    c.getEl().on('click', function(){

                        me.openView(bc.TenantFamSK, bc.TenantFamSK, 10);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '<b>'+ "Tenant: "+'<b>' + bc.TenantName  + '</b>' + lim,
            listeners: {
                render: function(c){
                    c.getEl().on('click', function(){

                        me.openView(bc.TenantFamSK, bc.TenantSK, 20);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '<b>'+ "Account: "+'<b>' + bc.AcctName  + '</b>' + lim,
            listeners: {
                render: function(c){
                    c.getEl().on('click', function(){
                        me.openView(bc.TenantFamSK, bc.AcctSK, 30);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '<b>'+ "Group: "+'<b>' + bc.GrpName  + '</b>' + lim,
            listeners: {
                render: function(c){
                    c.getEl().on('click', function(){

                        me.openView(bc.TenantFamSK, bc.GrpSK, 40);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '<b>'+ "Population Group: "+'<b>' + bc.PopGrpName  + '</b>',
            listeners: {
                render: function(c){
                    c.getEl().on('click', function(){
                        me.openView(bc.TenantFamSK,bc.PopGrpSK, 50);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
    },
    openView: function(rootsk, viewsk, viewtype) {
        this.fireEvent('closeHierarchyConfiguration');
        this.fireEvent('openView', 'merlin', 'benefitplan', 'configuration.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: viewsk,
            viewtype: viewtype,
            rootsk: rootsk
        });
    },

    onAssignPBPPopGrpClick:function(button, record, e){
        var me = this, vm = me.getViewModel();
        var selection =  me.getReferences().packagesearchgrid.getSelectionModel();
        if (selection.hasSelection())
        {
            vm.set('PBPSK', me.getReferences().packagesearchgrid.getSelectionModel().getSelection()[0].data.PBPSK);
            var store = vm.getStore('packagesearch');
            store.getProxy().setExtraParam({});
            store.getProxy().setExtraParam('PBPSK', vm.get('PBPSK'));
            store.getProxy().setExtraParam('PopGrpSK', vm.get('popGrpSK'));
            Ext.getBody().unmask('saving..');
            store.load({
                scope: this,
                callback: function(records, operation, success) {
                    Ext.getBody().unmask();
                    var res =  Ext.decode (operation._response.responseText);
                    if(success){
                            Ext.Msg.show({
                                title: 'Success',
                                msg: res.messages[0].message,
                                buttons: Ext.Msg.YESNO,
                                closable: false,
                                draggable: false,
                                resizable: false,
                                fn: function (btn) {
                                    if (btn == 'yes') {
                                        //Close configuration screen if there is one already opened
                                        this.fireEvent('onClosePopGroupBenefitConfiguration', vm.get('PBPSK'));
                                        this.fireEvent('openView', 'merlin', 'benefitplan', 'populationgroup.benefitconfiguration.Main',
                                            {
                                                menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                                                PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                                                atlasId: {
                                                    popGrpPBPSK: 0, // popGrpPBPSK = 0 for the new configuration
                                                    popGrpSK: vm.get('popGrpSK'),
                                                    pbpSK: vm.get('PBPSK')
                                                }

                                            });
                                    }
                                }, scope: this
                            });

                    }
                    else
                    {
                        Ext.Msg.alert(res.messages[0].code,res.messages[0].message);
                    }
                }
            });
        }
    },

    onNewPackageClick: function(){
        var me = this;
            Ext.Msg.show({
                title: 'Confirm Create',
                msg: 'Are you sure you want to create a new Plan Benefit Package ?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == 'yes') {
                        var selection = me.getReferences().packagesearchgrid.getSelectionModel();
                        if (selection.hasSelection()) {
                            selection.deselectAll();
                        }
                        //Close configuration screen if there is one already opened
                        this.fireEvent('onCloseBenefitPlanPackageConfiguration', this.getView().PBPSK);
                        //me.fireEvent('openView', 'merlin', 'benefitplan', 'configuration.PlanBenefitPackageConfig',
                        this.fireEvent('onCloseBenefitPlanPackageConfiguration', 0);
                        me.fireEvent('openView', 'merlin', 'benefitplan', 'planbenefitpackage.PlanBenefitPackageConfig',
                            {
                                menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                                PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                                atlasId: 0
                            });

                    }
                }, scope: this
            });

    },
    onEditPackageClick: function(button, record, e){

        var me = this;
        var selection =  me.getReferences().packagesearchgrid.getSelectionModel();
        if (selection.hasSelection())
        {
            var packageSK = me.getReferences().packagesearchgrid.getSelectionModel().getSelection()[0].data.PBPSK;
            var packageName = me.getReferences().packagesearchgrid.getSelectionModel().getSelection()[0].data.PBPName;
            if(packageSK != 0) {
                    Ext.Msg.show({
                        title: 'Confirm Edit',
                        msg: 'Are you sure you want to edit Plan Benefit Package ' + packageName + '?',
                        buttons: Ext.Msg.YESNO,
                        closable: false,
                        draggable: false,
                        resizable: false,
                        fn: function (btn) {
                            if (btn == 'yes') {
                                //Close configuration screen if there is one already opened
                                this.fireEvent('onCloseBenefitPlanPackageConfiguration', this.getView().PBPSK);
                                //open configuration screen
                                this.fireEvent('onCloseBenefitPlanPackageConfiguration', 0);
                                me.fireEvent('openView', 'merlin', 'benefitplan', 'planbenefitpackage.PlanBenefitPackageConfig', {
                                    menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                                    PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                                    atlasId: packageSK
                                });
                            }
                        }, scope: this
                    });
            }
        }

    },
    onSearch:  function (button) {
         // get reference to the container
        //var searchView = button.up('container');
        var searchView = this.getReferences().PBPSearchForm;
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            cmbBenefitType = view.down('[name=benefitplanType]'),
            cmbLob = view.down('[name=lob]'),
            cmbPackageName = view.down('[name=benefitpackageName]').getValue();
        var selected = me.getReferences().packagesearchgrid.getSelectionModel().getSelection();

        var store = vm.getStore('packagesearch');
        var proxy = store.getProxy();
        proxy.setExtraParams({});
        var startDate = me.lookupReference('benefitpackageStartDate').getValue();
        var endDate = me.lookupReference('benefitpackageEndDate').getValue();
        Ext.getBody().mask('loading..');
        if (startDate != "" && startDate != null && endDate !="" && endDate !=null ) {
            proxy.setExtraParam('efctvStartDt', startDate);
            proxy.setExtraParam('efctvEndDt', endDate);
        }
        else {
            delete proxy.extraParams['efctvStartDt'];
            delete proxy.extraParams['efctvEndDt'];
        }
        var tenantFamily =  view.down('[name=tenantFamily]').getValue();
        if  (tenantFamily != "" && tenantFamily != null ) {
            proxy.setExtraParam('tenantFamName', tenantFamily);
        }
        else {
            delete  proxy.extraParams['tenantFamName'];
        }
        var tenant = view.down('[name=tenant]').getValue();
        if  (tenant != "" && tenant != null ) {
            proxy.setExtraParam('tenantName', tenant);
        }
        else {
            delete proxy.extraParams['tenantName'];
        }
        var account = view.down('[name=account]').getValue();
        if  (account != "" && account != null ) {
            proxy.setExtraParam('acctName', account);
        }
        else {
            delete proxy.extraParams['acctName'];
        }
        var group = view.down('[name=group]').getValue();
        if  (group != "" && group != null ) {
            proxy.setExtraParam('grpName', group);
        }
        else {
            delete proxy.extraParams['grpName'];
        }
        var pGroup = view.down('[name=popGroup]').getValue();
        if  (pGroup != "" && pGroup != null ) {

            proxy.setExtraParam('popGrpName', pGroup);
        }
        else {
            delete proxy.extraParams['popGrpName'];
        }
        if (cmbPackageName != '' && cmbPackageName != null) {
            proxy.setExtraParam('PBPName', cmbPackageName);

        } else {
            delete proxy.extraParams['PBPName'];
        }
        if (cmbLob.getSelection()) {
            var pLOB =cmbLob.getSelection().get('LOBSK');
            proxy.setExtraParam('lOBSK', pLOB);
        }
        else {
            delete proxy.extraParams['lOBSK'];
        }
        if (cmbBenefitType.getSelection()) {
            var bnftPlanTypeSK =cmbBenefitType.getSelection().get('BnftPlanTypeSK');
            proxy.setExtraParam('BnftPlanTypeSK', bnftPlanTypeSK);
        }
        else {
            delete proxy.extraParams['BnftPlanTypeSK'];
        }
        store.load( function(){
            if (0 < selected.length) {
                var newRecordsToSelect = [];
                for (var i = 0; i < selected.length; i++) {
                    var record = store.findRecord("PBPSK", selected[i].data.PBPSK, 0, false, false, true);
                    if (!Ext.isEmpty(record)) {
                        newRecordsToSelect.push(record);
                    }
                }

                me.getReferences().packagesearchgrid.getSelectionModel().select(newRecordsToSelect);
            }
            Ext.getBody().unmask();
        });
    }
});