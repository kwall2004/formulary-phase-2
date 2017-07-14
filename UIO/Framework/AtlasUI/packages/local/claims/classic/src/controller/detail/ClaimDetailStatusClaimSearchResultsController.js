

Ext.define('Atlas.claims.controller.detail.ClaimDetailStatusClaimSearchResultsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claimSearchResultsController',
    requires: [
        'Atlas.claims.model.detail.searchResultsModel'
    ],
    bind: {
        store: '{claimsDetailResult}'
    },    

    conditionalView: function (me, record, id) {

        var container = this.getView().up('claimDetail');
        var componentMed1 = container.down('#ClaimDetailStatusClaimDetailMedicalID');
        var componentMed2 = container.down('#ClaimDetailStatusProviderInfoID');
        var componentMed3 = container.down('#ClaimDetailStatusFacilityInfoID');

        var componentPBM1 = container.down('#claimDetailStatusClaimDetailID');
        var componentPBM2 = container.down('#claimDetailStatusPharmacyInfoID');
        var componentPBM3 = container.down('#claimDetailStatusPrescriberInfoID');
        var componentPBM4 = container.down('#ClaimDetailStatusDurAlertsID');
        var componentPBM5 = container.down('#ClaimDetailStatusAccumulatedSummaryID');
        var componentPBM6 = container.down('#ClaimDetailStatusDrugPricingID');
        var componentPBM7 = container.down('#claimDetailStatusHoldPaymentID');
        var componentPBM8 = container.down('#ClaimDetailStatusTransactionInfoID');

        if (record.get('claimType') == 'PBM') {
            componentMed1.setHidden(true);
            componentMed2.setHidden(true);
            componentMed3.setHidden(true);
            componentPBM1.setHidden(false);
            componentPBM2.setHidden(false);
            componentPBM3.setHidden(false);
            componentPBM4.setHidden(false);
            componentPBM5.setHidden(false);
            componentPBM6.setHidden(false);
            componentPBM7.setHidden(false);
            componentPBM8.setHidden(false);

        } else {
            componentMed1.setHidden(false);
            componentMed2.setHidden(false);
            componentMed3.setHidden(false);
            componentPBM1.setHidden(true);
            componentPBM2.setHidden(true);
            componentPBM3.setHidden(true);
            componentPBM4.setHidden(true);
            componentPBM5.setHidden(true);
            componentPBM6.setHidden(true);
            componentPBM7.setHidden(true);
            componentPBM8.setHidden(true);
        }
    }

});