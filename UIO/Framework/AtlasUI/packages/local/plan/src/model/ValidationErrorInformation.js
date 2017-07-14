/**
 * Created by a6686 on 11/20/2016.
 */
Ext.define('Atlas.plan.model.ValidationErrorInformation',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {name:'correctiveAction', type: 'string'},
        {name:'errorMessage', type: 'string'},
        {name:'errorCode', type: 'int'}
    ],

    proxy: {
        url: 'plan/{0}/validateplangroup'
    }
});