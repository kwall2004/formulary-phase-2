/**
 * Created by S4505 on 11/23/2016.
 */
Ext.define('Atlas.plan.view.PricingGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-benefitspricinggrid',

    // listen: {
    //     controller: {
    //         '*': {
    //             reloadPricingSetUp:'onReloadPricingSetUp',
    //             reloadPricingMaster:'onReloadPricingMaster'
    //         }
    //     }
    // },

    init: function () {
        //debugger;

        //this.lookupReference('planBenefitPricingGrid').setDisabled(true);
        var me = this;
        var canEdit = true;
        this.getViewModel().set('canEdit', true);
        this.getViewModel().set('isEditing', false);
        this.addedRow = false;

    },

    boxReady: function () {
        // debugger;
        //var benefitStatus = this.getView().up().up().benefitStatus;
        var atlasRecord = this.getView().up().up().getViewModel().get('isAtlasRecord');
        if (this.getView().up().findParentByType('tabpanel').benefitStatus == 'A' && !atlasRecord) {
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('planBenefitPricingGrid').setDisabled(true);
        } else if (atlasRecord) {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', false);
            this.lookupReference('planBenefitPricingGrid').setDisabled(true);
        }
        else {
            this.getViewModel().set('canEdit', false);
            this.getViewModel().set('isEditing', true);
            this.lookupReference('planBenefitPricingGrid').setDisabled(false);
        }
    },


    beforeEdit: function (editor, context) {
        if (context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if (context.record && context.record.phantom) {
                var grid = this.lookupReference('planBenefitPricingGrid').getView();
                grid.store.removeAt(context.rowIdx);
                return false;
            }
        }

    },

    completeEdit: function (editor, context) {

        if (context.record.dirty) {
            this.getPricingInformationRecord(context).set('isUpdated', true);
        }

        this.addedRow = false;
    },

    cancelEditButton: function (editor, context) {
        if (context.record.phantom)
            context.grid.store.removeAt(context.rowIdx);

        this.addedRow = false;
    },
    onUndoChangeClick: function (button) {
        //debugger;

        //var dataToRevert = this.getView().store;
        // var dataToRevert =this.lookupReference('CoveragePhasegrid').getView().store;
        // dataToRevert.getAt(Ext.getCmp(button.id).up()._rowContext.recordIndex).reject();
        var record = button.getViewModel().data.record;
        if (!record.phantom) {
            record.reject();
        }
        else {
            var grid = this.lookupReference('planBenefitPricingGrid').getView();
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();

        }
    },

    getPricingInformationRecord: function (context) {

        var grid = context.grid;
        if (grid) {
            return context.grid.getSelection()[0];
        }
    },

    onPricingAdd: function (button) {

        if (!this.addedRow) {

            var me = this,
                grid = this.getView().down('grid').getView(),
                store = this.getViewModel().getStore('planpricingdetail'),
                newRecord = new Atlas.plan.model.PlanBenefitPricingDetail();
            newRecord.set('isNew', true);
            store.insert(0, newRecord);

            var tab = this.getViewModel().get('currentTab');

            Ext.getCmp(tab.id).lookupReference('planBenefitPricingGrid').getView().up().getPlugin('rowEditing').startEdit(newRecord, 0);

            this.addedRow = true;
        }

    },

    onPricingDelete: function (button) {

        var me = this;
        var vm = this.getViewModel(),
            grid = this.lookupReference('planBenefitPricingGrid').getView();
        grid.up().findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length > 0) {
            sm.getSelection()[0].data.IsDeleted = true;
            grid.store.remove(sm.getSelection());
            this.getViewModel().set('changed', true);
            if (grid.store.getCount() > 0) {
                sm.select(0);
            }
        }
        else {
            Ext.MessageBox.alert("PBM - Error", 'Please select the pricing item to delete');
        }
    },

    onPricingAdminEdit: function (button) {
        this.lookupReference('planBenefitPricingGrid').setDisabled(false);
        var me = this;
        me.getViewModel().set('isEditing', true);
        me.getViewModel().set('canEdit', false);
    },

    onPricingSave: function (button) {

        var priceID = 0,
            modelPlanGroup = this.retrievePlanGroup(),
            planGroupId = modelPlanGroup.get('planGroupId'),
            planBenefitId = modelPlanGroup.get('planBenefitId'),
            carrierLOBId = this.getView().CarrierLOBId,
            fulfillmentType = this.getView().fulFillmentType,
            parentSystemId = this.getView().ParentSystemID,
            storePlanPricingMaster = this.getViewModel().getStore('planpricingmaster');

        var theStore = this.getViewModel().getStore('planpricingdetail');
        var firemaster = false;

        if (storePlanPricingMaster != null) {
            var masterRecord = storePlanPricingMaster.findRecord('fulfillmentType', fulfillmentType, 0, false, false, true);
            if (masterRecord != null)
                priceID = masterRecord.data.priceId;

            if (theStore != null) {

                var recordsDeleted = [];

                for (var i in theStore.removed) {
                    var rec = theStore.removed[i];
                    var recordData = rec.data;
                    // recordData[removeAction.key] = removeAction.value;
                    recordsDeleted.push(recordData);
                }

                if (recordsDeleted.length > 0)
                    this.DeletePricingDetail(recordsDeleted);

                if (priceID == 0) {
                    priceID = this.savePricingMaster(parentSystemId, carrierLOBId, fulfillmentType);
                    firemaster = true;
                }

                if (priceID > 0)
                    this.savePricingDetail(theStore, priceID);
            }

            if (!firemaster)
                this.onReloadPricingSetUp(priceID);
            else
                this.onReloadPricingMaster(planBenefitId, fulfillmentType);

            // this.getViewModel().set('isEditing', false);
            // this.getViewModel().set('canEdit', true);

            if (this.getView().up().findParentByType('tabpanel').benefitStatus == 'A') {
                this.getViewModel().set('canEdit', true);
                this.getViewModel().set('isEditing', false);
                this.lookupReference('planBenefitPricingGrid').setDisabled(true);
            }
            else {
                this.getViewModel().set('canEdit', false);
                this.getViewModel().set('isEditing', true);
                this.lookupReference('planBenefitPricingGrid').setDisabled(false);
            }


        }
    },

    savePricingMaster: function (parentSystemID, carrierLOBId, fulFillmentType) {

        var params = {
            pSessionID: Atlas.user.sessionId,
            pPriceID: 0,
            pFieldList: 'FulfillmentType,PharmaPricing,ParentSystemId,LOBId',
            pFields: fulFillmentType + '|' + 'no' + '|' + parentSystemID + '|' + carrierLOBId
        };

        var returnValue = Atlas.common.utility.Utilities.post('pharmacy/rx/pricingmasterdata/update', params, ['pRetPriceID']);


        if (returnValue != null) {
            return returnValue.pRetPriceID
        }

        return 0;

    },


    savePricingDetail: function (theStore, priceId) {
        var me = this;

        var params = [];
        theStore.each(function (record) {
            if (record.dirty) {
                params = me.generateParams(record, priceId);
                var testReturn = Atlas.common.utility.Utilities.post('pharmacy/rx/pricingdetail/update', params, null);
            }
        });

    },

    generateParams: function (record, priceId) {
        if (record == null)
            return null;

        var recordFields = record.getFields(),
            recordFieldList = record.getProxy().getModel().getFields(),
            recordFieldListArray = [],
            tempFields = [],
            values = [],
            params = {
                pSessionID: Atlas.user.sessionId,
                pSystemID: record.data.systemID,
                pPriceID: priceId,
                pFieldList: null,
                pFields: null

            };

        if (recordFieldList) {

            for (var i = 0; i < recordFieldList.length; i++) {

                if (recordFieldList[i].name != 'id' && recordFieldList[i].name != 'systemID' && recordFieldList[i].name != 'RowNum' &&
                    recordFieldList[i].name != 'OTCInd' && recordFieldList[i].name != 'PriceId'
                ) {
                    tempFields.push(recordFieldList[i].name);
                    values.push(record.data[recordFieldList[i].name]);
                }
            }
        }

        params.pFieldList = tempFields.join();
        params.pFields = values.join('|');
        return params
    },


    DeletePricingDetail: function (recordsDeleted) {
        for (var i = 0; i < recordsDeleted.length; i++) {

            var systemId = recordsDeleted[i].systemID;
            var params = {
                pSessionID: Atlas.user.sessionId,
                pKeyType: 'systemID',
                pKeyValue: systemId
            };
            Atlas.common.utility.Utilities.post('pharmacy/rx/delpricingdetail/update', params, ['pResult', 'pMessage']);
        }

    },

    maintenanceDaysRenderer: function (value) {
        //debugger;
        if (value != null) {
            var maintenanceDays = this.getViewModel().get('maintenance');
            if (maintenanceDays != null) {
                var maintenanceDay = maintenanceDays.findRecord('value', value);
                if (maintenanceDay != null) {
                    var maintenanceDayName = maintenanceDay.get('name');
                    if (maintenanceDayName != null)
                        return maintenanceDayName;
                }
            }
        }
        return '';
    },
    drugTypeRenderer: function (value) {

        if (value != null) {
            var theStore = this.getViewModel().getStore('drugtype');
            if (theStore != null) {
                var theRecord = theStore.findRecord('value', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('name');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
        return '';
    },


    costBasisRenderer: function (value) {
        //debugger;
        if (value != null) {
            var theStore = this.getViewModel().getStore('costbasis');
            if (theStore != null) {
                var theRecord = theStore.findRecord('value', value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get('name');
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
        return '';
    },

    onReloadPricingSetUp: function (priceID) {
        var pricingTab = this.getView().up('plan-benefits-pricing');
        if (pricingTab) {
            pricingTab.getController().onReloadPricingSetUp(priceID);
        }

    },
    onReloadPricingMaster: function (planBenefitId, fulFillmentType) {
        var pricingTab = this.getView().up('plan-benefits-pricing');
        if (pricingTab) {
            pricingTab.getController().onReloadPricingMaster(planBenefitId, fulFillmentType);
        }

    },

    retrievePlanGroup: function () {
        //debugger;
        return this.getView().up().findParentByType('tabpanel').down('planBenefit').getSelection();
    }
});