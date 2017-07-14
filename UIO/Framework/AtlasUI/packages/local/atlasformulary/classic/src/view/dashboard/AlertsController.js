Ext.define('Atlas.atlasformulary.view.dashboard.AlertsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.alerts',

  onRowDoubleClick: function () {
    var grid = this.lookupReference('alertsGrid'),
      selected = grid.getSelection(),
      alertSK = selected[0].get('AlertSK'),
      actionString = selected[0].get('ActnVal');

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      useDefaultXhrHeader: false,
      paramsAsJson: true,
      noCache: false,
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/dashboardalert?alertsk=' + alertSK,
      method: 'PUT',
      headers: {
        sessionid: Atlas.sessionId,
        username: Atlas.user.un
      }
    });

    grid.getStore().reload();
    this.routeToAction(actionString);
  },

  onClearFilters: function () {
    // The "filters" property is added to the grid (this) by gridfilters
    this.getReferences().alertsGrid.filters.clearFilters();
  },

  routeToAction: function (actionString) {
    var splitAction = actionString.split('?'),
      action = splitAction[0],
      params = splitAction[1],
      routeSK = params.split('=')[1].trim(),
      menuId = null;

    switch (action) {
      case 'DrugListUpdates':
        menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/druglists.DrugLists');
        this.fireEvent('openView', 'merlin', 'atlasformulary', 'druglistconfig_DrugListConfig', {
          menuId: menuId,
          PId: menuId,
          drugListSK: routeSK,
          mode: 'edit',
          titleMode: 'Editing'
        });
        break;
      case 'NewDrugsToMarket':
        menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/newdrugstomarket.NewDrugsToMarket');
        this.fireEvent('openView', 'merlin', 'atlasformulary', 'newdrugstomarket_NewDrugsToMarket', {
          menuId: menuId,
          PId: menuId
        });
        break;
      default:
        throw new Error('Invalid action (' + action + ')');
    }
  }
});
