/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.model.StateProvinceCode', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'ISOCntryCodeSK', type: 'int'},
        {name: 'StPrvncCodeSK', type: 'int'},
        {name: 'StPrvncCode1', type: 'string'},
        {name: 'StPrvncDesc', type: 'string'}
    ],
    proxy: {
        url: '/stateprovincecode'
    }
});