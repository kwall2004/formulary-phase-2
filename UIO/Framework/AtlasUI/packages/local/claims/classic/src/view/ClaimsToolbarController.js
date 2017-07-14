/**
 * Created by T4317 on 10/17/2016.
 */
Ext.define('Atlas.claims.view.ClaimsToolbarController', {
    extend: 'Atlas.common.view.merlin.MenuBaseController',
    alias: 'controller.claims-toolbar',
    listen: {
        controller: {
            '*': {
                redirectSelectedClaim: 'redirectSelectedClaim'
            }
        }
    },

    init: function () {

        var me = this;
            // view = me.getView(),
            // atlasId = view.atlasId;
        me.callParent();
        //linked from dashboard claim alerts widget
        // if (atlasId !== null) {
        //     view.lookup('claimbox').setValue(atlasId);
        //
        //     // when coming from pharmacy, the status tab is not present
        //     /*if (me.getView().items.length==0)
        //         me.addDetailStatusTab();*/
        //     //add the drug info to the tab layout then search
        //
        //     me.searchClaim();
        //     me.addDrugInfoTab();
        // } else {
        //     me.addDrugInfoTab();
        // }


    },

    boxReady: function () {
        var me = this,
            view = me.getView(),
            atlasId = view.atlasId;

        if (atlasId !== null) {
            view.lookup('claimbox').setValue(atlasId);

            // when coming from pharmacy, the status tab is not present
            /*if (me.getView().items.length==0)
             me.addDetailStatusTab();*/
            //add the drug info to the tab layout then search

            me.searchClaim();
            me.addDrugInfoTab();
        } else {
            me.addDrugInfoTab();
        }
    },

    redirectSelectedClaim: function (claimId) {
        if (claimId != null && claimId != undefined && claimId != '') {
            this.getView().lookup('claimbox').setValue(claimId);
            this.searchClaim();
        }
    },

    onSpecialKeyClaimSearch: function (field, e) {
        var me = this;

        if (e.getKey() == e.ENTER) {
            me.searchClaim();
        }
    },
    onAdvacnedSearch: function () {
        var view = this.getView(),
            claimSearchWindow = view.add({
                xtype: 'claims-claimssearchwindow'
            });
        claimSearchWindow.show();
    },

    onSendPA: function () {
        var vm = this.getViewModel();
        var paWindow;
        if (!this.paWindow) {
            paWindow = Ext.create('Ext.window.Window', {
                autoShow: true,
                closeAction: 'hide', // Keep window around and don't destroy
                title: 'Fax Form',
                modal: true,
                width: 400,
                height: 235,
                items: [{
                    xtype: 'sendpaForm',
                    viewModel: {
                        data: {
                            claimrecord: vm.get('masterrecord')
                        }
                    }
                }]
            });
        } else {
            paWindow.show();
        }
    },
    searchClaim: function () {
        var me = this,
            view = me.getView(),
            claimId = me.lookup('claimbox').getValue() || view.atlasId,
            vm = me.getViewModel(),
            PatientResponsibility = vm.getStore('PatientResponsibility'),
            fieldlist = '@drugType,@compoundCodeDesc,ndc,@drugLN,' +
                'quantityPrescribed,dispQuantity,daysSupply,@dawType,' +
                '@clinicalFormulation,@therapeuticClass,gcnseq,@gnn,partDDrug,PartBDrug,@PDLFlag,@Covered,@SpecialtyDrugInd,@Tiercode,GPICoderecipientID,respStatus,ncpdpID,serviceDate,NDC,prescriberID,prescriberNPI,presFirstName,' +
                'prescriberLastName,rxBin,PCN,rxNum,insuredId,pbmCarrierId,gcnseq,insuredFirstName,insuredLastName,' +
                'reversedTranId,transactionCode,holdFlag,authID,planGroupId,@planGroupName,versionNum,@transDateTime,' +
                '@LineOfBusiness,@applyPlanPricing,@SourceIdentity,@drugType,@compoundCodeDesc,ndc,@drugLN,' +
                'dispQuantity,daysSupply,@dawType, @clinicalFormulation,@therapeuticClass,gcnseq,@gnn,formularyDetails.Covered,' +
                'formularyDetails.PAInd,@StepTherapyName,@PAapprovalCriteria, formularyDetails.DrugType,formularyDetails.SpecialtyDrugInd,' +
                'formularyDetails.PDLFlag,formularyDetails.PAName, formularyDetails.PAMinAge,formularyDetails.PAMaxAge,formularyDetails.QtyLimit,' +
                'formularyDetails.QtyLmtTimePeriod,formularyDetails.DaysSupply,' +
                'formularyDetails.DaysSupplyTimePeriod,formularyDetails.MinAge,formularyDetails.MaxAge,formularyDetails.ETC_ID,formularyDetails.ETC_NAME,' +
                'formularyDetails.StepTherapyInd,formularyDetails.StepTherapyName,formularyDetails.PartDExcludedDrug,' +
                'formularyDetails.MedicarePAType,formularyDetails.OTCInd,formularyDetails.CMS_RxCUI,@FormularyInfo,formularyVer,GPICode,DataSource,' +
                'recipientID,respStatus,reversedTranId,ncpdpid,@providerName,' +
                'rxbin,prescriberID,prescriberNPI,@prescriberName,quantityPrescribed' +
                'transactionCode,invoiceNum,holdFlag,otherCoverageCode,genderCode,' +
                '@ReasonForServiceCode,@ProfessionalServiceCode,@PatResidenceCode,@PharmacyServType,TransitionFill,TransitionDate,@TransitionFillType,' +
                'EmergencyFill,@mcsProgGroupCode,@otherPayerPatRespQual,@otherPayerPatRespAmt,@RetroTermedInd,@applyPlanPricing,SubClarificationCode,' +
                'ShortCycleFill,nonExchangeClaim,@ClaimAdjudicationCode,holdFlag,OTCInd,Notes.Note,contractID,@BLANDAdrug,genSubstitutableNDC',
            claimmaster = Ext.create('Atlas.common.model.ClaimMasterData');

        claimmaster.getProxy().setExtraParam('pPlanID', 'HPM');
        claimmaster.getProxy().setExtraParam('pTransactionID', claimId);
        claimmaster.getProxy().setExtraParam('pFieldList', fieldlist);
        claimmaster.load({
            failure: function (record) {
            },
            success: function (record) {
            },
            callback: function (record) {
                record.data.page = 'claim';
                record.data.key = 'ClaimID';
                record.data.keyvalue = claimId;
                record.data.keytext = claimId;
                vm.set('contactlogmasterrecord', record.data);
                me.fireEvent('contactloggridrefresh');
                //if (record.get('contractID') && record.get('contractID') != '0') {
                    vm.set('paidcontracttext', '<div style=color:red;><b>This claim is paid by Contract ID #' + record.get('contractID') + '</b></div>');
                //}
                //else {
                //    vm.set('paidcontracttext', '');
                //}
                vm.set('masterrecord', record);

                view.lookup('pharm').setDisabled(false);

                if (record.get('respStatus') === 'R') {
                    view.lookup('override').setDisabled(false);
                    view.lookup('createPa').setDisabled(false);
                }
                else {
                    view.lookup('override').setDisabled(true);
                    view.lookup('createPa').setDisabled(true);
                }

                if (record.get('@applyPlanPricing') === 'True') {
                    vm.set('planpricing', true);
                } else {
                    vm.set('planpricing', false);
                }

                if (record.get('pbmCarrierId') === '5' || record.get('pbmCarrierId') === '55') {
                    view.lookup('paForm').setDisabled(false);
                } else {
                    view.lookup('paForm').setDisabled(true);
                }
                if(PatientResponsibility)
                    PatientResponsibility.removeAll();

                if (record.get('otherCoverageCode') == '08' || record.get('otherCoverageCode') == '8' || record.get('otherCoverageCode') == '02' || record.get('otherCoverageCode') == '2') {
                    vm.set('PatientResponsibilityHide', false);
                    var otherPayerPatRespQual = record.get('@otherPayerPatRespQual'),
                        otherPayerPatRespAmt = record.get('@otherPayerPatRespAmt');

                    var otherPayerPatRespQualList = otherPayerPatRespQual.split(';'),
                        otherPayerPatRespAmtList = otherPayerPatRespAmt.split(';');

                    for (var item in otherPayerPatRespQualList) {
                        PatientResponsibility.add(
                            {
                                otherPayerPatRespQual: otherPayerPatRespQualList[item],
                                otherPayerPatRespAmt: otherPayerPatRespAmtList[item]
                            }
                        );                    }
                }
                else {
                    vm.set('PatientResponsibilityHide', true);
                }

                if (record.get('otherCoverageCode') == '08' || record.get('otherCoverageCode') == '8') {
                    view.down('#responsibilityGrid').setTitle('Patient Resp Amount');
                }
                else if (record.get('otherCoverageCode') == '02' || record.get('otherCoverageCode') == '2') {
                    view.down('#responsibilityGrid').setTitle('Other Payer Paid');
                }

                me.getPrescriberData(vm, record.get('prescriberNPI'));
                me.getPharmacyData(vm, record.get('ncpdpID'));
                me.getDrugPricing(vm, claimId);
                me.getClaimRejectionInfo(vm, claimId);
                me.getDurAlerts(vm, claimId);
                me.getContactLog(vm, claimId);
                me.getOptions(vm);
                me.getClaimCoumpounds(vm, claimId);
                me.checkClaimReverseAccess(vm);
                me.getReverseClaimInfo(vm);
                me.getHoldPaymentInformation(vm);

                //append claimId to the title
                view.setTitle('Claims Detail' + ' - ' + claimId);
            }
        });
    },

    getOptions: function (vm) {
        var me = this,
            masterrecord = vm.get('masterrecord'),
            optionsStore = vm.getStore('options');
        optionsStore.getProxy().setExtraParam('ipcKeyName', "TransitionFillEditUsers");
        optionsStore.load({
            callback: function (record, operation) {
                var validusers = Ext.decode(operation.getResponse().responseText).metadata.opcKeyValue.split(',');
                for (var i = 0; i <= validusers.length; i++) {
                    if (validusers[i] === Atlas.user.un) {
                        if (masterrecord.get('respStatus') === 'P' && masterrecord.get('transactionCode') === 'B1' && masterrecord.get('reversedTranId') === '0') {
                            vm.set('canEdit', false);
                        }
                        else {
                            vm.set('canEdit', true);
                        }
                        return;
                    }
                }
            }
        });
    },
    editPatientSeg: function () {
        var me = this,
            vm = me.getViewModel();

        vm.set('canEdit', true);
        vm.set('canUpdate', false);
        vm.set('canCancel', false);
        vm.set('transFill', true);
        vm.set('transFillEdit', false);
    },
    updatePatientSeg: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            masterrecord = vm.get('masterrecord'),
            record = Ext.create('Atlas.common.model.ClaimMasterData', {}),
            pcFieldList = 'TransitionFill',
            tFill = view.lookup('transFillDropDown').value,
            transId = me.lookup('claimbox').getValue()

        record.phantom = false;
        //record.getProxy().extraParams = {};
        record.getProxy().setExtraParam('pTransID', transId);
        record.getProxy().setExtraParam('pcFieldList', pcFieldList);
        record.getProxy().setExtraParam('pcData', tFill);
        masterrecord.set('TransitionFill', tFill);
        record.save({
            callback: function (record) {
            }
        });
        vm.set('canEdit', false);
        vm.set('canUpdate', true);
        vm.set('canCancel', true);
        vm.set('transFill', false);
        vm.set('transFillEdit', true);
    },
    cancelPatientSeg: function () {
        var me = this,
            vm = me.getViewModel();

        vm.set('canEdit', false);
        vm.set('canUpdate', true);
        vm.set('canCancel', true);
        vm.set('transFill', false);
        vm.set('transFillEdit', true);
    },
    addDrugInfoTab: function () {
        var me = this;
        view = me.getView(),
            pClaimStatus= false,
        atlasId = view.atlasId;
        //defer so that the status tab gets added to the workspace first
        if(view.pClaimStatus)
            pClaimStatus =true;
        Ext.defer(function () {
            me.addSubTab({route: "merlin/claims/detail_ClaimDrugInfo", text: "Drug Info"}, pClaimStatus);
        }, 1000);
    },
    addDetailStatusTab: function () {
        var me = this;

        //defer so that the status tab gets added to the workspace first
        //Ext.defer(function () {
            me.addSubTab({route: "merlin/claims/detail_ClaimDetailStatus", text: "Status"}, false);
        this.addDrugInfoTab();
        //}, 1000);
    },
    addSubTab: function (tab, active) {
        var me = this,
            view = me.getView(),
            cards = view.getLayout().getLayoutItems(),
            created = false,
            len = cards.length,
            i = 0;

        //Check if the tab exists
        for (; i < len; i++) {
            if (cards[i].route === tab.route) {
                created = true;
                view.setActiveTab(cards[i]);
            }
        }

        if (!created) {
            view.add({
                xclass: Atlas.common.Util.classFromRoute(tab.route),
                route: tab.route,
                title: tab.text
            });

            if (active) {
                view.setActiveTab(len);
            } else {
                view.setActiveTab(0);
            }
        }
    },
    getClaimCoumpounds: function (vm, claimId) {
        var compoundModel = vm.getStore('compounds');
        compoundModel.getProxy().setExtraParam('pClaimId', claimId);
        compoundModel.load({
            success: function () {
            },
            callback: function (record) {

            }
        });
    },
    getPrescriberData: function (vm, npi) {
        var prescriberMasterModel = Ext.create('Atlas.common.model.Prescriber', {});
        prescriberMasterModel.getProxy().setExtraParam('pKeyValue', npi);
        prescriberMasterModel.load({
            success: function () {
            },
            callback: function (record) {
                vm.set('prescriberrecord', record.getData());
            }
        });

    },
    getContactLog: function (vm, claimId) {
        var contactlogstore = vm.getStore('contactloglist');

        // if (vm.get('masterrecord') && vm.get('openedTabs.contactLog') === true) {
        contactlogstore.getProxy().setExtraParam('pKeyType', 'ClaimID');
        contactlogstore.getProxy().setExtraParam('pKeyValue', claimId);

        contactlogstore.load({
            callback: function (record, operation, success) {
                //me.fireEvent('recordLoaded');
            }
        });
        // }
    },
    getPharmacyData: function (vm, ncpdpId) {
        var fieldlist = "ncpdpid,name,locCity,locState,locAddress1,locAddress2,locZip,locCrossStreet,mailAddress1,mailCity,mailState,mailZip," +
            "locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactFax,contactExt,ContactEmail," +
            "legalBusinessName,primDispTypeCode,secDispTypeCode,tertDispTypeCode,dispClassCode,fedTaxId,@Excluded";
        var pharmacyMasterModel = Ext.create('Atlas.common.model.Pharmacy', {});
        if (ncpdpId) {
            pharmacyMasterModel.getProxy().setExtraParam('pKeyValue', ncpdpId);
            pharmacyMasterModel.getProxy().setExtraParam('pKeyType', 'ncpdpId');
            pharmacyMasterModel.getProxy().setExtraParam('pFieldList', fieldlist);
            pharmacyMasterModel.load({
                callback: function (record) {
                    vm.set('pharmacyrecord', record.getData());
                }
            });
        }
        else {
            vm.set('pharmacyrecord', pharmacyMasterModel);
        }
    },

    getDrugPricing: function (vm, transactionId) {
        var drugpricingstore = vm.getStore('drugpricing');
        var pricing = vm.getStore('pricing');
        var storePlanPricing = vm.getStore('storePlanPricing');

        pricing.getProxy().setExtraParam('pClaimID', transactionId);
        pricing.getProxy().setExtraParam('pPlanPricing', 'false');
        storePlanPricing.getProxy().setExtraParam('pClaimID', transactionId);
        storePlanPricing.getProxy().setExtraParam('pPlanPricing', 'true');
        drugpricingstore.getProxy().setExtraParam('pClaimID', transactionId);
        drugpricingstore.load({
            success: function (record, operation) {
            },
            callback: function (record, operation) {
                pricing.load();
                storePlanPricing.load();
				drugpricingstore.sort('DESCRIPTION', 'ASC');
                if (record.length > 0) {
                    vm.set('dispensedquantity', 'Dispensed Quantity = ' + record[0].get('paid'));
                    var dispensedquantityrecord = drugpricingstore.findRecord('DESCRIPTION', 'Dispensed Quantity');
                    if (dispensedquantityrecord) {
                        drugpricingstore.remove(dispensedquantityrecord);
                    }
                }
                else {
                    vm.set('dispensedquantity', '');
                }
            }
        });
    },

    getClaimRejectionInfo: function (vm, transactionId) {
        var claimrejectionstore = vm.getStore('claimrejectcodesext');
        claimrejectionstore.getProxy().setExtraParam('pTransactionID', transactionId);
        claimrejectionstore.load({
            success: function (record, operation) {
            },
            callback: function (record, operation) {
            }
        })
    },

    getDurAlerts: function (vm, claimId) {
        var duralertstore = vm.getStore('duralerts');
        duralertstore.getProxy().setExtraParam('pClaimID', claimId);
        duralertstore.load({
            callback: function (record, operation, success) {
                if (success) {
                    var objResp = Ext.decode(operation.getResponse().responseText)
                }
            }
        });
    },

    menuOnClick: function (selection) {
        var tabPanel = this.getView();

        var existingTab = tabPanel.down(selection.value),
            tab;

        if (!existingTab) {
            tab = tabPanel.add({
                xtype: selection.value
            });

            tabPanel.setActiveTab(tab);
        } else {
            tabPanel.setActiveTab(existingTab);
        }
    },

    routeToMember: function () {
        var me = this,
            vm = this.getViewModel(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');

        if (vm.get('masterrecord') && vm.get('masterrecord').get('recipientID') && vm.get('masterrecord').get('recipientID') != 0) {
            me.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
                atlasId: vm.get('masterrecord').get('recipientID'),
                menuId: menuId,
                RID: vm.get('masterrecord').get('recipientID'),
                keyValue: '0',
                openView: true,
                recordCase: null,
                subTabs: ['member-demographics']
            });
        }
    },
    routeToPrescriber: function () {
        var vm = this.getViewModel();
        if (vm.get('masterrecord') && vm.get('masterrecord').get('prescriberNPI') && vm.get('masterrecord').get('prescriberNPI') != 0) {
            this.routeTo(vm.get('masterrecord').get('prescriberNPI'), 'merlin/prescriber/PrescriberToolbar');
        }
    },
    routeToPharmacy: function () {
        var vm = this.getViewModel();
        if (vm.get('masterrecord') && vm.get('masterrecord').get('ncpdpID') && vm.get('masterrecord').get('ncpdpID') != 0) {
            this.routeTo(vm.get('masterrecord').get('ncpdpID'), 'merlin/pharmacy/Pharmacy');
        }
    },
    routeToDrugSearch: function () {
        var vm = this.getViewModel();
        if (vm.get('masterrecord') && vm.get('masterrecord').get('NDC') && vm.get('masterrecord').get('NDC') != 0) {
            this.routeTo(vm.get('masterrecord').get('NDC'), 'merlin/formulary/FDBDrugSearch');
        }
    },
    routeToCDAG: function () {
        var vm = this.getViewModel();
        if (vm.get('masterrecord') && vm.get('masterrecord').get('authID') && vm.get('masterrecord').get('authID') != 0) {
            this.routeTo(vm.get('masterrecord').get('authID'), 'merlin/authorization/cdag_CDAGMain');
        }
    },
    routeTo: function (atlasId, route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route),
            viewRoute = route.split('/'),
            atlasId = atlasId;

        me.fireEvent('openView', viewRoute[0], viewRoute[1], viewRoute[2], {
            menuId: menuId,
            atlasId: atlasId
        });
    },

    AutoGenrateCDOnClick: function (component) {
        var vm = this.getViewModel(),
            msgTitle = component.text == 'Create PA' ? 'Auto CD Direct Method:' : 'Create CD override Method:',
            createOverride = component.text == 'Create PA' ? false : true,
            record = vm.get('masterrecord'),
            memberid = record.get('insuredId'),
            recipientID = record.get('recipientID'),
            carrierID = record.get('pbmCarrierId'),
            npi = record.get('prescriberNPI'),
            gcn = record.get('gcnseq'),
            ncpdpid = record.get('ncpdpid'),
            ndc = record.get('ndc'),
            planGroupId = record.get('planGroupId'),
            LOB = record.get('planGroupName');

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
            SOURCE: 'AutoGeneratedPA - Claims Detail'
        };

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
                    else if (pResult != 0 || newAuthId == '0') {
                        Ext.Msg.alert(msgTitle, pMessage);
                    }
                    else {
                        if (!createOverride) {
                            Ext.Msg.confirm('Auto Generated Coverage Determination ID# ' + newAuthId, 'Would you like to view the auto generated CD?', function (btn) {
                                if (btn == 'yes') {
                                    me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
                                        menuId : Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain'),
                                        authID: newAuthId,
                                        atlasId: newAuthId,
                                        activeTab: 0
                                    });
                                }
                            });
                        }
                        else {
                            me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
                                menuId : Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain'),
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

    checkClaimReverseAccess: function (vm) {
        vm.set('canReversable', false);
        var masterrecord = vm.get('masterrecord'),
            storeclaimreverseaccess = vm.getStore('claimreverseaccess');
        if (masterrecord.get('respStatus') == 'P' && masterrecord.get('transactionCode') == 'B1' && masterrecord.get('reversedTranId') == '0') {
            storeclaimreverseaccess.load({
                callback: function (record, operation) {
                    var objRespClaimReverseAccess = Ext.decode(operation.getResponse().responseText);
                    for (var index = 0; index < objRespClaimReverseAccess.data.length; index++) {
                        if (objRespClaimReverseAccess.data[index].name == Atlas.user.un) {
                            vm.set('canReversable', true);
                            return;
                        }
                    }
                }
            });
        }
    },

    onReverseClaim: function () {   
        Ext.MessageBox.prompt('Reversal Confirmation', 'Are you sure you would like to reverse this claim? Please provide the reason to reverse.', function (btn, text) {
            if (btn == 'ok') {
                var masterrecord = this.getViewModel().get('masterrecord'),
                    transactionId = masterrecord.get('keyvalue'),
                    saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

                var reverseTransaction = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/reversetransaction/read', null, [true], {
                    pNotes: text,
                    pTranId: transactionId
                }, saveAction, null);
                if (reverseTransaction.code == '0') {
                    this.searchClaim();
                }
                else {
                    Ext.Msg.alert('Error', reverseTransaction.message);
                }
            }
        }, this);
    },

    getReverseClaimInfo: function (vm) {
        var view = this.getView(),
            masterrecord = vm.get('masterrecord'),
            transCode = masterrecord.get('transactionCode');
        vm.set('tranCodeB1B2', false);
        if (transCode) {
            if (transCode == 'B1' || transCode == 'B2') {
                vm.set('tranCodeB1B2', true);
                view.lookup('lblOrgClaimID').setFieldLabel(transCode == 'B1' ? 'RevClaimID' : 'OrgClaimID');
                view.lookup('orgClaimID').setTooltip(transCode == 'B1' ? 'RevClaimID' : 'OrgClaimID');
            }
        }
    },

    routeToClaims: function (btn, event) {
        if (btn.text && btn.text !== '0') {
            this.routeTo(btn.text, 'merlin/claims/ClaimsToolbar');
        }
    },

    getHoldPaymentInformation: function (vm) {
        var view = this.getView(),
            notes = '';
        Ext.defer(function () {
            //debugger;

            view.lookup('holdBox').hide();
            view.lookup('holdBox').suspendEvents();
            view.lookup('holdBox').setValue(vm.get('masterrecord').get('holdFlag') === 'yes');
            view.lookup('holdBox').resumeEvents();
            if (vm.get('masterrecord').get('Notes.Note')) {
                notes = vm.get('masterrecord').get('Notes.Note').replace(/EOM/g, '\n');
            }
            view.lookup('holdNotebox').setValue(notes);
            optionsStore = vm.getStore('options');
            optionsStore.getProxy().setExtraParam('ipcKeyName', "HoldPayment");
            optionsStore.load({
                scope: this,
                callback: function (record, operation) {
                    var holdPaymentAccessUser = Ext.decode(operation.getResponse().responseText).metadata.opcKeyValue.split(',');
                    for (var i = 0; i <= holdPaymentAccessUser.length; i++) {
                        if (holdPaymentAccessUser[i] === Atlas.user.un) {
                            view.lookup('holdBox').show();
                            view.lookup('holdPaymentMsg').hide();
                            return;
                        }
                    }
                }
            });
        }, 1000);
    },

    pharmacyTransaction_Click: function () {
        var vm = this.getViewModel();
        var setsubmitjob = Atlas.common.utility.Utilities.submitJobViewDoc('Pharmacy Transaction', 'ltrPharmacyTransaction.p', vm.get('masterrecord').data.keyvalue, 1, 'Report', false, '');

        if (setsubmitjob.code == 0) {
            Atlas.common.utility.Utilities.displayDocument(setsubmitjob.type, setsubmitjob.data);
            //window.open('data:application/pdf;base64,' + escape(setsubmitjob.pData), 'mywindow', 'menubar=1,resizable=1,width=1300,height=1050');
        }
        else {
            Ext.Msg.alert('Error', setsubmitjob.message);
        }
    },

    onMenuClick: function (menu, item) {
        var me = this,
            view = me.getView(),
            vm = this.getViewModel(),
            cards = view.getLayout().getLayoutItems(),
            created = false,
            len = cards.length,
            i = 0;
        //Check if the tab exists
        for (; i < len; i++) {
            if (cards[i].route === item.route) {
                created = true;
                view.setActiveTab(cards[i]);
            }
        }

        if (!created) {
            view.add({
                xclass: Atlas.common.Util.classFromRoute(item.route),
                height : '100%',
                route: item.route,
                title: item.text
            });
            view.setActiveTab(len);
            if (item.text == "Contact Log") {
                this.fireEvent('contactloggridrefresh');
            }
        }
    },

    onMenuLoad: function (store, records, success) {
        if(!success){
            //we might want to fire an error here.. not sure.
            return true;
        }
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            menu = me.lookup('menu'),
            items = [],
            i = 0,
            iLen = records.length,
            defaultMenu = -1,
            itemTitle,
            route;

        for (; i < iLen; i++) {
            if(records[i].data.menuTitle.toLowerCase() != 'status' && records[i].data.menuTitle.toLowerCase() != 'drug info'){
                items.push({
                    text: records[i].get('menuTitle'),
                    route: records[i].get('route')
                });
            }

            if (records[i].get('defaultMenu')) {
                defaultMenu = i;
                route = records[i].get('route');
                itemTitle = records[i].get('menuTitle');
            }
        }

        menu.getMenu().add(items);

        if (defaultMenu > -1) {
            //route = items[defaultMenu].route;
            view.add({
                xclass: Atlas.common.Util.classFromRoute(route),
                title: itemTitle,
                route: route,
                closable: false
            });
            view.setActiveTab(0);
        }

        if (vm.get('viewready')) {
            view.unmask();
        }

        vm.set('initialized', true);

    }

});
