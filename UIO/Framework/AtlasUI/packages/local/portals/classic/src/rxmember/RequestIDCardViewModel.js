Ext.define('Atlas.portals.rxmember.RequestIDCardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.requestidcardmodel',

    stores:{
        activeCoverages: {
            model: 'Atlas.portals.rxmember.model.MemberActiveCoverage'
        }
    },

    data: {
        memberUsername: ''
    }
});