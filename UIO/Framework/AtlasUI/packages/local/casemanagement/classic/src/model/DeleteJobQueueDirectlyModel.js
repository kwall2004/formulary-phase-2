/**
 * Created by s6393 on 11/16/2016.
 */
Ext.define('Atlas.casemanagement.model.DeleteJobQueueDirectlyModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'shared/{0}/deletejobqueuedirectly'
    }
});
