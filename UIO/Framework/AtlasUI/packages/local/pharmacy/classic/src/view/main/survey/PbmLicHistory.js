Ext.define('Atlas.pharmacy.view.main.survey.PbmLicHistory', {
    extend: 'Ext.Window',
    xtype: 'pharmacy-main-pbmlichistory',
    controller: 'pharmacy-main-pbmlichistory',

    title: 'PBM License Update History',

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
                        text: 'Expiration Date',
                        dataIndex: 'StateLicExpDate'
                    },
                    {
                        text: 'Verified Date',
                        dataIndex: 'StLicVerfDate'
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
