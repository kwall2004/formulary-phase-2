/**
 * Created by mkorivi on 11/14/2016.
 */
Ext.define('Atlas.casemanagement.model.ListMasterAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'listName',type: 'string'},
        {name: 'listItem',type: 'string'},
        {name: 'listDescription',type: 'string'},
        {name: 'systemId',type: 'string'},
        {name: 'xActive',type: 'string'},
        {name: 'XcharString',type: 'string'}
    ],
    proxy: {

        url: 'vendor/hp/listmasterapi'
    }
});