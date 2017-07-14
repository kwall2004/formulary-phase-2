/**
 * Created by s6685 on 12/7/2016.
 */
Ext.define('Atlas.admin.model.TableAndFieldDetailModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pTableName:'ALL'

        },
        url: 'shared/{0}/tableandfielddetail'
    }
});

