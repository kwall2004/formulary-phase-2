/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.model.PCNRuleSetupDetail',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'pcnCode',


    fields: [
        {name: 'PCNCode',  type: 'string'},
        {name: 'RxGroupCode',  type: 'string'},
        {name: 'AutoEnroll',  type: 'boolean'},
        {name: 'PlangroupId',  type: 'int'},
        {name: 'PlangroupName',  type: 'string'},
        {name: 'PlanbenefitId',  type: 'int'},
        {name: 'PlanbenefitName',  type: 'string'},
        {name: 'AllowedRejectCodes',  type: 'string'},
        {name: 'AllowedPharmacyTypes',  type: 'string'},
        {name: 'AllowedNCPDPIds',  type: 'string'},
        {name: 'EffectiveDate',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'TerminationDate',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'PartnerId',  type: 'string'},
        {name: 'FilePrefix',  type: 'string'},
        //{name: 'SystemID',  type: 'string'},
        {name: 'EmailRecipientList',  type: 'string'},
        {name: 'SecondaryMessage',  type: 'string'}
    ],
    extraParams: {
        pApplyPCNCondition: 'no',
        pBatchSize: 0,
        pWhere: '1=1'
    },
    proxy: {
        url: 'claims/{0}/pcnrules'
    }
});