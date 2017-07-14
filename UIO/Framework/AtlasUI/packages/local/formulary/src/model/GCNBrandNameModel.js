/**
 * Created by s6627 on 11/2/2016.
 */
Ext.define('Atlas.formulary.model.GCNBrandNameModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'BN', type: 'string'}
    ],
    proxy: {
        extraParams: {
            "pLN":"",
            "pBN":"",
            "pNDC":"",
            "pGCN":"",
            "pETC":"",
            "pRxCUI":"",
            "pSearchInitiative":"",
            "pFormulary":"",
            "ipiBatchSize":0,
            "ipiRecStart":0
        },
        url: 'formulary/{0}/fdbdrugsearch',
        reader: {
            type    : 'json',
            rootProperty: function(payload) {
                if(payload.data.length > 0) {
                    var data = [];
                    var dataclone=[];
                    for (var i = 0; i < payload.data.length; i++) {
                        if (dataclone.indexOf(payload.data[i].BN) == -1) {
                            dataclone.push(payload.data[i].BN);
                            data.push({BN: payload.data[i].BN});
                        }
                    }
                    return data;
                }
            }
        }
    }
});