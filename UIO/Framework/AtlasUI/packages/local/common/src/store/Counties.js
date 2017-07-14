Ext.define('Atlas.common.store.Counties', {
    extend: 'Ext.data.Store',

    alias: 'store.common-counties',
    model: 'Atlas.common.model.County'
//Obsolete - Fixed on Layer 7 level (Nov 1, 2016 by Cory) Thanks!
    // listeners: {
    //     load: function (store) {
    //         var metadata = store.getExtraData(),
    //             counties = metadata.pCounty,
    //             data = [],
    //             i = 0,
    //             pairs, len, tmp;
    //
    //         // Prepare the data
    //         pairs = counties.split('|');
    //         len = pairs.length;
    //
    //         for (; i < len; i++) {
    //             tmp = pairs[i].split('^');
    //             data.push({
    //                 name: tmp[0],
    //                 id: tmp[1]
    //             });
    //         }
    //         // Feed store with the data
    //         store.setData(data);
    //     }
    // }
});
