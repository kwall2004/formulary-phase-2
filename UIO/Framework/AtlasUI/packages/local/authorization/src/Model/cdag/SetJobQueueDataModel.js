/**
 * Created by agupta on 10/24/2016.
 */

Ext.define('Atlas.authorization.model.cdag.SetJobQueueDataModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pJobNum : '',
            pFieldList : '',
            pFieldValues : ''
        },
        url: 'shared/{0}/jobqueuedata'
    }
});