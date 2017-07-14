/**
 * Created by n6570 on 11/3/2016.
 */
Ext.define('Atlas.benefitplan.model.PrescriberDrugOverride', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PrescbrDrugOvrrdDtlSK',type:'number'},
        {name: 'PrescbrSK',type:'number'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'PrescbrFirstName',type:'string'},
        {name: 'PrescbrLastName',type:'string'},
        {name: 'PrescbrNPI',type:'string'},
        {name: 'NDC', type: 'string'},
        {name: 'DrugLblName', type: 'string'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        type: 'memory'
    }
});