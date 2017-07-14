/**
 * Created by d4662 on 11/15/2016.
 */
Ext.define('Atlas.admin.model.ContactCodesComplete', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.admincontactcodescomplete',

    fields: [

        { name: 'Category',     type: 'string' },
        { name: 'ReasonCode',      type: 'string' },
        { name: 'ShortDescription',   type: 'string'},
        { name: 'DESCRIPTION',     type: 'string' },
        { name: 'GroupPermissions',      type: 'string' },
        { name: 'ACTIVE',   type: 'boolean'},
        { name: 'rowNum',   type: 'integer'}

    ],
    proxy: {

        url: 'shared/rx/contactcode',
        extraParams: {
            pagination: false
        }

    }
});