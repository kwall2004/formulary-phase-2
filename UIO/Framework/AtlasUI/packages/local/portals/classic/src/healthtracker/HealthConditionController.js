/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.HealthConditionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.healthconditioncontroller',

    /**
     * Called when the view is created
     */
    init: function() {
        this.getHealthConditionGrid();
    },

    getHealthConditionGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerStore = vm.getStore('healthrackerdatastore');

        healthtrackerStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtrackerStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        healthtrackerStore.getProxy().setExtraParam('pSectionID', '2');
        delete healthtrackerStore.getProxy().extraParams['ttmemberHealthTrackerData'];
        healthtrackerStore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttHealthConditions)) {
                    healthtrackerStore.loadData(records[0].getData().ttHealthConditions);

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

    addCondition: function() {
        var memberModel = Ext.create('Atlas.portals.healthtracker.model.HealthConditionData', {
                Editable: true
            }),
            grid = this.lookupReference('healthcareConditionsGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, memberModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    cancelConditionEdit: function(context, row) {
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

    removeCondition: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('healthcareConditionsGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.HealthConditionData'),
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
                        "sectionID":2,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"startSymptomDate\":\"" + me.formatDate(new Date(record.get('startSymptomDate'))) + "\",\"conditions\":\"" + record.get('conditions') + "\",\"concerned\":\"" + record.get('concerned') +"\",\"provider\":\"" + record.get('provider') + "\"}]"
                    }];
                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            //console.dir(obj);
                            Ext.Msg.alert('Success', 'Successfully Deleted Condition Record!! ', response.status);

                            me.getHealthConditionGrid();
                            //remove from store
                            var grid = me.lookupReference('healthcareConditionsGrid'),
                                conditionStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the Condition record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });

    },

    maybeEditCondition: function(context, row) {
        return row.record.get('Editable');
    },

    editCondition: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.HealthConditionData');

        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":2,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"startSymptomDate\":\"" + me.formatDate(new Date(record.get('startSymptomDate'))) + "\",\"conditions\":\"" + record.get('conditions') + "\",\"concerned\":\"" + record.get('concerned') +"\",\"provider\":\"" + record.get('provider') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved Conditions Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getHealthConditionGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('Condition Error','An error occurred while saving the Conditions record.\nError Code:' + response.status);
            }


        });

    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    }

});