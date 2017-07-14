Ext.define('Atlas.portals.view.provider.admin.ChangePasswordViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.providerchangepassword',

    stores: {
        lol: {
            proxy: {
                type: 'memory'
            }
        }
    }
});
