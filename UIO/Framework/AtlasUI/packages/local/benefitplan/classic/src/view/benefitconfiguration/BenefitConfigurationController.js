/**
 * Created by n6570 on 11/14/2016.
 */
/**
 * @Class : 'Atlas.benefitplan.view.beneficonfiguration.BenefitConfigurationController'
 * This Class is the View Controller for the Coverage Set Configuration Module
 * @author : n6570
 * @Date : '11-14-2016'
 */
Ext.define('Atlas.benefitplan.view.benefitconfiguration.BenefitConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BenefitConfigurationController',
    /**
     * Init of the Controller
     */
    init: function() {
        this.loadInitialParams();
    },
    /**
     * Load initial Param necessary for the page
     */
    loadInitialParams : function(){
        var vm = this.getViewModel(),
            view = this.getView();
        vm.set('bnftPlanSK', view.cmbBenefitPlanSK);
        vm.set('benefitType', view.cmbBenefitType);
        vm.set('LOBName', view.LOBName);
        vm.set('cvrgSetSK', 0);  //Need not be loaded on start
        vm.set('planBnftSKArr',[]);
    },
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                onCloseBenefitPlanDetailConfiguration : 'onCloseBenefitPlanDetailConfiguration',
                benefitPlanHasUnsavedRecords: 'benefitPlanHasUnsavedRecords'
            }
        }
    },
    onCloseBenefitPlanDetailConfiguration: function(args) {
        if(this.getViewModel().get('viewclass') && this.getViewModel().get('viewclass').indexOf(args.viewclass) == -1) {
            this.getView().close();
        }
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
        if (phantomRowsExist||this.getViewModel().get('changed')){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id){
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
        var phantomRowsExist= false,
            me = this,
            panel = me.getView();
        panel.query('grid').forEach(function logArrayElements(element){
            element.store.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().get('changed')){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id){
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
    beforeInit: function() {
        var vm = this.getViewModel(),
            view = this.getView();
        vm.set('cmbBenefitPlanSK', view.cmbBenefitPlanSK);
        vm.set('cmbBenefitType', view.cmbBenefitType);
        vm.set('viewclass', view.$className);
        vm.set('viewnumber',4);
    },
    /**
     * Action to be done after page is rendered
     */
    afterPageRendered : function(){
        var vm = this.getViewModel(),
            benefitPlanId = vm.get('bnftPlanSK'),
            benefitListStore = vm.getStore('benefitcoveragesetdetails'),
            coverageSetAllStore = vm.getStore('coverageSetAllStore'),
            netWorkTiersInBenefitPlanStore = vm.getStore('netWorkTiersInBenefitPlan'),
            thresholdTypeStore = vm.getStore('thresholdTypeStore'),
            benefitsstore = vm.getStore('existingbenefits');
        this.getMask(this.lookup('benContainerRef')).show();
        benefitListStore.getProxy().setExtraParams({'bnftPlanSK': benefitPlanId}) ;
        benefitListStore.load();
        //Load the Tier information related to a Benefit Plan
        netWorkTiersInBenefitPlanStore.getProxy().setExtraParams({'bnftPlanSK': benefitPlanId});
        netWorkTiersInBenefitPlanStore.load();
        //Load Coverageset related to Benefit Plan
        coverageSetAllStore.getProxy().setExtraParams({'bnftPlanSK': benefitPlanId});
        coverageSetAllStore.load();
        //Load Threshold Type related to Beknefit Plan
        thresholdTypeStore.getProxy().setExtraParams({'bnftPlanSK': benefitPlanId});
        thresholdTypeStore.load();
        //To load view Existing Benefits List
        benefitsstore.getProxy().setExtraParams({'bnftPlanSK': benefitPlanId});
        benefitsstore.load();
    },
    /**
     * To show the mask on loading benefits
     * TODO -Should be a better way
     * @param tgt
     * @returns {Ext.LoadMask}
     */
    getMask : function(tgt){
        if(this.benMask) {
            return this.benMask;
        } else {
            this.benMask = new Ext.LoadMask({
                msg: 'Loading Benefits.. Please wait.',
                target: tgt
            });
            return this.benMask;
        }
    },
    /**
     * To get the Tiers available for a particular plan
     * Called on 'netWorkTiersInBenefitPlan' store load
     * @param store
     * @param rec
     */
    onGetTiersInfo : function(store, rec){
        var Tiers =[];
        rec.forEach(function(obj){
            Tiers.push(obj.data);
        });
        this.getViewModel().set('planTiers', Tiers);
    },
    //****************************************Benefit Plans Block related ***************************/
    /**
     * Called after load of 'benefitcoveragesetdetails' store
     * @param store
     * @param records
     */
    onLoadCoverageSet : function(store, records){
        this.createBenefitsRow(records);
    },
    /**
     * Each Benefit row Component creation
     * @param benefitsData
     */
    createBenefitsRow : function(benefitsData){
        var vm = this.getViewModel(),
            planBnftSKArr = [],
            benefitListArr=[],
            benefitListContainer = this.lookup('benContainerRef');
        if(benefitsData && benefitsData.length >0) {
            for (var i = 0, bCnt = benefitsData.length; i < bCnt; i++) {
                var rowData = benefitsData[i].getData();
                benefitListArr.push(this.createBenefitCoverageRow(rowData));
                planBnftSKArr.push(rowData);
            }
            benefitListContainer.add(benefitListArr);
            vm.set('planBnftSKArr', planBnftSKArr);
        }
        this.getMask(benefitListContainer).hide();
    },
    /**
     * Create a Benefit Coverage Row
     * @param rowData
     * @returns {*|Ext.panel.Panel}
     */
    createBenefitCoverageRow : function(rowData){
        var benRowWrapper = this.createBenefitsRowWrapper(rowData),
            benDefinitionBox = this.createBenefitDefinitionBox(rowData),
            tierBoxes = this.createNetworkTiersForaRow(rowData);
        benRowWrapper.add([benDefinitionBox, tierBoxes]);
        return benRowWrapper;
    },
    /**
     * This Objects wraps each row of the Container
     * @param rowData
     * @returns {Ext.panel.Panel}
     */
    createBenefitsRowWrapper : function (rowData){
        return Ext.create('Ext.panel.Panel', {
            collapsible : true,
            collapsed : true,
            titleCollapse : true,
            animCollapse : false,
            BnftSK: rowData.BnftSK,
            BenefitName : rowData.BenefitName,
            title : {
                text : rowData.BenefitName,
                iconCls: 'x-fa fa-th',
                height : 20
            },
            layout: {
                type: 'hbox',
                pack : 'center'
            }
        });
    },
    /**
     * To Create the first Box in the Benefits List row
     * @param rowData
     * @returns {Ext.container.Container}
     */
    createBenefitDefinitionBox : function(rowData){
        return Ext.create('Ext.container.Container', {
            width : 200,
            minHeight : 200,
            layout: { type: 'vbox', align: 'center', pack : 'center'},
            defaults : { margin : 30, height : 30, width : 150 },
            items: [
                {
                    xtype: 'button',
                    BnftSK : rowData.BnftSK,
                    text : 'Benefit Definition',
                    handler:'onBenefitDefinitionClick'
                } ,
                {
                    xtype: 'button',
                    BnftSK : rowData.BnftSK,
                    text: 'Remove this Benefit',
                    handler : 'onBenefitRemove'
                }
            ]
        })
    },
    /**
     * Create a single block holding the Network Tier
     * @param rowData
     * @returns {Ext.container.Container}
     */
    createNetworkTiersForaRow : function(rowData){
        var tiersArr = rowData.Tiers,
            tiersObjArr =[],
            tiersWrapper = Ext.create('Ext.container.Container',{
                flex : 1,
                scrollable:true,
                layout: {type: 'hbox', align : 'stretch', pack: 'top'},
                defaults : { padding: 5, minHeight : 200 }
            });
        for(var i=0, tCnt = tiersArr.length; i< tCnt; i++){
            tiersObjArr.push(this.createTierItems(rowData, tiersArr[i]));
        }
        tiersWrapper.add(tiersObjArr);
        return tiersWrapper;
    },
    /**
     * Create the components required inside a Tier
     * @param rowData
     * @param tierData
     * @returns {Ext.panel.Panel}
     */
    createTierItems : function(rowData, tierData){
        return  Ext.create('Ext.panel.Panel', {
            flex: 1,
            minWidth: 240,
            title: tierData.Name,
            layout: { type: 'vbox',pack: 'stretch', align: 'center' },
            defaults: {  margin: 10,  labelWidth: 140,  width: 220,  minWidth: 220,  maxWidth: 300 },
            items: [
                {
                    xtype: 'numberfield',
                    hideTrigger: true,
                    fieldLabel: 'Benefit Level Deductible($)',
                    minValue : 0, maxValue : 99999,
                    BnftSK: rowData.BnftSK,
                    NtwrkTierSK : tierData.NtwrkTierSK,
                    value: tierData.DeductibleAmt,
                    listeners : {
                        change : 'onDedAmtChange'
                    }
                },
                {
                    xtype: 'tagfield',
                    fieldLabel: '  Add Coverage Sets',
                    labelAlign: 'top',
                    BnftSK: rowData.BnftSK,
                    NtwrkTierSK : tierData.NtwrkTierSK,
                    bind: {
                        store: '{coverageSetAllStore}'
                    },
                    value: this.getBenValues(tierData),
                    displayField : 'CvrgSetName',
                    valueField : 'CvrgSetSK',
                    createNewOnEnter: false,
                    createNewOnBlur: true,
                    filterPickList: false,
                    listeners : {
                        beforeselect:'onCoverageSetBeforeSelect',
                        select : 'onCoverageSetChange'
                    },
                    queryMode: 'remote',
                    publishes: 'text'
                }]
        });
    },
    /**
     * Filter the benefits on typing
     */
    onChangeFilterBenefits : function(){
        var srchKey = this.lookup('txtBenefitFilterRef').getValue();
        if(srchKey.length==0 || srchKey.length>2){
            this.onFilterBenefits();
        }
    },
    /**
     * Filter the Benefit List on click of search icon
     */
    onFilterBenefits : function(){
        var srchKey = this.lookup('txtBenefitFilterRef').getValue();
        if(srchKey.length >0 )srchKey = srchKey.toLowerCase();
        Ext.suspendLayouts();
        for(var i=0, bCnt = this.getViewModel().get('planBnftSKArr').length; i<bCnt; i++){
            var benRowItem = this.lookup('benContainerRef').items.items[i];
            benRowItem.setHidden(true);
            if( benRowItem.BenefitName.toLowerCase().includes(srchKey)){
                benRowItem.setHidden(false);
            }
        }
        Ext.resumeLayouts(true);
    },
    /**
     * On Change of Deductible amount in the Tier Box of Benefits
     * @param item
     */
    onDedAmtChange : function(item){
        var addedBenefits = this.getViewModel().get('planBnftSKArr');
        //Need to find another best way
        if(addedBenefits){
            addedBenefits.forEach(function(obj){
                if(obj.BnftSK == item.BnftSK ){
                    obj.Tiers.forEach(function(tier){
                        if(tier.NtwrkTierSK == item.NtwrkTierSK){
                            tier.DeductibleAmt = item.getValue();
                        }
                    });
                }
            });
        }
    },
    onCoverageSetBeforeSelect:function (combo, record){
      if(combo.value.indexOf(record.data.CvrgSetSK) >= 0){
          Ext.Msg.show({
              title :  record.data.CvrgSetName + " cannot be added.",
              message:"The selected coverage set already exists.",
              closable: false,
              draggable: false,
              resizable: false,
              buttons: Ext.Msg.OK,
              width : 400
          });
          return false;
      }
    },
    /**
     * On Change of Coverage Sets in the Tier Box of Benefits
     * @param item
     * @param record
     */
    onCoverageSetChange : function(item, record){
            var vm = this.getViewModel(),
            SelectedCoverageSetsObj =[],
            addedBenefits = vm.get('planBnftSKArr');
        for(var i=0, rCnt = record.length; i<rCnt; i++){
            SelectedCoverageSetsObj.push({
                BnftPlanBnftCvrgSetNtwrkTierSK :0,
                CvrgSetName :record[i].data.CvrgSetName,
                CvrgSetSK : record[i].data.CvrgSetSK,
                CvrgSetPrity :1,
                Deleted : false,
                CurrentUser : vm.get('user').un
            });
        }
        if(addedBenefits){
            //Need to find another best way
            addedBenefits.forEach(function(obj){
                if(obj.BnftSK == item.BnftSK){
                    obj.Tiers.forEach(function(tier){
                        if(tier.NtwrkTierSK == item.NtwrkTierSK){
                            tier.SelectedCoverageSets = SelectedCoverageSetsObj;
                        }
                    });
                }
            });
        }
    },
    /**
     * Get the Benefit Array for the coverage sets in Network Tiers
     * @param tierData
     * @returns {Array}
     */
    getBenValues : function(tierData){
        var benArr =  [],
            sel = tierData.SelectedCoverageSets;
        for(var i=0, sCnt = sel.length; i< sCnt; i++){
            benArr.push(sel[i].CvrgSetSK);
        }
        return benArr;
    },
    //*********************************View Benefit Popup Related *******************************************/

    /**
     * Export to Excel
     */
    onExportBenefitsClick: function(){
        this.lookup('existingBenefitsGrid').saveDocumentAs({
            type: 'xlsx',
            title:      'Existing Benefits Export',
            fileName:   'excelExport.xlsx'
        });
    },

    /**
     * View benefits
     */
    onViewBenefits: function(){
        this.getViewModel().getStore('existingbenefits').reload();
        this.lookup('existingBenefitsWindow').show();
    },
    /**
     * Cancel View Benefits
     */
    onCancelBenefitsClick: function(){
        this.lookup('existingBenefitsWindow').hide();
    },
    /**
     * On Add of New Benefit to the Configuration Set
     */
    onAddNewBenefit : function(){
        var vm = this.getViewModel(),
            benRef = this.lookup('cmbAddBenefitRef'),
            selectedBenefit = benRef.getValue(),
            addedBenefits = vm.get('planBnftSKArr'),
            benExists = false;
        if(!selectedBenefit){
            Ext.toast("Please select a benefit to add", "Benefit Not Added");
            return;
        }
        var emptyTiers = [];
        if(addedBenefits) {
            addedBenefits.forEach(function (obj) {
                if (obj.BnftSK === Number(selectedBenefit)) {
                    benExists = true;
                    return true;
                }
            });
            if(benExists){
                Ext.Msg.show({
                    title :  benRef.rawValue + " cannot be added.",
                    message:"The selected benefit already exists.",
                    closable: false,
                    draggable: false,
                    resizable: false,
                    buttons: Ext.Msg.OK,
                    width : 400
                });
                return
            }
            vm.get('planTiers').forEach(function(obj){
                emptyTiers.push({
                    Name : obj.NtwrkTierName,
                    CurrentUser : vm.get('user').un,
                    NtwrkTierSK : obj.NtwrkTierSK,
                    DeductibleAmt : 0,
                    SelectedCoverageSets : []
                });
            });
        }
        var newBenefit = {
            BenefitName : benRef.rawValue,
            BnftSK : benRef.getValue(),
            BnftPlanSK : vm.get('bnftPlanSK'),
            Tiers : emptyTiers,
            Deleted : false,
            CurrentUser : vm.get('user').un
        };
        this.onBenefitsSave([newBenefit]);
        addedBenefits.push(newBenefit);
        this.lookup('benContainerRef').add(this.createBenefitCoverageRow(newBenefit));
    },
    /**
     * On Remove of Benefit from the Configuration Set
     * @param btn
     */
    onBenefitRemove : function(btn){
        var vm = this.getViewModel(),
            currentRow=btn.up('panel'),
            toBeRemovedBenefit = {
                BenefitName : '',
                BnftSK : btn.BnftSK,
                BnftPlanSK : vm.get('bnftPlanSK'),
                Tiers : [],
                Deleted : true,
                CurrentUser : vm.get('user').un
            };
        currentRow.setCollapsed(true);
        this.onBenefitsSave([toBeRemovedBenefit]);
        //To remove deleted benefits from the the virtual benefits collection
        var addedBenefits = vm.get('planBnftSKArr');
        for(var i=0, bCnt = addedBenefits.length; i< bCnt; i++){
            if(addedBenefits[i].BnftSK === currentRow.BnftSK){
                addedBenefits.splice(i, 1);
                break;
            }
        }
        this.lookup('benContainerRef').remove(currentRow);
    },
    /**
     * On Save of Updates to every Benefits Items
     */
    onBenefitsSaveUpdate: function(){
        var addedBenefits = this.getViewModel().get('planBnftSKArr');
        for(var i=0, bCnt = addedBenefits.length; i<bCnt; i++){
            //TODO - Call only if benefits got changed
            this.onBenefitsSave([addedBenefits[i]]);
        }
    },
    /**
     * To Save the individual Benefits
     * @param payLoad
     */
    onBenefitsSave : function(payLoad){
        var vm = this.getViewModel(),
            currentUser = vm.get('user').un;
        payLoad[0].CurrentUser = currentUser;
        if(payLoad[0] && payLoad[0].Tiers) {
            payLoad[0].Tiers.forEach(function (tierObj) {
                tierObj.CurrentUser = currentUser;
                tierObj.SelectedCoverageSets.forEach(function (covObj) {
                    covObj.CurrentUser = currentUser;
                });
            });
        }
        Atlas.benefitplan.data.proxy.BenefitPlanAjax.request({
            url: Atlas.benefitplan.service.EnvironmentURLUtil.getEnvironmentBaseURL() +
            '/BenefitCoverageSetDetails',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'username': Atlas.user.un,
                'sessionid': Atlas.sessionId
            },
            jsonData: payLoad[0],
            success: function(request)
            {
                var res =  Ext.decode (request.responseText);
                if(res.success == true || res.Rows && res.Rows.length>0){
                    vm.set('changed', false);
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully',
                        buttons: Ext.Msg.OK,
                        closable: false,
                        draggable: false,
                        resizable: false
                    });
                }else {
                    var err = "";
                    res.messages.forEach(function(item){
                        err+='<br>-'+ item.message ;
                    });
                    Ext.Msg.show({
                        title: 'Failed to Save',
                        msg: 'Data failed to save: <br />' + err,
                        buttons: Ext.Msg.OK,
                        closable: false,
                        draggable: false,
                        resizable: false
                    });
                }
            },
            failure: function(request)
            {
                Ext.Msg.show({
                    title: 'Failed to Save',
                    msg: 'Data failed to save:',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });
            }
        });
    },
    onBenefitDefinitionClick: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            refs = me.getReferences(),
            benContainer =  this.lookupReference('benContainerRef'),
            currentRow=btn.up('panel');
        this.fireEvent('openView', 'merlin', 'benefitplan', 'benefitdefinition.Main',
            {
                menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                benefitSK:btn.BnftSK,
                cmbBenefitPlanSK: vm.get('bnftPlanSK'),
                cmbBenefitType:vm.get('benefitType'),
                LOBName: vm.get('LOBName')
            });
    },
    getEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
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
    }
});
