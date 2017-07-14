Ext.define('Atlas.atlasformulary.store.UserGroups', {
  extend: 'Ext.data.Store',
  alias: 'store.usergroups',
  proxy: {
    type: 'formulary',
    reader: {
    	rootProperty: ''
  	},
    url: '/UserGroup'    
  }
});
