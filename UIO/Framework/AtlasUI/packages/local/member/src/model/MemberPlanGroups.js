/**
 * Created by j2487 on 11/28/2016.
 */
Ext.define('Atlas.member.model.MemberPlanGroups', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'planGroupId',type:'string',mapping:'planGroupId'},
        {name: 'planGroupName',type:'string',mapping:'planGroupName'},
        {name: 'planGroupCode',type:'string',mapping:'planGroupCode'},
        {name: 'effDate',type:'string',mapping:'effDate'},
        {name: 'termDate',type:'string',mapping:'termDate'},
        {name: 'carrierId',type:'string',mapping:'carrierId'},
        {name: 'carrierAcctNumber',type:'string',mapping:'carrierAcctNumber'},
        {name: 'carrierLOBId',type:'string',mapping:'carrierLOBId'},
        {name: 'CMSCntrID',type:'string',mapping:'CMSCntrID'}
    ],
    proxy: {
        url: 'member/{0}/memberplangroups'
    }
})
