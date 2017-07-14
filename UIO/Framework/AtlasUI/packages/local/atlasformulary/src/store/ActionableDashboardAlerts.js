Ext.define('Atlas.atlasformulary.store.ActionableDashboardAlerts', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.actionabledashboardalerts',
  model: 'Atlas.atlasformulary.model.DashboardAlert',

  proxy: {
    url: '/dashboardalert',

    extraParams: {
      isactionable: true
    }
  }
});