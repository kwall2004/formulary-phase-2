Ext.define('Atlas.prescriber.view.detail.Claims', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriber-claims',
    title: 'Claims',
    layout:'fit',
    items: [{
        //set the enable/disable state of the specific type ahead in the controller.
        controller: 'prescriberclaims',
        xtype: 'common-claims'
    }]
});