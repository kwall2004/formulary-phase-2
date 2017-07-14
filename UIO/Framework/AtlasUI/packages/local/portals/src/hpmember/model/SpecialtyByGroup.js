Ext.define('Atlas.portals.hpmember.model.SpecialtyByGroup', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'id' },
        { name: 'value' }
    ],

    proxy: {
        url: 'portal/hp/listitemdata',
        extraParams: {
            pListItem: 1,
            pFieldList: 'charString'
        }
    }
});