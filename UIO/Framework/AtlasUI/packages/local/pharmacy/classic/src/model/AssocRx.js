Ext.define('Atlas.pharmacy.model.AssocRx', {
    extend: 'Atlas.common.model.Base',
    fields: ['ncpdp', 'npi', 'pharmName']
  /*,
  proxy: {
      url: '/drugsearch',
      jsonSubmit: true,
      paramsAsJson: true,
      actionMethods: {
          create: 'POST',
          read: 'POST',
          update: 'POST',
          destroy: 'POST'
      },
      extraParams: {
          formularyId: 1,
          orderBy: '',
          userId: 'testuser',
          payload: [],
          criteriaChange: true
      },
      enablePaging: true,
      startParam: 'startIndex',
      limitParam: 'count',
      pageSize: 25
  }*/
});
