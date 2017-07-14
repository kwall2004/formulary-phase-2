/**
 * Created by n6570 on 3/6/2017.
 */
Ext.define('Atlas.benefitplan.model.LICSCopy', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'bnftPlanSK', type:'number'},
        {name: 'copyFromLICSTypeSK', type:'number'},
        {name: 'copyToLICSTypes', type:'auto'},
        {name: 'copyFromPharmTypeSK', type:'number'},
        {name: 'copyToPharmTypes', type:'auto'},
        {name: 'username', type: 'string'},
        {name: 'overwriteDuplicates', type: 'bool'}
    ],
    proxy: {
        url: '/CopyLICSCopay'
    }
});
