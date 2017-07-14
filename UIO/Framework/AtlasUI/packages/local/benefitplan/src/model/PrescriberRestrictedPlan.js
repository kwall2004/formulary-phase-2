/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.PrescriberRestrictedPlan', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.prescriberrestrictedplans',
    fields: [
        {name: 'AlwdPrescribersListSK', type: 'number'},
        {name: 'AlwdPrescribersListName', type: 'string'}
    ],
    proxy: {
        url: '/AllowedPrescribers'
    }
});