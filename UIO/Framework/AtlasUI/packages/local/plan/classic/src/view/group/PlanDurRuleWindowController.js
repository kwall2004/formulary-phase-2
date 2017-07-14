/**
 * Created by S4505 on 11/16/2016.
 */
Ext.define('Atlas.plan.view.group.PlanDurRuleWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-plandurrulewindow',


    // listen: {
    //     controller: {
    //         '*': {
    //             reloadrules:'onReloadrules'
    //         }
    //     }
    // },
    init: function () {


        var me = this,
            record = this.getView().record,
            ruleType = this.getView().ruleType,
            titlePrefix ='Update ',
            titleSuffix ='DUR Rule';

        //var data =[];

        if(record!=null && record.data!=null)
        {
            //data.push(record.data);

            var form = this.getView().down();


            if(record.data.lastModified)
                record.data.lastModified = Ext.util.Format.date(record.data.lastModified, 'm/d/Y  h:i A');

            if(!Ext.isArray(record.data.RejectionCodes))
                record.data.RejectionCodes = record.data.RejectionCodes.split(',');

            form.loadRecord(record);

            if(record.data.allLevels)
                me.selectDrugOption('chkPlanDurRuleAllLevel',true);

            if(record.data.ultimateChildETCID !=null && record.data.ultimateChildETCID >0 ) {
                me.selectDrugOption('chkPlanDurRuleChildETC', true);
                this.lookupReference('cmbRuleultimateChildETCID').setValue(record.data.ultimateChildETCID);
            }
            if(record.data.GCN_SEQNO !=null && record.data.GCN_SEQNO >0 ) {
                me.selectDrugOption('chkPlanDurRuleGCNSEQNO', true);
                this.lookupReference('cmbRuleGCNSeqNo').setValue(record.data.GCN_SEQNO);
            }

            if(record.data.NDC !=null && record.data.NDC >0 ) {
                me.selectDrugOption('chkPlanDurRuleNDC', true);
                this.lookupReference('cmbRuleNdc').setValue(record.data.NDC);
            }

            if(record.data.GPICode !=null && record.data.GPICode >0 ) {
                me.selectDrugOption('chkPlanDurRuleGPICode', true);
                this.lookupReference('cmbRuleGpiCode').setValue(record.data.GPICode);
            }
            this.getView().DURDesc = this.getView().record.data.DURDesc;
            this.getView().DURCondDesc = this.getView().record.data.DURCondDesc;

            this.lookupReference('planRuleDrugDescription').setValue(record.data.drugDesc);


        }
        else
        {
            this.getView().record = new Atlas.plan.store.PlanDURRules;
            titlePrefix= 'Add ';
        }
        if(ruleType == 2) {
            titleSuffix = 'Intervention Rule';
            this.getViewModel().set('isIntervention', true);
            this.getViewModel().set('isDUR', false);
            this.lookupReference('chkPlanDurRuleAllLevel').setDisabled(true);
            this.lookupReference('DURType').allowBlank = true;
            this.lookupReference('DURCondition').allowBlank = true;
        }

        if(ruleType == 1) {
            this.getViewModel().set('isDUR', true);
            this.getViewModel().set('isIntervention', false);
            var monitorHrs =  this.lookupReference('MonitorHrs');
            if(monitorHrs)
                monitorHrs.allowBlank= true;
            var rejectionCodes = this.lookupReference('rejectionCodes');

            if(rejectionCodes)
                rejectionCodes.allowBlank= true;


        }
        this.getView().title = titlePrefix + titleSuffix;
    },

    onDurTypeSelect:function(combo,record)
    {

        this.getView().DURDesc = record.data.name;
    },

    onDurConditionSelect:function(combo,record)
    {

        this.getView().DURCondDesc = record.data.name;
    },

    onUltimateChildETCIDSelect:function (combo,record) {
        this.setDurRuleDrugDescription(record.data.ETC_NAME);
    },

    onGCNSEQNOSelect:function (combo,record) {
        this.setDurRuleDrugDescription(record.data.GNN60);
    },

    onRuleGpiCodeSelect:function(combo,record){
        this.setDurRuleDrugDescription(record.data.GPIName);

    },

    onNDCSelect:function(combo,record){

        this.setDurRuleDrugDescription(record.data.NDC);

    },
    onCancelClick:function(button)
    {
        button.up().up('window').close();

    },

    onSaveClick:function(button)
    {
        var form = this.getView().down('form');
        var values = form.getValues();
        if(form.isValid() && values) {
             if(this.getView().drugLevel) {

                if (this.getView().drugLevel != 'All Drugs') {

                    if (this.getView().drugLevel == 'ETC') {
                        if (!values['ultimateChildETCID']) {
                            Ext.MessageBox.alert('Validation Error', "Please Select the ETC Value.", this.showResult, this);
                            return false;
                        }
                    }

                    else if (this.getView().drugLevel == 'GPI') {
                        if (!values['GPICode']) {
                            Ext.MessageBox.alert('Validation Error', "Please Select the GPI Value.", this.showResult, this);
                            return false;
                        }
                    }
                    else if (this.getView().drugLevel == 'NDC') {
                        if (!values['NDC']) {
                            Ext.MessageBox.alert('Validation Error', "Please Select the NDC Value.", this.showResult, this);
                            return false;
                        }
                    }
                    else if (this.getView().drugLevel == 'GCN') {
                        if (!values['GCN_SEQNO']) {
                            Ext.MessageBox.alert('Validation Error', "Please Select the GCN SEQNO Value.", this.showResult, this);
                            return false;
                        }
                    }
                }
            }
            else
            {
                Ext.MessageBox.alert('Validation Error', "Drug Level is required.", this.showResult, this);
                return false;

            }

            var params = this.generateParams(values);

            var testReturn = Atlas.common.utility.Utilities.post('plan/rx/plandurrules/update', params, null);

            var messagePrefix = 'Added';
            if(this.getView().mode =='U')
            {
                messagePrefix = 'Updated';
            }
            if(testReturn && testReturn.code != 0)
            {
                Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
            }
            else {

                if (testReturn.message == 'Successful') {
                    Ext.MessageBox.alert('PBM', messagePrefix + " Rule Details Successfully.", this.showResult, this);
                }
            }

            this.onReloadrules(this.getView().ruleType);

            button.up().up('window').close();
        }
        else {
            Ext.MessageBox.alert('Validation Error', "Please enter all required fields before submitting job.", this.showResult, this);
        }

    },

    onReloadrules:function(ruleType){

        var ruleSetupTab = this.getView().up('plan-group-rulesetup');

        if(ruleSetupTab)
        {
            ruleSetupTab.getController().onReloadrules(ruleType);

        }

    },
    setDurRuleDrugLevel:function(value)
    {
        this.lookupReference('planRuleDrugLevel').setRawValue(value);
        this.lookupReference('planRuleDrugLevel').setValue(value);
        //this.getView().set('drugLevel',value);

        this.getView().drugLevel =value;
    },

    getDurRuleDrugLevel:function()
    {
        return this.lookupReference('planRuleDrugLevel').getValue();
    },


    setDurRuleDrugDescription:function(value)
    {
        this.lookupReference('planRuleDrugDescription').setRawValue(value);
        this.getView().drugDesc =value;
    },
    onPlanDurRuleChildETCChange:function(radio,value)
    {
        if(value) {
            this.setDurRuleDrugLevel('ETC');
            this.setDurRuleDrugDescription('');
            this.lookupReference('cmbRuleultimateChildETCID').setValue('');
            this.lookupReference('cmbRuleultimateChildETCID').setRawValue('');

        }

    },
    onChkPlanDurRuleGCNSEQNOChange:function(radio,value)
    {
        if(value) {
            this.setDurRuleDrugLevel('GCN');
            this.setDurRuleDrugDescription('');
            this.lookupReference('cmbRuleGCNSeqNo').setValue('');
            this.lookupReference('cmbRuleGCNSeqNo').setRawValue('');
        }

    },

    onChkPlanDurRuleGPICodeChange:function(radio,value)
    {
        if(value) {
            this.setDurRuleDrugLevel('GPI');
            this.setDurRuleDrugDescription('');
            this.lookupReference('cmbRuleGpiCode').setValue('');
            this.lookupReference('cmbRuleGpiCode').setRawValue('');
        }
    },
    onChkPlanDurRuleNDCChange:function(radio,value)
    {
        if(value) {
            this.setDurRuleDrugLevel('NDC');
            this.setDurRuleDrugDescription('');
            this.lookupReference('cmbRuleNdc').setValue('');
            this.lookupReference('cmbRuleNdc').setRawValue('');
        }

    },
    onChkPlanDurRuleAllLevelChange:function(radio,value)
    {
        if(value) {
            this.setDurRuleDrugLevel('All Drugs');
            this.setDurRuleDrugDescription('');
        }
    },

    selectDrugOption:function(control,value)
    {
        this.lookupReference(control).setValue(value);
    },

    onRejectionCodeChange:function (control,value) {
        this.getView().record.data.RejectionCodes = value;
    },

    generateParams: function (formValue) {

        var record =this.getView().record;

        if( record == null)
            return null;
        var mode ='U';

        if(record.data.planDURRuleID ==null) {
            mode = 'A';
            record.data.planDURRuleID = 0;
        }

        this.getView().mode = mode;


        var recordFields = record.getFields(),
            recordFieldList = record.getProxy().getModel().getFields(),
            recordFieldListArray = [],
            tempFields = [],
            values = [],
            params = {
                pSessionID: Atlas.user.sessionId,
                pPlanGroupId: this.getView().planGroupId,
                pPlanDurRuleID: record.data.planDURRuleID,
                pAction:mode,
                pFieldList: null,
                pFieldValues: null

            };

        if (recordFieldList) {

            for (var i = 0; i < recordFieldList.length; i++) {

                if(recordFieldList[i].name != 'planGroupId' && recordFieldList[i].name != 'drugDesc'
                    && recordFieldList[i].name != 'DURCondDesc' && recordFieldList[i].name != 'DURDesc'
                    && recordFieldList[i].name != 'planDURRuleID' && recordFieldList[i].name != 'id') {


                    tempFields.push(recordFieldList[i].name);
                }

                if (recordFieldList[i].name =='allLevels')
                {
                    if(this.getView().drugLevel == 'All Drugs')
                        values.push(true);
                    else
                        values.push(false);
                }
                else if (recordFieldList[i].name == 'ultimateChildETCID')
                {
                    if(this.getView().drugLevel == 'ETC')
                        values.push(formValue[recordFieldList[i].name]);
                    else
                        values.push(0)
                }

                else if (recordFieldList[i].name == 'GPICode')
                {

                    if(this.getView().drugLevel == 'GPI')
                        values.push(formValue[recordFieldList[i].name]);
                    else
                        values.push('0')
                }

                else if (recordFieldList[i].name == 'NDC')
                {

                    if(this.getView().drugLevel == 'NDC')
                        values.push(formValue[recordFieldList[i].name]);
                    else
                        values.push('')
                }

                else if (recordFieldList[i].name == 'GCN_SEQNO')
                {
                    if(this.getView().drugLevel == 'GCN')
                        values.push(formValue[recordFieldList[i].name]);
                    else
                        values.push(0)
                }

                else if(recordFieldList[i].name == 'ACTIVE' || recordFieldList[i].name == 'LetterRequired'|| recordFieldList[i].name == 'AlertRequired')
                {
                    if(formValue[recordFieldList[i].name] !=null && formValue[recordFieldList[i].name] =='on')
                        values.push(true);
                    else
                        values.push(false);
                }
                else if (recordFieldList[i].name == 'RejectionCodes')
                {

                    if(formValue[recordFieldList[i].name]!=null && formValue[recordFieldList[i].name].length > 0)
                    {
                        values.push(formValue[recordFieldList[i].name].join(','));
                    }
                    else
                    {
                        values.push('');
                    }

                }

                else if (recordFieldList[i].name =='RuleType')
                {
                    values.push(this.getView().ruleType);

                }

                else if (recordFieldList[i].name =='lastModifiedby')
                {
                    values.push(Atlas.user.un);

                }
                else if(recordFieldList[i].name == 'lastModified')
                {
                    values.push('');

                }
                else {
                    if(recordFieldList[i].name != 'planGroupId' && recordFieldList[i].name != 'drugDesc'
                        && recordFieldList[i].name != 'DURCondDesc' && recordFieldList[i].name != 'DURDesc'
                        && recordFieldList[i].name != 'planDURRuleID' && recordFieldList[i].name != 'id') {
                        values.push(formValue[recordFieldList[i].name]);
                    }
                }

            }
        }

        params.pFieldList = tempFields.join();
        params.pFieldValues = values.join('|');


        return params
    }

});