Ext.define('Atlas.pharmacy.view.CredentialingWorkQueue', {
    extend: 'Ext.panel.Panel',
    //xtype: 'pharmacy-credentialingworkqueue',
    alias: 'widget.credentialingworkqueue',
    viewModel: 'credentialingworkqueuemodel',
    controller: 'credentialingworkqueuecontroller',
  //  scrollable: true,

    title: 'Credentialing Work Queue',
    layout: 'fit',   // make accordion panel fit into screen
                     // fixes grid to show in screen fit as well
                     // Do not enable scrollable

    items:[{
        xtype: 'panel',
        reference: 'accordianpanel',
        layout: {
            type: 'accordion',
            animate: true
        }
    }]/*,
    initComponent: function () {
        var me = this;
        //console.log("START OF initComponent");
        //me.items = me.itemList;
        me.callParent();
    }*/
});