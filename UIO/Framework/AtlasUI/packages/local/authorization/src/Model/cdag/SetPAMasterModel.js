/**
 * Created by agupta on 10/22/2016.
 */
Ext.define('Atlas.authorization.model.cdag.SetPAMAsterModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pAuthID : '',
            pFields : '',
            pFieldList : '',
            pMode :''
        },
        url: 'claims/{0}/pamaster'
    }
});