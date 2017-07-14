/*
 * Last Developer: Srujith Cheruku
 * Date: 11-032016
 * Previous Developers: []
 * Origin: MHP Member - My Profile
 * Description: Store for the My Profile Page
 */

Ext.define('Atlas.portals.hpmember.model.MemberProfileWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name:"result" , type:"string" },
        { name:"pResult" , type:"number" },
        { name:"pMessage" , type:"string" }
    ],

    proxy: {
        extraParams: {

        },

        url: 'portal/hp/memberprofileweb'
    }
});
