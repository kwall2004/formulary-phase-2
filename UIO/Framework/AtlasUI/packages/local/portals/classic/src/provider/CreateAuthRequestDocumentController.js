Ext.define('Atlas.portals.provider.CreateAuthRequestDocumentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.providercreateauthdoc',

    onAttachClick: function() {
        var fileUploadField = this.lookup('fileUpload');

        if (fileUploadField.value !== "") {
            fileUploadField.setRawValue('');
            Ext.MessageBox.alert('Error','Invalid file type.');
        } else {
            Ext.MessageBox.alert('Validation Error','Please choose a file.');
        }
    }
});