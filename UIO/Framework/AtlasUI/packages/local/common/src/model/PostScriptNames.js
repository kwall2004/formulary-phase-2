/**
 * Created by d4662 on 11/19/2016.
 */
Ext.define('Atlas.common.model.PostScriptNames', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'PSName'
    ],
    proxy: {
        url: 'shared/rx/postscriptnames',
        extraParams: {
            pType: 'Signature'
        }

    }
});