
Ext.define('Atlas.portals.view.rxmember.FormsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formsviewmodel',

    stores: {
        formsStore: {
            model: 'Atlas.portals.view.rxmember.model.FormsModel'
        }
    }
});
