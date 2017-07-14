/**
 * Created by akumar on 1/13/2017.
 */

Ext.define('Atlas.claims.model.DetailsForTestCalim',{
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'patFirstName', type: 'string'},
        {name: 'patLastName', type: 'string'},
        {name: 'serviceDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'dateOfBirth', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'dateWritten', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'memberFullName', type: 'string',
            calculate: function (data) {
                return (data.patFirstName + ' ' + data.patLastName);
            }
        }
    ],

    proxy: {
        url: 'claims/{0}/detailsfortestclaim'
    }
});
