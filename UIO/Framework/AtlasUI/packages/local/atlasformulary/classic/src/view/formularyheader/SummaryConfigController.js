Ext.define('Atlas.atlasformulary.view.formularyheader.SummaryConfigController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyheader-summaryconfigcontroller',
  requires: ['Ext.window.Toast'],

  onStoreBeforeLoad: function (store) {
    this.getViewModel().get('pendingCalls').push(store.type);
    this.lookup('sectionmultiselect').boundList.loadMask = false;
  },

  onStoreLoad: function (store) {
    var pendingCalls = this.getViewModel().get('pendingCalls');
    pendingCalls.splice(pendingCalls.indexOf(store.type), 1);
    if (pendingCalls.length === 0) {
      Ext.getBody().unmask();
    }
    if (store.type === 'summaryconfig') {
      store.insert(0, new Atlas.atlasformulary.model.SummaryConfig({
            SumRptCfgSK: -1,
            SumRptCfgName: 'New',
            SumRptCfgDesc: ''
          })
      );
    }
  },

  loadData: function() {
    var me = this,
        vm = me.getViewModel(),
        formularyHeader = me.getViewModel().get('formularyHeader'),
        currentSummaryReportConfigSK = formularyHeader.get('SumRptCfgSK');
    me.lookup('formularyNameDisplay').setValue(formularyHeader.get('FrmlryName'));
    me.lookup('formularyIDDisplay').setValue(formularyHeader.get('FrmlryID'));
    me.lookup('formularyVersionDisplay').setValue(formularyHeader.get('FrmlryVer'));
    me.lookup('formularyStatusDisplay').setValue(formularyHeader.get('StatDesc'));
    me.selectedSummaryConfig = currentSummaryReportConfigSK;
    if(currentSummaryReportConfigSK === null || currentSummaryReportConfigSK === undefined) {
      vm.set('hasconfig', false);
      me.lookup('summaryConfigNameDisplay').setValue('Choose a Config');
      me.lookup('summaryConfigCombo').setValue(-1);
      me.lookup('summaryConfigCombo').originalValue = -1;
      vm.set('initialized', true);
    } else {
      me.finishLoad();
    }
  },
  finishLoad: function(callback) {
    var me = this,
        vm = me.getViewModel(),
        multiStore = me.lookup('sectionmultiselect').boundList.getStore(),
        tierGrid = me.lookup('summaryConfigTierGrid'),
        tierGridStore = tierGrid.getStore(),
        formularyHeader = me.getViewModel().get('formularyHeader');

    multiStore.getProxy().setExtraParam('summaryReportConfigSK', me.selectedSummaryConfig);
    multiStore.load();
    me.lookup('sectioncombo').getStore().getProxy().setExtraParam('summaryReportConfigSK', me.selectedSummaryConfig);
    me.lookup('sectioncombo').getStore().load();
    tierGridStore.getProxy().setExtraParam('summaryReportConfigSK', me.selectedSummaryConfig);
    tierGridStore.getProxy().setExtraParam('formularySK', formularyHeader.get('FrmlrySK'));
    tierGridStore.load(function(records){
      for(var i=0;i<records.length;i++) {
        var record = records[i];
        if(record.get('Checked')) {
          tierGrid.getSelectionModel().select(i, true);
        }
      }
    });
    me.lookup('configCoveragePropertyGrid').getStore().getProxy().setExtraParam('summaryReportConfigSK', me.selectedSummaryConfig);
    me.lookup('configCoveragePropertyGrid').getStore().load();
    vm.getStore('summaryconfig').getProxy().setExtraParam('summaryReportConfigSK', me.selectedSummaryConfig);
    vm.getStore('summaryconfig').load(function(records) {
      var configRecord = records[0];
      me.lookup('summaryConfigForm').loadRecord(configRecord);
      var configName = '';
      if(configRecord.get('SumRptCfgName')) {
        configName = configRecord.get('SumRptCfgName');
      } else {
        configName = 'CUSTOM CONFIGURATION';
      }
      vm.set('hasconfig', true);
      if(configRecord.get('Status') == 'Active') {
        vm.set('activated', true);
        configName += ' - Active ( Read Only )';
      } else {
        vm.set('activated', false);
      }
      vm.set('initialized', true);
      me.lookup('summaryConfigNameDisplay').setValue(configName);
      me.lookup('sectionmultiselect').boundList.unmask();

      me.lookup('summaryConfigCombo').setValue(me.selectedSummaryConfig);
      me.lookup('summaryConfigCombo').originalValue = me.selectedSummaryConfig;
      if (typeof callback != 'undefined') {
        callback();
      }
      Ext.getBody().unmask();
    });

  },
  getSelections: function(list) {
    var store = list.getStore();
    return Ext.Array.sort(list.getSelectionModel().getSelection(), function(a, b) {
      a = store.indexOf(a);
      b = store.indexOf(b);
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    });
  },

  onUpBtnClick : function() {
    var list = this.lookup('sectionmultiselect').boundList,
        store = list.getStore(),
        selected = this.getSelections(list),
        rec,
        i = 0,
        len = selected.length,
        index = 0;
    store.suspendEvents();
    for (; i < len; ++i, index++) {
      rec = selected[i];
      index = Math.max(index, store.indexOf(rec) - 1);
      store.remove(rec, true);
      store.insert(index, rec);
    }
    store.resumeEvents();
    list.refresh();
    list.getSelectionModel().select(selected);
  },

  onDownBtnClick : function() {
    var list = this.lookup('sectionmultiselect').boundList,
        store = list.getStore(),
        selected = this.getSelections(list),
        rec,
        i = selected.length - 1,
        index = store.getCount() - 1;
    store.suspendEvents();
    for (; i > -1; --i, index--) {
      rec = selected[i];
      index = Math.min(index, store.indexOf(rec) + 1);
      store.remove(rec, true);
      store.insert(index, rec);
    }
    store.resumeEvents();
    list.refresh();
    list.getSelectionModel().select(selected);
  },

  onAddBtnClick : function() {
    var me = this,
        selection = me.lookup('sectioncombo').selection;
    me.moveRec(true, selection);
    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'POST',
      headers: {
        'sessionid': Atlas.sessionId,
        'username': Atlas.user.un
      },
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfigSectionSelection?summaryReportConfigSK=' + this.selectedSummaryConfig + '&summaryReportSectionSK=' + selection.get('SumRptSctnSK'),
      success: function (response) {
        me.lookup('sectionmultiselect').boundList.getStore().reload();
      }
    });
  },

  onRemoveBtnClick : function() {
    var me = this,
        selected = me.getSelections(me.lookup('sectionmultiselect').boundList);
    me.moveRec(false, selected);
    selected.forEach(function(item) {
      Atlas.atlasformulary.data.proxy.FormularyAjax.request({
        method: 'DELETE',
        headers: {
          'sessionid': Atlas.sessionId,
          'username': Atlas.user.un
        },
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfigSectionSelection?summaryReportConfigSK=' + me.selectedSummaryConfig + '&summaryReportSectionSK=' + item.get('SumRptSctnSK')
      });
    });
  },

  moveRec: function(add, recs) {
    var me = this,
        fromField = me.lookup('sectioncombo'),
        toField   = me.lookup('sectionmultiselect'),
        fromStore = add ? fromField.store : toField.store,
        toStore   = add ? toField.store   : fromField.store;
    fromStore.suspendEvents();
    toStore.suspendEvents();
    fromStore.remove(recs);
    toStore.add(recs);
    fromStore.resumeEvents();
    toStore.resumeEvents();
    fromField.setValue(null);
    toField.boundList.refresh();
  },

  onSectionItemDblClick: function(list, record){
    var section = record.get('SumRptSctnSK');
    switch (section) {
      case 2: //Table of Contents
          //There is not customization of the table of contents, just whether to include it or not.
        break;
      case 3: //Header/Footer
        this.getView().down('formularyheader-headerfooter').getController().loadData(record.get('SumRptCfgSctnSK'));
        this.getView().down('formularyheader-headerfooter').show();
        break;
      case 4: //Custom Front Text
        this.getView().down('formularyheader-fronttextconfig').getController().loadData(record.get('SumRptCfgSctnSK'));
        this.getView().down('formularyheader-fronttextconfig').show();
        break;
      case 5: //Drug List
        this.getView().down('formularysummarydruglist').getController().loadData(record.get('SumRptCfgSctnSK'));
        this.getView().down('formularysummarydruglist').show();
        break;
      case 6: //PA Section
        this.getView().down('formularysummarypast').getController().loadData('PA', record.get('SumRptCfgSctnSK'));
        this.getView().down('formularysummarypast').show();
        break;
      case 7: //ST Section
        this.getView().down('formularysummarypast').getController().loadData('ST', record.get('SumRptCfgSctnSK'));
        this.getView().down('formularysummarypast').show();
        break;
      case 8: //Custom Back Text
        this.getView().down('formularyheader-backtextconfig').getController().loadData(record.get('SumRptCfgSctnSK'));
        this.getView().down('formularyheader-backtextconfig').show();
        break;
      default:
        throw new Error('Invalid section (' + section + ')');
    }
  },
  onFileFormatSelect: function(combo, record) {
    if(this.lookup('sectionmultiselect').boundList.getStore().findExact('SumRptSctnName', 'Custom Front Text') != -1 || this.lookup('sectionmultiselect').boundList.getStore().findExact('SumRptSctnName', 'Custom Back Text') != -1) {
      Ext.Msg.show({
        title: 'Warning',
        message: 'Front and/or back text already uploaded will not be included in the report when the file format is Word or Excel.',
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.INFO
      });
    }
    this.lookup('sectioncombo').getStore().filterBy(function(record){
      var title = record.get('SumRptSctnName');
      if(title != "Custom Front Text" && title != "Custom Back Text")
        return record;
    });
  },

  onApplyClick: function() {
    var me = this,
        configCombo = me.lookup('summaryConfigCombo');
    Ext.getBody().mask('Saving');
    if (configCombo.store.findExact('SumRptCfgSK', me.selectedSummaryConfig) === -1) {
      me.saveConfig(false);
    } else {
      me.createConfig(function(){
        me.saveConfig(false);
      });
    }
  },
  createConfig: function (callback) {
    var me = this,
        vm = me.getViewModel();
    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'POST',
      headers: {
        'sessionid': Atlas.sessionId,
        'username': Atlas.user.un
      },
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfig?formularySK=' + me.getViewModel().get('formularyHeader').get('FrmlrySK'),
      success: function (response) {
        me.selectedSummaryConfig = response.responseText;
        vm.getStore('summaryconfig').getProxy().setExtraParam('summaryReportConfigSK', me.selectedSummaryConfig);
        vm.getStore('summaryconfig').load(function(record) {
          var form = me.lookup('summaryConfigForm'),
              oldrecord = form.getRecord();
          form.updateRecord(oldrecord);
          record[0].set('FileFmtSK', oldrecord.get('FileFmtSK'));
          record[0].set('FontSizeSK', oldrecord.get('FontSizeSK'));
          record[0].set('InclNotCvrdInd', oldrecord.get('InclNotCvrdInd'));
          record[0].set('InclUMInd', oldrecord.get('InclUMInd'));
          record[0].set('LangSK', oldrecord.get('LangSK'));
          record[0].set('SumRptCfgDesc', oldrecord.get('SumRptCfgDesc'));
          record[0].set('SumRptCfgName', oldrecord.get('SumRptCfgName'));
          record[0].set('TierDisplSK', oldrecord.get('TierDisplSK'));
          form.loadRecord(record[0]);
          me.finishLoad(function(){
            if(typeof callback != 'undefined') {
              callback();
            }
            me.saveConfig(false);
          });
        });
      },
      failure: function () {
        Ext.getBody().unmask();
        Ext.toast('Could not create new summary config to apply/save these changes to.', 'Failure');
      }
    });
  },
  onCancelSaveClick: function() {
    this.lookup('settingNameWindow').hide();
  },

  onSubmitClick: function () {
    var me = this,
        vm = me.getViewModel(),
        configCombo = me.lookup('summaryConfigCombo');
    Ext.getBody().mask('Saving');
    if (configCombo.store.findExact('SumRptCfgSK', me.selectedSummaryConfig) === -1) {
      me.saveConfig(true);
    } else {
      me.createConfig(function(){
        me.saveConfig(true);
      });
    }
  },

  //CANNOT SAVE WITH SAME NAME OR PREVIOUSLY USED NAME !!! BACKEND IS ALLOWING ME TO DO THIS RIGHT NOW

  saveConfig: function(isSave) {
    Ext.getBody().mask('Saving');
    var me = this,
        store = me.getViewModel().getStore('summaryconfig'),
        form = me.lookup('summaryConfigForm'),
        record = form.getRecord(),
        sectionSortOrderList = '',
        successToastVerb = (isSave?'saved':'applied'),
        failToastVerb = (isSave?'save, please ensure that the name is unique':'apply');
    me.lookup('sectionmultiselect').boundList.getStore().each(function (record) {
      if (sectionSortOrderList != '') {
        sectionSortOrderList += ',';
      }
      sectionSortOrderList += record.get('SumRptCfgSctnSK');
    });
    form.updateRecord(record);

    record.set('SectionSortOrderList', sectionSortOrderList);


    var records = me.lookup('summaryConfigTierGrid').getSelection(),
        selectedTiers = '',
        tierDescList='';
    for(var i=0;i<records.length;i++) {
      var tier = records[i];
      if(i > 0) {
        selectedTiers+=',';
        tierDescList+=',';
      }
      selectedTiers+=tier.get('FrmlryTierSK');
      if(tier.get('DsplyTierDesc') != null && tier.get('DsplyTierDesc') != '') {
        tierDescList += tier.get('DsplyTierDesc');
      }
    }

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'sessionid': Atlas.sessionId,
        'username': Atlas.user.un
      },
      jsonData: {
        FormularySK: me.getViewModel().get('formularyHeader').get('FrmlrySK'),
        SummaryConfigReportSK: me.selectedSummaryConfig,
        FormularyTierSelectedList: selectedTiers,
        TierDescList: tierDescList
      },
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfigTier',
      success: function () {
        me.lookup('summaryConfigTierGrid').getStore().reload();
      },
      failure: function () {
        Ext.toast('Could not save summary config Tier information.', 'Failure');
      }
    });


    store.sync({
      success: function (results) {
        me.lookup('settingNameWindow').hide();
        if(record.get('SumRptCfgName')) {
          me.lookup('summaryConfigNameDisplay').setValue(record.get('SumRptCfgName'));
        } else {
          me.lookup('summaryConfigNameDisplay').setValue('CUSTOM CONFIGURATION');
        }
        me.lookup('summaryConfigCombo').getStore().reload();
        if(isSave){
          me.onApplyClick();
        } else {
          Ext.getBody().unmask();
          Ext.toast('Summary Configuration successfully '+successToastVerb+'.', 'Success');
        }
      },
      failure: function (results) {
        if(isSave) {
          me.lookup('settingNameWindow').hide();
        }
        Ext.getBody().unmask();
        Ext.toast('Summary Configuration failed to '+failToastVerb+'.', 'Failure');
      }
    });
  },

  onSaveClick: function () {
    this.lookup('settingNameWindow').show();
  },

  onCancelClick: function () {
    this.getView().hide();
  },

  onClearClick: function(){
    this.lookup('summaryConfigForm').reset();
    this.lookup('sectionmultiselect').boundList.getStore().reload();
    this.lookup('sectioncombo').getStore().reload();
    this.lookup('summaryConfigTierGrid').getStore().reload();
  },

  onPreviewClick: function() {

    /*
     Once all settings are complete, users will have the ability to preview the document prior to activation.
     Clicking the Preview button will create the table of contents and open an SSRS report based on the saved settings.

     THIS IS WAITING FOR BACKEND FUNCTIONALITY TO EXIST
     */
  },

  onActivateClick: function() {
    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'POST',
      headers: {
        'sessionid': Atlas.sessionId,
        'username': Atlas.user.un
      },
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfig?formularySK=' + me.getViewModel().get('formularyHeader').get('FrmlrySK') + '&summaryReportConfigSK=' + this.selectedSummaryConfig
    });
  },

  onClick: function() {
    this.lookup('legendWindow').show();
  },

  onSaveLegendClick: function() {
    var me = this,
        store = me.lookup('configCoveragePropertyGrid').getStore();
    if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords())
    {
      Ext.getBody().mask('Saving');
    }
    store.sync({
      success: function() {
        me.lookup('legendWindow').hide();
        Ext.toast('Legend successfully saved.', 'Success');
      },
      failure: function() {
        Ext.toast('Failed to Save Legend', 'Data failed to save');
      },
      callback: function() {
        Ext.getBody().unmask();
      }
    });
  },

  onCloseLegendClick: function() {
    this.lookup('legendWindow').hide();
  },

  onChangeClick: function() {
    var me = this,
        configCombo = me.lookup('summaryConfigCombo');
    if (configCombo.store.findExact('SumRptCfgSK', me.selectedSummaryConfig) === -1 && me.selectedSummaryConfig != null && me.selectedSummaryConfig != undefined) {
      Ext.MessageBox.confirm('Close Window', 'This window contains data that will be lost. Are you sure you want to close the window?', function (id) {
        if (id === 'yes') {
          me.finishChangeConfig();
        }
      });
    } else {
      me.finishChangeConfig();
    }
  },
  finishChangeConfig: function() {
    var me = this,
        currentSummaryReportConfigSK = me.lookup('summaryConfigCombo').getValue();

    Ext.getBody().mask('Saving');
    if(currentSummaryReportConfigSK === -1) {
      Atlas.atlasformulary.data.proxy.FormularyAjax.request({
        method: 'POST',
        headers: {
          'sessionid': Atlas.sessionId,
          'username': Atlas.user.un
        },
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfig?formularySK=' + me.getViewModel().get('formularyHeader').get('FrmlrySK'),
        success: function (response) {
          me.selectedSummaryConfig = response.responseText;
          me.getViewModel().get('formularyHeader').set('SumRptCfgSK',me.selectedSummaryConfig);
          Ext.getBody().unmask();
          me.finishLoad();
        },
        failure: function () {
          Ext.toast('Could not create summary config.', 'Failure');
        }
      });
    } else {
      me.selectedSummaryConfig = currentSummaryReportConfigSK;
      Atlas.atlasformulary.data.proxy.FormularyAjax.request({
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'sessionid': Atlas.sessionId,
          'username': Atlas.user.un
        },
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfigFormulary?summaryReportConfigSK='+me.selectedSummaryConfig+'&formularySK='+me.getViewModel().get('formularyHeader').get('FrmlrySK'),
        success: function () {
          me.getViewModel().get('formularyHeader').set('SumRptCfgSK',me.selectedSummaryConfig);
          me.finishLoad();
        },
        failure: function () {
          Ext.toast('Could not change formulary to use selected summary config.', 'Failure');
        }
      });
    }
  },
  onConfigComboStoreLoad: function (store) {
    store.insert(0, new Atlas.atlasformulary.model.SummaryConfig({
          SumRptCfgSK: -1,
          SumRptCfgName: 'New',
          SumRptCfgDesc: ''
        })
    );
  },
  onSummaryConfigSelect: function(combo) {
    var vm = this.getViewModel();
    if(combo.isDirty()) {
      vm.set('hasconfig', false);
    }
    else {
      vm.set('hasconfig', true);
      this.lookup('sectionmultiselect').boundList.unmask();
    }
  }
});
