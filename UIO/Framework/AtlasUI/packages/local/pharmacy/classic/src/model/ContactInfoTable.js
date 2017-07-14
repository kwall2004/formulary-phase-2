/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.ContactInfoTable', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'zip', type: 'number'},
        {name: 'firstName', type: 'string'},
        {name: 'lastName', type: 'string'},
        {name: 'contactTitle', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'contactType', type: 'number'},
        {name: 'state', type: 'string'},
        {name: 'fax', type: 'string'},
        {name: 'email', type: 'string'}
    ],
    proxy: {
        extraParams: {
         //   "ipcParentKey":"207",
         //   "ipcParent":"RID"
        },
        url: 'pharmacy/{0}/contactinfotable'
    }
});