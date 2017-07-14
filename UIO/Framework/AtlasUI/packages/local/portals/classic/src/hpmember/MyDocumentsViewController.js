/**
 * Created by T3852 on 10/26/2016.
 */
Ext.define('Atlas.portals.hpmember.MyDocumentsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mydocumentsview',

    /**
     * Called when the view is created
     */
    init: function() {
        var familyListStore = {},
            combo = this.lookupReference('familyListCombo'),
            user = Ext.first('viewport').getViewModel().get('user');

        familyListStore = new Ext.data.Store({
            fields: [
                'familyList'
            ]
        });

        familyListStore.loadData(user.familyList);
        combo.setStore(familyListStore);
        combo.select(combo.getStore().getAt(0));
        this.searchDocuments();
    },

    searchDocuments: function () {
        var me = this,
            vm = me.getViewModel(),
            documentList = vm.getStore('documentlist'),
            myDocumentsForm = me.lookup('myDocumentsForm'),
            validForm = myDocumentsForm.isValid();

        if (validForm === true) {
            var formValues = myDocumentsForm.getValues();

            documentList.getProxy().setExtraParam('pRecipientID', formValues.familyCombo);
            documentList.getProxy().setExtraParam('pFromDate', formValues.fromDate);
            documentList.getProxy().setExtraParam('pThruDate', formValues.toDate);
            documentList.load();
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
                    Ext.MessageBox.alert('Error', 'Document Not Found.', function(){});
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            },
            failure: function() {
                Ext.MessageBox.alert('Error', 'Unable to download document. Please try again later. If the problem persists, please call Member/Provider services.', function(){});
            }
        });
    }
});