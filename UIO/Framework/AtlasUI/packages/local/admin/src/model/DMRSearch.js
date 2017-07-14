/**
 * Created by d3973 on 10/25/2016.
 */
Ext.define('Atlas.admin.model.DMRSearch', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'SystemID',
        type: 'number'
    }, {
        name: 'LOBName',
        type: 'string'
    }, {
        name: 'Stat',
        type: 'string'
    }, {
        name: 'HoursRemaining',
        type: 'number'
    }, {
        name: 'DMRrecDate',
        type: 'date'
    }, {
        name: 'CheckDate',
        type: 'date'
    }, {
        name: 'DrugCode',
        type: 'number'
    }, {
        name: 'dateOfService',
        type: 'date'
    }, {
        name: 'AmtRequested',
        type: 'number'
    }, {
        name: 'NPI',
        type: 'string'
    }, {
        name: 'PrescFirstName',
        type: 'string'
    }, {
        name: 'PrescMiddleName',
        type: 'string'
    }, {
        name: 'PrescLastName',
        type: 'string'
    }, {
        name: 'NCPDPID',
        type: 'number'
    }, {
        name: 'LegalBusinessName',
        type: 'string'
    }, {
        name: 'checkNum',
        type: 'number'
    }, {
        name: 'CheckAmt',
        type: 'number'
    }, {
        name: 'CarrierName',
        type: 'string'
    }, {
        name: 'AccountName',
        type: 'string'
    }]

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    /*
    Uncomment to add a rest proxy that syncs data with the back end.
    proxy: {
        type: 'rest',
        url : '/users'
    }
    */
});