Ext.define('Atlas.plan.view.carriers.EditForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plan-carriers-editform',
    defaults: {
        margin: 5
    },

    layout: {
        type : 'vbox',
        align: 'stretch'
    },
    items: [
        // start top content section ------------------------------------------------------------
        {
            xtype: 'fieldset',
            title:'Contact Information',
            width:'100%',
            defaults: {
                labelWidth: 110,
                // flex: 1,
                xtype: 'textfield'
                //minWidth: 240
            },

            layout: {
                type : 'vbox',
                align: 'stretch'
            },

            items: [
                {
                    fieldLabel: 'Carrier Id',
                    name: 'carrierId',
                    bind:{
                        disabled: '{masterRecord}'
                    },
                    reference: 'carrierId',
                    allowBlank: false,
                    xtype: 'numberfield',
                    hideTrigger:true,
                    maxLength: 10,
                    maskRe:/\d/
                 }, {
                    fieldLabel: 'Carrier Name',
                    name: 'carrierName',
                    emptyText: 'enter a name for this carrier',
                    allowBlank: false
                }, {
                    fieldLabel: 'Service Location',
                    name: 'serviceLocation',
                    allowBlank: false
                }

            ]
        },
        {
            //xtype: 'common-addressform'
            xtype: 'fieldset',
            width:'100%',
            title:'General Information',
            defaults: {
                labelWidth: 110,
                // flex: 1,
                xtype: 'textfield'
                //minWidth: 240
            },
            layout: {
                type : 'vbox',
                align: 'stretch'
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
        }
    ]
});