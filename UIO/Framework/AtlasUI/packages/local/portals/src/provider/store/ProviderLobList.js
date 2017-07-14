Ext.define('Atlas.portals.provider.store.ProviderLobList', {
    extend: 'Ext.data.Store',

    alias: 'store.provider-providerloblist',
    model: 'Atlas.portals.provider.model.ProviderLobList',

    // adding a custom property to indicate if 'All' should be included as an option
    includeAll: true,

    listeners: {
        load: function (store) {
            var metadata = store.getProxy().getReader().metaData,
                lobs = metadata.pLOBList,
                data = [],
                i = 0,
                pairs, len;

            // Prepare the data
            pairs = lobs.split(',');
            pairs.sort();
            len = pairs.length;

            if (store.includeAll) {
                data.push({
                    name: 'All',
                    value: 'ALL'
                });
            }

            for (; i < len; i+=2) {
                if (!store.includeAll && pairs[i] === 'All') {
                    // exclude 'All' from the list
                }
                else {
                    data.push({
                        name: pairs[i],
                        value: pairs[i+1]
                    });
                }
            }
            // Feed store with the data
            store.setData(data);
        }
    }
});
