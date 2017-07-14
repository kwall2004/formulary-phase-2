/**
 * Created by s6393 on 9/28/2016.
 */
Ext.define('Atlas.benefitplan.view.benefitplan.BenefitPlanViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplanview',
    refs: [{
        ref: 'viewport',
        selector: 'viewport'
    }],
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                planConfigurationSaved : 'planConfigurationSaved',
                closeBenefitPlanSearch : 'closeBenefitPlanSearch'
            }
        }
    },
    closeBenefitPlanSearch: function() {
        Ext.util.Cookies.set('onPricingValue',null);
        this.getView().close();
    },
    /**
     * Called when the view is created
     */
    init: function() {
        Ext.getBody().mask('Loading');
        Ext.util.Cookies.set('onPricingValue',null);
        var vm = this.getViewModel();
        vm.set('PBPSK', this.getView().PBPSK);

        if(this.getView().PBPSK > 0)
        {
            vm.set('hasPBPSK',  true);
            var store = vm.getStore('packages');
            store.getProxy().setExtraParams({
                'PBPSK': this.getView().PBPSK
            });
            store.load(function () {
                Ext.getBody().unmask();
            });
        }
        else
        {
            vm.set('hasPBPSK',  false);
            Ext.getBody().unmask();
        }
    },
    onSelectionChange: function () {
        var me = this,
            selection =  me.lookup('benefitPlanGrid').getSelectionModel(),
            radioIsPlansOnly = me.getView().down('[name=isTemplate]');
        if (selection.hasSelection())
        {
            var hasPBPSK  = this.getViewModel().get('hasPBPSK');
            var radioIsPlansOnlyValue = radioIsPlansOnly.down('[name=searchPlanType]').checked;
           if(hasPBPSK && radioIsPlansOnlyValue)
            {
                me.getViewModel().set('canassignplan',true);
            }
            else
            {
                me.getViewModel().set('canassignplan',false);
            }
        }
    },
    onLoad: function(store, records){
        if(this.getView().PBPSK > 0)
        {
            this.setPlanBenefitPacakgeName(records[0].data, this.getViewModel());
        }
    },
    setPlanBenefitPacakgeName: function(data, vm){
        vm.set('PBPName', '<b>'+ "Plan Benefit Package Name: "+'<b>'+ data.PBPName  + '</b>');
    },
    onReset: function () {
        this.lookup('benefitPlanGrid').getStore().removeAll();
        this.lookup('formreset').getForm().reset();
    },
    planConfigurationSaved: function() {
        this.onSearch(null);
    },
    onViewElementsClick: function(combo, record) {
        var selected =  this.lookup('benefitPlanGrid').getSelectionModel();
        selected.select(record);
        this.getViewModel().set('BnftPlanSK' ,selected.getSelection()[0].data.BnftPlanSK);
        Ext.create('Atlas.benefitplan.view.benefitplan.BenefitPlanAssociatedPopulations', {
            autoShow: true,
            viewModel:{
                data: {
                    rootSk: this.getViewModel().get('BnftPlanSK')
                }
            }
        });
    },
    onSearch:  function() {
        Ext.getBody().mask('Loading');
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            cmbBenefitPlan = view.down('[name=benefitplan]').getValue(),
            cmbBenefitType = view.down('[name=benefitplanType]'),
            radioIsPlansOnly = view.down('[name=isTemplate]'),
            cmbLob = view.down('[name=lob]');
        var startDate = me.lookup('benefitplanStartDate').getValue();
        var endDate = me.lookup('benefitplanEndDate').getValue();
        //Check if valid date is typed in start date
        if (!me.lookup('benefitplanStartDate').isValid() || !me.lookup('benefitplanEndDate').isValid()){
            return false;
        }
        var store = vm.getStore('plansearch'),
            proxy =store.getProxy();
        if(radioIsPlansOnly)
        {
            if(!radioIsPlansOnly.down('[name=searchPlanType]').checked)
            {
                proxy.setExtraParam('tmpltInd', true);
                me.getViewModel().set('canassignplan',false);
            }
            else
            {
                proxy.setExtraParam('tmpltInd', false);
            }
        }
        if (cmbBenefitPlan != '' && cmbBenefitPlan != null) {
            proxy.setExtraParam('BnftPlanName', cmbBenefitPlan);
        } else {
            delete proxy.extraParams['BnftPlanName'];
        }
        if (cmbLob.getSelection())
        {
            proxy.setExtraParam('LOBSK', cmbLob.getSelection().get('LOBSK'));
        }
        else {
            delete proxy.extraParams['LOBSK'];
        }
        if (cmbBenefitType.getSelection())
        {
            proxy.setExtraParam('BnftPlanTypeSK', cmbBenefitType.getSelection().get('BnftPlanTypeSK'));
        }
        else {
            delete proxy.extraParams['BnftPlanTypeSK'];
        }
        if (startDate != "" && startDate != null && endDate !="" && endDate !=null )
        {
            proxy.setExtraParam('EfctvStartDt', startDate);
            proxy.setExtraParam('EfctvEndDt', endDate);
        }
        else {
            delete proxy.extraParams['EfctvStartDt'];
            delete proxy.extraParams['EfctvEndDt'];
        }
        store.load(function(records, operation, success) {
            if(success) {
                if(records.length == 0) {
                    store.removeAll(true);
                }
                Ext.getBody().unmask();
            } else {
                store.removeAll(true);
                Ext.getBody().unmask();
            }
        });

    },
    onNewPlanClick: function () {
        this.getView().down('[name=CreateBenefitPlan]').show();
    },
    onNewPlanBegin: function(){
        var view = this.getView();
        view.down('[name=CreateBenefitPlan]').hide();
        this.openBenefitPlanDetailConfiguration(0, view.down('[name=Modalbenefitplantype]').getSelection().get('BnftPlanTypeSK'), view.down('[name=Modallineofbusiness]').getSelection().get('LOBSK'), false);
    },
    onNewPlanCancel: function() {
        this.getView().down('[name=CreateBenefitPlan]').hide();
    },
    onAssignPlanToBenefitPackageClick:function(){
        var me = this,
            vm = me.getViewModel();
        if(vm.get('hasPBPSK'))
        {
            var selection =  me.lookup('benefitPlanGrid').getSelectionModel();
            if (selection.hasSelection())
            {
                var selectedPlanSK = selection.getSelection()[0].data.BnftPlanSK;
                var selectedPlanName = selection.getSelection()[0].data.BnftPlanName;
                Ext.Msg.show({
                    title: 'Confirm Assign',
                    msg: 'Are you sure you want to assign the Benefit Plan to the ' + selectedPlanName + ' ' + vm.get('PBPName') + '?',
                    buttons: Ext.Msg.YESNO,
                    closable: false,
                    draggable: false,
                    resizable: false,
                    fn: function (btn) {
                        if (btn == 'yes') {
                            Ext.getBody().mask('Loading');
                            var store = vm.getStore('assignPlantoPackage');
                            var queryString = '?pbpSKToAssign=' + me.getView().PBPSK + '&bnftPlanSKToAssign=' + selectedPlanSK + '&CurrentUser=' + vm.get('user').un;
                            var newUrl = "/PlanBenefitPackage" + queryString;
                            store.getProxy().setUrl(newUrl);
                            store.load({
                                callback: function (records, operation, success) {
                                    var res = Ext.decode(operation._response.responseText);
                                    if (success) {
                                        Ext.getBody().unmask();
                                        Ext.Msg.show({
                                            title: 'Success',
                                            msg: res.messages[0].message,
                                            buttons: Ext.Msg.OK,
                                            closable: false,
                                            draggable: false,
                                            resizable: false,
                                            fn: function() {
                                                me.fireEvent('onCloseBenefitPlanPackageConfiguration', me.getView().PBPSK);
                                                me.fireEvent('openView', 'merlin', 'benefitplan', 'planbenefitpackage.PlanBenefitPackageConfig',
                                                    {
                                                        menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                                                        PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                                                        atlasId: me.getView().PBPSK
                                                    });
                                                me.fireEvent('closeBenefitPlanSearch');
                                            }
                                        });
                                    }
                                    else {
                                        Ext.getBody().unmask();
                                        Ext.Msg.show({
                                            title: 'Failed to copy and edit',
                                            msg: 'Data failed to copy and edit:',
                                            buttons: Ext.Msg.OK,
                                            closable: false,
                                            draggable: false,
                                            resizable: false
                                        });
                                    }
                                }
                            });
                        }
                        else {
                           vm.set('canassignplan',true);
                        }
                    }
                });
            }
        }
        vm.set('canassignplan',false);
    },
    onPlanBenefitPlanGridItemClick: function(){
        var me = this,
            vm = me.getViewModel(),
            row = me.getView().down('[itemId="benefitPlanGrid"]').getSelectionModel().getSelection()[0];
        if(this.lookup('copyEditPlanButton').hasFocus)
        {
            if(row.get('BnftPlanSK') != 0) {
                Ext.Msg.show({
                    title: 'Confirm Copy and Edit',
                    msg: 'Are you sure you want to copy and edit Benefit Plan ' + row.get('BnftPlanName') + '?',
                    buttons : Ext.Msg.YESNO,
                    closable: false,
                    draggable: false,
                    resizable: false,
                    fn: function(btn) {
                        if(btn == 'yes') {
                            var store = vm.getStore('copyEditPlan');
                            var queryString = '?bnftPlanSKToCopy='+ row.get('BnftPlanSK') +'&CurrentUser='+ vm.get('user').un;
                            var newUrl = "/BenefitPlan" + queryString;
                            store.getProxy().setUrl(newUrl);
                            Ext.getBody().mask('Loading');
                            store.load({
                                callback: function (record, operation, success) {
                                    Ext.getBody().unmask();
                                    var resObj = operation.getResponse() && Ext.decode(operation.getResponse().responseText);
                                    vm.set('BnftPlanSK', resObj.id[0]);
                                    Ext.Msg.show({
                                        title: 'Success',
                                        msg: 'Benefit Plan : '+ row.get('BnftPlanName') +' ' + resObj.messages[0].message,
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        draggable: false,
                                        resizable: false
                                    });
                                    if(success)
                                        me.openBenefitPlanDetailConfiguration(vm.get('BnftPlanSK'), row.get('BnftPlanTypeCode'), row.get('LOBName'), true);
                                }
                            });
                        }
                    }
                });
            }
        }
        else if(row.get('BnftPlanSK') != 0) {
            Ext.Msg.show({
                title: 'Confirm Edit',
                msg: 'Are you sure you want to edit Benefit Plan ' + row.get('BnftPlanName') + '?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == 'yes') {
                        me.openBenefitPlanDetailConfiguration(row.get('BnftPlanSK'), row.get('BnftPlanTypeCode'), row.get('LOBName'), false);
                    }
                }
            });
        }
    },
    openBenefitPlanDetailConfiguration: function(cmbBenefitPlanSK, cmbBenefitType, LOBName, iscopy) {
        if(Ext.first('viewport').down('[itemId="progressbar"]')) {
            this.fireEvent('benefitPlanHasUnsavedRecords', {t: 'benefitplandetailconfiguration.Main', atlasId: cmbBenefitPlanSK, LOBName: LOBName, cmbBenefitType: cmbBenefitType, cmbBenefitPlanSK: cmbBenefitPlanSK, iscopy: iscopy});
        } else {
            this.fireEvent('openView', 'merlin', 'benefitplan', 'benefitplandetailconfiguration.Main', {
		        menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                atlasId: cmbBenefitPlanSK,
                cmbBenefitPlanSK: cmbBenefitPlanSK,
                cmbBenefitType: cmbBenefitType,
                LOBName: LOBName,
                isCopy: iscopy
            });
        }
    }
});
