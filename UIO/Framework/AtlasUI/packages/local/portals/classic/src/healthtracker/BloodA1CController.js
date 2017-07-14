/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.BloodA1CController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.blooda1ccontroller',

    /**
     * Called when the view is created
     */
    init: function() {
        this.getA1CGrid();
    },

    getA1CGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('a1cstore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '7');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttHemoglobinA1C)) {
                    healthtrackerStore.loadData(records[0].getData().ttHemoglobinA1C);
                    return;
                }

                healthtrackerStore.removeAll();
            }
        });
    },

    editA1C: function(context, row) {
        var me = this,
        vm = me.getViewModel(),
        record = row.record,
        user = Ext.first('viewport').getViewModel().get('user'),
        healthtracker = Ext.create('Atlas.portals.healthtracker.model.BloodA1CData');
        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":7,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"dateHemoglobinA1CReading\":\"" + me.formatDate(new Date(record.get('dateHemoglobinA1CReading'))) + "\",\"hemoglobina1c\":\"" + record.get('hemoglobina1c') + "\",\"notes\":\"" + record.get('notes') +"\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved A1C Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getA1CGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('A1C Error','An error occurred while saving the A1C record. \nError Code:' + response.status);
            }
        });
    },

    addA1C: function() {
        var a1cModel = Ext.create('Atlas.portals.healthtracker.model.BloodA1CData', {
                Editable: true
            }),
            grid = this.lookupReference('a1cGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, a1cModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    cancelA1CEdit: function(context, row) {
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

    removeA1C: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('a1cGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.BloodA1CData'),
            a1cStore = vm.getStore('a1cstore');

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
                        "sectionID":7,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"dateHemoglobinA1CReading\":\"" + me.formatDate(new Date(record.get('dateHemoglobinA1CReading'))) + "\",\"hemoglobina1c\":\"" + record.get('hemoglobina1c') + "\",\"notes\":\"" + record.get('notes') +"\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            Ext.Msg.alert('Success', 'Successfully Deleted A1C Record!! ', response.status);
                            me.getA1CGrid();

                            var grid = me.lookupReference('a1cGrid'),
                                a1cStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }

                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the A1C record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditA1C: function(context, row) {
        this.getView().getViewModel().set('newRecord', false);
        return row.record.get('Editable');
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});