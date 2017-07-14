/**
 * Created by T4317 on 3/24/2017.
 */
Ext.define('Atlas.portals.view.hpmember.SuperUserWindow', {
    extend: 'Ext.container.Container',
    controller:'superuserwindow',
    title: 'Super User Access',
    xtype: 'superuserwindow',
    items: [{
        xtype:'label',
        html:'Please enter username'
    }, {
        xtype:'textfield'
    },{
        xtype:'toolbar',
        dock: 'bottom',
        items:[{
            xtype:'button',
            text:'submit'
        },{
            xtype:'button',
            text:'cancel'
        }]
    }]

});