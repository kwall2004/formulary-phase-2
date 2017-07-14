Ext.define('Atlas.portals.hpmember.model.Language', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'name' },
        { name: 'id' }
    ],

    proxy: {
        url: 'portal/hp/providerlanguages',
        extraParams: {
            pLangTable: 'LE'
        }
    }
});