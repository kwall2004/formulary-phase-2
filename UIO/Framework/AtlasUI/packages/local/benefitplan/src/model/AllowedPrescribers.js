/**
 * Created by n6570 on 11/2/2016.
 */
Ext.define('Atlas.benefitplan.model.AllowedPrescribers', {
    extend: 'Atlas.benefitplan.model.Base',
    // alias: 'viewmodel.allowedprescribers_Prescribers',
    fields: [
        {name: 'PrescbrSK',type:'number'},
        {name: 'AlwdPrescribersDtlSK',type:'number'},
        {name: 'PrescbrFirstName',type:'string'},
        {name: 'PrescbrLastName',type:'string'},
        {name: 'PrescbrNPI',type:'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'IsDeleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        type: 'memory'
    }
});
