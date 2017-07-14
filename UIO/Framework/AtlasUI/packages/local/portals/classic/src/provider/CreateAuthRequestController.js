/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Request
 * Description: Controller for Authorization Request
 */
Ext.define('Atlas.portals.provider.CreateAuthRequestController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsProviderCreateAuthRequestController',

  listen: {controller: {'*': {
    authInquiryMemberSelected: 'loadMemberData',
    servicingFacilitySelected: 'loadServicingFacility',
    servicingProviderSelected: 'loadServicingProvider',
    OONProviderSelected: 'loadOONProvider',
    OONFacilitySelected: 'loadOONFacility'
  }}},

  init: function () {
    var me = this,
      vm = me.getViewModel(),
      providerListStore = vm.getStore('providerListStore'),
      memberId = me.getView().keyValue; // is this ever used?

    providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerListStore.load();

        // need to load these manually because combo is disabled by default
    vm.getStore('requestTypeStore').load();
    vm.getStore('AuthPriorityWebStore').load();

    me.loadReviewTypeDescription();
    me.setNextButtonEnable();
    me.loadPlaceOfService(null);

    if (memberId !== undefined) {
      me.lookupReference('memberIdRef').setValue(memberId);
      me.onEnterClick();
    }
  },

  loadServicingProvider: function (params) {
    var me = this,
      form = me.lookupReference('newAuthReferralTab').getForm(),
      vm = me.getViewModel();

    form.setValues({
      oonServProv_ProvName: null,
      oonServProv_ProvNPI: null,
      oonServProv_PracName: null,
      oonServProv_PracAddr1: null,
      oonServProv_PracAddr2: null,
      oonServProv_PracCity: null,
      oonServProv_PracState: null,
      oonServProv_PracZip: null,
      oonServProv_PracPhone: null,
      oonServProv_PracFax: null,
      oonServProv_Reason: null
    });

    vm.set('servProv', params.providerName);
    vm.set('servProvId', params.providerId);

    me.setNextButtonEnable();
  },

  loadReviewTypeDescription: function () {
    var me = this;

    Ext.Ajax.request({
      useDefaultXhrHeader: false,
      withCredentials: true,
      paramsAsJson: true,
      noCache: false,
      url: Atlas.apiURL + 'shared/hp/listitemdata6/read',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      params: Ext.JSON.encode({
        pListName: 'AuthPriorityWeb',
        userState: Atlas.user.providerStateSelected
      }),
      success: function (response, opts) {
        var jsonString = response.responseText.replace(/\\u0000/g, '[split]'),
          jsonStringParsed = Ext.decode(jsonString),
          descriptionArray = jsonStringParsed.data[0].charstring.split('[split]'),
          description = descriptionArray[descriptionArray.length - 1];

        me.lookup('reviewTypeDesc').setValue(description);
      }
    });
  },

  loadServicingFacility: function (params) {
    var me = this,
      form = me.lookupReference('newAuthReferralTab').getForm(),
      vm = me.getViewModel();

    form.setValues({
      oonServFac_ProvName: null,
      oonServFac_ProvNPI: null,
      oonServFac_PracName: null,
      oonServFac_PracAddr1: null,
      oonServFac_PracAddr2: null,
      oonServFac_PracCity: null,
      oonServFac_PracState: null,
      oonServFac_PracZip: null,
      oonServFac_PracPhone: null,
      oonServFac_PracFax: null,
      oonServFac_Reason: null
    });

    vm.set('servFac', params.facilityName);
    vm.set('servFacId', params.providerId);

    me.setNextButtonEnable();
  },

  loadOONProvider: function (params) {
    var me = this,
      form = me.lookupReference('newAuthReferralTab').getForm(),
      vm = me.getViewModel();

    form.setValues({
      oonServProv_ProvName: params.providerName,
      oonServProv_ProvNPI: params.NPINumber,
      oonServProv_PracName: params.practiceName,
      oonServProv_PracAddr1: params.practiceAddress,
      oonServProv_PracAddr2: params.practiceAddress2,
      oonServProv_PracCity: params.city,
      oonServProv_PracState: params.state,
      oonServProv_PracZip: params.zip,
      oonServProv_PracPhone: params.phone,
      oonServProv_PracFax: params.fax,
      oonServProv_Reason: params.Reason
    });

    vm.set('servProv', params.providerName);
    vm.set('servProvId', '');
  },

  loadOONFacility: function (params) {
    var me = this,
      form = me.lookupReference('newAuthReferralTab').getForm(),
      vm = me.getViewModel();

    form.setValues({
      oonServFac_ProvName: params.providerName,
      oonServFac_ProvNPI: params.NPINumber,
      oonServFac_PracName: params.practiceName,
      oonServFac_PracAddr1: params.practiceAddress,
      oonServFac_PracAddr2: params.practiceAddress2,
      oonServFac_PracCity: params.city,
      oonServFac_PracState: params.state,
      oonServFac_PracZip: params.zip,
      oonServFac_PracPhone: params.phone,
      oonServFac_PracFax: params.fax,
      oonServFac_Reason: params.Reason
    });

    vm.set('servFac', params.providerName);
    vm.set('servFacId', '');
  },

  onEnterClick: function () {
    this.onMemberIDBlurAuthReq('');
  },

  onSelectPortalPlan: function () {
    this.onMemberIDBlurAuthReq(this.lookupReference('portalPlanSelectDlg').getValue());
  },

  loadMemberData: function (params) {
    this.lookupReference('memberIdRef').setValue(params.memberId);
    this.onMemberIDBlurAuthReq('');
  },

  onMemberIDBlur: function () {
    this.onMemberIDBlurAuthReq('');
  },

  onMemberIDBlurAuthReq: function (portalPlan) {
    var me = this,
      vm = me.getViewModel(),
      plan = '',
      memberIdStore = Ext.create('Atlas.portals.provider.model.PortalMemberFuncs', {}),
      proxy = memberIdStore.getProxy();

    proxy.setExtraParam('pFunction', 'fGetRecipientID');
    proxy.setExtraParam('pPlanId', '');
    proxy.setExtraParam('pLobID', plan);
    proxy.setExtraParam('pMemberID', me.lookupReference('memberIdRef').getValue());
    proxy.setExtraParam('pRecipientID', '');
    proxy.setExtraParam('pMemberDOB', '');
    proxy.setExtraParam('pPortalPlan', portalPlan);
    proxy.setExtraParam('pPortalType', 'Provider');
    memberIdStore.load({callback: function (records) {
      if (!records && !records.length) {
        Ext.Msg.alert('Error', 'There was an error searching for this member.');

        return;
      }

      var response = records.data.value;

      if (0 < response.indexOf('Duplicate')) {
        me.lookupReference('portalPlanSelectDlg').setDisabled(false);

        return;
      }

      if (0 > response.indexOf('ERROR')) {
        me.getView().getViewModel().set('recipientId', records.get('value'));
        me.getMemberData(records.get('value'));
        me.fireEvent('loadVisitCount', records.get('value'));

        return;
      }

      vm.set('memberTermDate', '');
      vm.set('recipientId', '');
      Ext.Msg.alert('Error', 'Invalid Member ID entered');
    }});
  },

  getMemberData: function (recipientId) {
    var me = this,
      vm = me.getViewModel(),
      memberDataModel = Ext.create('Atlas.portals.hpmember.model.MemberDataWeb', {}),
      proxy = memberDataModel.getProxy(),
      fields = 'firstName,lastName,birthDate,@benefitPlanCode,@benefitPlanCodeDesc,@primaryLOB,@LevelOfService,@alerts,@PCPName,@abadtanfAlert,@enrollmentStatus,@contCoverageSince,@contCoverageTerm';

    proxy.setExtraParam('pRecipientID', recipientId);
    proxy.setExtraParam('pAppServerID', '');
    proxy.setExtraParam('portalPlan', '');
    proxy.setExtraParam('pFieldList', fields);
    memberDataModel.load({callback: function (record) {
      if (!record) {
        Ext.Msg.alert('Error', 'There was an error searching for this member.');

        return;
      }

      if (!record.get('lastName')) {
        vm.set('memberNameRef', 'Member not found');
        me.getView().getViewModel().set('memberTermDate', '');

        return;
      }

      if (record.get('@primaryLOB') === "Medicare" && Atlas.user.providerStateSelected === "MI") {
        Ext.Msg.alert("MI Medicare Member - Alert", "All Medicare Prior Authorizations must be entered via the Patient360 Portal.<br><br>Please click the Patient360 Tab on the left side menu.");
        vm.set('memberNameRef', '');
        vm.set('dobDash', '');
        vm.set('alertsDash', '');
        vm.set('memberIDDash', '');
        vm.set('benefitPlanDash', '');
        vm.set('lobID_newAuth', '');
        vm.set('levelOfCare_newAuth', '');
        vm.set('effDate', '');
        vm.set('lobId', '');
        vm.set('benefitPlanCode', '');
        vm.set('memberTermDate', '');
        me.lookup('memberIdRef').setValue('');
        me.onCancelClick();
      } else {
        vm.set('memberNameRef', record.get('lastName') + ', ' + record.get('firstName'));
        vm.set('dobDash', record.get('birthDate'));
        vm.set('alertsDash', record.get('@alerts'));
        vm.set('memberIDDash', me.lookupReference('memberIdRef').getValue());
        vm.set('benefitPlanDash', record.get('@benefitPlanCode'));
        vm.set('lobID_newAuth', record.get('@primaryLOB'));
        vm.set('levelOfCare_newAuth', record.get('@LevelOfService'));
        vm.set('effDate', record.get('@contCoverageSince'));
        vm.set('lobId', record.get('@primaryLOB'));
        vm.set('benefitPlanCode', record.get('@benefitPlanCode'));
        vm.set('memberTermDate',
          record.get('@contCoverageTerm') ? record.get('@contCoverageTerm') : ''
        );
      }
    }});
  },

  onLevelOfServiceSelect: function (combo, records, eOpts) {
    var me = this,
      today = new Date(),
      levelOfService = combo.getRawValue();

    if ('Inpatient' == levelOfService) {
            //get previous business day
      var prevBusDay = new Date(today);

      do {
        prevBusDay.setDate(prevBusDay.getDate() - 1); //setDate also supports negative values, which cause the month to rollover.
      }
      while (6 === prevBusDay.getDay() || 0 === prevBusDay.getDay()); // 0 for Sunday, 6 for Saturday
      me.lookupReference('admitDate_newAuth').setValue(today);
    } else {
      me.lookupReference('admitDate_newAuth').setValue(null);
      me.lookupReference('dischargeDate_newAuth').setValue(null);
    }

    me.loadProcedureCategories(levelOfService);
    this.loadPlaceOfService(combo.lastValue);
  },

  loadPlaceOfService: function (value) {
    var me = this,
      placeOfServiceUnfilteredStore = this.getViewModel().getStore('placeOfServiceUnfilteredStore');

    placeOfServiceUnfilteredStore.load({callback: function (record, metadata) {
      var listItems = Ext.JSON.decode(metadata._response.responseText).metadata.pListItems.split('^'),
        placeOfServiceStore = me.getViewModel().getStore('placeOfServiceStore'),
        storeData = [],
        i = 0;

      for (i = 0; i < listItems.length; i += 2) {
        if (value === '02' && !listItems[i].indexOf('Inpatient')) {
        } else {
          storeData.push({
            'name': listItems[i],
            'id': listItems[i + 1]
          });
        }
      }

      placeOfServiceStore.getProxy().setData(null);
      placeOfServiceStore.getProxy().setData(storeData);
      placeOfServiceStore.reload();
    }});
  },

  loadProcedureCategories: function (levelOfService) {
    var me = this,
      listItemsModel = Ext.create('Atlas.portals.provider.model.OdcdProcedureCategoryApi', {}),
      statusCombo = me.lookupReference('procedureCategoryCombo');

    statusCombo.setValue(null);

    IOparamData = {ttParameters: [
      {
        parameterName: 'pSessionID',
        parameterValue: Atlas.user.sessionId
      },
      {
        parameterName: 'pActionType',
        parameterValue: 'get'
      },
      {
        parameterName: 'pScreenName',
        parameterValue: 'portalProcedureCategory'
      },
      {
        parameterName: 'pUserName',
        parameterValue: Atlas.user.un
      },
      {
        parameterName: 'pRowid',
        parameterValue: null
      },
      {
        parameterName: 'pRowNum',
        parameterValue: 0
      },
      {
        parameterName: 'pRows',
        parameterValue: 999
      },
      {
        parameterName: 'pWhere',
        parameterValue: 'active=yes AND TermDate=? AND LOOKUP("Medicare", lobID) > 0 AND levelOfService="' + levelOfService + '" '
      },
      {
        parameterName: 'pResultWhereStmt',
        parameterValue: ''
      },
      {
        parameterName: 'pSort',
        parameterValue: ''
      },
      {
        parameterName: 'pIncludeFields',
        parameterValue: ''
      },
      {
        parameterName: 'pExcludeFields',
        parameterValue: ''
      },
      {
        parameterName: 'viJSON',
        parameterValue: '{\\"ttoDCDProcedureCategory\\": [\\n]}\\n'
      }
    ]};

    listItemsModel.getProxy().setExtraParam('pParamsIO', IOparamData);
    listItemsModel.load({callback: function (record, operation) {
      var results = Ext.JSON.decode(operation._response.responseText).data.ttODCDProcedureCategory;

      if (!results) {
        return;
      }
      var statusStore = new Ext.data.ArrayStore({});

      statusStore.add(results);
      statusStore.sort('procedureCategory', 'ASC');
      statusCombo.setStore(statusStore);
    }});
  },

  onVisitCountClick: function () {
    var me = this,
      vm = me.getViewModel(),
      recipientId = vm.get('recipientId'),
      benefitPlanCode = vm.get('benefitPlanCode');

    if (null != recipientId && '' != recipientId) {
      var window = Ext.ComponentQuery.query('window[itemId=viewVisitCountWindow]')[0];

      if (!window) {
        window = Ext.create('Ext.window.Window', {
          title: 'Visit Count',
          reference: 'viewVisitCountWindow',
          width: 800,
          modal: true,
          layout: 'fit',
          viewModel: {data: {
            recipientId: recipientId,
            benefitPlanCode: benefitPlanCode
          }},
          session: {schema: 'atlas'},
          items: [{xtype: 'portalsProviderVisitCount'}]
        }).show();
      } else {
        window.show();
      }
    } else {
      Ext.Msg.alert('Error', 'Please Enter a valid Member ID');
    }
  },

  onProviderLookupClick: function () {
    var window = Ext.ComponentQuery.query('window[itemId=viewProviderSearchWindow]')[0];

    if (!window) {
      window = Ext.create('Ext.window.Window', {
        reference: 'viewProviderSearchWindow',
        title: 'Provider Search',
        modal: true,
        width: 1130,
        viewModel: {data: {searchFrom: 'ServicingProvider'}},
        layout: 'fit',
        session: {schema: 'atlas'},
        items: [{
          xtype: 'portalsProviderFacilityLookup',

          viewModel: {
            stores: {
              providerMasterAuthStore: {model: 'Atlas.portals.provider.model.ProviderMasterAuth'},
              providerSelectNPIStore: {model: 'Atlas.portals.provider.model.ProviderMasterAuth'}
            },

            serviceProvRef: this.getViewModel('servProv'),

            data: {labelInput: 'Provider Name'}
          }
        }]
      }).show();
    } else {
      window.show();
    }
  },

  onOONProviderClick: function () {
    var window = Ext.ComponentQuery.query('window[itemId=viewOONProviderWindow]')[0];

    if (!window) {
      window = Ext.create('Ext.window.Window', {
        title: 'OON Provider Entry',
        reference: 'viewOONProviderWindow',
        modal: true,
        height: 437,
        width: 600,
        viewModel: {data: {searchFrom: 'ServicingProvider'}},
        layout: 'fit',
        session: {schema: 'atlas'},
        items: [{xtype: 'portalsProviderOONEntry'}]
      }).show();
    } else {
      window.show();
    }
  },

  onFacilityLookupClick: function () {
    var window = Ext.ComponentQuery.query('window[itemId=viewFacilitySearchWindow]')[0];

    if (!window) {
      window = Ext.create('Ext.window.Window', {
        title: 'Facility Search',
        reference: 'viewFacilitySearchWindow',
        width: 1130,
        modal: true,
        viewModel: {data: {searchFrom: 'ServicingFacility'}},
        layout: 'fit',
        session: {schema: 'atlas'},
        items: [{
          xtype: 'portalsProviderFacilityLookup',

          viewModel: {
            stores: {
              providerMasterAuthStore: {model: 'Atlas.portals.provider.model.ProviderMasterAuth'},
              providerSelectNPIStore: {model: 'Atlas.portals.provider.model.ProviderMasterAuth'}
            },

            serviceProvRef: this.getViewModel().get('servProv'),

            data: {labelInput: 'Facility Name'}
          }
        }]
      }).show();
    } else {
      window.show();
    }
  },

  onOONFacilityClick: function () {
    var window = Ext.ComponentQuery.query('window[itemId=viewOONFacilityWindow]')[0];

    if (!window) {
      window = Ext.create('Ext.window.Window', {
        title: 'OON Provider Entry',
        reference: 'viewOONFacilityWindow',
        height: 437,
        width: 600,
        modal: true,
        viewModel: {data: {searchFrom: 'ServicingFacility'}},
        layout: 'fit',
        session: {schema: 'atlas'},
        items: [{xtype: 'portalsProviderOONEntry'}]
      }).show();
    } else {
      window.show();
    }
  },

  onMemberLookupClick: function () {
    var window = Ext.ComponentQuery.query('window[itemId=viewMemberSearchWindow]')[0];

    if (!window) {
      window = Ext.create('Ext.window.Window', {
        title: 'Member Search',
        reference: 'viewMemberSearchWindow',
        width: 1200,
        scrollable: true,
        modal: true,
        layout: 'fit',
        session: {schema: 'atlas'},
        items: [{xtype: 'portalsProviderAuthInquiryMemberSearch'}]
      }).show();
    } else {
      window.show();
    }
  },

  setNextButtonEnable: function () {
    var me = this,
      vm = me.getViewModel(),
      nextBtn = this.lookup('nextBtn'),
      activeTab = this.lookup('newAuthCardPanel').getLayout().getActiveItem().itemId,
      refButton = this.lookup('refButton'),
      servButton = this.lookup('servButton'),
      contactButton = this.lookup('contactButton');

    if ('newAuthReferralTab' === activeTab) {
      if (this.lookup('requestType_newAuth').validate() &&
        null !== this.lookup('requestingProvider').getValue() &&
        null !== this.lookup('levelOfService_newAuth').getValue() &&
        this.lookup('placeOfService_newAuth').validate() &&
        this.lookup('requestType_newAuth').validate() &&
        this.lookup('reviewType_newAuth').validate() &&
        this.lookup('procedureCategoryCombo').validate() &&
        this.lookup('startDate_newAuth').validate() &&
        this.lookup('endDate_newAuth').validate() &&
        (vm.get('servProv') || vm.get('servFac'))) {
        nextBtn.setDisabled(false);
        refButton.setText('');
        refButton.setIconCls('x-fa fa-check');
        servButton.setDisabled(false);
      } else {
        nextBtn.setDisabled(true);
        servButton.setDisabled(true);
        contactButton.setDisabled(true);
        refButton.setText('1');
        refButton.setIconCls('');
      }
    } else if ('newAuthServiceTab' === activeTab) {
      var storeProcedure = vm.getStore('authProcedureStore');
      var storeDiag = vm.getStore('authDiagnosisStore');

      if (0 === storeProcedure.data.length) {
        contactButton.setDisabled(true);
        servButton.setIconCls('');
        servButton.setText('2');
        nextBtn.setDisabled(true);

        return false;
      }

      var newAuthServiceProcedureGrid = me.lookupReference('newAuthServiceProcedureGrid');

      storeProcedure.each(function (procRecord) {
        if (0 === storeDiag.data.length) {
          nextBtn.setDisabled(true);
          contactButton.setDisabled(true);
          servButton.setIconCls('');
          servButton.setText('2');
          return false;
        }
        nextBtn.setDisabled(false);
        contactButton.setDisabled(false);
        servButton.setIconCls('x-fa fa-check');
        servButton.setText('');
      });
    } else if ('newAuthContactNotesTab' === activeTab) {
      if (this.lookupReference('subjectCombo').validate() && this.lookupReference('contactCombo').validate() &&
      this.lookupReference('noteName_newAuth').validate() && this.lookupReference('notePhone_newAuth').validate() &&
      this.lookupReference('noteNote_newAuth').validate()) {
        this.lookup('submitBtn').setDisabled(false);
        contactButton.setIconCls('x-fa fa-check');
        contactButton.setText('');
      } else {
        this.lookup('submitBtn').setDisabled(true);
        contactButton.setIconCls('');
        contactButton.setText('3');
      }

      nextBtn.setDisabled(true);
    }
  },

  onNextBtnClick: function () {
    var authRequestLayout = this.lookup('newAuthCardPanel').getLayout(),
      activeTab = authRequestLayout.getActiveItem().itemId;

    if ('newAuthReferralTab' === activeTab) {
      authRequestLayout.setActiveItem(1);
      this.lookup('servLabel').setHtml('<span class="x-form-item-label-default">Service</span>');
      this.lookup('refLabel').setHtml('<span class="x-form-item-label-thin">Referral</span>');
      this.lookup('prevBtn').setDisabled(false);
    } else if ('newAuthServiceTab' === activeTab) {
      authRequestLayout.setActiveItem(2);
      this.lookup('servLabel').setHtml('<span class="x-form-item-label-thin">Service</span>');
      this.lookup('contactLabel').setHtml('<span class="x-form-item-label-default">Contact Notes</span>');
    }

    this.setNextButtonEnable();
  },

  onPrevBtnClick: function () {
    var authRequestLayout = this.lookup('newAuthCardPanel').getLayout(),
      activeTab = authRequestLayout.getActiveItem().itemId;

    if ('newAuthReferralTab' == activeTab) {
      this.lookup('prevBtn').setDisabled(true);
    } else if ('newAuthServiceTab' == activeTab) {
      authRequestLayout.setActiveItem(0);
      this.lookup('servLabel').setHtml('<span class="x-form-item-label-thin">Service</span>');
      this.lookup('refLabel').setHtml('<span class="x-form-item-label-default">Referral</span>');
    } else if ('newAuthContactNotesTab' == activeTab) {
      authRequestLayout.setActiveItem(1);
      this.lookup('servLabel').setHtml('<span class="x-form-item-label-default">Service</b>');
      this.lookup('contactLabel').setHtml('<span class="x-form-item-label-thin">Contact Notes</span>');
      this.lookup('nextBtn').setDisabled(false);
    }
  },

  onStepperButtonClick: function (button) {
    var buttonRef = button.reference,
      authRequestLayout = this.lookup('newAuthCardPanel').getLayout(),
      servLabel = this.lookup('servLabel'),
      contactLabel = this.lookup('contactLabel'),
      refLabel = this.lookup('refLabel');

    if (buttonRef === 'refButton') {
      authRequestLayout.setActiveItem(0);
      servLabel.setHtml('<span class="x-form-item-label-thin">Service</span>');
      contactLabel.setHtml('<span class="x-form-item-label-thin">Contact Notes</span>');
      refLabel.setHtml('<span class="x-form-item-label-default">Referral</span>');
      this.lookup('prevBtn').setDisabled(true);
    } else if (buttonRef === 'servButton') {
      authRequestLayout.setActiveItem(1);
      servLabel.setHtml('<span class="x-form-item-label-default">Service</span>');
      contactLabel.setHtml('<span class="x-form-item-label-thin">Contact Notes</span>');
      refLabel.setHtml('<span class="x-form-item-label-thin">Referral</span>');
    } else if (buttonRef === 'contactButton') {
      authRequestLayout.setActiveItem(2);
      servLabel.setHtml('<span class="x-form-item-label-thin">Service</span>');
      contactLabel.setHtml('<span class="x-form-item-label-default">Contact Notes</span>');
      refLabel.setHtml('<span class="x-form-item-label-thin">Referral</span>');
    }

    this.setNextButtonEnable();
  },

  onProcfieldBlur: function (component, event, eOpts) {
    var me = this,
      procedureModel = Ext.create('Atlas.portals.provider.model.ProcMasterSearch', {}),
      proxy = procedureModel.getProxy();

    proxy.setExtraParam('pRowid', 0);
    proxy.setExtraParam('pRowNum', 0);
    proxy.setExtraParam('pRows', 50);
    proxy.setExtraParam('pWhere', 'procCode = \'' + me.lookupReference('procCode_newAuth').getValue() + '\'');
    proxy.setExtraParam('pSort', '');
    procedureModel.load({
      success: function (response, opts) {
        var vProcDesc_newAuth = me.lookupReference('procDesc_newAuth');

        vProcDesc_newAuth.setValue(response.data.description);
      },
      failure: function (response, opts) {
        if ('' !== component.value) {
          Ext.Msg.alert('Procedure Lookup Error', 'Procedure Not Found.');
        }
      }
    });
  },

  onButtonClick: function (button, e, eOpts) {
    var me = this,
      store = me.getViewModel().getStore('authProcedureStore'),
      maxId = 0,
      vServiceLineNumber = 0,
      thisGrid = me.lookupReference('newAuthServiceProcedureGrid'),
      thisPlugin = thisGrid.getPlugin('rowEditingProcedure'),
      newAuthServiceDiagGrid = me.lookupReference('newAuthServiceDiagGrid'),
      submitBtn = me.lookupReference('submitBtn');

    thisPlugin.cancelEdit();

    if (0 < store.getCount()) {
      maxId = store.getAt(0).get('serviceLineNumber');
      store.each(function (rec) {
        maxId = Math.max(maxId, rec.get('serviceLineNumber'));
      });
    }
    vServiceLineNumber = maxId + 1;
    var r = Ext.create('Atlas.portals.provider.model.ProcedureModel', {
      serviceLineNumber: vServiceLineNumber,
      cpt: '',
      description: '',
      units: null,
      measure: '',
      measureCode: ''
    });

    store.insert(0, r);
    thisPlugin.startEdit(0, 0);

    newAuthServiceDiagGrid.setDisabled(true);
    submitBtn.setDisabled(true);
  },

  onNewAuthServiceProcedureGridSelect: function (rowmodel, record, index, eOpts) {
    var newAuthServiceDiagGrid = this.lookupReference('newAuthServiceDiagGrid');

    newAuthServiceDiagGrid.store.clearFilter(true);
    newAuthServiceDiagGrid.store.filter('procServiceLineNumber', record.get('serviceLineNumber'));
  },

  onProcRowValidateedit: function (editor, context, eOpts) {
    if ('' === this.lookupReference('procCode_newAuth').getValue() || '' === this.lookupReference('procDesc_newAuth').getValue() || (null === this.lookupReference('units_newAuth').getValue() || '' === this.lookupReference('measure_newAuth').getRawValue())) {
      Ext.Msg.alert('Error', 'Please enter a valid procedure code, units and measure.');
      return false;
    }

    this.setNextButtonEnable();
  },

  onProcRowCanceledit: function (editor, context, eOpts) {
    var me = this,
      grid = me.lookupReference('newAuthServiceProcedureGrid'),
      store = me.getView().getViewModel().getStore('authProcedureStore'),
      sel = grid.getSelectionModel().getSelection(),
      model = sel[0],
      newAuthServiceDiagGrid = me.lookupReference('newAuthServiceDiagGrid');

    if ('' === model.get('cpt')) {
      store.remove(model);
    }

    newAuthServiceDiagGrid.setDisabled(false);
  },

  onProcRowEdit: function (editor, context, eOpts) {
    var me = this,
      grid = me.lookupReference('newAuthServiceProcedureGrid'),
      store = me.getView().getViewModel().getStore('authProcedureStore'),
      sel = grid.getSelectionModel().getSelection(),
      model = sel[0];

    if ('' === model.get('cpt')) {
      store.remove(model);
    } else {
      var diagGrid = me.lookupReference('newAuthServiceDiagGrid'),
        submitBtn = me.lookupReference('submitBtn');

      model.set('measureCode', me.lookupReference('measure_newAuth').getValue());
      model.set('measure', me.lookupReference('measure_newAuth').getRawValue());
      diagGrid.setDisabled(false);
    }
  },

  onDiagfieldBlur: function (component, event, eOpts) {
    if ('' !== component.getValue()) {
      var me = this,
        vString = component.getValue(),
        newAuthServiceDiagDesc = me.lookupReference('newAuthServiceDiagDesc'),
        diagnosisModel = Ext.create('Atlas.portals.provider.model.DiagCodeMaster', {}),
        proxy = diagnosisModel.getProxy();

      proxy.setExtraParam('pRowid', 0);
      proxy.setExtraParam('pRowNum', 0);
      proxy.setExtraParam('pRows', '0');
      proxy.setExtraParam('pWhere', 'termdate = ? and diagCode = \'' + vString.replace('.', '') + '\'');
      proxy.setExtraParam('pSort', 'diagCode');
      diagnosisModel.load({
        success: function (response, opts) {
          var vDiagDesc_newAuth = me.lookupReference('newAuthServiceDiagDesc');

          vDiagDesc_newAuth.setValue(response.data.description);
        },
        failure: function (response, opts) {
          Ext.Msg.alert('Diagnosis lookup error', 'Diagnosis not found');
        }
      });
    }
  },

  onDiagRowValidateedit: function (editor, context, eOpts) {
    if ('' === this.lookupReference('newAuthServiceDiagCode').getValue() || null === this.lookupReference('newAuthServiceDiagCode').getValue() || ('' === this.lookupReference('newAuthServiceDiagDesc').getValue() || null === this.lookupReference('newAuthServiceDiagDesc').getValue())) {
      Ext.Msg.alert('Error', 'Please enter a valid diagnosis code');

      return false;
    }

    this.setNextButtonEnable();
  },

  onDiagRowCanceledit: function (editor, context, eOpts) {
    var grid = this.lookupReference('newAuthServiceDiagGrid');
    var store = this.getView().getViewModel().getStore('authDiagnosisStore');
    var sel = grid.getSelectionModel().getSelection();
    var model = sel[0];

    if ('' === model.get('diagCode')) {
      store.remove(model);
    }
    var newAuthServiceProcedureGrid = this.lookupReference('newAuthServiceProcedureGrid');

    newAuthServiceProcedureGrid.setDisabled(false);
  },

  onDiagRowEdit: function (editor, context, eOpts) {
    var me = this,
      grid = me.lookupReference('newAuthServiceDiagGrid'),
      store = this.getView().getViewModel().getStore('authDiagnosisStore'),
      sel = grid.getSelectionModel().getSelection(),
      model = sel[0];

    if ('' === model.get('diagCode')) {
      store.remove(model);
    } else {
      var newAuthServiceProcedureGrid = me.lookupReference('newAuthServiceProcedureGrid');

      newAuthServiceProcedureGrid.setDisabled(false);
    }
  },

  onDiagnosisButtonClick: function (button, e, eOpts) {
    var me = this,
      thisGrid = me.lookupReference('newAuthServiceDiagGrid'),
      thisPlugin = thisGrid.getPlugin('rowEditing'),
      parentGrid = me.lookupReference('newAuthServiceProcedureGrid');

    thisPlugin.cancelEdit();

    if (parentGrid.getSelectionModel().hasSelection()) {
      var selectedParentRow = parentGrid.getSelectionModel().getSelection()[0];
      var r = Ext.create('Atlas.portals.provider.model.DiagnosisModel', {
        procServiceLineNumber: selectedParentRow.get('serviceLineNumber'),
        icd: '',
        diagCode: '',
        description: ''
      });
      var store = me.getView().getViewModel().getStore('authDiagnosisStore');

      store.insert(0, r);
      thisPlugin.startEdit(0, 0);

      var newAuthServiceProcedureGrid = me.lookupReference('newAuthServiceProcedureGrid');

      newAuthServiceProcedureGrid.setDisabled(true);
      var submitBtn = me.lookupReference('submitBtn');

      submitBtn.setDisabled(true);
    } else {
      Ext.Msg.alert('User Error', 'Please make sure to select a procedure before adding diagnosis.');
    }
  },

  onNewAuthReferralTabActivate: function () {
    this.lookupReference('prevBtn').setDisabled(true);
    this.setNextButtonEnable();
  },

  onNewAuthContactNotesTabActivate: function () {
    this.lookupReference('nextBtn').setDisabled(true);
    this.lookupReference('prevBtn').setDisabled(false);
  },

  onNewAuthServiceTabActivate: function () {
    this.lookupReference('nextBtn').setDisabled(false);
    this.lookupReference('prevBtn').setDisabled(false);
  },

  onRequestingProviderSelect: function (combo, records, eOpts) {
    switch (records.data.providerType) {
      case 'PCP':
        this.getView().getViewModel().set('AuthServiceRequestedBy', '1');
        break;
      case 'PRA':
        this.getView().getViewModel().set('AuthServiceRequestedBy', '2');
        break;
      case 'HOS':
        this.getView().getViewModel().set('AuthServiceRequestedBy', '3');
        break;
      case 'DME':
        this.getView().getViewModel().set('AuthServiceRequestedBy', '5');
        break;
      case 'SPE':
        this.getView().getViewModel().set('AuthServiceRequestedBy', '11');
        break;
      default:
        this.getView().getViewModel().set('AuthServiceRequestedBy', '');
    }
  },

  onFieldBlurChange: function () {
    this.setNextButtonEnable();
  },

  onProcCategorySelect: function (combo, records, eOpts) {
    var me = this,
      vm = me.getViewModel();

    vm.set('longDescr', records.data.longDescr);
    vm.set('requiredDocs', records.data.requiredDocs);

    if ('BH' == records.data.reportGroup) {
      vm.set('workQueue', records.data.reportGroup);
    } else if ('UM' == records.data.reportGroup) {
      if ('Inpatient' == records.data.levelOfService) {
        vm.set('workQueue', 'IP');
      } else if ('Outpatient' == records.data.levelOfService) {
        vm.set('workQueue', 'PS');
      } else {
        vm.set('workQueue', 'PS');
      }
    }
  },

  onCancelClick: function () {
    var me = this,
      vm = me.getViewModel(),
      form = me.lookupReference('newAuthReferralTab').getForm(),
      //contact fields (not in a form)
      subjectCombo = me.lookupReference('subjectCombo'),
      contactCombo = me.lookupReference('contactCombo'),
      noteName_newAuth = me.lookupReference('noteName_newAuth'),
      notePhone_newAuth = me.lookupReference('notePhone_newAuth'),
      noteExtension_newAuth = me.lookupReference('noteExtension_newAuth'),
      noteNote_newAuth = me.lookupReference('noteNote_newAuth'),
      storeProcedure = vm.getStore('authProcedureStore'),
      storeDiag = vm.getStore('authDiagnosisStore');

    form.reset();
    subjectCombo.reset();
    contactCombo.reset();
    noteName_newAuth.reset();
    notePhone_newAuth.reset();
    noteExtension_newAuth.reset();
    noteNote_newAuth.reset();
    storeProcedure.removeAll();
    storeDiag.removeAll();

    vm.set('servProv', '');
    vm.set('servProvId', '');

    this.lookup('newAuthCardPanel').getLayout().setActiveItem(0);
    this.lookup('servLabel').setHtml('<span class="x-form-item-label-thin">Service</span>');
    this.lookup('contactLabel').setHtml('<span class="x-form-item-label-thin">Contact Notes</span>');
    this.lookup('refLabel').setHtml('<span class="x-form-item-label-default">Referral</span>');

    this.lookup('servButton').setIconCls('');
    this.lookup('servButton').setText('2');

    this.lookup('contactButton').setIconCls('');
    this.lookup('contactButton').setText('3');

    this.lookup('refButton').setIconCls('');
    this.lookup('refButton').setText('1');

    this.lookup('prevBtn').setDisabled(true);
    this.setNextButtonEnable();
    me.loadReviewTypeDescription();
  },

  onSubmitClick: function (button) {
    var me = this,
      vm = me.getViewModel(),
      recipientId = vm.get('recipientId'),
      authRequestLayout = this.lookup('newAuthCardPanel').getLayout();

    Ext.MessageBox.show({
      title: 'Request Submitted',
      msg: 'Please Wait...',
      closable: false
    });

    if (!recipientId || -1 < recipientId.toLowerCase().indexOf('error')) {
      Ext.Msg.alert('Missing required information', 'Please enter the member ID.', function () {
        me.lookupReference('memberIdRef').focus();
      });

      return false;
    }

    if (!this.lookupReference('startDate_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the start date.', function () {
        me.lookupReference('startDate_newAuth').focus();
      });
      authRequestLayout.setActiveItem(0);
      this.lookupReference('startDate_newAuth').focus();

      return false;
    } else if (!this.lookupReference('endDate_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the end date.', function () {
        me.lookupReference('endDate_newAuth').focus();
      });
      authRequestLayout.setActiveItem(0);
      this.lookupReference('endDate_newAuth').focus();

      return false;
    } else if (!this.lookupReference('levelOfService_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the level of service.', function () {
        me.lookupReference('levelOfService_newAuth').focus();
      });
      authRequestLayout.setActiveItem(0);
      this.lookupReference('levelOfService_newAuth').focus();

      return false;
    } else if (!this.lookupReference('requestType_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the request type.', function () {
        me.lookupReference('requestType_newAuth').focus();
      });
      authRequestLayout.setActiveItem(0);
      this.lookupReference('requestType_newAuth').focus();

      return false;
    } else if (!this.lookupReference('procedureCategoryCombo').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the Procedure Category.', function () {
        me.lookupReference('procedureCategoryCombo').focus();
      });
      authRequestLayout.setActiveItem(0);
      this.lookupReference('procedureCategoryCombo').focus();

      return false;
    } else if (!this.lookupReference('placeOfService_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the place of service.', function () {
        me.lookupReference('placeOfService_newAuth').focus();
      });
      authRequestLayout.setActiveItem(0);
      this.lookupReference('placeOfService_newAuth').focus();

      return false;
    } else if (!this.lookupReference('requestingProvider').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the requesting provider.', function () {
        me.lookupReference('requestingProvider').focus();
      });
      authRequestLayout.setActiveItem(0);
      this.lookupReference('requestingProvider').focus();

      return false;
    } else if (!this.lookupReference('reviewType_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the review type.', function () {
        me.lookupReference('reviewType_newAuth').focus();
      });
      authRequestLayout.setActiveItem(0);
      this.lookupReference('reviewType_newAuth').focus();

      return false;
    } else if (this.lookup('servicingProvRefe').value === '' && this.lookup('servicingFacRef').value === '') {
      authRequestLayout.setActiveItem(0);
      Ext.Msg.alert('Missing required information', 'Please enter a Servicing Provider, Servicing Facility, or Both.', function () {
        me.lookupReference('servicingProvRefe').focus();
        me.lookupReference('servicingFacRef').focus();
        me.lookupReference('servicingFacRef').blur();
      });

      return false;
    } else if (!this.lookupReference('subjectCombo').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the Subject.', function () {
        me.lookupReference('subjectCombo').focus();
      });
      authRequestLayout.setActiveItem(2);
      this.lookupReference('subjectCombo').focus();

      return false;
    } else if (!this.lookupReference('contactCombo').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the Contact.', function () {
        me.lookupReference('contactCombo').focus();
      });
      authRequestLayout.setActiveItem(2);
      this.lookupReference('contactCombo').focus();

      return false;
    } else if (!this.lookupReference('noteName_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the Name.', function () {
        me.lookupReference('noteName_newAuth').focus();
      });
      authRequestLayout.setActiveItem(2);
      this.lookupReference('noteName_newAuth').focus();

      return false;
    } else if (!this.lookupReference('notePhone_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the Phone.', function () {
        me.lookupReference('notePhone_newAuth').focus();
      });
      authRequestLayout.setActiveItem(2);
      this.lookupReference('notePhone_newAuth').focus();

      return false;
    } else if (!this.lookupReference('noteNote_newAuth').validate()) {
      Ext.Msg.alert('Missing required information', 'Please enter the Note.', function () {
        me.lookupReference('noteNote_newAuth').focus();
      });
      authRequestLayout.setActiveItem(2);
      this.lookupReference('noteNote_newAuth').focus();

      return false;
    }


    var startDate = Ext.Date.format(new Date(me.lookupReference('startDate_newAuth').getRawValue()), 'Y-m-d');
    var endDate = Ext.Date.format(new Date(me.lookupReference('endDate_newAuth').getRawValue()), 'Y-m-d');

    if (endDate < startDate) {
      Ext.Msg.alert('Validation Error', 'End Date cannot be before Start Date');

      return false;
    }

    var maxEndDate = Ext.Date.format(Ext.Date.add(new Date(me.lookupReference('startDate_newAuth').getRawValue()), Ext.Date.MONTH, 12), 'Y-m-d');

    if (endDate > maxEndDate) {
      Ext.Msg.alert('Auth Request - Validation Error', 'The End Date cannot exceed 1 year from the Start Date', function () {
        me.lookupReference('endDate_newAuth').focus();
      });
      authRequestLayout.setActiveItem(0);
      me.lookupReference('endDate_newAuth').focus();

      return false;
    }

    var storeProcedure = vm.getStore('authProcedureStore');
    var storeDiag = vm.getStore('authDiagnosisStore');

    if (0 === storeProcedure.data.length) {
      Ext.Msg.alert('Auth Request - Validation Error', 'At least one procedure is required.');

      return false;
    }
    var returnFlag = true;
    var newAuthServiceProcedureGrid = me.lookupReference('newAuthServiceProcedureGrid');
    var newAuthServiceDiagGrid = me.lookupReference('newAuthServiceDiagGrid');
    var sel = newAuthServiceProcedureGrid.getSelectionModel().getSelection();
    var model = sel[0];
    var selectedProcServiceLineNumber = model.get('serviceLineNumber');

    storeProcedure.each(function (procRecord) {
      storeDiag.filter('procServiceLineNumber', procRecord.get('serviceLineNumber'));
      if (0 === storeDiag.data.length) {
        newAuthServiceProcedureGrid.getView().getRow(newAuthServiceProcedureGrid.store.indexOf(procRecord)).style.backgroundColor = '#FFE2E2';
        authRequestLayout.setActiveItem(1);


        Ext.Msg.alert('Auth Request - Validation Error', 'At least one diagnosis is required for each procedure. Check the procedure(s) marked in red and add a diagnosis.');
        returnFlag = false;
      } else {
        newAuthServiceProcedureGrid.getView().getRow(newAuthServiceProcedureGrid.store.indexOf(procRecord)).style.backgroundColor = '#E2FFE2';
      }
      storeDiag.clearFilter(true);
      newAuthServiceDiagGrid.store.clearFilter(true);
      newAuthServiceDiagGrid.store.filter('procServiceLineNumber', selectedProcServiceLineNumber);
    });
    if (!returnFlag) {
      return false;
    }


        // ideally these should be replaced with a form field
    var servProvId = vm.get('servProvId'),
      servProv = vm.get('servProv'),
      servFacId = vm.get('servFacId'),
      servFac = vm.get('servFac');

    if (!servProv && !servFac) {
      Ext.Msg.alert('Auth Request - Validation Error', 'Servicing provider or Facility provider is required', function () {
        if (!servProvId) {
          me.lookupReference('provLookupBtn').focus();
        } else if (!servFacId) {
          me.lookupReference('facLookupBtn').focus();
        }
      });
      authRequestLayout.setActiveItem(0);

      return false;
    }

    if ('' === this.lookupReference('noteNote_newAuth').getValue().trim() || '' === this.lookupReference('noteName_newAuth').getValue().trim() || '' === this.lookupReference('notePhone_newAuth').getValue().trim()) {
      Ext.Msg.alert('Auth Request - Validation Error', 'Please provide required information for notes section.');

      return false;
    }

    button.setDisabled(true);

    var servicesRecAll = [],
      workflowRecAll = [],
      servicediagRecAll = [],
      servicesRecTemp = {},
      workflowRecTemp = {},
      servicediagRecTemp = {};

    storeProcedure.each(function (procRecord) {
      if ('' != procRecord.get('cpt')) {
        servicesRecTemp = {
          dbaction: 'create',
          recipientID: vm.get('recipientId'),
          benefitPlanCode: vm.get('benefitPlanCode'),
          requestID: -1,
          serviceType: vm.get('workQueue'),
          serviceCode: procRecord.get('cpt'),
          serviceDescription: procRecord.get('description'),
          serviceReqUnits: procRecord.get('units'),
          serviceStatus: '',
          serviceLineNumber: procRecord.get('serviceLineNumber'),
          createUser: Atlas.user.un,
          endDate: Ext.Date.format(new Date(me.lookupReference('endDate_newAuth').getRawValue()), 'Y-m-d'),
          reviewType: me.lookupReference('reviewType_newAuth').getValue(),
          requestedBy: vm.get('AuthServiceRequestedBy'),
          startDate: Ext.Date.format(new Date(me.lookupReference('startDate_newAuth').getRawValue()), 'Y-m-d'),
          serviceMeasure: procRecord.get('measureCode'),
          rownum: 0,
          dbRowID: ''
        };
        servicesRecAll.push(servicesRecTemp);
        workflowRecTemp = {
          dbaction: 'create',
          workQueue: vm.get('workQueue'),
          createUser: Atlas.user.un,
          assignedToUser: 'Default User',
          assignedToUserType: 'NR',
          requestID: -1,
          serviceLineNumber: procRecord.get('serviceLineNumber')
        };
        workflowRecAll.push(workflowRecTemp);

        storeDiag.clearFilter();
        storeDiag.each(function (recordDiag) {
          if ('' !== recordDiag.get('cpt') && recordDiag.get('diagCode') !== undefined) {
            if (procRecord.get('serviceLineNumber') == recordDiag.get('procServiceLineNumber')) {
              servicediagRecTemp = {
                dbaction: 'create',
                requestID: -1,
                createUser: Atlas.user.un,
                diagnosisCode: recordDiag.get('diagCode').replace('.', ''),
                diagnosisOverrideDescr: recordDiag.get('description'),
                serviceLineNumber: procRecord.get('serviceLineNumber')
              };
              servicediagRecAll.push(servicediagRecTemp);
            }
          }
        });
      }
    });

    var odcdmasterRecFinal = me.mapMasterData(),
      providersRecFinal = me.mapProvidersData(),
      workflowRecAllFinal = workflowRecAll,
      servicesRecAllFinal = servicesRecAll,
      servicediagRecAllFinal = servicediagRecAll,
      notesRecFinal = me.mapNotesData();


    var setODCDAuthRequestStore = Ext.create('Atlas.portals.provider.model.SubmitODCDAuthRequest', {});

    setODCDAuthRequestStore.phantom = false;
    setODCDAuthRequestStore.getProxy().setExtraParam('pSessionID', Atlas.user.sessionId);
    setODCDAuthRequestStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    setODCDAuthRequestStore.getProxy().setExtraParam('ttmemberODCDmaster', {ttmemberODCDmaster: odcdmasterRecFinal});
    setODCDAuthRequestStore.getProxy().setExtraParam('ttmemberODCDProviders', {ttmemberODCDProviders: providersRecFinal});
    setODCDAuthRequestStore.getProxy().setExtraParam('ttmemberODCDWorkflow', {ttmemberODCDWorkflow: workflowRecAllFinal});
    setODCDAuthRequestStore.getProxy().setExtraParam('ttmemberODCDServices', {ttmemberODCDServices: servicesRecAllFinal});
    setODCDAuthRequestStore.getProxy().setExtraParam('ttmemberODCDServiceDiag', {ttmemberODCDServiceDiag: servicediagRecAllFinal});
    setODCDAuthRequestStore.getProxy().setExtraParam('ttnotesMaster', {ttnotesMaster: notesRecFinal});

    setODCDAuthRequestStore.save({
      success: function (response, operation, record) {
        var obj = Ext.JSON.decode(operation._response.responseText),
          requestID = obj.metadata.pRequestID;
      },
      failure: function (response, opts) {
        button.setDisabled(false);
        Ext.Msg.alert('Error', 'An error occurred while saving the record.\nError Code:' + response.get('pMessage'));
      },

      callback: function (records, operation) {
        if (operation.success) {
          var portalMemberFuncs = vm.getStore('portalFuncs'),
            obj = Ext.JSON.decode(operation._response.responseText),
            requestID = obj.metadata.pRequestID,
            pStatus = obj.metadata.pRequestStatus;

          portalMemberFuncs.getProxy().setExtraParam('pFunction', 'fGetAllIDForEligibility');
          portalMemberFuncs.getProxy().setExtraParam('pPlanId', null);
          portalMemberFuncs.getProxy().setExtraParam('pLobID', null);
          portalMemberFuncs.getProxy().setExtraParam('pRecipientID', null);
          portalMemberFuncs.getProxy().setExtraParam('pMemberID', me.lookup('memberIdRef').value);
          portalMemberFuncs.getProxy().setExtraParam('pMemberDOB', null);
          portalMemberFuncs.getProxy().setExtraParam('pPortalPlan', null);
          portalMemberFuncs.getProxy().setExtraParam('pPortalType', 'Provider');
          portalMemberFuncs.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
          portalMemberFuncs.load({
            scope: this,
            callback: function (record) {
              var vWhere = '',
                recipientID = record[1].data.value;

              vWhere = vWhere + ' recipientID=' + recipientID;

              var IOparamData = '{"ttParameters": [  ' +
                                '{     "parameterName": "pSessionID",     "parameterValue": "' + Atlas.user.sessionId + '"   },   ' +
                                '{     "parameterName": "pActionType",     "parameterValue": "get"   },   ' +
                                '{     "parameterName": "pScreenName",     "parameterValue": "portalSearch"   },   ' +
                                '{     "parameterName": "pUserName",     "parameterValue": "' + Atlas.user.un + '"   },   ' +
                                '{     "parameterName": "pRowid",     "parameterValue": null   },   ' +
                                '{     "parameterName": "pRowNum",     "parameterValue": "0"   },   ' +
                                '{     "parameterName": "pRows",     "parameterValue": "999"   },   ' +
                                '{     "parameterName": "pWhere",     "parameterValue": "' + vWhere + '"   },   ' +
                                '{     "parameterName": "pResultWhereStmt",     "parameterValue": ""   },   ' +
                                '{     "parameterName": "pSort",     "parameterValue": "startDate DESC"   },   ' +
                                '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },   ' +
                                '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },   ' +
                                '{     "parameterName": "viJSON",     "parameterValue": "{' + '\\"ttmemberODCDMaster' + '\\": [\\n]}\\n"   } ' +
                                ']}';

              var memberODCDStore = vm.getStore('memberODCDStore');

              memberODCDStore.getProxy().setExtraParam('pParamsIO', IOparamData);
              memberODCDStore.load({callback: function (record) {
                Ext.MessageBox.hide();
                me.onCancelClick();
                Ext.create('Ext.window.Window', {
                  title: 'Authorization Confirmation',
                  modal: true,
                  items: {
                    xtype: 'authrequestconfirmation',
                    viewModel: {data: {
                      oldTabWindow: me.getView(),
                      status: pStatus,
                      requestID: requestID,
                      systemID: record[0].data.ttmemberODCDMaster[0].systemID
                    }}
                  }
                }).show();
              }});
            }
          });
        }
      }
    });
  },

  mapMasterData: function () {
    var me = this,
      vm = me.getViewModel(),
      admitDate_newAuth = '',
      startDate = Ext.util.Format.date(new Date(this.lookupReference('startDate_newAuth').getRawValue()), 'Y-m-d'),
      endDate = Ext.util.Format.date(new Date(this.lookupReference('endDate_newAuth').getRawValue()), 'Y-m-d'),
      dischargeDate_newAuth = '',
      authRequestLayout = this.lookup('newAuthCardPanel').getLayout();

    if ('Inpatient' == this.lookupReference('levelOfService_newAuth').getRawValue()) {
      if ('' === this.lookupReference('admitDate_newAuth').getRawValue()) {
        Ext.Msg.alert('Auth Request - Validation Error', 'Inpatient type service requires admit date.', function () {
          me.lookupReference('admitDate_newAuth').focus();
        });
        authRequestLayout.setActiveItem(0);
        me.lookupReference('admitDate_newAuth').focus();

        return false;
      }

      admitDate_newAuth = Ext.Date.format(new Date(this.lookupReference('admitDate_newAuth').getRawValue()), 'Y-m-d');

      if ('' !== me.lookupReference('dischargeDate_newAuth').getRawValue()) {
        dischargeDate_newAuth = Ext.Date.format(new Date(this.lookupReference('dischargeDate_newAuth').getRawValue()), 'Y-m-d');
      }
            //admit & discharge validation
      if (admitDate_newAuth < startDate) {
        Ext.Msg.alert('Auth Request - Validation Error', 'The Admit date cannot be before the authorization Start date', function () {
          me.lookupReference('admitDate_newAuth').focus();
        });
        authRequestLayout.setActiveItem(0);
        me.lookupReference('admitDate_newAuth').focus();

        return false;
      }
      if (admitDate_newAuth > endDate) {
        Ext.Msg.alert('Auth Request - Validation Error', 'The Admit date cannot be after the authorization End date', function () {
          me.lookupReference('admitDate_newAuth').focus();
        });
        authRequestLayout.setActiveItem(0);
        me.lookupReference('admitDate_newAuth').focus();

        return false;
      }
      if ('' !== dischargeDate_newAuth && admitDate_newAuth > dischargeDate_newAuth) {
        Ext.Msg.alert('Auth Request - Validation Error', 'The Discharge date cannot be before Admit date', function () {
          me.lookupReference('dischargeDate_newAuth').focus();
        });
        authRequestLayout.setActiveItem(0);
        me.lookupReference('dischargeDate_newAuth').focus();

        return false;
      }

      if ('' !== dischargeDate_newAuth && dischargeDate_newAuth < startDate) {
        Ext.Msg.alert('Auth Request - Validation Error', 'Discharge date cannot be before authorization Start date.', function () {
          me.lookupReference('admitDate_newAuth').focus();
        });
        authRequestLayout.setActiveItem(0);
        me.lookupReference('admitDate_newAuth').focus();

        return false;
      }
      if ('' !== dischargeDate_newAuth && dischargeDate_newAuth > endDate) {
        Ext.Msg.alert('Auth Request - Validation Error', 'Discharge date cannot be past authorization End date.', function () {
          me.lookupReference('admitDate_newAuth').focus();
        });
        authRequestLayout.setActiveItem(0);
        me.lookupReference('admitDate_newAuth').focus();

        return false;
      }
    }

    var vAccidentRelatedFlag = false;
    var vAccidentInformation = '';
    var vOtherPrimaryPayor = false;
    var vOtherPrimaryPayorInformation = '';

    if (me.lookupReference('accidentRelatedFlag').getValue()) {
      vAccidentRelatedFlag = true;
      vAccidentInformation = this.lookupReference('accidentInformation').getValue();
      if ('' === vAccidentInformation || vAccidentInformation === undefined) {
        Ext.Msg.alert('Auth Request - Validation Error', 'Accidental Related selection requires additional information.', function () {
          me.lookupReference('accidentInformation').focus();
        });
        authRequestLayout.setActiveItem(0);
        this.lookupReference('accidentInformation').focus();

        return false;
      }
    }
    if (this.lookupReference('otherPrimaryPayor').getValue()) {
      vOtherPrimaryPayor = true;
      vOtherPrimaryPayorInformation = this.lookupReference('otherPrimaryPayorInformation').getValue();
      if ('' === vOtherPrimaryPayorInformation || vOtherPrimaryPayorInformation === undefined) {
        Ext.Msg.alert('Auth Request - Validation Error', 'Other primary payor selection requires additional information.', function () {
          me.lookupReference('otherPrimaryPayorInformation').focus();
        });
        authRequestLayout.setActiveItem(0);
        this.lookupReference('otherPrimaryPayorInformation').focus();

        return false;
      }
    }

    var jsonArray = [],
      vReferralSource = 'WebPortal',
      odcdmasterRec = {
        dbaction: 'create',
        requestID: -1,
        recipientID: vm.get('recipientId'),
        benefitPlanCode: vm.get('benefitPlanCode'),
        determinationType: '01',
        createUser: Atlas.user.un,
        startDate: Ext.Date.format(new Date(this.lookupReference('startDate_newAuth').getRawValue()), 'Y-m-d'),
        endDate: Ext.Date.format(new Date(this.lookupReference('endDate_newAuth').getRawValue()), 'Y-m-d'),
        levelOfservice: this.lookupReference('levelOfService_newAuth').getValue(),
        lobID: vm.get('lobID_newAuth'),
        placeOfServiceCode: this.lookupReference('placeOfService_newAuth').getValue(),
        referralSource: vReferralSource,
        requestType: this.lookupReference('requestType_newAuth').getValue(),
        reviewType: this.lookupReference('reviewType_newAuth').getValue(),
        reviewTypeDesc: vm.get('reviewType_newAuth.rawValue'),
        dischargeDate: dischargeDate_newAuth,
        admitDate: admitDate_newAuth,
        levelOfCareCode: vm.get('levelOfCare_newAuth'),
        accidentRelatedFlag: vAccidentRelatedFlag,
        accidentInformation: vAccidentInformation,
        otherPrimaryPayor: vOtherPrimaryPayor,
        otherPrimaryPayorInformation: vOtherPrimaryPayorInformation,
        procedureCategoryID: this.lookupReference('procedureCategoryCombo').getValue()
      };

    jsonArray.push(odcdmasterRec);

    return jsonArray;
  },

  mapProvidersData: function () {
    var me = this,
      vm = me.getViewModel(),
      values = me.lookupReference('newAuthReferralTab').getForm().getValues(),
      servProv = vm.get('servProv'),
      servProvId = vm.get('servProvId'),
      servFac = vm.get('servFac'),
      servFacId = vm.get('servFacId'),
      providersRec = [],
      jsonArray = [],
      servicingProviderRec = {};

    if (servProv) {
      if (values.oonServProv_Reason) {
        servicingProviderRec = {
          dbaction: 'create',
          providerRole: 'ServicingProvider',
          requestID: -1,
          providerID: '',
          firstName: values.oonServProv_ProvName,
          lastName: values.oonServProv_ProvName,
          npiNumber: values.oonServProv_ProvNPI,
          practiceName: values.oonServProv_PracName,
          addressLine1: values.oonServProv_PracAddr1,
          addressLine2: values.oonServProv_PracAddr2,
          city: values.oonServProv_PracCity,
          state: values.oonServProv_PracState,
          zipCode: values.oonServProv_PracZip,
          phoneNumber: values.oonServProv_PracPhone,
          faxNumber: values.oonServProv_PracFax,
          OONReason: values.oonServProv_Reason,
          createUser: Atlas.user.un
        };
      } else {
        servicingProviderRec = {
          dbaction: 'create',
          providerID: servProvId,
          providerRole: 'ServicingProvider',
          requestID: -1,
          createUser: Atlas.user.un
        };
      }
      providersRec.push(servicingProviderRec);
    }
    if (servFac) {
      var servicingFacilityRec = {};

      if (values.oonServFac_Reason) {
        servicingFacilityRec = {
          dbaction: 'create',
          providerRole: 'ServicingFacility',
          requestID: -1,
          providerID: '',
          firstName: values.oonServFac_ProvName,
          lastName: values.oonServFac_ProvName,
          npiNumber: values.oonServFac_ProvNPI,
          practiceName: values.oonServFac_PracName,
          addressLine1: values.oonServFac_PracAddr1,
          addressLine2: values.oonServFac_PracAddr2,
          city: values.oonServFac_PracCity,
          state: values.oonServFac_PracState,
          zipCode: values.oonServFac_PracZip,
          phoneNumber: values.oonServFac_PracPhone,
          faxNumber: values.oonServFac_PracFax,
          OONReason: values.oonServFac_Reason,
          createUser: Atlas.user.un
        };
      } else {
        servicingFacilityRec = {
          dbaction: 'create',
          providerID: servFacId,
          providerRole: 'ServicingFacility',
          requestID: -1,
          createUser: Atlas.user.un
        };
      }

      providersRec.push(servicingFacilityRec);
    }
    if (values.requestingProvider) {
      var requestingProviderRec = {
        dbaction: 'create',
        providerID: values.requestingProvider,
        providerRole: 'RequestingProvider',
        requestID: -1,
        createUser: Atlas.user.un
      };

      providersRec.push(requestingProviderRec);
    }
    jsonArray.push(providersRec);

    return providersRec;
  },

  mapNotesData: function () {
    var me = this,
      jsonArray = [],
      vNote = me.lookupReference('noteNote_newAuth').getValue().replace(/[^A-z.,?!@#$%&*+-=0-9]/ig, ' ').replace(/\n/g, '\\\\n ').replace(/\//g, '-').replace(/"/g, '-').replace(/'/g, '-'),
      vName = me.lookupReference('noteName_newAuth').getValue(),
      vPhone = me.lookupReference('notePhone_newAuth').getValue(),
      vExtension = me.lookupReference('noteExtension_newAuth').getValue();

    vNote = vNote + '\\n Name: ' + vName + '\\n Phone: ' + vPhone + '\\n Extension: ' + vExtension;
    var temp = {
      dbaction: 'create',
      parentTableName: 'memberODCDMaster',
      parentTableSystemID: '',
      noteSeqNumber: '1',
      noteContact: this.lookupReference('contactCombo').getValue(),
      noteSubject: this.lookupReference('subjectCombo').getValue(),
      noteText: vNote
    };

    jsonArray.push(temp);

    return jsonArray;
  }
});