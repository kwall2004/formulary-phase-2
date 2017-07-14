Ext.define('Atlas.admin.view.PBMErrorsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-pbmerrorscontroller',

    init: function(){
        var me = this,
            storeErrorList = me.retrieveStore('errorList'),
            storeErrorDetail = me.retrieveStore('errorDetail'),
            storeCbxErrorSource = me.retrieveStore('cbxErrorSource');

        storeErrorDetail.getProxy().setExtraParam('pagination', true);

        storeErrorList.load();
        storeCbxErrorSource.load({
            params: {
                pListName: 'PBMErrorSource'
            }
        });
    },

    beforeSelectErrorList: function(rowModel, record){
        var me = this,
            view = me.getView(),
            prevSelErrorList = view.prevSelErrorList,
            placeHolderErrorList = view.placeHolderErrorList,
            removedRecords = me.retrieveStore('errorList').getRemovedRecords();

        /*
        the following is meant to hold the previously selected errorList record in the chance the
        user selects a new record without saving changes and needs to go back to the previous record
         */
        for(var idx = 0, length = removedRecords.length; idx < length; idx = idx + 1){
            /*
            for if user removes a record, selects a new record, and selects "no" when asked to save;
            upon clicking no, no record in the grid will be selected
             */
            if (removedRecords[idx] === prevSelErrorList){
                view.placeHolderErrorList = record;
                return;
            }
        }
        if(!(prevSelErrorList) && !(placeHolderErrorList)){
            view.placeHolderErrorList = record;
        }
        else {
            view.prevSelErrorList = view.placeHolderErrorList;
            view.placeHolderErrorList = record;
        }
    },

    onSelectErrorList: function(rowModel, model){
        var me = this,
            storeErrorList = me.retrieveStore('errorList'),
            storeErrorDetail = me.retrieveStore('errorDetail'),
            errors = false;

        if(!model.phantom)
            errors = me.errorCheck(storeErrorList, storeErrorDetail, me.getView().down('#errorListGrid'));

        if (!errors){
            if (model.get('ErrorListId') == 0){
                me.errorDetailBtnsToggle(false, storeErrorDetail);
            }
            else{
                me.errorDetailBtnsToggle(true, storeErrorDetail);

                storeErrorDetail.getProxy().setExtraParam('pErrorListId', model.get('ErrorListId'));
                storeErrorDetail.load();
            }
        }
    },

    onAddError: function(btnAdd){
        var me = this,
            view = me.getView(),
            storeErrorList = me.retrieveStore('errorList'),
            storeErrorDetail = me.retrieveStore('errorDetail'),
            currentGrid = btnAdd.up('grid'),
            error,
            pluginRowEdit;

        error = me.errorCheck(storeErrorList,storeErrorDetail, currentGrid);

        if (!error){
            if (currentGrid.getItemId() === 'errorListGrid'){
                view.addFlagErrorList = true;

                pluginRowEdit = me.getRowEditingPlugin(currentGrid);

                storeErrorList.insert(0, {
                    ErrorListId: 0,
                    Description: '',
                    ErrorSource: ''
                });

                /*
                upon initial load of the page, the first time the user adds a new record and
                rejects changes to that record, the record is instead edited. The
                following ensures that record changes are rejected instead of edited.
                 */
                me.onNormalEdit(null, null, null, storeErrorList.getAt(0));
                pluginRowEdit.startEdit(0);

                me.errorDetailBtnsToggle(false, storeErrorDetail);
            }
            else {
                pluginRowEdit = me.getRowEditingPlugin(currentGrid);

                storeErrorDetail.insert(0, {
                    ErrorCode: '',
                    ErrorDescription: '',
                    ErrorType: '',
                    FieldQualifier: ''
                });

                /*
                 upon initial load of the page, the first time the user adds a new record and
                 rejects changes to that record, the record is instead edited. The
                 following ensures that record changes are rejected instead of edited.
                 */
                me.onNormalEdit(null, null, null, storeErrorDetail.getAt(0));
                pluginRowEdit.startEdit(0);
            }
        }
    },

    removeRecord:function(btnRemove){
        var me = this,
            grid = btnRemove.up('grid'),
            rec = grid.getSelection()[0],
            storeErrorList = me.retrieveStore('errorList'),
            storeErrorDetail = me.retrieveStore('errorDetail'),
            error;

        if (grid.getSelection().length === 0){
            return;
        }

        error = me.errorCheck(storeErrorList, storeErrorDetail, grid);
        if (!error){
            if(grid.getItemId() === 'errorListGrid'){
                storeErrorList.remove(rec);
                me.errorDetailBtnsToggle(false, storeErrorDetail);
            }
            else{
                storeErrorDetail.remove(rec);
            }
        }
    },

    onNormalEdit: function(table, td, cellIdx, record){
        record.set('regularEdit', true);
    },

    onBtnReject: function(btnReject){
        var me = this,
            rec = btnReject.getWidgetRecord();
        rec.reject();

        //for removing empty records
        if(rec.phantom){
            var grid = btnReject.up('grid'),
                store = grid.getStore();
            store.remove(rec);
        }
    },

    onBeforeErrorCodeEdit:function(editor,context){
        var rec = context.record;
        if(this.getView().down('#errorDetailGrid').plugins[0].editing)
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
    },


    onBeforeEdit:function(editor,context){
        var rec = context.record;
        /*
        edit is cancelled if this is the first time clicking "reject" on
        a row in errorDetail grid since the load of the page, or if
        trying to edit a preexisting row on errorList grid
         */
        if((!(rec.get('regularEdit'))) || (!(this.getView().addFlagErrorList) && (rec.$className === 'Atlas.admin.view.PBMErrors')))
            return false;
    },

    editRow: function(editor, context){
        var me = this,
            rec = context.record,
            view = this.getView();

        //searches for errorDetail duplicate records where error code is the same
        if(rec.$className === 'Atlas.admin.model.ErrorDetail'){
            var storeErrorDetail = me.retrieveStore('errorDetail');
            for (var idx = 0, length = storeErrorDetail.getCount(); idx < length; idx = idx + 1){
                var tempRec = storeErrorDetail.getAt(idx);
                if(tempRec === rec)
                    continue;
                if ((tempRec.get('ErrorCode') === rec.get('ErrorCode'))){
                    Ext.Msg.alert('Alert', 'Duplicate Error Codes not allowed');
                    if(rec.phantom){
                        storeErrorDetail.remove(rec);
                    }
                    else{
                        rec.reject();
                    }
                    return;
                }
            }
            rec.set('ErrorListId',view.down('#errorListGrid').getSelection()[0].get('ErrorListId'));
        }

        if(view.addFlagErrorList){
            var errorSourceId;
            if(rec.get('ErrorSource') === 'IL Medicaid Errors'){
                errorSourceId = 'ILMCD';
            }
            else{
                errorSourceId = 'MI MCD';
            }
            rec.set('ErrorSourceID', errorSourceId);
        }
        if(rec.dirty){
            rec.set('isUpdated', true);
        }
        else {
            rec.set('isUpdated', false);
        }
        rec.set('regularEdit', false);
        view.addFlagErrorList = false;
    },

    onCancelEdit:function(editor, context){
        var me = this,
            rec = context.record,
            store;
        if(rec.phantom){
            if(rec.$className === 'Atlas.admin.model.ErrorListModel'){
                store = me.retrieveStore('errorList');
            }
            else{
                store = me.retrieveStore('errorDetail');
            }
            store.remove(rec);
        }
        rec.set('regularEdit', false);
        this.getView().addFlagErrorList = false;
    },

    getRowEditingPlugin: function(grid){
        var pluginArray = grid.getPlugins();
        for(var idx = 0, length = pluginArray.length; idx < length; idx += 1){
            if(pluginArray[idx].ptype === 'rowediting')
                return pluginArray[idx];
        }
        return false;
    },

    errorCheck: function(storeErrorList, storeErrorDetail, currentGrid){
        var me = this,
            view = me.getView(),
            gridItemId = currentGrid.getItemId(),
            gridErrorList = view.down('#errorListGrid'),
            gridErrorDetail = view.down('#errorDetailGrid'),
            pluginsStoreErrorList = me.getRowEditingPlugin(gridErrorList),
            pluginsStoreErrorDetail = me.getRowEditingPlugin(gridErrorDetail),
            removedRecsErrorList = storeErrorList.getRemovedRecords(),
            modifiedRecsErrorList = storeErrorList.getModifiedRecords(),
            error;

        function checkRowEditing(plugin){
            if (plugin.editing || plugin.editing){
                Ext.Msg.alert('Message', 'Please complete editing current record before proceeding');
                return true;
            }
        }

        error = checkRowEditing(pluginsStoreErrorList);
        if (error)
            return true;

        error = checkRowEditing(pluginsStoreErrorDetail);
        if (error)
            return true;

        if(gridItemId === 'errorDetailGrid' && ((storeErrorDetail.getModifiedRecords().length > 0) || (storeErrorDetail.getRemovedRecords().length > 0)))
            return false;

        if ((modifiedRecsErrorList.length > 0) || (removedRecsErrorList.length > 0) || (storeErrorDetail.getModifiedRecords().length > 0) || (storeErrorDetail.getRemovedRecords().length > 0)){
            Ext.Msg.confirm('Uncommitted Changes', 'You have uncommitted changes. Are you sure you want to save data?', function(buttonId){
                if (buttonId === 'yes'){
                    me.saveAll();
                }
                /*
                the following is for is the user tries to switch the errorList selection; if the
                user decides not to switch upon seeing the "Uncommited Changes" message, the previously
                selected record will be chosen
                 */
                else if (buttonId === 'no' && gridItemId === 'errorListGrid' && view.prevSelErrorList && (modifiedRecsErrorList.length > 0 || removedRecsErrorList.length > 0)){
                    for(var idx = 0, length = removedRecsErrorList.length; idx < length; idx += 1){
                        if (removedRecsErrorList[idx] === view.prevSelErrorList){
                            currentGrid.setSelection(null);
                            return true;
                        }
                    }
                    currentGrid.setSelection(view.prevSelErrorList);
                }
            });
            return true;
        }
        return false;
    },

    saveAll: function(){
        var me = this,
            storeErrorList = me.retrieveStore('errorList'),
            storeErrorDetail = me.retrieveStore('errorDetail'),
            uriErrorList = 'shared/rx/errorlist/update',
            uriErrorDetail = 'shared/rx/errordetail/update',
            tempTableErrorList = 'ttErrorList',
            tempTableErrorDetail = 'ttErrorDetail',
            gridErrorList = me.getView().down('#errorListGrid');

        var setErrorList = me.saveGrid(storeErrorList, uriErrorList, tempTableErrorList, null);

        if ((setErrorList === 'success') || (setErrorList === 'no changes')){

            var errorListId =0;
            if(!gridErrorList.getSelection().length==0)
                errorListId =gridErrorList.getSelection()[0].get('ErrorListId');


            var myExtraParams = {
                    pErrorListId: errorListId
                },
                setErrorDetail = me.saveGrid(storeErrorDetail, uriErrorDetail, tempTableErrorDetail, myExtraParams);
            if((setErrorDetail === 'success') || ((setErrorList === 'success') && (setErrorDetail === 'no changes'))){
                Ext.Msg.alert('PBM', 'Records saved successfully');
                storeErrorList.onAfter('load', 'onSaveSuccess');
                storeErrorList.load();
            }
            else if (setErrorDetail === 'no changes'){
                Ext.Msg.alert('Audit Questions', 'No Changes exists to Save');
            }
            else{
                Ext.Msg.alert('PBM', setErrorDetail);
            }
        }
        else{
            Ext.Msg.alert('PBM', setErrorList);
        }
    },

    saveGrid: function(store, uri, tempTable, myExtraParams){
        var me = this,
            storeErrorList = me.retrieveStore('errorList'),
            saveAction =[{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];
        if((store.getModifiedRecords().length > 0) || (store.getRemovedRecords().length > 0)){
            var saveStore = Atlas.common.utility.Utilities.saveData([store], uri, tempTable,[true], myExtraParams,
                saveAction, null);

            if (saveStore.code === 0){
                return 'success';
            }
            else{
                return saveStore.message;
            }
        }
        else{
            return 'no changes';
        }
    },

    onSaveSuccess: function(storeErrorList){
        var me = this,
            grid = me.getView().down('#errorListGrid'),
            storeErrorDetail = me.retrieveStore('errorDetail');
        storeErrorList.unAfter('load', 'onSaveSuccess');
        storeErrorDetail.commitChanges();
        grid.setSelection(storeErrorList.findRecord('ErrorListId', me.getView().placeHolderErrorList.get('ErrorListId'), 0, false, true, true));
    },

    renderSource: function(value){
        if(value === 'MI MCD'){
            return 'MI Medicaid Errors';
        }
        else if (value === 'ILMCD'){
            return 'IL Medicaid Errors';
        }
        else{
            return value;
        }
    },

    errorDetailBtnsToggle: function(enableBtns, storeErrorDetail){
        var me = this,
            view = me.getView(),
            btnAddErrorDetail = view.down('#btnAddErrorDetail'),
            btnRemoveErrorDetail = view.down('#btnRemoveErrorDetail');

        if (enableBtns){
            btnAddErrorDetail.enable();
            btnRemoveErrorDetail.enable();
        }
        else{
            btnAddErrorDetail.disable();
            btnRemoveErrorDetail.disable();
            storeErrorDetail.removeAll();
            storeErrorDetail.commitChanges();
        }
    },

    retrieveStore: function(store){
        return this.getViewModel().getStore(store);
    }
});