/**
 * Created by s6685 on 11/10/2016.
 */
Ext.define('Atlas.authorization.model.MadicarePendingLettersQModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'NoteDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'CreatedDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
    ],
    proxy: {
        url: 'claims/{0}/pendinglettersq',
        extraParams: {
            ipcLOB: '',
            pagination: true
        }
    }
});
