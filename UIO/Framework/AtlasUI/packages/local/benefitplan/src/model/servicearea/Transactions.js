/**
 * Created by j2560 on 11/10/2016.
 */
Ext.define('Atlas.benefitplan.model.servicearea.Transactions', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'SvcAreaSK', type: 'int'},
        {name: 'TransactionType', type: 'int'},
        {name: 'SvcAreaTypeSK', type: 'int'},
        {name: 'TransactionTypeSK', type: 'int'},
        {name: 'Deleted'}
    ]
});