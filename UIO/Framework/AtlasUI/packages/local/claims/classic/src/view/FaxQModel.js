/**
 * Created by T4317 on 1/24/2017.
 */
Ext.define('Atlas.claims.view.FaxQModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ClaimsFaxQ',

    stores: {
        queueList: {
            fields: ['value', 'text'],
            data:[
                ['1', 'New Faxes'],
                ['2', 'Acknowledged Faxes']
            ]
        },
        faxQueueDocuments: {
            model: 'Atlas.member.model.faxQDocuments',
            pageSize: 12,
            autoLoad: true
        },
        PAFaxQDistribution: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'PAFaxQDistribution',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PAFaxQDistribution'
                },
                url: 'shared/{0}/listitems'
            }
        },
        QManagementData: {
            storeId: 'QManagementData',
            autoLoad: false,
            model: 'Atlas.member.model.QManagementData'
        },
        ForwardFaxList: {
            fields: ['value', 'text']
        }
    }

});

