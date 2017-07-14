/**
 * Created by agupta on 12/2/2016.
 */


Ext.define('Atlas.member.model.MemberMasterSet', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pRequestIDCard: '',
            ttmemberMaster: '',
            ttRespContact : '',
            ttAddress : '',
            ttEnrollment : '',
            iplForceEnroll : ''
        },
        url: 'member/{0}/membermaster'
    }
});