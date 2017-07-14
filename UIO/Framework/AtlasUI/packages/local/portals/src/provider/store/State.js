Ext.define('Atlas.portals.provider.store.State', {
    extend: 'Ext.data.Store',
    alias: 'store.provider-state',
    model: 'Atlas.portals.provider.model.State',
    includeAll: false,
    listeners: {
        load: function (store) {
            var metadata = store.getProxy().getReader().metaData,
                items = metadata.pListItems,
                data = [],
                i = 0,
                pairs, len, tmp;

            // Prepare the data
            pairs = items.split('^');
            len = pairs.length;

            for (; i < len; i += 2) {
                data.push({
                    abbr: pairs[i + 1],
                    name: pairs[i]
                });
            }
            // Feed store with the data
            store.setData(data);
        }
    }
});