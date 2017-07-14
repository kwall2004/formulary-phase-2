/**
 * Created by l6630 on 11/16/2016.
 */

Ext.define('Atlas.pharmacy.model.CredentialToDo', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'taskDesc', type: 'string'},
        {name: 'systemId', type: 'number'},
        {name: 'CredTypeDisable', type: 'string'},
        {name: 'credLogId', type: 'number'},
        {name: 'userName', type: 'string'},
        {name: 'taskId', type: 'string'},
        {name: 'toDoId', type: 'number'},
        {name: 'completeDate',  type: 'string'}
       // {name: 'completeDate', type: 'date', dateFormat: 'Y-m-d\TH:i:s'}
    ],
    proxy: {
        extraParams: {
          //  'pSessionID': 'e8df03f0-4586-4e9d-1b14-d11020876e6b',
         //   'pSessionId': 'e8df03f0-4586-4e9d-1b14-d11020876e6b',
         //   'pCredLogId': '11101'
        },
        url: 'pharmacy/rx/pharmcredtodo'
    }
});

