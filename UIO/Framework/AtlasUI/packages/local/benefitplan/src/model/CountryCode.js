/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.model.CountryCode', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'ISOCntryCodeSK', type: 'int'},
        {name: 'ISOCntryCode1', type: 'string'},
        {name: 'ISOCntryCode2', type: 'string'},
        {name: 'ISOCntryCode3', type: 'string'},
        {name: 'ISOCntryCodeDesc', type: 'string'},
        {name: 'Addr', type: 'string'},
        {name: 'Addr1', type: 'string'},
        {name: 'StPrvncCode', type: 'string'},
        {name: 'PstlCode', type: 'string'}
    ],
    proxy: {
        url: '/isocountrycode'
    }
});