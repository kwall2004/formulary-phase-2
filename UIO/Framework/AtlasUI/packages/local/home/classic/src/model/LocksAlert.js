Ext.define('Atlas.home.model.LocksAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'ttcount', type: 'int'},
        {name: 'ttype', type: 'string'},
        {name: 'ttstatus', type: 'string'},
        {
            name: 'ttypegroup',
            type: 'string',
            convert: function (v, rec){
                switch(rec.get('ttype')){
                    case "Fax":
                        return "New Faxes";
                        break;
                    case "ncpdp":
                        return "Pharmacy Locks";
                        break;
                    case "npi":
                        return "Prescriber Locks";
                        break;
                    default:
                        return rec.get('ttype');
                };
            }
        }
    ],

    proxy: {
        url: 'member/{0}/memberlockstatussummary',
        timeout: 120000
    }
});