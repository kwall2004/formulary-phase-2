/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.view.PCNRuleDetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-planpcnruledetails',
    listen: {
        controller: {
            '*': {
                selectPcnCode: 'onPCNCodeSelected'
            }
        }
    },
    init:function(){
        this.getViewModel().get('pharmacytypes').load();
        this.getViewModel().get('rejectedcodes').load();
        this.getViewModel().get('planbenefitlistItem').load();
        var grid = this.getView();
        //grid.on("itemdblclick", 'setPharmacyType', this);

    },

    onPCNCodeSelected: function (record) {
        var theStore = this.getViewModel().getStore('pcnrulesetupdetails');
        theStore.getProxy().setExtraParam('pPCNCode', record.data.pcnCode);
        this.getView().pcnCode = record.data.pcnCode;
        theStore.load();
        this.getView().down('[text=Remove]').disable();
        this.getView().down('[text=Add]').enable();
        this.getView().down('[text=Save]').disable();
    },
    onAddPCNRule: function () {
        if(!this.addedRow) {
            var me = this,
                grid = this.getView();
            var store = this.getViewModel().getStore('pcnrulesetupdetails'),
                newRecord = Ext.create('Atlas.plan.model.PCNRuleSetupDetail', {});
            newRecord.set('PCNCode', this.getView().pcnCode);
            store.insert(0, newRecord);
            grid.getPlugin().startEdit(newRecord, 0);
            this.getPCNRuleDetailRecord().set('isNew', true);
            this.addedRow = true;
            this.getView().down('[text=Save]').enable();
        }

    },
    beforeEdit: function (editor,context) {
        var me=this;
        var pcnCodeField = this.getView().getPlugin('rowEditing').editor.form.findField("PCNCode");
        if(pcnCodeField)
        {
            pcnCodeField.setValue(this.getView().pcnCode);
            pcnCodeField.setRawValue(this.getView().pcnCode);
            pcnCodeField.value = this.getView().pcnCode;
        }

        var plnBnftList = this.getViewModel().get('planbenefitlistItem');
        if (plnBnftList != null) {
            plnBnftList.clearFilter();
        }
        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }
        }
        else
        {
            context.record.set('isEditing', true);
        }

        Ext.Function.defer(function () {
            Ext.callback('setPharmacyType', me);
        }, 500);
        Ext.Function.defer(function () {
            Ext.callback('setRejectionCode', me);
        }, 500);

    },
    cancelEditButton: function (editor, context) {
        var view=this.getView();
        if(context.record.phantom) {
            context.grid.store.removeAt(context.rowIdx);
        }
        else {
            context.record.reject();
            context.record.set('isEditing', false);

        }

        if(this.addedRow)
        {
            this.addedRow =false;
            view.down('[text=Remove]').enable();
        }
        if(this.isDirtyStore(context.grid.store)) {
            this.getView().down('[text=Save]').enable();
        }
        else
        {
            this.getView().down('[text=Save]').disable();
        }

    },
    completeEdit: function (editor, context) {
        var grid = this.getView();
        var gridColumns = grid.headerCt.getGridColumns();

        if ((Object.keys(context.record.getChanges()).length == 1) && context.record.getChanges().isUpdated){
            context.record.set('isUpdated', false);
        }
        else {
            context.record.set('isUpdated', true);
        }

        var curSelModel = grid.getSelectionModel().getSelection()[0];
        var curRow = grid.getSelectionModel().getSelection()[0];
        this.addedRow =false;
        context.record.set('isEditing', false);
        grid.findPlugin('rowediting').cancelEdit();

        if(this.isDirtyStore(context.grid.store)) {
            this.getView().down('[text=Save]').enable();
        }
        else
        {
            this.getView().down('[text=Save]').disable();
        }

    },
    onUndoChangeClick: function (button) {
        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {
            var grid = this.getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },
    getPCNRuleDetailRecord: function () {
        var grid = this.getView();
        if (grid) {
            return grid.getSelection()[0];
        }
    },
    selectRuleDetail: function () {
      var view=this.getView();
        var me = this;
         view.down('[text=Remove]').enable();
    },

        planBenefitRenderer: function (value) {
        if (value != 0) {
            var plnBnftList = this.getViewModel().get('planbenefitlistItem');
            if (plnBnftList != null) {
                var plnBnfItem = plnBnftList.findRecord('planBenefitId', value);
                if (plnBnfItem != null) {
                    var plnBnfItemName = plnBnfItem.get('BenefitName');
                    if (plnBnfItemName != null)
                        return plnBnfItemName;
                }
            }
            // var planBenefitStore =  this.getViewModel().getStore('planBenefitExt');
            // planBenefitStore.getProxy().setExtraParam('pWhere', 'planBenefitId=' + PlanBenefitId+ ' and planGroupId=' + PlanGroupId);
            // planBenefitStore.load({
            //     callback: function (recordInfo, operation, success) {
            //         //debugger;
            //         if (recordInfo && recordInfo.length > 0) {
            //             //PlanBenefitsParent.setSelection(recordInfo[0]);
            //             return recordInfo[0].data.BenefitName;
            //         }
            //
            //     }
            // });
        }
        return '';
    },
    planGroupNameRenderer: function (value,record) {
        // if (value != 0) {
        //     return record.record.get('PlangroupName');
        // }
        if (value != 0) {
            var plnGrpNameList = this.getViewModel().get('planbenefitlistItem');
            if (plnGrpNameList != null) {
                var plnGrpNameItem = plnGrpNameList.findRecord('planGroupId', value);
                if (plnGrpNameItem != null) {
                    var plnGrpNameItemName = plnGrpNameItem.get('planGroupName');
                    if (plnGrpNameItemName != null)
                        return plnGrpNameItemName;
                }
            }
        }
        return '';
    }
    ,
    onPlangroupSelect: function(combo,record) {

        var planGroupId = record.get('planGroupId');
        var benefitList = this.getViewModel().getStore('planbenefitlistItem');
        if (benefitList) {
            benefitList.clearFilter();
            benefitList.filter(Ext.create('Ext.util.Filter', {
                property: "planGroupId",
                value: planGroupId,
                exactMatch: true
            }));
        }
        var SelectData = this.getViewModel().getStore('pcnrulesetupdetails').getSelection();

        // var groupInfo = this.getViewModel().getStore('plangroupdetailinfo');
        // groupInfo.getProxy().setExtraParam('pplanGroupId', planGroupId);
        // groupInfo.load();
    }

    ,



    onPCNRuleDetailSave: function (button) {
        this.saveList();
    },
    saveList: function () {
        var theStore = this.getViewModel().getStore('pcnrulesetupdetails');
        var pcnCode = this.getView().pcnCode;
        theStore.getProxy().setExtraParam('pPCNCode', pcnCode);
        for (var i = 0; i < theStore.getCount(); i++) {
            theStore.data.items[i].data.PCNCode = pcnCode;
            if(theStore.data.items[i].dirty && theStore.data.items[i].data.isNew){

                   if(theStore.data.items[i].data.RxGroupCode=='' || theStore.data.items[i].data.PartnerId=='' || theStore.data.items[i].data.PlangroupId==0
                       || theStore.data.items[i].data.FilePrefix==''  || theStore.data.items[i].data.EffectiveDate==null
                   ) {
                       Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
                       return;
                   }

            }
        }
        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];
        if(this.isDirtyStore(theStore)) {
            var testReturn = Atlas.common.utility.Utilities.saveData(
                [theStore],
                'claims/rx/pcnrules/update',
                'ttPCNRules',
                [true],
                {
                    'pPCNCode': pcnCode
                },
                saveAction,
                null
            );
            if (testReturn && testReturn.message == "Successful") {
                Ext.MessageBox.alert("PBM", "PCN Rule Details Saved Sucessfully!");
                this.getView().down('[text=Remove]').disable();
            }
            else if (testReturn && testReturn.code != 0) {
                Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
            }

            theStore.load();
        }

    },
    setRejectionCode:function(){
        var grid = this.getView();
        var tf = grid.lookupReference('allowedRejectCodeCombo');
        var row = grid.getSelectionModel().getSelection()[0];
        if (row) {
            var val = row.get('AllowedRejectCodes');

            if (val) {
                var tempArray = val.split(',');
                tf.setValue(tempArray);
            }
        }

    },
    onRejectionCodeRender: function (value) {
        if (value != 0) {
            var returnVal='';
            var vArray = value.split(',');
            try {
                var rejectedcodes = this.getViewModel().get('rejectedcodes');
                for (var index = 0; index < vArray.length; index++) {

                    var record = rejectedcodes.findRecord('id', vArray[index]);
                    returnVal += record.get('id')+' - '+record.get('value');
                    if (index < vArray.length - 1)
                        returnVal += ',';
                }
            }
            catch( e)
            {
            }
            return returnVal;
        }


    },
    setPharmacyType:function(){
        var grid = this.getView();
        var tf = grid.lookupReference('pharmacyTypeCombo');
        var row = grid.getSelectionModel().getSelection()[0];
        if (row) {
            var val = row.get('AllowedPharmacyTypes');

            if (val) {
                var tempArray = val.split(',');
                tf.setValue(tempArray);
            }
        }

    },
    onAllowedPharmachyRender: function (value) {
        if (value != 0) {
            var returnVal='';
            var vArray = value.split(',');
            try {
                var allowedPharmacyList = this.getViewModel().get('pharmacytypes');
                for (var index = 0; index < vArray.length; index++) {

                    if (vArray[index]=='*')
                        return 'All';
                    var record = allowedPharmacyList.findRecord('value', vArray[index]);
                    returnVal += record.get('name');
                    if (index < vArray.length - 1)
                        returnVal += ',';
                }
            }
            catch( e)
            {
            }
            return returnVal;
        }

    },
    onRemoveButtonClick: function () {
        var me = this,
            grid = this.getView();
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        if(sm.getSelection().length >0) {
            sm.getSelection()[0].data.IsDeleted = true;
            grid.store.remove(sm.getSelection());
            this.getViewModel().set('changed', true);
            if (grid.store.getCount() > 0) {
                sm.select(0);
            }

            if(this.isDirtyStore(grid.store)) {
                this.getView().down('[text=Save]').enable();
            }
            else
            {
                this.getView().down('[text=Save]').disable();
            }

        }
        else
        {
            Ext.MessageBox.alert("PBM - Error", 'Please select the PCN rule to delete');
        }
    },

    onPlangroupSelect: function(combo,record){

        var plnBnftList = this.getViewModel().get('planbenefitlistItem');
        if (plnBnftList != null) {
            this.lookupReference('cbxplanBenefit').setRawValue('');
            plnBnftList.clearFilter();
            plnBnftList.filter(Ext.create('Ext.util.Filter', {
                property: "planGroupId",
                value: record.data.planGroupId,
                exactMatch: true
            }));

        }


    },
    isDirtyStore:function(theStore) {
    var isDirty = false;
    theStore.each(function(item){
        if(item.dirty == true){
            isDirty = true;
        }
    });
    if (!isDirty){
        isDirty = (theStore.removed.length > 0);
    }
    return isDirty;

}
});
