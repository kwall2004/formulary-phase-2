/**
 * Created by agupta on 9/12/2016.
 */
Ext.define('Atlas.authorization.model.ExistingPAModel',{
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'authID', type: 'number'},
        {name: 'DeterminationType', type: 'string'},
        {name: 'recipientID', type: 'string'},
        {name: 'memberID', type: 'string'},
        {name: 'carrierName', type: 'string'},
        {name: 'carrierID', type: 'string'},
        {name: 'memberName', type: 'string'},
        {name: 'memberDOB', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'authStatus', type: 'string'},
        {name: 'source', type: 'string'},
        {name: 'HrsToProcess', type: 'string'},
        {name: 'NDC', type: 'string'},
        {name: 'LN', type: 'string'},
        {name: 'dueDate', type: 'date', dateFormat: 'c'},
        {name: 'EffectiveDateTime', type: 'date', dateFormat: 'c'},
        {name: 'TermDateTime', type: 'date', dateFormat: 'c'},
        {name: 'ApprovedBy', type: 'string'},
        {name: 'ApprovedDateTime', type: 'date', dateFormat: 'c'},
        {name: 'PlanGroupID', type: 'string'},
        {name: 'PlanGroupName', type: 'string'},
        {name: 'AccountName', type: 'string'},
        {name: 'LOBName', type: 'string'}
    ],

    proxy: {
        extraParams: {
            pagination: true,
            pcWhere: '',
            pcSort: '',
            piBatch: ''
        },
        url: 'claims/{0}/priorauthmasterext',
        timeout: 120000
    }
});
