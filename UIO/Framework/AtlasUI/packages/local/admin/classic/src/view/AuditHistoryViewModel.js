
/**
 * Created by s6685 on 11/30/2016.
 */
Ext.define('Atlas.admin.view.AuditHistoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.AuditHistoryViewModel',
    stores: {

        AuditHistoryStore: {
            model: 'Atlas.admin.model.AuditHistoryModel',
            autoLoad: false

        },
        TableStore: {
            type: 'clonestore',
            model: 'Atlas.admin.model.TableAndFieldDetailModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pTableName: 'ALL'
                },
                url: 'shared/{0}/tableandfielddetail'

            }
        },

        ColumnStore: {
        type: 'clonestore',
        model: 'Atlas.admin.model.TableAndFieldDetailModel',
        autoLoad: false,
        proxy: {
            extraParams: {
                pTableName: ''
            },
            url: 'shared/{0}/tableandfielddetail'


        }
    }



    }
});


