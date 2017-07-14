/**
 * Created by d3973 on 11/16/2016.
 */
Ext.define('Atlas.plan.view.PlanGroupDocumentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.planplangroupdocumentscontroller',

    listen: {
        store: {
            '#planDocXRef': {
                update: 'enableSave',
                datachanged:'enableSave'
            }
        },
        controller: {
            '#common-fileUploadController': {
                successfulUpload: 'onUploadButton'
            }
        }
    },

    selectPlanGroupHierarchy: function(rowModel, model, index){
        var me = this,
            storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup'),
            storeFaxHistory = me.retrieveStore('faxHistory'),
            btnAddDocSetup = me.retrieveWidget('[text= Add]'),
            btnRemoveDocSetup = me.retrieveWidget('[text= Remove]'),
            btnAddAttachment = me.retrieveWidget('[text= Add Attachment]'),
            lblSelectedPlanGroup = me.retrieveWidget('#lblSelectedPlanGroup');

        storeDocumentXRefPlanGroup.removeAll();
        storeDocumentXRefPlanGroup.commitChanges();
        storeFaxHistory.removeAll();
        storeFaxHistory.commitChanges();

        btnAddDocSetup.enable();
        btnRemoveDocSetup.disable();
        btnAddAttachment.disable();
        lblSelectedPlanGroup.setValue(model.get('carrierName') + ' / ' + model.get('AccountName') + ' / ' + model.get('LOBName'));

        storeDocumentXRefPlanGroup.getProxy().setExtraParam('pWhere', ' PGHierarchySystemId = ' + model.get('SystemID'));

        storeDocumentXRefPlanGroup.load(/*{
            params: {
                pWhere: ' PGHierarchySystemId = ' + model.get('SystemID')
            }
        }*/);
    },

    selectDocSetup: function(rowModel, model){
        var me = this,
            //storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup');
            storeFaxHistory = me.retrieveStore('faxHistory'),
            btnAddAttach = me.retrieveWidget('[text = Add Attachment]'),
            btnRemoveDocSetup = me.retrieveWidget('[text= Remove]');

        storeFaxHistory.removeAll();
        storeFaxHistory.commitChanges();

        btnAddAttach.enable();
        btnRemoveDocSetup.enable();

        storeFaxHistory.getProxy().setExtraParam('pcKeyValue', model.get('systemID'));
        storeFaxHistory.load(/*{
            params: {
                pcKeyValue: model.get('systemID')
            }
        }*/);
    },

    /*setOrigVal: function(field, newVal, oldVal){

        field.origVal = oldVal;
    },*/

    editRow: function(editor, context){
        var me = this,
            btnReject = me.retrieveWidget('#refreshEdit'),
            colRefresh = me.retrieveWidget('#refreshCol'),
            chkMemberDoc = me.retrieveWidget('[dataIndex = memberDoc]').getEditor(),
            chkPrescriberDoc = me.retrieveWidget('[dataIndex = prescriberDoc]').getEditor(),
            chkPharmacyDoc = me.retrieveWidget('[dataIndex = pharmacyDoc]').getEditor(),
            chkOtherDoc = me.retrieveWidget('[dataIndex = otherDoc]').getEditor(),
            chkActive = me.retrieveWidget('[dataIndex = active]').getEditor();

        for (var tempField in context.record.data){
            if ((typeof(context.record.get(tempField))) === 'boolean'){
                if (tempField == 'memberDoc' && (chkMemberDoc.originalValue != chkMemberDoc.getValue()) &&  (chkMemberDoc.originalValue == true)){
                    context.record.set(tempField, !chkMemberDoc.originalValue);
                }
                else if (tempField == 'prescriberDoc' && (chkPrescriberDoc.originalValue != chkPrescriberDoc.getValue()) && chkPrescriberDoc.originalValue == true){
                    context.record.set(tempField, !chkPrescriberDoc.originalValue);
                }
                else if (tempField == 'pharmacyDoc' && (chkPharmacyDoc.originalValue != chkPharmacyDoc.getValue()) && chkPharmacyDoc.originalValue == true){
                    context.record.set(tempField, !chkPharmacyDoc.originalValue);
                }
                else if (tempField == 'otherDoc' && (chkOtherDoc.originalValue != chkOtherDoc.getValue()) && chkOtherDoc.originalValue == true){
                    context.record.set(tempField, !chkOtherDoc.originalValue);
                }
                else if (tempField == 'active' && (chkActive.originalValue != chkActive.getValue()) && chkActive.originalValue == true){
                    context.record.set(tempField, !chkActive.originalValue);
                }
            }
        }

        if(context.record.dirty){
            context.record.set('isUpdated', true);
        }
    },

    cancelEdit: function(editor, context){
        var me = this;

        //if (context.record.newRecord == true){
        if (context.record.phantom == true){
            var storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup');

            storeDocumentXRefPlanGroup.remove(context.record);
        }
    },

    addDocSetup: function(){
        var me = this,
            plugin = me.retrieveWidget('[title = Document Setup]').getPlugin(),
            gridPlanGroupHierarchy = me.retrieveWidget('[title = Plan Group Hierarchy]'),
            storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup'),
            modelDocumentXRefPlanGroup = Ext.create('Atlas.plan.model.DocumentXRefPlanGroup');

        if (plugin.editing){
            plugin.cancelEdit();
        }

        modelDocumentXRefPlanGroup.set('lastUpdatedBy', Atlas.common.utility.Utilities.getLocalDateTime() );
        modelDocumentXRefPlanGroup.set('prescriberDoc', false);
        modelDocumentXRefPlanGroup.set('systemID', 0);
        modelDocumentXRefPlanGroup.set('pharmacyDoc', false);
        modelDocumentXRefPlanGroup.set('otherDoc', false);
        modelDocumentXRefPlanGroup.set('active', true);
        modelDocumentXRefPlanGroup.set('memberDoc', false);
        modelDocumentXRefPlanGroup.set('PGHierarchySystemId', gridPlanGroupHierarchy.getSelection()[0].get('SystemID'));
        //modelDocumentXRefPlanGroup.newRecord = true;
        storeDocumentXRefPlanGroup.insert(0, modelDocumentXRefPlanGroup);

        plugin.startEdit(0);
    },

    removeDocSetup: function(){
        var me = this,
            plugin = me.retrieveWidget('[title = Document Setup]').getPlugin(),
            storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup'),
            storeFaxHistory = me.retrieveStore('faxHistory'),
            gridDocumentSetup = me.retrieveWidget('[title =Document Setup]'),
            selectedRow = gridDocumentSetup.getSelection()[0],
            btnAddAttachment = me.retrieveWidget('[text = Add Attachment]');

        if (plugin.editing){
            plugin.cancelEdit();
        }

        storeDocumentXRefPlanGroup.remove(selectedRow);

        storeFaxHistory.removeAll();
        storeFaxHistory.commitChanges();

        btnAddAttachment.disable();
    },

    enableSave: function(){
        var me = this,
            storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup'),
            btnSave = me.retrieveWidget('[iconCls = x-fa fa-floppy-o]');


        if ((storeDocumentXRefPlanGroup.getModifiedRecords().length != 0) || (storeDocumentXRefPlanGroup.getRemovedRecords().length != 0)){
            if(storeDocumentXRefPlanGroup.getModifiedRecords().length != 0){
                for(var idx = 0, length = storeDocumentXRefPlanGroup.getModifiedRecords().length; idx < length; idx = idx + 1){
                    var record = storeDocumentXRefPlanGroup.getModifiedRecords()[idx];

                    if (record.get('isUpdated') === true){
                        btnSave.enable();
                        return;
                    }
                    else if (record.phantom === true){
                        btnSave.enable();
                        return;
                    }
                }
            }
            if (storeDocumentXRefPlanGroup.getRemovedRecords().length != 0){
                for(var idx2 = 0, length2 = storeDocumentXRefPlanGroup.getRemovedRecords().length; idx2 < length2; idx2 = idx2 + 1){
                    var record2 = storeDocumentXRefPlanGroup.getRemovedRecords()[idx2];

                    if (record2.phantom == false){
                        btnSave.enable();
                        return;
                    }
                }
            }
        }

        btnSave.disable();
    },

    saveDocSetup: function(){
        var me = this,
            plugin = me.retrieveWidget('[title = Document Setup]').getPlugin(),
            storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup'),
            gridDocumentSetup = me.retrieveWidget('[title =Document Setup]'),
            selectedRow = gridDocumentSetup.getSelection()[0],
            saveAction,
            btnSave = me.retrieveWidget('[text = Save]'),
            btnRemove = me.retrieveWidget('[text = Remove]');

        if (plugin.editing){
            Ext.Msg.alert('Message', 'Please complete editing current record before save');
            return;
        }

        saveAction =[{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        var setDocumentXRefPlanGroup = Atlas.common.utility.Utilities.saveData([storeDocumentXRefPlanGroup], 'plan/rx/documentxrefplangroup/update', 'ttDocumnetXRefPlanGroup',[true], null,
            saveAction, null);

        if(setDocumentXRefPlanGroup.code == 0){
            Ext.Msg.alert('PBM', 'Document setup details successfully saved');
            if (selectedRow){
                storeDocumentXRefPlanGroup.onAfter('load', 'onLoadDocumentXRefPlanGroup', this, {selRecIdx: storeDocumentXRefPlanGroup.find('id', selectedRow.get('id'), 0, false, true, true)});
            }
        }

        storeDocumentXRefPlanGroup.reload();

        btnSave.disable();
        btnRemove.disable();
    },

    onLoadDocumentXRefPlanGroup: function(storeDocumentXRefPlanGroup, records, successful, operation, eOpts){
        var selectedRecIdx = eOpts.__proto__.selRecIdx,
            updatedSelectedRec = storeDocumentXRefPlanGroup.getAt(selectedRecIdx),
            gridDocumentXRefPlanGroup = this.getView().down('[title = Document Setup]');

        gridDocumentXRefPlanGroup.setSelection(updatedSelectedRec);
        storeDocumentXRefPlanGroup.unAfter('load', 'onLoadDocumentXRefPlanGroup', this, {mytest: 'myTest'});
    },

    removeAttachment: function(button){
        var me = this,
            modelFaxHistory = button.$widgetRecord;

        Ext.Msg.confirm('Delete Attachment', 'Are you sure you would like to remove this attachment?', function(buttonId){
            if (buttonId == 'yes'){
                var storeFaxHistory = me.retrieveStore('faxHistory'),
                    storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup'),
                    modelDocumentXRefPlanGroup = me.retrieveWidget('[title = Document Setup]').getSelection()[0],
                    params;

                storeFaxHistory.remove(modelFaxHistory);

                var saveAction =[{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];

                params = {
                    pcPlanID: '',
                    pcKeyType: 'PlanGroupDocSystemId',
                    pcKeyValue: modelDocumentXRefPlanGroup.get('systemID'),
                    pcKeyAction: 'D',
                    pcDocIDList: modelFaxHistory.get('DocumentID'),
                    pcDescrData: 'DeletePGDocAttachment'
                };

                var setDocumentXRefPlanGroup = Atlas.common.utility.Utilities.saveData([storeFaxHistory], 'shared/rx/attachmentlist/update', 'ttDocList',[true], params,
                    saveAction, null);

                storeFaxHistory.reload();
            }
        });
    },

    addAttachmentWindow: function(){
        var me = this,
            gridDocSetup = me.getView().down('[title = Document Setup]'),
            selectedRecDocSetup = gridDocSetup.getSelection()[0];

        if (selectedRecDocSetup.get('systemID') === 0){
            Ext.Msg.alert('Validation', 'Please save changes before adding an attachment');
            return;
        }

        var winAddAttach = Ext.create('Ext.window.Window', {
            title: 'Add Attachment',
            floating: true,
            layout: {type: 'fit', align: 'stretch'},
            modal: true,
            closable: true,
            draggable: true,
            resizable: true,
            width: 500,
            height: 300,
            autoShow: false,
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    tbar: {
                        xtype: 'displayfield',
                        value: 'Please select one file to upload',
                        width: '100%'
                    },
                    width: '100%',
                    height: '100%',
                    keyType: 'imagePlanGroupDoc',
                    fileType: 'pdf,xls,xlsx',
                    maxUploadNum: 1,
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });

        me.getView().add(winAddAttach);
        winAddAttach.show();
    },

    onUploadButton: function(arrayDocumentId){
        var me = this,
            view = me.getView();

        if (view.up().activeTab.title === 'Plan Group Documents'){
            var gridDocumentSetup = view.down('[title = Document Setup]'),
                selectedDocSetupRec = gridDocumentSetup.getSelection()[0],
                panelFileUpload = view.down('#fileUploadGrid'),
                fileStore = panelFileUpload.getViewModel().getStore('fileStore'),
                storeFaxHistory = me.retrieveStore('faxHistory'),
                descrData,docIdList,descrDataFormatted,docIdListFormatted;

            for (var idx = 0, length = fileStore.getCount(); idx < length; idx = idx + 1){
                descrData = descrData + '|' + fileStore.getAt(idx).get('description');

                docIdList = docIdList + '|' + arrayDocumentId[idx];
            }

            if ((descrData != null) && (docIdList != null) && (descrData.includes('undefined') && (docIdList.includes('undefined')))){
                descrDataFormatted = descrData.substr(10);
                docIdListFormatted = docIdList.substr(10);
            }
            else if ((descrData == null) || (docIdList == null)){
                return;
            }

            var saveAction =[{
                "Save": {"key": '', "value": ''}
            }];

            var params = {
                pcPlanID: '',
                pcKeyType: 'PlanGroupDocSystemId',
                pcKeyValue: selectedDocSetupRec.get('systemID'),
                pcKeyAction: 'A',
                pcDocIDList: arrayDocumentId[0],
                // pcDocIDList: arrayDocumentId[0] + '|' + arrayDocumentId[0],//docIdListFormatted,
                pcDescrData: descrDataFormatted
            };

            var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '',[false], params,
                saveAction, null);

            if (setAttachmentList.code === 0){
                view.down('[title=Add Attachment]').close();
                storeFaxHistory.reload();
            }
        }
    },

    viewDocument: function(button){
        var me = this,
            selectedRecord = button._rowContext.record;

        Atlas.common.utility.Utilities.viewDocument(selectedRecord.get('DocumentID'), 'xlsx');
    },

    onBtnReject: function(button, e, eOpts){
        var me = this,
            storeDocumentXRefPlanGroup = me.retrieveStore('documentXRefPlanGroup'),
             plugin = me.retrieveWidget('[title = Document Setup]').getPlugin();
        //     newRecs = storeDocumentXRefPlanGroup.getNewRecords(),
        //     selectedRow,
        //     storeIdx;
        //
        if (plugin.editing){
            plugin.cancelEdit();
        }
        //
        // /*
        // If there are new records added, then button._rowContext.recordIndex doesn't show
        // the correct recordIndex. The following pulls the correct index within the store
        //  */
        // if (newRecs.length > 0){
        //     for(var idx = 0, length = storeDocumentXRefPlanGroup.getCount(); idx < length; idx = idx + 1){
        //         var rec = storeDocumentXRefPlanGroup.getAt(idx);
        //
        //         if (rec.internalId == button.getWidgetRecord().internalId){
        //             storeIdx = idx;
        //         }
        //     }
        // }
        // else {
        //     storeIdx = button._rowContext.recordIndex;
        // }
        //
        // selectedRow = storeDocumentXRefPlanGroup.getAt(storeIdx);
        //
        // //rejects all changes to store
        // if(!selectedRow.phantom) {
        //     selectedRow.reject();
        // }
        // else {
        //     storeDocumentXRefPlanGroup.remove(selectedRow);
        // }
        //
        // //hides the reject button
        // selectedRow.set('isUpdated', false);


        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {
            storeDocumentXRefPlanGroup.remove(record);

        }
    },

    beforeEdit:function(editor,context)
    {
        if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var theStore = this.retrieveStore('documentXRefPlanGroup');
                theStore.removeAt(context.rowIdx);
                return false;
            }

        }

    },

    retrieveStore: function(store){
        return this.getViewModel().getStore(store);
    },

    retrieveWidget: function(itemId){
        return this.getView().down(itemId);
    }

});