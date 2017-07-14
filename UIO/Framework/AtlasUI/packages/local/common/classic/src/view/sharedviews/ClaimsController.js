Ext.define('Atlas.common.view.sharedviews.ClaimsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-claims',
    keyType: null,
    keyValue: null,
    extraPrm: null,
    skipError: false,
    listen: {
        controller: {
            '*': {
                SearchClaimsCommonController: 'SearchClaims'
            }
        }
    },

    SearchClaims: function (keyType, keyValue, isResetSearch, extraPrm,isReload) {
        var me = this,
            vm = this.getViewModel(),
            view = this.getView(),
            extraParameters = [],
            callingSource = '',
            actTab = view.up('[reference = workspaceTabs]').getActiveTab(),
            GPI,
            GCN,
            NDC;
        if (!view.down('#formSelection').isValid())
            return;
        if (actTab.down(view)){

            this.keyType = keyType;
            this.keyValue = keyValue;
            this.extraPrm = extraPrm;

            if (isResetSearch == true && extraPrm != '' && extraPrm != undefined) {
                extraParameters = extraPrm.split('|');

                if (extraParameters.length > 0 && extraParameters[0] == 'CDAG') {
                    callingSource = 'CDAG';
                    GPI = extraParameters[1] == 'GPI' ? extraParameters[2] : '';
                    GCN = extraParameters[1] == 'GCN' ? extraParameters[2] : '';
                    NDC = extraParameters[1] == 'NDC' ? extraParameters[2] : '';
                }
            }

            if(isResetSearch == true) {
                if(!isReload)
                {
                    view.down('#formSelection').reset();
					// debugger;
                    var currentDate = new Date();
                    if(keyType == 'ncpdpId'){
                        view.down('#serviceStartDt').setValue(Ext.Date.add(currentDate, Ext.Date.DAY, -3));
                        vm.set('fromDate',Ext.Date.add(new Date(), Ext.Date.DAY, -3));						
						me.lookup('serveDateTo').setMinValue(Ext.Date.add(currentDate, Ext.Date.DAY, -3));
                    }
                    else{
                        me.lookup('serveDateFrom').setValue(Ext.Date.add(new Date(), Ext.Date.MONTH, -1));
                        vm.set('fromDate',Ext.Date.add(new Date(), Ext.Date.MONTH, -1));
						me.lookup('serveDateTo').setMinValue(Ext.Date.add(currentDate, Ext.Date.MONTH, -1));
                    }

                    me.lookup('serveDateTo').setValue(currentDate);
                    me.lookup('serveDateFrom').setMaxValue(currentDate);
                    vm.set('toDate',me.lookup('serveDateTo').getValue());
                }
            }

            if (keyType == 'ncpdpId') {
                //Fragile and slow code!
                if(!isReload)
                {
                    Ext.defer(function () {
                        me.populateField('providertypeahead', keyValue, actTab);
                    }, 300);
                }
            }
            else if (keyType == 'recipientID') {
                //Fragile and slow code!
                Ext.defer(function () {
                    me.populateField('[reference = recipientIdClaims]', keyValue, actTab)

                    if (callingSource == 'CDAG') {
                        if (GCN != '') {
                            me.lookup('gcndirect').setFieldLabel('GCN:');
                            me.lookup('ndc').setValue('');
                            me.lookup('gcndirect').setValue(GCN);
                        }
                        else if (GPI != '') {
                            me.lookup('gcndirect').setFieldLabel('GPI:');
                            me.lookup('ndc').setValue('');
                            me.lookup('gcndirect').setValue(GPI);
                        }
                        else {
                            me.lookup('gcndirect').setFieldLabel('GCN:');
                            me.lookup('ndc').setValue(NDC);
                            me.lookup('ndc').setRawValue(NDC);
                        }
                    }

                }, 300);
            }
            else if (keyType == 'npi') {
                if(!isReload)
                {
                    Ext.defer(function () {
                        me.lookup('npiClaims').setValue(keyValue);
                        me.lookup('npiClaims').setRawValue(keyValue);
                        me.lookup('npiClaims').setDisabled(true);
                        // view.down('#serviceStartDt').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -30));
                    }, 300);
                }
            }

            if (keyType == 'recipientID' && (keyValue == '' || keyValue == '0' || keyValue == null)) {
                if (!this.skipError) {
                    Ext.Msg.alert('Message', 'Please select Member to search the Claims.');
                    this.skipError = true;
                }
            }
            else if (keyType == 'ncpdpId' && (keyValue == '' || keyValue == '0' || keyValue == null)) {
                Ext.Msg.alert('Message', 'Please select Pharmacy to search the Claims.');
            }
            else if (keyType == 'npi' && (keyValue == '' || keyValue == '0' || keyValue == null)) {
                Ext.Msg.alert('Message', 'Please select Prescriber to search the Claims.');
            }
            else {
                var where = '',
                    authId = this.lookup('authId').getValue(),
                    rxNum = this.lookup('rxid').getValue();

                where = this.buildWhereClause(where, 'RecipientId', ' = ', (keyType == 'recipientID' ? keyValue : this.lookup('recipientIdClaims').getValue()));
                where = this.buildWhereClause(where, 'prescriberNPI', ' = ', (keyType == 'npi' ? keyValue : this.lookup('npiClaims').getValue()));
                where = this.buildWhereClause(where, 'ncpdpid', ' = ', (keyType == 'ncpdpId' ? keyValue : this.lookup('ncpdpidClaims').getValue()));
                where = this.buildWhereClause(where, 'RxNum', ' = ', (null === (rxNum) ? null : String(rxNum)));
                where = this.buildWhereClause(where, 'serviceDate', ' >= ', this.formatDate(this.lookup('serveDateFrom').getValue()));
                where = this.buildWhereClause(where, 'serviceDate', ' <= ', this.formatDate(this.lookup('serveDateTo').getValue()));
                where = this.buildWhereClause(where, 'authId', ' = ', (null === (authId) ? null : String(authId)));
                where = this.buildWhereClause(where, 'respStatus', ' = ', (this.lookup('claimStatus').getValue()=='NP'?'P':this.lookup('claimStatus').getValue()));

                if (callingSource == 'CDAG') {
                    if (GPI != '') {
                        where = this.buildWhereClause(where, 'GPICode', ' = ', GPI);
                    }
                    else if (GCN != '') {
                        where = this.buildWhereClause(where, 'gcnseq', ' = ', GCN);
                    }
                    else if (NDC != '') {
                        where = this.buildWhereClause(where, 'gcnseq', ' = ', this.lookup('gcndirect').getValue());
                        where = this.buildWhereClause(where,'ndc', '=', NDC);
                    }
                }
                else {
                    where = this.buildWhereClause(where,'ndc', '=', this.lookup('ndc').getValue());
                    where = this.buildWhereClause(where, 'gcnseq', ' = ', this.lookup('gcndirect').getValue());
                }

                if(this.lookup('claimStatus').getValue()=='NP') {
                    where = this.buildWhereClause(where, 'reversedTranID', ' = ',0);
                    where = this.buildWhereClause(where, 'respStatus', ' = ', 'P');
                }

                view.down('pagingtoolbar').moveFirst();

                var claimsStore = vm.getStore('claims');
                claimsStore.getProxy().setExtraParam('pKeyValue', keyValue);
                claimsStore.getProxy().setExtraParam('pKeyType', keyType);
                claimsStore.getProxy().setExtraParam('pRowNum', 0);
                claimsStore.getProxy().setExtraParam('pRowId', '');
                claimsStore.getProxy().setExtraParam('pBatchSize', 5000);
                claimsStore.getProxy().setExtraParam('pWhere', where);
                claimsStore.load({
                    scope: this,
                    callback: function (record, operation, success) {
                        if (operation.getResponse() != null) {
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.data.length > 0) {
                                vm.set('isRecordExists', true);
                            }
                            else {
                                vm.set('isRecordExists', false);
                            }
                        }
                    }
                });
            }
        }
    },

    populateField: function(xtypeVal, keyValue, actTab){
        var cbxField = actTab.down(xtypeVal);
        cbxField.setValue(keyValue);
        cbxField.setRawValue(keyValue);
        cbxField.setDisabled(true);
    },

    onClaimsSearch: function () {
        this.SearchClaims(this.keyType, this.keyValue, false, this.extraPrm,true);
    },

    onExportToExcel: function () {
        var grid  = this.getView().down('#gridClaim'),
            store = grid.getStore();

        Atlas.common.utility.Utilities.exportToExcel(store, 'patPaidAmt');
    },

    buildWhereClause: function (fullString, param, condition, value) {
        if (value === null || value.length === 0) {
            return fullString = fullString.length > 0 ? fullString : fullString
        } else {
            return fullString = fullString.length > 0 ? fullString + ' AND ' + param + condition + "'" + value + "'" : param + condition + "'" + value + "'";
        }
    },

    formatDate: function (date) {
        if (date) {
            return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
        } else {
            return null;
        }
    },

    validateDateRange: function (datefield , isValid, eOpts) {

        var view = this.getView(),
            winDtFrom = view.down('#serviceStartDt'),
            winDtTo = view.down('#serviceEndDt'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();
        if (winDtFromValue != '' && winDtFromValue != null) {
            winDtTo.setMinValue(Ext.Date.format(winDtFromValue, 'm/d/Y'));
        }
        if (winDtToValue != '' && winDtToValue != null) {
            winDtFrom.setMaxValue(Ext.Date.format(winDtToValue, 'm/d/Y'));
        }
        winDtFrom.validate();
        winDtTo.validate();
    },

//==============================================AB=================================
    gridItem_DblClick: function (grid, rcd) {
        if(rcd.get('source') == 'CarveOut'){
            return false;
        }
        else{
            var claimId = rcd.data.claimID;
            var me = this,
                menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');
            me.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
                menuId: menuId,
                atlasId: claimId,
                pClaimId: claimId,
                pClaimStatus:false
            }, null);
        }

    },

    ProcessOnClick: function (component, selctedRow, e) {
        var claimId = component.getWidgetRecord().data.claimID;
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimTest');
        me.fireEvent('openView', 'merlin', 'claims', 'ClaimTest', {
            menuId: menuId,
            atlasId: claimId,
            keyType: 'ClaimID'
        }, null);
    },

    AutoGenrateCDOnClick: function (component, selctedRow, e) {
        var msgTitle = component.text == 'Auto Generate CD' ? 'Auto CD Direct Method:' : 'Create CD override Method:',
            createOverride = component.text == 'Auto Generate CD' ? false : true,
            memberid = component.getWidgetRecord().data.memberID,
            recipientID = component.getWidgetRecord().data.recipientID,
            carrierID = component.getWidgetRecord().data.carrierID,
            npi = component.getWidgetRecord().data.npi,
            gcn = component.getWidgetRecord().data.gcnseq,
            ncpdpid = component.getWidgetRecord().data.ncpdpid,
            ndc = component.getWidgetRecord().data.ndc,
            planGroupId = component.getWidgetRecord().data.planGroupId,
            LOB = component.getWidgetRecord().data.LOB;

        var CoverageDeterminationBean = {
            RecipientID: recipientID,
            MemberID: memberid,
            CarrierID: carrierID,
            PrescriberID: npi,
            GCN_SEQNO: gcn,
            ProviderNABP: '',
            NDC: ndc,
            PlanGroupId: planGroupId,
            DeterminationType: 'CD',
            AuthStatus: '01',
            SOURCE: 'AutoGeneratedPA - Claims Detail'};

        if (createOverride) {
            CoverageDeterminationBean.PAtypeFlag = 'O';
            CoverageDeterminationBean.InTake = 'Phone';
            CoverageDeterminationBean.Requestor = "Prescriber";

            if (LOB == "Medicare") {
                CoverageDeterminationBean.UrgencyType = "medicareStandard";
            }
            else {
                CoverageDeterminationBean.UrgencyType = "urgentConcurrent";
            }
        }

        if ((recipientID != '') && (memberid != '') && (carrierID != '') && (npi != '') && (gcn != '') && (ncpdpid != '')) {
            this.setCoverageDeterminationData(CoverageDeterminationBean, false, createOverride, msgTitle);
        }
        else {
            Ext.Msg.alert('Auto Generate Prior Authorization - Error', 'Request failed. MeridianRx ID, MemberID, Carrier ID, Prescriber NPI, Provider NCPDP and GCN SEQ # are minimum required data to auto generate a PA.');
        }
    },

    setCoverageDeterminationData: function (masterBean, skipWarning, createOverride, msgTitle) {
        var view = this.getView(),
            me = this,
            updateCDModel = Ext.create('Atlas.authorization.model.cdag.SetCoverageDeterminationModel');

        view.mask('Saving Data....');

        updateCDModel.getProxy().setExtraParam('piAuthID', '0');
        updateCDModel.getProxy().setExtraParam('pcSource', 'AutoPA');
        updateCDModel.getProxy().setExtraParam('plSkipWarning', skipWarning);
        updateCDModel.getProxy().setExtraParam('ttPriorAuthData', masterBean);
        updateCDModel.phantom = false;

        updateCDModel.save(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    view.unmask();

                    var objResp = Ext.decode(operation.getResponse().responseText),
                        pResult = objResp.message[0].code,
                        pMessage = objResp.message[0].message,
                        newAuthId = objResp.metadata.piRetAuthID;

                    if (pResult == 1004) {
                        Ext.Msg.confirm('Information', pMessage, function (btn) {
                            if (btn == 'yes') {
                                me.setCoverageDeterminationData(masterBean, true, createOverride, msgTitle)
                            }
                        });
                    }
                    else if (pResult != 0 || newAuthId == '0'){
                        Ext.Msg.alert(msgTitle, pMessage);
                    }
                    else {

                        if (!createOverride) {
                            Ext.Msg.confirm('Auto Generated Coverage Determination ID# ' + newAuthId, 'Would you like to view the auto generated CD?', function (btn) {
                                if (btn == 'yes') {
                                    me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
                                        menuId: Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain'),
                                        authID: newAuthId,
                                        atlasId: newAuthId,
                                        activeTab: 0
                                    });
                                }
                            });
                        }
                        else {
                            me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
                                menuId: Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain'),
                                authID: newAuthId,
                                atlasId: newAuthId,
                                createOverride: true,
                                activeTab: 0
                            });
                        }
                    }
                }
            }
        );
    },

    onExportToPDF: function(){
        var me = this,
            gcn = '',
            gpi = '',
            npi = '',
            ndc = '',
            me = this,
            ncpdpid = '',
            recipientid = '',
            vm = this.getViewModel();

        gcn = me.lookup('gcndirect').getFieldLabel() === 'GCN' ? me.lookup('gcndirect').getValue() : '';
        gpi = me.lookup('gcndirect').getFieldLabel() === 'GPI' ? me.lookup('gcndirect').getValue() : '';
        npi = me.lookup('npiClaims').getValue() ? me.lookup('npiClaims').getValue() : '';
        ndc = me.lookup('ndc').getValue() ? me.lookup('ndc').getValue() : '';
        ncpdpid = me.lookup('ncpdpidClaims').getValue() ? me.lookup('ncpdpidClaims').getValue() : '';
        recipientid = me.lookup('recipientIdClaims').getValue() ? me.lookup('recipientIdClaims').getValue() : '';

        vm.getStore('dataaccessstore').getProxy().setExtraParam('pUserName', Atlas.user.un);
        vm.getStore('dataaccessstore').getProxy().setExtraParam('pExpandToLevel', '');
        vm.getStore('dataaccessstore').load({
            scope: me,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (operation.getResponse() != null) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        vm.set('pcnList', '');
                        vm.set('plangroupList', '');
                        me.getUserAccessPlangroupPCNList(objResp.data.children);
                        Ext.defer(function () {
                            var saveAction = [{
                                "Save": {"key": '', "value": ''}
                            }];

                            var rxNum = me.lookup('rxid').getValue(),
                                authId = me.lookup('authId').getValue();

                            var parameters = me.keyType + '|' + me.keyValue + '|' + me.formatDate(me.lookup('serveDateFrom').getValue()) + '|'
                                + me.formatDate(me.lookup('serveDateTo').getValue()) + '|' + recipientid + '|' + ndc + '|' + ncpdpid + '|' + npi + '|'
                                + me.lookup('claimStatus').getValue() + '|' + (rxNum === null ? null : String(rxNum)) + '|' + gcn + '|' + (authId === null ? null : String(authId)) + '|' + gpi + '|'
                                + vm.get('plangroupList') + '^' + vm.get('pcnList');

                            var extraParameters = {
                                pDescription: 'claimHistory',
                                pProgramName: 'claimsDetailAnalysisPDF.p',
                                pParameters: parameters,
                                pRunMode: 1,
                                pProgramType: 'Report',
                                pSaveDocument: false,
                                pFaxNumber: ''
                            };

                            var submitJob = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
                                saveAction, ['pData']);

                            if (submitJob.code == 0) {
                                Atlas.common.utility.Utilities.displayDocument('pdf', submitJob.pData);
                            }
                            else {
                                Ext.Msg.alert('Error', 'Error in Job submission.');
                            }
                        }, 300);
                    }
                    else {
                        Ext.Msg.alert('PBM', objResp.message[0].message);
                    }
                }
            }
        });
    },

    getUserAccessPlangroupPCNList: function(record){
        record.forEach(function (item, index) {
            var pcnList = this.getViewModel().get('pcnList'),
                plangroupList = this.getViewModel().get('plangroupList');
            if(item.leaf){
                if(pcnList){
                    if(pcnList.charAt(pcnList.length - 1) === ','){
                        this.getViewModel().set('pcnList', (pcnList + (item.PCNList ? item.PCNList : '')));
                    }
                    else{
                        this.getViewModel().set('pcnList', (pcnList + (item.PCNList ? (',' + item.PCNList) : '')));
                    }
                }
                else{
                    this.getViewModel().set('pcnList', (pcnList + (item.PCNList ? item.PCNList : '')));
                }

                if(plangroupList){
                    if(plangroupList.charAt(plangroupList.length - 1) === ','){
                        this.getViewModel().set('plangroupList', (plangroupList + (item.PlanGroupList ? item.PlanGroupList : '')));
                    }
                    else{
                        this.getViewModel().set('plangroupList', (plangroupList + (item.PlanGroupList ? (',' + item.PlanGroupList) : '')));
                    }
                }
                else{
                    this.getViewModel().set('plangroupList', (plangroupList + (item.PlanGroupList ? item.PlanGroupList : '')));
                }
            }
            else {
                this.getUserAccessPlangroupPCNList(item.children);
            }
        }, this);
    }

});