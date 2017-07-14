/**
 * Created by s6685 on 11/8/2016.
 */

Ext.define('Atlas.authorization.model.AppealDecisionQModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'NoteDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'appealStartDate',
            // type: 'date',
            // format: 'Y-m-d'
            type: 'string'//,
           // dateFormat: 'Y/m/d H:i:s'
        },
        {
            name: 'appealDueDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }

    ],
    proxy: {
        url: 'claims/{0}/appealdecisionq',
        extraParams: {
            pagination: true,
            extraParams: {
                pagination: true
            }
        }

    }
});
