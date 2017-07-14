
/**
 * Created by s4505 on 10/13/2016.
 */

Ext.define('Atlas.admin.model.Signatures', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminsignatures',

    fields: [

        { name: 'signatureId',     type: 'string',defaultValue:'' },
        { name: 'signatureGroup',      type: 'string',defaultValue:'' },
        { name: 'personTitle',   type: 'string',defaultValue:''},
        { name: 'firstName',     type: 'string',defaultValue:'' },
        { name: 'lastName',      type: 'string',defaultValue:'' },
        { name: 'suffix',   type: 'string',defaultValue:''},
        { name: 'credentials',      type: 'string',defaultValue:'' },
        { name: 'postScriptFileName',   type: 'string',defaultValue:''}
    ],
    proxy: {
        url: 'shared/rx/lettersignatures',
        timeout: 120000
    }

});