/*
    Developer: Tremaine Grant
    Description: A view shows the authorization letter information of the member.
                  
*/
Ext.define('Atlas.authorization.view.authletter.AuthLetter', {
    extend: 'Ext.form.Panel',
    xtype: 'authorization-authletter',
    title: 'Denials and Appeals',
    requires: [
        'Ext.layout.container.Border'
    ],
    layout: 'border',
    defaults: {
        xtype: 'container'
    },
    items: [{
       region:'north',
       layout:'hbox',
       items:[{
            xtype: 'textfield',
            name: 'Auth ID',
            emptyText: '[Auth ID]',
            allowBlank: true
       },{
           xtype:'button',
           text: 'Advanced Search'
       },{
           xtype: 'label',
           text: 'status'
       },{
           iconCls: 'x-fa fa-user'
       }]
    },{
        xtype: 'panel',
        region: 'west',
        flex: 1,
        split: true,
        collapseMode: 'mini',
        collapsible: true,
        items:[{
            xtype:'CMMPPPPanel'
        }]
    },{
        flex: 3,
        region: 'center',
        defaults:{
            height:300
        },
        items:[{
            items:[{
                xtype:'AuthLetterGridOne'
            }]
        },{
            xtype:'splitter',
            reSizable:true,
            height:5
        },{
            items:[{
                xtype: 'AuthLetterGridTwo'
            }]
        },{
            xtype:'splitter',
            reSizable:true,
            height:5
        },{
            items:[{
                xtype: 'AuthLetterGridThree'
            }]
        }]
    }]
});
