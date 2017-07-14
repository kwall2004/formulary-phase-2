/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.model.ContactAddress', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'ContactAddress',
    requires: [
        'data.validator.presence'
    ],
    proxy: {
        type: 'memory'
    },
    fields: [
        {name: 'EntityTypeAddressSK', type: 'int'},
        {name: 'EntityTypeSK', type: 'int'},
        {name: 'AddrSK', type: 'int'},
        {name: 'AddrLine1', type: 'string'},
        {name: 'AddrLine2', type: 'string'},
        {name: 'City', type: 'string'},
        {name: 'FIPSCntyCodeSK', type: 'int'},
        {name: 'StPrvncCodeSK', type: 'int'},
        {name: 'PstlCodeSK', type: 'int'},
        {name: 'PostalCode', type: 'string'},
        {name: 'ISOCntryCodeSK', type: 'int'}
    ],
    validators: {
        AddrLine1: [
            {type: 'length', max: 55},
            {type: 'presence'}
        ],
        AddrLine2: [
            {type: 'length', max: 55}
        ],
        City: [
            {type: 'length', max: 30},
            {type: 'presence'}
        ],
        StPrvncCodeSK: [
            {type: 'presence'}
        ],
        PostalCode: [
            {type: 'format', matcher: /^\d{5}(-\d{4})?$/, message: 'Postal code must be a 5 digit or a 9 digit number.'},
            {type: 'presence'}
        ],
        ISOCntryCodeSK: [
            {type: 'presence'}
        ]
    }
});