Ext.define('Atlas.admin.view.ClaimsRuleConditionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claimsruleconditionscontroller',


    getRulesRecord: function () {
        var grid = this.getView().up('admin-ClaimsRuleDefinition').down('[reference=rulesgrid]');
        if (grid) {
            return grid.getSelection()[0];
        }
    },
    blankRenderer: function (value) {
        return '';
    },
    canEdit: function () {
        if (this.getRulesRecord())
            return !this.getRulesRecord().get('ttActive');
        else
            return false;
    },

    onBeforeEdit: function (editor, context) {
        if (!this.canEdit()) {
            Ext.Msg.alert('Active Rule', 'This rule is active and can not be edited.');
            return false;
        }
    },

    onEdit: function (editor, context) {
        if (context.record.dirty) {
            this.getRulesRecord().set('isNeedUpdate', true);
        }
        this.getView().lookupReference('addButton').setDisabled(false);
    },

    onCancelEdit: function (editor, context) {
        if (context.record.get('ttConditionID') === 0) {
            this.getView().getStore().remove(context.record);
        }
        this.getView().lookupReference('addButton').setDisabled(false);
    },

    onAdd: function () {
        var me = this,
            grid = me.getView(),
            store = grid.getStore();
        if (grid.getPlugin().editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return;
        }
        else {
            var newRecord = Ext.create('Atlas.admin.model.claimdef.Conditions', {
                ttConditionID: 0,
                ttRuleID: grid.ruleId,
                ttCondition: '',
                ttField: null,
                ttValue: null,
                ttOperator: ''
            });

            if (!this.canEdit()) {
                Ext.Msg.alert('Active Rule', 'This rule is active and can not be edited.');
                return false;
            } else {
                store.insert(0, newRecord);
                grid.getPlugin().startEdit(newRecord);
                this.getView().lookupReference('addButton').setDisabled(true);
            }
        }

    },

    onRemove: function () {
        var me = this,
            grid = me.getView(),
            record = this.getRulesRecord(),
            saveData,
            params,
            store = grid.getStore();
        var gridSelected;

        if (!grid.getSelection()[0]) {
            Ext.Msg.alert('Validation', 'Please select a record first.');
            return false;
        }
        else {
            gridSelected = grid.getSelection()[0];
        }

        if (gridSelected.get('ttConditionID') === 0) {
            store.remove(gridSelected);
            if (store.data.length > 0) {
                this.getRulesRecord().set('isNeedUpdate', false);
            }
            return false;
        }

        if (!this.canEdit()) {
            Ext.Msg.alert('Active Rule', 'This rule is active and can not be edited.');
            return false;
        } else {
            saveData = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'claims/rx/delclaimeditconditions/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                {
                    pRuleID: record.get('ttRuleID'),
                    pConditionID: gridSelected.get('ttConditionID'),
                    pVersion: me.pVersion
                }, //extraParams
                [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                [] //returnfields
            );

            if (saveData != null && saveData.message == "Record Deleted.") {
                store.load({
                    callback: function () {
                    }
                });

            }
        }
    },

    onConditionFilterSelect: function (combo, record) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.get('FieldsFunctionsStore');

        me.getView().lookupReference('cbxFieldFunction').setValue('');

        store.getProxy().setExtraParam('pMode', record.get('value'));
        store.load();
    },

    normalizeFieldsFunctions: function (store, records, successful, operation) {
        if (records.length > 0) {
            for (var i in records) {
                var item = records[i],
                    text, value;
                if (item.get('fld-Label')) {
                    text = item.get('fld-Label') + ' - ' + item.get('tbl-name') + '.' + item.get('fld-name');
                    value = item.get('tbl-name') + '.' + item.get('fld-name');
                }
                item.set('tDesc', text);
                item.set('tItem', value);
            }
            //store.loadRawData(records);
        } else {
            var meta = store.getExtraData();
            if (meta.ttlists && meta.ttlists.ttlists.length > 0) {
                for (var i in meta.ttlists.ttlists) {
                    var item = meta.ttlists.ttlists[i],
                        text, value;

                    if (item['tDesc']) {
                        text = item['tDesc'] + ' - ' + item['tItem'];
                        // value = item.get('fld-name');
                    }

                    item['tDesc'] = text;
                    // item.set('tItem', value);
                }
                store.loadRawData(meta.ttlists.ttlists);
            }
        }
    },

    onValueFilterSelect: function (combo, record) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.get('ValuesFunctionsStore');
        me.getView().lookupReference('cbxValue').setValue('');
        store.getProxy().setExtraParam('pMode', record.get('value'));
        store.load();
    },

    rendererFieldFunction: function (value) {
        if (!value) {
            return '';
        }
        else {
            var vm = this.getViewModel(),
                storeFieldsFunctionsStore = vm.getStore('FieldsFunctionsStore'),
                idx = storeFieldsFunctionsStore.find('tItem', value),
                rec = storeFieldsFunctionsStore.getAt(idx);
            if (rec) {
                return rec.get('tDesc');
            }
            else {
                return value;
            }
        }
    },

    rendererValueFunction: function (value) {
        if (!value) {
            return '';
        }
        else {
            var vm = this.getViewModel(),
                storeFieldsFunctionsStore = vm.getStore('ValuesFunctionsStore'),
                idx = storeFieldsFunctionsStore.find('tItem', value),
                rec = storeFieldsFunctionsStore.getAt(idx);
            if (rec) {
                return rec.get('tDesc');
            }
            else {
                return value;
            }
        }
    },

    onFieldFunctionSelect: function (combo, record) {
        var me = this,
            grid = me.getView(),
            colHeader = 'Value';

        if (record.get('fld-DATA-TYPE')) {
            colHeader = 'Value should be <font color=red>' + record.get('fld-DATA-TYPE') + '</font> type';
        }
        grid.columns[5].setText(colHeader);
    }
});