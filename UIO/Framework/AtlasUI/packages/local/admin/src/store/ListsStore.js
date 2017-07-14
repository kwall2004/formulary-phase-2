/**
 * Created by d3973 on 9/30/2016.
 */
Ext.define('Atlas.admin.store.ListsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.adminlistsstore',

    fields: [
    {
        name: 'ListName',
        type: 'string'
    }, {
        name:'ListItem',
        type: 'string'
    }, {
        name: 'ListDescription',
        type: 'string'
    }, {
        name: 'planGroupAccess',
        type: 'string'
    }, {
        name: 'charString',
        type: 'string'
    }, {
        name: 'Active',
        type: 'boolean'
    }],

    data : {
        items: [
            {ListItem: 'ncpdpVersion'},
            {ListItem: 'ncpdpVersion'},
            {ListItem: 'ncpdpVersion'},
            {ListItem: 'ncpdpVersion'},
            {ListItem: 'ncpdpVersion'}
        ]
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }

});