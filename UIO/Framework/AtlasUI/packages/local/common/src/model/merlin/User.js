Ext.define('Atlas.common.model.merlin.User',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    // idProperty: 'username',
    fields: [
        {name: 'username',  type: 'string'},
        {name: 'lastname',  type: 'string'},
        {name: 'firstname',  type: 'string'},
        {name: 'middlename',  type: 'string'},
        {name: 'lastname',  type: 'string'},
        {name: 'homephone',  type: 'string', mapping: 'homephone.ContactInfo'},
        {name: 'workphone',  type: 'string', mapping: 'workphone.ContactInfo'},
        {name: 'cell',  type: 'string', mapping: 'cell.ContactInfo'},
        {name: 'fax',  type: 'string', mapping: 'fax.ContactInfo'},
        {name: 'Ext',  type: 'string', mapping: 'Ext.ContactInfo'},
        {name: 'email',  type: 'string', mapping: 'email.ContactInfo'},
        {name: 'groupid',  type: 'integer'},
        {name: 'queueAdmin',
            type: 'boolean',
            convert: function (value, record) {
                return value === 'yes' ? true : false;
            }
        },
        {name: 'active',
            type: 'boolean',
            convert: function (value, record) {
                return value === 'yes' ? true : false;
            }
        },
        {name: 'acctLocked',
            type: 'boolean',
            convert: function (value, record) {
                return value === 'yes' ? true : false;
            }
        }

    ],
    proxy: {
        unifyOperations: true,
        // createUrl: 'system/rx/usermasterdata',
        // updateUrl: 'system/rx/usermasterdata',
        // destroyUrl: 'system/rx/usermasterdata',
        url: 'system/rx/usermasterdata',
        extraParams: {
            pFieldList: 'username,firstname,lastname,middlename,groupid,active,queueAdmin,createDateTime,email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo,acctLocked',
            pagination: true
        }
    }
});