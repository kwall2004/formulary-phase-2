/**
 * Created by s6685 on 11/8/2016.
 */
Ext.define('Atlas.authorization.model.ReqApprovalLetterQModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'NoteDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'appealDueDate',
            type: 'date',
            format: 'Y-m-d'
        }, {
            name: 'ApprovedDateTime',
            type: 'string',
          // dateFormat: 'Y-m-d'
           dateFormat: 'Y/m/d H:i:s'
        }, {
            name: 'deniedDate',
            type: 'date',
            format: 'Y-m-d'
        }

    ],
    proxy: {
        url: 'claims/{0}/reqapprovalletterq',
        timeout:60000,
        extraParams: {
            medicareCallQueue: '',
             pagination: true
        }

    }
});

