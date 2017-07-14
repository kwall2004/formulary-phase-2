Ext.define('Atlas.portals.view.hpmember.UserGuide', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalshpmemberuserguide',
    controller: 'portalshpmemberuserguide',
    title: 'User Guide',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            name:'testpanel',
            id: 'mypanel',
            xtype: 'panel',
            html: '',
            flex: 1
        }
    ]
});