Ext.define('Atlas.atlasformulary.model.JobQueue', {
  extend: 'Ext.data.Model',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'JobNbr' },
    { name: 'JobDesc' },
    { name: 'StatDesc' },
    {
      name: 'JobStartTs',
      type: 'date'
    },
    {
      name: 'JobEndTs',
      type: 'date'
    },
    { name: 'JobTypeCode' },
    { name: 'UserId' },
    { name: 'Rslt' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    type: 'formulary',
    url: '/jobqueue',

    api: {
      destroy: '/jobqueue?jobqueueid='
    },
    pageParam: '',
    limitParam: '',
    startParam: ''
  }
});