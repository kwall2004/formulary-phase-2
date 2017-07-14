/**
 * Created by l6630 on 10/10/2016.
 * Widget to add and remove data in a list view
 */

Ext.define('Atlas.common.view.listmenu.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.atlas-listmenu-main',
    reference : 'listMenuRef',
    controller: 'listmenu',
    viewOnly: false,
    layout : 'vbox',
    border: 5,
    style: {
        borderColor: 'red',
        borderStyle: 'solid'
    },
    items: [
        {
            xtype : 'container',
            layout : 'hbox',
            bind : {
              hidden : '{viewonly}'
            },
            items: [
                {
                    xtype: 'textfield',
                       bind : {
                        value : '{inputText}'
                    },
                    margin : '0 0 3 -10',
                    width: '220',
                    labelWidth : 0,
                    labelAlign: 'right'
                },
                {
                    xtype: 'button',
                    iconCls : 'x-fa fa-plus',
                    tooltip: 'Add',
                    handler : 'onAddClick'
                }
            ]
        },
        {
            xtype : 'grid',
            bodyBorder : false,
            width : 180,
            height : 180,
            hideHeaders:true,
            columns : [ ]
        }
    ]
});
