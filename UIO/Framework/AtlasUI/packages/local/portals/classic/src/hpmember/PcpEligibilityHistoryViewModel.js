/**
 * Created by b6636 on 11/7/2016.
 */
Ext.define('Atlas.portals.hpmember.PcpEligibilityHistoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pcpEligibilityHistoryViewModel',

    stores: {
        eligibilityStore: {
            type: 'hpmember-memberenrollmentmasterweb',
            autoLoad: false
        },
        pcpStore: {
            type: 'hpmember-enrollpcpmasterweb',
            autoLoad: false
        },
        memberDataStore: {
            type: 'hpmember-memberdataweb',
            autoLoad: false
        },
        memberLobStore: {
            type: 'hpmember-memberlob',
            autoLoad: false,
            includeAll: false,
            asynchronousLoad: false
        }
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'PcpEligibilityHistory',
            autoLoad: true
        }
        */
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});