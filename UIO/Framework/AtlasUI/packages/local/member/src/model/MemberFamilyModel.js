/**
 * Created by j2487 on 10/20/2016.
 */
Ext.define('Atlas.member.model.MemberFamilyModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'recipientID', type: 'string', mapping: 'recipientID'},
        {name: 'primRecipientId', type: 'string', mapping: 'primRecipientId'},
        {
            name: 'MemberName', type: 'string', mapping: 'MemberName'
        },
        {name: 'restrictAccess', type: 'string', mapping: 'restrictAccess'}
    ],
    proxy: {
        url: 'member/{0}/memberfamilylist',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                for (var i = 0; i < payload.data.length; i++) {
                    if (payload.data.length > 1 && (payload.data[i].recipientID == payload.data[i].primRecipientId || payload.data[i].primRecipientId == 0)) {
                        payload.data[i].MemberName = payload.data[i].MemberName + " (Primary)";
                    }
                }
                return payload.data;
            }
        }
    }
})