/**
 * Created by d3973 on 9/27/2016.
 */
Ext.define('Atlas.admin.view.ClaimsRuleDefinitionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claimsruledefinitioncontroller',

    pVersion: 'D0', //holds the version state for save

    init: function () {
        var me = this,
            vm = this.getViewModel(),
            store0 = vm.get('ncpdpVersion'),
            store1 = vm.get('IfTrueStore'),
            store2 = vm.get('SegmentStore'),
            store3 = vm.get('DURRsnCodes');
            this.getViewModel().set('isFilterApplied',false);
        //ensure all the renderer stores are loaded prior to loading the list
        store0.load({
            callback: function () {
                store1.load({
                    callback: function () {
                        store2.load({
                            callback: function () {
                                store3.load({
                                    callback: function () {
                                        me.filterRules('D0')
                                    }
                                });
                            }
                        });
                    }
                })
            }
        });
        //vm.getStore('NCPDPErrorCodes').load();
        /*debugger;
         As of this moment, you are unable to individually set the checkbox configuration or filter configuration for filter
         var filters = this.getView().down('[reference=rulesgrid]').filters;
         var filter = filters.cmp.columns[7];
         var itemDefs = filter.getItemDefaults();*/
        //var config = filters[7].getInitialConfig();
        /*var NCPDPErrorCodes = vm.getStore('NCPDPErrorCodes');
         var NCPDPErrorCodesComb = vm.getStore('NCPDPErrorCodesComb');
         NCPDPErrorCodes.on('load',function(store , recordInfo , successful , operation , eOpts){
         debugger;
         for (var i=0;i<recordInfo.length;i++){


         var newRecord = Ext.create('Atlas.admin.model.claimdef.NCPDPErrorCode',{
         });
         newRecord.set('value',recordInfo[i].get('id') + ' - ' + recordInfo[i].get('value'));
         newRecord.set('id',recordInfo[i].get('id'));
         NCPDPErrorCodesComb.insert(i,newRecord);
         }

         });*/
        // NCPDPErrorCodes.load();
        /*var rd = vm.get('rulesDefinitions');
         rd.on('load',function(store , recordInfo , successful , operation , eOpts){
         //debugger;
         for (var i=0;i<recordInfo.length;i++){
         recordInfo[i].set('ttDURRsnName',me.DURReasonRenderer(recordInfo[i].get('ttDURRsnCode')));
         }
         });*/

    },
    onNCPDPSelect: function (combo, record) {
        this.filterRules(record.get('ListItem'));
    },
    onReject: function () {
        /*var grid = this.getView();
         var gridSelectedRows = grid.getSelection();
         var rec = gridSelectedRows[0];*/
        this.onRuleReject(this.getView().down('[reference=rulesgrid]').selection);
        /*var vm = this.getViewModel(),
         rec = vm.get('record');
         this.onRuleReject(rec);*/
    },
    onAdd: function () {
        var plugin = this.getView().down('[reference=rulesgrid]').getPlugin();
        if (plugin.editing)
            return;
        else {
            var store = this.getViewModel().get('rulesDefinitions'),
                newRecord = Ext.create('Atlas.admin.model.ClaimEditRules', {});
            store.insert(0, newRecord);
            this.getView().down('[reference=rulesgrid]').getPlugin().startEdit(newRecord);
        }

    },

    onDisable: function () {
        var rec = this.getView().down('[reference=rulesgrid]').selection;
        if (rec && rec.get('ttActive')) {
            rec.set('ttActive', false);
            rec.set('isNeedUpdate', true);
        }
    },

    onRuleBeforeSelect: function (grid, record) {
        var plugin = this.getView().down('[reference=rulesgrid]').getPlugin();
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
    },

    onRuleSelect: function (grid, record) {
        var vm = this.getViewModel(),
            refs = this.getReferences();//,
        //store = vm.get('ConditionsStore');

        //since we potentially have a large transaction we need to save all the edits in each store.
        if (record.get('hasGrid')) {
            refs.conditions.setActiveItem(refs.conditions.down('[ruleId=' + record.get('ttRuleID') + ']'));
        } else {
            this.createGrid(record);
        }
    },

    createGrid: function (record) {
        var refs = this.getReferences(),
            grid = Ext.create('Atlas.admin.view.ClaimsRuleConditions', {
                title: record.get('ttRuleName') + ' Conditions',
                ruleId: record.get('ttRuleID')  //way to find grid in card stack
            });

        grid.getStore().getProxy().setExtraParam('pRuleID', record.get('ttRuleID'));
        grid.getStore().load({
            callback: function () {
                refs.conditions.add(grid);
                //show the gid in the south panel
                refs.conditions.setActiveItem(grid);
                record.set('hasGrid', true);
            }
        });


    },
    ncpdpErrorRenderer: function (value) {
        //probably superfluous
        var newVal = this.getViewModel().getStore('NCPDPErrorCodes').findRecord('id', value);
        if (!newVal)
            return '';
        else
            return id + ' - ' + newVal.get('vae');
    },
    drugDataSourceRenderer: function (value) {
        var newVal = this.getViewModel().getStore('ClaimDataSourceStore').findRecord('ListItem', value);
        if (!newVal)
            return '';
        else
            return newVal.get('ListDescription');
    },
    DURReasonRenderer: function (value) {
        if (value === 0 || !this.getViewModel().get('DURRsnCodes') || !this.getViewModel().get('DURRsnCodes').findRecord('ListItem', value)) {
            return '';
        } else {
            return this.getViewModel().get('DURRsnCodes').findRecord('ListItem', value).get('ListDescription');
        }
    },

    segmentRenderer: function (value) {
        if (value === 0 || !this.getViewModel().get('SegmentStore') || !this.getViewModel().get('SegmentStore').findRecord('ListItem', value)) {
            return '';
        } else {
            return this.getViewModel().get('SegmentStore').findRecord('ListItem', value).get('ListDescription');
        }
    },

    ifTrueDoWhatRenderer: function (value) {
        if (value === 0 || !this.getViewModel().get('IfTrueStore') || !this.getViewModel().get('IfTrueStore').findRecord('ListItem', value)) {
            return '';
        } else {
            return this.getViewModel().get('IfTrueStore').findRecord('ListItem', value).get('ListDescription');
        }
    },

    filterRules: function (value) {
        var vm = this.getViewModel(),
            rulesDefs = vm.get('rulesDefinitions');
        if (rulesDefs) {
            rulesDefs.getProxy().setExtraParam('pVersion', value);
            rulesDefs.load();
            this.getReferences().conditions.removeAll();
        }
        this.pVersion = value; //save the version for save
    },

    onBeforeRuleEdit: function (editor, context) {
        var plugin = this.getView().down('[reference=rulesgrid]').getPlugin();
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
        else if (context.record.get('ttActive')) {
            Ext.Msg.alert('Active Rule', 'This rule is active and can not be edited.');
            return false;
        }
    },

    onCancelRuleEdit: function (editor, context) {
        if (context.record.get('ttRuleID') === 0) {
            this.getViewModel().get('rulesDefinitions').remove(context.record);
        }
    },

    onRuleEdit: function (editor, context) {
        if (context.record.dirty) {
            context.record.set('isNeedUpdate', true);
        }
    },

    onRuleReject: function (rec) {
        var refs = this.getReferences(),
            grid;

        //undo any changes to conditions
        //if (rec.get('hasGrid')) {
        grid = refs.conditions.down('[ruleId=' + rec.get('ttRuleID') + ']');
        if (grid) {
            grid.getStore().load();
        }
        //}

        //undo any changes to the record
        rec.reject();

        //reset the state
        rec.set('isNeedUpdate', false);

    },

    onSave: function () {
        var me = this,
            vm = this.getViewModel(),
            rulesDefs = vm.get('rulesDefinitions'),
            plugin = me.getView().down('[reference=rulesgrid]').getPlugin();
        if (me.isDirtyStore(rulesDefs)) {
            if (plugin.editing) {
                Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
                return;
            }
            else {


                Ext.Msg.confirm('Confirm', 'Are you sure you would like to save changes?', function (btn) {
                    if (btn == 'no') {
                        rulesDefs.load();
                        me.getReferences().conditions.removeAll();
                    }
                    else {

                        rulesDefs.each(
                            function (record, index) {
                                //only process records that need updating
                                if (record.get('isNeedUpdate')) {
                                    var refs = this.getReferences(),
                                        conditionsGrid = refs.conditions.down('[ruleId=' + record.get('ttRuleID') + ']'),
                                        store = conditionsGrid.getStore(),
                                        conditions = [];

                                    //check if conditions changed
                                    if (record.get('hasGrid') && conditionsGrid.getStore().needsSync) {

                                        for (var i in store.data.items) {
                                            var item = store.data.items[i];
                                            if (item.dirty) {
                                                conditions.push({
                                                    "ttConditionID": item.get('ttConditionID'),
                                                    "ttCondition": item.get('ttCondition'),
                                                    "ttField": item.get('ttField'),
                                                    "ttValue": item.get('ttValue'),
                                                    "ttOperator": item.get('ttOperator')
                                                });
                                            }
                                        }
                                    }
                                    this.doSave(record, conditions);
                                    store.commitChanges();

                                }
                            }, me/*scope*/);
                    }
                });
            }
        }
    },

    doSave: function (record, conditions) {
        var grid = this.getView().down('[reference=rulesgrid]');
        var selection = grid.getSelection();
        var selectedItem = grid.getStore().find('ttRuleID', record.get('ttRuleID'));


        var me = this,
            refs = this.getReferences(),
            conditionsCard = refs.conditions,
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
            params = {
                pRuleID: record.get('ttRuleID'),
                pVersion: me.pVersion,
                pFieldList: 'Active|claimAlert|RuleName|RuleLevel|RuleSequence|SegmentID|dataSource|TransactionType|IfTrueDoWhat|NcpdpErrorCode|secNcpdpErrorCode|DURRsnCode|InternalDesc|EffDate|TermDate',
                TTConditions: {
                    TTConditions: conditions
                },
                pData: record.get('ttActive') + '|' + record.get('ttAlert') + '|' + record.get('ttRuleName') + '|' + record.get('ttRuleLevel') + '|' + record.get('ttRuleSeq') + '|' + record.get('ttSegmentID') + '|' + record.get('ttdataSource') + '|' + record.get('ttTransactionType') + '|' + record.get('ttIfTrueDoWhat') + '|' + record.get('ttNCPDPerrCd') + '|' + record.get('ttsecNCPDPerrC') + '|' + record.get('ttDURRsnCode') + '|' + record.get('ttErrintDesc') + '|' + Ext.Date.format(record.get('ttEffdate'), 'n/j/Y') + '|' + Ext.Date.format(record.get('ttTermDate'), 'n/j/Y')
            },
            returnFields = [];

        var saveData = Atlas.common.utility.Utilities.saveData(
            [], //stores array of stores
            'claims/rx/claimeditrules/update', //url
            null, //temptablenames
            [false], //trackingRemoved
            params, //extraParams
            saveAction, //saveactions
            returnFields //returnfields
        );

        if (saveData != null && saveData.message == "Successful") {
            var vm = this.getViewModel(),
                store = vm.get('rulesDefinitions');

            store.load({
                callback: function () {
                    //conditionsCard.removeAll();
                    //record.set('isNeedUpdate',false);
                    if (record.get('hasGrid')) {
                        record.set('hasGrid', false);
                        var conditionGrid = refs.conditions.down('[ruleId=' + record.get('ttRuleID') + ']');
                        refs.conditions.remove(conditionGrid);
                    }
                    //grid.getSelectionModel().select(selection);
                    grid.getSelectionModel().select(selectedItem);
                }
            });

        }
    },

    onActiveChange: function (checkbox, newValue) {
        if (newValue) {
            //var refs = this.getReferences();
            if (!checkbox.up().down('[name=ttEffdate]').getValue()) {
                Ext.defer(function () {
                    checkbox.setValue(false)
                }, 300);
                Ext.Msg.alert('PBM', 'Effective Date is required before the rule can be activated. This rule is set to in-active mode.');
                return;

            }
            //var rulesDefs = vm.get('rulesDefinitions');
            var refs = this.getReferences();
            var rulesgrid = this.getView().lookupReference('rulesgrid').getSelection()[0];
            var x = rulesgrid.get('ttRuleID');

            var conditionsGrid = refs.conditions.down('[ruleId=' + x + ']');
            var store = conditionsGrid.getStore();
            if (store.count() == 0) {
                Ext.defer(function () {
                    checkbox.setValue(false)
                }, 300);
                Ext.Msg.alert('Rule Validation Error', 'Required atleast one condition to activate this rule.');
                return;
            }


            var ruleId = checkbox.up().form.getRecord().get('ttRuleID'),
                saveData = Atlas.common.utility.Utilities.saveData(
                    [], //stores array of stores
                    'claims/rx/validateclaimrule/read', //url
                    null, //temptablenames
                    [false], //trackingRemoved
                    {
                        pRuleId: ruleId
                    }, //extraParams
                    [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                    [] //returnfields
                );
            if (saveData.message !== "Successful") {
                Ext.defer(function () {
                    checkbox.setValue(false)
                }, 300);
            }

        }
    },

    onClearFilters: function () {
        var grid = this.getView().down('[reference=rulesgrid]');
        grid.clearFilters();
        for(var i=1;i<=13;i++)
        {
            if((i==3||i==12)&& i!=5)
            {
                grid.columns[i].items.items[0].setValue("");
            }
            else if(i!=5)
            {
                grid.columns[i].items.items[0].clearValue();
            }
        }
        this.getViewModel().set('isFilterApplied',false);
        grid.store.clearFilter(true);
        grid.store.load();
        this.getReferences().conditions.removeAll();
    },

    isDirtyStore: function (theStore) {
        var isDirty = false;
        theStore.each(function (item) {
            if (item.dirty == true) {
                for (var propertyName in item.modified) {
                    if (propertyName === 'isNeedUpdate') {
                        isDirty = true;
                    }
                }
            }
        });
        if (!isDirty) {
            isDirty = (theStore.removed.length > 0);
        }
        return isDirty;
    }
});