/**
 * Created by c4539 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.ProfessionalClaimsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsproviderprofessionalclaims',

    listen: {
        controller: {
            'portalsproviderprofessionalclaimsobvisitswindow': {
                obVisitsUpdated: 'updateOBVisits'
            }
        }
    },

    init: function() {
        this.loadPageFromRedirect();
        this.loadProviderStore();
        this.loadPlaceOfServiceStore();
        this.loadMemberPlans();
        this.setLtssBoolean();
    },

    createClaim: function() {
        this.resetPage();
        if (this.getView().getViewModel().get('providerId') === -1) {
            Ext.Msg.alert('Information', 'Please select a provider from the drop down to auto populate billing NPI/Medicaid ID and TIN numbers');
        }
    },

    submitClaim: function() {
        var form = this.lookupReference('professionalClaimForm'),
            user = Ext.first('viewport').getViewModel().get('user'),
            me = this,
            parameters = form.getValues(),
            vFieldListHeader = this.buildFieldsListHeader(),
            vFieldListServLine = this.buildFieldsListServLine(),
            vFieldsServLine = this.buildFieldsServLine(),
            controlNumber = this.getView().getViewModel().get('controlNumber'),
            submitClaimModel = Ext.create('Atlas.portals.provider.model.SubmitClaimWeb', {}),
            claimMasterModel = Ext.create('Atlas.portals.provider.model.ClaimHeaderMasterWeb', {});

        if (!this.validateForm(form, parameters)) { return; }
        if (!parameters.obVisits) { parameters.obVisits = '|||||||||||||||||||'; }

        var vFieldsHeader = this.buildFieldsHeader(parameters);

        submitClaimModel.phantom = false;
        submitClaimModel.getProxy().setExtraParam('pUsername', user.un);
        submitClaimModel.getProxy().setExtraParam('pFieldListheader', vFieldListHeader);
        submitClaimModel.getProxy().setExtraParam('pFieldsHeader', vFieldsHeader);
        submitClaimModel.getProxy().setExtraParam('pFieldListDetail', vFieldListServLine);
        submitClaimModel.getProxy().setExtraParam('pFieldsDetail', vFieldsServLine);
        submitClaimModel.getProxy().setExtraParam('pPrevControlnum', controlNumber);
        submitClaimModel.save({
            callback: function(record, operation) {
                var metadata = '',
                    result = '',
                    alerts = me.lookupReference('alertDisplayField'),
                    alertsString = '',
                    rejectionString = '';

                if (!record && !record.data) { return; }
                metadata = Ext.JSON.decode(operation._response.responseText).metadata;
                me.getView().getViewModel().set('controlNumber', metadata.pNewControlnum);
                result = metadata.pResult;

                claimMasterModel.getProxy().setExtraParam('pWhere', 'controlNum=\'' + metadata.pNewControlnum + '\'|1|1');
                claimMasterModel.getProxy().setExtraParam('pSort', 'claimNumber');
                claimMasterModel.load({
                    callback: function(claimRecord) {
                        var claimNumber = claimRecord.get('claimNumber');
                        if (record.data && record.data.TT1 && record.data.TT1.length > 0) {
                            for (var i = 0; i < record.data.TT1.length; i++) {
                                alertsString += (i+1) + '. ' + record.data.TT1[i].editdesc + '<br>'
                            }
                            rejectionString = '<font color="red">This claim has been rejected. Reasons why it has been rejected are below. Claim Number is ' + claimNumber + '.<br><br>' +
                                alertsString + '<br>Please make the neccessary edits, then resubmit.</font>';
                            alerts.setValue(rejectionString);
                            me.lookupReference('alertsToolbar').setHidden(false);
                        } else {
                            me.lookupReference('alertsToolbar').setHidden(true);
                        }

                        me.loadServiceClaimStore(); //pass claim id
                        me.getView().getViewModel().set('isClaimsEditTabVisited', true);

                        switch(result) {
                            case 'A7':
                                Ext.Msg.alert(
                                    'Claim Submission Response',
                                    rejectionString
                                );
                                break;
                            case 'A1':
                                Ext.Msg.alert(
                                    'Claim Submission Response',
                                    'This claim has been accepted for further review. Claim Number is ' + claimNumber + '.'
                                );
                                me.getView().getViewModel().set('controlNumber', '');
                                me.resetPage();
                                break;
                            case 'F0':
                                Ext.Msg.alert(
                                    'Claim Submission Response',
                                    'This claim has been processed. Claim Number is ' + claimNumber + '.'
                                );
                                me.getView().getViewModel().set('controlNumber', '');
                                me.resetPage();
                                break;
                            default:
                                Ext.Msg.alert(
                                    'Claim Submission Response',
                                    result + 'Claim Number is ' + claimNumber + '.'
                                );
                        }
                    }
                });
            }
        });
    },

    buildFieldsHeader: function(parameters) {
        var fields = '';

        fields += 'HCFA|';
        fields += this.getView().getViewModel().get('recipientId') + '|';
        fields += this.getView().getViewModel().get('lobId') + '|';
        fields += (parameters.billingNpi ? parameters.billingNpi : '') + '|';
        fields += 'XX|';
        fields += (parameters.billingTaxonomy ? parameters.billingTaxonomy : '') + '|';
        fields += (parameters.serviceNpi ? parameters.serviceNpi : '') + '|';
        fields += 'XX|';
        fields += (parameters.billingTin ? parameters.billingTin : '') + '|';
        fields += (parameters.serviceProviderTaxonomy ? parameters.serviceProviderTaxonomy : '') + '|';
        fields += (parameters.patientAccountNumber ? parameters.patientAccountNumber : '') + '|';
        fields += (parameters.priorAuthNumber ? parameters.priorAuthNumber : '') + '|';
        fields += (parameters.freqCode ? parameters.freqCode : '') + '|';
        fields += (this.getView().claimId ? this.getView().claimId : '') + '|';
        fields += (parameters.placeOfService ? parameters.placeOfService : '') + '|';
        fields += (parameters.facilityNpi ? parameters.facilityNpi : '') + '|';
        fields += '|';
        fields += '|';
        fields += (parameters.admitDate ? this.formatDate(parameters.admitDate) : '') + '|';
        fields += (parameters.dischargeDate ? this.formatDate(parameters.dischargeDate) : '') + '|';
        fields += (parameters.diagCode1 ? parameters.diagCode1.replace('.','') : '') + '|';
        fields += (parameters.diagCode2 ? parameters.diagCode2.replace('.','') : '') + '|';
        fields += (parameters.diagCode3 ? parameters.diagCode3.replace('.','') : '') + '|';
        fields += (parameters.diagCode4 ? parameters.diagCode4.replace('.','') : '') + '|';
        fields += (parameters.diagCode5 ? parameters.diagCode5.replace('.','') : '') + '|';
        fields += (parameters.diagCode6 ? parameters.diagCode6.replace('.','') : '') + '|';
        fields += (parameters.diagCode7 ? parameters.diagCode7.replace('.','') : '') + '|';
        fields += (parameters.diagCode8 ? parameters.diagCode8.replace('.','') : '') + '|';
        fields += (parameters.otherpayername ? parameters.otherpayername : '') + '|';
        fields += (parameters.otherinslastname ? parameters.otherinslastname : '') + '|';
        fields += (parameters.otherInsPaidAmt ? parameters.otherInsPaidAmt : '') + '|';
        fields += (parameters.denyReason ? parameters.denyReason : '') + '|';
        fields += (parameters.lmpdate ? this.formatDate(parameters.lmpdate) : '') + '|';
        fields += (parameters.remarks ? parameters.remarks : '') + '|';
        fields += parameters.obVisits;
        return fields;
    },

    buildFieldsListHeader: function() {
        var list = '';

        list += 'formtype|';
        list += 'sbrid|';
        list += 'lobid|';
        list += 'billprovid|';
        list += 'billprovidqual|';
        list += 'billProvTaxonomy|';
        list += 'serviceprovid|';
        list += 'serviceprovidqual|';
        list += 'fedtaxid|';
        list += 'serviceprovtaxonomy|';
        list += 'provclaimrefnum|';
        list += 'priorauthnum|';
        list += 'freqcode|';
        list += 'origrefnum|';
        list += 'pos|';
        list += 'facilityid|';
        list += 'facilityname|';
        list += 'facilitycity|';
        list += 'admitdate|';
        list += 'dischargedate|';
        list += 'diagcd1|';
        list += 'diagcd2|';
        list += 'diagcd3|';
        list += 'diagcd4|';
        list += 'diagcd5|';
        list += 'diagcd6|';
        list += 'diagcd7|';
        list += 'diagcd8|';
        list += 'otherpayername|';
        list += 'otherinslastname|';
        list += 'otherinspaidamt|';
        list += 'adjrsncode[1]|';
        list += 'lmpdate|';
        list += 'remarks|';
        list += 'obvisit1|';
        list += 'obvisit2|';
        list += 'obvisit3|';
        list += 'obvisit4|';
        list += 'obvisit5|';
        list += 'obvisit6|';
        list += 'obvisit7|';
        list += 'obvisit8|';
        list += 'obvisit9|';
        list += 'obvisit10|';
        list += 'obvisit11|';
        list += 'obvisit12|';
        list += 'obvisit13|';
        list += 'obvisit14|';
        list += 'obvisit15|';
        list += 'obvisit16|';
        list += 'obvisit17|';
        list += 'obvisit18|';
        list += 'obvisit19|';
        list += 'obvisit20';

        return list;
    },

    buildFieldsServLine: function() {
        var serviceClaims = this.getView().getViewModel().getStore('serviceClaims'),
            list = '',
            currentItem = '';

        for (var i = 0; i < serviceClaims.count(); i++) {
            currentItem = serviceClaims.getData().items[i];
            list += (currentItem.get('lineNum') ? currentItem.get('lineNum') : '') + '|';
            list += (currentItem.get('servLnFromDate') ? this.formatDate(currentItem.get('servLnFromDate')) : '') + '|';
            list += (currentItem.get('servLnToDate') ? this.formatDate(currentItem.get('servLnToDate')) : '') + '|';
            list += (currentItem.get('servLnProcCode') ? currentItem.get('servLnProcCode') : '') + '|';
            list += (currentItem.get('servLnNDC') ? currentItem.get('servLnNDC') : '') + '|';
            list += (currentItem.get('servLnUnits') ? currentItem.get('servLnUnits') : '') + '|';
            list += (currentItem.get('servLnBilled') ? currentItem.get('servLnBilled') : '') + '|';
            list += (currentItem.get('mod1') ? currentItem.get('mod1') : '') + '|';
            list += (currentItem.get('mod2') ? currentItem.get('mod2') : '') + '|';
            list += (currentItem.get('mod3') ? currentItem.get('mod3') : '') + '|';
            list += (currentItem.get('mod4') ? currentItem.get('mod4') : '') + '|';
            list += (currentItem.get('servLnDiagCode') ? currentItem.get('servLnDiagCode') : '') + '|';
            list += (currentItem.get('servLnOtherInsPaid') ? currentItem.get('servLnOtherInsPaid') : '');

            if (i !== serviceClaims.count() - 1) {
                list += '^';
            }
        }

        return list;
    },

    buildFieldsListServLine: function() {
        var list = '';

        list += 'linenum|';
        list += 'servfromdate|';
        list += 'servthrudate|';
        list += 'proccd|';
        list += 'ndc|';
        list += 'units|';
        list += 'chargeamt|';
        list += 'mod1|';
        list += 'mod2|';
        list += 'mod3|';
        list += 'mod4|';
        list += 'diagcdind|';
        list += 'otherpayerpaidamt[1]';

        return list;
    },

    validateForm: function(form, parameters) {
        var hasInvalidDiagCode = !this.checkIfCodesAreInvalid();
        if (form.isValid()) {
            if (parameters.placeOfService === '21' && !parameters.admitDate) {
                Ext.Msg.alert('Claim Header/Detail Validation', 'Admit Date is required when place of service is Inpatient Hospital');
                return false;
            }
            if (this.getView().getViewModel().get('isLtss')) {
                if (!parameters.billingNpi || !parameters.billingTin || !parameters.priorAuthNumber) {
                    Ext.Msg.alert('Claim Header/Detail Validation', 'Valid NPI/Medicaid ID, LTSS Auth#, LTSS proc code are required to submit an LTSS claim.');
                    return false;
                }
            }
            if (this.getView().getViewModel().get('isEditing')) {
                Ext.Msg.alert('Validation Error', 'Please save the service line before submitting claim.');
                return false;
            }
            if (this.getView().getViewModel().getStore('serviceClaims').count() <= 0) {
                Ext.Msg.alert('Validation Error', 'Please submit claim with at least one service line.');
                return false;
            }
            if (!this.validateStatementDatesAdmitDate(parameters.admitDate)) { return false; }
            if (!this.validateDiagnosisCodes() || hasInvalidDiagCode) {
                Ext.Msg.alert('Diagnosis Code Error', 'Please fix hightlighted Diagnosis Code errors.');
                return false;
            }
            return true;
        }

        Ext.Msg.alert('Claim Header/Detail Validation', 'Member ID, Billing NPI/Medicaid ID, Billing TIN, Place of service and Diag Code 1 are the minimum required fields to submit the claim online.');
        return false;
    },

    loadPageFromRedirect: function() {
        var claimId = this.getView().claimId,
            me = this;

        this.getView().getViewModel().set('isClaimsEditTabVisited', true);
        if (!claimId) { this.resetPage(); return; }
        this.getHCFADetails(claimId);
        this.loadServiceClaimStore(claimId);
    },

    getHCFADetails: function(claimId) {
        var whereClause = 'claimNumber = ' + claimId + '|1|1',
            claimModel = Ext.create('Atlas.portals.provider.model.ProviderClaimSearchResult', {}),
            claimForm = this.lookupReference('professionalClaimForm'),
            providerCombo = this.lookupReference('providerCombo'),
            me = this;

        if (!claimId || claimId === '0') { return; }
        claimModel.getProxy().setExtraParam('pRowid', '');
        claimModel.getProxy().setExtraParam('pRowNum', 50);
        claimModel.getProxy().setExtraParam('pRows', 200);
        claimModel.getProxy().setExtraParam('pWhere', whereClause);
        claimModel.getProxy().setExtraParam('pSort', 'claimNumber desc');
        claimModel.load({
            callback: function(record, operation) {
                providerCombo.setValue(record.data.servProvId);
                claimForm.loadRecord(record);

                me.getView().getViewModel().set('providerId', record.get('servProvId'));
                me.getView().getViewModel().set('recipientId', record.get('recipientID'));
                me.getView().getViewModel().set('lobId', record.get('lobID'));
                me.getView().getViewModel().set('controlNumber', record.get('controlNum'));
                me.getView().getViewModel().set('billingNpi', record.get('billprovnpi'));
                me.getView().getViewModel().set('billingTin', record.get('fedTaxId'));
                me.getView().getViewModel().set('taxonomy', record.get('serviceprovtaxonomy'));
            }
        })
    },

    loadServiceClaimStore: function(claimId) {
        var serviceStore = this.getView().getViewModel().getStore('serviceClaims'),
            me = this;

        if (!claimId) { return; }
        serviceStore.getProxy().setExtraParam('pClaimNum', claimId);
        serviceStore.load({
            callback: function(records) {
                var valid = true,
                    minDate = '';

                if (!records && !records.length) {
                    Ext.Msg.alert('Professional Error', 'No Service Line found for this claim.');
                    return;
                }
                for (var i = 0; i < records.length; i++) {
                    if (records[i].get('servLnFromDate') && records[i].get('servLnToDate')) {
                        valid = me.validateStatementDatesSpan(records[i].get('servLnFromDate'), records[i].get('servLnToDate'));
                        if (!valid) { break; }
                    } else {
                        this.removeAt(i);
                    }
                }
                if (valid) {
                    minDate = me.getMinServiceDateInGrid();
                    if (minDate) {
                        me.getView().getViewModel().set('minServiceDate', minDate);
                        me.validateDiagnosisCodes();
                    }
                }
            }
        });
    },

    setLtssBoolean: function() {
        var providerType = Ext.first('viewport').getViewModel().get('user').providerGroupType;

        this.getView().getViewModel().set('isLtss', providerType === 'LTSS');
    },

    loadProviderStore: function() {
        var providerStore = this.getView().getViewModel().getStore('providers'),
            user = Ext.first('viewport').getViewModel().get('user'),
            me = this,
            providerId = me.getView().getViewModel().get('providerId');

        providerStore.getProxy().setExtraParam('pUserName', user.un);
        providerStore.load({
            callback: function(records) {
                if (providerId !== -1) {
                    me.lookupReference('providerCombo').setValue(providerId);
                }
            }
        });
    },

    onSameAsBillingChange: function(checkbox, value) {
        var npiInput = this.lookupReference('billingNpi'),
            medicaidInput = this.lookupReference('medicaidId'),
            svcNpiInput = this.lookupReference('serviceNpi'),
            newValue = '';

        newValue = this.getView().getViewModel().get('isLtss') ? medicaidInput.value : npiInput.value;
        value ? svcNpiInput.setValue(newValue) : svcNpiInput.setValue('');
    },

    onProviderSelect: function(combo, record) {
        this.getView().getViewModel().set('isClaimsEditTabVisited', false);
        this.toggleCheckboxes(true);
        this.resetPage();
        if (!record.get('provID')) { return; }
        this.getView().getViewModel().set('providerId', record.get('provID'));
        this.loadProviderData(record.get('provID'));
    },

    loadPlaceOfServiceStore: function() {
        var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
            serviceStore = {},
            serviceCombo = this.lookupReference('placeOfService');

        listItemsModel.getProxy().setExtraParam('pListName', 'placeofservice');
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                    servicesMap = [],
                    splitValues = [];

                if (!results) { return; }

                splitValues = results.split('^');

                for (var i = 0; i < splitValues.length; i++) {
                    if (splitValues[i + 1] === 'Default') { i++; continue; }
                    servicesMap.push({
                        key: splitValues[i + 1] + ' - ' + splitValues[i],
                        value: splitValues[i + 1]
                    });
                    i++;
                }

                serviceStore = new Ext.data.ArrayStore({});
                serviceStore.add(servicesMap);
                serviceStore.sort('value', 'ASC');
                serviceCombo.setStore(serviceStore);
            }
        });
    },

    onPlaceOfServiceSelect: function(combo, record) {
        var admitDateInput = this.lookupReference('admitDate');

        admitDateInput.allowBlank = record.get('value') !== '21';
        admitDateInput.validateValue(admitDateInput.getValue());
    },

    loadMemberPlans: function() {
        var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
            plansStore = {},
            plansCombo = this.lookupReference('memberPlan');

        listItemsModel.getProxy().setExtraParam('pListName', 'ProvPortalPlanLOB');
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                    plansMap = [],
                    splitValues = [];

                if (!results) { return; }

                splitValues = results.split('^');

                for (var i = 0; i < splitValues.length; i++) {
                    plansMap.push({
                        key: splitValues[i],
                        value: splitValues[i + 1]
                    });
                    i++;
                }

                plansStore = new Ext.data.ArrayStore({});
                plansStore.add(plansMap);
                plansCombo.setStore(plansStore);
            }
        });
    },

    onMemberPlanSelected: function() {
        this.onMemberIdBlur(this.lookupReference('memberId'));
    },

    onMemberIdBlur: function(input) {
        if (!input.value) {
            Ext.Msg.alert('Professional Error', 'Please enter the Member Id.');
            return;
        }
        this.getMemberDetails(input.value);
    },

    getMemberDetails: function(memberId) {
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
            callback: function(records) {
                var response = '';

                if (!records && !records.length) {
                    Ext.Msg.alert('Error', 'There was an error searching for this member.');
                    return;
                }

                response = records[0].data.value;
                if (response.indexOf('Duplicate') > 0) {
                    planCombo.enable();
                    return;
                }

                if (response.indexOf('ERROR') < 0) {
                    me.lookupReference('memberId').setValue(records[0].get('value'));
                    me.getView().getViewModel().set('recipientId', records[1].get('value'));
                    me.getMemberData(records[1].get('value'));
                    return;
                }

                me.lookupReference('memberName').setValue('Member not found');
                me.getView().getViewModel().set('memberTermDate', '');
                me.getView().getViewModel().set('recipientId', '');
                Ext.Msg.alert('Error', 'Invalid Member ID entered');
            }
        });
    },

    getMemberData: function(recipientId) {
        var me = this,
            memberDataModel = Ext.create('Atlas.portals.hpmember.model.MemberDataWeb', {}),
            fields = 'lastName,firstName,@primaryLOB,@contCoverageTerm,gender';

        memberDataModel.getProxy().setExtraParam('pRecipientID', recipientId);
        memberDataModel.getProxy().setExtraParam('pAppServerID', '');
        memberDataModel.getProxy().setExtraParam('portalPlan', '');
        memberDataModel.getProxy().setExtraParam('pFieldList', fields);
        memberDataModel.load({
            callback: function(record) {
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

                if (record.get('gender') === 'F') {
                    me.lookupReference('lmpdate').enable();
                } else {
                    me.lookupReference('lmpdate').disable();
                }
            }
        });
    },

    onDiagCodeBlur: function(input) {
        var diagCode = input.value.trim(),
            whereClause = '',
            diagCodeModel = Ext.create('Atlas.portals.provider.model.DiagCodeMaster', {}),
            workDate = this.getView().getViewModel().get('minServiceDate');

        if (!diagCode) { return; }

        input.setValue(this.formatDiagCode(diagCode));
        whereClause = 'diagCode=\'' + input.getValue().replace('.', '') + '\'';

        diagCodeModel.getProxy().setExtraParam('pRowid', '0');
        diagCodeModel.getProxy().setExtraParam('pRowNum', 0);
        diagCodeModel.getProxy().setExtraParam('pRows', 0);
        diagCodeModel.getProxy().setExtraParam('pWhere', whereClause);
        diagCodeModel.getProxy().setExtraParam('pSort', '');
        diagCodeModel.load({
            callback: function(record) {
                var workEffDate = null,
                    workTermDate = null,
                    activeDiagCodeFound = false;

                if (!record && !record.data) {
                    Ext.Msg.alert('Error', 'Could not validate code at this time.');
                    return;
                }

                if (record.data.diagCode) {
                    workEffDate = new Date(Ext.util.Format.date(record.data.effDate, 'm/d/Y'));
                    workEffDate.setDate(workEffDate.getDate() + 1);
                    record.data.effDate = workEffDate;

                    if (record.data.termDate) {
                        workTermDate = new Date(Ext.util.Format.date(record.data.termDate, 'm/d/Y'));
                        workTermDate.setDate(workTermDate.getDate() + 1);
                        record.data.termDate = workTermDate;
                    }

                    if (!record.data.termDate) {
                        if (!workDate || record.data.effDate.getTime() <= new Date(workDate).getTime()) {
                            activeDiagCodeFound = true;
                            input.validate();
                            return;
                        }
                    } else if (record.data.effDate.getTime() <= record.data.termDate.getTime()) {
                        if (!record.data.termDate || !workDate || record.data.termDate.getTime() >= new Date(workDate).getTime()) {
                            activeDiagCodeFound = true;
                            input.validate();
                            return;
                        }
                    }

                    if (!activeDiagCodeFound) {
                        input.markInvalid(input.value.toString() + ' is not a valid diagnosis code on ' + Ext.util.Format.date(workDate, 'm/d/Y'));
                    }
                    return;
                }

                input.markInvalid('Invalid Diagnosis Code Entered');
                return;
            }
        })
    },

    formatDiagCode: function(value) {
        var formattedValue = '',
            tempCode = '';

        if (!value) { return; }
        formattedValue = value.toUpperCase().replace(',','');
        tempCode = formattedValue.replace('.', '');
        if (tempCode.length >= 3) {
            formattedValue = tempCode.substr(0, 3) + '.';
            if (tempCode.length > 3) {
                formattedValue += tempCode.substr(3);
            }
        }
        return formattedValue;
    },

    formatDate: function(newDate) {
        var date = new Date(newDate);

        if (!newDate) { return; }
        return (date.getMonth() + 1).toString() + '-' + date.getDate().toString() + '-' + date.getFullYear().toString();
    },

    resetPage: function() {
        this.lookupReference('professionalClaimForm').reset();
        this.getView().getViewModel().getStore('serviceClaims').removeAll();
        this.lookupReference('billingNpi').setValue(this.getView().getViewModel().get('billingNpi'));
        this.lookupReference('billingTin').setValue(this.getView().getViewModel().get('billingTin'));
        this.lookupReference('serviceProviderTaxonomy').setValue(this.getView().getViewModel().get('taxonomy'));
        this.lookupReference('alertDisplayField').setValue('');
        this.lookupReference('alertsToolbar').setHidden(true);
    },

    loadProviderData: function(providerId) {
        var providerDataModel = Ext.create('Atlas.portals.provider.model.ProviderDataExtWeb', {}),
            user = Ext.first('viewport').getViewModel().get('user'),
            form = this.lookupReference('mainClaimForm'),
            profForm = this.lookupReference('professionalClaimForm'),
            me = this,
            fieldsList = 'provID, lastName, firstName, @PCP, @inPlan, @acceptNewPatients, @providerType, @provOpen, @providerSpecialty, npinNum, @primaryTIN, @taxonomy';

        providerDataModel.getProxy().setExtraParam('pProvID', providerId);
        providerDataModel.getProxy().setExtraParam('pUserName', user.un);
        providerDataModel.getProxy().setExtraParam('pFieldList', fieldsList);
        providerDataModel.getProxy().setExtraParam('pLobID', '');
        providerDataModel.load({
            callback: function(record) {
                var str = JSON.stringify(record.data),
                    converted = {};

                if (!str) { return; }
                str = str.replace(/@|\./g, '');

                converted = JSON.parse(str);
                converted.pcp = converted.PCP === 'yes';
                converted.inPlan = converted.inPlan === 'yes';
                converted.accepting = converted.acceptNewPatients === 'yes';
                converted.open = converted.provOpen === 'yes';

                record.data = {};
                record.data = converted;

                form.loadRecord(record);
                me.lookupReference('billingNpi').setValue(converted.npinNum);
                me.lookupReference('billingTin').setValue(converted.primaryTIN);
                me.lookupReference('serviceProviderTaxonomy').setValue(converted.taxonomy);
                me.getView().getViewModel().set('billingNpi', converted.npinNum);
                me.getView().getViewModel().set('billingTin', converted.primaryTIN);
                me.getView().getViewModel().set('taxonomy', converted.taxonomy);
                me.toggleCheckboxes(false);
                // TODO: Check active tabs
            }
        })
    },

    toggleCheckboxes: function(toggleValue) {
        toggleValue ? this.lookupReference('inPlan').enable() : this.lookupReference('inPlan').disable();
        toggleValue ? this.lookupReference('pcp').enable() : this.lookupReference('pcp').disable();
        toggleValue ? this.lookupReference('accepting').enable() : this.lookupReference('accepting').disable();
        toggleValue ? this.lookupReference('open').enable() : this.lookupReference('open').disable();
    },

    onPriorAuthSearch: function() {
        var memberInput = this.lookupReference('memberId').value,
            recipientId = this.getView().getViewModel().get('recipientId'),
            user = Ext.first('viewport').getViewModel().get('user'),
            authMasterStore = this.getView().getViewModel().getStore('memberODCDs'),
            me = this,
            vWhere = ' recipientID=' + recipientId;

        if (!memberInput) {
            Ext.Msg.alert('Professional Error', 'Please enter the Member ID.');
            return;
        }

        if (!recipientId) {
            Ext.Msg.alert('Professional Error', 'Sorry. Could not search for Prior Auth#. Please contact System Administrator or Helpdesk.');
            return;
        }

        var IOparamData = '{"ttParameters": [  ' +
            '{     "parameterName": "pSessionID",     "parameterValue": "'+Atlas.user.sessionId+'"   },   ' +
            '{     "parameterName": "pActionType",     "parameterValue": "get"   },   ' +
            '{     "parameterName": "pScreenName",     "parameterValue": "portalSearch"   },   ' +
            '{     "parameterName": "pUserName",     "parameterValue": "'+Atlas.user.un+'"   },   ' +
            '{     "parameterName": "pRowid",     "parameterValue": null   },   ' +
            '{     "parameterName": "pRowNum",     "parameterValue": "0"   },   ' +
            '{     "parameterName": "pRows",     "parameterValue": "999"   },   ' +
            '{     "parameterName": "pWhere",     "parameterValue": "' + vWhere + '"   },   ' +
            '{     "parameterName": "pResultWhereStmt",     "parameterValue": "' + '' + '"   },   ' +
            '{     "parameterName": "pSort",     "parameterValue": "startDate DESC"   },   ' +
            '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },   ' +
            '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },   ' +
            '{     "parameterName": "viJSON",     "parameterValue": "{' + '\\"ttmemberODCDMaster' + '\\": [\\n]}\\n"   } ' +
            ']}';

        authMasterStore.getProxy().setExtraParam('pParamsIO', IOparamData);
        authMasterStore.load({
            callback: function(record, operation) {
                if (!record || record.length === 0) {
                    Ext.Msg.alert('Professional Error', 'No Prior Auth# found for this member.');
                    return;
                }
                me.getAuthInquiryStore(record);
            }
        });
    },

    getAuthInquiryStore: function (record) {
        var authInquiryRecord = record["0"].data.ttmemberODCDMaster,
            authInquiryArray = [];

        for (var i = 0; i < authInquiryRecord.length; i++) {
            var individualArray = [];
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
            individualArray.push(authInquiryRecord[i].systemID)
            authInquiryArray.push(individualArray);
        }

        var authInquiryStore = new Ext.data.ArrayStore({
            fields: ['PlaceOfServiceDesc', 'RequestingProviderID', 'ServicingFacilityID', 'ServicingProviderID', 'benefitPlanCode', 'endDate',
                'levelOfService', 'levelOfServiceDesc', 'memberID', 'memberName', 'placeOfServiceCode', 'procedureCategoryDesc',
                'procedureCategoryID', 'recipientID', 'requestID', 'requestStatus', 'servicingFacility', 'servicingFacilityName',
                'servicingProvider', 'servicingProviderName', 'startDate', 'dbRowID', 'systemID'],
            data: authInquiryArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        this.showPriorAuthSearch(authInquiryStore);
    },

    showPriorAuthSearch: function(store) {
        var that = this;

        Ext.create('Ext.window.Window', {
            title: 'Prior Auth Search',
            modal: true,
            width: 450,
            items: {
                xtype: 'gridpanel',
                height: 300,
                reference: 'authGrid',
                columns: [
                    {text: 'Request Id', dataIndex: 'requestID'},
                    {text: 'Status', dataIndex: 'requestStatus'},
                    {text: 'Start', dataIndex: 'startDate'},
                    {text: 'End', dataIndex: 'endDate'},
                    {text: 'Level of Service', dataIndex: 'levelOfService'},
                    {text: 'Procedure Category', dataIndex: 'procedureCategoryDesc'},
                    {text: 'Servicing Provider', dataIndex: 'servicingProvider'},
                    {text: 'Servicing Facility', dataIndex: 'servicingFacility'}
                ],
                store: store,
                listeners: {
                    rowdblclick: function(grid, record) {
                        that.priorAuthSelected(record.get('requestID'));
                        this.getView().up().up().destroy();
                    }
                },
                bbar: {
                    xtype: 'toolbar',
                    items: [
                        {
                            text: 'OK',
                            handler: function() {
                                var grid = this.up().up();
                                var selections = grid.getSelectionModel().getSelected().items;

                                if (selections.length > 0) {
                                    that.priorAuthSelected(selections[0].get('requestID'));
                                }
                                this.up().up().up().destroy();;
                            }
                        }, {
                            text: 'Cancel',
                            handler: function() {
                                this.up().up().up().destroy();;
                            }
                        }
                    ]
                }
            }
        }).show();
    },

    showObVisits: function() {
        var me = this,
            visits = this.lookupReference('obVisits').value;

        var visitsWindow = Ext.create('Ext.window.Window', {
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

    updateOBVisits: function(obVisits) {
        this.lookupReference('obVisits').setValue(obVisits);
    },

    priorAuthSelected: function(authId) {
        this.lookupReference('priorAuthNumber').setValue(authId);
    },

    // Input Listener Events
    onPriorAuthNumberBlur: function() {
        var priorAuthId = this.lookupReference('priorAuthNumber'),
            memberId = this.lookupReference('memberId').value,
            recipientId = this.getView().getViewModel().get('recipientId'),
            validateAuthModel = Ext.create('Atlas.portals.provider.model.ValidatePriorAuthType', {});
            whereClause = '';

        if (this.getView().getViewModel().get('isLtss') && priorAuthId.value) {
            if (!memberId) {
                Ext.Msg.alert('Professional Error', 'Please enter the member Id.');
                return;
            }

            if (!recipientId) {
                Ext.Msg.alert('Professional Error', 'Sorry. Could not validate Prior Auth#. Please contact System Administrator or Helpdesk.');
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
                callback: function(record) {
                    if (!record && !record.get('pResult')) {
                        Ext.Msg.alert('Professional Error', 'Sorry. Could not validate Prior Auth#. Please contact System Administrator or Helpdesk.');
                        return;
                    }

                    if (record.get('pResult') !== 'success') {
                        Ext.Msg.alert('Professional Error', 'Invalid Prior Auth# entered.');
                        priorAuthId.setValue('');
                        return;
                    }
                }
            });
        }
    },

    onAdmitDateBlur: function() {
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

    onPayerBlur: function(input) {
        var carrier = this.lookupReference('otherpayername'),
            paidAmount = this.lookupReference('otherInsPaidAmt'),
            denyReason = this.lookupReference('denyReason');

        if (carrier.value || (paidAmount.value && 0 < parseFloat(paidAmount.value))) {
            paidAmount.allowBlank = false;
            denyReason.allowBlank = false;
            carrier.allowBlank = false;
            return;
        }

        paidAmount.allowBlank = true;
        denyReason.allowBlank = true;
        carrier.allowBlank = true;
    },

    onServiceLineFromDateBlur: function(input) {
        var fromDate = input.value,
            toDate = input.up().getComponent('servLnToDate'),
            admitDate = this.lookupReference('admitDate'),
            minDate = new Date(),
            valid = true;

        if (!fromDate) { return; }
        toDate.setValue(fromDate);
        valid = this.validateStatementDatesSpan(fromDate, fromDate);
        if (!valid) {
            input.setValue('');
            toDate.setValue('');
            return;
        }
        minDate = this.getMinServiceDateInGrid();

        if (!minDate) {
            this.getView().getViewModel().set('minServiceDate', fromDate);
        } else {
            this.getView().getViewModel().set('minServiceDate', minDate);
        }

        this.validateDiagnosisCodes();
        if (admitDate.value) {
            if (new Date(fromDate).getTime() < new Date(admitDate.value).getTime()) {
                input.setValue('');
                toDate.setValue('');
                Ext.Msg.alert('Professional Error', 'Invalid Service Line Date. Service Dates cannot be before the Admit Date.');
                return;
            }
            input.validate();
            toDate.validate();
        }
    },

    onServiceLineToDateBlur: function(input) {
        var toDate = input.value,
            fromDate = input.up().getComponent('servLnFromDate'),
            admitDate = this.lookupReference('admitDate'),
            minDate = new Date(),
            valid = true;

        if (!toDate) { return; }
        valid = this.validateStatementDatesSpan(fromDate.value, toDate);
        if(!valid) {
            input.setValue('');
            fromDate.setValue('');
            return;
        }
        minDate = this.getMinServiceDateInGrid();

        if (!minDate) { this.getView().getViewModel().set('minServiceDate', ''); }
        if (!this.getView().getViewModel().get('minServiceDate')
            || (new Date(toDate).getTime() < new Date(this.getView().getViewModel().get('minServiceDate')).getTime())) {
            this.getView().getViewModel().set('minServiceDate', toDate);
        } else if (minDate && (new Date(minDate).getTime < new Date(this.getView().getViewModel().get('minServiceDate')).getTime())) {
            this.getView().getViewModel().set('minServiceDate', minDate);
        }

        this.validateDiagnosisCodes();
        if (admitDate.value) {
            if (new Date(fromDate.value).getTime() < new Date(admitDate.value).getTime()) {
                input.setValue('');
                fromDate.setValue('');
                Ext.Msg.alert('Professional Error', 'Invalid Service Line Date. Service Dates cannot be before the Admit Date.');
                return;
            }
            input.validate();
            fromDate.validate();
        }
    },

    onServiceLineDiagCodeBlur: function(input) {
        var numDiagEntered = 0;

        if (!input.value || input.value === '0') {
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

        if (numDiagEntered > 0) {
            if (input.value.indexOf(',') < 0) {
                if (input.value.length === 1) {
                    if (parseInt(input.value) > numDiagEntered) {
                        if (numDiagEntered === 1) {
                            Ext.Msg.alert('Claim Detail Validation', 'Service Line Diag Code value should be 1.');
                        } else {
                            Ext.Msg.alert("Claim Detail Validation", "Service Line Diag Code value should be 1 through " + numDiagEntered + " - separated by comma.");
                        }
                        input.setValue('');
                        return;
                    }
                } else {
                    if (numDiagEntered === 1) {
                        Ext.Msg.alert('Claim Detail Validation', 'Service Line Diag Code value should be 1.');
                    } else {
                        Ext.Msg.alert("Claim Detail Validation", "Service Line Diag Code value should be 1 through " + numDiagEntered + " - separated by comma.");
                    }
                    input.setValue('');
                    return;
                }
            } else {
                var diagCode = input.value.trim(),
                    tmpSplitStr = [],
                    tmpNumeric = '12345678';
                diagCode = diagCode.replace(',,', ',');
                tmpSplitStr = diagCode.split(',');

                for (var i = 0; i < tmpSplitStr.length; i++) {
                    if (tmpNumeric.includes(tmpSplitStr[i])) {
                        if (parseInt(tmpSplitStr[i]) > numDiagEntered) {
                            Ext.Msg.alert('Claim Detail Validation', 'Service Line Diag Code value should be 1 through ' + numDiagEntered + ' - separated by comma.');
                            input.setValue('');
                            return;
                        }
                    } else {
                        Ext.Msg.alert("Claim Detail Validation", "Invalid Service Line Diag Code value or separator. Value should be 1 through " + numDiagEntered + " - separated by comma.");
                        input.setValue('');
                        return;
                    }
                }
            }
        } else {
            Ext.Msg.alert('Claim Header Validation', 'Diag Code1 in the claim header is mandatory.');
        }
    },

    onServLnProcCodeBlur: function(input) {
        var procCode = input.value,
            procDescription = input.up().getComponent('servLnProcCodeDesc'),
            fromDate = input.up().getComponent('servLnFromDate').value,
            procModel = Ext.create('Atlas.portals.provider.model.ProcMasterWeb', {}),
            me = this;

        procDescription.setValue('');
        input.setValue(input.value.toUpperCase());
        if (!procCode) { return; }
        if (!new RegExp('[A-Za-z0-9]+').test(procCode.trim())) {
            Ext.Msg.alert('Proc Code Validation', 'Please enter a single procedure code per service line.');
            input.setValue('');
            input.focus();
        }
        procModel.getProxy().setExtraParam('pDate', fromDate);
        procModel.getProxy().setExtraParam('pLobID', this.getView().getViewModel().get('lobId'));
        procModel.getProxy().setExtraParam('pProcCode', procCode);
        procModel.getProxy().setExtraParam('pAuthType', Ext.first('viewport').getViewModel().get('user').providerGroupType);
        procModel.load({
            callback: function(record, operation) {
                var response = Ext.JSON.decode(operation._response.responseText).metadata;

                if (!response && !response.pFields) { return; }
                procDescription.setValue(response.pFields);
                if (response.pFields.toLowerCase() === 'procedure not found'
                    || response.pFields.toLowerCase() === 'procedure not active') {
                    input.setValue('');
                    Ext.Msg.alert('Proc Code Validation', response.pFields);
                    return;
                }
                me.getNdcRequirement(input);
            }
        })
    },

    onFrequencyCodeSelect: function(combo, record) {
        this.getView().getViewModel().set('selectedFrequencyCode', record.get('key'));
    },

    getNdcRequirement: function(procInput) {
        var procCode = procInput.value,
            ndcInput = procInput.up().getComponent('servLnNDC'),
            listItemModel = Ext.create('Atlas.portals.provider.model.GetListDesc', {});

        listItemModel.getProxy().setExtraParam('pListName', 'NDCRequired');
        listItemModel.getProxy().setExtraParam('pListItem', procCode);
        listItemModel.load({
            callback: function(record, operation) {
                var metadata = '';

                if (!record && !record.data) { return; }
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
        })
    },

    // Service Grid Functions
    addService: function() {
        var grid = this.lookupReference('serviceGrid'),
            count = grid.getStore().count(),
            lastNum = count === 0 ? 0 : grid.getStore().getAt(grid.getStore().count() - 1).get('lineNum'),
            serviceModel = Ext.create('Atlas.portals.provider.model.RemitDetailWeb', {
                lineNum: lastNum + 1
            });

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(grid.getStore().count(), serviceModel);
        grid.editingPlugin.startEdit(grid.getStore().count(), 0);
        this.getView().getViewModel().set('isEditing', true);
    },

    removeService: function() {
        var grid = this.lookupReference('serviceGrid'),
            serviceStore = grid.getStore(),
            minDate = '',
            selections = grid.getSelectionModel().getSelected().items;

        grid.editingPlugin.cancelEdit();
        if (!selections || selections.length === 0) {
            Ext.Msg.alert('Information', 'Please select a row.');
            return;
        }

        for (var i = 0, r; r = selections[i]; i++) {
            serviceStore.remove(r);
        }

        minDate = this.getMinServiceDateInGrid();
        if (!minDate) {
            this.getView().getViewModel().set('minServiceDate', '');
        } else {
            this.getView().getViewModel().set('minServiceDate', minDate);
        }
        this.validateDiagnosisCodes();
    },

    cancelServiceUpdate: function(context, row) {
        this.getView().getViewModel().set('isEditing', false);
        if (row.record.get('servLnFromDate')) { return; }
        this.removeService();
    },

    maybeEditService: function(context, row) {
        var fromDate = row.record.get('servLnFromDate'),
            toDate = row.record.get('servLnToDate'),
            grid = this.lookupReference('serviceGrid');

        this.getView().getViewModel().set('isEditing', false);
        if (!this.validateStatementDatesSpan(fromDate, toDate)) {
            Ext.Msg.alert('Service Line Validation Prompt', 'From / To Dates are Invalid.');
            this.removeService();
        }

        if ((this.dateIsICD10(new Date(fromDate)) && this.gridHasICD9Dates())
            || (this.dateIsICD9(new Date(fromDate)) && this.gridHasICD10Dates())) {
            Ext.Msg.alert('Service Line Validation Prompt', 'All Service Line dates must be either before 10/01/2015 or starting from 10/1/2015.');
            this.removeService();
        }
    },

    onBeforeEdit: function() {
        this.getView().getViewModel().set('isEditing', true);
    },

    validateStatementDatesAdmitDate: function(date) {
        var grid = this.lookupReference('serviceGrid'),
            workFromDate = new Date(),
            valid = true;

        if (!date) { return valid; }
        date = new Date(date);
        for (var i = 0; i < grid.getStore().getCount(); i++) {
            if (grid.getStore().getData().items[i].get('servLnFromDate') && grid.getStore().getData().items[i].get('servLnToDate')) {
                workFromDate = new Date(grid.getStore().getData().items[i].get('servLnFromDate'));
                if (workFromDate.getTime() < date.getTime()) {
                    Ext.Msg.alert(
                        'Service Line Admit Dates',
                        'Invalid Service Line Dates for Service Line ' + (i + 1) + '. Service Dates cannot be before the Admit Date.'
                    );
                    valid = false;
                }
            }
        }

        return valid;
    },

    validateStatementDatesSpan: function(fromDate, toDate) {
        var valid = true;

        valid = this.validateDateRange(fromDate, toDate);
        if (!valid) { return valid; }
        if (fromDate && toDate) {
            fromDate = new Date(fromDate);
            toDate = new Date(toDate);
            if ((fromDate.getTime() < new Date('10/01/2015').getTime() && (toDate.getTime() < new Date('10/01/2015').getTime()))
                || (fromDate.getTime() > new Date('09/30/2015').getTime()) && (toDate.getTime() > new Date('09/30/2015').getTime())) {

            } else if (true) { // TODO: Check bill type

            }
        }

        return valid;
    },

    validateDateRange: function(fromDate, toDate) {
        var valid = true,
            memberTermDate = this.getView().getViewModel().get('memberTermDate');

        if (fromDate && memberTermDate) {
            if (new Date(fromDate).getTime() > new Date(memberTermDate).getTime()) {
                valid = false;
                Ext.Msg.alert('Professional Error', 'Member enrollment was term\'d prior to From Date');
            }
        }

        if (!valid) { return valid; }

        if (fromDate && toDate) {
            if (new Date(toDate).getTime() < new Date(fromDate).getTime()) {
                valid = false;
                Ext.Msg.alert('Professional Error', 'Statement Thru Date must be after Statement From Date.');
            }
        }

        return valid;
    },

    checkIfCodesAreInvalid: function() {
        var valid;

        for (var i = 1; i < 9; i++) {
            valid = this.lookupReference('diagCode' + i).activeError;
            if (valid) { break; }
        }

        if (!valid) { return true; }
        return false;
    },

    validateDiagnosisCodes: function() {
        var valid;

        for (var i = 1; i < 9; i++) {
            this.onDiagCodeBlur(this.lookupReference('diagCode' + i));
            valid = this.lookupReference('diagCode' + i).activeError;
            if (valid) { break; }
        }

        if (!valid) { return true; }
        return false;
    },

    getMinServiceDateInGrid: function() {
        var grid = this.lookupReference('serviceGrid'),
            minDate = '',
            workDate = '';

        if (grid.getStore().getCount() === 1) { return; }
        for (var i = 0; i < grid.getStore().getCount(); i++) {
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

    dateIsICD9: function(date) {
        var beforeDate = new Date('10/01/2015');

        return date.getTime() < beforeDate.getTime();
    },

    dateIsICD10: function(date) {
        var beforeDate = new Date('9/30/2015');

        return date.getTime() > beforeDate.getTime();
    },

    gridHasICD9Dates: function() {
        var services = this.lookupReference('serviceGrid').getStore().getData(),
            hasDates = false;

        for (var i = 0; i < services.items.length; i++) {
            if (services.items[i].get('servLnFromDate') && services.items[i].get('servLnToDate')) {
                hasDates = this.dateIsICD9(new Date(services.items[i].get('servLnFromDate')));
                if (hasDates) { break; }
            }
        }

        return hasDates;
    },

    gridHasICD10Dates: function() {
        var services = this.lookupReference('serviceGrid').getStore().getData(),
            hasDates = false;

        for (var i = 0; i < services.items.length; i++) {
            if (services.items[i].get('servLnFromDate') && services.items[i].get('servLnToDate')) {
                hasDates = this.dateIsICD10(new Date(services.items[i].get('servLnFromDate')));
                if (hasDates) { break; }
            }
        }

        return hasDates;
    }
});