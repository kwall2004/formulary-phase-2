/**
 * Created by S4505 on 11/16/2016.
 */
Ext.define('Atlas.plan.view.group.PlanDurRuleDrugsWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-plandurruledrugswindow',
    // listen: {
    //     controller: {
    //         '*': {
    //             reloadruleXdrugs:'onReloadruleXDrugs'
    //         }
    //     }
    // },
    init: function () {


        var me = this,
            record = this.getView().record,
            ruleType = this.getView().ruleType,
            titlePrefix ='Update ',
            titleSuffix ='Drug Details';

        var data =[];

        if(record!=null && record.data!=null)
        {
            data.push(record.data);
            var form = this.getView().down();
            //form.loadRecord(record);

            if(record.data.drugLevel == 1) {
                this.selectDrugOption('planRuleXDrugsultimateChildETCID', true);
                record.data.ultimateChildETCID = this.getView().record.data.drugLevelID;
            }
            if(record.data.drugLevel == 2) {
                this.selectDrugOption('planRuleXDrugsGCN_SEQ', true);
                record.data.GCN_SEQNO = this.getView().record.data.drugLevelID;
            }
            if(record.data.drugLevel == 3) {
                this.selectDrugOption('planRuleXDrugsNDC', true);
                record.data.NDC = this.getView().record.data.drugLevelID;
            }
            if(record.data.drugLevel == 4) {
                this.selectDrugOption('planRuleXDrugsGPICode', true);
                record.data.GPICode = this.getView().record.data.drugLevelID;
            }
            this.getView().drugLevelId = this.getView().record.data.drugLevelID;

            form.loadRecord(record);
            this.getView().mode = 'U'

        }
        else
        {
            this.getView().record = new Atlas.plan.model.PlanDURRuleDrugs;
            var titlePrefix= 'Add ';
            this.getView().mode = 'A'
        }
        this.getView().title = titlePrefix + titleSuffix;



    },
    onUltimateChildETCIDSelect:function (combo,record) {

        this.setDurRuleXDrugDescription(record.data.ETC_NAME,record.data.ETC_ID);
    },
    onDrugGCNSEQNOSelect:function (combo,record) {

        this.setDurRuleXDrugDescription(record.data.GNN60,record.data.GCN_SEQNO);

    },
    onDrugGpiCodeSelect:function (combo,record) {

        this.setDurRuleXDrugDescription(record.data.GPIName,record.data.GPICode);

    },
    onDrugNDCSelect:function (combo,record) {

        this.setDurRuleXDrugDescription(record.data.GNN60,record.data.NDC);

    },

    onCancelClick:function(button)
    {
        button.up('window').close();

    },


    onChkNDCCahnge:function(radio,value)
    {
        if(value) {
            this.getView().druglevel = 3;
            this.setDurPlanRuleXDrugLevel('NDC');
            this.lookupReference('cmbDrugNdc').setValue('');
            this.lookupReference('cmbDrugNdc').setRawValue('');
            this.setDurRuleXDrugDescription('','');

        }

    },
    onChkGPIChange:function(radio,value)
    {
        if(value) {
            this.getView().druglevel = 4;
            this.setDurPlanRuleXDrugLevel('GPI');
            this.lookupReference('cmbDrugGpiCode').setValue('');
            this.lookupReference('cmbDrugGpiCode').setRawValue('');
            this.setDurRuleXDrugDescription('','');
        }

    },

    onChkGCNChange:function(radio,value)
    {
        if(value) {
            this.getView().druglevel = 2;
            this.setDurPlanRuleXDrugLevel('GCN');
            this.lookupReference('cmbDrugGCNSeqNo').setValue('');
            this.lookupReference('cmbDrugGCNSeqNo').setRawValue('');
            this.setDurRuleXDrugDescription('','');

        }

    },
    onChkETCChange:function(radio,value)
    {
        if(value) {
            this.getView().druglevel = 1;
            this.setDurPlanRuleXDrugLevel('ETC');
            this.lookupReference('cmbDrugultimateChildETCID').setValue('');
            this.lookupReference('cmbDrugultimateChildETCID').setRawValue('');
            this.setDurRuleXDrugDescription('','');
        }

    },

    setDurRuleXDrugDescription:function(rawValue, levelId)
    {
        this.lookupReference('planRuleXDrugDesc').setRawValue(rawValue);
        this.getView().drugLevelId = levelId;
    },

    setDurPlanRuleXDrugLevel:function(value)
    {
        this.lookupReference('planRuleXDrugLevelDesc').setRawValue(value);
        this.lookupReference('planRuleXDrugDesc').setValue('');
        this.getView().drugLevelId = '';
    },

    onSaveClick:function(button)
    {

        var theStore = new Atlas.plan.store.PlanDURRuleDrugs ;
        var record = this.getView().record;
        if(record!=null && record.data !=null)
        {
            var drugLevelDesc = this.lookupReference('planRuleXDrugLevelDesc').rawValue;


            if(drugLevelDesc) {

                if (drugLevelDesc == 'ETC') {
                    if (!this.lookupReference('cmbDrugultimateChildETCID').value) {
                        Ext.MessageBox.alert('Validation Error', "Please Select the ETC Value.", this.showResult, this);
                        return false;
                    }
                }

                else if (drugLevelDesc == 'GPI') {
                    if (!this.lookupReference('cmbDrugGpiCode').value) {
                        Ext.MessageBox.alert('Validation Error', "Please Select the GPI Value.", this.showResult, this);
                        return false;
                    }
                }
                else if (drugLevelDesc == 'NDC') {
                    if (!this.lookupReference('cmbDrugNdc').value) {
                        Ext.MessageBox.alert('Validation Error', "Please Select the NDC Value.", this.showResult, this);
                        return false;
                    }
                }
                else if (drugLevelDesc == 'GCN') {
                    if (!this.lookupReference('cmbDrugGCNSeqNo').value) {
                        Ext.MessageBox.alert('Validation Error', "Please Select the GCN SEQNO Value.", this.showResult, this);
                        return false;
                    }
                }
            }
            else {
                Ext.MessageBox.alert('Validation Error', "Drug Level is required.", this.showResult, this);
                return false;
            }



            record.dirty = true;
            record.data.drugLevelId = this.getView().drugLevelId;
            record.data.drugLevel = this.getView().druglevel;
        }
        theStore.insert(0,record);

        var mode = this.getView().mode;

        var saveAction = [{
            "Create": {"key": 'mode', "value": mode},
            "Update": {"key": 'mode', "value": mode},
            "Delete": {"key": 'mode', "value": mode}
        }];
        var ruleId = this.getView().ruleRecord.data.planDURRuleID;

        var testReturn = Atlas.common.utility.Utilities.saveData([theStore], 'plan/rx/plandurrulexdrug/update', 'ttDurRuleDrug', [true],
            {
                'pPlanDurRuleID': ruleId
            },
            saveAction, null);

        var messagePrefix = 'Added';
        if(mode =='U')
        {
            messagePrefix = 'Updated';
        }

        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
        }
        else
        {
            if (testReturn.message == 'Successful') {
                Ext.MessageBox.alert('PBM', messagePrefix + " Drug Details Successfully.", this.showResult, this);
            }
        }

        //this.fireEvent('reloadruleXdrugs',ruleId);
        this.onReloadruleXDrugs(ruleId);

        button.up('window').close();

    },
    onReloadruleXDrugs:function(ruleId)
    {
        var ruleSetupTab = this.getView().up('plan-group-rulesetup');

        if(ruleSetupTab)
        {
            ruleSetupTab.getController().onReloadruleXDrugs(ruleId);

        }


    },

    selectDrugOption:function(control,value)
    {
        this.lookupReference(control).setValue(value);
    }
});