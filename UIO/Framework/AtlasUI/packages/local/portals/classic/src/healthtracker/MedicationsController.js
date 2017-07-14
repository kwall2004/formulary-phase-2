/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.MedicationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.medicationscontroller',

    /**
     * Called when the view is created
     */
    init: function() {
        this.getMedsGrid();
    },

    getMedsGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('medstore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '8');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttMedicationsandsupplements)) {
                    healthtrackerStore.loadData(records[0].getData().ttMedicationsandsupplements);
                    return;
                }

                healthtrackerStore.removeAll();
            }
        });
    },

    editMed: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.MedicationsData');
        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":8,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"medicineName\":\"" + record.get('medicineName') + "\",\"strength\":\"" + record.get('strength') + "\",\"dosage\":\"" + record.get('dosage') +"\",\"frequency\":\"" + record.get('frequency') + "\",\"dateMedicationStart\":\"" + me.formatDate(new Date(record.get('dateMedicationStart'))) + "\", \"reasonForTaking\":\"" + record.get('reasonForTaking') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved Meds and Supplement Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getMedsGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('Meds and Supplement Error','An error occurred while saving the Meds and Supplement record. \nError Code:' + response.status);
            }
        });
    },

    addMeds: function() {
        var medModel = Ext.create('Atlas.portals.healthtracker.model.MedicationsData', {
                Editable: true
            }),
            grid = this.lookupReference('medGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, medModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    cancelMedEdit: function(context, row) {
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

    removeMeds: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('medGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.MedicationsData'),
            healthtrackerStore = vm.getStore('medstore');

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
                        "sectionID":8,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"medicineName\":\"" + record.get('medicineName') + "\",\"strength\":\"" + record.get('strength') + "\",\"dosage\":\"" + record.get('dosage') +"\",\"frequency\":\"" + record.get('frequency') + "\",\"dateMedicationStart\":\"" + me.formatDate(new Date(record.get('dateMedicationStart'))) + "\", \"reasonForTaking\":\"" + record.get('reasonForTaking') + "\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            //console.dir(obj);
                            Ext.Msg.alert('Success', 'Successfully Deleted Meds and Supplement Record!! ', response.status);
                            me.getMedsGrid();

                            var grid = me.lookupReference('medGrid'),
                                medStore = grid.getStore('medstore'),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the Meds and Supplement record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditMed: function(context, row) {
        return row.record.get('Editable');
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});