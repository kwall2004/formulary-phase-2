Ext.define('Atlas.atlasformulary.model.JobQueueUser', {
  extend: 'Ext.data.Model',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'userId' }
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

