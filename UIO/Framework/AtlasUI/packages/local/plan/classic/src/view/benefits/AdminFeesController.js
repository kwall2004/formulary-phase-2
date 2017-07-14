/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.view.AdminFeesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefits-adminfees',
    // listen: {
    //     controller: {
    //         'plan-benefitscontroller': {
    //             benefitChange: 'onBenefitChange'
    //         }
    //     }
    // },

    onBenefitChange: function (record) {
       // debugger;
        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

        var me = this;
        var canEdit = true;
        this.addedRow = false;
        if(this.getView().up().benefitStatus =='A') {
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('PlanAdminFeeGrid').setDisabled(true);
        }
        else
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', true);
            this.lookupReference('PlanAdminFeeGrid').setDisabled(false);
        }
        var storeAdminFee= this.getViewModel().getStore('planadminfees');
        storeAdminFee.getProxy().setExtraParam('pPlanBenefitId', record.get('planBenefitId'));

        var feeclassList = this.getViewModel().getStore('feeclasstypes');


        feeclassList.load({
            callback: function (classRecordInfo, operation, success) {

                storeAdminFee.load({
                    callback: function (recordInfo, operation, success) {

                        if (recordInfo && recordInfo.length == 0) {
                            Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
                        }
                    }
                });
            }});
    },


    init: function () {
       // debugger;
        var me = this;
        // this.lookupReference('PlanAdminFeeGrid').setDisabled(true);
        var canEdit = true;
        // this.getViewModel().set('canEdit', true);
        // this.getViewModel().set('isEditing', false);

        //var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

        var record = this.getView().up().down('combobox').getSelection();
        if(record) {
            this.onBenefitChange(record);
            if(this.getView().up().benefitStatus =='A') {
                this.getViewModel().set('canEdit', true);
                this.getViewModel().set('isEditing', false);
                this.lookupReference('PlanAdminFeeGrid').setDisabled(true);
            }/*else if(atlasRecord){
                this.getViewModel().set('canEdit', false);
                this.getViewModel().set('isEditing', false);
                this.lookupReference('PlanAdminFeeGrid').setDisabled(true);
            }*/
            else
            {
                this.getViewModel().set('canEdit', false);
                this.getViewModel().set('isEditing', true);
                this.lookupReference('PlanAdminFeeGrid').setDisabled(false);
            }
        }
        else {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', false);
        }


    },
    onFeeAdminEdit: function (button) {
        //debugger;
        this.lookupReference('PlanAdminFeeGrid').setDisabled(false);
        var me = this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
    },

    beforeEdit: function (editor,context) {


        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = this.lookupReference('PlanAdminFeeGrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }
        else {

            context.record.set('isEditing', true);
            var feeclassList = this.getViewModel().get('feeclasstypes');
            var classValue = context.record.get('feeClassType');
            if (feeclassList != null && classValue) {
                var feeclassItem = feeclassList.findRecord('value', classValue, 0, false, false, true);
                if (feeclassItem != null) {
                    var feeclassName = feeclassItem.get('name');
                    if (feeclassName != null) {

                        var storeClassValue = this.getViewModel().get('feeclassvalues');
                        storeClassValue.getProxy().setExtraParam('pListName', feeclassName);
                        storeClassValue.load();

                    }
                }
            }
        }
    },

    onAdd: function () {
        if(!this.addedRow) {
            var me = this,
                grid = me.getView().down('grid');
            var store = grid.getStore(),
                newRecord = Ext.create('Atlas.plan.model.PlanAdminFee', {});

            store.insert(0, newRecord);
            grid.getPlugin().startEdit(newRecord, 0);
            this.getAdminFeeRecord().set('isNew', true);

            this.addedRow = true;
        }

    },
    cancelEditButton: function (editor, context) {
        //debugger;
        if(context.record.phantom) {

            context.grid.store.removeAt(context.rowIdx);
        }
        else {
            context.record.reject();
            context.record.set('isEditing', false);
        }
        this.addedRow = false;
    },

    onUndoChangeClick: function (button) {
        //debugger;
        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {
            var grid = this.lookupReference('PlanAdminFeeGrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
     },
    completeEdit: function (editor, context) {
        // debugger;
        if (context.record.dirty) {
            this.getAdminFeeRecord().set('isUpdated', true);
        }
        context.record.set('isEditing', false);
        this.addedRow = false;

    },
    getAdminFeeRecord: function () {

        //debugger;
        var grid = this.lookupReference('PlanAdminFeeGrid');
        if (grid) {
            return grid.getSelection()[0];
        }
    },
    onFeeClassSelect: function (combo, record) {
        //debugger;
        var storeClassValue = this.getViewModel().get('feeclassvalues');
        storeClassValue.getProxy().setExtraParam('pListName', record.get('name'));
        storeClassValue.load();

        var comboClassValue =this.lookupReference('feeclassvalue');
        if (comboClassValue != null) {
            comboClassValue.setValue(null);
            comboClassValue.setRawValue('');
        }

    },
    onAdminFeeSave: function (button) {
        //debugger;
        this.saveList();
    },
    saveList: function () {
        // debugger;
        var theStore = this.getViewModel().getStore('planadminfees');
        var record = this.getView().up().down('combobox');
        if(record!=null) {

            var planBenefitId = record.getSelection().data.planBenefitId;
        }
        theStore.getProxy().setExtraParam('pPlanBenefitId', planBenefitId);

         var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        var testReturn = Atlas.common.utility.Utilities.saveData(
            [theStore],
            'plan/rx/planfees/update',
            'ttPlanFeeDetail',
            [true],
            {
                'pPlanBenefitId': planBenefitId
            },
            saveAction,
            null
        );
       // theStore.load();
       // debugger;
        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
        }
        if(this.getView().up().benefitStatus =='A') {
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('PlanAdminFeeGrid').setDisabled(true);
        }
        else
        {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', true);
            this.lookupReference('PlanAdminFeeGrid').setDisabled(false);
        }

        theStore.load({
            callback: function (recordInfo, operation, success) {

                if (recordInfo && recordInfo.length == 0) {
                    Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
                }
            }
        });

    },
    feeTypeRenderer: function (value) {
        // debugger;
        var me = this;
        if (value != 0) {
                var feeTypeList = me.getViewModel().get('feetypes');
                if (feeTypeList != null) {
                    var feeTypeItem = feeTypeList.findRecord('value', value,0,false,false,true);
                    if (feeTypeItem != null) {
                        var feeTypeName = feeTypeItem.get('name');
                        if (feeTypeName != null)
                        {
                            return feeTypeName;
                        }


                    }
                }
        }
        return 'ALL';
        //debugger;
        //return value;
    },
    feeClassTypeRenderer: function (value) {
        //debugger;
        var me = this;
        if (value != 0) {

            //var storeClassValue = this.getViewModel().get('feeclassvalues');
            var feeclassList = this.getViewModel().get('feeclasstypes');
            if (feeclassList != null) {
                var feeclassItem = feeclassList.findRecord('value', value,0,false,false,true);
                if (feeclassItem != null) {
                    var feeclassName = feeclassItem.get('name');
                    if (feeclassName != null){
                        return feeclassName;
                     }
                }
            }
        }
        return 'ALL';
        //debugger;
        //return value;
    },
    feeClassValueTypeRenderer: function (value) {
        //debugger;
        if (value != 0) {


            var feeClassValueList = this.getViewModel().get('feeclassvalues');
            if (feeClassValueList != null) {
                var feeClassValueItem = feeClassValueList.findRecord('value', value,0,false,false,true);
                if (feeClassValueItem != null) {
                    var feeClassValueName = feeClassValueItem.get('name');
                    if (feeClassValueName != null)
                        return feeClassValueName;
                }
            }

            var adminFeeList = this .getViewModel().getStore('planadminfees');
            if(adminFeeList)
            {
                var adminFeeRecord = adminFeeList.findRecord('feeClassValue',value,0,false,false,true);
                if(adminFeeRecord)
                {
                    var classValueDescription = adminFeeRecord.get('feeClassValueDescription');
                    if(classValueDescription)
                    {
                        return classValueDescription;
                    }
                }

            }

        }
        return 'ALL';
        //debugger;
        //return value;
    },
    feePeriodRenderer: function (value) {
        //debugger;
        if (value != 0) {
            var feeperiodsList = this.getViewModel().get('feeperiods');
            if (feeperiodsList != null) {
                var feeperiodsItem = feeperiodsList.findRecord('value', value,0,false,false,true);
                if (feeperiodsItem != null) {
                    var feeperiodsName = feeperiodsItem.get('name');
                    if (feeperiodsName != null)
                        return feeperiodsName;
                }
            }
        }
        return 'ALL';
        //debugger;
        //return value;
    },
    onRemoveButtonClick: function () {
       // debugger;
        var me = this,
            grid = me.getView().down('grid');
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();

        if(sm.getSelection().length >0) {
            sm.getSelection()[0].data.IsDeleted = true;
            grid.store.remove(sm.getSelection());
            this.getViewModel().set('changed', true);
            if (grid.store.getCount() > 0) {
                sm.select(0);
            }

        }
        else
        {
            Ext.MessageBox.alert("PBM - Error", 'Please select the Administrative Fees to delete');
        }
    }

});