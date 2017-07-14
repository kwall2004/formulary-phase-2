Ext.define('Atlas.portals.hpmember.store.Languages', {
    extend: 'Ext.data.Store',

    alias: 'store.hpmember-languages',
    model: 'Atlas.portals.hpmember.model.Language',
    sorters: 'name',

    listeners: {
        load: function (store) {
            var metadata = store.getProxy().getReader().metaData,
                counties = metadata.pLangList,
                data = [],
                i = 0,
                pairs, len, tmp;

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
