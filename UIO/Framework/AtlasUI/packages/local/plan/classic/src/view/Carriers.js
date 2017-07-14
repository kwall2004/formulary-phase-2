Ext.define('Atlas.plan.view.Carriers', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-carriers',
    controller: 'plan-carriers',

    scrollable: true,

    viewModel: {
        stores: {
            carriers: {
                type: 'plan-plancarrierext'
                // ,
                //session: true
            }
        }
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'combo',
                labelWidth: 60,
                width: 350,
                fieldLabel: 'Carrier',
                forceSelection: true,
                emptyText: 'Select a Carrier',
                // session: true,
                bind: {
                    store: '{carriers}'
                },
                listConfig: {
                    getInnerTpl: function () {
                        // here you place the images in your combo
                        var tpl = '<div>' +
                            '{carrierName}<br/>' +
                            '</div>';
                        return tpl;
                    }
                },
                reference: 'carriercombo',
                publishes: 'selection',
                queryMode: 'local',
                name: 'carrier',
                displayField: 'carrierName',
                valueField: 'carrierId',
                listeners: {
                    select: 'onCarrierSelect'
                }
            },
            {
                iconCls: 'x-fa fa-edit',
                handler: 'onEdit',
                bind: {
                    disabled: '{!carriercombo.selection}'
                },
                text: 'Edit'
            },
            {
                iconCls: 'x-fa fa-trash',
                handler: 'onDestroy',
                bind: {
                    disabled: '{!carriercombo.selection}'
                },
                text: 'Delete'
            },
            '->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                handler: 'onAdd',
                text: 'New Carrier'
            }
        ]
    }],


    //layout: 'hbox',
    defaults: {
        border: false,
        margin: 10,
        maxHeight: 400,
        frame: false
    },
    items: [
        {
            xtype: 'form',
            minWidth: 400,
            title:'Carrier Details',
            flex: 1,
            defaults: {
                labelWidth: 175,
                flex: 1,
                xtype: 'displayfield',
                minWidth: 350
            },
            layout: {
                type : 'hbox',
                align :'stretch',
                pack:'center'
            },

            items: [
                // start top content section ------------------------------------------------------------
                {
                    xtype: 'fieldset',
                    // margin: 100,
                    reference:'planCarrierSetUpContainer1',
                    flex: 1,
                    border: true,
                    title:'General Information',
                    defaults: {
                        labelWidth: 100,
                        flex: 1,
                        xtype: 'displayfield',
                        minWidth: 500

                    },
                    minHeight: 200,
                    items: [
                        {
                            fieldLabel: 'Carrier ID',
                            name: 'carrierId',
                            //hidden: true,
                            bind:{
                                disabled: '{!create}'
                            }
                        }, {
                            fieldLabel: 'Carrier Name',
                            name: 'carrierName'

                        }, {
                            fieldLabel: 'Service Location',
                            name: 'serviceLocation'

                        }
                    ]
                },

                {
                    xtype:'fieldset',
                    reference:'planCarrierSetUpContainer2',
                    border: true,
                    title:'Contact Information',
                    flex: 1,
                    defaults: {
                        labelWidth: 100,
                        flex: 1,
                        xtype: 'displayfield',
                        minWidth: 500
                    },
                    items: [
                        {
                            fieldLabel: 'Address 1',
                            name: 'address1'

                        }, {
                            fieldLabel: 'Address 2',
                            name: 'address2'

                        }, {
                            fieldLabel: 'City',
                            name: 'city'

                        }, {
                            fieldLabel: 'State',
                            name: 'state'

                        }, {
                            fieldLabel: 'Zip',
                            name: 'zip'

                        }
                    ]
                }
            ]


        },
        {
            xtype: 'plan-carriers-accounts',
            flex: 2,
            title:'Account Details',
            collapsible: true,
            minHeight: 350
        },
        {
            xtype: 'plan-carriers-lobs',
            flex: 2,
            title:'Line of Business Details',
            collapsible: true,
            minHeight: 350
        }
        /*{
            xtype: 'tabpanel',
            flex: 1,
            items: [

            ]
        }*/
    ]
});