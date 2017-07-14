/**
 * Created by j2487 on 11/8/2016.
 */
Ext.define('Atlas.member.model.MemberDetails', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'member/{0}/memberdetails'
    }

})