/**
 * Created by agupta on 10/20/2016.
 */
Ext.define('Atlas.authorization.model.cdag.DenialLanguageModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pAuthID : '',
            pLOB : ''
        },
        url: 'claims/{0}/deniallanguage'
    }
});