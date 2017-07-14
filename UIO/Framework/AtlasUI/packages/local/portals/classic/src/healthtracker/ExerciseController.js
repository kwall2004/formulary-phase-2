/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.ExerciseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.exercisecontroller',

    /**
     * Called when the view is created
     */
    init: function() {
        this.getExerciseGrid();
    },

    getExerciseGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('exercisestore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '9');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttExercise)) {
                    healthtrackerStore.loadData(records[0].getData().ttExercise);
                    return;
                }

                healthtrackerStore.removeAll();
            }
        });
    },

    editExercise: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.ExerciseData');
        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":9,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"dateExercise\":\"" + me.formatDate(new Date(record.get('dateExercise'))) + "\",\"exerciseType\":\"" + record.get('exerciseType') + "\",\"exerciseDuration\":\"" + record.get('exerciseDuration') +"\",\"feeling\":\"" + record.get('feeling') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved Exercise Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getExerciseGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('Exercise Error','An error occurred while saving the Exercise record. \nError Code:' + response.status);
            }
        });
    },

    addExercise: function() {
        var exerciseModel = Ext.create('Atlas.portals.healthtracker.model.ExerciseData', {
                Editable: true
            }),
            grid = this.lookupReference('exerciseGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, exerciseModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    cancelExerciseEdit: function(context, row) {
        if (!this.getView().getViewModel().get('newRecord')) { return; }

        var grid = context.grid,
            store = grid.getStore(),
            selections = grid.getSelectionModel().getSelected().items;

        grid.editingPlugin.cancelEdit();
        if (!selections || selections.length === 0) {
            Ext.Msg.alert('Information', 'Please select a row.');
            return;
        }
    },

    removeExercise: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('exerciseGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.ExerciseData'),
            exerciseStore = vm.getStore('exercisestore');

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
                        "sectionID":9,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"dateExercise\":\"" + me.formatDate(new Date(record.get('dateExercise'))) + "\",\"exerciseType\":\"" + record.get('exerciseType') + "\",\"exerciseDuration\":\"" + record.get('exerciseDuration') +"\",\"feeling\":\"" + record.get('feeling') + "\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            //console.dir(obj);
                            Ext.Msg.alert('Success', 'Successfully Deleted Exercise Record!! ', response.status);
                            me.getExerciseGrid();

                            var grid = me.lookupReference('exerciseGrid'),
                                exerciseStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }

                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the Exercise record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditExercise: function(context, row) {
        return row.record.get('Editable');
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});