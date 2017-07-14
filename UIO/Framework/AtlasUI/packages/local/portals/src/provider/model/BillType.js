/**
 * Created by b6636 on 11/29/2016.
 */
Ext.define('Atlas.portals.provider.model.BillType', {
    extend: 'Atlas.common.model.Base',

    // fields: [
    //     { name: 'BillType', type: 'objectArray', delimiter: '^' }
    //     ],

    proxy: {
        url: 'portal/hp/listitems',
        extraParams: {
            pListName: 'TypeOfBill'
        }
    }
});