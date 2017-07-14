/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.HealthHeightWeightBMIController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.healthheightweightbmicontroller',

    /**
     * Called when the view is created
     */
    init: function() {

        var bmiArray = [
            ["18.5 or less", "Underweight"],
            ["18.5 to 24.99", "Normal weight"],
            ["25 to 29.99", "Overweight"],
            ["30 to 34.99", "Obesity (Class 1)"],
            ["35 to 39.99", "Obesity (Class 2)"],
            ["40 or greater", "Morbid Obesity"]
        ];
        var bmiRefStore = new Ext.data.ArrayStore({
            fields: ['bmi', 'bmiRange'],
            data: bmiArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });
        this.getViewModel().set('bmiRefStore', bmiRefStore);
        this.getBMIGrid();
    },


    getBMIGrid: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            bmistore = vm.getStore('bmistore');

        bmistore.getProxy().setExtraParam('pSessionID', user.sessionId);
        bmistore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        bmistore.getProxy().setExtraParam('pSectionID', '3');
        delete bmistore.getProxy().extraParams['ttmemberHealthTrackerData'];
        bmistore.load({
            callback: function (records, operation, success) {
                if(records && (records.length > 0) && records[0].getData() && (records[0].getData().ttStandardMeasures)) {
                    bmistore.loadData(records[0].getData().ttStandardMeasures);

                    bmistore.each(function (record) {
                        record.set('bmi', me.calculateBMI(record.get('height'), record.get('weight')));
                        record.set('bmirange', me.calculateBMIRange(record.get('bmi')));

                    });

                    return;
                }

                bmistore.removeAll();
            }
        });

    },

    addBMI: function() {
        var bmiModel = Ext.create('Atlas.portals.healthtracker.model.BMIData', {
                Editable: true
            }),
            grid = this.lookupReference('bmiGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, bmiModel);
        grid.editingPlugin.startEdit(0, 0);
        this.getView().getViewModel().set('newRecord', true);
    },

    cancelBMIEdit: function(context, row) {
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

    removeBMI: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('bmiGrid'),
            sel = grid.getSelectionModel().getSelected().items,
            record = sel[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtrackerSave = Ext.create('Atlas.portals.healthtracker.model.BMIData'),
            bmistore = vm.getStore('bmistore');

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
                        "sectionID":3,
                        "seqNum":record.get('seqNum'),
                        "markDelete":true,
                        "vitalsData":"[{\"measureDate\":\"" + me.formatDate(new Date(record.get('measureDate'))) + "\",\"weight\":\"" + record.get('weight') + "\", \"height\":\"" + record.get('height') + "\"}]"
                    }];

                    healthtrackerSave.getProxy().setExtraParam('pSessionID', user.sessionId);
                    healthtrackerSave.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
                    healthtrackerSave.save({
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            //console.dir(obj);
                            Ext.Msg.alert('Success', 'Successfully Deleted BMI Record!! ', response.status);
                            me.getBMIGrid();

                            var grid = me.lookupReference('bmiGrid'),
                                bmiStore = grid.getStore(),
                                selections = grid.getSelectionModel().getSelected().items;

                            grid.editingPlugin.cancelEdit();
                            if (!selections || selections.length === 0) {
                                Ext.Msg.alert('Information', 'Please select a row.');
                                return;
                            }
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert('Error','An error occurred while deleting the BMI record.\nError Code: ' + response.status);
                        }
                    });
                }
            }
        });
    },

    maybeEditBMI: function(context, row) {
        return row.record.get('Editable');
    },

    editBMI: function(context, row) {
        var me = this,
            vm = me.getViewModel(),
            record = row.record,
            user = Ext.first('viewport').getViewModel().get('user'),
            healthtracker = Ext.create('Atlas.portals.healthtracker.model.BMIData');
        healthtracker.phantom = false;
        var ttmemberHealthTrackerData = [{
            "recipientID":user.recipientId,
            "sectionID":3,
            "seqNum":record.get('seqNum'),
            "markDelete":false,
            "vitalsData":"[{\"measureDate\":\"" + me.formatDate(new Date(record.get('measureDate'))) + "\",\"weight\":\"" + record.get('weight') + "\", \"height\":\"" + record.get('height') + "\"}]"
        }];
        healthtracker.getProxy().setExtraParam('pSessionID', user.sessionId);
        healthtracker.getProxy().setExtraParam('ttmemberHealthTrackerData', {"ttmemberHealthTrackerData": ttmemberHealthTrackerData});
        healthtracker.save({
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Success',
                    msg: 'Successfully Saved BMI Records!!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                me.getBMIGrid();

            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.statusText);
                Ext.Msg.alert('BMI Error','An error occurred while saving the BMI record.\nError Code:' + response.status);
            }


        });

        record.set('bmi', me.calculateBMI(record.get('height'), record.get('weight')));
        record.set('bmirange', me.calculateBMIRange(record.get('bmi')));


    },


    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    },

    calculateBMI: function(height, weight) {
        var bmi = 0;
        if (height > 0 && weight > 0) {
            bmi = ((weight * 703) / (height * height));
        }

        bmi = parseFloat(Math.round(bmi * 100) / 100).toFixed(2);
        return bmi;
    },

    calculateBMIRange: function(bmi) {
        bmi = parseFloat(bmi);
        if (this.between(bmi, 0, 18.59))
            return "Underweight";
        if (this.between(bmi, 18.6, 24.99))
            return "Normal Weight";
        if (this.between(bmi, 25, 29.99))
            return "Over Weight";
        if (this.between(bmi, 30, 34.99))
            return "Obesity (Class 1)";
        if (this.between(bmi, 35, 39.99))
            return "Obesity (class 2)";
        if (bmi > 39.99)
            return "Morbid Obesity";
    },

    between: function(x, min, max) {
        return x >= min && x <= max;
    }

});