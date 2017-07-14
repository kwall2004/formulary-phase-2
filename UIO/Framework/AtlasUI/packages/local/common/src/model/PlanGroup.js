/*
 Developer: Srujith Cheruku
 Description: model for plan Group
 Origin: Merlin
 8/22/16

 */
Ext.define('Atlas.common.model.PlanGroup', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'planGroupId',
        type: 'number'
    }, {
        name: 'planGroupCode',
        type: 'string'
    }, {
        name: 'planGroupName',
        type: 'string'
    }, {
        name: 'CMSCntrId',
        type: 'string'
    }, {
        name: 'planGroupStatus',
        type: 'string'
    }, {
        name: 'carrierName',
        type: 'string'
    }, {
        name: 'accountName',
        type: 'string'
    }, {
        name: 'lobName',
        type: 'string'
    }, {
        name: 'effDate',
        type: 'string'
    }, {
        name: 'termDate',
        type: 'string'
    }, {
        name: 'RowNum',
        type: 'number'
    }, {
        name: 'cmsPBPid',
        type: 'string'
    }],
    proxy: {
        extraParams: {
            pRowid: '0',
            pRowNum: '0',
            pBatchSize: '10',
            pSort: 'planGroupId',
            pagination:true
        },
        url: 'plan/{0}/plangroupsext'
    }
});