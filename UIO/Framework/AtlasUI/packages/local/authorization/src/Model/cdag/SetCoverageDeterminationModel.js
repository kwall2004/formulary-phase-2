/**
 * Created by agupta on 10/13/2016.
 */
Ext.define('Atlas.authorization.model.cdag.SetCoverageDeterminationModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    proxy: {
        extraParams: {
        },
        url: 'claims/{0}/coveragedetermination'

    }
});
