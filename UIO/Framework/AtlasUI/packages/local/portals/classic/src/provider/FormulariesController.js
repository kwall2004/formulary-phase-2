// k3279 - Kevin Tabasan - 11/28/2016

Ext.define('Atlas.portals.view.provider.FormulariesController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsproviderformularies',

  init: function () {
    var state = Atlas.user.providerStateSelected,
      michiganFormularies = this.lookup('miFormularies'),
      illinoisFormularies = this.lookup('ilFormularies');

    if ('MI' === state) {
      michiganFormularies.setHidden(false);
      illinoisFormularies.setHidden(true);
    } else if ('IL' === state) {
      michiganFormularies.setHidden(true);
      illinoisFormularies.setHidden(false);
    }
  }
});