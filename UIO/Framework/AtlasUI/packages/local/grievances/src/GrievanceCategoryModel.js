/**
 * Created by agupta on 11/22/2016.
 */

Ext.define('Atlas.grievances.model.GrievanceCategoryModel', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],
    proxy: {
        extraParams: {
            pReptBy: '',
            pReptOn: ''
        },
        url: 'shared/{0}/grievancecategory'
    }

});