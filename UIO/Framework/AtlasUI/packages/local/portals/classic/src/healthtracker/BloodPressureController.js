/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.BloodPressureController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloodpressurecontroller',

    /**
     * Called when the view is created
     */
    init: function() {
        this.getBPGrid();

    },

    getBPGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('bpstore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '4');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttBloodPressure)) {
                    healthtrackerStore.loadData(records[0].getData().ttBloodPressure);
                    return;
                }

                healthtrackerStore.removeAll();
            }
        });
    },

    addBP: function() {
        var bpModel = Ext.create('Atlas.portals.healthtracker.model.BPData', {
                Editable: true
            }),
            grid = this.lookupReference('bpGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, bpModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);

    },

    editBP: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.BPData');
        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":4,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"dateBPReading\":\"" + this.formatDate(new Date(record.get('dateBPReading'))) + "\",\"systolic\":\"" + record.get('systolic') + "\",\"diastolic\":\"" + record.get('diastolic') +"\",\"pulse\":\"" + record.get('pulse') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved Blood Pressure and Pulse Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getBPGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('Blood Pressure Error','An error occurred while saving the Blood Pressure and Pulse record.\nError Code:' + response.status);
            }
        });
    },

    cancelBPEdit: function(context, row) {
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

    removeBP: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('bpGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.BPData'),
            healthtrackerStore = vm.getStore('bpstore');

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
                        "sectionID":4,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"dateBPReading\":\"" + me.formatDate(new Date(record.get('dateBPReading'))) + "\",\"systolic\":\"" + record.get('systolic') + "\",\"diastolic\":\"" + record.get('diastolic') +"\",\"pulse\":\"" + record.get('pulse') + "\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            //console.dir(obj);
                            Ext.Msg.alert('Success', 'Successfully Deleted Blood Pressure Record!! ', response.status);
                            me.getBPGrid();
                            var grid = me.lookupReference('bpGrid'),
                                bpStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the BP record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditBP: function(context, row) {
        return row.record.get('Editable');
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});