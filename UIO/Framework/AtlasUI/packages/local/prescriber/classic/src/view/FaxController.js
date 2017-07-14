/**
 * Created by T4317 on 10/31/2016.
 */
Ext.define('Atlas.prescriber.view.FaxController', {
    extend: 'Atlas.prescriber.view.PrescriberController',
    alias: 'controller.prescriber-fax',
    listen: {
        controller: {
            '#common-fileUploadController': {
                successfulUpload: 'onUploadAttachment'
            }
        }
    },
    init: function () {
        var view = this.getView();
        var vm = view.up().getViewModel();
            vm.set('openedTabs.fax', true);

        if(vm.get('masterrecord')){
            this.getFaxData(this.getView().up(),vm.get('masterrecord').get('npi'));
        }
    },

    showPresAddAttachmentPopUp: function (button, event, myParam) {
        var me = this,
            view = me.getView();
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
                    width: '100%',
                    height: '100%',
                    keyType: 'imageCredentialing',
                    fileType: 'pdf',
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });

        view.add(winAddAttach);
        winAddAttach.show();
    },

    attachFax: function (keyType, keyValue, docId, docDescription) {
        var vm = this.getViewModel();
        var setAttachment = Ext.create('Atlas.pharmacy.model.AttachmentList');
        setAttachment.phantom = false;
        setAttachment.save({
            params: {
                pcPlanID: 'HPM',
                pcKeyType: keyType,
                pcKeyValue: keyValue,
                pcKeyAction: 'A',
                pcDocIDList: docId,
                pcDescrData: docDescription
            },
            callback: function (record, operation, success) {
                if (success) {
                    var relCredKeyObj = {params: {pKeyType: keyType, pKeyValue: keyValue}};
                    vm.getStore('faxandattachments').load(relCredKeyObj);
                }
            }
        });

    },

    doFaxQueue: function () {
        var me = this,
            win = Ext.create({
                xtype: 'pres-PresFaxQueueWin',
                extraParams: {
                    windowType: '',
                    title: 'Fax Queue'
                },
                autoShow: true
            });
        me.getView().add(win);
        win.show();

    },

    onUploadAttachment: function (arrayDocumentId) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            keyType = 'Prescriber',
            keyValue = vm.get('masterrecord').get('npi'),
            panelFileUpload = view.down('#fileUploadGrid'),
            fileStore = panelFileUpload.getViewModel().getStore('fileStore');

        for (var idx = 0, length = arrayDocumentId.length; idx < length; idx = idx + 1) {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];

            var params = {
                pcPlanID: '',
                pcKeyType: keyType,
                pcKeyValue: keyValue,
                pcKeyAction: 'A',
                pcDocIDList: arrayDocumentId[idx],
                pcDescrData: fileStore.getAt(idx).get('description')
            };

            var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params,
                saveAction, null);
        }

        vm.getStore('faxandattachments').reload();
    },

    getDocumentDetails: function (docID) {
        if (docID != '') {
            Atlas.common.utility.Utilities.viewDocument(docID);
        }
    },

    deleteAttachment: function (docId) {
        var me = this,
            vm = this.getViewModel(),
            setAttachment = Ext.create('Atlas.pharmacy.model.AttachmentList');
        setAttachment.phantom = false;
        setAttachment.save({
            params: {
                pcPlanID: '',
                pcKeyType: 'Prescriber',
                pcKeyValue: vm.get('masterrecord').get('npi'),
                pcKeyAction: 'D',
                pcDocIDList: docId,
                pcDescrData: 'anything'
            },
            callback: function (record, operation, success) {
                if (success) {
                    me.getFaxData(me.getView().up(),vm.get('masterrecord').get('npi'));
                }
            }
        });
    },

    dropprescriberfax : function (node, data, dropRec, dropPosition) {
        data.records[data.records.length - 1].dirty = true;
        this.updatedropprescriberfax(data);
    },

    updatedropprescriberfax: function (data) {
        var iCnt,
            docID = 0,
            docList = '',
            delDocList = '',
            descList = '',
            docDescription = '',
            saveData = '',
            updatedropprescriberfaxstore = this.getViewModel().getStore('faxandattachments');

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        for (iCnt = 0; iCnt < updatedropprescriberfaxstore.count(); iCnt++) {

            var record = updatedropprescriberfaxstore.data.items[iCnt];

            if (!record.dirty) {
                continue;
            }
            record.data.DocumentID = data.records[data.records.length - 1].data.DocumentID;
            record.data.faxDate =data.records[data.records.length - 1].data.RecieptDate;
            record.data.inOut = 'Incoming Fax';
        }

        saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                pcPlanID: 'HPM',
                pcKeyType: 'Prescriber',
                pcKeyValue:  this.getViewModel().get('masterrecord').data.npi,
                pcKeyAction: 'A',
                pcDocIDList: data.records[data.records.length - 1].data.DocumentID,
                pcDescrData: 'Locks Fax'
            },
            saveAction, null);

        if (saveData.code != "0") {
            Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
        }


        /* DELETE ATTACHMENT RECORD */
        for (iCnt in updatedropprescriberfaxstore.removed) {
            delDocList = delDocList + (delDocList == '' ? '' : '|') + updatedropprescriberfaxstore.removed[iCnt].data.DocumentID;
        }

        if (delDocList != '') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'Prescriber',
                    pcKeyValue:  this.getViewModel().get('masterrecord').data.npi,
                    pcKeyAction: 'A',
                    pcDocIDList: data.records[data.records.length - 1].data.DocumentID,
                    pcDescrData: 'Locks Fax'
                },
                saveAction, null);

            if (saveData.code != "0") {
                Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
            }
        }

        this.init();
    }

});