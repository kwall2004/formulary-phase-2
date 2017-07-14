/**
 * Created by n6570 on 11/3/2016.
 */
Ext.define('Atlas.benefitplan.view.prescriberdrugoverride.PrescriberDrugOverrideController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-prescriberdrugoverridecontroller',
    init: function () {
        var me = this;
        var vm = this.getViewModel();
        this.SearchDrugOverrideListFilter = new Ext.util.Filter({
            property: 'PrescbrDrugOvrrdListName',
            value   : '',
            anyMatch:true
        });
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist= this.checkGridDirty();
        if (phantomRowsExist){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id){
                if (id === 'yes') {
                    panel.events.beforeclose.clearListeners();
                    panel.close();}
            });

        }else{
            panel.events.beforeclose.clearListeners();
            panel.close();
        }
        return false;
    },
    onSearch: function (value) {
        var vm = this.getViewModel();
        if(!value) {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Please enter search Text.',
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
        else {
            this.SearchDrugOverrideListFilter.setConfig('value', value);
            this.getReferences().refPrescriberDrugOverRideListGrid.getStore().addFilter(this.SearchDrugOverrideListFilter);
        }
    },
    onClear:function(){
        this.getReferences().refPrescriberDrugOverRideListGrid.getStore().removeFilter(this.SearchDrugOverrideListFilter);
    },
    onNPISelectionChange:function( combo , record , eOpts )
    {
        //Render firstName and last name of prescriber
        var row = combo.getStore().findRecord('PrescbrSK',record.data.PrescbrSK, 0, false, false, true);
        if(row != null && this.getReferences().refPrescriberDrugOverridesGrid.findPlugin('rowediting')) {
            this.getReferences().refPrescriberDrugOverridesGrid.findPlugin('rowediting').context.record.data.PrescbrSK = row.data.PrescbrSK;
            this.getReferences().refPrescriberDrugOverridesGrid.findPlugin('rowediting').context.record.data.PrescbrFirstName = row.data.PrescbrFirstName;
            this.getReferences().refPrescriberDrugOverridesGrid.findPlugin('rowediting').context.record.data.PrescbrLastName = row.data.PrescbrLastName;
        }
    },
    onSaveClick: function (button, record, e)
    {
        var isChanged = this.getViewModel().get('changed');
        var me = this;
        var store=this.getViewModel().getStore('prescriberdrugoverridelist');
        var currentUser=this.getViewModel().get('user').un;
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    if (isChanged) {
                        store.data.each(function (item, index, totalItems) {
                            if (item.dirty == true) {
                                item.PrescriberDrugOverrides().data.each(function (childitem, childindex, childtotalitems) {
                                    childitem.set('CurrentUser', currentUser);
                                });
                            }
                        });
                        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                            Ext.getBody().mask('Saving');
                        }
                        store.sync({ // save the record to the server
                            success: function (results, operation, success) {
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: 'Data saved successfully',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                                me.resetForm();
                            },
                            failure: function (results, operation, messages) {
                                Ext.Msg.show({
                                    title: 'Failed to Save',
                                    msg: 'Data failed to save:',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                            },
                            callback: function() {
                                Ext.getBody().unmask();
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Success',
                            msg: 'Data saved successfully',
                            buttons: Ext.Msg.OK,
                            closable: false,
                            draggable: false,
                            resizable: false
                        });
                    }
                }
            }
        });
    },
    onCancelClick: function() {
        var me = this;
        if(me.getViewModel().get('changed') ) {
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to cancel and lose your changes?',
                buttons : Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function(btn) {
                    if (btn == 'yes') {
                        me.resetForm();
                    }
                }
            });
        } else {
            me.resetForm();
        }
    },
    resetForm: function() {
        var me=this;
        me.getViewModel().set("changed", false);
       me.listaddedrow = false;
        me.childaddedrow = false;
        //me.getView().getViewModel().set("validform", true);

        var gridList = this.getReferences().refPrescriberDrugOverRideListGrid;
        gridList.findPlugin('rowediting').cancelEdit();
        gridList.store.reload();

        var grid = this.getReferences().refPrescriberDrugOverridesGrid;
        grid.findPlugin('rowediting').cancelEdit();
        grid.store.reload();
    },
    storeUpdated: function(store , record , operation , modifiedFieldNames , details , eOpts ) {
        this.getViewModel().set('changed', true);
    },
    onPrescrDrugListGridSelectionChange:function(model,selected,eOpts )
    {
        if(selected.length > 0) {
            this.getReferences().refPrescriberDrugOverridesGrid.reconfigure(selected[0].PrescriberDrugOverrides());
        }
    },
    onPrescrDrugListGridItemCancelEdit: function()
    {
        //if this was an added row, remove it
        var me=this;
        if (me.listaddedrow) {
            var store = me.getReferences().refPrescriberDrugOverRideListGrid.getStore();
            store.remove(store.getAt(0));
            me.listaddedrow = false;
        }
        me.getViewModel().set('editingListGrid', false);
    },
    onPrescrDrugListGridAddRowClick: function()
    {
        var vm = this.getViewModel();
        var store = vm.getStore('prescriberdrugoverridelist');
        var newRecord = new Atlas.benefitplan.model.PrescriberDrugOverrideList({'PrescriberDrugOverrides':[]});
        store.insert(0, newRecord);
        this.getReferences().refPrescriberDrugOverRideListGrid.findPlugin('rowediting').startEdit(newRecord, 0);
        this.listaddedrow = true;
    },
    onPrescrDrugListGridItemComplete: function(editor,e,opt)
    {
        var vm = this.getViewModel();
        this.listaddedrow = false;
        vm.set('editingListGrid', false);
        var phantomRowsExist= this.checkGridDirty(e.grid);
        vm.set('changed', phantomRowsExist);
        e.record.set('CurrentUser', vm.get('user').un);
    },
    checkGridDirty:function(grid){
        var phantomRowsExist = false;
        this.getView().query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.dirty) {
                    var keys = Object.keys(record.modified);
                    if(keys.length == 1 && keys[0] == 'CurrentUser')
                        phantomRowsExist = false;
                    else
                        phantomRowsExist = true;
                }
            });
        });
        return phantomRowsExist;
    },
    onPrescrDrugListGridValidateEdit:function(editor,context, eOpts){
        var me=this,
            vm=me.getViewModel(),
            result=true,
            store = me.getReferences().refPrescriberDrugOverRideListGrid.getStore();
        store.each(function(row){
                if (row.data.EfctvStartDt != null && row.data.EfctvEndDt != null && row.data.PrescbrDrugOvrrdListSK != context.record.data.PrescbrDrugOvrrdListSK
                    && row.data.PrescbrDrugOvrrdListName.toLowerCase() == context.newValues.PrescbrDrugOvrrdListName.toLowerCase()) {
                    if ((context.newValues.EfctvStartDt >= row.data.EfctvStartDt && context.newValues.EfctvStartDt <= row.data.EfctvEndDt) ||
                        (context.newValues.EfctvEndDt >= row.data.EfctvStartDt && context.newValues.EfctvEndDt <= row.data.EfctvEndDt)) {
                        Ext.Msg.show({
                            title: 'Error Information',
                            msg: 'Duplicate List Name! Please Change',
                            buttons: Ext.Msg.OK,
                            closable: false,
                            draggable: false,
                            resizable: false
                        });
                        result = false;
                        return false;
                    }
                }
        });
        return result;
    },
    onPrescrDrugListGridBeforeEdit: function(){
        this.getViewModel().set('editingListGrid', true);
    },
    onPrescriberdrugGridItemCancelEdit: function()
    {
        var me=this;
        if (me.childaddedRow) {
            var store = this.getReferences().refPrescriberDrugOverridesGrid.getStore();
            store.remove(store.getAt(0));
            me.childaddedRow = false;
        }
        me.getViewModel().set('editingChildGrid', false);
    },
    onPrescriberdrugGridItemComplete: function(editor,e,opt) {
        var me=this, vm = me.getViewModel(),
            parentRow = me.getReferences().refPrescriberDrugOverRideListGrid.getSelectionModel().getSelection()[0];
        me.childaddedRow = false;
        vm.set('editingChildGrid', false);
        vm.set('Changed', true);
        parentRow.set('CurrentUser', vm.get('user').un);
    },
    onprescriberdrugGridAddRowClick: function(){
        var me=this;
        var vm = me.getViewModel();
        var store = vm.getStore('prescriberdrugoverridelist');
        var getParentGrid = me.getReferences().refPrescriberDrugOverRideListGrid;
        var selected = getParentGrid.getSelectionModel();
        if (selected.hasSelection()) {
            var newChild = new Atlas.benefitplan.model.PrescriberDrugOverride({});
            var getChildStore = me.getReferences().refPrescriberDrugOverridesGrid.getStore();
            getChildStore.insert(0, newChild);
            me.getReferences().refPrescriberDrugOverridesGrid.findPlugin('rowediting').startEdit(newChild, 0);
            me.childaddedRow = true;
        }
    },
    onPrescribersGridItemValidateEdit:function(editor,context, eOpts){
        var me=this,
            vm=me.getViewModel(),
            result=true;
        var store = me.getReferences().refPrescriberDrugOverridesGrid.getStore();
        store.each(function(row){
            if(row.data.PrescbrDrugOvrrdDtlSK != context.record.data.PrescbrDrugOvrrdDtlSK) {
                if (row.data.EfctvStartDt != null && row.data.EfctvEndDt != null && row.data.PrescbrSK == context.record.data.PrescbrSK) {
                    if ((context.newValues.EfctvStartDt >= row.data.EfctvStartDt && context.newValues.EfctvStartDt <= row.data.EfctvEndDt) ||
                        (context.newValues.EfctvEndDt >= row.data.EfctvStartDt && context.newValues.EfctvEndDt <= row.data.EfctvEndDt)) {
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Cannot insert duplicate NPI',
                            buttons: Ext.Msg.OK,
                            closable: false,
                            draggable: false,
                            resizable: false
                        });
                        result = false;
                        return false;
                    }
                }
            }
        });
        return result;
    },
    onPrescribersdrugGridItemBeforeEdit: function() {
        this.getViewModel().set('editingChildGrid', true);
        var selRecord = this.getReferences().refPrescriberDrugOverRideListGrid.getSelectionModel().getSelection()[0];
        this.getViewModel().getStore('prescriberdrugoverrides').loadData([{'PrescbrSK':selRecord.data.PrescbrSK,
            'PrescbrFirstName':selRecord.data.PrescbrFirstName,
            'PrescbrLastName':selRecord.data.PrescbrLastName,
            'PrescbrNPI':selRecord.data.PrescbrNPI,
            'EfctvStartDt':selRecord.data.EfctvStartDt,
            'EfctvEndDt':selRecord.data.EfctvEndDt,
            'IsDeleted':selRecord.data.IsDeleted,
            'NDC':selRecord.data.NDC,
            'DrugLblName':selRecord.data.DrugLblName,
            'CurrentUser':selRecord.data.CurrentUser}]);
    },


    getNPIEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        var column = gridView.getGridColumns()[col],
            combo =  column.getEditor(),
            editorDisplayValue = '';
        try {
            editorDisplayValue = combo.getStore().findRecord(column.dataIndex, value, 0, false, false, true).get(combo.initialConfig.displayField)
        }
        catch(err){
            return record.data.PrescbrNPI;
        }
        return editorDisplayValue;
    }
});
