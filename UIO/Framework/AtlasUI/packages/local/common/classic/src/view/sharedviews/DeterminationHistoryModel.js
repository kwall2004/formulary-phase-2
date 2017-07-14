
Ext.define('Atlas.common.view.sharedviews.DeterminationHistoryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DeterminationHistoryModel',

    stores: {
        MemberDeteminationHistory: {
            type: 'common-memberPAHistory'
        }
    }

});