Ext.define('Atlas.prescriber.view.detail.ContactLog', {
    extend: 'Ext.Container',
    alias: 'widget.prescriber-contactlog',
    xtype:'prescriber-contactlog',
    controller:'prescribercontactlogcontroller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items:[{
        flex:1,
        xtype:'common-contactlog',
        dialogxtypecontroller: 'prescriberaddcontactcontroller'
    }]

});