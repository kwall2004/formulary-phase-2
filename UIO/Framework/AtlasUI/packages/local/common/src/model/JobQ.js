/**
 * Created by agupta on 10/12/2016.
 */
Ext.define('Atlas.common.model.JobQ',{
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'shared/{0}/submitjob'
    }
});