Ext.define('Atlas.portals.provider.ProviderClaimsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsproviderclaims',

    listen: {
        controller: {
            'portalsprovidermain': {
                providerDetailsSet: 'onProviderDetailsSet',
                providersLoaded: 'onProvidersLoaded'
            },
            '*': {
                providerMemberSelected: 'onProviderMemberSelected',
                claimStatusSet: 'setRecipientId'
            }
        }
    },

    init: function () {
        var me = this,
            vm = me.getViewModel(),
            refs = this.getReferences(),
            toDate = refs.claimToDtTxt,
            fromDate = refs.claimDtTxt;

        vm.set('claimsTabVisited', false);
        vm.set('canViewEligibility', !(Atlas.user.providerStateSelected == 'IA' || Atlas.user.providerStateSelected == 'IL'));

        toDate.setMinValue(fromDate.getValue());
        fromDate.setMaxValue(toDate.getValue());
    },

    boxReady: function (component) {
        var me = this,
            vm = me.getViewModel(),
            providerDetails = vm.get('providerDetails'),
            memberId = this.getView().up().up().up().memberId;

        vm.set('claimsTabVisited', true);

        if (!providerDetails.provID && !memberId) {
            Ext.Msg.alert('Information', 'Please select a provider from the drop down list to view the claims.');
        }
        else if(providerDetails.provID && !memberId){
            me.processClaimSearch();
        }

        return;
    },

    onProvidersLoaded: function (providerList) {
        var me = this,
            vm = this.getViewModel();

        vm.set('providerList', providerList);
    },



    onProviderDetailsSet: function (providerDetails) {
        var me = this,
            vm = me.getViewModel(),
            claimStore = vm.getStore('claims'),
            claimsForm = me.lookupReference('claimsForm');

        vm.set('providerDetails', providerDetails);
        //reset the search form
        claimStore.removeAll();
        claimsForm.reset();

        me.processClaimSearch();
    },

    loadClaimDetails: function (row, record, eOpts) {
        var me = this,
            vm = me.getViewModel(),
            claimdetailstore = vm.getStore('claimsdetail');
        claimdetailstore.getProxy().setExtraParam('pClaimNum', record.data.claimNumber);
        claimdetailstore.load();
    },

    processClaimSearch: function () {
        var me = this,
            form = me.lookupReference('claimsForm'),
            vm = me.getViewModel(),
            claimsTabVisited = vm.get('claimsTabVisited'),
            providerDetails = vm.get('providerDetails'),
            providerList = vm.get('providerList'),
            pWhere;

        if (claimsTabVisited) {
            if (form.isValid()) {

                if (providerDetails.provID) {
                    pWhere = 'ServProvID = ' + providerDetails.provID;
                }
                else {
                    if (!providerList) { //avoid open claim search without service provider in search criteria.
                        Ext.Msg.alert('Claim Search Error', 'At least one provider should be assigned to your group to perform a claim search.');
                        return;
                    }

                    if (providerList.length == 1) {
                        pWhere = 'ServProvID = ' + providerList[0];
                    }
                    else {
                        pWhere = Ext.String.format(" LOOKUP(STRING(servProvID),'{0}') > 0", providerList.join(','));
                    }
                }

                pWhere = me.setClaimSearchWhereClause(pWhere);
                me.callClaimSearch(pWhere);
            }
            else {
                Ext.Msg.alert('Claim Status', 'Please correct the errors and try again.');
            }
        }
    },

    setRecipientId: function (memberId, fromDate) {
        var me = this,
            claimRetrievedRecipientId = me.lookupReference('claimRetrievedRecipientId'),
            from = me.lookupReference('claimDtTxt'),
            memberLabel = me.lookupReference('memberId'),
            vm = this.getView().getViewModel();

        if (memberId) {
            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'portal/hp/portalmemberfuncs/read',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pFunction: 'fGetAllID',
                    pMemberID: memberId,
                    userState: Atlas.user.providerStateSelected
                }),
                success: function (response) {
                    var obj = Ext.decode(response.responseText),
                        recipientId;

                    if (obj.data[1]) {
                        recipientId = obj.data[1].value;
                        claimRetrievedRecipientId.setValue(recipientId);

                        memberLabel.setValue(memberId);
                        from.setValue(fromDate);

                        vm.set('claimsTabVisited', true);
                        me.processClaimSearch();
                    }
                    else {
                        sender.markInvalid('Invalid member ID.');
                    }


                }
            });
        }
        else {
            claimRetrievedRecipientId.setValue('');
        }
    },

    onMemberIdBlur: function (sender, event, eOpts) {
        var me = this,
            claimRetrievedRecipientId = me.lookupReference('claimRetrievedRecipientId'),
            memberId = sender.getValue();

        if (memberId) {
            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'portal/hp/portalmemberfuncs/read',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pFunction: 'fGetAllID',
                    pMemberID: memberId,
                    userState: Atlas.user.providerStateSelected
                }),
                success: function (response) {
                    var obj = Ext.decode(response.responseText),
                        recipientId;

                    if (obj.data[1]) {
                        recipientId = obj.data[1].value;
                        claimRetrievedRecipientId.setValue(recipientId);
                    }
                    else {
                        sender.markInvalid('Invalid member ID.');
                    }
                }
            });
        }
        else {
            claimRetrievedRecipientId.setValue('');
        }
    },

    callClaimSearch: function (pWhere) {
        var me = this,
            vm = me.getViewModel(),
            claimStore = vm.getStore('claims'),
            proxy = claimStore.getProxy();

        pWhere = pWhere + Ext.String.format('|{0}|{1}', 1, 9999);

        proxy.setExtraParam('pWhere', pWhere);
        proxy.setExtraParam('pSort', 'claimNumber');

        claimStore.load();
    },

    setClaimSearchWhereClause: function (pWhere) {
        var me = this,
            vm = me.getViewModel(),
            providerDetails = vm.get('providerDetails'),
            claimTypeDrop = me.lookupReference('claimTypeDrop'),
            claimDtTxt = me.lookupReference('claimDtTxt'),
            claimToDtTxt = me.lookupReference('claimToDtTxt'),
            claimStatusDrop = me.lookupReference('claimStatusDrop'),
            ptnAccountNumTxt = me.lookupReference('ptnAccountNumTxt'),
            claimRetrievedRecipientId = me.lookupReference('claimRetrievedRecipientId');

        if (claimTypeDrop.getValue() != 'All') {
            if (pWhere) {
                pWhere = pWhere + ' and ';
            }
            pWhere = pWhere + Ext.String.format('formType = "{0}"', claimTypeDrop.getValue());
        }
        if (providerDetails.selectedLob && providerDetails.selectedLob != 'All') {
            if (pWhere) {
                pWhere = pWhere + ' and ';
            }
            pWhere = pWhere + Ext.String.format('lobID = "{0}"', providerDetails.selectedLob);
        }
        if (claimDtTxt.getValue()) {
            if (pWhere) {
                pWhere = pWhere + (" and ");
            }
            pWhere = pWhere + Ext.String.format('stmtFromDate >= "{0}"', claimDtTxt.getSubmitValue());
        }
        if (claimToDtTxt.getValue()) {
            if (pWhere) {
                pWhere = pWhere + (" and ");
            }
            pWhere = pWhere + Ext.String.format('stmtFromDate <= "{0}"', claimToDtTxt.getSubmitValue());
        }
        if (claimStatusDrop.getValue() && claimStatusDrop.getValue() != 'All') {
            if (pWhere) {
                pWhere = pWhere + ' and ';
            }
            pWhere = pWhere + Ext.String.format('processStatus = "{0}"', claimStatusDrop.getValue());
        }
        // this is a hidden field
        if (claimRetrievedRecipientId.getValue()) {
            if (pWhere) {
                pWhere = pWhere + ' and ';
            }
            pWhere = pWhere + Ext.String.format('recipientID = "{0}"', claimRetrievedRecipientId.getValue());
        }
        if (ptnAccountNumTxt.getValue()) {
            if (pWhere) {
                pWhere = pWhere + ' and ';
            }
            pWhere = pWhere + Ext.String.format('ptnAccountNum BEGINS "{0}"', ptnAccountNumTxt.getValue());
        }
        return pWhere;
    },

    openMemberSearch: function () {
        var memberText = this.lookupReference('memberId').value;

        Ext.create('Ext.window.Window', {
            title: 'Member Search',
            modal: true,
            items: {
                xtype: 'portalsprovidermembersearchwindow',
                viewModel: {
                    stores: {
                        memberSearch: {
                            model: 'Atlas.portals.provider.model.MemberMasterExt'
                        }
                    },
                    data: {
                        memberText: memberText,
                        errorMessage: ''
                    }
                }
            }
        }).show();
    },

    onProviderMemberSelected: function (params) {
        var me = this,
            memberId = me.lookupReference('memberId').setValue(params.memberId);

        if (!params.action) {
            return;
        }
        me.onMemberIdBlur(memberId);
    },

    claimEligibility: function (grid, rowIndex, colIndex, button) {
        var rec = grid.getStore().getAt(rowIndex),
            memberId = rec.data.dispMemberID,
            servDate = rec.data.stmtFromDate,
            claimNumber = rec.data.claimNumber;

        Ext.MessageBox.show({
            title: "Downloading",
            msg: 'Please Wait...',
            closable: false
        });

        if (claimNumber) {
            // is the eligibility server available?
            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'eligibility/hp/optionsvalue/read',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pKeyName: 'MPHIServerDown',
                    userState: Atlas.user.providerStateSelected
                }),
                success: function (response) {
                    var obj = Ext.decode(response.responseText);

                    if (obj.data[0]) {
                        serverStatus = obj.data[0].value;
                        if (serverStatus == 'yes') {
                            Ext.Msg.alert('The CHAMPS eligibility server is currently not available. Please try again later.');
                        }
                        else {
                            // populate input list
                            var inputValues = [];
                            inputValues.push('D00111'); // MCS_SUBMITTER_ID
                            inputValues.push('HPM'); // MCS_PAYER_ID
                            inputValues.push(memberId);
                            inputValues.push(Ext.Date.format(new Date(servDate), 'm/d/Y'));
                            inputValues.push(Ext.Date.format(new Date(servDate), 'm/d/Y'));
                            inputValues.push(''); // last name
                            inputValues.push(''); // first name
                            inputValues.push(''); // formatted dob
                            inputValues.push(''); // ssn
                            inputValues.push('174151587'); // medicaid ID - MCS_PROVIDER_ID
                            inputValues.push(Atlas.user.un); // user Id
                            inputValues.push('0');

                            // Generate the PDF
                            Ext.Ajax.request({
                                useDefaultXhrHeader: false,
                                withCredentials: true,
                                paramsAsJson: true,
                                noCache: false,
                                url: Atlas.apiURL + 'eligibility/hp/make004010x092a1web/update',
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                params: Ext.JSON.encode({
                                    pparameters: inputValues.join('|'),
                                    userState: Atlas.user.providerStateSelected
                                }),
                                success: function (response) {
                                    var obj = Ext.decode(response.responseText),
                                        controlNum = obj.metadata.p271ControlNum;

                                    var requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {});
                                    requestModel.phantom = false;
                                    //requestModel.getProxy().url = 'eligibility/hp/runreport64';
                                    requestModel.getProxy().setExtraParam('pReportName', 'print271.p');
                                    requestModel.getProxy().setExtraParam('pParameters', controlNum);
                                    requestModel.getProxy().setExtraParam('pRegenReport', 2);
                                    requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
                                    requestModel.getProxy().setExtraParam('pJobNum', 0);
                                    requestModel.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
                                    requestModel.save({
                                        success: function (response, operation) {
                                            var obj = Ext.JSON.decode(operation._response.responseText),
                                                base64EncodedPDF = obj.data;
                                            if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                                                if (obj.metadata.pStatus != '') {
                                                    Ext.Msg.alert('Error', obj.metadata.pStatus);
                                                } else {
                                                    Ext.MessageBox.alert('Error', 'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.', function () {
                                                    });
                                                }
                                            } else {
                                                Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                                                Ext.MessageBox.hide();
                                            }
                                        }
                                    });

                                }
                            });
                        }
                    }
                },
                failure: function () {
                    Ext.Msg.alert('The CHAMPS eligibility server is currently not available. Please try again later.');
                }
            });
        }
    },

    editResubmitClaim: function (grid, rowIndex, colIndex, button) {
        var rec = grid.getStore().getAt(rowIndex);

        if (rec.data.claimStatusDesc == 'Rejected') {
            if (rec.data.formType == 'UB92') {
                //institutional claim
                this.fireEvent('openView', 'hpprovider', 'portals', 'provider_InstitutionalClaims', {
                    claimId: rec.data.claimNumber,
                    atlasId: rec.data.claimNumber,
                    activeTab: 'Provider Claims'
                });
            }
            if (rec.data.formType == 'HCFA') {
                //professional claim
                this.fireEvent('openView', 'hpprovider', 'portals', 'provider_ProfessionalClaims', {
                    claimId: rec.data.claimNumber,
                    atlasId: rec.data.claimNumber,
                    activeTab: 'Provider Claims'
                });
            }
        }
    },

    onFromDateChange: function (sender, newValue, oldValue) {
        var me = this,
            toDate = this.lookupReference('claimToDtTxt');
        if (Ext.isDate(newValue)){
            toDate.setMinValue(newValue);
        }
    },

    onToDateChange: function (sender, newValue, oldValue) {
        var me = this,
            fromDate = this.lookupReference('claimDtTxt');
        if (Ext.isDate(newValue)) {
            fromDate.setMaxValue(newValue);
        }
    }
});