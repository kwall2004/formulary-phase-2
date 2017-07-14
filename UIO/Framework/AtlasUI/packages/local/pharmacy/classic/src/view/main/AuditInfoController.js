Ext.define('Atlas.pharmacy.view.main.AuditInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-audit',

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
        this.onModuleDataChange();
    },

    onModuleDataChange: function (origin) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            store = vm.getStore('audit'),
            ncpdpId = vm.getParent().get('ncpdpId');

        //Prevent any data collisions between tabs
        if (origin && origin !== view.ownerCt.id) {
            return;
        }

        if (!ncpdpId) {
            return;
        }

        me.getView().mask('Loading...');
        store.removeAll(true); // remove any old data

        store.load({
            params: {
                pWhere: " NCPDPID = '" + ncpdpId + "'"
            },
            callback: function (record, operation) {
                var status = operation.getResultSet().message[0];
                me.getView().unmask();
                if (status.code !== 0) {
                    Ext.Msg.alert('Error', status.message);
                }
            }
        });
    }
});
