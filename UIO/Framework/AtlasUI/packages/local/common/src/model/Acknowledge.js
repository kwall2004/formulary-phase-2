/**
 * Created by T4317 on 12/28/2016.
 */
Ext.define('Atlas.common.model.Acknowledge', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'shared/{0}/qManagementData'
    }
});

