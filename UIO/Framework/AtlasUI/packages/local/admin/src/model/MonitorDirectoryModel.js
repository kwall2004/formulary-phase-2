/**
 * Created by agupta on 11/30/2016.
 */


Ext.define('Atlas.admin.model.MonitorDirectoryModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.monitordirectorymodel',

    fields: [

    ],
    proxy: {
        url: 'shared/{0}/monitordirectory',
        extraParams: {
            pagination: true
        }
    }

});
