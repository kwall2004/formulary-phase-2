/**
 * Created by n6570 on 10/31/2016.
 */
Ext.define('Atlas.benefitplan.view.allowedprescribers.AllowedPrescribersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-allowedprescriberscontroller',
    init: function() {
        Ext.getBody().mask('Loading');
        var me = this,
            vm = this.getViewModel();
        me.refAllowedPrescribersListGrid = me.lookup('refAllowedPrescribersListGrid');
        me.refAllowedPrescribersGrid = me.lookup('refAllowedPrescribersGrid');
        me.SearchPresriberFilter = new Ext.util.Filter({
            property: 'AlwdPrescribersListName',
            value   : '',
            anyMatch:true
        });
        me.storeLoadCount = 0;
        me.storeTotalCount = 3;
        vm.getStore('allowedprescriberslist').load({callback: function(){
            me.connectGrids();
        }});
        vm.getStore('prescribers').load({callback: function(){
            me.connectGrids();
        }});
        vm.getStore('allowedprescribers').load({callback: function(){
            me.connectGrids();

        }});
    },
    /*
     * To avoid key display rather than value display in the grids with editable combos,
     * connects the grids to their respective data stores after all data stores have been loaded.
     * Unmasks the screen after all sata stores have been loaded.
     */
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        if (this.checkGridDirty()){
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
    connectGrids: function() {
        this.storeLoadCount++;
        if(this.storeLoadCount == this.storeTotalCount) {
            this.refAllowedPrescribersListGrid.reconfigure(this.getViewModel().getStore('allowedprescriberslist'));
            this.refAllowedPrescribersGrid.reconfigure(this.getViewModel().getStore('allowedprescribers'));
            Ext.getBody().unmask();
        }
    },
    /*
     * Generic method to show a message dialog to prevent repeated code
     */
    showMessage: function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            buttons: Ext.Msg.OK,
            closable: false,
            draggable: false,
            resizable: false
        });
    },
    onSearch: function(value) {
        if(!value) {
            this.showMessage('Message', 'Please enter search text');
        }
        else {
            this.SearchPresriberFilter.setConfig('value', value);
            this.refAllowedPrescribersListGrid.getStore().addFilter(this.SearchPresriberFilter);
        }
    },
    onClear:function() {
        this.refAllowedPrescribersListGrid.getStore().removeFilter(this.SearchPresriberFilter);
    },
    onNPISelectionChange:function(combo, record) {
        //Render firstName and last name of prescriber
        var row = combo.getStore().findRecord('PrescbrSK',record.data.PrescbrSK, 0, false, false, true),
            rowEditingPlugin = this.refAllowedPrescribersGrid.findPlugin('rowediting');
        if(row != null && rowEditingPlugin) {
            var rowEditingData = rowEditingPlugin.context.record.data,
                rowData = row.data;
            rowEditingData.PrescbrSK = rowData.PrescbrSK;
            rowEditingData.PrescbrFirstName = rowData.PrescbrFirstName;
            rowEditingData.PrescbrLastName = rowData.PrescbrLastName;
        }
    },
    onSaveClick: function() {
        var me = this,
            vm = me.getViewModel(),
            store=vm.getStore('allowedprescriberslist');
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    if (vm.get('changed')) {
                        store.data.each(function(item) {
                            if (item.dirty == true) {
                                item.AllowedPrescribers().data.each(function(childitem) {
                                    childitem.set('CurrentUser', vm.get('user').un);
                                });
                            }
                        });
                        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords())
                        {
                            Ext.getBody().mask('Saving');
                        }
                        store.sync({ // save the record to the server
                            success: function() {
                                me.showMessage('Success', 'Data saved successfully');
                                me.resetForm();
                            },
                            failure: function() {
                                me.showMessage('Failed to Save', 'Data failed to save');
                            },
                            callback: function() {
                                Ext.getBody().unmask();
                            }
                        });
                    }
                    else {
                        me.showMessage('Success', 'Data saved successfully');
                    }
                }
            }
        });
    },
    onPrescribersGridItemValidateEdit:function(editor, context){
        var me = this;
        this.refAllowedPrescribersGrid.getStore().each(function(row){
            if(row.data.AlwdPrescribersDtlSK != context.record.data.AlwdPrescribersDtlSK) {
                if (row.data.EfctvStartDt != null && row.data.EfctvEndDt != null && row.data.PrescbrSK == context.record.data.PrescbrSK) {
                        if ((context.newValues.EfctvStartDt <= row.data.EfctvEndDt) &&
                            (context.newValues.EfctvEndDt >= row.data.EfctvStartDt)) {
                        me.showMessage('Error', 'Cannot insert duplicate NPI');
                        return false;
                    }
                }
            }
        });
        return true;
    },
    onCancelClick: function(){
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
    resetForm: function(){
        this.getViewModel().set("changed", false);
        this.listaddedrow = false;
        var grid = this.refAllowedPrescribersListGrid,
            grids = this.refAllowedPrescribersGrid;
        grid.findPlugin('rowediting').cancelEdit();
        grid.store.reload();
        grids.findPlugin('rowediting').cancelEdit();
        grids.store.reload();
    },
    storeUpdated: function(){
        this.getViewModel().set('changed', true);
    },
    onAlwdPrescrbListGridSelectionChange:function(model,selected)
    {
        if(selected.length > 0) {
            this.lookup('refAllowedPrescribersGrid').reconfigure(selected[0].AllowedPrescribers());
        }
    },
    onAlwdPrescrbListGridBeforeEdit: function(){
        this.getViewModel().set('editingListGrid', true);
    },
    onAlwdPrescrbListGridItemCancelEdit: function(){
        //if this was an added row, remove it
        if (this.listaddedrow) {
            var store = this.refAllowedPrescribersListGrid.getStore();
            store.remove(store.getAt(0));
            this.listaddedrow = false;
        }
        this.getViewModel().set('editingListGrid', false);
    },

    onAlwdPrescrbListGridValidateEdit:function(editor, context){
        var me = this,
            result=true;
        me.refAllowedPrescribersListGrid.getStore().each(function(row){
            var rowstart = row.data.EfctvStartDt,
                rowend = row.data.EfctvEndDt,
                constart = context.newValues.EfctvStartDt,
                conend = context.newValues.EfctvEndDt;
            if(rowstart != null && rowend != null && row.data.AlwdPrescribersListSK !=  context.record.data.AlwdPrescribersListSK
            && row.data.AlwdPrescribersListName.toLowerCase()  == context.newValues.AlwdPrescribersListName.toLowerCase()){
                if((constart >= rowstart && constart <= rowend) ||
                    (conend >= rowstart && conend <= rowend)) {
                    me.showMessage('Error Information', 'Duplicate List Name! Please Change');
                    result = false;
                    return false;
                }
            }
            return result;
        });
        return result;
    },
    onAlwdPrescrbListGridAddRowClick: function() {
        var grid = this.lookup('refAllowedPrescribersListGrid'),
            newRecord = new Atlas.benefitplan.model.AllowedPrescribersList({'AllowedPrescribers':[]});
        grid.getStore().insert(0, newRecord);
        grid.findPlugin('rowediting').startEdit(newRecord, 0);
        this.listaddedrow = true;
    },
    onAlwdPrescrbListGridItemComplete: function(editor, e) {
            var vm = this.getViewModel();
            this.listaddedrow = false;
            vm.set('editingListGrid', false);
            vm.set('changed', this.checkGridDirty());
            e.record.set('CurrentUser', vm.get('user').un);
    },
    checkGridDirty:function(){
        var phantomRowsExist = false;
        this.getView().query('grid').forEach(function logArrayElements(element){
            element.store.each(function(record){
                if (record.dirty) {
                    var keys = Object.keys(record.modified);
                    phantomRowsExist = !(keys.length == 1 && keys[0] == 'CurrentUser');
                }
            });
        });
        return phantomRowsExist;
    },
    onPrescribersGridItemBeforeEdit: function() {
        this.getViewModel().set('editingChildGrid', true);
        var selRecord = this.refAllowedPrescribersListGrid.getSelectionModel().getSelection()[0].data;
        this.getViewModel().getStore('prescribers').loadData([{'PrescbrSK':selRecord.PrescbrSK,
            'PrescbrFirstName':selRecord.PrescbrFirstName,
            'PrescbrLastName':selRecord.PrescbrLastName,
            'PrescbrNPI':selRecord.PrescbrNPI,
            'EfctvStartDt':selRecord.EfctvStartDt,
            'EfctvEndDt':selRecord.EfctvEndDt,
            'IsDeleted':selRecord.IsDeleted,
            'CurrentUser':selRecord.CurrentUser}]);
    },
    onPrescribersGridItemCancelEdit: function() {
        if (this.childaddedRow) {
            var store = this.refAllowedPrescribersGrid.getStore();
            store.remove(store.getAt(0));
            this.childaddedRow = false;
        }
        this.getViewModel().set('editingChildGrid', false);
    },
    onPrescribersGridItemComplete: function() {
            var vm = this.getViewModel();
            this.childaddedRow = false;
            vm.set('editingChildGrid', false);
        this.refAllowedPrescribersListGrid.getSelectionModel().getSelection()[0].set('CurrentUser', vm.get('user').un);
    },
    onPrescribersGridAddRowClick: function(){
        if (this.refAllowedPrescribersListGrid.getSelectionModel().hasSelection()) {
            var newRecord = new Atlas.benefitplan.model.AllowedPrescribers({}),
                grid = this.refAllowedPrescribersGrid;
            grid.getStore().insert(0, newRecord);
            grid.findPlugin('rowediting').startEdit(newRecord, 0);
            this.childaddedRow = true;
        }
    },
    getNPIEditorDisplayValue: function (value, metaData, record, row, col, store, gridView) {
        /* j3703 10-10-2016 this function will find the store for the combobox specified in the editor config
         and search that store for the corresponding display value then return it*/
        var column = gridView.headerCt.getGridColumns()[col],
            combo =  column.getEditor(),
            comboStoreName = combo.initialConfig.bind.store,
            editorDisplayValue = '';
        //stores are sometimes specified with {}, these need to be removed for the getStore method to work
        comboStoreName = comboStoreName.replace('{', '').replace('}', '');
        try {
            editorDisplayValue = this.getViewModel().getStore(comboStoreName).findRecord(combo.valueField, value, 0, false, false, true).get(combo.initialConfig.displayField);
        }
        catch(err){
            return record.data.PrescbrNPI;
        }
        return editorDisplayValue;
    }
});