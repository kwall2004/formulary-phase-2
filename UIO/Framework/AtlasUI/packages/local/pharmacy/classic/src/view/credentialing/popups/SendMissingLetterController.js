/**
 * Created by n6684 on 12/14/2016.
 */

Ext.define('Atlas.pharmacy.view.credentialing.popups.SendMissingLetterController',
    {
        extend: 'Ext.app.ViewController',
        alias: 'controller.credentialingdetail_sendmissinglettercontroller',
        init:function()
        {
            var me = this,
            vm = me.getViewModel(),
            record = me.lookupReference('refFaxLetter').getRecord();

            var paramRecord = me.getView().extraParams["pRecord"];
            var buttonvisibility = false;


            if(!(paramRecord.MissInfoDocId==0 && paramRecord.MissInfoLtrId==0))
            {
                buttonvisibility =false;
                paramRecord.DocId = paramRecord.MissInfoDocId;
                paramRecord.LetterId = paramRecord.MissInfoLtrId;
            }
            else {
                if(!(paramRecord.ExceedTimeDocId==0 && paramRecord.ExceedTimeLtrId==0))
                {
                    buttonvisibility =false;
                    paramRecord.DocId = paramRecord.ExceedTimeDocId;
                    paramRecord.LetterId = paramRecord.ExceedTimeLtrId;
                }
                else{
                    buttonvisibility =true;
                    paramRecord.DocId = 0;
                    paramRecord.LetterId = 0;
                }
            }
            vm.set("sendletterarray",paramRecord);

            this.getView().down("#btnFaxLetterPreview").setDisabled(buttonvisibility);
            this.getView().down("#btnFaxLetterSendfax").setDisabled(buttonvisibility);
            this.getView().down("#btnFaxLetterSend").setDisabled(buttonvisibility);
            this.getLetterDetails("Missing Information Letter","LetterNameId","LetterProgramName");
        },

        getLetterDetails :function (lettertext,filterfieldById,filterfieldByName) {
            var me = this,
                vm = me.getViewModel(),
                record = me.lookupReference('refFaxLetter').getRecord();

            var storeLetterDetails =vm.getStore('storeLetterDetails');
            storeLetterDetails.removeAll();
            storeLetterDetails.getProxy().setExtraParam('pBuffer',"LetterMaster");
            storeLetterDetails.getProxy().setExtraParam('pWhere',"LetterName = '" + lettertext + "' ");
            storeLetterDetails.getProxy().setExtraParam('pField',filterfieldById);
            storeLetterDetails.getProxy().setExtraParam('pOrderBy','');
            storeLetterDetails.getProxy().setExtraParam('pAscDesc','');
            storeLetterDetails.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {

                        var storeproxyLetterDetails = vm.getStore('storeproxyLetterDetails');
                        var dummydata = {lettername: lettertext+filterfieldById, letterId:filterfieldById,LetterProgramName : objResp.data[0].LetterNameId };
                        storeproxyLetterDetails.insert(0, dummydata);

                        var storeLetterDetailsName =vm.getStore('storeLetterDetails');
                        storeLetterDetailsName.getProxy().setExtraParam('pBuffer',"LetterMaster");
                        storeLetterDetailsName.getProxy().setExtraParam('pWhere',"LetterName = '" + lettertext + "' ");
                        storeLetterDetailsName.getProxy().setExtraParam('pField',filterfieldByName);
                        storeLetterDetailsName.getProxy().setExtraParam('pOrderBy','');
                        storeLetterDetailsName.getProxy().setExtraParam('pAscDesc','');
                        storeLetterDetailsName.load( {
                            scope: this,
                            failure: function (record1, operation1) {
                            },
                            success: function (record1, operation1) {
                            },
                            callback: function (record1, operation1, success1) {
                                var objResp1 = Ext.decode(operation1.getResponse().responseText);
                                if (objResp1.message[0].code == 0) {
                                    var storeproxyLetterDetails = vm.getStore('storeproxyLetterDetails');
                                    var dummydata = {lettername: lettertext+filterfieldByName, letterId:filterfieldByName,LetterProgramName : objResp1.data[0].LetterProgramName };
                                    storeproxyLetterDetails.insert(0, dummydata);
                                }
                            }
                        });
                    }
                }
            });
        },

        letterchange:function(radiogroup, radio){
            var me = this,
                vm = me.getViewModel();
            if(radio=='Exceeded Time Frame letter')
                this.getLetterDetails("Exceeded Time Frame letter","LetterNameId","LetterProgramName");
            else
                this.getLetterDetails("Missing Information Letter","LetterNameId","LetterProgramName");

            var paramRecord = me.getView().extraParams["pRecord"];
            if(!(paramRecord.MissInfoDocId==0 && paramRecord.MissInfoLtrId==0))
            {
                paramRecord.DocId = paramRecord.MissInfoDocId;
                paramRecord.LetterId = paramRecord.MissInfoLtrId;
            }
            else {
                if(!(paramRecord.ExceedTimeDocId==0 && paramRecord.ExceedTimeLtrId==0))
                {
                    paramRecord.DocId = paramRecord.ExceedTimeDocId;
                    paramRecord.LetterId = paramRecord.ExceedTimeLtrId;
                }
                else{
                    paramRecord.DocId = 0;
                    paramRecord.LetterId = 0;
                }
            }
            vm.set("sendletterarray",paramRecord);
        },

        btnFaxLetterSaveclick:function () {

                var me = this,
                vm = me.getViewModel(),
                record = me.lookupReference('refFaxLetter').getRecord();

            if (vm.getStore('storeproxyLetterDetails').findRecord("letterId","LetterProgramName").data.LetterProgramName == "" || vm.getStore('storeproxyLetterDetails').findRecord("letterId","LetterNameId").data.LetterProgramName == "")
            {
                Ext.Msg.alert("PBM Error", "Letter setup missing");
                return;
            }

           var fields = "CreateDate,CreateBy,ParentSystemID,LetterNameID";
            var values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + me.getView().extraParams["pRecord"].CredSystemId + "|" + vm.getStore('storeproxyLetterDetails').findRecord("letterId","LetterNameId").data.LetterProgramName;


            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];
            var extraParameters = {
                pLetterID: 0,
                pMode: "A",
                pFields :fields,
                pValues :values
            };

            var setLetterDetail = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
                saveAction,  ['pretLetterID']);


            if (setLetterDetail.code == 0) {

                if(setLetterDetail.pretLetterID)
                {
                    extraParameters = {
                        pLetterID: setLetterDetail.pretLetterID,
                        pLetterProgramName: vm.getStore('storeproxyLetterDetails').findRecord("letterId","LetterProgramName").data.LetterProgramName
                    };
                    var setletterdocument = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdocument/update', null, [false], extraParameters,
                        saveAction,  ['DocID']);
                    if (setletterdocument.code == 0) {
                        var storeDocument = vm.getStore("storeDocument");
                        storeDocument.load({
                            params: {
                                pLetterID: setLetterDetail.pretLetterID,
                                pFields:"DocID"
                            },
                            callback: function (record, operation) {
                                var status = operation.getResultSet().message[0];

                                if (record) {
                                    var paramRecord = me.getView().extraParams["pRecord"];
                                    paramRecord.DocId = record[0].data.DocID;
                                    paramRecord.LetterId = setLetterDetail.pretLetterID;
                                    vm.set("sendletterarray",paramRecord);
                                    //var controller = Ext.create('Atlas.pharmacy.view.credentialing.CredentialingController');
                                    me.fireEvent('updatesendfaxdetail');
                                    var attachmentList= me.setAttachmentlist('',me.getView().extraParams["pRecord"].KeyType,me.getView().extraParams["pRecord"].KeyValue,"A",record[0].data.DocID,me.getView().down("#rgsendfax").getValue().radio+" Generated faxed");
                                    if (attachmentList.message == 'Successful' || attachmentList.message.indexOf("Relationship")!=-1) {
                                    //if (attachmentList.code==0) {
                                        Ext.Msg.alert('Success', 'Letter has been generated successfully.');
                                        me.getView().down("#btnFaxLetterPreview").setDisabled(false);
                                        me.getView().down("#btnFaxLetterSendfax").setDisabled(false);
                                        me.getView().down("#btnFaxLetterSend").setDisabled(false);
                                    }
                                    else {
                                        Ext.Msg.alert('Error', attachmentList.message);
                                    }
                                }

                            }
                        });

                    }
                }
            }
        },

        setAttachmentlist:function (planid,keytype,keyvalue,keyaction,docid,docdesc) {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];
            var extraParameters = {
                pcPlanID: planid,
                pcKeyType: keytype,
                pcKeyValue :keyvalue,
                pcKeyAction :keyaction,
                pcDocIDList:docid,
                pcDescrData:docdesc
            };

            var setattachmentlist = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', '', [false], extraParameters,
                saveAction, null);

            return setattachmentlist;
        },

        btnFaxLetterPreviewclick:function () {
            var me = this;
            var documentID =me.getView().extraParams["pRecord"].DocId;
            var modelViewPDF = Ext.create('Atlas.common.model.shared.ViewPDF');
            modelViewPDF.getProxy().setExtraParam('pDocumentID', documentID);
            modelViewPDF.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        Atlas.common.utility.Utilities.displayDocument('pdf', objResp.metadata.pData);
                    }
                    else {
                        Ext.Msg.alert('Message', 'PDF Document is being generated. Please try again later.');
                    }
                }
            });
        },

        btnFaxLetterSendfaxclick:function () {

            var me = this,
                vm = me.getViewModel(),
                record = me.lookupReference('refFaxLetter').getRecord();

            var attachmentList= me.setAttachmentlist('',me.getView().extraParams["pRecord"].KeyType,me.getView().extraParams["pRecord"].KeyValue,"A",me.getView().extraParams["pRecord"].DocId,me.getView().down("#rgsendfax").getValue().radio+" Faxed");

            if (attachmentList.message == 'Successful') {
                var saveAction = [{
                    "Save": {"key": '', "value": ''}
                }];
                var extraParameters = {
                    pDescription: me.getView().down("#rgsendfax").getValue().radio+" sent to "+me.getView().extraParams["pRecord"].faxnumber,
                    pProgramName: "faxDocument.p",
                    pParameters :me.getView().extraParams["pRecord"].DocId + "|1",
                    pRunMode :2,
                    pProgramType:"Fax",
                    pSaveDocument:true,
                    pFaxNumber:me.getView().extraParams["pRecord"].faxnumber
                };

                var setsubmitjob = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
                    saveAction,  ['pDocumentID']);

                if (setsubmitjob.code == 0) {
                    this.saveletterdetail(false);
                }
            }
            else {
                Ext.Msg.alert('Error', attachmentList.message);
            }


        },

        btnFaxLetterSendclick:function () {
           this.saveletterdetail(true)
        },

        saveletterdetail:function (isattachmentsaved) {
            var me = this,
                vm = me.getViewModel(),
                record = me.lookupReference('refFaxLetter').getRecord();

            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];
            var extraParameters = {
                pLetterID:  me.getView().extraParams["pRecord"].LetterId,
                pMode: "U",
                pFields :"sentBy,sentDate,AssignTo",
                pValues :Atlas.user.un + "|" +Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y')+ "|" + ""
            };
            var setLetterDetail = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
                saveAction,  ['pretLetterID']);


            if (setLetterDetail.code == 0) {
                if(setLetterDetail.pretLetterID)
                {

                    if(!isattachmentsaved)
                    {
                        me.closeCurrentWIndow();
                        Ext.Msg.alert('Fax', 'Please check your fax status in Job Queue.');

                        return;
                    }

                    var attachmentList= me.setAttachmentlist('',me.getView().extraParams["pRecord"].KeyType,me.getView().extraParams["pRecord"].KeyValue,"A",me.getView().extraParams["pRecord"].DocId,me.getView().down("#rgsendfax").getValue().radio+" Sent");
                    if (attachmentList.message == 'Successful') {
                        me.closeCurrentWIndow();
                        Ext.Msg.alert('Success', 'Missing Information Letter sent successfully.');

                    }
                    else {
                        Ext.Msg.alert('Error', attachmentList.message);
                    }
                }
            }
        },

        closeCurrentWIndow:function () {
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }
    }
);