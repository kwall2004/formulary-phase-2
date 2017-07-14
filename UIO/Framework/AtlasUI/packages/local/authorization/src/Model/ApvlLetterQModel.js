/**
 * Created by s6685 on 11/7/2016.
 */
Ext.define('Atlas.authorization.model.ApvlLetterQModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'NoteDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
        ,
        {
            name: 'approvedDate',
            type: 'date',
            format: 'Y-m-d'
        //    dateFormat: 'Y-m-d H:i:s'
         }
    ],
    proxy: {
        url: 'claims/{0}/apvlletterq',
        extraParams: {
            pagination: true
        }
    }
});




