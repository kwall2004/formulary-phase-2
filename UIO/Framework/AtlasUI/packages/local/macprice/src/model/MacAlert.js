/*
 Last Developer: Ankit Kumar
 Previous Developers: [Ankit Kumar]
 Origin: Merlin - MAC and Custom price
 Date: 7/26/2016
 Description: Mac Setup Model
 */

Ext.define('Atlas.macprice.model.MacAlert', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'MACListID', type: 'number'},
        {name: 'MACListVersion', type: 'string'},
        {name: 'MACListName', type: 'string'},
        {name: 'Stat', type: 'string'},
        {name: 'DataSource', type: 'string'}
    ],
    proxy: {
        extraParams: {

        },
        url: 'formulary/{0}/maclists'
    }
});