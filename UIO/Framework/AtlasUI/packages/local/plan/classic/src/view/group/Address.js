Ext.define('Atlas.plan.view.group.Address', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-group-address',
    title: '~address',
    controller: 'plan-group-address',
    viewModel: 'plan-group-address',
    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            alighnment: 'center',

            items: [
                {
                    xtype: 'grid',
                    reference: 'AddressListgrid',
                    flex:1,
                    title: 'Plan Address',
                    listeners:{
                        select: 'onAdressSelect'
                    },

                    columns:[
                        {text: 'Address Type',dataIndex:'AddressType', flex: 1},
                        {text: 'Address 1', dataIndex:'Address1',flex: 1},
                        {text: 'Address 2',dataIndex:'Address2', flex: 1},
                        {text: 'City',dataIndex:'City', flex: 1},
                        {text: 'State',dataIndex:'State', flex: 1},
                        {text: 'Zip Code',dataIndex:'ZipCode', flex: 1},
                        {text: 'Phone',dataIndex:'PlanPhone', flex: 1},
                        {text: 'Fax',dataIndex:'Fax', flex: 1},
                        {text: 'Phone Ext',dataIndex:'PhoneExt', flex: 1},
                        {text: 'Web Address',dataIndex:'WebAddress', flex: 1},
                        {text: 'Email',dataIndex:'Email', flex: 1},
                        {text: 'Portal Address',dataIndex:'ShowOnPortal', flex: 1,
                            renderer: function (value) {
                                if (value == true) return "Yes";
                                else return "No"
                            }
                        }
                    ],
                    bind: {
                        store: '{planaddress}'
                    }
                }
            ],

            dockedItems: {
                xtype: 'pagingtoolbar',
                bind: '{planaddress}',
                dock:'bottom',
                displayInfo: true,
                hideRefresh: true
            }

        },
        {
            xtype: 'plan-group-addressform',
           // flex: 2,
            autoScroll: true,
            bodyPadding: 0,
            region: 'south',
            store: '{planadressinprocess}'
        }

    ]

});