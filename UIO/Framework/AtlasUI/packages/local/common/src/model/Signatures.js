/**
 * Created by d4662 on 11/19/2016.
 */
Ext.define('Atlas.common.model.Signatures', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'signatureId',     type: 'string' },
        { name: 'signatureGroup',      type: 'string' },
        { name: 'firstName',   type: 'string'},
        { name: 'systemID',   type: 'float',defaultValue:'0'},
        { name: 'lastName',   type: 'string'},
        { name: 'DisplayLabel',     type: 'string' },
        { name: 'personTitle',      type: 'string' },
        { name: 'suffix',   type: 'string'},
        { name: 'credentials',   type: 'string'},
        { name: 'postscriptFilename',   type: 'string'},
        { name: 'isNeedUpdate',   type: 'boolean', defaultValue:false}

    ],
    proxy: {
        url: 'shared/rx/lettersignatures',
        extraParams: {
            pagination: true
        }
    }
});