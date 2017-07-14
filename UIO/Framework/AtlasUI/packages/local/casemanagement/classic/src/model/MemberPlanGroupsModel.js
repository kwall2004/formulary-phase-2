/**
 * Created by s6627 on 11/10/2016.
 */
Ext.define('Atlas.casemanagement.model.MemberPlanGroupsModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'planGroupId', type: 'string'},
        {name: 'planGroupName', type: 'string'},
        {name: 'planGroupCode', type: 'string'},
        {name: 'effDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'termDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'carrierId', type: 'string'},
        {name: 'carrierAcctNumber', type: 'string'},
        {name: 'carrierLOBId', type: 'string'},
        {name: 'CMSCntrID', type: 'string'}
    ],
    proxy: {
        url: 'member/{0}/memberplangroups',
        extraParams: {
            "pRecipientId": "",
            "pDate": null
        }

    }

})