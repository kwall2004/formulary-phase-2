/**
 * Created by agupta on 10/16/2016.
 */
Ext.define('Atlas.authorization.model.cdag.OutreachModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
            { name: 'ContactType', type : 'string'},
            { name: 'OutreachEntity', type : 'number'},
            { name: 'EntityType', type : 'string'},
            { name: 'ReasonCode', type : 'string'},
            { name: 'CreateDate', type : 'date', dateFormat: 'Y-m-d'},
            { name: 'CallerLastName', type : 'string'},
            { name: 'CallerFirstName', type : 'string'},
            { name: 'CallerPhone', type : 'string'},
            { name: 'CallerFax', type : 'string'},
            { name: 'CallDateTime', type : 'string'},
            { name: 'AppealTypeDesc', type : 'string'},
            { name: 'ReasonDescription', type : 'string'},
            { name: 'SystemID', type : 'number'},
            { name: 'RecordAction', type : 'string'},
            { name: 'Description', type : 'string'},
            { name: 'ContactEntity', type : 'string'},
            { name: 'ContactEntityDesc', type : 'string'},
            { name: 'OutreachDescription', type : 'string'},
            { name: 'ReasonCodeDescription', type: 'string',
                calculate: function (data) {
                    return (data.ReasonCode + ' - ' + data.ReasonDescription);
                }
            }
    ],
    proxy: {
        extraParams: {
            pAuthID : ''
        },
        url: 'claims/{0}/coverageoutreach'
    }
});