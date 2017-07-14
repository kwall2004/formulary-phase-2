/**
 * Created by c4539 on 1/24/2017.
 */
Ext.define('Atlas.portals.provider.AuthAttachmentWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderAuthAttachmentWindow',

    init: function() {
        this.loadAttachments();
    },

    loadAttachments: function() {
        var vm = this.getView().getViewModel(),
            attachmentStore = vm.getStore('documents'),
            vWhere = 'parentSystemID=' + vm.get('systemId');

        attachmentStore.getProxy().setExtraParam('pWhere', vWhere);
        attachmentStore.getProxy().setExtraParam('pRowid', '');
        attachmentStore.getProxy().setExtraParam('pRowNum', 0);
        attachmentStore.getProxy().setExtraParam('pRows', 25);
        attachmentStore.getProxy().setExtraParam('pSort', 'createDate DESC');
        attachmentStore.load();
    },

    onViewAttachment: function(view, rowIndex, colIndex, item, e, record) {
        var jobNum = record.get('jobNum'),
            printModel = Ext.create('Atlas.portals.provider.model.CMViewFile', {});

        printModel.getProxy().setExtraParam('pjobnum', jobNum);
        printModel.load({
            callback: function(record) {
                var metadata = this.getProxy().getReader().metaData;

                if (metadata && metadata.ptempdata) {
                    var fileName = Date.now().toString() + '.' + metadata.pretfilenam.split('.')[1];
                    if(Ext.browser.is.IE && window.navigator.msSaveOrOpenBlob){
                        var byteCharacters = Atlas.common.utility.Utilities.base64ToArrayBuffer(Ext.util.Base64.decode(metadata.ptempdata).split(',')[1]);
                        var fileContent = new Blob([byteCharacters], {"type": metadata.pretfilenam.split('.')[1]});
                        window.navigator.msSaveOrOpenBlob(fileContent, fileName);
                    } else {
                        var uri = Ext.util.Base64.decode(metadata.ptempdata);
                        var link = document.createElement("a");
                        link.href = uri;
                        link.style = "visibility:hidden";
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                    return;
                }

                Ext.MessageBox.alert('Error', 'Document data not found.', function(){});
            }
        })
    },

    onSubmit: function() {
        var form = this.lookupReference('uploadForm'),
            fileInput = {},
            reader = new FileReader(),
            me = this;

        if (!form.isValid()) { return; }

        fileInput = Ext.select('[name="fileToUpload"]').elements[0];
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function() {
            var ext = fileInput.files[0].name.split('.')[1],
                data = reader.result;

            if ((ext === 'jpg') || (ext === 'jpeg') || (ext === 'pdf') || (ext === 'gif') || (ext === 'png')) {
                Ext.Ajax.request({
                    useDefaultXhrHeader: false,
                    withCredentials: true,
                    paramsAsJson: true,
                    noCache: false,
                    url: Atlas.apiURL + 'caremanagement/hp/cmattachmentweb/update',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode({
                        pSessionID: Atlas.user.sessionId,
                        pUsername: Atlas.user.un,
                        pJobNumber: 0,
                        pFilename: 'OD_Auth_Attach_from_Web.' + ext,
                        pSystemID: me.getView().getViewModel().get('systemId'),
                        pData: Ext.util.Base64.encode(data),
                        pFileType: ext,
                        pDesc: 'Attachment from web',
                        userState: Atlas.user.providerStateSelected
                    }),
                    success: function (response, opts) {
                        me.loadAttachments();
                    }
                });
                return;
            }

            Ext.Msg.alert('Error', 'Invalid file format. Accepted formats include jpg, jpeg, png, gif, and pdf');
        };
    }
});