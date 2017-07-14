/*
 Developer: Srujith Cheruku
 Description: plan benefit model
 Origin: Merlin
 8/22/16

 */
Ext.define('Atlas.common.model.PlanBenefitExt', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'planBenefitId',
        type: 'number'
    }, {
        name: 'planBenefitCode',
        type: 'string'
    }, {
        name: 'BenefitName',
        type: 'string'
    }, {
        name: 'benefitStatus',
        type: 'string'
    }, {
        name: 'planGroupId',
        type: 'number'
    }, {
        name: 'planGroupCode',
        type: 'string'
    }, {
        name: 'planGroupName',
        type: 'string'
    }, {
        name: 'CarrierName',
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
        name: 'systemId',
        type: 'number'
    }, {
        name: 'RowNum',
        type: 'number'
    }],

    proxy: {
        extraParams: {
            pRowid: '0',
            pRowNum: '0',
            pBatchSize: '10',
            pSort: 'planBenefitId',
            pagination:true
        },
        url: 'plan/{0}/planbenefitsext'
    }

});
