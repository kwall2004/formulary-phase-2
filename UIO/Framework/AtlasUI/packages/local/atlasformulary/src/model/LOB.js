Ext.define('Atlas.atlasformulary.model.LOB', {
  extend: 'Atlas.atlasformulary.model.Base',

  fields: [
    'LOBSK',
    'LOBName'
  ],

  proxy: {
    url: 'lob'
  }
});