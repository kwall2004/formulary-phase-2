/**
 * Created by s6393 on 11/23/2016.
 */
Ext.define('Atlas.casemanagement.model.PBMRecipientIDModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'pbmRecipientId', type: 'string'},
        {name: 'LOB', type: 'string'},
        {name: 'memberId', type: 'string'}

    ],
    proxy: {
        url: 'shared/{0}/pbmrecipientid',
        extraParams: {
            pMemberId: "0035637339",
            pLOB: null,
            pStateCode: "MI"
        }
    }

});