/**
 * Created by b6636 on 11/14/2016.
 * Feat. K-Swiss (k3279)
 */
Ext.define('Atlas.portals.provider.InstitutionalClaimsViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsproviderinstitutionalclaims',

  listen: {
    controller: {
      'portalsproviderprofessionalclaimsobvisitswindow': {
        obVisitsUpdated: 'updateOBVisits'
      }
    }
  },

  init: function () {
    this.loadPageFromRedirect();
    this.loadProviderStore();
    this.loadMemberPlans();
    this.setLtssBoolean();
    this.loadListItems('TypeOfBill', 'billTypes');
    this.loadListItems('AdmitType', 'admitTypes');
    this.loadListItems('AdmitSource', 'admitSources');
    this.loadListItems('DischargeStatus', 'dischStatuses');
    this.loadHours('admitHours');
    this.loadHours('dischHours');
    this.loadRevCodes('|Medicaid', 'revCode');
    this.getViewModel().set('validationText', 'The following fields are required to Submit/Resubmit a Claim or to' +
    ' Add/Remove services:<br/><ul>' +
    '<li>Provider</li>' +
    '<li>Member ID</li>' +
    '<li>Billing NPI</li>' +
    '<li>Billing TIN</li>' +
    '<li>Billing Taxonomy</li>' +
    '<li>Type Of Bill</li>' +
    '<li>Statement From</li>' +
    '<li>Statement Thru</li>' +
    '<li>Admit Date</li>' +
    '<li>Admit Hour</li>' +
    '<li>Type</li>' +
    '<li>Source</li>' +
    '<li>Discharge Hour</li>' +
    '<li>Discharge Status</li>' +
    '<li>Diagnoses Codes</li>' +
    '<li>Admit Diagnoses</li>' +
    '</ul>');
    this.getViewModel().set('diagnosesText', 'The following fields are required to enter Diagnoses Codes:<br/><ul>' +
    '<li>Provider</li>' +
    '<li>Member ID</li>' +
    '<li>Billing NPI</li>' +
    '<li>Billing TIN</li>' +
    '<li>Billing Taxonomy</li>' +
    '<li>Type Of Bill</li>' +
    '<li>Statement From</li>' +
    '<li>Statement Thru</li>' +
    '<li>Admit Date</li>' +
    '<li>Admit Hour</li>' +
    '<li>Type</li>' +
    '<li>Source</li>' +
    '<li>Discharge Hour</li>' +
    '<li>Discharge Status</li>' +
    '</ul>');
  },

  createClaim: function () {
    this.resetPage();
    if (-1 === this.getView().getViewModel().get('providerId')) {
      Ext.Msg.alert('Information', 'Please select a provider from the drop down to auto populate billing NPI/Medicaid' +
      ' ID and TIN numbers');
    }
  },

  submitClaim: function () {
    var dischDate = this.lookupReference('dischargeDate'),
      form = this.lookupReference('institutionalClaimForm'),
      user = Ext.first('viewport').getViewModel().get('user'),
      me = this,
      alertsPanel = this.lookup('alertsPanel'),
      alerts = this.lookup('alertsDisplayField'),
      parameters = form.getValues(),
      vFieldsHeader = null,
      vFieldListHeader = this.buildFieldsListHeader(),
      vFieldListServLine = 'linenum|revCode|proccd|ndc|mod1|mod2|mod3|mod4|servFromDate|units|chargeamt',
      vFieldsServLine = this.buildFieldsServLine(),
      controlNumber = this.getView().getViewModel().get('controlNumber'),
      submitClaimModel = Ext.create('Atlas.portals.provider.model.SubmitClaimWeb', {}),
      claimsHeaderMasterModel = Ext.create('Atlas.portals.provider.model.ClaimHeaderMasterWeb', {});

    if (!this.validateForm(form, parameters)) {
      return;
    }
    if (!parameters.obVisits) {
      parameters.obVisits = '|||||||||||||||||||';
    }
    
    // enables the dischargeDate field then disables after parameters are built
    dischDate.setDisabled(false);
    vFieldsHeader = this.buildFieldsHeader(parameters);
    dischDate.setDisabled(true);

    Ext.MessageBox.show({
      title: 'Submitted',
      msg: 'Please Wait...',
      closable: false
    });

    submitClaimModel.phantom = false;
    submitClaimModel.getProxy().setExtraParam('pUsername', user.un);
    submitClaimModel.getProxy().setExtraParam('pFieldListheader', vFieldListHeader);
    submitClaimModel.getProxy().setExtraParam('pFieldsHeader', vFieldsHeader);
    submitClaimModel.getProxy().setExtraParam('pFieldListDetail', vFieldListServLine);
    submitClaimModel.getProxy().setExtraParam('pFieldsDetail', vFieldsServLine);
    submitClaimModel.getProxy().setExtraParam('pPrevControlnum', controlNumber);
    submitClaimModel.save({
      callback: function (record, operation) {
        var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
          result = metadata.pResult,
          rejectionString = '',
          rejectionArray = record.getData().TT1,
          i = 0;

        if (!record && !record.data) {
          return;
        }

        me.getView().getViewModel().set('controlNumber', metadata.pNewControlnum);

        for (i = 0; i < rejectionArray.length; i++) {
          rejectionString += i + 1 + '. ' + rejectionArray[i].editdesc + '<br>';
        }

        me.loadServiceClaimStore(); //pass claim id
        me.getView().getViewModel().set('isClaimsEditTabVisited', true);

        claimsHeaderMasterModel.getProxy().setExtraParam('pRowID', 0);
        claimsHeaderMasterModel.getProxy().setExtraParam('pRowNum', 0);
        claimsHeaderMasterModel.getProxy().setExtraParam('pRows', 200);
        claimsHeaderMasterModel.getProxy().setExtraParam('pWhere', 'controlNum=\'' + metadata.pNewControlnum +
        '\'|1|25');
        claimsHeaderMasterModel.getProxy().setExtraParam('pSort', 'claimNumber');
        claimsHeaderMasterModel.load({
          callback: function (claimsHeaderRecord) {
            switch (result) {
            case 'A7':
              Ext.Msg.alert('Claim Submission Response', 'This claim has been rejected. Please look at the notes' +
              ' given. Claim Number is ' + claimsHeaderRecord.data.claimNumber + '.');

              alerts.setValue('<font color="red">This claim has been rejected. Reasons as to why it has been rejected' +
              ' are below. Claim Number is ' + claimsHeaderRecord.data.claimNumber + '.<br><br>' + rejectionString +
              '<br>Please make the neccessary edits, then resubmit.</font>');

              alertsPanel.setHidden(false);
              break;
            case 'A1':
              Ext.Msg.alert('Claim Submission Response', 'This claim has been accepted for further review. Claim ' +
              'Number is ' + claimsHeaderRecord.data.claimNumber + '.');

              me.resetPage();

              alerts.setValue('<font color="green">This claim has been accepted for further review. Claim Number is ' +
              claimsHeaderRecord.data.claimNumber + '.</font>');

              me.getView().getViewModel().set('controlNumber', '');
              alertsPanel.setHidden(false);
              break;
            case 'F0':
              Ext.Msg.alert('Claim Submission Response', 'This claim has been processed. Claim Number is ' +
              claimsHeaderRecord.data.claimNumber + '.');

              me.resetPage();

              alerts.setValue('<font color="green">This claim has been processed. Claim Number is ' +
              claimsHeaderRecord.data.claimNumber + '.</font>');

              me.getView().getViewModel().set('controlNumber', '');
              alertsPanel.setHidden(false);
              break;
            default:
              Ext.Msg.alert('Claim Submission Response', result + 'Claim Number is ' +
              claimsHeaderRecord.data.claimNumber + '.');

              alerts.setValue('<font color="green">' + result + 'Claim Number is ' +
              claimsHeaderRecord.data.claimNumber + '.</font>');

              alertsPanel.setHidden(false);
            }
          }
        });
      }
    });
  },

  buildFieldsHeader: function (parameters) {
    var fields = '',
      formValues = this.lookup('institutionalClaimForm').getValues(),
      diagCodes = formValues.diagnosisCodes.split(','),
      i = 0;

    fields += 'UB92|' + this.getView().getViewModel().get('recipientId') + '|' +
    this.getView().getViewModel().get('lobId') + '|' + (parameters.billingNpi ? parameters.billingNpi : '') + '|XX|' +
    (parameters.serviceNpi ? parameters.serviceNpi : '') + '|XX|' +
    (parameters.billingTin ? parameters.billingTin : '') + '|' +
    (parameters.billingTaxonomy ? parameters.billingTaxonomy : '') + '|' +
    (parameters.billingTaxonomy ? parameters.attendingTaxonomy : '') + '|' +
    (parameters.billingTaxonomy ? parameters.attendingFirstName : '') + '|' +
    (parameters.billingTaxonomy ? parameters.attendingLastName : '') + '|' +
    (parameters.billingTaxonomy ? parameters.attendingNPI : '') + '|' +
    (parameters.patientAccountNumber ? parameters.patientAccountNumber : '') + '|' + formValues.drgCode + '|' +
    formValues.priorAuthNumber + '|' + formValues.billType + '|' + formValues.origRefNum + '|' +
    formValues.stmtFromDate + '|' + formValues.stmtThruDate + '|' + formValues.admitDate + '|' + formValues.admitHour +
    '|' + formValues.admitType + '|' + formValues.admitSource + '|' + formValues.dischargeDate + '|' +
    formValues.dischargeStatus + '|' + formValues.dischHour + '|' + formValues.condCodes[0] + '|' +
    formValues.condCodes[1] + '|' + formValues.condCodes[2] + '|' + formValues.condCodes[3] + '|' +
    formValues.condCodes[4] + '|' + formValues.condCodes[5] + '|' + formValues.condCodes[6] + '|' +
    formValues.occurCodes[0] + '|' + formValues.occurDates[0] + '|' + formValues.occurCodes[1] + '|' +
    formValues.occurDates[1] + '|' + formValues.occurCodes[2] + '|' + formValues.occurDates[2] + '|' +
    formValues.occurCodes[3] + '|' + formValues.occurDates[3] + '|' + formValues.occurCodes[4] + '|' +
    formValues.occurDates[4] + '|' + formValues.occurCodes[5] + '|' + formValues.occurDates[5] + '|' +
    formValues.spanCodes[0] + '|' + formValues.spanFromDate[0] + '|' + formValues.spanThruDate[0] + '|' +
    formValues.spanCodes[1] + '|' + formValues.spanFromDate[1] + '|' + formValues.spanThruDate[1] + '|' +
    formValues.valueCode1[0] + '|' + formValues.valueAmt[0] + '|' + formValues.valueCode1[1] + '|' +
    formValues.valueAmt[1] + '|' + formValues.valueCode1[2] + '|' + formValues.valueAmt[2] + '|' +
    formValues.valueCode1[3] + '|' + formValues.valueAmt[3] + '|' + formValues.valueCode1[4] + '|' +
    formValues.valueAmt[4] + '|' + formValues.valueCode1[5] + '|' + formValues.valueAmt[5] + '|' +
    formValues.valueCode1[6] + '|' + formValues.valueAmt[6] + '|' + formValues.valueCode1[7] + '|' +
    formValues.valueAmt[7] + '|' + formValues.valueCode1[8] + '|' + formValues.valueAmt[8] + '|' +
    formValues.valueCode1[9] + '|' + formValues.valueAmt[9] + '|' + formValues.valueCode1[10] + '|' +
    formValues.valueAmt[10] + '|' + formValues.valueCode1[11] + '|' + formValues.valueAmt[11] + '|' +
    formValues.surgProcCode[0] + '|' + formValues.surgProcDate[0] + '|' + formValues.surgProcCode[1] + '|' +
    formValues.surgProcDate[1] + '|' + formValues.surgProcCode[2] + '|' + formValues.surgProcDate[2] + '|' +
    formValues.surgProcCode[3] + '|' + formValues.surgProcDate[3] + '|' + formValues.surgProcCode[4] + '|' +
    formValues.surgProcDate[4] + '|' + formValues.surgProcCode[5] + '|' + formValues.surgProcDate[5] + '|';

    for (i = 0; 25 > i; i++) {
      if (diagCodes[i] === undefined) {
        fields += '|';
      } else {
        fields += diagCodes[i].replace('.', '') + '|';
      }
    }

    fields += formValues.admitDiag.replace('.', '') + '|' +
    formValues.operationProvNPI + '|' + formValues.otherCarrier + '|' + formValues.paidAmount + '|' +
    formValues.insured + '|' + formValues.denyReason + '|' + formValues.notesText + '|' + parameters.obVisits;

    return fields;
  },

  buildFieldsListHeader: function () {
    return 'formtype|sbrid|lobid|billprovid|billprovidqual|serviceprovid|serviceprovidqual|fedtaxid|' +
    'billProvTaxonomy|attProvTaxonomy|attProvFirstName|attProvLastName|attProvId|provclaimrefnum|drgCode|priorauthnum|billType|origrefnum|stmtFromDate|stmtThruDate|admitdate' +
    '|admitHour|admitType|admitSource|dischargeDate|dischargeStatus|dischargeHour|condCodes[1]|condCodes[2]|' +
    'condCodes[3]|condCodes[4]|condCodes[5]|condCodes[6]|condCodes[7]|occurCodes[1]|occurCodes[1]|occurCodes[2]|' +
    'occurCodes[2]|occurCodes[3]|occurCodes[3]|occurCodes[4]|occurCodes[4]|occurCodes[5]|occurCodes[5]|occurCodes[6]|' +
    'occurCodes[6]|spanCodes[1]|spanFromDate[1]|spanThruDate[1]|spanCodes[2]|spanFromDate[2]|spanThruDate[2]|' +
    'valueCode[1]|valueAmt[1]|valueCode[2]|valueAmt[2]|valueCode[3]|valueAmt[3]|valueCode[4]|valueAmt[4]|valueCode[5]' +
    '|valueAmt[5]|valueCode[6]|valueAmt[6]|valueCode[7]|valueAmt[7]|valueCode[8]|valueAmt[8]|valueCode[9]|valueAmt[9]' +
    '|valueCode[10]|valueAmt[10]|valueCode[11]|valueAmt[11]|valueCode[12]|valueAmt[12]|surgProcCode[1]|' +
    'surgProcDate[1]|surgProcCode[2]|surgProcDate[2]|surgProcCode[3]|surgProcDate[3]|surgProcCode[4]|surgProcDate[4]|' +
    'surgProcCode[5]|surgProcDate[5]|surgProcCode[6]|surgProcDate[6]|diagCd1|diagcd2|diagcd3|diagcd4|diagcd5|diagcd6' +
    '|diagcd7|diagcd8|diagcd9|diagcd10|diagcd11|diagcd12|diagcd13|diagcd14|diagcd15|diagcd16|diagcd17|diagcd18|' +
    'diagcd19|diagcd20|diagcd21|diagcd22|diagcd23|diagcd24|diagcd25|admitDiagCd|otherprovid|otherpayername' +
    '|otherinpaidamt|insured|adjrsncode[1]|remarks|obvisit1|obvisit2|obvisit3|obvisit4|obvisit5|obvisit6|obvisit7|obvisit8|' +
    'obvisit9|obvisit10|obvisit11|obvisit12|obvisit13|obvisit14|obvisit15|obvisit16|obvisit17|obvisit18|obvisit19|' +
    'obvisit20';
  },

  buildFieldsServLine: function () {
    var serviceClaims = this.getView().getViewModel().getStore('serviceClaims'),
      list = '',
      currentItem = '',
      i = 0;

    for (i = 0; i < serviceClaims.count(); i++) {
      currentItem = serviceClaims.getData().items[i];
      list += (currentItem.get('lineNum') ? currentItem.get('lineNum') : '') + '|';
      list += (currentItem.get('revCode') ? currentItem.get('revCode') : '') + '|';
      list += (currentItem.get('servLnProcCode') ? currentItem.get('servLnProcCode') : '') + '|';
      list += (currentItem.get('servLnNDC') ? currentItem.get('servLnNDC') : '') + '|';
      list += (currentItem.get('servLnMod1') ? currentItem.get('servLnMod1') : '') + '|';
      list += (currentItem.get('servLnMod2') ? currentItem.get('servLnMod2') : '') + '|';
      list += (currentItem.get('servLnMod3') ? currentItem.get('servLnMod3') : '') + '|';
      list += (currentItem.get('servLnMod4') ? currentItem.get('servLnMod4') : '') + '|';
      list += (currentItem.get('servLnFromDate') ? this.formatDate(currentItem.get('servLnFromDate')) : '') + '|';
      list += (currentItem.get('servLnUnits') ? currentItem.get('servLnUnits') : '') + '|';
      list += currentItem.get('servLnBilled') ? currentItem.get('servLnBilled') : '';

      if (i !== serviceClaims.count() - 1) {
        list += '^';
      }
    }

    return list;
  },

  buildFieldsListServLine: function () {
    return 'linenum|revCode|proccd|ndc|mod1|mod2|mod3|mod4|servFromDate|units|chargeamt';
  },

  validateForm: function (form, parameters) {
    var vm = this.getViewModel(),
      statementFromDate = this.lookup('stmtFromDate').value,
      statementThruDate = this.lookup('stmtThruDate').value,
      currentDate = new Date();

    if (form.isValid()) {
      if ('21' === parameters.placeOfService && !parameters.admitDate) {
        Ext.Msg.alert('Claim Header/Detail Validation', 'Admit Date is required when place of service is Inpatient' +
        ' Hospital');

        return false;
      }
      if (this.getView().getViewModel().get('isLtss')) {
        if (!parameters.billingNpi || !parameters.billingTin || !parameters.priorAuthNumber) {
          Ext.Msg.alert('Claim Header/Detail Validation', 'Valid NPI/Medicaid ID, LTSS Auth#, LTSS proc code are' +
          'required to submit an LTSS claim.');

          return false;
        }
      }
      if (this.getView().getViewModel().get('isEditing')) {
        Ext.Msg.alert('Validation Error', 'Please save the service line before submitting claim.');

        return false;
      }
      if (0 >= this.getView().getViewModel().getStore('serviceClaims').count()) {
        Ext.Msg.alert('Validation Error', 'Please submit claim with at least one service line.');

        return false;
      }
      if (statementFromDate > currentDate) {
        Ext.Msg.alert('Validation Error', 'Statement From Date cannot be a future date.');

        return false;
      }
      if (statementThruDate > currentDate) {
        Ext.Msg.alert('Validation Error', 'Statement Thru Date cannot be a future date.');

        return false;
      }
      if (statementFromDate > statementThruDate) {
        Ext.Msg.alert('Validation Error', 'Statement Thru Date must be after Statement From Date.');

        return false;
      }
      if (!this.validateStatementDatesAdmitDate(parameters.admitDate)) {
        return false;
      }

      return true;
    }

    Ext.Msg.alert('Validation Error', vm.get('validationText'));

    return false;
  },

  loadPageFromRedirect: function () {
    var claimId = this.getView().claimId;

    this.getView().getViewModel().set('isClaimsEditTabVisited', true);
    if (!claimId) {
      this.resetPage();

      return;
    }
    this.getHCFADetails(claimId);
    this.loadServiceClaimStore(claimId);
  },

  getHCFADetails: function (claimId) {
    var whereClause = 'claimNumber = ' + claimId + '|1|1',
      claimModel = Ext.create('Atlas.portals.provider.model.ProviderClaimSearchResult', {}),
      me = this,
      claimForm = me.lookupReference('institutionalClaimForm'),
      providerCombo = me.lookupReference('providerCombo');

    if (!claimId || '0' === claimId) {
      return;
    }

    claimModel.getProxy().setExtraParam('pRowid', '');
    claimModel.getProxy().setExtraParam('pRowNum', 50);
    claimModel.getProxy().setExtraParam('pRows', 200);
    claimModel.getProxy().setExtraParam('pWhere', whereClause);
    claimModel.getProxy().setExtraParam('pSort', 'claimNumber desc');
    claimModel.load({
      callback: function (record) {
        var i = 0,
          j = 0,
          k = 0,
          el = 0,
          em = 0,
          en = 0,
          oh = 0,
          pi = 0,
          diagCodes = [],
          diagCode = null;

        // load the form
        claimForm.loadRecord(record);
        // load conditionCodes
        for (i = 1; 7 >= i; i++) {
          me.lookupReference('condCode' + i).setValue(record.data.condCodes[i - 1]);
        }

        for (j = 1; 6 >= j; j++) {
          me.lookupReference('occurCode' + j).setValue(record.data.occurCodes[j - 1]);
        }

        for (k = 1; 6 >= k; k++) {
          me.lookupReference('occurDate' + k).setValue(record.data.occurDates[k - 1]);
        }

        me.lookupReference('spanCd1').setValue(record.data.spanCodes[0]);
        me.lookupReference('spanCd2').setValue(record.data.spanCodes[1]);
        me.lookupReference('spanFromDate1').setValue(record.data.spanFromDate[0]);
        me.lookupReference('spanFromDate2').setValue(record.data.spanFromDate[1]);
        me.lookupReference('spanThruDate1').setValue(record.data.spanThruDate[0]);
        me.lookupReference('spanThruDate2').setValue(record.data.spanThruDate[1]);

        for (el = 1; 12 >= el; el++) {
          me.lookupReference('valueCode' + el).setValue(record.data.valueCode[el - 1]);
        }

        for (em = 1; 12 >= em; em++) {
          me.lookupReference('valueAmt' + em).setValue(record.data.valueAmt[em - 1]);
        }

        for (en = 1; 6 >= en; en++) {
          me.lookupReference('surgProcCode' + en).setValue(record.data.surgProcCode[en - 1]);
        }

        for (oh = 1; 6 >= oh; oh++) {
          me.lookupReference('surgProcDate' + oh).setValue(record.data.surgProcDate[oh - 1]);
        }

        //diagnosisCodes
        for (pi = 1; 25 >= pi; pi++) {
          diagCode = record.data['diagCd' + pi];
          if (diagCode) {
            diagCodes.push(record.data.diagCd1);
          }
        }
        me.lookupReference('diagnosisCodes').setValue(diagCodes.join(','));

        providerCombo.setValue(record.data.servProvId);
      }
    });
  },

  loadServiceClaimStore: function (claimId) {
    var serviceStore = this.getView().getViewModel().getStore('serviceClaims'),
      me = this;

    if (!claimId) {
      return;
    }

    serviceStore.getProxy().setExtraParam('pClaimNum', claimId);
    serviceStore.load({
      callback: function (records) {
        var valid = true,
          minDate = '',
          i = 0;

        if (!records && !records.length) {
          Ext.Msg.alert('Error', 'No Service Line found for this claim.');

          return;
        }

        for (i = 0; i < records.length; i++) {
          if (records[i].get('servLnFromDate') && records[i].get('servLnToDate')) {
            valid = me.validateStatementDatesSpan(records[i].get('servLnFromDate'), records[i].get('servLnToDate'));
            if (!valid) {
              break;
            }
          }
        }

        if (valid) {
          minDate = me.getMinServiceDateInGrid();
          if (minDate) {
            me.getView().getViewModel().set('minServiceDate', minDate);
          }
        }
      }
    });
  },

  setLtssBoolean: function () {
    var providerType = Ext.first('viewport').getViewModel().get('user').providerGroupType;

    this.getView().getViewModel().set('isLtss', 'LTSS' === providerType);
  },

  loadProviderStore: function () {
    var providerStore = this.getView().getViewModel().getStore('providers'),
      user = Ext.first('viewport').getViewModel().get('user'),
      me = this,
      providerId = me.getView().getViewModel().get('providerId');

    providerStore.getProxy().setExtraParam('pUserName', user.un);
    providerStore.load({
      callback: function () {
        if (-1 !== providerId) {
          me.lookupReference('providerCombo').setValue(providerId);
        }
      }
    });
  },

  onSameAsBillingChange: function (checkbox, value) {
    var billingInput = this.lookupReference('billingNpi'),
      facilityInput = this.lookupReference('facilityNpi');

    if (value) {
      facilityInput.setValue(billingInput.value);
    } else {
      facilityInput.setValue('');
    }
  },

  onProviderSelect: function (combo, record) {
    this.lookupReference('institutionalClaimForm').reset();
    this.getView().getViewModel().set('isClaimsEditTabVisited', false);
    this.resetPage();
    if (!record.get('provID')) {
      return;
    }
    this.getView().getViewModel().set('providerId', record.get('provID'));
    this.loadProviderData(record.get('provID'));
    this.lookup('providerCombo').setValue(record.getData().provID);
  },

  onPlaceOfServiceSelect: function (combo, record) {
    var admitDateInput = this.lookupReference('admitDate');

    admitDateInput.allowBlank = '21' !== record.get('value');
    admitDateInput.validateValue(admitDateInput.getValue());
  },

  loadMemberPlans: function () {
    var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
      plansStore = {},
      plansCombo = this.lookupReference('memberPlan');

    listItemsModel.getProxy().setExtraParam('pListName', 'ProvPortalPlanLOB');
    listItemsModel.load({
      callback: function (record, operation) {
        var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
          plansMap = [],
          splitValues = results.split('^'),
          i = 0;

        if (!results) {
          return;
        }

        for (i = 0; i < splitValues.length; i++) {
          plansMap.push({
            key: splitValues[i],
            value: splitValues[i + 1]
          });

          i += 1;
        }

        plansStore = new Ext.data.ArrayStore({});
        plansStore.add(plansMap);
        plansCombo.setStore(plansStore);
      }
    });
  },

  onMemberPlanSelected: function () {
    this.onMemberIdBlur(this.lookupReference('memberId'));
  },

  onMemberIdBlur: function (input) {
    if (input.value) {
      this.getMemberDetails(input.value);
    }
  },

  getMemberDetails: function (memberId) {
    var planCombo = this.lookupReference('memberPlan'),
      plan = '',
      memberIdStore = this.getView().getViewModel().getStore('memberIds'),
      me = this;

    if (!planCombo.disabled) {
      plan = planCombo.getValue();
      planCombo.disable();
      planCombo.setValue('');
    }

    memberIdStore.getProxy().setExtraParam('pFunction', 'fGetAllID');
    memberIdStore.getProxy().setExtraParam('pPlanId', '');
    memberIdStore.getProxy().setExtraParam('pLobID', plan);
    memberIdStore.getProxy().setExtraParam('pMemberID', memberId);
    memberIdStore.getProxy().setExtraParam('pRecipientID', '');
    memberIdStore.getProxy().setExtraParam('pMemberDOB', '');
    memberIdStore.getProxy().setExtraParam('pPortalPlan', '');
    memberIdStore.getProxy().setExtraParam('pPortalType', 'Provider');
    memberIdStore.load({
      callback: function (records) {
        var response = records[0].data.value;

        if (!records && !records.length) {
          Ext.Msg.alert('Error', 'There was an error searching for this member.');

          return;
        }

        if (0 < response.indexOf('Duplicate')) {
          planCombo.enable();

          return;
        }

        if (0 > response.indexOf('ERROR')) {
          me.lookupReference('memberId').setValue(records[0].get('value'));
          me.getView().getViewModel().set('recipientId', records[1].get('value'));
          me.getMemberData(records[1].get('value'));

          return;
        }

        me.lookupReference('memberName').setValue('Member not found');
        me.getView().getViewModel().set('memberTermDate', '');
        me.getView().getViewModel().set('recipientId', '');
        me.lookup('memberId').setValue('');
        Ext.Msg.alert('Error', 'Invalid Member ID entered');
      }
    });
  },

  getMemberData: function (recipientId) {
    var me = this,
      memberDataModel = Ext.create('Atlas.portals.hpmember.model.MemberDataWeb', {}),
      fields = 'lastName,firstName,@primaryLOB,@contCoverageTerm,gender';

    memberDataModel.getProxy().setExtraParam('pRecipientID', recipientId);
    memberDataModel.getProxy().setExtraParam('pAppServerID', '');
    memberDataModel.getProxy().setExtraParam('portalPlan', '');
    memberDataModel.getProxy().setExtraParam('pFieldList', fields);
    memberDataModel.load({
      callback: function (record) {
        if (!record) {
          Ext.Msg.alert('Error', 'There was an error searching for this member.');

          return;
        }

        if (!record.get('lastName')) {
          me.lookupReference('memberName').setValue('Member not found');
          me.getView().getViewModel().set('memberTermDate', '');

          return;
        }

        me.lookupReference('memberName').setValue(record.get('lastName') + ', ' + record.get('firstName'));
        me.getView().getViewModel().set('lobId', record.get('@primaryLOB'));
        me.getView().getViewModel().set('memberTermDate',
                    record.get('@contCoverageTerm') ? record.get('@contCoverageTerm') : ''
                );
      }
    });
  },

  onDiagCodeBlur: function (input) {
    var diagCode = input.value.trim(),
      whereClause = '',
      diagCodeModel = Ext.create('Atlas.portals.provider.model.DiagCodeMaster', {});

    if (!diagCode) {
      return;
    }

    input.setValue(this.formatDiagCode(diagCode));
    whereClause = 'diagCode=\'' + input.getValue().replace('.', '') + '\'';

    diagCodeModel.getProxy().setExtraParam('pRowid', '0');
    diagCodeModel.getProxy().setExtraParam('pRowNum', 0);
    diagCodeModel.getProxy().setExtraParam('pRows', 0);
    diagCodeModel.getProxy().setExtraParam('pWhere', whereClause);
    diagCodeModel.getProxy().setExtraParam('pSort', '');
    diagCodeModel.load({
      callback: function (record) {
        if (!record && !record.data) {
          Ext.Msg.alert('Error', 'Could not validate code at this time.');

          return;
        }
        if (record.data.diagCode) {
          input.setValidation(true);

          return;
        }

        input.markInvalid('Invalid Diagnosis Code Entered');
      }
    });
  },

  formatDiagCode: function (value) {
    var formattedValue = '',
      tempCode = '';

    if (!value) {
      return null;
    }
    formattedValue = value.toUpperCase().replace(',', '');
    tempCode = formattedValue.replace('.', '');

    if (3 <= tempCode.length) {
      formattedValue = tempCode.substr(0, 3) + '.';
      if (3 < tempCode.length) {
        formattedValue += tempCode.substr(3);
      }
    }

    return formattedValue;
  },

  formatDate: function (newDate) {
    var date = new Date(newDate);

    if (!newDate) {
      return null;
    }

    return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
  },

  resetPage: function () {
    var providerCombo = this.lookup('providerCombo'),
      providerSpecialty = this.lookup('providerSpecialty'),
      providerComboValue = this.lookup('providerCombo').value,
      providerSpecialtyValue = this.lookup('providerSpecialty').value,
      alerts = this.lookup('alertsDisplayField'),
      alertsPanel = this.lookup('alertsPanel');

    alerts.setValue('');
    alertsPanel.setHidden(true);
    this.lookupReference('institutionalClaimForm').reset();
    this.getView().getViewModel().getStore('serviceClaims').removeAll();
    this.lookupReference('billingTaxonomy').setValue(this.getView().getViewModel().get('billingTaxonomy'));
    this.lookupReference('billingNpi').setValue(this.getView().getViewModel().get('billingNpi'));
    this.lookupReference('billingTin').setValue(this.getView().getViewModel().get('billingTin'));
    providerCombo.setValue(providerComboValue);
    providerSpecialty.setValue(providerSpecialtyValue);
  },

  loadProviderData: function (providerId) {
    var providerDataModel = Ext.create('Atlas.portals.provider.model.ProviderDataExtWeb', {}),
      user = Ext.first('viewport').getViewModel().get('user'),
      form = this.lookupReference('institutionalClaimForm'),
      me = this,
      fieldsList = 'provID, lastName, firstName, @PCP, @inPlan, @acceptNewPatients, @providerType, @provOpen, ' +
      '@providerSpecialty, npinNum, @primaryTIN, @taxonomy';

    providerDataModel.getProxy().setExtraParam('pProvID', providerId);
    providerDataModel.getProxy().setExtraParam('pUserName', user.un);
    providerDataModel.getProxy().setExtraParam('pFieldList', fieldsList);
    providerDataModel.getProxy().setExtraParam('pLobID', '');
    providerDataModel.load({
      callback: function (record) {
        var str = JSON.stringify(record.data),
          converted = {};

        if (!str) {
          return;
        }
        str = str.replace(/@|\./g, '');

        converted = JSON.parse(str);
        converted.pcp = 'yes' === converted.PCP;
        converted.inPlan = 'yes' === converted.inPlan;
        converted.accepting = 'yes' === converted.acceptNewPatients;
        converted.open = 'yes' === converted.provOpen;

        record.data = {};
        record.data = converted;

        form.loadRecord(record);
        me.lookupReference('billingNpi').setValue(converted.npinNum);
        me.lookupReference('billingTin').setValue(converted.primaryTIN);
        me.lookup('billingTaxonomy').setValue(converted.taxonomy);
        me.getView().getViewModel().set('billingNpi', converted.npinNum);
        me.getView().getViewModel().set('billingTin', converted.primaryTIN);
        me.getView().getViewModel().set('billingTaxonomy', converted.taxonomy);
      }
    });
  },

  onPriorAuthSearch: function () {
    var memberInput = this.lookupReference('memberId').value,
      recipientId = this.getView().getViewModel().get('recipientId'),
      authMasterStore = this.getView().getViewModel().getStore('memberODCDs'),
      me = this,
      vWhere = ' recipientID=' + recipientId,
      IOparamData = null;

    if (!memberInput) {
      Ext.Msg.alert('Error', 'Please enter the Member ID.');

      return;
    }

    if (!recipientId) {
      Ext.Msg.alert('Error', 'Sorry. Could not search for Prior Auth#. Please contact System' +
      'Administrator or Helpdesk.');

      return;
    }

    IOparamData = String('{"ttParameters": [' +
    '{     "parameterName": "pSessionID",     "parameterValue": "' + Atlas.user.sessionId + '"   },   ' +
    '{     "parameterName": "pActionType",     "parameterValue": "get"   },   ' +
    '{     "parameterName": "pScreenName",     "parameterValue": "portalSearch"   },   ' +
    '{     "parameterName": "pUserName",     "parameterValue": "' + Atlas.user.un + '"   },   ' +
    '{     "parameterName": "pRowid",     "parameterValue": null   },   ' +
    '{     "parameterName": "pRowNum",     "parameterValue": "0"   },   ' +
    '{     "parameterName": "pRows",     "parameterValue": "999"   },   ' +
    '{     "parameterName": "pWhere",     "parameterValue": "' + vWhere + '"   },   ' +
    '{     "parameterName": "pResultWhereStmt",     "parameterValue": "') + '"   },   ' +
    '{     "parameterName": "pSort",     "parameterValue": "startDate DESC"   },   ' +
    '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },   ' +
    '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },   ' +
    '{     "parameterName": "viJSON",     "parameterValue": "{\\"ttmemberODCDMaster\\": [\\n]}\\n"   }]}';

    authMasterStore.getProxy().setExtraParam('pParamsIO', IOparamData);
    authMasterStore.load({
      callback: function (record) {
        if (!record || 0 === record.length) {
          Ext.Msg.alert('Error', 'No Prior Auth# found for this member.');

          return;
        }
        me.getAuthInquiryStore(record);
      }
    });
  },

  getAuthInquiryStore: function (record) {
    var authInquiryRecord = record['0'].data.ttmemberODCDMaster,
      authInquiryArray = [],
      individualArray = [],
      authInquiryStore = null,
      i = 0;

    for (i = 0; i < authInquiryRecord.length; i++) {
      individualArray.push(authInquiryRecord[i].PlaceOfserviceDesc);
      individualArray.push(authInquiryRecord[i].RequestingProviderID);
      individualArray.push(authInquiryRecord[i].ServicingFacilityID);
      individualArray.push(authInquiryRecord[i].ServicingProviderID);
      individualArray.push(authInquiryRecord[i].benefitPlanCode);
      individualArray.push(authInquiryRecord[i].endDate);
      individualArray.push(authInquiryRecord[i].levelOfService);
      individualArray.push(authInquiryRecord[i].levelOfServiceDesc);
      individualArray.push(authInquiryRecord[i].memberID);
      individualArray.push(authInquiryRecord[i].memberName);
      individualArray.push(authInquiryRecord[i].placeOfServiceCode);
      individualArray.push(authInquiryRecord[i].procedureCategoryDesc);
      individualArray.push(authInquiryRecord[i].procedureCategoryID);
      individualArray.push(authInquiryRecord[i].recipientID);
      individualArray.push(authInquiryRecord[i].requestID);
      individualArray.push(authInquiryRecord[i].requestStatus);
      individualArray.push(authInquiryRecord[i].servicingFacility);
      individualArray.push(authInquiryRecord[i].servicingFacilityName);
      individualArray.push(authInquiryRecord[i].servicingProvider);
      individualArray.push(authInquiryRecord[i].servicingProviderName);
      individualArray.push(authInquiryRecord[i].startDate);
      individualArray.push(authInquiryRecord[i].dbRowID);
      individualArray.push(authInquiryRecord[i].systemID);
      authInquiryArray.push(individualArray);
    }

    authInquiryStore = new Ext.data.ArrayStore({
      fields: ['PlaceOfServiceDesc', 'RequestingProviderID', 'ServicingFacilityID', 'ServicingProviderID',
        'benefitPlanCode', 'endDate', 'levelOfService', 'levelOfServiceDesc', 'memberID', 'memberName',
        'placeOfServiceCode', 'procedureCategoryDesc', 'procedureCategoryID', 'recipientID', 'requestID',
        'requestStatus', 'servicingFacility', 'servicingFacilityName', 'servicingProvider', 'servicingProviderName',
        'startDate', 'dbRowID', 'systemID'],
      data: authInquiryArray,
      pageSize: 15,
      proxy: {
        type: 'memory',
        enablePaging: true
      }
    });

    this.showPriorAuthSearch(authInquiryStore);
  },

  showPriorAuthSearch: function (store) {
    var me = this;

    Ext.create('Ext.window.Window', {
      title: 'Prior Auth Search',
      modal: true,
      width: 450,
      items: {
        xtype: 'gridpanel',
        height: 300,
        reference: 'authGrid',
        columns: [
          {
            text: 'Request Id',
            dataIndex: 'requestID'
          },
          {
            text: 'Status',
            dataIndex: 'requestStatus'
          },
          {
            text: 'Start',
            dataIndex: 'startDate'
          },
          {
            text: 'End',
            dataIndex: 'endDate'
          },
          {
            text: 'Level of Service',
            dataIndex: 'levelOfService'
          },
          {
            text: 'Procedure Category',
            dataIndex: 'procedureCategoryDesc'
          },
          {
            text: 'Servicing Provider',
            dataIndex: 'servicingProvider'
          },
          {
            text: 'Servicing Facility',
            dataIndex: 'servicingFacility'
          }
        ],
        store: store,
        listeners: {
          rowdblclick: function (grid, record) {
            me.priorAuthSelected(record.get('requestID'));
            this.getView().up().up().destroy();
          }
        },
        bbar: {
          xtype: 'toolbar',
          items: [
            {
              text: 'OK',
              handler: function () {
                var grid = this.up().up(),
                  selections = grid.getSelectionModel().getSelected().items;

                if (0 < selections.length) {
                  me.priorAuthSelected(selections[0].get('requestID'));
                }
                this.up().up().up().destroy();
              }
            }, {
              text: 'Cancel',
              handler: function () {
                this.up().up().up().destroy();
              }
            }
          ]
        }
      }
    }).show();
  },

  showObVisits: function () {
    var visits = this.lookupReference('obVisits').value,
      visitsWindow = Ext.create('Ext.window.Window', {
        title: 'OB Visit Dates',
        modal: true,
        items: {
          xtype: 'portalsproviderprofessionalclaimsobvisitswindow',
          reference: 'visitsWindow',
          viewModel: {
            data: {
              obVisits: visits
            }
          }
        }
      });

    visitsWindow.show();
  },

  updateOBVisits: function (obVisits) {
    this.lookupReference('obVisits').setValue(obVisits);
  },

  priorAuthSelected: function (authId) {
    this.lookupReference('priorAuthNumber').setValue(authId);
  },

    // Input Listener Events
  onPriorAuthNumberBlur: function () {
    var priorAuthId = this.lookupReference('priorAuthNumber'),
      memberId = this.lookupReference('memberId').value,
      recipientId = this.getView().getViewModel().get('recipientId'),
      validateAuthModel = Ext.create('Atlas.portals.provider.model.ValidatePriorAuthType', {}),
      whereClause = '';

    if (this.getView().getViewModel().get('isLtss') && priorAuthId.value) {
      if (!memberId) {
        Ext.Msg.alert('Error', 'Please enter the member Id.');

        return;
      }

      if (!recipientId) {
        Ext.Msg.alert('Error', 'Sorry. Could not validate Prior Auth#. Please contact System' +
        'Administrator or Helpdesk.');
        priorAuthId.setValue('');

        return;
      }

      whereClause += 'recipientID = ' + recipientId;
      whereClause += priorAuthId.value ? ' and authId=' + priorAuthId : '';
      validateAuthModel.getProxy().setExtraParam('pRecipientId', recipientId);
      validateAuthModel.getProxy().setExtraParam('pPriorAuthId', priorAuthId);
      validateAuthModel.getProxy().setExtraParam('pAuthType', 'LTSS');
      validateAuthModel.getProxy().setExtraParam('pWhere', whereClause);
      validateAuthModel.load({
        callback: function (record) {
          if (!record && !record.get('pResult')) {
            Ext.Msg.alert('Error', 'Sorry. Could not validate Prior Auth#. Please contact System' +
            'Administrator or Helpdesk.');

            return;
          }

          if ('success' !== record.get('pResult')) {
            Ext.Msg.alert('Error', 'Invalid Prior Auth# entered.');
            priorAuthId.setValue('');
          }
        }
      });
    }
  },

  onAdmitDateBlur: function () {
    var admitDate = this.lookupReference('admitDate'),
      validDate = true;

    if (admitDate.value) {
      validDate = this.validateStatementDatesAdmitDate(admitDate.value);
      if (!validDate) {
        admitDate.markInvalid('Invalid Admit Date Entered');

        return;
      }
      admitDate.setValidation(true);
    }
  },

  onStatementThruBlur: function () {
    var statementThruValue = this.lookup('stmtThruDate').value,
      dischDate = this.lookup('dischargeDate');

    dischDate.setValue(statementThruValue);
    dischDate.setDisabled(true);
  },

  onPayerBlur: function (input) {
    var carrier = this.lookupReference('otherpayername'),
      paidAmount = this.lookupReference('otherInsPaidAmt'),
      denyReason = this.lookupReference('denyReason');

    if (input.value) {
      paidAmount.allowBlank = false;
      denyReason.allowBlank = false;
      carrier.allowBlank = false;

      return;
    }

    paidAmount.allowBlank = true;
    denyReason.allowBlank = true;
    carrier.allowBlank = true;
  },

  onServiceLineFromDateBlur: function (input) {
    var fromDate = input.value,
      admitDate = this.lookupReference('admitDate'),
      minDate = new Date(),
      valid = true;

    if (!fromDate) {
      return;
    }
    valid = this.validateStatementDatesSpan(fromDate, fromDate);
    if (!valid) {
      input.setValue('');

      return;
    }
    minDate = this.getMinServiceDateInGrid();

    if (minDate) {
      this.getView().getViewModel().set('minServiceDate', minDate);
    } else {
      this.getView().getViewModel().set('minServiceDate', '');
    }

    if (admitDate.value) {
      if (new Date(fromDate).getTime() < new Date(admitDate.value).getTime()) {
        input.setValue('');
        Ext.Msg.alert('Error', 'Invalid Service Line Date. Service Dates cannot be before the' +
        'Admit Date.');

        return;
      }
      input.validate();
    }
  },

  onServiceLineToDateBlur: function (input) {
    var vm = this.getView().getViewModel(),
      toDate = input.value,
      fromDate = input.up().getComponent('servLnFromDate'),
      admitDate = this.lookupReference('admitDate'),
      minDate = new Date(),
      valid = true;

    if (!toDate) {
      return;
    }
    valid = this.validateStatementDatesSpan(fromDate.value, toDate);
    if (!valid) {
      input.setValue('');
      fromDate.setValue('');

      return;
    }
    minDate = this.getMinServiceDateInGrid();

    if (!minDate) {
      vm.set('minServiceDate', '');
    }
    if (!vm.get('minServiceDate') || new Date(toDate).getTime() < new Date(vm.get('minServiceDate')).getTime()) {
      vm.set('minServiceDate', toDate);
    } else if (minDate && new Date(minDate).getTime < new Date(vm.get('minServiceDate')).getTime()) {
      vm.set('minServiceDate', minDate);
    }

    if (admitDate.value) {
      if (new Date(fromDate.value).getTime() < new Date(admitDate.value).getTime()) {
        input.setValue('');
        fromDate.setValue('');
        Ext.Msg.alert('Error', 'Invalid Service Line Date. Service Dates cannot be before the Admit' +
        'Date.');

        return;
      }
      input.validate();
      fromDate.validate();
    }
  },

  onServiceLineDiagCodeBlur: function (input) {
    var numDiagEntered = 0,
      diagCode = input.value.trim(),
      tmpSplitStr = [],
      tmpNumeric = '12345678',
      i = 0;

    if (!input.value || '0' === input.value) {
      Ext.Msg.alert('Claim Detail Validation', 'Service line Diag Code is mandatory.');

      return;
    }

    numDiagEntered += this.lookupReference('diagCode1').value ? 1 : 0;
    numDiagEntered += this.lookupReference('diagCode2').value ? 1 : 0;
    numDiagEntered += this.lookupReference('diagCode3').value ? 1 : 0;
    numDiagEntered += this.lookupReference('diagCode4').value ? 1 : 0;
    numDiagEntered += this.lookupReference('diagCode5').value ? 1 : 0;
    numDiagEntered += this.lookupReference('diagCode6').value ? 1 : 0;
    numDiagEntered += this.lookupReference('diagCode7').value ? 1 : 0;
    numDiagEntered += this.lookupReference('diagCode8').value ? 1 : 0;

    if (0 < numDiagEntered) {
      if (0 > input.value.indexOf(',')) {
        if (1 === input.value.length) {
          if (parseInt(input.value) > numDiagEntered) {
            if (1 === numDiagEntered) {
              Ext.Msg.alert('Claim Detail Validation', 'Service Line Diag Code value should be 1.');
            } else {
              Ext.Msg.alert('Claim Detail Validation', 'Service Line Diag Code value should be 1 through ' +
              numDiagEntered + ' - separated by comma.');
            }
            input.setValue('');
          }
        } else {
          if (1 === numDiagEntered) {
            Ext.Msg.alert('Claim Detail Validation', 'Service Line Diag Code value should be 1.');
          } else {
            Ext.Msg.alert('Claim Detail Validation', 'Service Line Diag Code value should be 1 through ' +
            numDiagEntered + ' - separated by comma.');
          }
          input.setValue('');
        }
      } else {
        diagCode = diagCode.replace(',,', ',');
        tmpSplitStr = diagCode.split(',');

        for (i = 0; i < tmpSplitStr.length; i++) {
          if (tmpNumeric.includes(tmpSplitStr[i])) {
            if (parseInt(tmpSplitStr[i]) > numDiagEntered) {
              Ext.Msg.alert('Claim Detail Validation', 'Service Line Diag Code value should be 1 through ' +
              numDiagEntered + ' - separated by comma.');
              input.setValue('');

              return;
            }
          } else {
            Ext.Msg.alert('Claim Detail Validation', 'Invalid Service Line Diag Code value or separator. Value' +
            'should be 1 through ' + numDiagEntered + ' - separated by comma.');
            input.setValue('');

            return;
          }
        }
      }
    } else {
      Ext.Msg.alert('Claim Header Validation', 'Diag Code1 in the claim header is mandatory.');
    }
  },

  onServLnProcCodeBlur: function (input) {
    var procCode = input.value,
      procDescription = input.up().getComponent('servLnProcCodeDesc'),
      fromDate = input.up().getComponent('servLnFromDate').value,
      procModel = Ext.create('Atlas.portals.provider.model.ProcMasterWeb', {}),
      me = this;

    if (this.lookup('servFromDate').validate()) {
      procDescription.setValue('');
      input.setValue(input.value.toUpperCase());
      if (!procCode) {
        return;
      }
      if (!new RegExp('[A-Za-z0-9]+').test(procCode.trim())) {
        Ext.Msg.alert('Proc Code Validation', 'Please enter a single procedure code per service line.');
        input.setValue('');
        input.focus();
      }

      procModel.getProxy().setExtraParam('pDate', fromDate);
      procModel.getProxy().setExtraParam('pLobID', this.getView().getViewModel().get('lobId'));
      procModel.getProxy().setExtraParam('pProcCode', procCode);
      procModel.getProxy().setExtraParam('pAuthType', Ext.first('viewport').getViewModel().get('user').
      providerGroupType);
      procModel.load({
        callback: function (record, operation) {
          var response = Ext.JSON.decode(operation._response.responseText).metadata;

          if (!response && !response.pFields) {
            return;
          }
          procDescription.setValue(response.pFields);
          if ('procedure not found' === response.pFields.toLowerCase() ||
                        'procedure not active' === response.pFields.toLowerCase()) {
            input.setValue('');
            Ext.Msg.alert('Proc Code Validation', response.pFields);

            return;
          }
          me.getNdcRequirement(input);
        }
      });
    } else {
      Ext.Msg.alert('Services Validaion', 'Serv. From date is needed to input a Procedure Code.');
      this.lookup('servFromDate').setValue('');
    }
  },

  onFrequencyCodeSelect: function (combo, record) {
    this.getView().getViewModel().set('selectedFrequencyCode', record.get('key'));
  },

  getNdcRequirement: function (procInput) {
    var procCode = procInput.value,
      ndcInput = procInput.up().getComponent('servLnNDC'),
      listItemModel = Ext.create('Atlas.portals.provider.model.GetListDesc', {});

    listItemModel.getProxy().setExtraParam('pListName', 'NDCRequired');
    listItemModel.getProxy().setExtraParam('pListItem', procCode);
    listItemModel.load({
      callback: function (record, operation) {
        var metadata = '';

        if (!record && !record.data) {
          return;
        }
        metadata = Ext.JSON.decode(operation._response.responseText).metadata;
        if (!metadata.pListDesc) {
          ndcInput.allowBlank = true;
          ndcInput.validateValue(ndcInput.getValue());

          return;
        }

        ndcInput.allowBlank = false;
        ndcInput.validateValue(ndcInput.getValue());
        Ext.Msg.alert('Professional Claim Validation', 'NDC is required for this procedure code.');
      }
    });
  },

    // Service Grid Functions
  addService: function () {
    var vm = this.getViewModel(),
      statementFromDate = this.lookup('stmtFromDate').value,
      statementThruDate = this.lookup('stmtThruDate').value,
      form = this.lookupReference('institutionalClaimForm'),
      currentDate = new Date(),
      serviceModel = Ext.create('Atlas.portals.provider.model.RemitDetailWeb', {}),
      grid = this.lookupReference('serviceGrid');


    if (form.isValid()) {
      if (statementFromDate > currentDate) {
        Ext.Msg.alert('Validation Error', 'Statement From Date cannot be a future date.');

        return false;
      }
      if (statementThruDate > currentDate) {
        Ext.Msg.alert('Validation Error', 'Statement Thru Date cannot be a future date.');

        return false;
      }
      if (statementFromDate > statementThruDate) {
        Ext.Msg.alert('Validation Error', 'Statement Thru Date must be after Statement From Date.');

        return false;
      }

      grid.editingPlugin.cancelEdit();
      grid.getStore().insert(0, serviceModel);
      grid.editingPlugin.startEdit(0, 0);
      this.getView().getViewModel().set('isEditing', true);
    } else {
      Ext.Msg.alert('Validation Error', vm.get('validationText'));
    }

    return false;
  },

  removeService: function () {
    var grid = this.lookupReference('serviceGrid'),
      selections = grid.getSelectionModel().getSelected().items,
      selection = grid.getSelection();

    grid.editingPlugin.cancelEdit();
    if (!selections || 0 === selections.length) {
      Ext.Msg.alert('Information', 'Please select a row.');

      return;
    }

    grid.getStore().remove(selection);
  },

  cancelServiceUpdate: function (context, row) {
    this.getView().getViewModel().set('isEditing', false);
    if (row.record.get('servLnFromDate')) {
      return;
    }
    this.removeService();
  },

  maybeEditService: function (context, row) {
    var fromDate = row.record.get('servLnFromDate'),
      toDate = row.record.get('servLnToDate'),
      icdTen = this.dateIsICD10(new Date(fromDate)) && this.gridHasICD9Dates(),
      icdNine = this.dateIsICD9(new Date(fromDate)) && this.gridHasICD10Dates();

    this.getView().getViewModel().set('isEditing', false);
    if (!this.validateStatementDatesSpan(fromDate, toDate)) {
      Ext.Msg.alert('Service Line Validation Prompt', 'From / To Dates are Invalid.');
      this.removeService();
    }

    if (icdTen || icdNine) {
      Ext.Msg.alert('Service Line Validation Prompt', 'All Service Line dates must be either before 10/01/2015 or' +
      'starting from 10/1/2015.');
      this.removeService();
    }
  },

  beforeEditService: function () {
    this.getView().getViewModel().set('isEditing', true);
  },

  validateStatementDatesAdmitDate: function (date) {
    var grid = this.lookupReference('serviceGrid'),
      workFromDate = new Date(),
      valid = true,
      newDate = null,
      i = 0;

    if (!date) {
      return null;
    }

    newDate = new Date(date);

    for (i = 0; i < grid.getStore().getCount(); i++) {
      if (grid.getStore().getData().items[i].get('servLnFromDate') &&
      grid.getStore().getData().items[i].get('servLnToDate')) {
        workFromDate = new Date(grid.getStore().getData().items[i].get('servLnFromDate'));
        if (workFromDate.getTime() < newDate.getTime()) {
          Ext.Msg.alert('Service Line Admit Dates', 'Invalid Service Line Dates for Service Line ' + (i + 1) +
          '. Service Dates cannot be before the Admit Date.');
          valid = false;
        }
      }
    }

    return valid;
  },

  validateStatementDatesSpan: function (fromDate, toDate) {
    return this.validateDateRange(fromDate, toDate);
  },

  validateDateRange: function (fromDate, toDate) {
    var valid = true,
      memberTermDate = this.getView().getViewModel().get('memberTermDate');

    if (fromDate && memberTermDate) {
      if (new Date(fromDate).getTime() > new Date(memberTermDate).getTime()) {
        valid = false;
        Ext.Msg.alert('Error', 'Member enrollment was term\'d prior to From Date');
      }
    }

    if (!valid) {
      return valid;
    }

    if (fromDate && toDate) {
      if (new Date(toDate).getTime() < new Date(fromDate).getTime()) {
        valid = false;
        Ext.Msg.alert('Error', 'Statement Thru Date must be after Statement From Date.');
      }
    }

    return valid;
  },

  validateServiceDates: function () {
    var valid = true;

    return valid;
  },

  validateDiagnosisCodes: function () {
    var valid = true,
      i = 1;

    for (i = 1; 9 > i; i++) {
      this.onDiagCodeBlur(this.lookupReference('diagCode' + i));
      valid = this.lookupReference('diagCode' + i).getValidation();
      if (false === valid) {
        break;
      }
    }

    if (null === valid) {
      valid = true;
    }

    return valid;
  },

  getMinServiceDateInGrid: function () {
    var grid = this.lookupReference('serviceGrid'),
      minDate = '',
      workDate = '',
      i = 0;

    if (1 === grid.getStore().getCount()) {
      return null;
    }
    for (i = 0; i < grid.getStore().getCount(); i++) {
      if (grid.getStore().getData().items[i].get('servLnFromDate')) {
        workDate = new Date(grid.getStore().getData().items[i].get('servLnFromDate'));
        if (!minDate || workDate.getTime() < minDate.getTime()) {
          minDate = workDate;
        }
      }
      if (grid.getStore().getData().items[i].get('servLnToDate')) {
        workDate = new Date(grid.getStore().getData().items[i].get('servLnToDate'));
        if (!minDate || workDate.getTime() < minDate.getTime()) {
          minDate = workDate;
        }
      }
    }

    return minDate;
  },

  dateIsICD9: function (date) {
    var beforeDate = new Date('10/01/2015');

    return date.getTime() < beforeDate.getTime();
  },

  dateIsICD10: function (date) {
    var beforeDate = new Date('9/30/2015');

    return date.getTime() > beforeDate.getTime();
  },

  gridHasICD9Dates: function () {
    var services = this.lookupReference('serviceGrid').getStore().getData(),
      hasDates = false,
      i = 0;

    for (i = 0; i < services.items.length; i++) {
      if (services.items[i].get('servLnFromDate') && services.items[i].get('servLnToDate')) {
        hasDates = this.dateIsICD9(new Date(services.items[i].get('servLnFromDate')));
        if (hasDates) {
          break;
        }
      }
    }

    return hasDates;
  },

  gridHasICD10Dates: function () {
    var services = this.lookupReference('serviceGrid').getStore().getData(),
      hasDates = false,
      i = 0;

    for (i = 0; i < services.items.length; i++) {
      if (services.items[i].get('servLnFromDate') && services.items[i].get('servLnToDate')) {
        hasDates = this.dateIsICD10(new Date(services.items[i].get('servLnFromDate')));
        if (hasDates) {
          break;
        }
      }
    }

    return hasDates;
  },

  loadListItems: function (param, objectStore) {
    var vm = this.getViewModel(),
      dataModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
      objectArrayStore = vm.getStore(objectStore),
      objectArray = [];

    dataModel.getProxy().setExtraParam('pListName', param);
    dataModel.getProxy().setExtraParam('pUserName', '');
    dataModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    dataModel.load({
      callback: function (record, operation) {
        var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
          arrayData = metadata.pListItems.split('^'),
          i = 0;

        for (i = 0; i < arrayData.length; i += 2) {
          objectArray.push({
            'key': arrayData[i + 1] + ' - ' + arrayData[i],
            'value': arrayData[i + 1]
          });
        }

        objectArrayStore.getProxy().setData(null);
        objectArrayStore.getProxy().setData(objectArray);
        objectArrayStore.sort('key', 'ASC');
        objectArrayStore.reload();
      }
    });
  },

  loadHours: function (store) {
    var hourStore = this.getViewModel().getStore(store),
      objectArray = [],
      i = 0;

    for (i = 0; 24 > i; i++) {
      if (10 > i) {
        objectArray.push({
          'key': '0' + i,
          'value': '0' + i
        });
      } else {
        objectArray.push({
          'key': i,
          'value': i
        });
      }
    }

    hourStore.getProxy().setData(null);
    hourStore.getProxy().setData(objectArray);
    hourStore.sort('key', 'ASC');
    hourStore.reload();
  },

  onEnterDiagCodesClick: function () {
    var vm = this.getViewModel(),
      diagCodes = this.lookup('diagnosisCodes'),
      diagCodesWindow = null,
      admitDiag = this.lookup('admitDiag'),
      form = this.lookupReference('institutionalClaimForm');

    diagCodes.allowBlank = true;
    admitDiag.allowBlank = true;

    if (form.isValid()) {
      diagCodesWindow = new Atlas.portals.view.provider.InstitutionalClaimsDiagCodesWindow({
        itemConfig: {
          diagCodesTextarea: this.lookup('diagnosisCodes')
        }
      });

      diagCodesWindow.show();
    } else {
      Ext.Msg.alert('Validation Error', vm.get('diagnosesText'));
    }

    diagCodes.allowBlank = false;
    admitDiag.allowBlank = false;
  },

  onBlurDiagTextfield: function (record) {
    var value = record.getValue().split('.').join(''),
      beforeDecimal = value.substring(0, 3),
      afterDecimal = value.substring(3);

    if ('' !== value && 3 <= value.length) {
      record.setValue(beforeDecimal + '.' + afterDecimal);
    }

    this.diagCodeValidation(beforeDecimal + '.' + afterDecimal, record);
  },

  diagCodeValidation: function (diagCode, input) {
    var whereClause = '',
      diagCodeModel = Ext.create('Atlas.portals.provider.model.DiagCodeMaster', {});

    if (!diagCode) {
      return;
    }
    whereClause = 'diagCode=\'' + diagCode.replace('.', '') + '\'';

    diagCodeModel.getProxy().setExtraParam('pRowid', '0');
    diagCodeModel.getProxy().setExtraParam('pRowNum', 0);
    diagCodeModel.getProxy().setExtraParam('pRows', 0);
    diagCodeModel.getProxy().setExtraParam('pWhere', whereClause);
    diagCodeModel.getProxy().setExtraParam('pSort', '');
    diagCodeModel.load({
      callback: function (record) {
        if (!record && !record.data) {
          Ext.Msg.alert('Error', 'Could not validate code at this time.');

          return;
        }
        if (!record.data.diagCode && '' !== input.getValue()) {
          Ext.Msg.alert('Error', 'Invalid Diagnoses Code Entered.');
          input.setValue('');
        }
      }
    });
  },

  loadRevCodes: function (param, sort) {
    var revCodesStore = this.getView().getViewModel().getStore('revCodes');

    revCodesStore.getProxy().setExtraParam('pRowid', '0');
    revCodesStore.getProxy().setExtraParam('pRowNum', 0);
    revCodesStore.getProxy().setExtraParam('pRows', 0);
    revCodesStore.getProxy().setExtraParam('pWhere', param);
    revCodesStore.getProxy().setExtraParam('pSort', sort);
    revCodesStore.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    revCodesStore.load();
  },

  onSurgProcCodeBlur: function (cdField) {
    var procCodeModel = Ext.create('Atlas.portals.provider.model.SurgProcCodeMaster', {});

    procCodeModel.getProxy().setExtraParam('pRowid', 0);
    procCodeModel.getProxy().setExtraParam('pRowNum', 0);
    procCodeModel.getProxy().setExtraParam('pRows', 0);
    procCodeModel.getProxy().setExtraParam('pWhere', 'surgProcCode=\'' + cdField.lastValue + '\'');
    procCodeModel.getProxy().setExtraParam('pSort', 0);
    procCodeModel.load({
      callback: function (record) {
        if (record.data.wrdIdx === undefined) {
          Ext.Msg.alert('Error', 'Invalid Surgical Procedure Code Entered.');
          cdField.setValue('');
        }
      }
    });
  }
});