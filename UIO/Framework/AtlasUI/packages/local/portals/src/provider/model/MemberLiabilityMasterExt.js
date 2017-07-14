Ext.define('Atlas.portals.provider.model.MemberLiabilityMasterExt', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'InsuranceTypeDesc', type: 'string'},
        {name: 'Carriername', type: 'string'},
        {name: 'effDate', type: 'string'},
        {name: 'termDate', type: 'string'},
        {name: 'address1', type: 'string'},
        {name: 'groupNumber', type: 'string'},
        {name: 'policyNum', type: 'string'},
        {name: 'zip', type: 'string'},
        {name: 'RECipientID', type: 'string'},
        {name: 'seqNum', type: 'string'},
        {name: 'systemId', type: 'string'},
        {name: 'dbRowID', type: 'string'},
        {name: 'rowNUm', type: 'string'}
    ],

    proxy: {
        extraParams: {
            pRowNum: 0,
            pRows: 200
        },
        url : 'member/hp/memberliabilitymasterext'
    }
});