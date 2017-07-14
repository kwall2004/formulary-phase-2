Ext.define('Atlas.pharmacy.view.main.survey.NcpdpDetails', {
    extend: 'Ext.Window',
    xtype: 'pharmacy-main-ncpdpdetails',

    title: 'NCPDP State License Details',

    width: 650,
    height: 200,
    layout: 'fit',
    modal: true,
    autoShow: true,

    viewModel: {
        stores: {}
    },

    items: [
        {
            xtype: 'grid',
            store: {
                proxy: {
                    type: 'memory'
                }
            },
            columns: {
                defaults: {
                    flex: 1,
                    menuDisabled: true
                },
                items: [
                    {
                        text: 'NCPDP ID',
                        dataIndex: 'NCPDPId'
                    },
                    {
                        text: 'State',
                        dataIndex: 'licenseStateCode'
                    },
                    {
                        text: 'License Number',
                        dataIndex: 'stateLicenseNumber'
                    },
                    {
                        text: 'Expiration Date',
                        dataIndex: 'expirationDate'
                    },
                    {
                        text: 'Deleted Date',
                        dataIndex: 'deleteDate'
                    }
                ]
            }
        }
    ],

    initComponent:function(){
        this.items[0].store.data = this.storeData;
        this.callParent();
    }
});
