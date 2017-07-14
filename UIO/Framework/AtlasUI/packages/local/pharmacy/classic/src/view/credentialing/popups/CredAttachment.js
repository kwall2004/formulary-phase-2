/**
 *
 */
    Ext.define('Atlas.pharmacy.view.credentialing.popups.CredAttachment', {
    extend: 'Ext.window.Window',

    title: 'Add Attachment',
    height: 150,
    width: 500,
    closable: true,
    modal: true,
    reference: 'fileAttachmentWindow',
    controller: 'addattach',
    viewModel: 'addattach',
    items: {
        xtype: 'form',
        margin: '10 0 0 0',
        reference: 'fileForm',
        defaults: {
            allowBlank: false,
            labelWidth: 150,
            flex: 1,
            width: '90%',
            msgTarget: 'side'
        },
        items: [
            {
                xtype: 'textfield',
                reference: 'fileDescription',
                fieldLabel: 'Description'
            },
            {
                xtype: 'filefield',
                reference: 'file',
                name: 'attachmentFile',
                fieldLabel: 'File',
                emptyText: 'Select a file',
                regex: new RegExp('\.(pdf)$'),
                regexText: 'Only .PDF files are allowed.',
                buttonText: '',
                buttonConfig: {
                    iconCls: 'x-fa fa-upload'
                }
            }
        ]
    },
    bbar: {
        xtype: 'toolbar',
        items: [
            '->',
            {
                xtype: 'button',
                text: 'Save',
                iconCls: 'x-fa fa-paperclip',
                handler: 'saveAttachment'
            },
            {
                xtype: 'button',
                text: 'Reset',
                handler: 'resetControls'
            }
        ]
    },
    initComponent: function () {

        var me = this;

        var curViewModel;
        curViewModel = this.getViewModel();

//        if (me.itemConfig.tgtPDF) {
        me.title = "PDF File - '" + me.itemConfig.tgtPDF + "'.";
        curViewModel.data.inPDFFilename = me.itemConfig.tgtPDF;

        curViewModel.data.inKeyType = me.itemConfig.tgtKeyType?me.itemConfig.tgtKeyType:"";
        curViewModel.data.inKeyValue = me.itemConfig.tgtKeyValue?me.itemConfig.tgtKeyValue:"";
        curViewModel.data.inPlanId = me.itemConfig.tgtPlanId?me.itemConfig.tgtPlanId:"";

        curViewModel.data.inAttachFile = me.itemConfig.tgtAttachFile?me.itemConfig.tgtAttachFile:true;


        console.log("-------------------------");
        console.log("   curViewModel.data.inKeyType: " + curViewModel.data.inKeyType);
        console.log("  curViewModel.data.inKeyValue: " + curViewModel.data.inKeyValue);
        console.log("    curViewModel.data.inPlanId: " + curViewModel.data.inPlanId);
        console.log("curViewModel.data.inAttachFile: " + curViewModel.data.inAttachFile);
        console.log("-------------------------");
//        }

        me.callParent();
    }

});