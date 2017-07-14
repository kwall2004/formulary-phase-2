/**
 * Created by akumar on 12/09/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGContactLog', {
    extend: 'Ext.panel.Panel',
    xtype: 'cdag-contactlog',
    title:'Contact Log',
    controller:'cdagcontactlogcontroller',
    layout: 'fit',
    items: [{
        xtype:'common-contactlog',
        dialogxtypecontroller: 'cdagaddcontactcontroller'
    }]
});