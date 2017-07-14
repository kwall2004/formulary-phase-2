/**
 * Created by s6393 on 11/19/2016.
 */
Ext.define('Atlas.casemanagement.model.MedicareHRAPDFModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'completeUser', type: 'string'},
        {name: 'seqNum', type: 'string'},
        {name: 'createUser', type: 'string'},
        {name: 'hraType', type: 'string'},
        {name: 'dispCreateDateTime', type: 'string', dateFormat: 'Y-m-d'},
        {name: 'dispCompletedDateTime', type: 'string', dateFormat: 'Y-m-d'}

    ],
    proxy: {
        url: 'vendor/hp/memberhramasterapi',
        extraParams: {
            "pMode" :"mrx",
            "userState": "MI",
            'pUserName': Atlas.user.un,
            "pDeviceId": "",
            "pTokenId": "",
            "pRowid":"",
            "pRowNum":0,
            "pRows":0,
            "pSort":""
        },
        reader: {
            metaProperty: 'metadata',

            rootProperty: function (record) {
                var localList = [];
                for (var i = 0; i < record.data.length; i++) {
                    if (record.data[i].hraType == 'Medicare') {
                        localList.push(record.data[i]);
                    }
                }
                record.total=localList.length;
                return localList;
            }
        }

    }

});