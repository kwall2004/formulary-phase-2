/**
 * Created by agupta on 11/23/2016.
 */

Ext.define('Atlas.grievances.model.SetGrievanceModel', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],
    proxy: {
        extraParams: {
            pGrievanceID: '',
            pFields: '',
            pValues: ''
        },
        url: 'shared/{0}/grievance'
    }

});