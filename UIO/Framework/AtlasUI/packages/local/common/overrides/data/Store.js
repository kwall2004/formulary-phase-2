/**
 * Adds metaData to the Store for shorthand access
 */
Ext.define('Atlas.common.overrides.data.Store', {
    override: 'Ext.data.Store',

    compatibility: '6.2.0',

    config: {
        extraData: null
    },
    sort: function (field, direction, mode) {
        var me = this;
        var f = this.getModel().getFields();
        var t = 'string';
        if (f){
            for(var i=0;i<f.length;i++){
                if (f[i].name== field){
                    t = f[i].type;
                    break;
                }
            }

        }
        if (!t||t==null)
            t='string';
        if (arguments.length === 0) {
            if (me.getRemoteSort()) {
                me.load();
            } else {
                me.forceLocalSort();
            }
        } else {
            me.getSorters().addSort(field, direction, mode, t);
        }
    },
    onProxyLoad: function (operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful(),
            proxy = operation.getProxy(),
            reader = proxy ? proxy.getReader() : null;

        if (me.destroyed) {
            return;
        }

        if (resultSet) {
            me.totalCount = resultSet.getTotal();
        }

        if (successful) {
            records = me.processAssociation(records);
            me.loadRecords(records, operation.getAddRecords() ? {
                addRecords: true
            } : undefined);
        } else {
            me.loading = false;
        }

        //Add metaData directly to Store for convenient access
        if (reader) {
            me.setExtraData(reader.metaData)
        }

        if (me.hasListeners.load) {
            me.fireEvent('load', me, records, successful, operation);
        }
        me.callObservers('AfterLoad', [records, successful, operation]);
    }
});