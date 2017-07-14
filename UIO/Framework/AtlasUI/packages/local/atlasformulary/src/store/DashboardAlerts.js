Ext.define('Atlas.atlasformulary.store.DashboardAlerts', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.dashboardalerts',
  model: 'Atlas.atlasformulary.model.DashboardAlert',

  proxy: {
    url: '/dashboardalert',

    extraParams: {
      isactionable: false
    }
  }
});