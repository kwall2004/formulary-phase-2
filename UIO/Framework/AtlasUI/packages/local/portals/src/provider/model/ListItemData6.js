/**
 * Created by c4539 on 1/18/2017.
 */
Ext.define('Atlas.portals.provider.model.ListItemData6', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'listDescription', type: 'string' },
        { name: 'listItem', type: 'string' },
        { name: 'charstring', type: 'string' }
    ],

    proxy: {
        url: 'shared/hp/listitemdata6'
    }
});