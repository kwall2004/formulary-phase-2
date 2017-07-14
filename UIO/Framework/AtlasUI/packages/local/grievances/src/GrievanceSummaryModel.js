/**
 * Created by agupta on 11/24/2016.
 */

Ext.define('Atlas.grievances.model.GrievanceSummaryModel', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],
    proxy: {
        extraParams: {
            pStat: '',
            pagination : true
        },
        url: 'shared/{0}/grievancesummary'
    }

});