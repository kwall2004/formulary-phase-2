Ext.define('Atlas.common.model.StaticBase',{
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.identifier.Uuid'
    ],

    idProperty: 'id', // defaults to id, added for clarity
    identifier: 'uuid', // uuid, sequential or negative

    schema: {
        id: 'static',
        namespace: 'Atlas.common.model',
        proxy: {
            useDefaultXhrHeader: false,
            noCache: false,
            pageParam: '',
            startParam: '',
            limitParam: '',
            type: 'ajax'
        }
    }
});