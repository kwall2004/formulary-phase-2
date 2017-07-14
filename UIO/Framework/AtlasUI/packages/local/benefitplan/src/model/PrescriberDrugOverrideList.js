/**
 * Created by n6570 on 11/3/2016.
 */
Ext.define('Atlas.benefitplan.model.PrescriberDrugOverrideList', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.prescriberdrugoverride_PrescriberDrugOverrideList',
    hasMany: {model: 'PrescriberDrugOverride', name: 'PrescriberDrugOverrides', associationKey: 'PrescriberDrugOverrides'},
    fields: [
        {name: 'PrescbrDrugOvrrdListSK',type:'number'},
        {name: 'PrescbrDrugOvrrdListName',type:'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'PrescriberDrugOverrides'}
    ],
    proxy: {
        url: '/PrescriberDrugOverride'
    }
});

