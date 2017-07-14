Ext.define('Atlas.portals.prescriber.model.PrescriberUserMaster', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'NPI', type: 'string' },
        { name: 'DEA', type: 'string' },
        { name: 'UserName', type: 'string' },
        { name: 'FullName', type: 'string' },
        { name: 'Email', type: 'string' },
        { name: 'Phone', type: 'string' },
        { name: 'Fax', type: 'string' },
        { name: 'PresContactPerson', calculate: function(obj){
            return obj.FullName;
        }},
        { name: 'PrescriberName', type: 'string', calculate: function(obj) {
            return obj.FullName;
        }},
        { name: 'PrescriberNPI', type: 'string', calculate: function(obj) {
            return obj.NPI;
        }},
        { name: 'PresPhone', type: 'string', calculate: function(obj) {
            return obj.Phone;
        }},
        { name: 'PresFax', type: 'string', calculate: function(obj) {
            return obj.Fax;
        }}
    ],

    proxy: {
        url: 'portal/{0}/prescriberusermasterp'
    }
});