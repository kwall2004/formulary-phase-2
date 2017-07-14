/**
 * Created by agupta on 10/21/2016.
 */

Ext.define('Atlas.authorization.model.cdag.DocumentDetailModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pcPlanID : '',
            pcDocumentID : ''
        },
        //url: 'claims/{0}/deniallanguage'
        url: 'shared/{0}/documentdetails'
    }
});