/**
 * Created by d3973 on 10/11/2016.
 */
Ext.define('Atlas.admin.model.ListsModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
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
    }, {
        name: 'systemID',
        type: 'number'
    }],

    proxy: {
        url: 'system/{0}/listdetail'
        //unifyOperations: true
    }
});


Ext.define('Atlas.admin.model.getListCollection', {
    extend: 'Atlas.common.model.Base',

    fields: [{
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
    }, {
        name: 'systemID',
        type: 'number'
    }],

    proxy: {
        url: 'system/{0}/listdetail',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                payload.data.forEach(function (item, index) {
                    if(!item.planGroupAccess)
                        item.planGroupAccessData =[];
                    else
                         item.planGroupAccessData=item.planGroupAccess.split(',');
                });

                return payload.data;
            }
        }
        //unifyOperations: true
    }
});