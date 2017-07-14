/**
 * Created by n6570 on 11/14/2016.
 */
/**
 * @Class : 'Atlas.benefitplan.view.coveragesetconfiguration.coveragesetconfig.CoverageSetConfigurationController'
 * This Class is the View Controller for the Coverage Set Configuration Module
 * @author : n6570
 * @Date : '11-14-2016'
 */
Ext.define('Atlas.benefitplan.view.coveragesetconfiguration.CoverageSetConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.coveragesetconfiguration',
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },
    onCloseBenefitPlanDetailConfiguration: function(args) { //for thermometer progress bar
        if(this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
    },
    beforeInit: function () {
        var vm = this.getViewModel(),
            view = this.getView();
        vm.set('cmbBenefitPlanSK', view.cmbBenefitPlanSK);
        vm.set('cmbBenefitType', view.cmbBenefitType);
        vm.set('LOBName', view.LOBName);
        vm.set('viewclass', view.$className);
        vm.set('viewnumber', 3);
    },
    init: function() {
        var vm = this.getViewModel(),
            CostShareMaximumsStore = vm.getStore('CostShareMaximums');
        CostShareMaximumsStore.getProxy().setExtraParam("BnftPlanSK", vm.get('cmbBenefitPlanSK'));
        CostShareMaximumsStore.getProxy().setExtraParam("CurrentUser", vm.get('user').un);
        this.saveCheckFlag = false;
        Ext.getBody().mask('loading');
        CostShareMaximumsStore.load(function(){
            Ext.getBody().unmask();
        });
    },
    afterPageRendered: function(){
        this.storeloadcount = 0;
        Ext.getBody().mask('loading');
        this.LoadAllCoverageSets();
        this.LoadAllDropdowns();
    },
    /*
     * Generic method to show a message dialog to prevent repeated code
     */
    showMessage: function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            buttons: Ext.Msg.OK,
            closable: false,
            draggable: false,
            resizable: false
        });
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist= false;
        panel.query('grid').forEach(function logArrayElements(element){
            element.store.each(function(record){
                if (record.phantom) {

                    phantomRowsExist = true;
                }
            });
        });
        if(!phantomRowsExist){
            phantomRowsExist = this.checkGridDirty();
        }
        if (phantomRowsExist||this.getViewModel().get('changed')){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function(id){
                if (id === 'yes') {
                    panel.events.beforeclose.clearListeners();
                    panel.close();
                }
            });
        }else{
            panel.events.beforeclose.clearListeners();
            panel.close();
        }
        return false;
    },
    benefitPlanHasUnsavedRecords: function(args ) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist = false,
            me = this,
            panel = me.getView();
        panel.query('grid').forEach(function logArrayElements(element){
            element.store.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if(!phantomRowsExist){
            phantomRowsExist = this.checkGridDirty();
        }
        if (phantomRowsExist||this.getViewModel().get('changed')){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function(id){
                if (id === 'yes') {
                    panel.events.beforeclose.clearListeners();
                    me.fireEvent('proceedWithProgressNavigation', {t: args.t, LOBName: args.LOBName, cmbBenefitType: args.cmbBenefitType, cmbBenefitPlanSK: args.cmbBenefitPlanSK, iscopy: args.iscopy});
                }
            });

        }else{
            panel.events.beforeclose.clearListeners();
            me.fireEvent('proceedWithProgressNavigation', {t: args.t, LOBName: args.LOBName, cmbBenefitType: args.cmbBenefitType, cmbBenefitPlanSK: args.cmbBenefitPlanSK, iscopy: args.iscopy});
        }
    },
    //Load Coverageset related to Benefit Plan
    LoadAllCoverageSets:function(){
    var me =this,
        vm = me.getViewModel(),
        coveragesetAllStore= vm.getStore('coveragesetsallstore');
        coveragesetAllStore.getProxy().setExtraParams({'bnftPlanSK': vm.get('cmbBenefitPlanSK')});
        coveragesetAllStore.load(function(){
            me.connectGrids();
        });
    },
    //Load all Dropdowns of each component of page
    LoadAllDropdowns: function(){
        var me =this,
            vm = me.getViewModel();
        //Load all month list
        vm.getStore('monthListstore').load(function(){
            me.connectGrids();
        });
        //Load all thresholds of a plan to use
        var store = vm.getStore('coveragethresholdstore');
        store.getProxy().setExtraParams({'bnftPlanSK' : vm.get('cmbBenefitPlanSK') } );
        store.load(function(){
            me.connectGrids();
        });
        //Load all FrequencyQualifierType to use
        vm.getStore('frequencyqualifiertypestore').load(function(){
            me.connectGrids();
        });
        //Get the criteria Set
        vm.getStore('criteriasettype').load({callback:function() {
            var qualfrStore = vm.getStore('valuequalifiertypestore'),
                sk = vm.getStore('criteriasettype').findRecord('CrtriaSetTypeCode',"Coverage Set", 0, false, false, true).data.CrtriaSetTypeSK;
            qualfrStore.getProxy().setExtraParams({'criteriaSetType' : sk});
            me.getViewModel().set('criteriaSetType',sk);
            qualfrStore.load(function(){
                me.connectGrids();
            });
        }});
        //Load all CriteriaConditionType to use
        vm.getStore('criteriaconditiontypestore').load(function(){
            me.connectGrids();
        });
    },
    connectGrids: function(){
        this.storeloadcount++;
        if(this.storeloadcount == 6) {
            Ext.getBody().unmask();
        }
        },
    CoverageSetConfigurationStoreUpdated: function(){
        var vm = this.getViewModel(),
        coveragesetAllStore = vm.getStore('coveragesetsallstore');
        coveragesetAllStore.getProxy().setExtraParams({'bnftPlanSK': vm.get('cmbBenefitPlanSK')});
        Ext.getBody().mask('loading');
        coveragesetAllStore.reload(function(){
            Ext.getBody().unmask();
        });
    },
    //on change of coverage set dropdown
    onCoverageSetSelectionChange:function(combo, record){
        var me = this,
            vm = me.getViewModel();
        if(record != null) {
            this.getViewModel().set("isCoverageSetCmbselected", true);
            var mainStore = vm.getStore('coveragesetconfigstore');
            Ext.getBody().mask('loading');
            mainStore.getProxy().setExtraParams({'cvrgSetSK': record});
            mainStore.load({
                scope: this,
                callback: function(recordMain) {
                    if (recordMain && recordMain.length == 1) {
                        me.setAmount(recordMain[0].data.CopaymentFreqQulfrTypeSK);
                        me.lookup('coverageSetConfigFormRef').loadRecord(recordMain[0]);
                        me.lookup('CvrgSetNameRef').setValue(recordMain[0].data.coverageSet.CvrgSetName);
                        me.lookup('ruleSetsGridRef').reconfigure(recordMain[0].RuleSets());
                        me.lookup('thresholdGridRef').reconfigure(recordMain[0].Thresholds());
                        me.lookup('thresholdGridRef').getSelectionModel().select(0);
                        var formField = me.lookup('coverageSetConfigFormRef').getForm().getFields();
                        for(var i = 0;i<formField.items.length;i++){
                            formField.items[i].originalValue = formField.items[i].value;
                        }
                        this.getViewModel().set('changed',false);
                    }
                    Ext.getBody().unmask();
                }
            });
            vm.set('cvrgSetSK', record);
            if(vm.get("copying"))
            {
                me.lookup('lblModeStatus').setText("Copying...");
            }
            else {
                if(vm.get("creatingnew"))
                {
                    me.lookup('lblModeStatus').setText("Creating New...");
                }
                else
                {
                    me.lookup('lblModeStatus').setText("Editing...");
                }
            }
        }
        else
        {
         me.resetAll();
        }
    },
    setAmount: function(valToCompare){
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('frequencyqualifiertypestore');
        vm.set('showCopayEA', false);
        vm.set('showCoinsEA', false);
        vm.set('showDedEA', false);
        if(store.findRecord('FreqQulfrDesc',"Copayment Episode", 0, false, false, true).data.FreqQulfrTypeSK == valToCompare)
        {
            vm.set('showCopayEA', true);
        }
        else if(store.findRecord('FreqQulfrDesc',"Coinsurance Episode", 0, false, false, true).data.FreqQulfrTypeSK == valToCompare)
        {
            vm.set('showCoinsEA', true);
        }
        else if(store.findRecord('FreqQulfrDesc',"Deductible Episode", 0, false, false, true).data.FreqQulfrTypeSK == valToCompare)
        {
            vm.set('showDedEA', true);
        }
    },
    onItemChanged: function(field, value) {
        if(!this.saveCheckFlag) {
            this.getViewModel().set('changed', this.lookup('coverageSetConfigFormRef').isDirty());
        }else{
            this.saveCheckFlag = false;
        }
        this.getViewModel().set('validform', this.lookup('coverageSetConfigFormRef').isValid() && (this.lookup('thresholdGridRef').getSelection().length == 0 || this.lookup('thresholdFormRef').isValid()));
        if(field.name == 'CopaymentFreqQulfrTypeSK'){
            this.setAmount(value);
        }
    },
    onItemEnabled: function() {
        this.getViewModel().set('validform', this.lookup('coverageSetConfigFormRef').isValid() && (this.lookup('thresholdGridRef').getSelection().length == 0 || this.lookup('thresholdFormRef').isValid()));
    },
    onRulesetGridSelectionChange: function(model, selected) {
        if(selected.length >0 ) {
            this.lookup('ruleDetailsGridRef').reconfigure(selected[0].CriteriaDetails());
        }
    },
    onruleSetsGridItemCancelEdit: function(editor, context) {
        if (this.addedRow) {
            context.grid.getStore().remove(context.grid.getStore().getAt(0));
            this.addedRow = false;
        }
        this.getViewModel().set("ruleSetsGridValid", true);
        this.getViewModel().set('changed', this.checkGridDirty());
    },
    onruleSetsGridItemComplete: function(){
        var vm =  this.getViewModel();
        vm.set("ruleSetsGridValid", true);
        vm.set('changedforms', true);
        vm.set('changed',this.checkGridDirty());
        this.addedRow = false;
    },
    onruleSetsGridItemStartEdit: function(){
        this.getViewModel().set("ruleSetsGridValid", false);
    },
    getHighestStoreValue: function(store,fieldname)
    {
        var highestvalue = 0;
        store.each(function(record){
            var recData = record.data[fieldname];
            if(parseInt(recData) != 'NaN' && parseInt(recData) > highestvalue)
            {
                highestvalue = recData;
            }
        });
        return highestvalue;
    },

    onAddRuleSet: function(){
        var grid=this.lookup('ruleSetsGridRef'),
            vm = this.getViewModel(),
            store = grid.getStore();
        var coverageSetSK = this.lookup('CvrgSetNameCmbRef').getSelection() ? this.lookup('CvrgSetNameCmbRef').getSelection().data.CvrgSetSK : 0;
        var newRecord = new Atlas.benefitplan.model.RuleSets({
            CurrentUser :vm.get('user').un,
            CrtriaSetPrity: this.getHighestStoreValue(store, 'CrtriaSetPrity') + 1,
            BnftCrtriaSetSK: null,
            BnftSK:null,
            CriteriaDetails : [],
            Deleted: false,
            CriteriaSetName: 'New Rule',
            CrtriaSetTypeSK: vm.get('criteriaSetType'),
            CrtriaSetSK :0,
            CvrgSetCrtriaSetSK:0,
            CvrgSetSK:coverageSetSK
        });
        store.insert(0, newRecord);
        grid.findPlugin('rowediting').startEdit(newRecord, 0);
        this.addedRow = true;
        vm.set("ruleSetsGridValid", false);
},
    onRemoveRuleSet: function(){
        var me = this,
            grid = me.lookup('ruleSetsGridRef'),
            selected = grid.getSelectionModel();
        if (selected.hasSelection())
        {
            var selection = selected.getSelection()[0];
            if (selection) {
                grid.getStore().remove(selection);
                me.getViewModel().set("changedforms", true);
                me.lookup('ruleDetailsGridRef').setStore(Ext.data.StoreManager.getByKey('ext-empty-store'));
            }
        }
        this.getViewModel().set("ruleSetsGridValid", true);
        this.getViewModel().set('changed',this.checkGridDirty());
    },
    showMessage: function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            buttons: Ext.Msg.OK,
            closable: false,
            draggable: false,
            resizable: false
        });
    },
    onRuleSetGridValidateEdit: function(editor, context){
        var me = this,
            result = true,
            store = this.lookup('ruleSetsGridRef').getStore().removed;
        for (var j = store.length-1 ; j > -1 ; j--) {
            if(store[j].get("CrtriaSetPrity") == context.newValues.CrtriaSetPrity) {
                me.showMessage('Error Information', 'Duplicate Priority found in deleted but unsaved data! Please change or save changes before attempting to make this change.');
                return false;
            }
        }
        for (var j = store.length-1 ; j > -1 ; j--) {
            if(store[j].get("CriteriaSetName") == context.newValues.CriteriaSetName) {
                me.showMessage('Error Information', 'Duplicate Rule Set Name in deleted but unsaved data! Please change or save changes before attempting to make this change.');
                result =  false;
            }
        }
        store = this.lookup('ruleSetsGridRef').getStore();
        store.each(function (row) {
            if (row != context.record) {
                if (row.data.CrtriaSetPrity == context.newValues.CrtriaSetPrity) {
                    me.showMessage('Error Information', 'Duplicate Priority! Please change  before attempting to make this change.');
                    result = false;
                } else if (row.dirty && typeof row.modified.CrtriaSetPrity != 'undefined' && row.modified.CrtriaSetPrity == context.newValues.CrtriaSetPrity) {
                    me.showMessage('Error Information', 'Duplicate Priority found in unsaved changes! Please change or save changes before attempting to make this change.');
                    result = false;
                } else if(row.data.CriteriaSetName == context.newValues.CriteriaSetName) {
                    me.showMessage('Error Information', 'Duplicate RuleSet Name! Please change before attempting to make this change.');
                    result = false;
                } else if (row.dirty && typeof row.modified.CriteriaSetName != 'undefined' && row.modified.CriteriaSetName == context.newValues.CriteriaSetName) {
                    me.showMessage('Error Information', 'Duplicate RuleSet Name found in unsaved changes! Please change or save changes before attempting to make this change.');
                    result = false;
                }
            }
            return result;
        });
        return result;
    },
    onruleDetailsGridItemCancelEdit: function( editor, context) {
        if (this.addedDetailRow) {
            context.grid.getStore().remove(context.grid.getStore().getAt(0));
            this.addedDetailRow = false;
        }
        this.getViewModel().set("ruleDetailsGridValid", true);
        this.getViewModel().set('changed',this.checkGridDirty());
    },
    onruleDetailsGridItemComplete: function(){
        var vm = this.getViewModel();
       vm.set("ruleDetailsGridValid", true);
        vm.set('changedforms', true);
        vm.set('changed',this.checkGridDirty());
        this.addedDetailRow = false;
    },
    ontruleDetailsGridItemStartEdit: function(){
        this.getViewModel().set("ruleDetailsGridValid", false);
    },
    onAddRuleSetDetail: function(){
        var me=this,
            grid=  me.lookup('ruleDetailsGridRef'),
        coverageSetSK = me.lookup('CvrgSetNameCmbRef').getSelection() ? me.lookup('CvrgSetNameCmbRef').getSelection().data.CvrgSetSK : 0,
        store = grid.getStore(),
        parentRow = me.lookup('ruleSetsGridRef').getSelectionModel().getSelection()[0],
        newRecord = new Atlas.benefitplan.model.CriteriaDetails({
            CurrentUser: me.getViewModel().get('user').un,
            "CrtriaSetSK": parentRow.CrtriaSetSK ,
            "CrtriaDtlSK": 0,
            CrtriaSetTypeSK: 3,
            "CrtriaPrity" : me.getHighestStoreValue(store,'CrtriaPrity') +1,
            CvrgSetSK:coverageSetSK
        });
        store.insert(0, newRecord);
        grid.findPlugin('rowediting').startEdit(newRecord, 0);
        this.addedDetailRow = true;
    },
    onRemoveRuleSetDetail: function(){
        var grid = this.lookup('ruleDetailsGridRef');
        grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);
        this.getViewModel().set("ruleDetailsGridValid", true);
        this.getViewModel().set('changed',this.checkGridDirty());
    },
    onThresholdGridSelectionChange: function(model, selected) {
        if(selected.length >0 ) {
            this.lookup('thresholdFormRef').loadRecord(selected[0]);
        }
    },
    onthresholdGridItemCancelEdit: function(editor, context) {
        //if this was an added row, remove it
          if (this.addedThresholdRow) {
            context.grid.getStore().remove(context.grid.getStore().getAt(0));
            this.addedThresholdRow = false;
        }
            this.getViewModel().set("thresholdGridValid", true);
        this.getViewModel().set('changed',this.checkgriddirty());
    },
    onthresholdGridItemComplete: function(){
        this.addedThresholdRow = false;
        this.getViewModel().set("thresholdGridValid", true);
        this.getViewModel().set('changed', this.checkGridDirty());
    },
    onthresholdGridItemStartEdit: function(){
        this.getViewModel().set("thresholdGridValid", false);
    },
    onthresholdGridDeSelect: function(){
    //Save the record into store
        this.lookup('thresholdFormRef').updateRecord();
    },
    checkifRecAlreadyAdded: function(selRecord){
        var matchFound=false;
        this.lookup('thresholdGridRef').getStore().each(function(rec){
            if(rec.data.ThresholdSK == selRecord.data.ThresholdSK && rec.data.BenefitThresholdName == selRecord.data.BenefitThresholdName)
            {
                matchFound=true;
            }
        });
        return matchFound;
    },
    onAddSelectedThresholdToGrid: function(){
        var me = this,
            selRecord =  me.lookup('thresholdsListref').getStore().findRecord('ThresholdSK', me.lookup('thresholdsListref').getSelection().data.ThresholdSK, 0, false, false, true);
        if(selRecord) {
            var checkRecAlreadyAdded =  me.checkifRecAlreadyAdded(selRecord);
            if(!checkRecAlreadyAdded) {
                var newRecord = new Atlas.benefitplan.model.ThresholdConfiguration({
                    ThresholdSK: selRecord.data.ThresholdSK,
                    CvrgSetThresholdSK: 0,
                    CoinsuranceEpisodeAmt: selRecord.data.CoinsuranceEpisodeAmt,
                    CopaymentEpisodeAmt: selRecord.data.CopaymentEpisodeAmt,
                    DeducblAmt: selRecord.data.DeducblAmt,
                    BenefitThresholdName: selRecord.data.BenefitThresholdName,
                    ThresholdQulfrTypeSK: selRecord.data.ThresholdQulfrTypeSK,
                    ThresholdLimit: selRecord.data.ThresholdLimit,
                    RestartThresholdCalendarYear: selRecord.data.RestartThresholdCalendarYear,
                    RestartThresholdPlanYear: selRecord.data.RestartThresholdPlanYear,
                    ThresholdRestartDaysAfterLastService: selRecord.data.ThresholdRestartDaysAfterLastService,
                    ThresholdRestartMonthsAfterLastService : selRecord.data. ThresholdRestartMonthsAfterLastService,
                    ThresholdRestartDaysAfterMbrEnroll: selRecord.data.ThresholdRestartDaysAfterMbrEnroll,
                    ThresholdRestartMonthsAfterMbrEnroll: selRecord.data.ThresholdRestartMonthsAfterMbrEnroll,
                    ThresholdRestartAtBegOfMonthNbr: selRecord.data.ThresholdRestartAtBegOfMonthNbr,
                    ApplyToBenefitThreshold: selRecord.data.ApplyToBenefitThreshold,
                    LimitByBenefitThreshold: selRecord.data.LimitByBenefitThreshold,
                    CurrentUser: me.getViewModel().get('user').un
                });
                var grid = this.lookup('thresholdGridRef');
                grid.getStore().insert(0, newRecord);
                grid.getSelectionModel().select(0);
                me.addedThresholdRow = true;
                me.getViewModel().set("thresholdGridValid", true);
            }
            else{
                me.showMessage('Error', 'Selected Threshold Already Added.');
            }
        }
    },
    onAddThreshold: function(){
        var grid = this.lookup('thresholdGridRef'),
            newRecord = new Atlas.benefitplan.model.ThresholdConfiguration({
            CurrentUser: this.getViewModel().get('user').un,
            BenefitThresholdName: 'New Threshold'
        });
        grid.getStore().insert(0, newRecord);
        grid.getSelectionModel().select(0);
        this.addedThresholdRow = true;
        this.getViewModel().set("thresholdGridValid", true);
    },
    onRemoveThreshold: function(){
        var grid = this.lookup('thresholdGridRef');
        grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);
        this.getViewModel().set("thresholdGridValid", true);
        this.getViewModel().set('changed',this.checkGridDirty());
    },
    afterThresholdNameChanged: function() {
        this.lookup('thresholdFormRef').updateRecord();
    },
    isThresholdQualiferSKMissing: function(Thresholds){
        Thresholds.data.sort();
        for (var i = 1; i < Thresholds.data.length; i++ ) {
          if(Thresholds.data.items[i].data.ThresholdQulfrTypeSK == 0)
          {
              return true;
          }
        }
        return false;
    },
    onCoverageConfigCreateNew: function(){
        var me = this,
            vm = me.getViewModel();
        me.lookup('lblModeStatus').setText("Creating New...");
        vm.set("creatingnew", true);
        var newRecord = new Atlas.benefitplan.model.CoverageSetConfiguration({
            CvrgSetSK: 0,
            CoinsuranceCalculatedBeforeCopayIsApplied: false,
            CoinsurancePct: '',
            CopayAfterDeductibleAmtIsMet: '',
            CoinsuranceEpisodeAmt:'',
            CopaymentEpisodeAmt:'',
            DeducblAmt:'',
            CopayBeforeDeductibleAmtIsMet: '',
            CopayCountsTowardsDeductable: false,
            CopayCountsTowardsNetworkLevelDeductible: false,
            CopayFrequencyValue: '',
            CopaymentFreqQulfrTypeSK: '',
            CountMemberRespTowardsMOOP: false,
            CountMemberRespTowardsPlanLevelDeductible: false,
            PymtPrflDtlSK: '',
            PymtPrflSK: '',
            DeducblEpsdSK: ',',
            CurrentUser: vm.get('user').un,
            RuleSets: [{
                CriteriaDetails: []
            }],
            Thresholds: [],
            coverageSet: {
                CvrgSetSK: 0,
                CvrgSetName: '',
                BnftPlanSK: vm.get('cmbBenefitPlanSK'),
                CurrentUser: vm.get('user').un
            }
        });
        var cvrgSetNameCombo = me.lookup('CvrgSetNameCmbRef');
        cvrgSetNameCombo.suspendEvents();
        cvrgSetNameCombo.setValue('');
        cvrgSetNameCombo.resumeEvents(false);
        vm.set("isCoverageSetCmbselected", false);
        var configStore = vm.getStore('coveragesetconfigstore');
        if(configStore.data && configStore.data.length) {
            configStore.remove(0);
        }
        vm.getStore('coveragesetconfigstore').insert(0,newRecord);
        me.lookup('coverageSetConfigFormRef').loadRecord(newRecord);
        me.lookup('CvrgSetNameRef').setValue(newRecord.data.coverageSet.CvrgSetName);
        me.lookup('ruleSetsGridRef').reconfigure(newRecord.RuleSets());
        me.lookup('thresholdGridRef').reconfigure(newRecord.Thresholds());
        var rec = me.lookup('CopayFreqQaulfrRef').getStore().findRecord('FreqQulfrDesc','Visit', 0, false, false, true);
        if(rec !=null && rec.data)
        {
            me.lookup('CopayFreqQaulfrRef').setValue(rec.data.FreqQulfrTypeSK);
        }
    },
    onCoverageConfigSaveAs: function(){
        var me=this,
            vm = me.getViewModel(),
            newRec = me.lookup('coverageSetConfigFormRef').getRecord();
        vm.set("copying", true);
        this.lookup('lblModeStatus').setText("Copying...");
        newRec.data.PymtPrflDtlSK=0;
        newRec.data.PymtPrflSK=0;
        newRec.data.DeducblEpsdSK = 0;
        if(newRec.RuleSets().data.length >0) {
            newRec.RuleSets().data.each(function(ruleSetItem){
                ruleSetItem.data.CurrentUser = vm.get('user').un;
                ruleSetItem.data.Deleted = false;
                ruleSetItem.data.BnftCrtriaSetSK = 0;
                ruleSetItem.data.CrtriaSetSK = 0;
                ruleSetItem.data.CvrgSetSK = 0;
                ruleSetItem.data.CvrgSetCrtriaSetSK = 0;
                if(ruleSetItem.CriteriaDetails().data.length >0) {
                    ruleSetItem.CriteriaDetails().data.each(function(ruleDetailItem)  {
                        ruleDetailItem.data.CurrentUser = vm.get('user').un;
                        ruleDetailItem.data.CrtriaDtlSK = 0;
                        ruleDetailItem.data.CrtriaSetSK = 0;
                    });
                }
            });
        }
        if(newRec.Thresholds().data.length > 0) {
            newRec.Thresholds().data.each(function(thresholdItem) {
                thresholdItem.data.CvrgSetThresholdSK = 0;
                thresholdItem.data.CurrentUser = vm.get('user').un;
                thresholdItem.data.Deleted = false;
            });
        }
        newRec.CvrgSetSK=0;
        newRec.data.coverageSet.CvrgSetSK=0;
        newRec.data.coverageSet.CvrgSetName=me.lookup('CvrgSetNameRef').value;
        newRec.data.coverageSet.CurrentUser= vm.get('user').un;
        me.lookup('coverageSetConfigFormRef').loadRecord(newRec);
        me.showMessage('Info', 'CoverageSetConfig has been copied over. Please change CoverageSet name and Save.');
    },
    buildErrorString: function (results) {
        var errormessagestring = "";
        if (results.operations.length > 0) {
            Ext.Array.each(results.operations, function(operation) {
                Ext.Array.each(JSON.parse(operation.getResponse().responseText).messages[0], function(name) {
                    if (errormessagestring.length > 0) {
                        errormessagestring += '<br>'
                    }
                    errormessagestring += name.message;
                });
            });
        }
        return errormessagestring;
    },
    onCoverageConfigSave: function(){
        var me = this,
            vm = me.getViewModel(),
            checkUniqCoverageName=true,
            validThreshold = true,
            currentUser = vm.get('user').un;
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    if (vm.get('changed') || vm.get('changedforms') ) {
                        var record = me.lookup('coverageSetConfigFormRef').getRecord();
                        me.lookup('coverageSetConfigFormRef').updateRecord(record);
                        record.set("CurrentUser", currentUser);
                        var store = record.RuleSets();
                        store.data.each(function(item) {
                            item.set("CurrentUser", currentUser);
                            item.set("$id", null);
                            var detailstore = item.CriteriaDetails();
                            detailstore.data.each(function(detailitem) {
                                detailitem.set("CurrentUser", currentUser);
                            });
                            var detailrows = detailstore.removed;
                            for (var j = detailrows.length-1 ; j > -1 ; j--) {
                                detailrows[j].set("Deleted", true);
                                detailrows[j].set("CurrentUser", currentUser);
                                detailstore.insert(0, detailrows[j]);
                            }
                        });
                        var rows = store.removed;
                        for (var i = rows.length-1 ; i > -1 ; i--) {
                            rows[i].set("CurrentUser", currentUser);
                            rows[i].set("Deleted", true);
                            var detailstore = rows[i].CriteriaDetails();
                            detailstore.data.each(function(detailitem) {
                                detailitem.set("CurrentUser", currentUser);
                            });
                            var detailrows = detailstore.removed;
                            for (var j = detailrows.length-1 ; j > -1 ; j--) {
                                detailrows[j].set("Deleted", true);
                                detailrows[j].set("CurrentUser", currentUser);
                                detailstore.insert(0, detailrows[j]);
                            }
                            store.insert(0, rows[i]);
                        }
                        var thresholdStore = record.Thresholds();
                        var trows=thresholdStore.removed;
                        for (var i = trows.length-1 ; i > -1 ; i--) {
                            trows[i].set("CurrentUser", currentUser);
                            trows[i].set("Deleted", true);
                            thresholdStore.insert(0, trows[i]);
                        }
                        if (record.Thresholds().data.length > 0) {
                            me.lookup('thresholdFormRef').updateRecord();
                            record.Thresholds().data.each(function(thresholdItem) {
                                thresholdItem.set("CurrentUser", currentUser);
                            });
                            if (me.isThresholdQualiferSKMissing(record.Thresholds())) {
                                validThreshold = false;
                                me.showMessage('Error', 'Please Fix Threshold Name and Qualifier.');
                            }
                            if (!me.checkUniqThresholdName(record.Thresholds())) {
                                validThreshold = false;
                                me.showMessage('Error', 'Duplicate Threshold Name is not allowed');
                            }
                        }
                        if (validThreshold) {
                            //check if coveragesetsk is cmg proper for new and editing
                            record.set("CurrentUser", currentUser);
                            record.data.coverageSet.CvrgSetName = me.lookup('CvrgSetNameRef').value;
                            record.data.coverageSet.CurrentUser = currentUser;
                            //Check if coverageset Name is unique
                            checkUniqCoverageName = me.checkUniqCoverageName(record.data.coverageSet);
                            if (checkUniqCoverageName) {
                                var coverStore=  vm.getStore('coveragesetconfigstore');
                                if(coverStore.getNewRecords() || coverStore.getUpdatedRecords() || coverStore.getRemovedRecords()){
                                    Ext.getBody().mask('Saving');
                                }
                                coverStore.sync({
                                    success: function() {
                                        //TODO see if same threshold error is returning from backend
                                        me.showMessage('Success', 'Data saved successfully');
                                        me.lookup('lblModeStatus').setText("");
                                        me.LoadAllDropdowns();
                                        me.resetAll();
                                    },
                                    failure: function(results) {
                                        me.showMessage('Failed to Save', 'Data failed to save:<BR>' + me.buildErrorString(results));
                                    },
                                    callback:function(){
                                        Ext.getBody().unmask();
                                        me.saveCheckFlag = true;
                                        me.getViewModel().set('changed',false);
                                    }
                                });
                            }
                            else {
                                Ext.getBody().unmask();
                                me.showMessage('Error', 'Duplicate Coverage Set Name is not allowed');
                            }
                        }
                        me.getViewModel().set('changed',false);
                    }
                }
            }
        });
    },
    checkGridDirty:function(){
        var phantomRowsExist = false, value = false;
        this.getView().query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.dirty) {
                    var keys = Object.keys(record.modified);
                    if(keys.length == 1 && keys[0] == 'CurrentUser')
                        phantomRowsExist = false;
                    else
                        phantomRowsExist = true;
                }
            });
            if(gridStore.removed.length != 0){
                phantomRowsExist = true;
            }
        });
        return phantomRowsExist;
    },
    onCoverageConfigCancel: function(){
        this.lookup('lblModeStatus').setText("");
        var me=this,
            vm=me.getViewModel();
        if(vm.get('changed') || vm.get('changedforms')) {
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to cancel and lose your changes?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function () {
                    me.resetAll();
                    vm.set("copying", false);
                    vm.set("creatingnew", false);
                    vm.set("isCoverageSetCmbselected", false);
                }
            });
        }
        else
        {
            me.resetAll();
            vm.set("copying", false);
            vm.set("creatingnew", false);
            vm.set("isCoverageSetCmbselected", false);
        }
    },
    resetAll:function(){
        var me = this,
            vm = me.getViewModel();
        me.lookup('CvrgSetNameRef').setValue('');
        var newRecord = new Atlas.benefitplan.model.CoverageSetConfiguration({
            CvrgSetSK: 0,
            CoinsuranceCalculatedBeforeCopayIsApplied: false,
            CoinsurancePct: '',
            CoinsuranceEpisodeAmt:'',
            CopaymentEpisodeAmt:'',
            DeducblAmt:'',
            CopayAfterDeductibleAmtIsMet: '',
            CopayBeforeDeductibleAmtIsMet: '',
            CopayCountsTowardsDeductable: false,
            CopayCountsTowardsNetworkLevelDeductible: false,
            CopayFrequencyValue: '',
            CopaymentFreqQulfrTypeSK: '',
            CountMemberRespTowardsMOOP: false,
            CountMemberRespTowardsPlanLevelDeductible: false,
            PymtPrflDtlSK: '',
            PymtPrflSK: '',
            DeducblEpsdSK:'',
            CurrentUser: vm.get('user').un,
            RuleSets: [{
                CriteriaDetails: []
            }],
            Thresholds:[],
            coverageSet: {
                CvrgSetSK: 0,
                CvrgSetName: '',
                BnftPlanSK: vm.get('cmbBenefitPlanSK'),
                CurrentUser: vm.get('user').un
            } });
        var newThresholdRecord = new Atlas.benefitplan.model.ThresholdConfiguration({
            CurrentUser: vm.get('user').un,
            CvrgSetThresholdSK:0,
            BenefitThresholdName:'',
            ThresholdQulfrTypeSK:0,ThresholdLimit:'',
            RestartThresholdCalendarYear:'',
            RestartThresholdPlanYear:'',
            ThresholdRestartDaysAfterLastService:'',
            ThresholdRestartDaysAfterMbrEnroll:'',
            ThresholdRestartMonthsAfterMbrEnroll:'',
            ThresholdRestartAtBegOfMonthNbr:'',
            ApplyToBenefitThreshold:false,
            LimitByBenefitThreshold:false});
        me.lookup('coverageSetConfigFormRef').loadRecord(newRecord);
        me.lookup('thresholdFormRef').loadRecord(newThresholdRecord);
        var cvrgSetNameCombo = me.lookup('CvrgSetNameCmbRef');
        cvrgSetNameCombo.suspendEvents();
        cvrgSetNameCombo.setValue('');
        cvrgSetNameCombo.resumeEvents(false);
        me.lookup('ruleSetsGridRef').reconfigure(newRecord.RuleSets());
        me.lookup('ruleDetailsGridRef').setStore(Ext.data.StoreManager.getByKey('ext-empty-store'));
        me.lookup('thresholdGridRef').reconfigure(newRecord.Thresholds());
        me.lookup('thresholdGridRef').getSelectionModel().select(0);
        vm.set("copying", false);
        vm.set("creatingnew", false);
        vm.set("isCoverageSetCmbselected", false);
        vm.set("changedforms", false);
        me.lookup('lblModeStatus').setText("");
        me.lookup('thresholdsListref').setValue('');
        vm.set('changed',false);
    },
    getEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
        //var column = gridView.getGridColumns()[col];
        var column = gridView.headerCt.getGridColumns()[col],
            combo =  column.getEditor(),
            comboStoreName = combo.initialConfig.bind.store,
            editorDisplayValue = '';
        //stores are sometimes specified with {}, these need to be removed for the getStore method to work
        comboStoreName = comboStoreName.replace('{','');
        comboStoreName = comboStoreName.replace('}','');
        try {
            editorDisplayValue = this.getViewModel().getStore(comboStoreName).findRecord(column.dataIndex, value, 0, false, false, true).get(combo.initialConfig.displayField)
        }
        catch(err){
            return value;
        }
        return editorDisplayValue;
    },
    checkUniqThresholdName: function(Thresholds) {
        Thresholds.data.sort();
        for ( var i = 1; i < Thresholds.data.length; i++ ){
            if(Thresholds.data.items[i-1].data.BenefitThresholdName.toLowerCase() == Thresholds.data.items[i].data.BenefitThresholdName.toLowerCase())
                return false;
        }
        return true;
    },
    checkUniqCoverageName: function(coverageSet){
        var newname = coverageSet.CvrgSetName.toLowerCase(),
            arraytosearch=this.getViewModel().get('coveragesetsallstore').data.items;
        if(coverageSet.CvrgSetSK == 0)
        {
            for (var i = 0; i < arraytosearch.length; i++) {
                if (arraytosearch[i].data['CvrgSetName'].toLowerCase() == newname) {
                    me.showMessage('Error', 'Duplicate Coverage Set Name is not allowed');
                    return false;
                }
            }
        }
        else
        {
            for (var i = 0; i < arraytosearch.length; i++) {
                if (arraytosearch[i].data['CvrgSetName'].toLowerCase() == newname && arraytosearch[i].data['CvrgSetSK'] != coverageSet.CvrgSetSK) {
                    me.showMessage('Error', 'Duplicate Coverage Set Name is not allowed');
                    return false;
                }
            }
        }
        return true;
    }
});