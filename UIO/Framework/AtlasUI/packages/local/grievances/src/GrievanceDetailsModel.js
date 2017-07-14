/**
 * Created by agupta on 11/24/2016.
 */

Ext.define('Atlas.grievances.model.GrievanceDetailsModel', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],
    proxy: {
        extraParams: {
            pGrievanceID: ''
        },
        url: 'shared/{0}/grievancedetails'
    }

});