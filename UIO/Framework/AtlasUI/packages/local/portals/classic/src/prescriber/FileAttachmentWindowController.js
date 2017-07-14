Ext.define('Atlas.portals.prescriber.FileAttachmentWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fileattachmentwindowcontroller',

    init: function() {
        this.resetControls();
    },

    saveAttachment: function() {
        var form = this.lookupReference('fileForm'),
            fileInput = {},
            reader = new FileReader(),
            me = this,
            user = Ext.first('viewport').getViewModel().getData().user;

        if (form.isValid()) {
            fileInput = Ext.select('[name="attachmentFile"]').elements[0];
            reader.readAsDataURL(fileInput.files[0]);
            reader.onload = function() {
                var description = me.lookupReference('fileDescription').value,
                    extension = fileInput.files[0].name.split('.').pop(),
                    imagePath = 'imagePBMUpload',
                    imageData = reader.result.replace('data:application/pdf;base64,', ''),
                    fileName = fileInput.files[0].name.split('.')[0],
                    documentModel = Ext.create('Atlas.common.model.shared.Document', {});

                documentModel.phantom = false;
                documentModel.getProxy().url = 'shared/rx/document';
                documentModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
                documentModel.getProxy().setExtraParam('pcDocDescr', description);
                documentModel.getProxy().setExtraParam('pcKeyType', imagePath);
                documentModel.getProxy().setExtraParam('pcFileName', fileName);
                documentModel.getProxy().setExtraParam('plcImgData', imageData);
                documentModel.getProxy().setExtraParam('pcFileType', extension);
                documentModel.save({
                    callback: function(record, operation) {

                        //debugger;
                        var id = this.getProxy().getReader().metaData.pcRetDocID;

                        if (!id) {
                            Ext.Msg.alert('Fail', 'No file uploaded');
                            return;
                        }

                        me.fireEvent('fileUploaded', {
                            fileName: fileName,
                            description: description,
                            docId: id.replace(/\s+/g,''),
                            size: fileInput.files[0].size
                        });
                        me.resetControls();
                        me.getView().close();
                    }
                });
            }
        }
    },

    resetControls: function() {
        this.lookupReference('fileForm').reset();
    }
});