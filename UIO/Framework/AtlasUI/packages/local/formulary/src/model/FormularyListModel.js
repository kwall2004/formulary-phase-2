/**
 * Created by s6627 on 10/7/2016.
 */
Ext.define('Atlas.formulary.model.FormularyListModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'FormularyID ', type: 'string'},
        {name: 'FormularyName', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pSessionId:''
        },
        url: 'formulary/{0}/formularies',
        reader: {
            type    : 'json',
            rootProperty: function(payload) {
                if(payload.data.length > 0) {
                    var result = '{"result":[{ "data" : ' + JSON.stringify(payload.data[0]) + ' } , { "otherData" : ' + JSON.stringify(payload.metadata) + '  }]}';
                    var jsonResult = JSON.parse(result);
                    return jsonResult;
                }
            }
        }
    }
})
