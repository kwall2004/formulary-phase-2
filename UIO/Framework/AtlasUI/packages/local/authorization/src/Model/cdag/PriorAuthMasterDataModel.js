/**
 * Created by agupta on 10/18/2016.
 */
Ext.define('Atlas.authorization.model.cdag.PriorAuthMasterDataModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pAuthId : ''
        },
        url: 'claims/{0}/priorauthmasterdata'

    }
});