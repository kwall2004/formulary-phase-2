Ext.define('Atlas.common.model.resetMemberPassword', {
    extend: 'Atlas.common.model.Base',
    fields: [
    ],
    proxy: {
        url: 'authentication/rx/resetmemberpassword',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});