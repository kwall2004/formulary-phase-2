/**
 * Created by T4317 on 11/21/2016.
 */
Ext.define('Atlas.common.model.SubmitJob', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'shared/{0}/submitjob'
    }
});
