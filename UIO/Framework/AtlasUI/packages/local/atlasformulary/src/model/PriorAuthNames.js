Ext.define('Atlas.atlasformulary.model.PriorAuthNames', {
  extend: 'Atlas.common.model.Base',
  fields: [ 'ListItem', 'ListDescription', 'Active', 'charString', 'systemID', 'dbRowID', 'RowNum' ],
  proxy: {
    url: 'portal/{0}/listdetail',
    extraParams: {
      plistname: 'MedicarePANames'
    },
    reader: {}
  }
});
