/**
 * Created by a6686 on 11/20/2016.
 */
Ext.define('Atlas.plan.model.validatePlanBenefitSetup',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'errorMessage',  type: 'string'},
        {name: 'correctiveAction',  type: 'string'},
        {name: 'errorCode',  type: 'int'}
    ],

    proxy: {
        extraParams: {
            PPLanBenefitId :'10'
        },
        url: 'plan/{0}/validateplanbenefitsetup',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});