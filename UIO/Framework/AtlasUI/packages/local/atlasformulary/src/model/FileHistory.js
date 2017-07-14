Ext.define('Atlas.atlasformulary.model.FileHistory', {
  extend: 'Ext.data.Model',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'FileType' },
    {
      name: 'StartTime',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    {
      name: 'EndTime',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    { name: 'RunStatus' },
    { name: 'RecordCount' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    type: 'formulary',
    url: '/DrugSourceFileHistory',
    reader: {
      rootProperty: 'Rows',
      totalProperty: 'Count'
    },
    api: {
      destroy: '/drugsourcefilehistory?drugsourcefilehistoryId='
    },
    pageParam: '',
    limitParam: '',
    startParam: ''
  }
});
