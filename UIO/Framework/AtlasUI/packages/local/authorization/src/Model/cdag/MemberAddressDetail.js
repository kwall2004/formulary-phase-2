/**
 * Created by akumar on 12/06/2016.
 */

Ext.define('Atlas.authorization.model.cdag.MemberAddressDetail', {
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        url: 'member/{0}/memberaddressdetails'
    }
});