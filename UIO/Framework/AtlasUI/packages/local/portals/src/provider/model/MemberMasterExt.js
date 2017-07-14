Ext.define('Atlas.portals.provider.model.MemberMasterExt', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'birthDate', type: 'date', dateFormat: 'Y-m-d' }
    ],

    proxy: {
        extraParams: {
            pRowid: '0',
            pRowNum: 100,
            pRows: 200,
            pSort: ' lastName by firstName ',
            pLOBID: 'All'
        },
        url : 'eligibility/hp/membermasterext'
    }
});