Ext.define('Atlas.finance.model.AuditPharmacy', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'npi', type: 'string' },
        {name: 'ncpdpid', type: 'string' },
        {name: 'deaid', type: 'string' },
        {name: 'name', type: 'string' },
        {name: 'locCity', type: 'string' },
        {name: 'locState', type: 'string' },
        {name: 'locAddress1', type: 'string' },
        {name: 'locAddress2', type: 'string' },
        {name: 'locZip', type: 'string' },
        {name: 'locCrossStreet', type: 'string' },
        {
            name: 'locCityStateZip',
            type:'string',
            convert: function (val, rec) {
                return rec.get('locCity') + ', ' + rec.get('locState') + ' ' + rec.get('locZip');
            }
        },
        {name: 'mailAddress1', type: 'string' },
        {name: 'mailCity', type: 'string' },
        {name: 'mailState', type: 'string' },
        {name: 'mailZip', type: 'string' },
        {name: 'locPhone', type: 'string' },
        {
            name: 'locPhoneFormatted',
            type:'string',
            convert: function (val, rec) {
                return rec.get('locPhone').replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
            }
        },
        {name: 'locPhoneExt', type: 'string' },
        {name: 'locFax', type: 'string' },
        {name: 'locEmail', type: 'string' },
        {name: 'contactLastname', type: 'string' },
        {name: 'contactFirstname', type: 'string' },
        {name: 'contactTitle', type: 'string' },
        {name: 'contactPhone', type: 'string' },
        {name: 'contactExt', type: 'string' },
        {name: 'ContactEmail', type: 'string' },
        {name: 'legalBusinessName', type: 'string' }
    ],

    proxy: {
        url: 'pharmacy/{0}/pharmacymasterdata'
    }
});