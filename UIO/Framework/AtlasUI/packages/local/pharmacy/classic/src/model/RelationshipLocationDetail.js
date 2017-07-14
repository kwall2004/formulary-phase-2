/**
 * Created by l6630 on 11/16/2016.
 */

Ext.define('Atlas.pharmacy.model.RelationshipLocationDetail', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'relationType', type: 'string'},
        {name: 'zip', type: 'number'},
        {name: 'ext', type: 'string'},
        {name: 'address2', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'address1', type: 'string'},
        {name: 'contactName', type: 'string'},
        {name: 'relationshipID', type: 'string'},
        {name: 'RowNum', type: 'string'},
        {name: 'wrdIdx', type: 'string'},
        {name: 'contactTitle', type: 'string'},
        {name: 'phone', type: 'number'},
        {name: 'faxNum', type: 'number'},
        {name: 'parentOrgId', type: 'string'},
        {name: 'dbRowID', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'deleteDate', type: 'date', dateFormat: 'Y-m-d\TH:i:s'}
    ],
    proxy: {
        extraParams: {
            'pRowid': '0',
            'pRowNum': '0',
            'pBatchSize': '0',
            'pWhere': 'wrdidx contains "*"'
        },
        url: 'pharmacy/{0}/relationshiplocationdetail'
    }
});