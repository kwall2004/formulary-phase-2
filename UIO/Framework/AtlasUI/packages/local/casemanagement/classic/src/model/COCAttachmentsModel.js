/**
 * Created by s6393 on 11/23/2016.
 */
Ext.define('Atlas.casemanagement.model.COCAttachmentsModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'jobNum', type: 'string'},
        {name: 'jobType', type: 'string'},
        {name: 'DESCRIPTION', type: 'string'},
        {name: 'faxSystemID', type: 'string'},
        {name: 'rowNUm', type: 'int'},
        {name: 'sysDate', type: 'date', dateFormat: 'Y-m-d'}

    ],
    proxy: {
        url: 'vendor/hp/attachmentsapi',
        extraParams: {
            "pMode": "mrx",
            "pDeviceId": null,
            "pTokenId": null,
            "pUserName" : Atlas.user.un,
            "pSort": null
        }


    }

});