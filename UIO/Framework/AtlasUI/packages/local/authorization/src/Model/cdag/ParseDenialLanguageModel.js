/**
 * Created by agupta on 10/24/2016.
 */

Ext.define('Atlas.authorization.model.cdag.ParseDenialLanguageModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pAuthID : '',
            pDenialLanguage : '',
            pLOB : ''
        },
        url: 'claims/{0}/parsedeniallanguage'
    }
});