Ext.define('Atlas.portals.hpmember.store.Affiliations', {
    extend: 'Ext.data.Store',

    alias: 'store.hpmember-affiliations',
    model: 'Atlas.portals.hpmember.model.Affiliation',

    listeners: {
        load: function (store) {
            var metadata = store.getProxy().getReader().metaData,
                affiliations = metadata.pListItems,
                data = [],
                i = 1,  // this list is caret deliminted, but the first item is blank
                pairs, len;

            // Prepare the data
            pairs = affiliations.split('^');
            len = pairs.length;

            for (; i < len; i+=2) {
                data.push({
                    name: pairs[i]
                });
            }
            // Feed store with the data
            store.setData(data);
        }
    }
});
