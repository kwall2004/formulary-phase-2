/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.model.cdag.MemberPAHistoryModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        { name: 'carrierName', type : 'string'},
        { name: 'DeterminationType', type : 'string'},
        { name: 'AuthID', type : 'string'},
        { name: 'GCN_SEQNO', type : 'string'},
        { name: 'GPICode', type : 'string'},
        { name: 'NDC', type : 'string'},
        { name: 'medication', type : 'string'},
        { name: 'authStatus', type : 'string'},
        { name: 'UrgencyType', type : 'string'},
        { name: 'UrgencyTypeDesc', type : 'string'},
        { name: 'createDate', type : 'string'},
        { name: 'lastModified', type : 'string'},
        { name: 'filledDate', type : 'string'},
        { name: 'effDate', type : 'string'},
        { name: 'termDate', type : 'string'},
        { name: 'rowNum', type : 'string'},
        { name: 'PlanGroupID', type : 'string'},
        { name: 'PlanGroupName', type : 'string'},
        { name: 'AccountName', type : 'string'},
        { name: 'LOBName', type : 'string'}

    ],
    proxy: {
        extraParams: {
            pKeyValue : '',
            pKeyType : ''
        },
        url: 'member/{0}/memberpahistory'
    }
});