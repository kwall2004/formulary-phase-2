Ext.define('Atlas.pharmacy.view.main.survey.PicHistory', {
    extend: 'Ext.Window',
    xtype: 'pharmacy-main-pichistory',

    title: 'Pharmacy In Charge Update History',

    width: 650,
    height: 450,
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
                        text: 'PIC',
                        dataIndex: 'PIC'
                    },
                    {
                        text: 'License #',
                        dataIndex: 'PicLicNum'
                    },
                    {
                        text: 'Expiration Date',
                        dataIndex: 'PICExpDate'
                    },
                    {
                        text: 'Verified Date',
                        dataIndex: 'PICVerfDate'
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
