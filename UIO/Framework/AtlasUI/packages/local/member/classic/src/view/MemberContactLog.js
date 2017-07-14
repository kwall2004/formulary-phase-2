/**
 * Created by j2487 on 10/24/2016.
 */
Ext.define('Atlas.member.view.MemberContactLog', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-contactlog',
    title:'Contact Log',
    controller:'membercontactlogcontroller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype:'common-contactlog',flex:1,
        dialogxtypecontroller: 'memberaddcontactcontroller'
    }]
});