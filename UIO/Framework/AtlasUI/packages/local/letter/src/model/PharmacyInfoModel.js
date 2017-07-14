/** ... **/

Ext.define('Atlas.letter.model.PharmacyInfoModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.pharmacyinfomdl',
    fields: [
        {name: 'ncpdpid', type: 'string' },
        {name: 'name', type: 'string' },
        {name: 'locPhone', type: 'string' },
        {name: 'locFax', type: 'string' }
    ],
    proxy: {
        url: 'pharmacy/{0}/pharmacymasterdata'
    }
});