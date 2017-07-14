/**
 * Created by agupta on 10/16/2016.
 */
Ext.define('Atlas.authorization.model.cdag.SetExternalReviewModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pAuthId : '',
            ttExternalReviewData : ''
        },
        url: 'claims/{0}/paexternalreview'
    }
});