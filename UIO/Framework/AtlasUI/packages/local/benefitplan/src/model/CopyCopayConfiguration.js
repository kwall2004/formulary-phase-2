/**
 * Created by s6635 on 11/2/2016.
 */
Ext.define('Atlas.benefitplan.model.CopyCopayConfiguration', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'bnftPlanSK', type:'number'},
        {name: 'username', type: 'string'}

    ],
    proxy: {
        url: '/CopyCopayConfiguration'
    }
});
