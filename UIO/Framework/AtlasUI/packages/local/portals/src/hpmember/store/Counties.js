Ext.define('Atlas.portals.hpmember.store.Counties', {
    extend: 'Ext.data.Store',

    alias: 'store.hpmember-counties',
    model: 'Atlas.portals.hpmember.model.County',

    listeners: {
        load: function (store) {
            var metadata = store.getProxy().getReader().metaData,
                counties = metadata.pCountyList,
                data = [],
                i = 0,
                pairs, len;

            // Prepare the data
            pairs = counties.split('^');
            len = pairs.length;

            for (; i < len; i+=2) {
                data.push({
                    name: pairs[i],
                    id: pairs[i+1]
                });
            }
            // Feed store with the data
            store.setData(data);
        }
    }
});
