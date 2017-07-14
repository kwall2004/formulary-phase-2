/**
 * Created by S4505 on 11/7/2016.
 */
Ext.define('Atlas.pharmacy.view.dispensingfee.DispensingFeeRuleDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dispensingfeeruledtlgrid',

    init: function () {
        var me = this,
            vw = me.getView(),
            vm = me.getViewModel();
    },

    cbxListItemsRenderer: function (value, storeId, keyName, displayFieldName) {
        if (value != null) {
            //debugger;
            var theStore = this.getViewModel().get(storeId);
            if (theStore != null) {
                var theRecord = theStore.findRecord(keyName, value);
                if (theRecord != null) {
                    var theDisplayField = theRecord.get(displayFieldName);
                    if (theDisplayField != null)
                        return theDisplayField;
                }
            }
        }
    },

    onRemove: function () {
        var me = this,
            vw = me.getView(),
            vm = me.getViewModel(),
            grid = vw.down('#dispensingFeeRuleDetailGrid'),
            store = vm.getStore('dispFeeRulesDetail'),
            plugin = grid.findPlugin('rowediting'),
            sm = grid.getSelectionModel();

        if (plugin.editing) {
            me.checkForCurrentEdits(plugin);
            return;
        }
        sm.getSelection()[0].data.IsDeleted = true;
        grid.store.remove(sm.getSelection());
        this.getViewModel().set('changed', true);
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
        else {
            vm.set('canRemove', false);
        }
    },

    onAdd: function () {
        var me = this,
            vw = me.getView(),
            vm = me.getViewModel(),
            grid = vw.down('#dispensingFeeRuleDetailGrid'),
            store = vm.getStore('dispFeeRulesDetail'),
            plugin = grid.findPlugin('rowediting'),
            newRecord = new Atlas.pharmacy.model.DispFeeRuleDetail();

        if (!grid.addedRow) {
            if (plugin.editing) {
                me.checkForCurrentEdits(plugin);
                return;
            }
            else {
                // Set up Record for Insert
                newRecord.data.SystemID = 0;
                newRecord.set('isNew', true);
                store.insert(0, newRecord);
                plugin.startEdit(0);
                this.addedRow = true;
            }
        }
    },

    onSaveClick: function (button) {
        var me = this,
            vw = me.getView(),
            vm = me.getViewModel(),
            grid = vw.down('#dispensingFeeRuleDetailGrid'),
            store = vm.getStore('dispFeeRulesDetail'),
            plugin = grid.findPlugin('rowediting');

        if (plugin.editing) {
            me.checkForCurrentEdits(plugin);
            return;
        }
        this.saveList();
    },

    saveList: function () {
        var me = this;
        var vm = this.getViewModel(),
            gridStore = vm.getStore('dispFeeRulesDetail'),
            wDispFeeRuleId = vm.data.selDispFeeRuleId;

        if (gridStore != null) {
            var wTxnMode = '',
                ttDispFeeRuleDetailArray = [],
                crudRecs = gridStore.getModifiedRecords(),
                removedRecs = gridStore.getRemovedRecords(),
                crudRecs = removedRecs.concat(crudRecs);

            if (crudRecs.length <= 0) {
                Ext.Msg.alert('Message', 'There are no record(s) to Process currently.');
                return;
            }

            var i = 0;

            while (i < crudRecs.length) {
                wTxnMode = "";
                var crudRec = crudRecs[i];
                if (crudRec.data.IsDeleted) {
                    wTxnMode = "D";
                }
                else {
                    if (crudRec.data.isNew) {
                        wTxnMode = "A";
                    }
                    else {
                        wTxnMode = "U";
                    }
                }

                if (crudRec.data.SystemID == null || crudRec.data.SystemID == "" || crudRec.data.SystemID == 0 || crudRec.data.SystemID == "0") {
                    crudRec.data.SystemID = 0;
                }

                var ttDispFeeRuleMasterObj = new Object();
                ttDispFeeRuleMasterObj.RecordMode = wTxnMode;
                ttDispFeeRuleMasterObj.DispFeeRuleID = wDispFeeRuleId;
                ttDispFeeRuleMasterObj.Maintenance = crudRec.data.Maintenance;
                ttDispFeeRuleMasterObj.DrugType = crudRec.data.DrugType;
                ttDispFeeRuleMasterObj.OTCInd = crudRec.data.OTCInd;
                ttDispFeeRuleMasterObj.RangeBasis = crudRec.data.RangeBasis;
                ttDispFeeRuleMasterObj.RangeFrom = crudRec.data.RangeFrom;
                ttDispFeeRuleMasterObj.RangeTo = crudRec.data.RangeTo;
                ttDispFeeRuleMasterObj.DispFee = crudRec.data.DispFee;
                ttDispFeeRuleMasterObj.SystemID = crudRec.data.SystemID;

                ttDispFeeRuleDetailArray.push(ttDispFeeRuleMasterObj);
                i++;
            }

            // -----------------------------------------
            // #2 Convert Array to JSON without Leading "
            // -----------------------------------------
            const mySingleJSONArrayWithNoQuotes = ttDispFeeRuleDetailArray;
            var dispFeeRuleDetailModel = Ext.create('Atlas.pharmacy.model.DispFeeRuleDetail', {});
            dispFeeRuleDetailModel.phantom = false;
            dispFeeRuleDetailModel.getProxy().setExtraParam('pDispFeeRuleID', wDispFeeRuleId);
            dispFeeRuleDetailModel.getProxy().setExtraParam('ttDispFeeRuleDetail', {"ttDispFeeRuleDetail": mySingleJSONArrayWithNoQuotes});

            dispFeeRuleDetailModel.save({
                scope: me,
                success: function (record, operation, success, message) {
                    var retMessage = '';
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        retMessage = 'Dispensing fees details successfully updated.';
                    }
                    else {
                        retMessage = objResp.message[0].message;
                    }

                    Ext.MessageBox.show({
                        title: 'PBM',
                        msg: retMessage,
                        buttons: Ext.MessageBox.OK
                    });

                    gridStore.reload();
                    vm.set('canRemove', false);
                }
            });
        }
    },

    onBtnReject: function (button) {
        var record = button.getViewModel().data.record;
        if (!record.phantom) {
            record.reject();
        }
        else {
            var vw = this.getView(),
                grid = vw.down('#dispensingFeeRuleDetailGrid'),
                plugin = grid.findPlugin('rowediting');
            grid.store.remove(record);
            plugin.cancelEdit();
        }
    },

    onCancelEdit: function (editor, context) {
        if (context.record.phantom)
            context.grid.store.removeAt(context.rowIdx);
        else
            context.record.reject();
        this.addedRow = false;
    },

    completeEdit: function (editor, context) {
        var me = this,
            vw = me.getView(),
            vm = me.getViewModel(),
            grid = vw.down('#dispensingFeeRuleDetailGrid'),
            gridColumns = grid.headerCt.getGridColumns();

        if ((Object.keys(context.record.getChanges()).length == 1) && context.record.getChanges().isUpdated) {
            context.record.set('isUpdated', false);
        }
        else {
            context.record.set('isUpdated', true);
        }
        var curSelModel = grid.getSelectionModel().getSelection()[0];
        var curRow = grid.getSelectionModel().getSelection()[0];
        this.addedRow = false;
    },

    checkForCurrentEdits: function (plugin) {
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit of current record before proceeding.');
        }
    },

    onGridRowSelect: function (me, record) {
        var vm = this.getViewModel();
        if (record.get('SystemID') !== 0) {
            vm.set('canRemove', true);
        }
    }
});