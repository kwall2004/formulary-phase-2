/**
 * Created by agupta on 10/22/2016.
 */

Ext.define('Atlas.authorization.model.cdag.SetAuthLetterDocumentModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pSystemID : '',
            pLetterProgramName : ''
        },
        url: 'claims/{0}/authletterdocument'
    }
});