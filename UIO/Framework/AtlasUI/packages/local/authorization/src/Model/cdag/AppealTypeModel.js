/**
 * Created by agupta on 11/11/2016.
 */

Ext.define('Atlas.authorization.model.cdag.AppealTypeModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'systemID', type: 'number'},
        {name: 'ListItem', type: 'string'},
        {name: 'ListDescription', type: 'string'},
        {name: 'Active', type: 'bool'},
        {name: 'charString', type: 'number'},
        {name: 'Mode', type: 'string'},
        {name: 'planGroupAccess', type: 'string'}
    ],
    proxy: {
        extraParams: {
            ipiPlangroupId: '',
            iplChkAccessToUser: '',
            pListName : ''
        },
        url: 'system/{0}/listdetailforplan'
    }
});