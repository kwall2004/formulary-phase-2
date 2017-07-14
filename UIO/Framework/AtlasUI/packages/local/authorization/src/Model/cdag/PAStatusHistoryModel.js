/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.model.cdag.PAStatusHistoryModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'ttAuthStatus', type : 'string'},
        { name: 'ttUserName', type : 'string'}

    ],
    proxy: {
        extraParams: {
            pAuthId : ''
        },
        url: 'claims/{0}/pastatushistory'
    }
});
