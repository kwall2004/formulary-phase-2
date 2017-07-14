/**
 * Created by d3973 on 3/8/2017.
 */
Ext.define('Atlas.finance.model.PharmacyRelationshipDetail', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'contractStatus',
        type: 'string'
    }, {
        name: 'PharTermdate',
        type: 'date'
    }, {
        name: 'Excluded',
        type: 'boolean'
    }, {
        name: 'Termdate',
        type: 'date'
    }, {
        name: 'EffectiveDate',
        type: 'date'
    }, {
        name: 'PharEffDate',
        type: 'date'
    }],

    proxy: {
        url: 'pharmacy/{0}/pharmacyrelationshipdetail'
    }
});