/**
 * Created by agupta on 11/30/2016.
 */

Ext.define('Atlas.plan.model.PlanProgramCodeUnique',{
    extend: 'Atlas.common.model.Base',
    alias: 'model.planprogramcodeunique',

    proxy: {
        url: 'plan/{0}/planprogramcodes',
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                if(payload.data.length > 0) {
                    /*var result = '{"result":[{ "data" : ' + JSON.stringify(payload.data[0]) + ' } , { "otherData" : ' + JSON.stringify(payload.metadata) + '  }]}';
                    var jsonResult = JSON.parse(result);
                    return jsonResult;*/

                    var arrProgGroupCode = [];
                    var jsonData = [];
                    var json = '';
                    payload.data.forEach(function (item, index) {
                        if (arrProgGroupCode.indexOf(item.progGroupCode) < 0) {
                            arrProgGroupCode.push(item.progGroupCode);
                            json = '{ "progGroupCode" : "' + item.progGroupCode + '"}';
                            var temp = JSON.parse(json);
                            jsonData.push(temp);
                        }
                    });
                    return jsonData;
                }
            }
        }
    }
});