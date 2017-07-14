/*
 Developer: Srujith Cheruku
 Description: model for claimSearch
 Origin: RxMember
 9/27/16

 */
Ext.define('Atlas.portals.rxmember.model.MyClaimsMemberStoreModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'amt',
        type: 'number'
    },{
        name: 'itemDescription',
        type: 'string'
    },{
        name: 'rowNum',
        type: 'number'
    }],
    proxy: {
        extraParams: {
                
        },

        reader: {
            rootProperty: function(payload){
                return payload.data;
            }
        },
        url: 'member/{0}/memberprescriptionexpense'
    }
});