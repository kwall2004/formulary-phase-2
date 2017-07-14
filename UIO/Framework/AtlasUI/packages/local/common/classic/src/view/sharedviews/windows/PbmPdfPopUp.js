Ext.define('Atlas.common.view.sharedviews.windows.PbmPdfPopUp', {
    extend: 'Ext.window.Window',
    xtype: 'pbmpdf',
    title: 'Pbm PDF Viewer',
    width: '70%',
    height: '70%',
    modal: true,
    beforeclose: function () {
        Ext.getBody().unmask();
    },
    viewModel: 'pbmpdf',
    controller: 'pbmpdf',

    dockedItems: [
        {
            // We may want to pull this out.
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'center',
                type: 'hbox'
            },
            items: [{
                xtype: 'button',
                text: 'Cancel',
                itemId: 'btnCancel',
                listeners: {
                    click: function (btn) {
                        btn.up('window').destroy();
                    }
                }
            }]
        }],

    items:[{
        xtype: 'container',
        reference: 'pdfpanel',
        width: '100%',
        height: '100%',
        //renderTo:'example-grid',
        layout: {
            type: 'card',
            activeOnTop: true
        },
        items: []
    }],



    initComponent: function () {

        var me = this;

        var curViewModel;
        curViewModel = this.getViewModel();

        if (me.itemConfig.tgtPDF) {
            //me.getViewModel().data.inDataSource = me.tgtDataSource;
            me.title = "PDF File - '" + me.itemConfig.tgtPDF + "'.";
            curViewModel.data.inPDFFilename = me.itemConfig.tgtPDF;

            console.log("-------------------------");
            console.log("me.itemConfig.tgtPDF: " + me.itemConfig.tgtPDF);
            console.log("-------------------------");

        }


        me.callParent();
    }

});