Ext.define('Atlas.atlasformulary.view.umprograms.StepTherapyHeaderController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.steptherapyheadercontroller',
  requires: ['Ext.window.Toast'],

  // listen: {
  //   controller: {
  //     '*': {
  //       formularyCreateEditOpened: 'onFormularyCreateEditOpened',
  //       formularyViewOpened: 'onFormularyViewOpened'
  //     }
  //   }
  // },

  loadingMsg: 'Loading...',
  workingMsg: 'Processing...',

  // onFormularyCreateEditOpened: function () {
  //   if (this.getViewModel().get('mode') !== 'view') {
  //     this.getView().destroy();
  //   }
  // },

  // onFormularyViewOpened: function () {
  //   if (this.getViewModel().get('mode') === 'view') {
  //     this.getView().destroy();
  //   }
  // },

  init: function () {
    //var vm = this.getViewModel();
  },  

  onClearClick: function () {
    var vm = this.getViewModel(),
      programSK = vm.get('programSK');

    if (programSK) {
      vm.set('stHeader',
        Atlas.atlasformulary.model.StepTherapyHeader.load(programSK));
    } else {
      vm.set('stHeader',
        Ext.create('Atlas.atlasformulary.model.StepTherapyHeader'));
    }
  },

  onCancelClick: function () {
    this.getViewModel().set('savePressed', false);
    this.getView().destroy();
  },

  onSaveClick: function (btn) {
    this.getViewModel().set('savePressed', true);
    this.onNextClick(btn);
  },

  onNextClick: function (button) {
    var vm = this.getViewModel(),
      form = this.getView().down('#steptherapyheader-form'),
      mode = vm.get('mode'),
      header = vm.get('stHeader'),
      sk = vm.get('programSK');

    switch (mode) {
      case 'view':
        this.navigateToConfig(sk, mode);
        break;
      case 'create':
      case 'edit':
        if (form.isValid() === false) {
          var invalidFields = Ext.Array.map(form.query('field{isValid()===false}'), function (item) {
            return '<li>' + item.fieldLabel + '</li>';
          });
          Ext.Msg.alert({
            title: 'Required Field(s) Missing',
            iconCls: 'x-fa fa-warning',
            message: 'Please complete all of the following required information as indicated by the asterisk (*)' + invalidFields.join(''),
            buttons: Ext.MessageBox.OK
          });
        } else if (header.dirty) {
          vm.set('headerDirty', true);
          
          this.getView().mask(this.loadingMsg);
          header.save({
            scope: this,
            success: this.onSaveSuccess,
            failure: function () {
              this.getView().unmask();
            }
          });
        } else {
          this.navigateToConfig(sk, mode);
        }
        break;
      default:
        Ext.raise({
          msg: 'Invalid mode.',
          mode: mode
        });
    }
  },

  onSaveSuccess: function (record, operation) {
    var vm = this.getViewModel(),
      mode = vm.get('mode');

    var response = Ext.decode(operation._response.responseText);
    var sk = parseInt(response);

    vm.set('programSK', sk);
    vm.get('stHeader').CvrgPrptyPgmSK = sk;
    this.getView().unmask();
    this.navigateToConfig(sk, mode);
  },

  navigateToConfig: function (sk, mode) {
    var vm = this.getViewModel(),
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/umprograms.ManageUMProgram');

    if (vm.get('savePressed')) {
      if (vm.get('headerDirty') === true) {
        Ext.Msg.show({
          title: 'Save Success',
          message: 'Step Therapy Header saved successfully.',
          buttons: Ext.Msg.OK,
          icon: Ext.Msg.INFO
        });
      } else {
        Ext.Msg.show({
          title: 'Step Therapy Not Saved',
          message: 'Nothing to save.',
          buttons: Ext.Msg.OK,
          icon: Ext.Msg.WARNING
        });
      }
      vm.set('savePressed', false);
      vm.set('headerDirty', false);
    } else {
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'umprograms_StepTherapyConfig', {
        menuId: menuId,
        PId: menuId,
        programSK: sk,
        StepCnt: vm.get('stHeader').get('StepCnt'),
        mode: mode,
        drugRefDbName: vm.get('stHeader').get('DrugRefDbName'),
        atlasId: 'formulary-config-' + (Math.floor(Math.random() * 1001) + 1)
      });

      vm.set('savePressed', false);
      vm.set('headerDirty', false);
      //this.getView().destroy();
    }
  }
});
