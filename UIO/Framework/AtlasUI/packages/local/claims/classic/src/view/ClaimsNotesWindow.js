/**
 * Created by d4662 on 1/10/2017.
 */
Ext.define('Atlas.claims.view.ClaimsNotesWindow', {
    extend: 'Ext.Window',
    itemId: 'winClaimsNotesQWindow',
    title: 'UCF Notes History',
    width: 600,
    height: 200,
    scrollable: true,
    modal : true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items:[{
        xtype: 'container',
        layout: 'hbox',
        flex:1,
        items: [
            {
                xtype:'displayfield',
                fieldLabel:'Notes History:'
            },
            {
                xtype:'textarea',
                height:180,
                editable:false,
                flex:1,
                reference:'notesHistoryText'
            }
        ]
    }

    ]
});

