/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.BloodCholesterolController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloodcholesterolcontroller',

    /**
     * Called when the view is created
     */
    init: function() {
        var cholesterolArray = [
            ["150 - 199", "Mildly High"],
            ["200 - 499", "High"],
            ["500 or higher", "Very High"],
            ["Less than 150", "Normal"]
        ];

        var cholesterolRefStore = new Ext.data.ArrayStore({
            fields: ['triglyceride', 'triglycerideCategory'],
            data: cholesterolArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });
        this.getViewModel().set('cholesterolRefStore', cholesterolRefStore);
        this.getBCGrid();
    },

    getBCGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('cholesterolstore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '6');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttCholesterol)) {
                    healthtrackerStore.loadData(records[0].getData().ttCholesterol);
                    healthtrackerStore.each(function (record) {
                        record.set('totalcholesterol', me.totalCholesterol(record.get('LDL'), record.get('HDL'), record.get('triglycerides')));
                    });

                    return;
                }

                healthtrackerStore.removeAll();
            }
        });
    },

    editCholesterol: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.CholesterolData');
        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":6,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"dateCholesterolReading\":\"" + me.formatDate(new Date(record.get('dateCholesterolReading'))) + "\",\"HDL\":\"" + record.get('HDL') + "\",\"LDL\":\"" + record.get('LDL') +"\",\"triglycerides\":\"" + record.get('triglycerides') + "\",\"notes\":\"" + record.get('notes') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved Cholesterol Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getBCGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('Cholesterol Error','An error occurred while saving the Cholesterol record. \nError Code:' + response.status);
            }
        });

        record.set('totalcholesterol', me.totalCholesterol(record.get('LDL'), record.get('HDL'), record.get('triglycerides')));
    },

    addCholesterol: function() {
        var cholesterolModel = Ext.create('Atlas.portals.healthtracker.model.CholesterolData', {
                Editable: true
            }),
            grid = this.lookupReference('cholesterolGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, cholesterolModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    cancelCholesterolEdit: function(context, row) {
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

    removeCholesterol: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('cholesterolGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.CholesterolData'),
            healthtrackerStore = vm.getStore('cholesterolstore');

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
                        "sectionID":6,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"dateCholesterolReading\":\"" + me.formatDate(new Date(record.get('dateCholesterolReading'))) + "\",\"HDL\":\"" + record.get('HDL') + "\",\"LDL\":\"" + record.get('LDL') +"\",\"triglycerides\":\"" + record.get('triglycerides') + "\",\"notes\":\"" + record.get('notes') + "\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            //console.dir(obj);
                            Ext.Msg.alert('Success', 'Successfully Deleted Cholesterol Record!! ', response.status);
                            me.getBCGrid();

                            var grid = me.lookupReference('cholesterolGrid'),
                                cholesterolStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the Cholesterol record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditCholesterol: function(context, row) {
        return row.record.get('Editable');
    },

    totalCholesterol: function(ldl, hdl, triglycerides) {
        var totalCholesterol = (parseInt(ldl) + parseInt(hdl)) + (parseInt(triglycerides) / 5);
        return totalCholesterol;
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});