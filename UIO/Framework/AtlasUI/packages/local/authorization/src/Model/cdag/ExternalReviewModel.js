/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.model.cdag.ExternalReviewModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'ExternalReviewType', type : 'string'},
        { name: 'MCRAppealNum', type : 'string'},
        { name: 'Reason', type : 'string'},
        { name: 'DateForwarded', type : 'string'},
        { name: 'LetterSentDate', type : 'string'},
        { name: 'Decision', type : 'string'},
        { name: 'DecisionDate', type : 'string'},
        { name: 'SystemID', type : 'number'},
        { name: 'RecordAction', type : 'string'},
        { name: 'Notes', type : 'string'},
        { name: 'ReasonCode', type : 'string'},
        { name: 'LastModified', type : 'string'},
        { name: 'ResolvedInFirstCall', type : 'bool'},
        { name: 'AuthID', type : 'number'},
        { name: 'ReviewerDisplay', type : 'string'},
        { name: 'ReasonDisplay', type : 'string'},
        { name: 'DecisionDisplay', type : 'string'},
        { name: 'ParentSystemID', type : 'number'}
    ],
    proxy: {
        extraParams: {
            pAuthId : ''
        },
        url: 'claims/{0}/paexternalreview'
    }
});