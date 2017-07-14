/**
 * Created by agupta on 10/17/2016.
 */
Ext.define('Atlas.authorization.model.cdag.SetOutreachModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pAuthID : '',
            ttOutReach : ''
        },
        url: 'claims/{0}/coverageoutreach'
    }
});