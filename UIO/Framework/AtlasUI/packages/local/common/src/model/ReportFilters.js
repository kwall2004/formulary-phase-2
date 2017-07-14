/**
 * Created by T4317 on 11/30/2016.
 */
Ext.define('Atlas.common.model.ReportFilters', {
        extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready,
    proxy: {
        extraParams:{
            pReportID:'',
            pagination: true
        },
    url:'shared/{0}/reportfilters'
    }
});
