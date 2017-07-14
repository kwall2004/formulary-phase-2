/**
 * Created by agupta on 10/17/2016.
 */
Ext.define('Atlas.authorization.model.cdag.SetCoverageRedeterminationModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pAuthId : '',
            pSkipWarning : '',
            ttCoverageRedetermination : '',
            pEffDate : '',
            pTermDate : ''
        },
        url: 'claims/{0}/coverageredetermination'
    }
});