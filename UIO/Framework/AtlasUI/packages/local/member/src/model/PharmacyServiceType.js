/**
 * Created by d3973 on 10/25/2016.
 */
Ext.define('Atlas.member.model.PharmacyServiceType', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'value',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }],

    proxy: {
        url: 'shared/{0}/listitems'
    }

});