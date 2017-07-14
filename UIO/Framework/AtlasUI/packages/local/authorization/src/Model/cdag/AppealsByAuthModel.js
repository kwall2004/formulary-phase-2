/**
 * Created by agupta on 10/18/2016.
 */
Ext.define('Atlas.authorization.model.cdag.AppealByAuthModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pAuthID : ''
        },
        url: 'claims/{0}/appealsbyauth'
    }
});