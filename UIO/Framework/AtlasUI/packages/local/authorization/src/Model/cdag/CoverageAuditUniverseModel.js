/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.model.cdag.CoverageAuditUniverseModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'AuthId', type : 'string'},
        { name: 'FieldDesc', type : 'string'},
        { name: 'FieldName', type : 'string'},
        { name: 'FieldValue', type : 'string'},
        { name: 'DeterminationType', type : 'string'},
        { name: 'GroupId', type : 'string'},
        { name: 'FieldSeq', type : 'string'}

    ],
    proxy: {
        extraParams: {
            pAuthId : ''
        },
        url: 'claims/{0}/coverageaudituniverse'
    }
});