Ext.define('Atlas.pharmacy.view.main.survey.PbmInsuranceHistory', {
    extend: 'Ext.Window',
    xtype: 'pharmacy-main-pbminsurance',
    controller: 'pharmacy-main-pbminsurance',

    title: 'PBM Insurance Update History',

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
                        text: 'Credentialing Date',
                        dataIndex: 'credDate'
                    },
                    {
                        text: 'Modified By',
                        dataIndex: 'ModifiedBy'
                    },
                    {
                        text: 'Insurance Name',
                        dataIndex: 'InsuranceName'
                    },
                    {
                        text: 'Account #',
                        dataIndex: 'InsuranceAccNum'
                    },
                    {
                        text: 'Expiration Date',
                        dataIndex: 'InsuranceExpDate'
                    },
                    {
                        text: 'Verified Date',
                        dataIndex: 'InsuranceVerfDate'
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
