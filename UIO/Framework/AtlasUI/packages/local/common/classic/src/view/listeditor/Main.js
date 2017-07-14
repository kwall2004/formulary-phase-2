/**
 * Created by l6630 on 10/10/2016.
 * Widget to add and remove data in a list view
 */

Ext.define('Atlas.common.view.listeditor.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.atlas-listeditor-main',
    reference : 'listEditorRef',
    controller: 'listeditor',
    cls: 'border-none',
    layout: 'column',
    viewOnly: false,
    items: [{
        xtype: 'textfield',
        margin : '0 0 3 -10',
        columnWidth: .8,
        bind : {
            value : '{inputText}',
            hidden: '{viewonly}'
        },
        listeners: {
            specialkey: 'onEnterKey'
        }
    }, {
        xtype: 'button',
        columnWidth: .2,
        iconCls : 'x-fa fa-plus',
        tooltip: 'Add',
        handler : 'onAddClick',
        bind: {
            hidden: '{viewonly}'
        }
    }, {
        xtype : 'gridpanel',
        itemId: 'formularyconfig-tiergrid',
        cls: 'border-none',
        columnWidth: 1,
        hideHeaders: true,
        allowBlank: false,
        columns : [],
        bind: {
            disabled: '{viewonly}'
        }
    }]
});
