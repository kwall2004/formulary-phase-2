Ext.define('Atlas.pharmacy.model.PharmacyAuditMaster', {
    extend: 'Atlas.common.model.Base',

    fields: [],

    proxy: {
        extraParams: {
            pBatchSize: 0,
            pWhere: ''
        },
        url: 'pharmacy/{0}/pharmacyauditmasterext'
    }
});
