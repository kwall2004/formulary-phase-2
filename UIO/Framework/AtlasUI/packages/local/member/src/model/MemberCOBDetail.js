/**
 *  Last Developer: Kevin Tabasan
 *  Previous Developers: [Kevin Tabasan]
 */
Ext.define('Atlas.member.model.MemberCOBDetail', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'rowNum', type: 'string' },
        { name: 'HICNRRB', type: 'string' },
        { name: 'RxBin', type: 'string' },
        { name: 'RxGroup', type: 'string' },
        { name: 'Carrier', type: 'string' },
        { name: 'Policy', type: 'string' },
        { name: 'rxID', type: 'string' },
        { name: 'CoverageCode', type: 'string' },
        { name: 'EffDate', type: 'string' },
        { name: 'TermDate', type: 'string' },
        { name: 'PBMCreateDate', type: 'string' },
        { name: 'COB', type: 'string' },
        { name: 'Relationship', type: 'string' },
        { name: 'PayerOrder', type: 'string' },
        { name: 'PersonCode', type: 'string' },
        { name: 'SuppTy', type: 'string' },
        { name: 'Seq', type: 'string' }
    ],

    proxy: {
        url: 'member/{0}/cobdata'
    }
});