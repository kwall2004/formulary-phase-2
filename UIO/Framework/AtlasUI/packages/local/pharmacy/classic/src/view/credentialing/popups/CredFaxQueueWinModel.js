/**
 * Created by agupta on 12/15/2016.
 */

Ext.define('Atlas.pharmacy.view.credentialing.popups.CredFaxQueueWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CredFaxQueueWinModel',

    stores: {
        CredFAXQueueList: {
            fields: ['value', 'text'],
            data: [
                ['1', 'New Faxes'],
                ['2', 'Acknowledged Faxes']
            ]
        },
        FaxQStore: {
            model: 'Atlas.member.model.faxQDocuments',
            pageSize: 12,
            autoLoad: false
        },

        MIFaxQStore:{
            model: 'Atlas.member.model.faxQDocuments',
            pageSize: 12,
            autoLoad: false
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
