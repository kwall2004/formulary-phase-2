/**
 * Created by l6630 on 11/16/2016.
 */

Ext.define('Atlas.pharmacy.model.PharmaciesByRid', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'zip', type: 'number'},
        {name: 'ncpdpId', type: 'string'},
        {name: 'Address', type: 'string'},
        {name: 'address2', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'rowNum', type: 'string'},
        {name: 'contractID', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'PharmacyName', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pIncExcl: 'Include'
        },
        url: 'pharmacy/{0}/pharmaciesbyridrest'
    }
});