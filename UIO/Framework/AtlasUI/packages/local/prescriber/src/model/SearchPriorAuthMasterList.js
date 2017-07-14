Ext.define('Atlas.prescriber.model.SearchPriorAuthMasterList', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'authID', type: 'string'},
        {name: 'memberID', type: 'string'},
        {name: 'memberName', type: 'string'},
        {name: 'HedisAlert', type: 'string'},
        {name: 'LastFilled', type: 'string'},
        {name: 'WhereFilled', type: 'string'},
        {name: 'authStatus', type: 'string'},
        {name: 'LN', type: 'string'},
        {name: 'EffectiveDateTime', type: 'string'},
        {name: 'ApprovedDateTime', type: 'string'},
        {name: 'TermDateTime', type: 'string'},
        {name: 'PlanGroupName', type: 'string'}

    ],
    proxy: {
        extraParams: {
        },
        url: 'portal/{0}/priorauthmasterlistp'
    }
});