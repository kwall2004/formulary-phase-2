/**
 * Created by agupta on 11/24/2016.
 */

Ext.define('Atlas.grievances.model.GrievanceTypeModel', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],
    proxy: {
        extraParams: {
            pcCategory: ''
        },
        url: 'shared/{0}/grievancetype'
    }

});