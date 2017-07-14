/**
 * Created by j2560 on 11/2/2016.
 */
Ext.define('Atlas.benefitplan.model.servicearea.LookupDetails', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'LookupTypeDescription', type: 'string'},
        {name: 'LookupTypeChild', type: 'int'},
        {name: 'Selected'},
        {name: 'LookupTypeSK', type: 'int'},
        {name: 'SvcAreaTypeSK', type: 'int'},
        {name: 'USZipPlus4Ind'}
    ],
    proxy: {
        url: '/ServiceAreaConfiguration',
        reader: {
            rootProperty: function(data) {
                return data.Rows[0].LookupDetails;
            }
        }
    }
});