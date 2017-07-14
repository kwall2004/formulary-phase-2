Ext.define('Atlas.atlasformulary.view.newdrugstomarket.AssocFormulariesPopUpController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.assocformulariespopup',

  init: function () {
    var vm = this.getViewModel(),
      associatedFormulariesStore = vm.getStore('associatedformularies');

    associatedFormulariesStore.getProxy().setExtraParam('ndc', vm.getData().NDCPassed);
    associatedFormulariesStore.load();
  }
});
