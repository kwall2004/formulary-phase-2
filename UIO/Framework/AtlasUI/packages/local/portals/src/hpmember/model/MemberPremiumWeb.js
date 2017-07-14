/**
 * Created by T3852 on 10/26/2016.
 */
Ext.define('Atlas.portals.hpmember.model.MemberPremiumWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'paymentDueDate',type: 'string'},
        {name: 'paymentAmountDue',type: 'string'},
        {name: 'premiumAmount',type: 'string'}
    ],
    proxy: {
        extraParams: {
            ttmemberPaymentTransaction: {
                ttmemberPaymentTransaction: []
            }
        },
        url: 'member/hp/memberpremiumweb'
    }
});