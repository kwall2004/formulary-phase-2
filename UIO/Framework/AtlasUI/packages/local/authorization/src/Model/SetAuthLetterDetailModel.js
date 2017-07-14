/**
 * Created by s6685 on 11/15/2016.
 */
Ext.define('Atlas.authorization.model.SetAuthLetterDetailModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pSystemID : '',
            pFieldList : '',
            pFields : '',
            pMode : ''
        },
        url: 'claims/{0}/authletterdetail'
    }
});
