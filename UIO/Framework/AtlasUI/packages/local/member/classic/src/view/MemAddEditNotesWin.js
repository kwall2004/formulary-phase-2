/**
 * Created by agupta on 12/12/2016.
 */

Ext.define('Atlas.member.view.MemAddEditNotesWin', {
    extend: 'Ext.window.Window',
    xtype: 'memaddeditnoteswin',
    controller: 'memaddeditnoteswincontroller',
    //viewModel: 'cdaglettertemplateviewmodel',
    itemId : 'winNotesEditEnrollment',
    title: 'Termination Reason',
    modal: true,
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
        }
    ],
    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        items: [
            '->',
            {
                xtype: 'button',
                itemId: 'winNotesBtnSaveNotes',
                iconCls: 'fa fa-save',
                text: 'Save',
                listeners: {
                    click: 'winNotesBtnSaveNotes_Click'
                }
            }
        ]
    }
});