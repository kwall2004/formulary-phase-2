/**
 * Created by S4505 on 11/15/2016.
 */
Ext.define('Atlas.plan.view.group.RuleSetUpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-rulesetup',
    // listen: {
    //     controller: {
    //         '*': {
    //             reloadrules: 'onReloadrules',
    //             //reloadruleXdrugs: 'onReloadruleXDrugs'
    //         }
    //     }
    // },
    init: function () {

        //debugger;
        var me = this,
        // storeRules = this.getViewModel().get('rules'),
        // storeDrugs = this.getViewModel().get('drugs'),
            storeRuletypes = this.getViewModel().get('ruletypes'),
            storeDurtypes = this.getViewModel().get('durtypes'),
            storeDurcondition = this.getViewModel().get('durcondition'),
            storeRejectionCodes = this.getViewModel().get('rejectioncodes'),
            storeHedisMeasures = this.getViewModel().get('hedismeasures');

        // var planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord'),
        //     pPlanGroupId = 0;
        //
        //
        // if( planGroupRecord!=null )
        //     pPlanGroupId = planGroupRecord.data.planGroupId;


        var planGroupRecord = me.retrievePlanGroup(),
            pPlanGroupId = 0;
        if (planGroupRecord != null)
            pPlanGroupId = planGroupRecord.get('planGroupId');

       /* var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');
        /!*if (atlasRecord){
            this.getView().setDisabled(true);
        }else{
            this.getView().setDisabled(false);
        }*!/
        if(atlasRecord){
            this.lookupReference('planRulesGrid').setDisabled(true);
            this.lookupReference('planRuleDrugsGrid').setDisabled(true);
            return;
        }else{
            this.lookupReference('planRulesGrid').setDisabled(false);
            this.lookupReference('planRuleDrugsGrid').setDisabled(false);
        }
        */

        storeRuletypes.loadData([], false);
        storeRuletypes.load();
        storeDurtypes.load();
        storeDurcondition.load();
        storeRejectionCodes.load();
        storeHedisMeasures.load();

        var storeRules = this.getViewModel().get('rules');
        var storeDrugs = this.getViewModel().get('drugs');
        storeRules.loadData([], false);
        storeDrugs.loadData([], false);

        this.lookupReference('cmbPlanRuleType').setRawValue('');
        this.lookupReference('cmbPlanRuleType').setValue('');


        this.lookupReference('planRulesGrid').setTitle('Rules');
        this.lookupReference('planRuleDrugsGrid').setTitle('Rule Drugs');

        this.lookupReference('planRulesGrid').columns[4].setVisible(true); //'durType'
        this.lookupReference('planRulesGrid').columns[5].setVisible(true); //'durCondition'
        this.lookupReference('planRulesGrid').columns[6].setVisible(true);  //'allLevel'

        this.lookupReference('planRulesGrid').columns[2].setVisible(false); //'rejectionCodes'
        this.lookupReference('planRulesGrid').columns[3].setVisible(false);  //'monitorHours'

    },

    OnRuleTypeSelected: function (combo, record) {
        var me = this,
            storeRules = this.getViewModel().get('rules');

        if (record != null && record.data != null) {
            // var planGroupRecord = me.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord'),
            //     pPlanGroupId = 0;
            //
            //
            // if( planGroupRecord!=null )
            //     pPlanGroupId = planGroupRecord.data.planGroupId;

            var planGroupRecord = me.retrievePlanGroup(),
                pPlanGroupId = 0;

            if (planGroupRecord != null)
                pPlanGroupId = planGroupRecord.get('planGroupId');


            if (pPlanGroupId == '0' || pPlanGroupId == '' || record.data.value == '') {
                return;
            }

            else {
                this.lookupReference('btnPlanRuleAdd').setDisabled(false);
                if (record.data.value == "1") //DUR Rules
                {
                    this.lookupReference('planRulesGrid').setTitle('DUR Rules');
                    this.lookupReference('planRuleDrugsGrid').setTitle('DUR Rule Drugs');

                    this.lookupReference('planRulesGrid').columns[4].setVisible(true); //'durType'
                    this.lookupReference('planRulesGrid').columns[5].setVisible(true); //'durCondition'
                    this.lookupReference('planRulesGrid').columns[6].setVisible(true);  //'allLevel'

                    this.lookupReference('planRulesGrid').columns[2].setVisible(false); //'rejectionCodes'
                    this.lookupReference('planRulesGrid').columns[3].setVisible(false);  //'monitorHours'
                }
                else if (record.data.value == "2") //Intervention Rules
                {
                    this.lookupReference('planRulesGrid').setTitle('Intervention Rules');
                    this.lookupReference('planRuleDrugsGrid').setTitle('Intervention Rule Drugs');

                    this.lookupReference('planRulesGrid').columns[4].setVisible(false); //'durType'
                    this.lookupReference('planRulesGrid').columns[5].setVisible(false); //'durCondition'
                    this.lookupReference('planRulesGrid').columns[6].setVisible(false);  //'allLevel'

                    this.lookupReference('planRulesGrid').columns[2].setVisible(true); //'rejectionCodes'
                    this.lookupReference('planRulesGrid').columns[3].setVisible(true);  //'monitorHours'
                }


                storeRules.getProxy().setExtraParam('pPlanGroupId', pPlanGroupId);
                storeRules.getProxy().setExtraParam('pRuleType', record.data.value);

                storeRules.load({
                    callback: function (recordInfo, operation, success) {

                        if (recordInfo && recordInfo.length == 0) {
                            Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
                        }
                    }
                });

            }
        }
    },

    onRuleAdd: function () {

        this.showRule(null);
    },
    onRuleUpdate: function () {

        var record = this.getselectedRuleRecord();
        this.showRule(record);
    },

    onRuleDelete: function () {

        var me = this,
            record = this.getselectedRuleRecord();
        if (record == null) {
            Ext.Msg.show({
                title: 'PBM',
                message: 'No Selections Made. Rule cannot be deleted.',
                buttons: Ext.Msg.Ok,
                icon: Ext.Msg.INFO
            });
        }
        else {
            //Are you sure you would like to delete Rule
            Ext.Msg.show({
                title: 'Delete',
                message: 'Are you sure you would like to delete Drug Details: <b>' + record.data.planDURRuleName + '</b>' + ' ?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.saveRules(record, 'D');
                        Ext.MessageBox.alert('PBM', "Deleted Rule Details Successfully.", this.showResult, this);

                    }

                }
            });


        }


    },

    onRuleDrugsAdd: function () {

        this.showRuleDrugs(null);

    },

    onRuleDrugsUpdate: function () {

        var record = this.getSelectedRuleDrugRecord();
        this.showRuleDrugs(record);

    },

    onRuleDrugsDelete: function () {

        var me = this,
            record = this.getSelectedRuleDrugRecord();

        if (record == null) {
            Ext.Msg.show({
                title: 'PBM',
                message: 'No Selections Made. Drug Details cannot be deleted.',
                buttons: Ext.Msg.Ok,
                icon: Ext.Msg.INFO
            });
        }
        else {

            Ext.Msg.show({
                title: 'Delete',
                message: 'Are you sure you would like to delete Drug Details',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {

                        var ruleRecord = me.getselectedRuleRecord();
                        var ruleId = 0;

                        if (ruleRecord != null)
                            ruleId = ruleRecord.data.planDURRuleID;

                        me.saveRuleDrugs(record, 'D', ruleId)
                    }

                }
            });

        }


    },

    getselectedRuleRecord: function () {

        var grid = this.lookupReference('planRulesGrid').getView();
        if (grid) {
            return grid.getSelection()[0];
        }
    },

    getSelectedRuleDrugRecord: function () {

        var grid = this.lookupReference('planRuleDrugsGrid').getView();
        if (grid) {
            return grid.getSelection()[0];
        }
    },

    onRuleSelect: function (grid, record, index, eOpts) {
        var storeDrugs = this.getViewModel().get('drugs'),
        // btnUpdate =  this.lookupReference('btnPlanRuleUpdate'),
            btnDelete = this.lookupReference('btnPlanRuleDelete');

        /*if(btnUpdate!=null)
         btnUpdate.setDisabled(false);*/

        if (btnDelete != null)
            btnDelete.setDisabled(false);

        this.lookupReference('planDURRuleID').setRawValue(record.data.planDURRuleID);

        storeDrugs.getProxy().setExtraParam('pPlanDurRuleId', record.data.planDURRuleID);

        storeDrugs.load({
            callback: function () {
            }
        });
        this.lookupReference('btnPlanRuleDrugAdd').setDisabled(false);

    },

    onRuleDrugsSelect: function (grid, record, index, eOpts) {

        // var btnUpdate =  this.lookupReference('btnPlanRuleDrugsUpdate'),
        var btnDelete = this.lookupReference('btnPlanRuleDrugsDelete');

        /* if(btnUpdate!=null)
         btnUpdate.setDisabled(false);*/

        if (btnDelete != null)
            btnDelete.setDisabled(false);

    },

    renderAllLevel: function (value) {
        if (value)
            return 'Yes';
        return 'No'
    },
    renderActive: function (value) {
        if (value)
            return 'Yes';
        return 'No'
    },
    onPlanRuleDrugsGriddblClick: function (grid, record, tr, rowIndex, e, eOpts) {
        this.onRuleDrugsUpdate();
    },

    onPlanRuleGriddblClick: function (grid, record, tr, rowIndex, e, eOpts) {
        this.onRuleUpdate();

    },

    saveRuleDrugs: function (record, mode, ruleId) {



        // var planGroupRecord = this.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord') ;
        // var planGroupId = 0;
        //
        // if( planGroupRecord!=null )
        //     planGroupId = planGroupRecord.data.planGroupId;


        var planGroupRecord = this.retrievePlanGroup(),
            planGroupId = 0;

        if (planGroupRecord != null)
            planGroupId = planGroupRecord.get('planGroupId');


        var theStore = new Atlas.plan.store.PlanDURRuleDrugs;

        if (record != null && record.data != null) {
            record.dirty = true;
        }
        theStore.insert(0, record);

        var saveAction = [{
            "Create": {"key": 'mode', "value": mode},
            "Update": {"key": 'mode', "value": mode},
            "Delete": {"key": 'mode', "value": mode}
        }];

        var testReturn = Atlas.common.utility.Utilities.saveData([theStore], 'plan/rx/plandurrulexdrug/update', 'ttDurRuleDrug', [true],
            {
                'pPlanDurRuleID': ruleId
            },
            saveAction, null);

        if(testReturn.message == 'Successful'){
            Ext.MessageBox.alert('PBM', "Deleted Drug Details Successfully.", this.showResult, this);
        }

        this.onReloadruleXDrugs(ruleId);

    },

    saveRules: function (record, mode) {

        // var planGroupRecord = this.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord') ;
        // var planGroupId = 0;
        //
        // if( planGroupRecord!=null )
        //     planGroupId = planGroupRecord.data.planGroupId;

        var planGroupRecord = this.retrievePlanGroup(),
            planGroupId = 0;

        if (planGroupRecord != null)
            planGroupId = planGroupRecord.get('planGroupId');


        if (record != null && record.data != null) {
            record.dirty = true;
        }

        var params = [];
        params = this.generateParams(record, planGroupId, mode);


        var testReturn = Atlas.common.utility.Utilities.post('plan/rx/plandurrules/update', params, null);

        if(testReturn.message == 'Successful'){
            Ext.MessageBox.alert('PBM', "Deleted Rule Details Successfully.", this.showResult, this);
        }

        //this.fireViewEvent('reloadrules', this.lookupReference('cmbPlanRuleType').getValue());
        this.onReloadrules(this.lookupReference('cmbPlanRuleType').getValue());

    },
    generateParams: function (record, planGroupId, mode) {

        if (record == null)
            return null;

        var recordFields = record.getFields(),
            recordFieldList = record.getProxy().getModel().getFields(),
            recordFieldListArray = [],
            tempFields = [],
            values = [],
            params = {
                pSessionID: Atlas.user.sessionId,
                pPlanGroupId: planGroupId,
                pPlanDurRuleID: record.data.planDURRuleID,
                pAction: mode,
                pFieldList: null,
                pFieldValues: null

            };

        if (recordFieldList) {

            for (var i = 0; i < recordFieldList.length; i++) {
                tempFields.push(recordFieldList[i].name);

                if (recordFieldList[i].name == 'effDate' || recordFieldList[i].name == 'termDate' || recordFieldList[i].name == 'lastModified') {
                    if (recordFieldList[i].name == 'lastModified') {
                        if (record.data[recordFieldList[i].name] != null) {
                            values.push(Ext.Date.format(record.data[recordFieldList[i].name], 'm/d/Y T H:i:s'));
                        }
                        else {
                            values.push(record.data[recordFieldList[i].name]);
                        }
                    }

                    else {
                        values.push(Ext.Date.format(record.data[recordFieldList[i].name], 'm/d/Y'));
                    }

                }
                else {
                    values.push(record.data[recordFieldList[i].name]);
                }
            }
        }

        params.pFieldList = tempFields.join();
        params.pFieldValues = values.join('|');


        return params
    },

    onReloadrules: function (ruleType) {


        // var planGroupRecord = this.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord'),
        var planGroupRecord = this.retrievePlanGroup(),
            planGroupId = 0,
            storeRules = this.getViewModel().get('rules'),
            btnUpdate = this.lookupReference('btnPlanRuleUpdate'),
            btnDelete = this.lookupReference('btnPlanRuleDelete');

        // if( planGroupRecord!=null )
        //     planGroupId = planGroupRecord.data.planGroupId;

        // var planGroupRecord = this.retrievePlanGroup(),
        //     planGroupId = 0;

        if (planGroupRecord != null)
            planGroupId = planGroupRecord.get('planGroupId');

        if (btnUpdate != null)
            btnUpdate.setDisabled(true);

        if (btnDelete != null)
            btnDelete.setDisabled(true);

        storeRules.getProxy().setExtraParam('pPlanGroupId', planGroupId);
        storeRules.getProxy().setExtraParam('pRuleType', ruleType);

        storeRules.load({
            callback: function () {


            }
        });

    },

    onReloadruleXDrugs: function (ruleId) {
        var storeDrugs = this.getViewModel().get('drugs'),
            btnUpdate = this.lookupReference('onRuleDrugsUpdate'),
            btnDelete = this.lookupReference('btnPlanRuleDrugsDelete');

        if (btnUpdate != null)
            btnUpdate.setDisabled(true);

        if (btnDelete != null)
            btnDelete.setDisabled(true);

        storeDrugs.getProxy().setExtraParam('pPlanDurRuleId', ruleId);

        storeDrugs.load({
            callback: function () {

            }
        });

    },

    showRule: function (record) {

        var me = this,
        // planGroupRecord = this.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord') ,
            planGroupRecord = this.retrievePlanGroup(),
            planGroupId = 0;

        // if( planGroupRecord!=null )
        //     planGroupId = planGroupRecord.data.planGroupId;

        if (planGroupRecord != null)
            planGroupId = planGroupRecord.get('planGroupId');

        var win = Ext.create('Atlas.plan.view.group.PlanDurRuleWindow', {
                'record': record,
                //'parentWindow': me.getView(),
                'ruleType': me.lookupReference('cmbPlanRuleType').getValue(),
                "planGroupId": planGroupId
            }
        );

        this.getView().add(win);
        //userGrpWin.show()
        win.show();

    },

    showRuleDrugs: function (record) {

        var me = this,
        //planGroupRecord = this.getView().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord') ,
            planGroupRecord = this.retrievePlanGroup(),
            planGroupId = 0;

        // if( planGroupRecord!=null )
        //     planGroupId = planGroupRecord.data.planGroupId;

        if (planGroupRecord != null)
            planGroupId = planGroupRecord.get('planGroupId');

        var win = Ext.create('Atlas.plan.view.group.PlanDurRuleDrugsWindow', {
                'record': record,
                //'parentWindow': me.getView(),
                'ruleType': me.lookupReference('cmbPlanRuleType').getValue(),
                'ruleRecord': me.getselectedRuleRecord(),
                "planGroupId": planGroupId
            }
        );

        this.getView().add(win);
        //userGrpWin.show()
        win.show();

    },
    retrievePlanGroup: function () {
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();
        //modelPlanGroup.get('planGroupId')
    }

});