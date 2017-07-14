Ext.define('Atlas.common.view.MerlinWorkspaceController', {
    extend: 'Atlas.common.view.WorkspaceController',
    alias: 'controller.merlinworkspace',

    init: function () {
        var menustore = this.getViewModel().getStore('menuitems');
        //  token = this.getViewModel().get('user.token');

        menustore.load();
       /*
        menustore.filterBy(function (record) {
            return record.get('level') < 3;
        });
        */
    }
});
