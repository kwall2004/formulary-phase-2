/*
 Last Developer: Ankit Kumar
 Previous Developers: [Ankit Kumar]
 Origin: Merlin - MAC and Custom price
 Date: 7/26/2016
 Description: Mac Setup Model
 */

Ext.define('Atlas.macprice.model.GCNUtilization', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'NDC', type: 'string'},
        {name: 'LabelName', type: 'string'},
        {name: 'RxCount', type: 'number'},
        {name: 'QtyCount', type: 'number'},
        {name: 'IngCost', type: 'number'},
        {name: 'AvgIngCost', type: 'number'},
        {name: 'MktShareRx', type: 'number'},
        {name: 'MktShareQty', type: 'number'},
        {name: 'MktIngCost', type: 'number'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/gcnutilization',
        timeout: 120000
    }
});