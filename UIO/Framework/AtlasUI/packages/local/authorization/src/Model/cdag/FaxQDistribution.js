/**
 * Created by akumar on 04/18/2016.
 */
Ext.define('Atlas.authorization.model.cdag.FaxQDistribution', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pListName: 'PAFaxQDistribution'
        },
        url: 'shared/{0}/listitems'
    }
});