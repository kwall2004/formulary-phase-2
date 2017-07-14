Ext.define('Atlas.common.view.sharedviews.editablegrid.EditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.common-editgrid-window',

    // Creates a child session that will spawn from the current session
    // of this view.
   /*
    session: {
        schema: 'atlas'
    },
    */
    layout: 'fit',
    ghost: false, //disable ghost so we can actually see window content while dragging
    modal: true,
    autoShow: true,
    closable: true,
    dockedItems: [{
        xtype:'toolbar',
        dock:'bottom',
        reference:'defaulteditbbar',
        items:[{
            text: 'Cancel',
            //Because we add this window to the parent, all methods defined in that view will be accessible
            handler: 'onCancelClick'
        },{
            text: 'Done',
            handler: 'onDoneClick'
        }]
    }]

});