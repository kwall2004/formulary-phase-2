/**
 * Created by agupta on 10/21/2016.
 */

Ext.define('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pSystemID : '',
            pFieldList : ''
        },
        url: 'claims/{0}/authletterdetailmasterdata'
    }
});