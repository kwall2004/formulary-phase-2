Ext.define('Atlas.portals.provider.store.ListItem', {
    extend: 'Ext.data.Store',
    alias: 'store.provider-listitem',
    model: 'Atlas.portals.provider.model.ListItems',
    includeAll: false,
    listeners: {
        beforeload: function(store, operation, eOpts) {
            if (store.pListName) {
                store.getProxy().setExtraParam('pListName', store.pListName);
            }
        },
        load: function (store) {
            var metadata = store.getProxy().getReader().metaData,
                items = metadata.pListItems,
                data = [],
                i = 0,
                pairs, len, tmp;

            // include All
            if (store.includeAll == true) {
                data.push({
                    id: 'All',
                    name: 'ALL'
                })
            }

            // Prepare the data
            pairs = items.split('^');
            len = pairs.length;

            for (; i < len; i += 2) {
                data.push({
                    id: pairs[i + 1],
                    name: pairs[i]
                });
            }
            // Feed store with the data
            store.setData(data);
        }
    }
});
