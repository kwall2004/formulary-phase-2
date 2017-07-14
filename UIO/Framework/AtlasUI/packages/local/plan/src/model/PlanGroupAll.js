Ext.define('Atlas.plan.model.PlanGroupAll', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'planGroupId',
    fields: [
        {name: 'planGroupId', type: 'number'},
        {name: 'planGroupCode', type: 'string'},
        {name: 'planGroupName', type: 'string'},
        {name: 'CMSCntrId', type: 'string'},
        {name: 'planGroupStatus', type: 'string'},
        {name: 'carrierName', type: 'string'},
        {name: 'accountName', type: 'string'},
        {name: 'effDate', type: 'date',dateFormat:'Y-m-d'},
        {name: 'termDate', type: 'date',dateFormat:'Y-m-d'},
        {name: 'carrierId', type: 'number'},
        {name: 'carrierLOBId', type: 'number'},
        {name: 'RowNum', type: 'number'},
        {name: 'PG1ROWID', type: 'string'},
        {name: 'renewalDate', type: 'date',dateFormat:'Y-m-d'},
        {name: 'allowMedAdminFee', type: 'boolean'},
        {name: 'allowMemberLocks', type: 'boolean'},
        {name: 'processMTMCase', type: 'boolean'},
        {name: 'processMAPCase', type: 'boolean'},
        {name: 'mandatoryGeneric', type: 'boolean'},
        {name: 'asthmaHEDISAlert', type: 'boolean'}
    ],
    proxy: {
         extraParams:{
             pagination:true
         },
        url: 'plan/{0}/plangroups'
    }
});