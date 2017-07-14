/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.BloodSugarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloodsugarcontroller',

    /**
     * Called when the view is created
     */
    init: function() {
        this.getBloodSugarGrid();
    },

    getBloodSugarGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('bsstore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '5');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttBloodSugar)) {
                    healthtrackerStore.loadData(records[0].getData().ttBloodSugar);
                    return;
                }

                healthtrackerStore.removeAll();
            }
        });
    },

    addBS: function() {
        var bsModel = Ext.create('Atlas.portals.healthtracker.model.BloodSugarData', {
                Editable: true
            }),
            grid = this.lookupReference('bloodsugarGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, bsModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    editBS: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.BloodSugarData');
        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":5,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"dateBloodSugarReading\":\"" + me.formatDate(new Date(record.get('dateBloodSugarReading'))) + "\",\"dayTime\":\"" + record.get('dayTime') + "\",\"bloodsugarLevel\":\"" + record.get('bloodsugarLevel') +"\",\"notes\":\"" + record.get('notes') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved Blood Sugar Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getBloodSugarGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('Blood Sugar Error','An error occurred while saving the Blood Sugar record. \nError Code:' + response.status);
            }
        });
    },

    cancelBSEdit: function(context, row) {
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

    removeBS: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('bloodsugarGrid'),
            sel = grid.getSelectionModel().getSelected().items,
        record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.BloodSugarData'),
            healthtrackerStore = vm.getStore('bsstore');

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
                        "sectionID":5,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"dateBloodSugarReading\":\"" + me.formatDate(new Date(record.get('dateBloodSugarReading'))) + "\",\"dayTime\":\"" + record.get('dayTime') + "\",\"bloodsugarLevel\":\"" + record.get('bloodsugarLevel') +"\",\"notes\":\"" + record.get('notes') + "\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            //console.dir(obj);
                            Ext.Msg.alert('Success', 'Successfully Deleted Blood Sugar Record!! ', response.status);
                            me.getBloodSugarGrid();

                            var grid = me.lookupReference('bloodsugarGrid'),
                                bpStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the Blood Sugar record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditBS: function(context, row) {
        return row.record.get('Editable');
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});