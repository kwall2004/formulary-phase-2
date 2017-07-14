Ext.define('Atlas.pharmacy.model.Relationships', {
    extend: 'Atlas.common.model.Base',

    fields: [
        //Relationship
        'ncpdpid',
        'RSrelationshipID',
        'RSrelationTypeInfo',
        'RSaddress1',
        'RSaddress2',
        'RSname',
        'RScontactName',
        'RScontactTitle',
        'RScity',
        'RSstate',
        'RSzip',
        'RSemail',
        'RSphone',
        'RSext',
        'RSfaxNum',
        'RSFederalTaxId',
        'RSNPI',
        'RSSystemId',

        // Parent Org
        'PMaddress1',
        'PMaddress2',
        'PMcity',
        'PMstate',
        'PMzip',
        'PMcontactName',
        'PMcontactTitle',
        'PMemail',
        'PMphone',
        'PMext',
        'PMfax',
        'PMparentOrgName',
        'PMparentOrgNPI',

        // Pay Center
        'PCpayCenter',
        'PCpayCenterId',
        'PCpayCenterName',
        'PCremitAddress1',
        'PCremitAddress2',
        'PCremitCity',
        'PCremitState',
        'PCremitZip',
        'PCremitContact',
        'PCremitContactTitle',
        'PCremitEmail',
        'PCremitPhone',
        'PCremitExt',
        'PCremitFax',
        'PCFederalTaxId',
        'PCNPI',

        {
            name: 'PReffDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'PRtermdate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: '_RSCityState',
            mapping: 'RScity', //triggers setting this virtual field
            persist: false,
            convert: function (val, rec) {
                return rec.get('RScity') + ', ' + rec.get('RSstate') + ' ' + Ext.util.Format.usZip(rec.get('RSzip'));
            }
        },{
            name: '_PCCityState',
            mapping: 'PCremitCity',
            persist: false,
            convert: function (val, rec) {
                return rec.get('PCremitCity') + ', ' + rec.get('PCremitState') + ' ' + Ext.util.Format.usZip(rec.get('PCremitZip'));
            }
        },{
            name: '_PMCityState',
            mapping: 'PMcity',
            persist: false,
            convert: function (val, rec) {
                return rec.get('PMcity') + ', ' + rec.get('PMstate') + ' ' + Ext.util.Format.usZip(rec.get('PMzip'));
            }
        }
    ],

    proxy: {
        extraParams: {
            pKeyValue: '',
            pKeyType: 'NCPDPID'
        },
        url: 'pharmacy/{0}/relationshipmasterdata'
    }
});