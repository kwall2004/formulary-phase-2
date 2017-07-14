/**
 * Created by c4539 on 11/30/2016.
 */
Ext.define('Atlas.portals.provider.model.GroupLocMaster', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'zip', type: 'string' },
        { name: 'enrollmentBrokerID', type: 'string' },
        { name: 'address2', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'address1', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'locationID', type: 'string' },
        { name: 'dbRowID', type: 'string' },
        { name: 'siteLocation', type: 'string' },
        { name: 'rowNUm', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'provID', type: 'string' },
        { name: 'lobID', type: 'string' },
        { name: 'displayName', type: 'string', calculate: function(obj) {
            var displayName = '';

            if (obj.locationID === '0') { return 'All Locations'; }
            displayName += 'LOB - ' + obj.lobID + ' : ' + obj.address1 + ', ';
            displayName += obj.address2 ? obj.address2 + ', ' : '';
            displayName += obj.city + ', ' + obj.state + ' - ' + obj.zip;
            return displayName;
        }}
    ],

    proxy: {
        url: 'provider/hp/grouplocmaster'
    }
});