/**
 * Created by c4539 on 1/26/2017.
 */
Ext.define('Atlas.portals.hpmember.UserGuideController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalshpmemberuserguide',

    init: function() {
        Ext.getCmp("mypanel").setHtml("<iframe src='resources/hpmember/forms/MHP_Member_User_Guide.pdf' height='100%' width='100%'></iframe>");
    }
});