/**
 * Created by agupta on 12/5/2016.
 */


Ext.define('Atlas.member.model.MemberEnrollmentSet', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            ttmemberEnrollment: '',
            pRequestIDCard : ''
        },
        url: 'member/{0}/memberenrollment'
    }
});