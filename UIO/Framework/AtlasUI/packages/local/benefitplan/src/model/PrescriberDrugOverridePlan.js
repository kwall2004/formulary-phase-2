/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.PrescriberDrugOverridePlan', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.prescriberdrugoverrideplans',
    fields: [
        {name: 'PrescbrDrugOvrrdListSK', type: 'number'},
        {name: 'PrescbrDrugOvrrdListName', type: 'string'}
    ],
    proxy: {
        url: '/PrescriberDrugOverride'
    }
});