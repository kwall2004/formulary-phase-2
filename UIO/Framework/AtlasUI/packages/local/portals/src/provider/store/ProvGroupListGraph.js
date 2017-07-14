Ext.define('Atlas.portals.provider.store.ProvGroupListGraph', {
    extend: 'Ext.data.Store',

    alias: 'store.provider-provgrouplistgraph',
    model: 'Atlas.portals.provider.model.ProvGroupListGraph',

    listeners: {
        load: function (store) {
            var metadata = store.getProxy().getReader().metaData,
                lobs = metadata.pListItems,
                data = [],
                i = 0,
                pairs, len;

            // Prepare the data
            pairs = lobs.split('^');
            len = pairs.length;

            for (; i < len; i+=2) {
                data.push({
                    name: pairs[i],
                    value: pairs[i+1]
                });
            }
            // Feed store with the data
            store.setData(data);
        }
    }
});
