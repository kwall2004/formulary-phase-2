/**
 * Created by s6685 on 11/18/2016.
 */
Ext.define('Atlas.authorization.model.PriorAuthInMyQueueModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'NoteDate', type: 'date', dateFormat: 'Y-m-d'},
        {
            name: 'EffectiveDateTime',
            type: 'string',
            convert: function(v) {
                return Atlas.common.utility.Utilities.formatDate(v, 'm/d/Y');
            }
        },
        {
            name: 'TermDateTime',
            type: 'string',
            convert: function(v) {
                return Atlas.common.utility.Utilities.formatDate(v, 'm/d/Y');
            }
        },
        {
            name: 'dueDate',
            type:'date',
            dateFormat: 'c'
        }
    ],
    proxy: {
        url: 'claims/{0}/priorauthinMyqueue',
        extraParams: {
            pMyQueues: '',
            pWaitingHours: '',
            ipcUrgencyTypeList: '',
            pCoC: '',
            pIRE:'',
            pDeterminationType: '',
            pcWhere: '',
            pcSort: '',
            pPageNum: '',
            pBatchSize: '',

            pagination: true
        }
    }
});
