/**
 * Created by mkorivi on 11/21/2016.
 */
Ext.define('Atlas.casemanagement.model.LastfollowupAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'pPrevFUDate', type: 'date',format:'Y-m-d', defaultValue: null},
        {name: 'pPrevFUReason', type: 'string',defaultValue: ""}
    ],
    proxy: {
        url: 'vendor/hp/lastfollowupapi',
        extraParams: {

            "pDeviceId": "",
            "pTokenId": "",
            "pSort": "",
            "userState": "MI",
            "pMode" :"mrx"

        },
        reader: {
            type    : 'json',
            rootProperty    : function(payload)
            {
                if(payload.data.length==0)
                {
                    payload.data.push({"pPrevFUDate":null,"pPrevFUReason":""});
                    return payload.data;
                }
                return payload.data;
            }
        }

    }

})
