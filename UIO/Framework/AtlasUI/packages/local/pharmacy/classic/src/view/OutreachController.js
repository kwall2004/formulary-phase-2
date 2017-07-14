/**
 * Last Developer: Jeff Huffman
 * Previous Developers: []
 * Origin: prescriberportal-searchpriorauth-createaudit
 * Description: Plan Search
 **/
Ext.define('Atlas.pharmacy.view.OutreachController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.outreach',

    init: function () {
        console.log('---- OutreachController --- ');
        var me = this;
        /*
         -----------------
         Load Store(s)
         states / dispenserTypes / srchJobGroupExt
         Assign srchJobGroupExtMdl Record
         -----------------
         */
        var statesStore = this.getViewModel().getStore('states');
        statesStore.getProxy().setExtraParam('pListName', 'States');
        statesStore.load({
            scope: me,
            callback: function (records, operation, success) {
                console.log("statesStore.getCount(): " + statesStore.getCount());

                var dispenserTypesStore = me.getViewModel().getStore('dispenserTypes');
                dispenserTypesStore.getProxy().setExtraParam('pListName', 'DispenserType');
                dispenserTypesStore.load({
                    scope: me,
                    callback: function (records, operation, success) {
                        console.log("dispenserTypesStore.getCount(): " + dispenserTypesStore.getCount());
                    }
                });


            }
        });

        var srchJobGroupStore = this.getViewModel().getStore('srchJobGroup');
        srchJobGroupStore.getProxy().setExtraParam('pBatchSize', '0');
        srchJobGroupStore.getProxy().setExtraParam('pWhere', "moduleName = 'PharmacyOutReach' and jobGroupCode='Pharmacy'");

        srchJobGroupStore.load({
            scope: me,
            failure: function (record2, operation) {
                console.log("--- FAILED --");
            },
            success: function (record2, operation) {
                console.log("--- SUCCESS : srchJobGroupStore --");
            },
            callback: function (records, operation, success) {
                console.log("--- CALLBACK : srchJobGroupStore --");
                //var lkpRecord = srchJobGroupStore.getAt(0);
                me.getViewModel().set('srchJobGroupExtMdl', srchJobGroupStore.getAt(0));
                console.log("jobGroupExtMdl.systemID: " + me.getViewModel().data.srchJobGroupExtMdl.data.systemID);


                var jobqueueattachmentsStore = me.getViewModel().getStore('jobqueueattachments');
                jobqueueattachmentsStore.getProxy().setExtraParam('pParentSystemId', me.getViewModel().data.srchJobGroupExtMdl.data.systemID);
                jobqueueattachmentsStore.getProxy().setExtraParam('pKeyType', "PharmParentSystemId");

                jobqueueattachmentsStore.load({
                    scope: me,
                    failure: function (record2, operation) {
                        console.log("--- FAILED --");
                    },
                    success: function (record2, operation) {
                        console.log("--- SUCCESS : jobqueueattachmentsStore --");
                    },
                    callback: function (records, operation, success) {
                        console.log("--- CALLBACK : jobqueueattachmentsStore --");
                        //var lkpRecord = srchJobGroupStore.getAt(0);

                    }
                });

            }
        });
    },
    onJobQueueAttachmentsChanged: function (store, sorters) {
        console.log("-------------------");
        console.log("onJobQueueAttachmentsChanged");
        console.log("-------------------");
    },
    onSubmitJobClicked: function (button) {
        console.log("-------------------");
        console.log("onStatesChanged");
        console.log("-------------------");
    },
    onResetClicked2: function (button) {
        console.log("-------------------");
        console.log("onStatesChanged");
        console.log("-------------------");
    },
    onAddAttachment: function (button) {
        console.log("-------------------");
        console.log("onAddAttachment");
        console.log("-------------------");

    },
    onGridDblClick: function (button) {
        console.log("-------------------");
        console.log("onGridDblClick");
        console.log("-------------------");

    },
    onSubmitOONJobClicked: function (button) {

        console.log("--onSave--");

        console.log("--start onCancel-");
        var curView, vm, fldSet;
        var me = this,
            form = me.getView().down('form'),
            values = form.getValues();
            curView = me.getView();
            vm = me.getViewModel();
        if (form.isValid() && values) {

            fldSet = curView.query('#posrchFldset')[0];
            var btnReset = curView.query('#btnReset')[0];
            var dfFromDate = curView.query('#cboDateFrom')[0];
            var dfFromTo = curView.query('#cboDateTo')[0];
            var cboStates = curView.query('#cboStates')[0];
            var cboDispenserTypes = curView.query('#cboDispenserTypes')[0];

            var wParamaters = "";

            var wStates = "";
            var wDispenserTypes = "";
            var i = 0;

            if (cboStates && cboStates.value.length > 0) {

                i = 0;
                for (key in cboStates.value) {
                    if (i == 0) {
                        wStates = cboStates.value[i];
                    }
                    else {
                        wStates = wStates + "?" + cboStates.value[i];
                    }
                    i++;
                }
            }

            if (cboDispenserTypes && cboDispenserTypes.value.length > 0) {

                i = 0;
                for (inDispenserType in cboDispenserTypes.value) {
                    if (i == 0) {
                        wDispenserTypes = cboDispenserTypes.value[i];
                    }
                    else {
                        wDispenserTypes = wDispenserTypes + "?" + cboDispenserTypes.value[i];
                    }
                    i++;
                }
            }


            var pDescription = "Pharmacy Out Of Network Report";
            var pProgramName = "rptOOPharmacy.p";
            var pRunMode = "2";
            var pProgramType = "Report";
            var pSaveDocument = "true";
            var pFaxNumber = "";

            var wFmtDate = Ext.Date.format(dfFromDate.getValue(), 'm/y/d');

            wParamaters = dfFromDate.getRawValue() + "|" + dfFromTo.getRawValue() + "|" + wStates + "|" + wDispenserTypes;

            console.log("wParamaters: " + wParamaters);

            var submitJobModel = Ext.create('Atlas.pharmacy.model.SubmitJob', {});
            submitJobModel.phantom = false;

            submitJobModel.getProxy().setExtraParam('pDescription', pDescription);
            submitJobModel.getProxy().setExtraParam('pProgramName', pProgramName);
            submitJobModel.getProxy().setExtraParam('pParameters', wParamaters);
            submitJobModel.getProxy().setExtraParam('pRunMode', pRunMode);
            submitJobModel.getProxy().setExtraParam('pProgramType', pProgramType);
            submitJobModel.getProxy().setExtraParam('pSaveDocument', pSaveDocument);
            submitJobModel.getProxy().setExtraParam('pFaxNumber', pFaxNumber);
            submitJobModel.save({
                scope: me,
                failure: function (record, operation) {
                },
                success: function (record, operation) {

                    var objSubmitJobResp = Ext.decode(operation.getResponse().responseText);
                    var pJobNumber = objSubmitJobResp.metadata.pJobNumber;
                    var pMessage = objSubmitJobResp.message[0].message;

                    console.log("**** " + pMessage + " - " + pJobNumber + " ****");

                    var jobQueueDataModel = Ext.create('Atlas.pharmacy.model.JobQueueData', {});
                    jobQueueDataModel.phantom = false;

                    jobQueueDataModel.getProxy().setExtraParam('pJobNum', pJobNumber);
                    jobQueueDataModel.getProxy().setExtraParam('pFieldList', "parentSystemID");
                    jobQueueDataModel.getProxy().setExtraParam('pFieldValues', vm.data.srchJobGroupExtMdl.data.systemID);
                    jobQueueDataModel.save({
                        scope: me,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                            console.log("jobQueueDataModel.success");

                            var fmtMsg = "Job Submitted Successfully.Job Number is: '" + pJobNumber + "'.";
                            Ext.Msg.alert("PBM", fmtMsg);

                        },
                        callback: function (record, operation, success) {
                            console.log("jobQueueDataModel.callback");
                        }

                    });

                },
                callback: function (record, operation, success) {
                    console.log("submitJobModel.callback");
                }
            });
        }
        else
            Ext.Msg.alert("PBM", "Please enter all required fields before submitting job.");

    },
    updateTagFieldCheckBoxes: function (cboTagField2) {
        var values = cboTagField2.valueCollection,
            picker = cboTagField2.getPicker(),
            nodes, node, i, itemId;

        var lkpItemId = cboTagField2.itemId;

        if (picker) {
            nodes = picker.getNodes();

            for (i = 0; i < nodes.length; i++) {
                node = Ext.get(nodes[i]);
                node.down('input[type=checkbox]').dom.checked = picker.isSelected(node);
            }
        }
    },
    /*
     updateDispenserTypeCheckBoxes: function(cboTagField) {
     var values = cboTagField.valueCollection,
     picker = cboTagField.getPicker(),
     nodes, node, i, itemId;

     //debugger;

     var lkpItemId = cboTagField.itemId;

     if (picker) {
     nodes = picker.getNodes();

     for (i = 0; i < nodes.length; i++) {
     node = Ext.get(nodes[i]);
     node.down('input[type=checkbox]').dom.checked = picker.isSelected(node);
     }
     }
     },
     */
    onResetClicked: function (wType) {

        console.log("--start onCancel-");
        var curView, vm, fldSet;
        curView = this.getView();
        vm = this.getViewModel();

        fldSet = curView.query('#posrchFldset')[0];
        var btnReset = curView.query('#btnReset')[0];
        var dfFromDate = curView.query('#cboDateFrom')[0];
        var dfFromTo = curView.query('#cboDateTo')[0];
        var cboStates = curView.query('#cboStates')[0];
        var cboDispenseTypes = curView.query('#cboDispenserTypes')[0];

        //debugger;

        dfFromDate.setValue("");
        dfFromTo.setValue("");
        cboStates.clearValue();
        cboStates.clearValue();
        cboDispenseTypes.clearValue();

    },
    /*showPopUp: function (popUpMsg) {
        var mpuPopUp = new Atlas.member.view.memberprofile.MemberPortalUsersPopUp({
            itemConfig: {
                tgtLabel: popUpMsg
            }
        });
        mpuPopUp.show();
    },*/

    onViewClick: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);
        this.getDocumentDetails(record.data.DocumentID);
    },
    onConfirmDeleteClick: function (grid, rowIndex) {


        var vm;
        vm = this.getViewModel();

        var record = grid.getStore().getAt(rowIndex);

        Ext.MessageBox.show({
            title: 'Delete Record',
            msg: 'Are you sure you would like to remove this record?',
            buttons: Ext.MessageBox.OKCANCEL,
            callback: function (btn) {
                //user.portalPlanId = Ext.get('planListCombo').getValue();
                // stops the user from continuing before a plan is selected
                if (btn == 'cancel') {
                    console.log("-------------------------")
                    console.log("CANCEL DELETE")
                    console.log("-------------------------")
                    return;
                }
                else if (btn == 'ok') {
                    console.log("-------------------------")
                    console.log("DeleteJobAndAttachment - Process Delete - record.data.jNum: " + record.data.jNum + "- " + record.data.DocumentID)
                    console.log("-------------------------")

                    var me = this;

                    if (record.data.jNum != null && record.data.jNum.length > 0) {
                        console.log("SetDeleteJobqueueDirectly")

                        var delJobQueueModel = Ext.create('Atlas.pharmacy.model.DeleteJobQueue', {});
                        delJobQueueModel.phantom = false;

                        delJobQueueModel.getProxy().setExtraParam('pJobNumber', record.data.jNum);

                        delJobQueueModel.save({
                            scope: me,
                            failure: function (record, operation) {
                                console.log("delJobQueueModel.success");
                            },
                            success: function (record, operation) {
                                console.log("delJobQueueModel.success");

                            },
                            callback: function (record, operation, success) {
                                console.log("delJobQueueModel.callback");
                            }
                        });


                    }
                    else {

                        console.log("SetAttachmentList")

                        var attachmentListModel = Ext.create('Atlas.pharmacy.model.AttachmentList', {});
                        attachmentListModel.phantom = false;

                        attachmentListModel.getProxy().setExtraParam('pcPlanID', "");
                        attachmentListModel.getProxy().setExtraParam('pcKeyType', 'PharmParentSystemId');
                        attachmentListModel.getProxy().setExtraParam('pcKeyValue', vm.data.srchJobGroupExtMdl.data.systemID);
                        attachmentListModel.getProxy().setExtraParam('pcKeyAction', "D");
                        attachmentListModel.getProxy().setExtraParam('pcDocIDList', record.data.DocumentID);
                        attachmentListModel.getProxy().setExtraParam('pcDescrData', "anything");

                        attachmentListModel.save({
                            scope: me,
                            failure: function (record, operation) {
                                console.log("attachmentListModel.failure");
                            },
                            success: function (record, operation) {
                                console.log("attachmentListModel.success");

                            },
                            callback: function (record, operation, success) {
                                console.log("attachmentListModel.callback");
                            }
                        });


                    }

                    if (record.data.DocumentID != null && record.data.DocumentID > 0) {


                        var deleteDocumentModel = Ext.create('Atlas.pharmacy.model.DeleteDocument', {});
                        deleteDocumentModel.phantom = false;

                        deleteDocumentModel.getProxy().setExtraParam('pDocumentID', record.data.DocumentID);

                        deleteDocumentModel.save({
                            scope: me,
                            failure: function (record, operation) {
                                console.log("deleteDocumentModel.failure");
                            },
                            success: function (record, operation) {
                                console.log("deleteDocumentModel.success");

                            },
                            callback: function (record, operation, success) {
                                console.log("deleteDocumentModel.callback");
                            }
                        });


                    }

                    vm.getStore('jobqueueattachments').reload();

                    return;
                }
            }
        });


    },
    onSubmitContractsAttemptedClick: function (grid, rowIndex) {
        var vm;
        vm = this.getViewModel();
        var me = this;
        var rowRec = grid.getStore().getAt(rowIndex);

        var wRecordType = rowRec.data.RecordType;
        var wDocumentId = rowRec.data.DocumentID;
        var wJnum = rowRec.data.jNum;

/*
        console.log("------------------");
        console.log("rowRec.data.RecordType: " + rowRec.data.RecorType);
        console.log("           wRecordType: " + wRecordType);
        console.log("------------------");
*/

        var user = Ext.first('viewport').getViewModel().get('user');

        var pDescription = "Contracts Attempted";
        var pProgramName = "setPharmacyOutreach.p";
        var pRunMode = "2";
        var pProgramType = "Report";
        var pSaveDocument = "true";
        var pFaxNumber = "";

        wParamaters = user.sessionId + "|" + rowRec.data.DocumentID + "|" + user.un;

//        console.log("wParamaters: " + wParamaters);

        var submitCAJobModel = Ext.create('Atlas.pharmacy.model.SubmitJob', {});
        submitCAJobModel.phantom = false;

        submitCAJobModel.getProxy().setExtraParam('pDescription', pDescription);
        submitCAJobModel.getProxy().setExtraParam('pProgramName', pProgramName);
        submitCAJobModel.getProxy().setExtraParam('pParameters', wParamaters);
        submitCAJobModel.getProxy().setExtraParam('pRunMode', pRunMode);
        submitCAJobModel.getProxy().setExtraParam('pProgramType', pProgramType);
        submitCAJobModel.getProxy().setExtraParam('pSaveDocument', pSaveDocument);
        submitCAJobModel.getProxy().setExtraParam('pFaxNumber', pFaxNumber);
        submitCAJobModel.save({
            scope: me,
            failure: function (record, operation) {
            },
            success: function (record, operation) {

                var parentJobNum = "";

                //if (rowRec.data.RecordType="Attachment") {
                if (wRecordType == "Attachment") {

                    //parentJobNum = rowRec.data.DocumentID;
                    parentJobNum = wDocumentId;

                }
                else {

                    //parentJobNum = rowRec.data.jNum;
                    parentJobNum = wJnum;

                }

                var objSubmitJobResp = Ext.decode(operation.getResponse().responseText);
                var pJobNumber = objSubmitJobResp.metadata.pJobNumber;
                var pMessage = objSubmitJobResp.message[0].message;

                console.log("**** " + pMessage + " - " + pJobNumber + " ****");

                var jobQueueDataModel = Ext.create('Atlas.pharmacy.model.JobQueueData', {});
                jobQueueDataModel.phantom = false;

                jobQueueDataModel.getProxy().setExtraParam('pJobNum', pJobNumber);
                jobQueueDataModel.getProxy().setExtraParam('pFieldList', "parentSystemID,parentJobNum");
                jobQueueDataModel.getProxy().setExtraParam('pFieldValues', vm.data.srchJobGroupExtMdl.data.systemID+ "|" + parentJobNum);
                jobQueueDataModel.save({
                    scope: me,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                        console.log("jobQueueDataModel.success");

                        var fmtMsg = "Successfully submitted 'Contracts Attempted' job. Click 'Results' to see the Contracts Attempted results, after the job is completed.";

                        vm.getStore('jobqueueattachments').reload();

                        Ext.Msg.alert("PBM", fmtMsg);


                    },
                    callback: function (record, operation, success) {
                        console.log("jobQueueDataModel.callback");
                    }

                });

            },
            callback: function (record, operation, success) {
                console.log("submitJobModel.callback");
            }
        });

    },
    showAddAttachmentPopUp: function (button, event, myParam) {

        /*console.log("--------------------");
        console.log("myParam: " + myParam);
        console.log("--------------------");

        var vm;
        vm = this.getViewModel();

        var mpuPopUp = new Atlas.common.view.sharedviews.windows.AddAttachmentPopUp({
            itemConfig: {
                tgtPlanId: '',
                tgtKeyType: 'PharmParentSystemId',
                tgtKeyValue: vm.data.srchJobGroupExtMdl.data.systemID,
                tgtAttachFile: true
            }
        });
        mpuPopUp.show();*/
        var win = Ext.create('Ext.window.Window', {
            title: 'File upload', modal: true,
            width: 400, height: 300,
            layout: {type: 'fit', align: 'stretch'},
            listeners: {
                'beforeclose': 'onUploadWindowClose'
            },
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    keyType: 'imagePBMUpload',
                    fileType: 'xls',
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });

        this.getView().add(win);
        win.show();
        var p = win.down('panel');
        this.uploadVM = p.getViewModel();
    },
    onUploadWindowClose:function () {
        var documentIDList = this.uploadVM.get('documentIDList');
        var vm=this.getViewModel();
        var me=this;
        var store = this.uploadVM.getStore('fileStore');
        var data = store.getData();
        if (documentIDList.length != 0) {

            for (var i=0;i<store.count();i++) {

                var attachmentListModel = Ext.create('Atlas.pharmacy.model.AttachmentList', {});
                attachmentListModel.phantom = false;

                attachmentListModel.getProxy().setExtraParam('pcPlanID', "");
                attachmentListModel.getProxy().setExtraParam('pcKeyType', 'PharmParentSystemId');
                attachmentListModel.getProxy().setExtraParam('pcKeyValue', vm.data.srchJobGroupExtMdl.data.systemID);
                attachmentListModel.getProxy().setExtraParam('pcKeyAction', "A");
                attachmentListModel.getProxy().setExtraParam('pcDocIDList', documentIDList[i]);
                attachmentListModel.getProxy().setExtraParam('pcDescrData', store.getAt(i).get('description'));

                var saveData = attachmentListModel.save();



            }
            vm.getStore('jobqueueattachments').reload();
        }


    },
    getDocumentDetails: function (docID) {
        Atlas.common.utility.Utilities.viewDocument(docID);
    },
    onXLSClick: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        /*
         var pdfPopUp = new Atlas.common.view.sharedviews.windows.PbmPdfPopUp({
         itemConfig: {
         tgtPDF: record.data.DocumentID
         }
         });
         pdfPopUp.show();
         */

        this.getDocumentDetails(record.data.ChildDocIDs);


    }

});
