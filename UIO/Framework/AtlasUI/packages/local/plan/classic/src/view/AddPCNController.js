/**
 * Created by b2352 on 11/11/2016.
 */
Ext.define('Atlas.plan.view.AddPCNController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-addpcn',
    listen: {
        controller: {
            '*': {
                loadPCNGrid: 'onLoadPCNGrid'
            }
        }
    },

    init: function () {

        var me = this;
        var frmAction = this.getView().action;
        this.getView().title = 'Add PCN Details';
        if (frmAction == 'update'){
            this.getView().title = 'Update PCN Details';
        }
        me.getView().down('form').loadRecord(me.getView().winModel);
        if(me.getView().winModel.data.systemId != null){
            me.lookupReference('pcnCode').setDisabled(true) ;
        }
    },

    onCancelClick: function () {
        this.getView().destroy();
    },

    onSaveForm: function (button) {
        var me = this;
        var frmAction = this.getView().action;
        if (frmAction == 'update'){
            frmAction = 'U'
        }else {
            frmAction = 'A'
        }

        var form = me.getView().down('form');
        form.updateRecord();
        if(form.isValid()) {
            var frmModelRecord = form.getRecord();
            var fmtParms = this.generateParams(frmModelRecord, frmAction);
            var testReturn = Atlas.common.utility.Utilities.post('claims/rx/pcnmaster/update', fmtParms, null);
            if(testReturn!=null && testReturn.code==0 ) {
                if(frmAction == 'U') {
                    Ext.MessageBox.alert("PBM", "Record successfully updated!");
                }
                else
                {
                    Ext.MessageBox.alert("PBM", "PCN Details successfully saved");
                }
            }
            if(testReturn && testReturn.code != 0)
            {
                Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
            }
            form.updateRecord();
            this.fireEvent('loadPCNGrid', frmModelRecord.data.carrierId, frmModelRecord.data.carrierAcctNumber, frmModelRecord.data.carrierLOBId);
            this.getView().close();
        }
        else
        {
            Ext.MessageBox.alert("PBM","Please fill all required fields.");
        }
    },

    generateParams: function (inRecord, action) {
        if (inRecord == null)
            return null;

        var fields = 'pcnDesc,BIN,carrierAcctNumber,multiAccount,DMRCustCode,DMRlobname,systemID';
        if(action=='A') {
            fields = 'pcnDesc,BIN,carrierAcctNumber,multiAccount,DMRCustCode,DMRlobname';
        }
        var values = [],
            params = {
                pSessionID: Atlas.user.sessionId,
                pPCNCode: inRecord.data.pcnCode,
                pCarrierId: inRecord.data.carrierId,
                pCarrierAcctNumber: this.getView().winModel.data.carrierAcctNumber,
                pCarrierLOBId: inRecord.data.carrierLOBId,
                pAction: action,
                pFields: fields
            };
        values.push(inRecord.data.pcnDesc);
        values.push(inRecord.data.BIN);
        values.push(this.getView().winModel.data.carrierAcctNumber);
        values.push(inRecord.data.multiAccount);
        values.push(inRecord.data.dmrCustCode);
        values.push(inRecord.data.dmrLobName);
        if(action !='A') {
            values.push(this.getView().winModel.data.systemId);
        }
        params.pValues = values.join('|');
        return params
    },

    onLoadPCNGrid: function (carrierId, account, lob) {
    }

});
