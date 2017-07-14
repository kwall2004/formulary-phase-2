/*
 Last Developer: Ankit Kumar
 Previous Developers: [Ankit Kumar]
 Origin: Merlin - MAC and Custom price
 Date: 7/26/2016
 Description: Mac Setup Model
 */

Ext.define('Atlas.macprice.model.MDBMacHistory', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'GPI_NDC', type: 'string'},
        {name: 'MACValue', type: 'number'},
        {name: 'ValueType', type: 'string'},
        {name: 'changeDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'included', type: 'boolean'},
        {name: 'includedYesNo', type: 'string',
            calculate: function (data) {
                return (data.included == true ? 'Yes' : 'No');
            }
        }
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/mdbmachistory',
        timeout: 120000
    }
});