/**
 * Created by c4539 on 11/29/2016.
 */
Ext.define('Atlas.portals.provider.model.HospitalUtilizationWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'admitDateas' , type: 'date', dateFormat: 'Y-m-d'},
        { name: 'dischargeDateas' , type: 'date', dateFormat: 'Y-m-d'}
    ],

    proxy: {
        url: 'provider/hp/hospitalutilizationweb'
    }
});