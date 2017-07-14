/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.model.MemberUserMemberUpdate', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'pResult', mapping: 'pResult' },
        { name: 'pMessage', mapping: 'pMessage' }
    ],
    proxy: {
        extraParams: {
            pSessionID: '',
            pRecipientId: '',
            pFields: '',
            pValues: ''
        },
        url: 'system/{0}/memberusermasterupdate'
    }
});
