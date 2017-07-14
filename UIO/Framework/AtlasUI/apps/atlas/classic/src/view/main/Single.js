Ext.define('Atlas.view.main.Single', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Atlas.view.main.SingleController',
        'Atlas.view.main.MainModel'
    ],

    controller: 'mainsingle',
    viewModel: 'main',
    layout: 'fit'
});
