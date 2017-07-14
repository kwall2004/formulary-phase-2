Ext.define('Atlas.common.model.democustomer.Customer',{
    extend: 'Atlas.common.model.Base',
    idProperty: 'systemID',
    idParam: 'systemID',
    fields: [
        {name: 'ContactInfo',  type: 'string'},
        {name: 'ContactType',  type: 'string'},
        {name: 'ParentSystemID',  type: 'number'},
        {name: 'SMSTextActive',  type: 'string'},
        {name: 'contactPrefOrder',  type: 'number'},
        {name: 'systemID',  type: 'number'},
        {name: 'href',  type: 'string'}

    ],
    proxy: {
        url: 'member/services/{0}/generateorderdocs',
        //TODO: should be set in controller
        extraParams: {
            ipiRecipientId: 327930,
            ipiPlanGroupID: 580,
            ipcLetterType: '1'
        }

    }
});