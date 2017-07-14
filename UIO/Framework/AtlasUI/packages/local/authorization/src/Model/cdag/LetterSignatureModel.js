/**
 * Created by agupta on 10/20/2016.
 */

Ext.define('Atlas.authorization.model.cdag.LetterSignatureModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pSignatureGroup : ''
        },
        url: 'shared/{0}/lettersignatures'
    }
});