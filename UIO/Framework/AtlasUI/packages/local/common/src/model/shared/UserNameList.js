/**
 * Created by g2304 on 11/9/2016.
 */
Ext.define('Atlas.common.model.shared.UserNameList', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'userName',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pShowActive:'yes'
        },
        url: 'system/{0}/groupuserlist'
    }
});