/**
 * Created by s6685 on 11/15/2016.
 */
Ext.define('Atlas.authorization.model.SetAppealDenialDetailModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pSystemId:'',
            pAuthId : '',
            pFields : '',
            pFieldList:'',
            pMode:''
        },
        url: 'claims/{0}/appealdenialdetail'
    }
});
