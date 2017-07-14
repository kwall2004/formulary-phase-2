/*
 Developer: Tremaine Grant
 Description: model for providers
 Origin: Merlin
 8/16/16

 */
Ext.define('Atlas.common.model.Provider', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'ncpdpId',
        type: 'string'
    }, {
        name: 'npi',
        type: 'string'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'Address1',
        type: 'string'
    }, {
        name: 'Address2',
        type: 'string'
    }, {
        name: 'locCity',
        type: 'string'
    }, {
        name: 'locState',
        type: 'string'
    }, {
        name: 'locZip',
        type: 'string'
    },
    {
        name: 'Pharname', calculate: function (obj) {
        var pharname = '';
        if (obj.ncpdpId && obj.Name) {
            pharname = obj.ncpdpId + ' ' + obj.Name;
        }
        return pharname;
    }
    }],
    proxy: {
        extraParams: {
            pRowid:0,
            pRowNum:0,
            pBatchSize:100,
            pSort:"",
            pagination:true
        },
        url: 'pharmacy/{0}/pharmacylocationdetail'
    }
});