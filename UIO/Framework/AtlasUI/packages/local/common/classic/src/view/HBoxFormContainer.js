Ext.define('Atlas.common.view.HBoxFormContainer', {
	extend: 'Ext.container.Container',
	alias: 'widget.hboxform',
	padding: '10px 0 0 0',
    defaults: {
        xtype: 'textfield',
        labelWidth: 50,
        margin: 6,
        flex: 1
    },
    layout: {
        type: 'hbox'
    }
});