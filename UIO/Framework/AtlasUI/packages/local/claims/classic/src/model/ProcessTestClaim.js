/**
 * Created by akumar on 1/17/2017.
 */

Ext.define('Atlas.claims.model.ProcessTestClaim',{
    extend: 'Atlas.common.model.Base',

    fields: [

    ],

    proxy: {
        url: 'claims/{0}/processtestclaim'
    }
});

