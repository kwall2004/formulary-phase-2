Ext.define('Atlas.common.view.sharedviews.windows.AddAttachmentPopUpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addattach',

    init: function () {
        this.resetControls();
    },

    saveAttachment: function () {


        var curViewModel;
        curViewModel = this.getViewModel();


        var form = this.lookupReference('fileForm'),
            fileInput = {},
            reader = new FileReader(),
            me = this,
            user = Ext.first('viewport').getViewModel().getData().user;


        //var lAttach = true;

        if (form.isValid()) {
            fileInput = Ext.select('[name="attachmentFile"]').elements[0];
            reader.readAsDataURL(fileInput.files[0]);



            reader.onload = function () {

                /*
                 From POP UP get the following:
                 description
                 extension
                 filename


                 imagePath = 'imagePBMUpload',
                 imageData = reader.result.replace('data:application/pdf;base64,', ''),

                 */

                var description = me.lookupReference('fileDescription').value,
                    extension = fileInput.files[0].name.split('.').pop(),
                    fileName = fileInput.files[0].name.split('.')[0],
                    imagePath,
                    imageData;

                /*
                 -------------------------------------------------------
                 -------------------------------------------------------
                 THIS MUST BE BUILT DYNAMICALLY WITH A BIG IF STATEMENT
                 -------------------------------------------------------
                 -------------------------------------------------------
                 From inKeyType you determine how to allocate type of file
                 -------------------------------------------------------
                 */

                //debugger;


                if (curViewModel.data.inKeyType == 'PharmParentSystemId') {
                    imagePath = 'imageOutreach';
                    imageData = reader.result.replace('data:application/pdf;base64,', '');
                }


                documentModel = Ext.create('Atlas.common.model.shared.Document', {});

                documentModel.phantom = false;
                documentModel.getProxy().url = 'shared/rx/document';
                documentModel.getProxy().setExtraParam('pcDocDescr', description);
                documentModel.getProxy().setExtraParam('pcKeyType', imagePath);
                documentModel.getProxy().setExtraParam('pcFileName', fileName);
                documentModel.getProxy().setExtraParam('plcImgData', imageData);
                documentModel.getProxy().setExtraParam('pcFileType', extension);
                documentModel.save({

                    success: function (record, operation) {

                        //var documentModelResp2 = Ext.decode(operation.getResponse().responseText);
                        //var pMetadata2 = documentModelResp2.metadata;

                        var retDocId;

                        //debugger;

                        var retDocId = this.getProxy().getReader().metaData.pcRetDocID;

                        //if (this.getProxy().getReader().metaData) {

                        //    retDocid = this.getProxy().getReader().metaData.pcRetDocID;
                        //    console.log("** callback metaData exists retDocid: " + retDocId);
                        //}

                        console.log("** success for documentModel retDocid = " + retDocId);

                        if (!retDocId) {
                            Ext.Msg.alert('FAILURE', 'No file uploaded');
                            return;
                        }
                        else {

                            //debugger;


                            if (curViewModel.data.inAttachFile) {

                                var modelSetAttachmentList = Ext.create('Atlas.common.model.AttachmentList');
                                modelSetAttachmentList.getProxy().setExtraParam('pcPlanID', curViewModel.data.inPlanId);
                                modelSetAttachmentList.getProxy().setExtraParam('pcKeyType', curViewModel.data.inKeyType);
                                modelSetAttachmentList.getProxy().setExtraParam('pcKeyValue', curViewModel.data.inKeyValue);
                                modelSetAttachmentList.getProxy().setExtraParam('pcKeyAction', 'A');
                                modelSetAttachmentList.getProxy().setExtraParam('pcDocIDList', retDocId);
                                modelSetAttachmentList.getProxy().setExtraParam('pcDescrData', description);

                                modelSetAttachmentList.phantom = false;

                                //debugger;

                                modelSetAttachmentList.save({
                                    success: function (record, operation) {

                                        Ext.Msg.alert('SUCCESS', "#2 Congratulations, your file is Uploaded - '" + retDocId + "' And Attached for '" + curViewModel.data.inKeyType + "'.");

                                    }
                                });


                            }
                            else {

                                Ext.Msg.alert("SUCCESS", "#1 Congratulations, your file is uploaded... as '" + retDocId + "'.");
                            }
                        }

                        //debugger;


                        /*
                         me.fireEvent('fileUploaded', {
                         fileName: fileName,
                         description: description,
                         docId: id.replace(/\s+/g,''),
                         size: fileInput.files[0].size
                         });*/

                        //me.resetControls();
                        //me.getView().close();
                        //me.getView().destroy();

                    },

                    callback: function (record, operation) {

                        if (this.getProxy().getReader().metaData) {

                            console.log("** callback metaData exists #1 ** ");

                        }

                        console.log("**callback for documentModel* * ***");

                    }
                });
            }

        }
    },

    resetControls: function () {
        this.lookupReference('fileForm').reset();
    },
    onFileUploaded: function (document) {
        var fileAttachmentModel = Ext.create('Atlas.portals.prescriber.model.FileAttachment', {}),
            fileAttachmentStore = this.getViewModel().getStore('fileAttachments');

        Ext.Msg.alert('Success', 'Uploaded file: ' + document.fileName + ', Size: ' + document.size + ' bytes');

        fileAttachmentModel.set('FaxAttach', document.fileName);
        fileAttachmentModel.set('AttcDescr', document.description);
        fileAttachmentModel.set('DocumentID', document.docId);
        fileAttachmentModel.set('AttcDate', this.formatDate(new Date()));
        fileAttachmentStore.insert(0, fileAttachmentModel);
    }

});