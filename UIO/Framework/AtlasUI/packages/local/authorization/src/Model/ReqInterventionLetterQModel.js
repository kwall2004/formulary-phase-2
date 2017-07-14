/**
 * Created by s6685 on 11/8/2016.
 */

Ext.define('Atlas.authorization.model.ReqInterventionLetterQModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'NoteDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'ApprovedDateTime',
            type: 'string',
            dateFormat: 'Y/m/d H:i:s'
        }

    ],
    proxy: {
        url: 'claims/{0}/reqinterventionletterq',
        extraParams: {
            pagination: true
        }
    }
});



