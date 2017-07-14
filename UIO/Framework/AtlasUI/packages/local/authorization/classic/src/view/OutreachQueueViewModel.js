/**
 * Created by s6685 on 11/20/2016.
 */
Ext.define('Atlas.authorization.view.OutreachQueueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.OutreachQueueViewModel',
    stores: {
        ReqApprovalLetterStore: {
        model: 'Atlas.authorization.model.ApvlLetterQModel',
        autoLoad: false
    },
        outreachPendingDecisionStore: {
            //type: 'clonestore',
            model: 'Atlas.authorization.model.OutreachPendingDecisionModel',
            remoteSort: true,
            autoLoad: false
            // proxy: {
            //     extraParams: {
            //         pQueueType: 'DECISION'
            //     },
            //     url: 'claims/{0}/coverageoutreachq'
            // }
        },
        outreachAORStore: {
            type: 'clonestore',
            model: 'Atlas.authorization.model.OutreachAORModel',
            autoLoad: true,
            remoteSort: true,
            proxy: {
                extraParams: {
                    pQueueType: 'AOR',
                 pagination: true
                },
                url: 'claims/{0}/coverageoutreachq'
            }
        }
    }

});
