
Ext.define('Atlas.portals.rxmember.MyClaimsMemberModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myclaimsmembermodel',
    stores: {
        myClaimsMemberStore: {
            pageSize: 10,
           // model: 'Atlas.portals.rxmember.model.MyClaimsMemberStoreModel',
            model: 'Atlas.portals.rxmember.model.MemberPrescriptionExpense',
            // remoteSort:true,
            // remoteFilter: true,
            autoLoad:true
        },
        claimSearchStore: {
            pageSize: 10,
            model: 'Atlas.portals.rxmember.model.ClaimSearchModel'
            // remoteSort:true,
            // remoteFilter: true
        },
        pharmacyInfoStore: {
            model: 'Atlas.portals.rxmember.model.PharmacyInfoStoreModel',
            session:true
        },
        prescriberInfoStore: {
            model: 'Atlas.portals.rxmember.model.PrescriberInfoStoreModel',
            session:true
        }
    }


});

