/**
 * Paging Memory Proxy, allows to use paging grid with in memory dataset
 */
Ext.define('Atlas.common.model.shared.RemotePagination', {
    extend: 'Ext.data.proxy.Memory',
    alias: 'proxy.RemotePagination',
    alternateClassName: 'Ext.data.RemotePagination',

    constructor: function() {
        Ext.log.warn('Ext.ux.data.PagingMemoryProxy functionality has been merged into Ext.data.proxy.Memory by using the enablePaging flag.');
        this.callParent(arguments);
    },

    read : function(operation, callback, scope){
        var reader = this.getReader(),
            result = reader.read(this.data);

        scope = scope || this;

        // paging (use undefined cause start can also be 0 (thus false))
        if (operation.start !== undefined && operation.limit !== undefined) {
            result.records = result.records.slice(operation.start, operation.start + operation.limit);
            result.count = result.records.length;
        }

        Ext.apply(operation, {
            resultSet: result
        });

        operation.setCompleted();
        operation.setSuccessful();

        Ext.Function.defer(function () {
            Ext.callback(callback, scope, [operation]);
        }, 10);
    }
});
