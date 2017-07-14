Ext.define('Atlas.portals.view.provider.FeedbackViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.portalsproviderfeedback',

    stores: {
        medicaidStore: {
            proxy: {
                type: 'memory'
            }
        }
    }
});
