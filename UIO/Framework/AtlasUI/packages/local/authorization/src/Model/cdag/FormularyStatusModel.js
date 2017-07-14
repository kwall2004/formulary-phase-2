/**
 * Created by agupta on 9/20/2016.
 */
Ext.define('Atlas.authorization.model.cdag.FormularyStatusModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        { name: 'NDC ', type : 'string'},
        { name: 'GCN_SEQNO', type : 'string'},
        { name: 'GPICode', type : 'string'},
        { name: 'DrugType', type : 'string'},
        { name: 'Covered', type : 'boolean'},
        { name: 'PAInd', type : 'boolean'},
        { name: 'STInd', type : 'boolean'},
        { name: 'QLInd', type : 'boolean'},
        {name: 'CoveredYesNo', type: 'string',
            calculate: function (data) {
                return (data.Covered == true ? 'Yes' : 'No');
            }
        },
        {name: 'PAIndYesNo', type: 'string',
            calculate: function (data) {
                return (data.PAInd == true ? 'Yes' : 'No');
            }
        },
        {name: 'STIndYesNo', type: 'string',
            calculate: function (data) {
                return (data.STInd == true ? 'Yes' : 'No');
            }
        },
        {name: 'QLIndYesNo', type: 'string',
            calculate: function (data) {
                return (data.QLInd == true ? 'Yes' : 'No');
            }
        }
    ],

    proxy: {
        extraParams: {
            pagination: true,
            pPlangroupId: '',
            pFormularyId : '',
            pKeyType : '',
            pKeyValue : ''
        },
        url: 'formulary/{0}/drugformularydetails'
    }
    //proxy: {
    //    url: 'resources/data/dummydata/authorization/cdagmain.json'
    //}
});