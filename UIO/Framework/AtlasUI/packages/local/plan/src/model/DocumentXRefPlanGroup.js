/**
 * Created by d3973 on 11/16/2016.
 */
Ext.define('Atlas.plan.model.DocumentXRefPlanGroup', {
    extend: 'Atlas.common.model.Base',

    newRecord: false,

    fields: [{
        name: 'lastUpdatedBy',
        type: 'string'
    }, {
        name: 'prescriberDoc',
        type: 'boolean'
    }, {
        name: 'systemID',
        type: 'number'
    }, {
        name: 'pharmacyDoc',
        type: 'boolean'
    }, {
        name: 'otherDoc',
        type: 'boolean'
    }, {
        name: 'active',
        type: 'boolean'
    }, {
        name: 'lastModified',
        type: 'date'
    }, {
        name: 'memberDoc',
        type: 'boolean'
    }, {
        name: 'PGHierarchySystemId',
        type: 'number'
    }],

    proxy:{
        extraParams: {
            pagination: true,
            pBatchSize: 0,
            pWhere: ''
        },
        url: 'plan/rx/documnetxrefplangroupext'
    }
});