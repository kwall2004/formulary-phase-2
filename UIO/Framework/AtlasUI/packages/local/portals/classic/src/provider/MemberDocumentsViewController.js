Ext.define('Atlas.portals.provider.MemberDocumentsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberdocuments',

    init: function() {
        var me = this,
            refs = this.getReferences(),
            toDate = refs.toDate,
            fromDate = refs.fromDate;

        toDate.setMinValue(fromDate.getValue());
        fromDate.setMaxValue(toDate.getValue());
    },

    afterRender: function () {
        this.searchDocuments();
    },

    searchDocuments: function () {
        var documentList = this.getViewModel().getStore('documentlist'),
            myDocumentsForm = this.lookup('myDocumentsForm'),
            validForm = myDocumentsForm.isValid(),
            recipientId = this.getView().up().up().getViewModel().data.recipientId;

        if (validForm === true) {
            var formValues = myDocumentsForm.getValues();

            documentList.getProxy().setExtraParam('pRecipientID', recipientId);
            documentList.getProxy().setExtraParam('pFromDate', formValues.fromDate);
            documentList.getProxy().setExtraParam('pThruDate', formValues.toDate);
            documentList.load();
        }
        else {
            Ext.Msg.alert('Date Range Error', 'From date cannot be after to date.');
        }

    },

    viewDocument: function (grid, rowIndex, colIndex) {
        var me = this,
            vm = me.getViewModel(),
            requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64Portal', {}),
            selectedDoc = grid.getStore().getAt(rowIndex).data;

        requestModel.phantom = false;
        requestModel.getProxy().setExtraParam('pRegenReport', 3);
        requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
        requestModel.getProxy().setExtraParam('pParameters', selectedDoc.recipientID + '|' + selectedDoc.imageFileName);

        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;

                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    Ext.MessageBox.alert('Error', 'Document Not Found.', function () { });
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            },
            failure: function () {
                Ext.MessageBox.alert('Error', 'Unable to download document. Please try again later. If the problem persists, please call Member/Provider services.', function () { });
            }
        });
    },

    onFromDateChange: function (sender, newValue, oldValue) {
        var me = this,
            toDate = this.lookupReference('toDate');

        toDate.setMinValue(newValue);
    },

    onToDateChange: function (sender, newValue, oldValue) {
        var me = this,
            fromDate = this.lookupReference('fromDate');
        fromDate.setMaxValue(newValue);
    }

});