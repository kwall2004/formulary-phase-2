Ext.define('Atlas.macprice.view.CDAGFaxQueueModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CDAGFaxQueueModel',

    stores: {
        CDAGFAXQueueList: {
            fields: ['value', 'text'],
            data: [
                ['5', 'Medicaid New Faxes'],
                ['6', 'Medicare New Faxes'],
                ['1', 'Commercial Faxes'],
                ['2', 'Acknowledged Faxes'],
                ['7', 'WebPA New Faxes'],
                ['8', 'Discharge New Faxes'],
                ['3', 'Additional Info Faxes'],
                ['4', 'Acknowledged Addl. Info Faxes'],
                ['9', 'Redetermination New Faxes'],
                ['11', 'Acknowledged Redetermination Faxes'],
                ['10', 'DMR New Faxes'],
                ['12', 'Acknowledged DMR Faxes'],
                ['13', 'New Client Recommendations Faxes']
            ]
        },
        CDAGFAXQueueDocuments: {
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