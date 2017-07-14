/**
 * Created by d3973 on 12/12/2016.
 */
Ext.define('Atlas.admin.model.ErrorDetail', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'ErrorDescription',
        type: 'string'
    }, {
        name: 'ErrorType',
        type: 'string'
    }, {
        name: 'FieldQualifier',
        type: 'string'
    }, {
        name: 'ErrorListId',
        type: 'number'
    }, {
        name: 'SystemID',
        type: 'number'
    }, {
        name: 'ErrorCode',
        type: 'string'
    }],

    proxy: {
        url: 'shared/{0}/errordetail',
        extraParams: {
            pagination: true
        }
    }
});