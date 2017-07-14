Ext.define('Atlas.portals.prescriber.model.PlanLetterInfo', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'planGroupId', type: 'string' },
        { name: 'pgLogoName', type: 'string' },
        { name: 'pgNameShort', type: 'string' },
        { name: 'pgNameLong', type: 'string' },
        { name: 'pgContactPhone', type: 'string' },
        { name: 'pgContactExtension', type: 'string' },
        { name: 'pgTTYcontactPhone', type: 'string' },
        { name: 'pgContactFax', type: 'string' },
        { name: 'pgAvailDays', type: 'string' },
        { name: 'pgAvailTime', type: 'string' },
        { name: 'pgAddress', type: 'string' },
        { name: 'pgCity', type: 'string' },
        { name: 'pgState', type: 'string' },
        { name: 'pgZip', type: 'string' },
        { name: 'systemID', type: 'string' },
        { name: 'recordVersion', type: 'string' },
        { name: 'lastModified', type: 'string' },
        { name: 'pharmTechPhone', type: 'string' },
        { name: 'pharmTechFax', type: 'string' },
        { name: 'planServStates', type: 'string' },
        { name: 'pharmTechTTY', type: 'string' },
        { name: 'letterFrom', type: 'string' },
        { name: 'pgFullContactPhone', calculate: function(obj) {
            return obj.pgContactPhone + ' x' + obj.pgContactExtension;
        }},
        { name: 'pgFullAvailability', calculate: function(obj) {
            return obj.pgAvailDays + ' ' + obj.pgAvailTime;
        }}
    ],

    proxy: {
        extraParams: {
            pBatchSize: 0
        },

        url: 'plan/{0}/planletterinfo'
    }
});