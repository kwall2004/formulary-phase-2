Ext.define('Atlas.portals.rxmember.model.PharmacyType', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'name',type: 'string'},
        {name: 'value',type: 'string'}
    ],

    proxy: {
        extraParams: {
            "pListName": "DispenserType"
        },
        url: 'portal/{0}/listitemsmrx'
    }
});

