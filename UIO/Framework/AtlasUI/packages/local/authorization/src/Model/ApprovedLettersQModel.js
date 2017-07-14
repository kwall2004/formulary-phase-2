/**
 * Created by s6685 on 11/8/2016.
 */
Ext.define('Atlas.authorization.model.ApprovedLettersQModel',{
    extend: 'Atlas.common.model.Base',
    fields: [

        {
            name: 'NoteDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'createDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'approvedDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
    ],
    proxy: {
        url: 'claims/{0}/approvedlettersq',
        extraParams: {
            ipcLOB: '',
            pagination: true
        }

    }
});
