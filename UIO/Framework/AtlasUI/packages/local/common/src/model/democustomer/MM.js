Ext.define('Atlas.common.model.democustomer.MM', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {
            name: 'fullName',
            calculate: function (obj) {
                return obj.tfirstName + obj.tlastName;
            }
        },
        'tfirstName',
        'tlastName'

    ],

    proxy: {
        url: 'member/services/{0}/membermasterext',
        //TODO: should be set in controller
        extraParams: {
            pKeyValue: '17759791',
            pKeyType: 'recipientID'
        },
        reader: {
            rootProperty: function(payload){
                return payload.data[0].ttMember;
            }
        }

    }
});

Ext.define('Atlas.common.model.ZZ', {
    extend: 'Ext.data.Store',

    model: 'Atlas.common.model.democustomer.MM',
    autoLoad: true
});


