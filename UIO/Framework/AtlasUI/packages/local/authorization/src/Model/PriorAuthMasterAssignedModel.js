/**
 * Created by s6685 on 11/18/2016.
 */
Ext.define('Atlas.authorization.model.SetPriorAuthMasterAssignedModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            piAuthID : '',
            pcUsername : ''
        },
        url: 'claims/{0}/priorauthmasterassigned'
    }
});
