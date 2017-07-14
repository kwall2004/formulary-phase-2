Ext.define('Atlas.atlasformulary.view.formularyheader.FormularyHeaderBase', {
  extend: 'Ext.form.Panel',
  controller: 'formularyheadercontroller',
  viewModel: 'formularyheader',

  listeners: {
    afterlayout: function (view) {
      if (this.getViewModel().get('pendingCalls').length > 0) {
        view.mask('Loading...');
      }
    }
  },

  initComponent: function () {
    var vm = this.getViewModel(),
      pendingCalls = vm.get('pendingCalls');

    vm.set('mode', this.mode);
    vm.set('titleMode', this.titleMode);

    if (this.formularySK) {
      if (this.mode === 'review') {
        var url = Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularyreview?formularysk=' + this.formularySK;

        Atlas.atlasformulary.data.proxy.FormularyAjax.request({
          url: url,
          method: 'POST',

          headers: {
            sessionid: Atlas.sessionId,
            username: Atlas.user.un
          }
        });
      }

      var sk = parseInt(this.formularySK);
      vm.set('formularySK', sk);

      pendingCalls.push('header');
      vm.set('formularyHeader', Atlas.atlasformulary.model.FormularyHeader.load(sk, {
        scope: this,
        success: function (record) {
          var drugTypeFunctionStore = vm.getStore('drugtypefn');

          drugTypeFunctionStore.getProxy().setExtraParams({
            drugrefdbsk: record.get('DrugRefDbSK')
          });
          pendingCalls.push(drugTypeFunctionStore.type);
          drugTypeFunctionStore.load({
            scope: this,
            callback: function () {
              pendingCalls.splice(pendingCalls.indexOf(drugTypeFunctionStore.type), 1);
              if (pendingCalls.length === 0) {
                this.unmask();
              }
            }
          });
        },
        callback: function () {
          pendingCalls.splice(pendingCalls.indexOf('header'), 1);
          if (pendingCalls.length === 0) {
            this.unmask();
          }
        }
      }));

      var tierStore = vm.getStore('tiers');
      tierStore.getProxy().setExtraParams({
        frmlrysk: sk
      });
      tierStore.reload();

      var drugListDataStore = vm.getStore('druglistdata');
      drugListDataStore.getProxy().setExtraParams({
        formularysk: sk
      });
      drugListDataStore.reload();
    } else {
      vm.set('formularyHeader', Ext.create('Atlas.atlasformulary.model.FormularyHeader', {
        DrugPostObsltAlwdDays: 365,
        AutomaticallyAssignNewNDCsInd: true
      }));
    }

    this.callParent();
  }
});
