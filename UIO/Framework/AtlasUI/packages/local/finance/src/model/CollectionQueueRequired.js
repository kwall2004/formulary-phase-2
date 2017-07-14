Ext.define('Atlas.finance.model.CollectionQueueRequired', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'Account',
        type: 'string'
    }, {
        name: 'RecipientID',
        type: 'string'
    }, {
        name: 'CreatedBy',
        type: 'string'
    }, {
        name: 'AssignTo',
        type: 'string'
    }, {
        name: 'LetterNameID',
        type: 'number'
    }, {
        name: 'LetterID',
        type: 'number'
    }, {
        name: 'HourRemaining',
        type: 'number'
    }, {
        name: 'CreatedDate',
        type: 'date'
    }, {
        name: 'CollectionCreditID',
        type: 'number'
    }, {
        name: 'MemberName',
        type: 'string'
    }, {
        name: 'Carrier',
        type: 'string'
    }, {
        name: 'LetterName',
        type: 'string'
    }, {
        name: 'DueDate',
        type: 'date'
    }, {
        name: 'LOB',
        type: 'string'
    }],

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'finance/{0}/requiredcollectioncreditqueue'
    }
});