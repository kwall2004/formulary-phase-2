/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.NutritionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nutritioncontroller',

    /**
     * Called when the view is created
     */
    init: function() {
        this.getNutritionGrid();
    },

    getNutritionGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('nutritionstore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '10');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttNutrition)) {
                    healthtrackerStore.loadData(records[0].getData().ttNutrition);
                    return;
                }

                healthtrackerStore.removeAll();
            }
        });
    },

    editNutrition: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.NutritionData');
        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":10,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"dateNutritionStart\":\"" + me.formatDate(new Date(record.get('dateNutritionStart'))) + "\",\"breakfastNotes\":\"" + record.get('breakfastNotes') + "\",\"lunchNotes\":\"" + record.get('lunchNotes') +"\",\"dinnerNotes\":\"" + record.get('dinnerNotes') + "\",\"snackNotes\":\"" + record.get('snackNotes') + "\", \"dayNotes\":\"" + record.get('dayNotes') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved Nutrition Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getNutritionGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('Nutrition Error','An error occurred while saving the Nutrition record. \nError Code:' + response.status);
            }
        });
    },

    addNutrition: function() {
        var nutritionModel = Ext.create('Atlas.portals.healthtracker.model.NutritionData', {
                Editable: true
            }),
            grid = this.lookupReference('nutritionGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, nutritionModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    cancelNutritionEdit: function(context, row) {
        if (!this.getView().getViewModel().get('newRecord')) { return; }

        var grid = context.grid,
            store = grid.getStore(),
            selections = grid.getSelectionModel().getSelected().items;

        grid.editingPlugin.cancelEdit();
        if (!selections || selections.length === 0) {
            Ext.Msg.alert('Information', 'Please select a row.');
            return;
        }

        for (var i = 0, r; r = selections[i]; i++) {
            if (!r.get('Editable')) { return; }
            store.remove(r);
        }
    },

    removeNutrition: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('nutritionGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.NutritionData'),
            nutritionStore = vm.getStore('nutritionstore');

        Ext.Msg.show({
            title: 'Delete?',
            msg: 'Do you really want to delete the highlighted record?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(buttonId){
                if (buttonId == 'yes'){
                    //save to
                    healthtrackerSave.phantom = false;
                    var ttmemberHealthTrackerData = [{
                        "recipientID":user.recipientId,
                        "sectionID":10,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"dateNutritionStart\":\"" + me.formatDate(new Date(record.get('dateNutritionStart'))) + "\",\"breakfastNotes\":\"" + record.get('breakfastNotes') + "\",\"lunchNotes\":\"" + record.get('lunchNotes') +"\",\"dinnerNotes\":\"" + record.get('dinnerNotes') + "\",\"snackNotes\":\"" + record.get('snackNotes') + "\", \"dayNotes\":\"" + record.get('dayNotes') + "\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            //console.dir(obj);
                            Ext.Msg.alert('Success', 'Successfully Deleted Nutrition Record!! ', response.status);
                            me.getNutritionGrid();

                            var grid = me.lookupReference('nutritionGrid'),
                                nutritionStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }

                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the Nutrition record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditNutrition: function(context, row) {
        return row.record.get('Editable');
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});