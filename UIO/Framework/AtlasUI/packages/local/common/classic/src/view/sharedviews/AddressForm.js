Ext.define('Atlas.common.view.AddressForm',{
    extend: 'Ext.container.Container',
    alias: 'widget.common-addressform',
    defaults: {
        labelWidth: 100,
        flex: 1,
        xtype: 'textfield',
        minWidth: 240
    },
    items: [
        {
            fieldLabel: 'Address 1',
            name: 'address1',
            emptyText: 'Street',
            allowBlank: false
        }, {
            fieldLabel: 'Address 2',
            name: 'address2',
            emptyText: 'Suite or Apt',
            allowBlank: true
        }, {
            fieldLabel: 'City',
            name: 'city',
            emptyText: 'City',
            allowBlank: false
        }, {
            fieldLabel: 'State',
            name: 'state',
            emptyText: 'State',
            allowBlank: false
        }, {
            fieldLabel: 'Zip',
            name: 'zip',
            emptyText: 'Zip code',
            allowBlank: false
        }
    ]
});