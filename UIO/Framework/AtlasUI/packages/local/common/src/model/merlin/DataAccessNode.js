Ext.define('Atlas.common.model.merlin.DataAccessNode', {
    extend: 'Atlas.common.model.TreeBase',
    idProperty: 'nodeId',
    convertOnSet: false,
    fields: [
        {
            name: 'checked',
            type: 'boolean',
            persist: false,
            convert: function (value, record) {
                // debugger
                return record.get('nodeChecked') === 1;
            }
        }
    ],
    proxy: {
        url: 'authentication/{0}/dataaccesstree',
        extraParams: {
            pFullTree: false,
            pSessionOnly: true
        },
        reader: {
            transform: function (data) {
                return {
                    rootData: data.data
                };
            },
            rootProperty: function (payload) {
                return payload.nodeId === 'root' ? null : payload.rootData || payload.children;
            }
        }
    }
});
