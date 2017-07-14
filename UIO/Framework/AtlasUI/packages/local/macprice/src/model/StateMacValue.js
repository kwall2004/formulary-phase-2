/*
 Last Developer: Ankit Kumar
 Previous Developers: [Ankit Kumar]
 Origin: Merlin - MAC and Custom price
 Date: 7/26/2016
 Description: Mac Setup Model
 */

Ext.define('Atlas.macprice.model.StateMacValue', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'NDC', type: 'string'},
        {name: 'StateCode', type: 'string'},
        {name: 'PriceType', type: 'string'},
        {name: 'PriceDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'Price', type: 'number'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/drugstatemacvalue'
    }
});