/*
 Developer: Srujith Cheruku
 Description: model for claimSearch prescriber Info
 Origin: RxMember
 9/27/16

 */
Ext.define('Atlas.portals.rxmember.model.PrescriberInfoStoreModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'npi',
        type: 'number'
    },{
        name: 'firstname',
        type: 'string'
    },{
        name: 'lastname',
        type: 'string'
    },{
        name: 'loccity',
        type: 'string'
    },{
        name: 'locstate',
        type: 'string'
    },{
        name: 'locaddr1',
        type: 'string'
    },{
        name: 'locaddr2',
        type: 'string'
    },{
        name: 'loczip',
        type: 'string'
    },{
        name: 'locphone',
        type: 'string'
    },{
        name: 'specialty',
        type: 'string'
    },{
        name: 'locfax',
        type: 'string'

    }],
    proxy: {
        extraParams: {

        },

        reader: {
            rootProperty: function(payload){
                return payload.data;
            }
        },
        url: 'prescriber/{0}/prescribermasterdata'
    },
    autoLoad: true
});