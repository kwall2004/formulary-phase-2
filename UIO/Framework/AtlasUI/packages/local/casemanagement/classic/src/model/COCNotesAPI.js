/**
 * Created by mkorivi on 12/5/2016.
 */

Ext.define('Atlas.casemanagement.model.COCNotesAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'Subject', type: 'string'},
        {name: 'Note', type: 'string'},
        {name: 'CreateDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CreateTime', type: 'string'},
        {name: 'CreateUser', type: 'string'},
        {name: 'Access', type: 'string'},
        {name: 'CreateDateTime',  type: 'string'}

    ],

    proxy: {
        url: 'vendor/hp/notesapi',
        extraParams: {
            "pDeviceId": "",
            "pUserName": Atlas.user.un,
            "pTokenId": "",
            "pSort": "",
            "userState": "MI",
            "pMode" :"mrx"

        }

    }

})

