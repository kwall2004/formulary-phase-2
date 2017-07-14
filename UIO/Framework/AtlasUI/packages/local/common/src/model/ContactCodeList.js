/**
 * Created by T4317 on 10/3/2016.
 */
Ext.define('Atlas.common.model.ContactCodeList', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'shared/{0}/contactcodelistrest'
    }
});