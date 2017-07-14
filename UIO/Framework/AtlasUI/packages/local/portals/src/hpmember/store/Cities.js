Ext.define('Atlas.portals.hpmember.store.Cities', {
    extend: 'Ext.data.Store',

    alias: 'store.hpmember-cities',
    model: 'Atlas.portals.hpmember.model.City',

    listeners: {
        load: function (store) {
            var metadata = store.getProxy().getReader().metaData,
                cities = metadata.pCityList,
                data = [],
                i = 0,
                pairs, len;

            // Prepare the data
            pairs = cities.split('^');
            len = pairs.length;

            for (; i < len; i++) {
                data.push({
                    name: pairs[i]
                });
            }
            // Feed store with the data
            store.setData(data);
        }
    }
});
