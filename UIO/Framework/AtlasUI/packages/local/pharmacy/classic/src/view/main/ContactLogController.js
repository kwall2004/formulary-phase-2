Ext.define('Atlas.pharmacy.view.main.ContactLogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-main-contactlog',

    listen: {
        controller: {
            'pharmacy': {
                datachanged: 'onModuleDataChange'
            }
        }
    },

    //Will be running after first layout
    boxReady: function () {
        // if so - load our data
        var me = this;
        //Contact log reusable component is not corretly loaded unless we escape curent Event loop
        Ext.defer(function(){  me.onModuleDataChange();},10)
    },

    onModuleDataChange: function (origin) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            pharmacy = vm.get('activePharmacy'),
            contactlogstore = vm.getStore('contactloglist');

        //Prevent any data collisions between tabs
        if (origin && origin !== view.ownerCt.id) {
            return;
        }

        if (pharmacy && pharmacy.get('ncpdpid')) {
            // Pharmacy data available

            contactlogstore.load({
                params: {
                    pKeyValue: pharmacy.get('ncpdpid'),
                    pKeyType: 'ncpdpid'
                },
                callback: function (record) {
                    me.fireEvent('recordLoaded');
                }
            });
        }
    }
});
