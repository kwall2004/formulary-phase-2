
/**
 * Created by s6685 on 11/7/2016.
 */

Ext.define('Atlas.authorization.model.DenialAppealQModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'NoteDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'deniedDate',
            type: 'date',
            dateFormat: 'c'
        }
    ],
    proxy: {
        url: 'claims/{0}/denialappealq',
        extraParams: {
            pagination: true
        }
    }
});
