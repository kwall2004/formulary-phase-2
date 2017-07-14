/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.PharmTraining', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'repTitle', type: 'string'},
        {name: 'trainingType', type: 'string'},
        {name: 'systemId', type: 'number'},
        {name: 'repPhone', type: 'string'},
        {name: 'repEmail', type: 'string'},
        {name: 'repName', type: 'string'},
        {name: 'affiliationType', type: 'string'},
        {name: 'acceptTerms', type: 'string'},
        {name: 'repFax', type: 'string'},
        {name: 'source', type: 'string'},
        {name: 'completeDate', type: 'date', dateFormat: 'Y-m-d'}
    ],

    proxy: {
      //  extraParams: {
        //    "pKeyValue":"177",
        //    "pKeyType":"RID"
      //  },
        url: 'pharmacy/{0}/pharmtraining'
    }
});