/**
 * Created by agupta on 12/13/2016.
 */


Ext.define('Atlas.member.view.TermMemberWin', {
    extend: 'Ext.window.Window',
    xtype: 'termmemberwin',
    controller: 'termmemberwincontroller',
    //viewModel: 'cdaglettertemplateviewmodel',
    //itemId : 'winNotesEditEnrollment',
    title: 'Terminate incorrectly active member IDs',
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height: 150,
    width: 350,
    items: [

    ],
    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        items: [
            '->',
            {
                xtype: 'button',
                itemId: 'btnTermMember',
                iconCls: 'fa fa-save',
                text: 'Terminate incorrect Files',
                listeners: {
                    click: 'btnTermMember_Click'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnOutputResult',
                iconCls: 'fa fa-save',
                text: 'Output Results',
                disabled : true,
                listeners: {
                    click: 'btnOutputResult_Click'
                }
            }
        ]
    }
});
