/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.LineOfBusiness', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.lineofbusiness',
    fields: [
        {name: 'LOBSK', type: 'number'},
        {name: 'LOBName', type: 'string'}
    ],
    proxy: {
        url: '/LineOfBusiness'
    }
});