/**
 * Created by t3852 on 10/7/2016.
 */
Ext.define('Atlas.portals.view.prescriber.UserGuide', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxprescriberuserguide',
    title: 'User Guide',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            html: '<iframe src="resources/prescriber/forms/Provider_Portal_User_Manual.pdf" height="100%" width="100%"></iframe>',
            flex: 1
        }
    ]
});