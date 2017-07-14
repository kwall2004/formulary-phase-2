/**
 * Created by agupta on 10/6/2016.
 */
Ext.define('Atlas.common.model.shared.NCPDPErrorCodeModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'Id',type: 'string'},
        {name: 'Name',type: 'string'}
    ],
    proxy: {
        url: 'claims/{0}/ncpdperrcodes'
    }
});