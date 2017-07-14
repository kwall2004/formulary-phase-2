Ext.define('Atlas.atlasformulary.view.dashboard.ActionableEventsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.actionableevents',

  onActionableItemClick: function (ActionableEvents, record) {
    var data = record.data;

    this.routeToAction(data.ActnVal);
  },

  onClearFilters: function () {
    // The "filters" property is added to the grid (this) by gridfilters
    this.getReferences().actionableevntsgrid.filters.clearFilters();
  },

  routeToAction: function (actionString) {
    var splitAction = actionString.split('?'),
      action = splitAction[0],
      frmlrySK = null,
      menuId = null;

    if (action !== 'NewDrugsToMarket') {
      frmlrySK = splitAction[1].split('=')[1];
    }

    switch (action) {
      case 'FormularyApprovalRequired':
        menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');
        this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_Read', {
          menuId: menuId,
          PId: menuId,
          formularySK: frmlrySK,
          mode: 'review',
          titleMode: 'Reviewing'
        });
        break;
      case 'FormularyRejection':
        menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');
        this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_CreateEdit', {
          menuId: menuId,
          PId: menuId,
          formularySK: frmlrySK,
          mode: 'edit',
          titleMode: 'Editing'
        });
        break;
      case 'UntieredDrugs':
        menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');
        this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_CreateEdit', {
          menuId: menuId,
          PId: menuId,
          formularySK: frmlrySK,
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
