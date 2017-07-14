/**
 * Created by n6570 on 10/31/2016.
 */
Ext.define('Atlas.benefitplan.model.AllowedPrescribersList', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.allowedprescribers_AllowedPrescribersList',
    hasMany: {model: 'AllowedPrescribers', name: 'AllowedPrescribers', associationKey: 'AllowedPrescribers'},
    fields: [
        {name: 'AlwdPrescribersListSK',type:'number'},
        {name: 'AlwdPrescribersListName',type:'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'IsDeleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'AllowedPrescribers'}
    ],
    proxy: {
        url: '/AllowedPrescribers'
    }
});


