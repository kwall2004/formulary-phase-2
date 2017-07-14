Ext.define('Atlas.common.view.merlin.FileUploaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fileuploader',
    id: 'common-fileUploadController',

    /**
     * Called when the view is created
     */
    init: function () {
        var theView = this.getView(),
            vm = this.getViewModel();
        theView.maxUploadNum = 1;

        if (!theView.keyType) {
            Ext.Msg.alert('Error', 'Key type is not set yet, please set it via keyType property');
            theView.close();
            return false;
        }

        /*if (!theView.endpoint) {
            Ext.Msg.alert('Error', 'Endpoint is not set yet, please set it via endpoint property');
            theView.close();
            return false;
        }*/

        vm.set('fileType', theView.fileType == null ? ['pdf', 'jpg', 'png', 'xlsx', 'csv', 'xls', 'doc', 'docx', 'txt'] : theView.fileType.split(','));
        vm.set('keyType', theView.keyType);
        //vm.set('endpoint', theView.endpoint);
    },

    onDrop: function (e) {
        var theView = this.getView(),
            element = theView.down('grid').el;

        e.stopEvent();

        element.removeCls('fileupload');

        var theViewModel = theView.getViewModel(),
            theStore = theViewModel.getStore('fileStore'),
            maxUploadNum = theView.maxUploadNum;
        Ext.Array.forEach(Ext.Array.from(e.browserEvent.dataTransfer.files), function (file, index, array) {
            var totalRecs = array.length + theStore.getCount();
            if (file.name.indexOf(' ') !== -1){
                Ext.Msg.alert('Invalid File Name', 'The name of the file(s) contains one or more spaces. Remove all spaces from the file name(s)');
                return;
            }
            if ((maxUploadNum) && (totalRecs > maxUploadNum)) {
                Ext.Msg.alert('Max File Upload', 'Number of files exceed maximum upload amount of ' + maxUploadNum);
            }
            else {
                var fileNameArray = file.name.split('.');
                var fileExt = fileNameArray[fileNameArray.length - 1];
                var fileExtArray = theViewModel.get('fileType');
                if (fileExtArray.indexOf(fileExt) == -1) {
                    var stringFileType = '';
                    fileExtArray.forEach(function (element) {
                        stringFileType = stringFileType + ',' + element;
                    });
                    stringFileType = stringFileType.substr(1);
                    Ext.Msg.alert('Validation', 'File type must be one of the following: ' + stringFileType);
                    return;
                }
                var keyType = theViewModel.get('keyType');
                var records = theStore.add({
                    file: file,
                    name: file.name,
                    status: 'Ready',
                    size: file.size,
                    fileType: fileExt,
                    keyType: keyType
                });
                //grid.getView().refresh();
                //console.log(file);
            }
        });
        return false;
    },



    addDropZone: function(e) {
        if (!e.browserEvent.dataTransfer || Ext.Array.from(e.browserEvent.dataTransfer.types).indexOf('Files') === -1) {
            return;
        }

        e.stopEvent();

        this.getView().down('grid').el.addCls('fileupload');
    },

    removeDropZone: function(e) {
        var el = e.getTarget(),
            thisEl = this.getView().down('grid').el;

        e.stopEvent();

        if (el === thisEl.dom) {
            thisEl.removeCls('fileupload');
            return;
        }

        while (el !== thisEl.dom && el && el.parentNode) {
            el = el.parentNode;
        }

        if (el !== thisEl.dom) {
            thisEl.removeCls('fileupload');
        }
    },

    uploadFiles: function () {
        var me = this,
            theView = me.getView(),
            grid = theView.down('#fileUploaderGrid'),
            vm = me.getViewModel(),
         store = vm.getStore('fileStore');
        var formData = new FormData();
        var files = [];
        if(store && store.data && store.data.items) {
            var rec = store.getData().getAt(0);
            if (!(rec.get('status') === "Uploaded")) {
                if (!rec.get('keyType') || rec.get('keyType') == '') {
                    Ext.Msg.alert('Error', 'Please enter key Type');
                    return false;
                }
                if (!rec.get('description') || rec.get('description') == '') {
                    Ext.Msg.alert('Error', 'Please enter document description');
                    return false;
                }
                /*Ext.Function.defer(function(){
                    rec.set('status', 'Uploading');
                },100);*/


                //store.load();

                //store.loadData(rec);
                //grid.setStore(store);
                //grid.render();

                var fileToUpload = rec.get('file');
                if(fileToUpload.size <  50000000) // 50 MB max size
                {
                    rec.set('status', 'Uploading');
                    Ext.Function.defer(function(){
                        // formData.append('file', fileToUpload, fileToUpload.name);
                        formData.append('fileDescription', rec.get('description'));
                        formData.append('filekeyType', rec.get('keyType'));
                        formData.append('filefileType', rec.get('fileType'));
                        formData.append(('pSessionId'), Atlas.user.sessionId);
                        formData.append('file', fileToUpload, fileToUpload.name);
                        //formData.append(('pSessionID'),Atlas.user.sessionId);//,rec.get('keyType'),rec.get('fileType'));

                        var uploadResult = Atlas.common.utility.Utilities.fileUpload(formData,

                            ['pcRetDocID']
                        );
                        if (uploadResult.response) {
                            if (uploadResult.response.resultCode != 0) {
                                rec.set('status', 'Error');
                                Ext.Msg.alert('Files upload Error', 'Document was not created: ' + uploadResult.message)
                            }
                            else {
                                rec.set('status', 'Uploaded');
                                vm.get('documentIDList').push(uploadResult.response.pcRetDocID);
                                me.fireEvent('successfulUpload', vm.get('documentIDList'), theView.origin);
                                //theView.up('window').close();
                            }
                        }
                        else {
                            rec.set('status', 'Error');
                        }

                    },200);
                }
                else
                {
                    rec.set('status', 'Too big a file to upload!. Max is 50 MB');
                }


            }

        }

    },
    removeAllFiles: function () {
        //debugger;
        var me = this,
            store = me.getViewModel().getStore('fileStore');
        store.reload();
    },
    removeUploadedFiles: function () {
        //debugger;
        var me = this,
            store = me.getViewModel().getStore('fileStore');
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.getData().getAt(i);
            if ((record.data.status === "Uploaded")) {
                store.remove(record);
                i--;
            }
        }
    },
    removeSelectedFiles: function () {
        //debugger;
        var me = this,
            grid = me.getView().down('grid'),
            store = me.getViewModel().getStore('fileStore');
        store.remove(grid.getSelection());
    }
});