Ext.define('Atlas.common.model.TreeBase',{
    extend: 'Ext.data.TreeModel',
    requires: [
        'Ext.data.identifier.Uuid',
        'Atlas.common.data.proxy.Layer7'
    ],

    identifier: 'uuid', // uuid, sequential or negative

    schema: {
        id: 'atlastree',
        namespace: 'Atlas',
        proxy: {
            type: 'layer7'
        }
    }
});