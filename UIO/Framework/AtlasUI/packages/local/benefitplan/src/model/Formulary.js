/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.Formulary', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.formularies',
    fields: [
        {name: 'FrmlrySK', type: 'number'},
        {name: 'FrmlryName', type: 'string'}
    ],
    proxy: {
        url: '/Formulary'
    }
});