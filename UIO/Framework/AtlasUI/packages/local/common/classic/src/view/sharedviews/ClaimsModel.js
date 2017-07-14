/**
 * Created by T4317 on 9/8/2016.
 */
Ext.define('Atlas.common.view.sharedviews.ClaimsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shared-claims',
    stores: {
        claims: {
            // model: 'Atlas.common.model.Claims',
            // remoteSort: true,
            // remoteFilter: true
            type: 'common-claims'
        },
        claimstatusstore: {
            model: 'Atlas.common.model.shared.ClaimStatus',
            autoLoad: true,
            listeners: {
                load: function (store) {
                    //Add All value that is not present in payload options
                    store.insert(0, {name: 'All', value: ''});
                }
            }
        },
        dataaccessstore: {
            type: 'common-merlin-dataaccesstree'
        }
    },
    data:{
        memberTypeAheadIsEnabled: true,
        prescriberTypeAheadIsEnabled: true,
        drugTypeAheadIsEnabled: true,
        pharmacyTypeAheadIsEnabled: true,
        gcnTypeAheadIsEnabled:true,
        toDate: '',
        fromDate: '',
        isRecordExists: false,
        keyType: '',
        keyValue: '',
        pcnList: '',
        plangroupList: ''
    }

});
