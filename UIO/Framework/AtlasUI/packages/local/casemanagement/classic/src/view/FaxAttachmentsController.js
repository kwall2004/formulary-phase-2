/**
 * Created by s6627 on 11/27/2016.
 */
Ext.define('Atlas.casemanagement.view.FaxAttachmentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FaxAttachmentsController',
    listen: {
        controller: {
            'casedetailscontroller': {
                LoadFaxAndAttachmentsFire: 'LoadFaxAndAttachmentsFire'
            },
            'fileuploader': {
                successfulUpload: 'onUploadAttachment'
            }
        }
    },
    init: function () {
        this.LoadFaxAndAttachmentsFire();
    },
    LoadFaxAndAttachmentsFire: function () {
        var view = this.getView();
        if (view.up().down('#hiddenMTMID') != null) {
            view.down('#hdnKeyType').setValue('pMTMID');
            view.down('#hdnKeyValue').setValue(view.up().down('#hiddenMTMID').getValue());
            this.LoadFaxAndAttachments();
        }
    },
    onUploadAttachment: function (arrayDocumentId, origin) {
        var view = this.getView();
        var me = this;
        if (origin !== view.id) {
            return; // ignore
        }
        else {
            var win = Ext.WindowManager.getActive();
            if (win) {
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var panelFileUpload = view.down('#fileUploadGrid'),
                    fileStore = panelFileUpload.getViewModel().getStore('fileStore');
                var params = {
                    pcPlanID: '',
                    pcKeyType: 'mtmID',
                    pcKeyValue: view.up().down('#hiddenMTMID').getValue(),
                    pcKeyAction: 'A',
                    pcDocIDList: arrayDocumentId[0].trim(),
                    pcDescrData: fileStore.getAt(0).get('description')
                };
                var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params,
                    saveAction, null);
                win.close();
                me.LoadFaxAndAttachments();
                Ext.Msg.alert('Success', 'File Upload Sucessfully');
            }
        }
    },
    LoadFaxAndAttachments: function () {
        var view = this.getView();
        if (view.down('#hdnKeyValue').getValue() != null && view.down('#hdnKeyValue').getValue() != "") {
            var vm = this.getViewModel();
            var FaxHistoryStore = vm.getStore('FaxHistoryStore');
            FaxHistoryStore.getProxy().setExtraParam(view.down('#hdnKeyType').getValue(), view.down('#hdnKeyValue').getValue());
            FaxHistoryStore.load();
        }
    },
    AddAttachment_Click: function () {
        var me = this,
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Select a FF File',
            modal: true,
            closable: true,
            scrollable: true,
            height: 300,
            width: 700,
            layout: 'fit',
            scope: me,
            itemId: 'winAddAttachment',
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    keyType: 'imageMTM',
                    fileType: 'pdf',
                    origin: me.getView().id,
                    endpoint: 'shared/rx/document/update'
                }


            ]
            //dockedItems: [
            //    {
            //        xtype: 'toolbar',
            //        dock: 'bottom',
            //        style: {borderColor: 'black', borderStyle: 'solid'},
            //        items: [
            //            '->'
            //            , {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler: 'AttachmentSave_Click'}
            //            , {xtype: 'button', text: 'Reset', iconCls: 'fa fa-remove', handler: 'AttachmentReset_click'}
            //        ]
            //
            //
            //    }
            //]

        });
        this.getView().add(win);
        win.show();

    },
    createLetter: function () {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/letter/CreateEditLetter');

        me.fireEvent('openView', 'merlin', 'letter', 'CreateEditLetter', {
            menuId: menuId,
            ID: menuId,
            LetterID: 'NEW',
            LetterType: '',
            keyValue: 0,
            UCFClaimId: 0,
            openView: true
        }, null);
    },
    AttachmentReset_click: function (sender, e) {
        var view = this.getView();
        var winAddAttachment = view.down('#winAddAttachment');
        winAddAttachment.down('#AttachmentBasicForm').reset();
    },
    AttachmentSave_Click: function (sender, e) {
        var view = this.getView();
        var winAddAttachment = view.down('#winAddAttachment');
        if (!winAddAttachment.down('#AttachmentBasicForm').isValid()) {
            return false;
        }
        else {

        }

    },
    FaxQueue_Click: function () {
        var me = this;
        var win = Ext.create({
            xtype: 'casemanagementFaxQWindow',
            autoShow: true,
            viewModel: {
                parent: me.getViewModel()
            }
        });
        win.down('#cbxFax').setValue('1');
        win.down('#faxReceivedDate').setValue('');
        win.down('#faxReceivedDate').setDisabled(true);
        win.down('#dtTo').setValue('');
        win.down('#dtTo').setDisabled(true);
        this.loadInitialFaxQStoreData(null, null, "");
        this.getView().add(win);
        win.show();
    },


    dropcasedetailfax : function (node, data, dropRec, dropPosition) {
        data.records[data.records.length - 1].dirty = true;
        this.updatedropcasedetailfax(data);
    },

    updatedropcasedetailfax: function (data) {
        var iCnt,
            docID = 0,
            docList = '',
            delDocList = '',
            descList = '',
            docDescription = '',
            saveData = '',
            updatedropdropcasedetailfax = this.getViewModel().getStore('FaxHistoryStore');

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        for (iCnt = 0; iCnt < updatedropdropcasedetailfax.count(); iCnt++) {

            var record = updatedropdropcasedetailfax.data.items[iCnt];

            if (!record.dirty) {
                continue;
            }
            record.data.DocumentID = data.records[data.records.length - 1].get('DocumentID');
            record.data.faxDate = data.records[data.records.length - 1].get('RecieptDate');
            record.data.inOut = 'Incoming Fax';
        }

        saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                pcPlanID: 'HPM',
                pcKeyType: 'mtmID',
                pcKeyValue:  this.getView().down('#hdnKeyValue').getValue(),
                pcKeyAction: 'A',
                pcDocIDList: data.records[data.records.length - 1].get('DocumentID'),
                pcDescrData: 'Locks Fax'
            },
            saveAction, null);

        if (saveData.code != "0") {
            Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
        }


        /* DELETE ATTACHMENT RECORD */
        for (iCnt in updatedropdropcasedetailfax.removed) {
            delDocList = delDocList + (delDocList == '' ? '' : '|') + updatedropdropcasedetailfax.removed[iCnt].data.DocumentID;
        }

        if (delDocList != '') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'mtmID',
                    pcKeyValue:  this.getView().down('#hdnKeyValue').getValue(),
                    pcKeyAction: 'A',
                    pcDocIDList: data.records[data.records.length - 1].get('DocumentID'),
                    pcDescrData: 'Locks Fax'
                },
                saveAction, null);

            if (saveData.code != "0") {
                Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
            }
        }

        this.LoadFaxAndAttachments();
    },
    loadInitialFaxQStoreData: function (pRecieptDateFrom, pRecieptDateTo, pAcknowledged) {
        var vm = this.getViewModel();
        var FaxQStore = vm.getStore('FaxQStore');
        FaxQStore.getProxy().setExtraParam('pPlanID', 'HPM');
        FaxQStore.getProxy().setExtraParam('pQDescription', 'MTM');
        FaxQStore.getProxy().setExtraParam('pRecieptDateFrom', pRecieptDateFrom);
        FaxQStore.getProxy().setExtraParam('pRecieptDateTo', pRecieptDateTo);
        FaxQStore.getProxy().setExtraParam('pAcknowledged', pAcknowledged);
        FaxQStore.load();

    },
    cbxFax_Select: function () {
        var view = this.getView();
        view.down('#faxReceivedDate').setValue('');
        view.down('#dtTo').setValue('');
        if (view.down('#cbxFax').getValue() != null && view.down('#cbxFax').getValue() == '2') {
            view.down('#dtTo').setDisabled(false);
            view.down('#faxReceivedDate').setDisabled(false);
        }
        else {
            view.down('#dtTo').setDisabled(false);
            view.down('#faxReceivedDate').setDisabled(true);
        }
    },
    btnView_Click: function (grid, rowIndex, colIndex) {
        Atlas.common.utility.Utilities.viewDocument(grid.eventPosition.record.get('DocumentID'));

    },
    btnDelete_Click: function (sender, index) {
        var view = this.getView();
        var me = this;
        var grid = view.down('#FaxAttachmentsgrid');
        try {
            Ext.MessageBox.confirm('Confirm Remove', 'Are you sure you want to remove?',
                function (btn) {
                    if (btn === 'yes') {
                        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                        var record = grid.getStore().getAt(index);
                        var extraParameters = {
                            'pcPlanID': "",
                            'pcKeyType': 'MTMID',
                            'pcKeyValue': view.down('#hdnKeyValue').getValue(),
                            'pcKeyAction': 'D',
                            'pcDocIDList': record.data.DocumentID,
                            'pcDescrData': 'anything'
                        }
                        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [false], extraParameters,
                            saveAction, null);
                        if (submitJobReturn.code == 0) {
                            Ext.Msg.alert("PBM", "Deleted Successfully.");
                        }
                        me.LoadFaxAndAttachments();
                    }
                }, this)
        }
        catch (e) {
            Ext.Msg.alert('Failure', ' error, Please contact admin.');
        }
    },
    OnSearchClick: function () {
        var view = this.getView();
        if (view.down('#cbxFax').getValue() != null && view.down('#cbxFax').getValue() == '1') {
            this.loadInitialFaxQStoreData(null, null, "");
        } else {
            var _ack = 'Y';
            this.loadInitialFaxQStoreData(view.down('#faxReceivedDate').getValue(), view.down('#dtTo').getValue(), _ack);
        }
    },
    onReset: function () {
        var view = this.getView();
        view.down('#faxReceivedDate').setValue('');
        view.down('#dtTo').setValue('');
        this.loadInitialFaxQStoreData(null, null, "");
    },
    btnAcknowledge_Click: function (sender, index) {
        var view = this.getView();
        var grid = view.down('#FaxQGridPanel');
        var record = grid.getStore().getAt(index);
        try {
            var fieldlist = "Acknowledge,AcknowledgedDate,AcknowledgedUserName";
            var fields = "y" + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + "|" + Atlas.user.un;
            var extraParameters = {
                'pSystemID': record.data.SystemID,
                'pFieldList': fieldlist,
                'pFields': fields
            };
            var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [false], extraParameters,
                saveAction, null);
            this.loadInitialFaxQStoreData(null, null, "");
        }
        catch (e) {
            Ext.Msg.alert('Failure', ' error, Please contact admin.');
        }
    }
})