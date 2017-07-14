/**
 * Created by s6393 on 11/2/2016.
 */
Ext.define('Atlas.benefitplan.model.TransitionRestartMonth', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'Value', type: 'number'},
        {name: 'Text', type: 'string'}
    ],
    proxy: {
        url: '/Month'
    }
});