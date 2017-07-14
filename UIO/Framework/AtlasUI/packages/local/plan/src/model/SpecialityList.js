/**
 * Created by d3973 on 11/19/2016.
 */
Ext.define('Atlas.plan.model.SpecialityList', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'speciality',
        type: 'string'
    }],

    proxy: {
        url: 'plan/{0}/specialtylist'
    }
});