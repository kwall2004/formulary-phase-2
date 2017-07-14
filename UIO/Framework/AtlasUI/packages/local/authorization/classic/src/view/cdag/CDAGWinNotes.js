/**
 * Created by agupta on 10/21/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGWinNotes', {
    extend: 'Ext.window.Window',
    xtype: 'cdagwinnotes',
    controller: 'cdagwinnotescontroller',
    //viewModel: 'cdaglettertemplateviewmodel',
    title: 'Notes',
    testdata: {},

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height: 200,
    width: 350,
    items: [
        {
            xtype: 'textarea',
            itemId: 'winTxtNotes'
        },
        {
            xtype: 'panel',
            itemId: 'hdnContainer',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hdnLetterNameWinNotes'}
            ]
        }

    ],
    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        items: [
            '->',
            {
                xtype: 'button',
                itemId: 'winBtnSaveNotes',
                iconCls: 'fa fa-save',
                text: 'Save',
                listeners: {
                    click : 'winBtnSaveNotes_Click'
                }
            },
            {
                xtype: 'button',
                itemId: 'winBtnCancel',
                iconCls: 'fa fa-file-o',
                text: 'Cancel',
                handler: 'onCancelClick'
            }
        ]
    }
});

