/**
 * Created by rsalekin on 11/21/2016.
 */
Ext.define('Atlas.pharmacy.model.ApprovedMacList', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'MACListID'},
        {name: 'MACListName'}
    ],
    proxy: {
        extraParams: {
        },
        url: 'formulary/{0}/maclists',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                var uniquearray = [{'MACListID': '0', 'MACListName': ' ', Stat: 'APPROVED'}];
                payload.data.forEach(function (item, index) {
                    var exists = false;
                    uniquearray.forEach(function (uniqueitem, uniqueindex) {
                        if (uniqueitem.MACListName == item.MACListName) {
                            exists = true;
                        }
                    });
                    if (!exists) {
                        uniquearray.push(item);
                    }
                });

                return uniquearray.filter(function(el) {
                    return el.Stat.toUpperCase() === 'APPROVED';
                });
            }
        }
    }
});
