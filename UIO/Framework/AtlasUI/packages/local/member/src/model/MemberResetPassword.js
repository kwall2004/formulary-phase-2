/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.model.MemberResetPassword', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'pResult', mapping: 'pResult' },
        { name: 'pMessage', mapping: 'pMessage' },
        { name: 'pPassword', mapping: 'pPassword' }
    ],
    proxy: {
        extraParams: {
            pMemberID: '',
            pCarrierID: '',
            pFourDigitSSN: '',
            pDOB: '',
            pEmail: '',
            pUserName: '',
            pPassword: '',
            pDevice: ''
        },
        url: 'authentication/{0}/resetmemberpassword'
        //authentication/rx/resetmemberpassword/update
    }
});
