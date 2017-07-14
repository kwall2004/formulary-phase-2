Ext.define('Atlas.portals.view.rxmember.FormularyViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewFormulary',

    init: function() {
        var me = this,
            view = this.getViewModel(),
            FStore = view.getStore('Formularystore'),
            recipientId = Ext.first('viewport').getViewModel().getData().user.retRecipientID;

        FStore.getProxy().setExtraParam('pRecipientId', recipientId);
        FStore.load();

    },

    onBtnClick: function (grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex),
            url = Atlas.apiURL + 'portal/rx/formularydocument/read',
            planGroupId = record.getData().planGroupId,
            sessionId =  Ext.first('viewport').getViewModel().getData().user.retSessionID;

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                ipiPlanGroupId : planGroupId,
                pSessionID : sessionId
            }),
            success: function (response) {
                var obj = Ext.decode(response.responseText),
                    base64EncodedPDF = obj.metadata.oplcData;
                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    Ext.MessageBox.alert('Error', 'Document data not found.', function(){});
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            }
        });


    }

});