Ext.define('Atlas.member.view.ClaimsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.claims',
    stores:{
        claims:{
            model: 'Atlas.member.model.Claims',
            remoteSort: true,
            remoteFilter: true
        }
    }
});