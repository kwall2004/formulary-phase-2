/**
 * Created by agupta on 10/22/2016.
 */

Ext.define('Atlas.authorization.model.cdag.SetAuthLetterDetailModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pSystemID : '',
            pFields : '',
            pFieldList : '',
            pMode : ''
        },
        url: 'claims/{0}/authletterdetail'
    }
});