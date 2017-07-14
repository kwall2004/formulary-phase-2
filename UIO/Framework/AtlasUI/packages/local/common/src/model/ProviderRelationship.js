/**
 * Created by n6684 on 11/10/2016.
 */
Ext.define('Atlas.common.model.ProviderRelationship', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'relationshipID',
        type: 'string'
    }, {
        name: 'address1',
        type: 'string'
    }, {
        name: 'relationType',
        type: 'string'
    }, {
        name: 'city',
        type: 'string'
    }, {
        name: 'state',
        type: 'string'
    }, {
        name: 'zip',
        type: 'string'
    },
    {
        name: 'Relationshipname', calculate: function (obj) {
        var relname = '';
        if (obj.relationshipID && obj.name) {
            relname = obj.relationshipID + ' ' + obj.name;
        }
        return relname;
    }
    }],

    proxy: {
        extraParams: {
            pRowid: 0,
            pRowNum: 0,
            pBatchSize: 100,
            pSort: "''",
            pagination: true
        },
        url: 'pharmacy/{0}/relationshiplocationdetail'
    }
});