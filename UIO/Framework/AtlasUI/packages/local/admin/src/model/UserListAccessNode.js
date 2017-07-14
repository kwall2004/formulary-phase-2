Ext.define('Atlas.admin.model.UserListAccessNode', {
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
        url: 'shared/rx/userlistsaccessrest',
        extraParams: {
            // pFullTree: false,
            pListName:'PriorAuthStatus'
            // pSessionOnly: true
        },
        reader: {
            transform: function (data) {
                return {
                    rootData: data.data
                };
            },
            rootProperty: function (payload) {
                if (payload.nodeId !== 'root') {
                    if (payload.rootData != null && payload.rootData != "") {
                        if (payload.rootData.nodeName == "ALL") {
                            return payload.rootData.children;
                        }
                        else {
                            return payload.rootData.children;
                        }
                    }
                    if (payload.children != null) {
                        return payload.children;
                    }

                }
            }
        }
    }
});
