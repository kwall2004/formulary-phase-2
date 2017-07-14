/*
 Developer: Srujith Cheruku
 Description: model for claimSearch pharmacy Info
 Origin: RxMember
 9/27/16

 */
Ext.define('Atlas.portals.rxmember.model.PharmacyInfoStoreModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'ncpdpid',
        type: 'number'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'locCity',
        type: 'string'
    },{
        name: 'locState',
        type: 'string'
    },{
        name: 'locAddress1',
        type: 'string'
    },{
        name: 'locAddress2',
        type: 'string'
    },{
        name: 'locZip',
        type: 'string'
    },{
        name: 'locPhone',
        type: 'string'
    },{
        name: 'locPhoneExt',
        type: 'string'
    },{
        name: 'locFax',
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
     url: 'pharmacy/{0}/pharmacymasterdata'
     },
    autoLoad: true
});