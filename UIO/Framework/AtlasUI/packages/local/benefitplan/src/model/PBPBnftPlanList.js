/**
 * Created by j2560 on 10/17/2016.
 */
Ext.define('Atlas.benefitplan.model.PBPBnftPlanList', {
    extend: 'Atlas.benefitplan.model.Base',
    proxy: {
        type: 'memory'
    },
    fields: [
        {name: 'BnftPlanSK',  type: 'int'},
        {name: 'BnftPlanName', type: 'string'},
        {name: 'BnftPlanTypeCode', type: 'string'},
        {name: 'LOBName', type: 'string'},
        {name: 'LOBSK', type: 'int'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'CombinedPlanLvlDeducbInd', type: 'bool'},
        {name: 'CombinedMOOPInd', type: 'bool'},
        {name: 'NbrofNtwrkTiers', type: 'int'},
        {name: 'PBPBnftPlanSK', type: 'int'},
        {name: 'PBPSK', type: 'int'},
        {name: 'PayasScndInd', type: 'boolean'},
        {name: 'PrdctTypeCode', type: 'string'},
        {name: 'PrdctTypeSK', type: 'int'},
        {name: 'IsDeleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ]
});