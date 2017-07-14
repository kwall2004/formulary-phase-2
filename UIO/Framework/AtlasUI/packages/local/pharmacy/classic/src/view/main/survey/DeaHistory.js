Ext.define('Atlas.pharmacy.view.main.survey.DeaHistory', {
    extend: 'Ext.Window',
    xtype: 'pharmacy-main-deahistory',
    controller: 'pharmacy-main-deahistory',

    title: 'DEA Update History',

    width: 650,
    height: 300,
    layout: 'fit',
    modal: true,
    autoShow: true,

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
                        dataIndex: 'DeaExpDate'
                    },
                    {
                        text: 'Verified Date',
                        dataIndex: 'DeaVerfDate'
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
