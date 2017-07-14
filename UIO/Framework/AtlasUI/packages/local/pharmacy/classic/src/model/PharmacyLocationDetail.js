/**
 * Created by l6630 on 11/16/2016.
 */

Ext.define('Atlas.pharmacy.model.PharmacyLocationDetail', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'ncpdpId', type: 'string'},
        {name: 'locZip', type: 'number'},
        {name: 'locCity', type: 'string'},
        {name: 'npi', type: 'string'},
        {name: 'dbRowID', type: 'string'},
        {name: 'rowNUm', type: 'string'},
        {name: 'Address2', type: 'string'},
        {name: 'Address1', type: 'string'},
        {name: 'locState', type: 'string'},
        {name: 'Name', type: 'string'}

    ],
    proxy: {
        extraParams: {
            'pRowid': '0',
            'pRowNum': '0',
            'pBatchSize': '100',
            'pWhere':'wrdidx contains "t*"'
        },
        url: 'pharmacy/{0}/pharmacylocationdetail'
    }
});