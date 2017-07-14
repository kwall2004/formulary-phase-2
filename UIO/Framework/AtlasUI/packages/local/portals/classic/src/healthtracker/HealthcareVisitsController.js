/**
 * Created by m4542 on 10/26/2016.
 */
Ext.define('Atlas.portals.healthtracker.HealthcareVisitsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.healthcarevisitscontroller',



    /**
     * Called when the view is created
     */
    init: function() {
        this.getHealthcareVisitsGrid();
    },

    getHealthcareVisitsGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('healthrackerdatastore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '1');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttHealthCareVisit)) {
                    healthtrackerStore.loadData(records[0].getData().ttHealthCareVisit);
                    var hcProviderArray = [];

                    healthtrackerStore.each(function (record) {
                        var hcproviderRec = record.get('provider');
                        if (hcproviderRec == 'undefined') {
                            return;
                        }
                        var hcproviderFound = false;
                        for (i = 0; i < hcProviderArray.length; i++) {
                            if (hcProviderArray[i] == hcproviderRec) {
                                hcproviderFound = true;
                            }
                        }
                        if (!hcproviderFound) {
                            var hcproviderRecordArray = [hcproviderRec];
                            hcProviderArray[hcProviderArray.length] = hcproviderRecordArray;
                        }
                    });

                    var hcproviderStore = new Ext.data.ArrayStore({
                        data: hcProviderArray,
                        fields: ['providerdescription']
                    });

                    me.getViewModel().set('providerstore', hcproviderStore);
                    return;
                }

                healthtrackerStore.removeAll();

            }
        });
    },

    addVisit: function() {
        var healthtrackerDataModel = Ext.create('Atlas.portals.healthtracker.model.HealthcareVisitData', {
                Editable: true
            }),
            grid = this.lookupReference('healthcareVisitGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, healthtrackerDataModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    editVisit: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            index = row.rowIdx,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.HealthcareVisitData'),
            healthtrackerStore = vm.get('healthrackerdatastore');

        healthtracker.phantom = false;
        healthtracker.dirty = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":1,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"dateOfVisit\":\"" + this.formatDate(new Date(record.get('dateOfVisit'))) + "\",\"reasonforVisit\":\"" + record.get('reasonforVisit') + "\",\"provider\":\"" + record.get('provider') +"\",\"resultofVisit\":\"" + record.get('resultOfVisit') + "\",\"newPrescription\":" + record.get('newPrescription') + ",\"notes\":\"" + record.get('notes') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved Visit Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO,
                    fn: function(buttonId) {
                        if (buttonId == 'ok'){
                            if (record.get('newPrescription') === "on"){
                                Ext.Msg.alert('New Medication', 'Please enter new medication in Medication and Supplement screen! ');
                            }
                        }
                    }
                });

                me.getHealthcareVisitsGrid();
            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('Visit Error','An error occurred while saving the Visit record.\nError Code:' + response.status);
            }


        });

    },

    cancelVisitEdit: function(context, row) {
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

    removeVisit: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('healthcareVisitGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.HealthcareVisitData'),
            healthtrackerStore = vm.getStore('healthrackerdatastore');

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
                        "sectionID":1,
                        "markDelete": true,
                        "seqNum":record.get('seqNum'),
                        "vitalsData":"[{\"dateOfVisit\":\"" + me.formatDate(new Date(record.get('dateOfVisit'))) + "\",\"reasonforVisit\":\"" + record.get('reasonforVisit') + "\",\"provider\":\"" + record.get('provider') +"\",\"resultofVisit\":\"" + record.get('resultOfVisit') + "\",\"newPrescription\":" + record.get('newPrescription') + ",\"notes\":\"" + record.get('notes') + "\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            Ext.Msg.alert('Success', 'Successfully Deleted Visit Record!! ', response.status);
                            me.getHealthcareVisitsGrid();

                            var grid = me.lookupReference('healthcareVisitGrid'),
                                visitStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the Visit record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditVisit: function(context, row) {
        return row.record.get('Editable');
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});