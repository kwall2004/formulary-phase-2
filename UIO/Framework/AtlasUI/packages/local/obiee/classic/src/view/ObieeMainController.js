/**
 * Created by g2304 on 11/28/2016.
 */
Ext.define('Atlas.obiee.view.ObieeMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.obieemain',
    requires: [
        'Atlas.common.view.merlin.FileUploader'
    ],

    /**
     * Called when the view is created
     */
    init: function() {
        var me = this,
            theView = this.getView(),
            theViewModel = me.getViewModel(),
            menuTitle = theView.getTitle(),
            keyName = 'obiee_' + menuTitle.replace(/\s/g, '');

        var returnValue = Atlas.common.utility.Utilities.post(
            'system/rx/optionsvalue/read',
            {
                ipcKeyName: keyName
            },
            ['opcKeyValue']
        )

        theViewModel.set('url',returnValue.opcKeyValue);

        //theView.html = '<iframe src="' + returnValue.opcKeyValue + '" width:100% h></iframe>'

        var theContainer = theView.down('box');
        theContainer.autoEl.tag = 'iframe';
        theContainer.autoEl.src = returnValue.opcKeyValue;
        //theContainer.load();

    }
    //,
//    fileUploadTest: function(){
//        console.log('Obiee file upload testing...');
//        var theView = this.getView();
//
///*        var theWin = Ext.create('Ext.window.Window', {
//            title: 'File upload', modal: true,
//            width: 400, height: 300,
//            layout: {type: 'fit', align: 'stretch'},
//            items: [
//                {
//                    xtype: 'merlin.fileuploader',
//                    keyType: 'faxImage',
//                    fileType: 'pdf,txt',
//                    endpoint: 'shared/rx/document/update'
//                }
//
//            ]
//        });
//
//        theView.add(theWin);
//        theWin.show();*/
//
//        Atlas.common.utility.Utilities.viewDocument('3441')
//
//    }
});