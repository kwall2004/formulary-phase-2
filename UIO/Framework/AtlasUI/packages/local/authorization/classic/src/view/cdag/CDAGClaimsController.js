/**
 * Created by j2487 on 10/22/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGClaimsController', {
    extend: 'Atlas.common.view.sharedviews.ClaimsController',
    alias: 'controller.cdagclaims',

    onClaimsSearch: function() {
        var view = this.getView(),
            GCN = '',
            GPI = '',
            NDC,
            claimSearchExtraParam = '',
            cdagMain = view.up('cdagmain'),
            DeterminationType = cdagMain.down('#cbxDeterminationType').getValue(),
            recipientID = cdagMain.down('#lblRecipientID').getText();

        if (recipientID == '' || recipientID == undefined || recipientID == null) {
            recipientID = '0';
        }

        if (!cdagMain.down('#cbxMedication').hidden) {
            GCN = cdagMain.down('#lblGCN').text == undefined || cdagMain.down('#lblGCN').text == null ? '' : cdagMain.down('#lblGCN').text;
        }
        else if (!cdagMain.down('#cbxGPINDC').hidden) {
            GPI = cdagMain.down('#lblGPICode14').text == undefined || cdagMain.down('#lblGPICode14').text == null ? '' : cdagMain.down('#lblGPICode14').text;
        }

        NDC = cdagMain.down('#hdnNDC').getValue() == undefined || cdagMain.down('#hdnNDC').getValue() == null ? '' : cdagMain.down('#hdnNDC').getValue();

        if (DeterminationType == 'CD') {
            claimSearchExtraParam = (GCN != '' ? 'GCN|' + GCN : 'GPI|' + GPI);
        }
        else {
            claimSearchExtraParam = 'NDC|' + NDC;
        }

        this.fireEvent('SearchClaimsCommonController', 'recipientID', recipientID, false, 'CDAG|' + claimSearchExtraParam);
    }

});
