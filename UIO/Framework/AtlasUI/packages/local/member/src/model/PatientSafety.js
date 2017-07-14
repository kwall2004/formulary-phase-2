/**
 * Created by j2487 on 11/9/2016.
 */
Ext.define('Atlas.member.model.PatientSafety', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'Account'},
        { name: 'ClaimID' },
        { name: 'PlanGroupName' },
        { name: 'CreateDateTime', type: 'string'},
        { name: 'SystemID' },
        { name: 'PlanGroupID' },
        { name: 'Descr' },
        { name: 'RecipID' },
        { name: 'AlertType' },
        { name: 'SvcDate' },
        { name: 'assigned' },
        { name: 'Carrier' },
        { name: 'LOB' },
        { name: 'COCMember'}

    ],
    proxy: {
        url: 'member/{0}/patsafetyalert',
        extraParams:{
            piQueID:23,
            pagination:true
        }
    }

})