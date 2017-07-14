/**
 * Created by m4542 on 11/15/2016.
 */
Ext.define('Atlas.portals.view.provider.integratedcaredata.ICBRTransactionsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.icbrtransactionsmodel',

    stores: {
        transactionsstore: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalHeader'
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});