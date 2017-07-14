/**
 * Created by mkorivi on 11/30/2016.
 */

Ext.define('Atlas.casemanagement.model.HEDISContactNotesModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'seqNUm', type: 'int'},
        {name: 'lineText', type: 'string'}

    ],
    proxy: {
        url: 'vendor/hp/hediscontactapi',
        extraParams: {
            "pMode" :"mrx",
            "userState": "MI",
            "pUserName": Atlas.user.un,
            "pDeviceId": "",
            "pTokenId": ""
        }

    }

});
