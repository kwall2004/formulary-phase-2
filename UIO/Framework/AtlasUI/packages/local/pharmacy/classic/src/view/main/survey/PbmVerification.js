Ext.define('Atlas.pharmacy.view.main.survey.PbmVerification', {
    extend: 'Ext.Window',
    xtype: 'pharmacy-main-pbmverification',
    controller: 'pharmacy-main-pbmverification',

    title: 'PBM Verification History',

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
                        text: 'Verified By',
                        dataIndex: 'VerfPerfBy'
                    },
                    {
                        text: 'Verified Date',
                        dataIndex: 'VerfPerfDate'
                    },
                    {
                        text: 'Cred. Comm. Approval Date',
                        dataIndex: 'CredCommApprDate'
                    },
                    {
                        text: 'Comments',
                        dataIndex: 'Comments'
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
