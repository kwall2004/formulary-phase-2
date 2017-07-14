Ext.define('Atlas.portals.hpmember.store.MemberLob', {
    extend: 'Ext.data.Store',

    alias: 'store.hpmember-memberlob',
    model: 'Atlas.portals.hpmember.model.MemberLob',

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

            for (; i < len; i++) {
                if (!store.includeAll && pairs[i] === 'All') {
                    // exclude 'All' from the list
                }
                else {
                    data.push({
                        name: pairs[i]
                    });
                }
            }
            // Feed store with the data
            store.setData(data);
        }
    }
});
