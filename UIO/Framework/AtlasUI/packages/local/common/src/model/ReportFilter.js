/**
 * Created by T4317 on 12/6/2016.
 */
Ext.define('Atlas.common.model.ReportFilter', {
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready,

    proxy:{
        url:'shared/{0}/reportfilter'
    }

});
