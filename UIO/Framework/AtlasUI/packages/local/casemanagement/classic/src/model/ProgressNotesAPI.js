/**
 * Created by s6627 on 1/24/2017.
 */
Ext.define('Atlas.casemanagement.model.ProgressNotesAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'opcFileName', type: 'string'}
    ],
    proxy: {
        url: 'vendor/hp/progressnotesapi',
        extraParams: {
            "pDeviceId": "",
            "pTokenId": "",
            "pSort": "",
            "userState": "MI",
            "pMode" :"mrx",
            'pUserName': Atlas.user.un

        }

    }

});