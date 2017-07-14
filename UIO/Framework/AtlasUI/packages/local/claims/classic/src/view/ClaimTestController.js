/**
 * Created by T4317 on 11/14/2016.
 */
Ext.define('Atlas.claims.view.ClaimTestController', {
    extend: 'Ext.app.ViewController',
    alias:'controller.claims-claimtest',
    recipientID: null,
    NPI: null,
    NDC: null,
    NCPDPID: null,
    GCN: null,

    listen: {
        store: {
            '#PatientResidenceCode': {
                load: 'filterListStore'
            }
        },
        controller: {
            '*': {
                redirectSelectedTestClaim: 'GetTestClaimData'
            }
        }
    },

    setHorizPanScroll:function(myPanel){
        var vm = this.getViewModel(),
            minPanSize = vm.get('minPanSize'),
            panWidth = myPanel.getWidth();

        if (minPanSize >= panWidth){
            vm.set('horizPanScroll', true);
        }
        else{
            vm.set('horizPanScroll', false);
        }
    },

    onMinSizeReached: function(myPanel, panWidth, panHeight, oldWidth){
        var vm = this.getViewModel(),
            minPanSize = vm.get('minPanSize'),
            panId = '#' + myPanel.getItemId();

        if (((oldWidth > minPanSize) && (panWidth > minPanSize)) || ((oldWidth <= minPanSize) && (panWidth <= minPanSize))){
            return;
        }

        var arrayContainers = Ext.ComponentQuery.query(panId + ' > container'),
            arrayDatefield = Ext.ComponentQuery.query(panId + ' > datefield'),
            arrayCbx = Ext.ComponentQuery.query(panId + ' > combobox'),
            arrayDispField = Ext.ComponentQuery.query(panId + ' > displayfield'),
            arrayNumField = Ext.ComponentQuery.query(panId + ' > numberfield'),
            arrayTextField = Ext.ComponentQuery.query(panId + ' > textfield'),
            allComp = [];

        allComp = allComp.concat(arrayCbx).concat(arrayDatefield).concat(arrayDispField).concat(arrayNumField).concat(arrayTextField).concat(arrayContainers);

        if (panWidth <= minPanSize){
            Ext.Array.each(allComp, function(item, index, array){
                item.setWidth(300);
            });
            vm.set('horizPanScroll', true);
        }
        else{
            Ext.Array.each(allComp, function(item, index, array){
                item.setWidth('100%');
            });
            vm.set('horizPanScroll', false);
        }
    },

    boxReady: function (view, width, height) {
        if(view.atlasId) {

            if (view.keyType == 'ClaimID' || view.keyType == 'AuthID') {
                if (view.keyType == 'ClaimID') {
                    view.down('#btnClaimID').setValue(view.atlasId);
                }
                else {
                    view.down('#btnAuthID').setValue(view.atlasId);
                }
                view.setTitle('Claim Test ' + view.atlasId);
                this.GetDetailsForTestClaim(view.keyType, view.atlasId);
            }
        }
    },

    filterListStore: function(store, records, success) {

        store.each(function (record) {
            if (record.get('value').split(',')[0].trim().length <= 1) {
                var itemIndex = store.data.indexOf(record);
                store.removeAt(itemIndex );
            }
        });
    },

    loadTestClaim: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.GetTestClaimData(f.lastValue, false);
        }
    },

    loadClaimInfo: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.GetDetailsForTestClaim('ClaimID', f.lastValue);
        }
    },

    loadAuthInfo: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.GetDetailsForTestClaim('AuthId', f.lastValue);
        }
    },

    GetTestClaimData: function (testClaimId, onSave) {
        var me = this,
            vm = this.getViewModel(),
            view = this.getView(),
            ClaimTestData = vm.getStore('ClaimTestData');

        if (testClaimId == undefined || testClaimId == null || testClaimId == '') {
            Ext.Msg.alert('Message', 'Please enter Test Claim ID.');
            return;
        }

        view.down('#btnAuthID').setValue('');
        view.down('#btnClaimID').setValue('');

        view.mask('Loading...');
        view.down('#testClaimId').setValue(testClaimId);

        ClaimTestData.getProxy().setExtraParam('pTransactionID', testClaimId);
        ClaimTestData.getProxy().setExtraParam('pCallingSource', '');
        ClaimTestData.getProxy().setExtraParam('pWhereClause', '');
        ClaimTestData.getProxy().setExtraParam('ipiBatchSize', 0);
        ClaimTestData.getProxy().setExtraParam('ipiJumpStart', 0);
        ClaimTestData.getProxy().setExtraParam('ipcDirection', 'Fwd');
        ClaimTestData.getProxy().setExtraParam('ipcBckRecPointer', '');
        ClaimTestData.getProxy().setExtraParam('ipcFwdRecPointer', '');
        ClaimTestData.load({
            callback: function (record, operation, success) {
                me.getView().unmask();
                me.populateTestClaimInfo(record, operation, onSave, true);
            }
        });
    },

    GetDetailsForTestClaim: function (keyType, keyValue) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            ClaimTestDetailData = vm.getStore('ClaimTestDetailData');

        if (keyValue == undefined || keyValue == null || keyValue == '') {
            Ext.Msg.alert('Message', keyType == 'AuthId' ? 'Please enter Auth ID.' : 'Please enter Claim ID.');
            return;
        }

        view.down('#testClaimId').setValue('');

        if (keyType == 'ClaimID') {
            view.down('#btnAuthID').setValue('');
        }
        else {
            view.down('#btnClaimID').setValue('');
        }

        view.mask('Loading...');

        ClaimTestDetailData.getProxy().setExtraParam('pKeyType', keyType);
        ClaimTestDetailData.getProxy().setExtraParam('pKeyValue', keyValue);
        ClaimTestDetailData.load({
            callback: function (record, operation, success) {
                view.unmask();
                me.populateTestClaimInfo(record, operation, false, false);
            }
        });

    },

    populateTestClaimInfo: function (record, operation, onSave, isTestClaim) {
        var me = this,
            vm = this.getViewModel(),
            view = this.getView(),
            btnCheckStatus = view.down('#btnCheckStatus'),
            lblClaimStsatus = view.down('#lblClaimStsatus'),
            tabClaimDetails = view.down('#tabClaimDetails'),
            PatientResponsibility = vm.getStore('PatientResponsibility'),
            ClaimRejectionDetail = vm.getStore('ClaimRejectionDetail'),
            PharmacyPricingStore = vm.getStore('PharmacyPricingStore'),
            PlanPricingStore = vm.getStore('PlanPricingStore'),
            SubmitPaid = vm.getStore('SubmitPaid'),
            storecompoundgcn = vm.getStore('storecompoundgcn'),
            DUROverride = vm.getStore('DUROverride');

        var objResp = Ext.decode(operation.getResponse().responseText);

        tabClaimDetails.reset();
        PatientResponsibility.removeAll();
        ClaimRejectionDetail.removeAll();
        storecompoundgcn.removeAll();
        DUROverride.removeAll();
        PharmacyPricingStore.removeAll();
        PlanPricingStore.removeAll();
        SubmitPaid.removeAll();
        me.recipientID = null;
        me.NDC = null;
        me.NCPDPID = null;
        me.NPI = null;
        vm.set('Notes', '');

        if (record.length != 0) {
            tabClaimDetails.loadRecord(record[0]);

            if (record[0].data.PCN != '') {
                view.down('#cbxPCN').setValue(record[0].data.PCN);
                view.down('#cbxPCN').setRawValue(record[0].data.PCN);
                view.down('#cbxPCN').setDisabled(true);
            }
            else {
                view.down('#cbxPCN').setDisabled(false);
            }

            me.recipientID = isTestClaim ? record[0].data.recipientID : record[0].data.recipientId;
            me.NDC = record[0].data.NDC;
            me.NCPDPID = record[0].data.NCPDPId;
            me.NPI = record[0].data.prescriberNPI;
            vm.set('Notes', record[0].data.Notes);
            vm.set('ApplyPlanPricing', record[0].data.applyPlanPricing);

            view.down('#InsuredID').setRawValue(record[0].data.InsuredID);
            view.down('#memberName').setValue(record[0].data.patFirstName + ' ' + record[0].data.patLastName);

            if (record[0].data.dateOfBirth != null) {
                view.down('#memberDOB').setValue(Ext.Date.format(new Date(record[0].data.dateOfBirth), 'm/d/Y'));
            }
            if (record[0].data.genderCode.toUpperCase() == 'M' || record[0].data.genderCode == '1') {
                view.down('#memberGender').setValue('MALE');
            }
            else if (record[0].data.genderCode.toUpperCase() == 'F' || record[0].data.genderCode == '2') {
                view.down('#memberGender').setValue('FEMALE');
            }
            else {
                view.down('#memberGender').setValue('');
            }

            view.down('#NDC').setRawValue(record[0].data.NDC);

            view.down('#cbxPharmacy').setRawValue(record[0].data.NCPDPId);
            view.down('#pharmacyAddress').setValue(isTestClaim == true ? record[0].data.PharmacyNameDescr : record[0].data.pharmacyAddress);

            view.down('#prescriberNPI').setRawValue(record[0].data.prescriberNPI);

            if (record[0].data.FWAPrescriberLockFlag == true) {
                view.down('#FWAPrescriberLockFlag').setValue('YES');
            }
            else if (record[0].data.FWAPrescriberLockFlag == false) {
                view.down('#FWAPrescriberLockFlag').setValue('NO');
            }
            else {
                view.down('#FWAPrescriberLockFlag').setValue('');
            }

            if (record[0].data.gcnseq == '9999999') {
                me.disableCompoundField(false);
            }
            else {
                me.disableCompoundField(true);
            }

            if (!isTestClaim) {
                me.SetMedicareControls(record[0].data.CarrierLOBID);
            }

            if (objResp.metadata.ttClaimCOBDetail != undefined && objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail.length != 0) {
                view.down('#paidAmt').setValue(objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail[0].paidAmt);
                view.down('#PayerIdQual').setValue(objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail[0].PayerIdQual);
                view.down('#PayerID').setValue(objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail[0].PayerID);
                view.down('#payerDate').setValue(objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail[0].payerDate);
                view.down('#RejCode').setValue(objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail[0].RejCode);

                if (objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail[0].otherPayerPatRespQual != '') {
                    var otherPayerPatRespQual = objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail[0].otherPayerPatRespQual.split('|'),
                        otherPayerPatRespAmt = objResp.metadata.ttClaimCOBDetail.ttClaimCOBDetail[0].otherPayerPatRespAmt.split('|');

                    for (var item in otherPayerPatRespQual) {
                        PatientResponsibility.add(
                            {
                                otherPayerPatRespQual: otherPayerPatRespQual[item],
                                otherPayerPatRespAmt: otherPayerPatRespAmt[item]
                            }
                        );
                    }
                }
            }

            if (objResp.metadata.ttClaimRejectCodes != undefined && objResp.metadata.ttClaimRejectCodes.ttClaimRejectCodes.length != 0) {
                var rejectionCode = objResp.metadata.ttClaimRejectCodes.ttClaimRejectCodes;

                for (var item in rejectionCode) {
                    ClaimRejectionDetail.add(
                        {
                            rejectCode: rejectionCode[item].rejectCode,
                            DESCRIPTION: rejectionCode[item].DESCRIPTION,
                            respMessage: rejectionCode[item].respMessage
                        }
                    );
                }
            }

            if (objResp.metadata.ttClaimCompDetail != undefined && objResp.metadata.ttClaimCompDetail.ttClaimCompDetail.length != 0) {
                var claimCompoundDetail = objResp.metadata.ttClaimCompDetail.ttClaimCompDetail;

                for (var item in claimCompoundDetail) {
                    storecompoundgcn.add(
                        {
                            NDC: claimCompoundDetail[item].NDC,
                            ingQuantity: claimCompoundDetail[item].ingQuantity,
                            ingCost: claimCompoundDetail[item].ingCost,
                            ingBasisOfCost: claimCompoundDetail[item].ingBasisOfCost,
                            gcnseq: claimCompoundDetail[item].gcnseq,
                            LN: claimCompoundDetail[item].LN
                        }
                    );
                }
            }

            if (objResp.metadata.ttClaimPPSDetail != undefined && objResp.metadata.ttClaimPPSDetail.ttClaimPPSDetail.length != 0) {
                var claimPPSDetail = objResp.metadata.ttClaimPPSDetail.ttClaimPPSDetail;

                for (var item in claimPPSDetail) {
                    DUROverride.add(
                        {
                            serviceRsnCode: claimPPSDetail[item].serviceRsnCode,
                            profServCode: claimPPSDetail[item].profServCode,
                            resultOfServiceCode: claimPPSDetail[item].resultOfServiceCode
                        }
                    );
                }
            }

            if (objResp.metadata.ttPricing != undefined &&  objResp.metadata.ttPricing.ttPricing.length != 0) {
                var claimPricing = objResp.metadata.ttPricing.ttPricing;

                for (var item in claimPricing) {
                    if (claimPricing[item].planPricing == true) {
                        PlanPricingStore.add(
                            {
                                ContractId: claimPricing[item].contractId,
                                CostBasis: claimPricing[item].costBasis,
                                UnitPrice: claimPricing[item].unitPrice,
                                DiscPercent: claimPricing[item].discpercent,
                                DiscAmount: claimPricing[item].discAmount,
                                DispFee: claimPricing[item].dispFee,
                                FinalPrice: claimPricing[item].finalPrice,
                                TransactionID: claimPricing[item].transactionID
                            }
                        );
                    }
                    else {
                        PharmacyPricingStore.add(
                            {
                                ContractId: claimPricing[item].contractId,
                                CostBasis: claimPricing[item].costBasis,
                                UnitPrice: claimPricing[item].unitPrice,
                                DiscPercent: claimPricing[item].discpercent,
                                DiscAmount: claimPricing[item].discAmount,
                                DispFee: claimPricing[item].dispFee,
                                FinalPrice: claimPricing[item].finalPrice,
                                TransactionID: claimPricing[item].transactionID,
                                usedForClaimPricing: claimPricing[item].usedForClaimPricing
                            }
                        );
                    }
                }
            }

            if (objResp.metadata.ttPricingSubmitPaid != undefined &&  objResp.metadata.ttPricingSubmitPaid.ttPricingSubmitPaid.length != 0) {
                var pricingSubPaid = objResp.metadata.ttPricingSubmitPaid.ttPricingSubmitPaid;

                for (var item in pricingSubPaid) {

                    if (pricingSubPaid[item].DESCRIPTION.trim() == 'Dispensed Quantity') {
                        vm.set('PharmacyDispQty', pricingSubPaid[item].paid);
                        vm.set('PlanDispQty', pricingSubPaid[item].PlanPricing);
                        continue;
                    }
                    SubmitPaid.add(
                        {
                            DESCRIPTION: pricingSubPaid[item].DESCRIPTION,
                            submitted: pricingSubPaid[item].submitted,
                            PlanPricing: pricingSubPaid[item].PlanPricing,
                            paid: pricingSubPaid[item].paid
                        }
                    );
                }
            }

            if (record[0].data.RespStat == 'P') {
                btnCheckStatus.setDisabled(false);
                lblClaimStsatus.setFieldStyle({color :'green'});
                lblClaimStsatus.setValue('Paid');

                if (onSave) {
                    me.onCheckStatus();
                }
            }
            else if (record[0].data.RespStat == 'R') {
                btnCheckStatus.setDisabled(false);
                lblClaimStsatus.setFieldStyle({color :'red'});
                lblClaimStsatus.setValue('Rejected');

                if (onSave) {
                    me.onCheckStatus();
                }
            }
            else if (record[0].data.RespStat == 'D') {
                btnCheckStatus.setDisabled(true);
                lblClaimStsatus.setFieldStyle({color :'red'});
                lblClaimStsatus.setValue('Duplicate Paid');

                if (onSave) {
                    Ext.Msg.alert('PBM', 'Paid Claim Already Exists.');
                }
            }
            else {
                btnCheckStatus.setDisabled(true);
                lblClaimStsatus.setFieldStyle({color :'white'});
                lblClaimStsatus.setValue('');
            }
        }
        else {
            Ext.Msg.alert('PBM', operation._resultSet.message[0].message);
        }
    },

    cbxMember_Select: function (combo, record) {
        var view = this.getView();

        view.down('#memberName').setValue(record.data.MemberName);
        view.down('#memberDOB').setValue(Ext.Date.format(new Date(record.data.dob), 'm/d/Y'));
        view.down('#memberGender').setValue(record.data.gender.toUpperCase() == 'M' ? 'MALE' : 'FEMALE');

        this.recipientID = record.data.recipientID;
        this.getMemberInfo(record.data.recipientID, record.data.memberID);
    },

    getMemberInfo: function (recipientID, memberID) {

        if (recipientID == 0 || memberID == '') {
            return;
        }

        var view = this.getView(),
            vm = this.getViewModel(),
            me = this,
            cbxPCN = view.down('#cbxPCN'),
            MemberInfo = vm.getStore('MemberInfo'),
            MemberCoverageHistory = vm.getStore('MemberCoverageHistory'),
            PCNMaster = vm.getStore('PCNMaster'),
            MemberPlanPCN = vm.getStore('MemberPlanPCN'),
            fieldList = 'recipientID,firstname,lastname,gender,birthDate,@enrollmentStatus,Home.Address1,Home.Address2,Home.City,Home.zipCode,Home.State';

        MemberInfo.getProxy().setExtraParam('pKeyValue', recipientID);
        MemberInfo.getProxy().setExtraParam('pKeyType', 'RecipientID');
        MemberInfo.getProxy().setExtraParam('pFieldList', fieldList);
        MemberInfo.load({
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText.replace("Home.Address1", "Address1").replace("Home.Address2", "Address2").replace("Home.City", "City").replace("Home.zipCode", "zipCode").replace("Home.State", "State"));
                var zip = objResp.data[0].zipCode.substring(0, 5) + (objResp.data[0].zipCode.length > 5 ? ('-' + objResp.data[0].zipCode.substring(5, 9)) : '');
                if (record.length != 0) {
                    var address1 = objResp.data[0].Address1.toUpperCase() + ',',
                        address2 = objResp.data[0].Address2.toUpperCase() + ' ' + objResp.data[0].City.toUpperCase() + ', ' +objResp.data[0].State.toUpperCase() + ' ' + zip;

                    view.down('#memberAddress1').setValue(address1);
                    view.down('#memberAddress2').setValue(address2);
                }
            }
        });

        MemberCoverageHistory.getProxy().setExtraParam('pKeyValue', recipientID);
        MemberCoverageHistory.getProxy().setExtraParam('pKeyType', 'RecipientID');
        MemberCoverageHistory.load({
            callback: function (record, operation, success) {
                if (success) {
                    if (record.length > 0) {
                        var today = Atlas.common.utility.Utilities.getLocalDateTime(),
                            pWhere,
                            effDate,
                            termDate,
                            carrierID,
                            carrierLobID,
                            carrierAcntNumber;

                        MemberCoverageHistory.each(function (record) {
                            if (record.get('tmemberId') == memberID && carrierID == undefined) {
                                effDate = new Date(record.get('tEffDate'));
                                termDate = record.get('tTermDate') == null ? '' : new Date(record.get('tTermDate'));

                                if (effDate <= today && (termDate == '' || termDate >= today)) {
                                    carrierID = record.get('tCarrierID');
                                    carrierLobID = record.get('CarrierLOBid');
                                    carrierAcntNumber = record.get('tCarrierAcctNumber');
                                    pWhere = "carrierId = " + carrierID + " and (carrierAcctNumber = '" + carrierAcntNumber + "' or (carrierAcctNumber = '' and multiaccount = yes)) and carrierLOBId = " + carrierLobID;

                                    me.SetMedicareControls(carrierLobID);

                                    PCNMaster.getProxy().setExtraParam('pApplyPCNCondition', 'NO');
                                    PCNMaster.getProxy().setExtraParam('pBatchSize', 0);
                                    PCNMaster.getProxy().setExtraParam('pWhere', pWhere);
                                    PCNMaster.load({
                                        callback: function (record, operation, success) {
                                            if (record.length > 0) {

                                                MemberPlanPCN.removeAll();

                                                PCNMaster.each(function (record) {
                                                    MemberPlanPCN.add(
                                                        {
                                                            PCNCode: record.get('pcnCode'),
                                                            PCNName: record.get('pcnDesc')
                                                        }
                                                    );
                                                });

                                                if (record.length == 1) {
                                                    cbxPCN.setDisabled(true);
                                                }
                                                else {
                                                    cbxPCN.setDisabled(false);
                                                }

                                                cbxPCN.bindStore(MemberPlanPCN);
                                                cbxPCN.setValue(record[0].data.pcnCode);
                                                cbxPCN.setRawValue(record[0].data.pcnCode);
                                            }
                                        }
                                    })
                                }
                            }
                        });
                    }
                }
            }
        });
    },

    SetMedicareControls: function (carrierLobID) {
        var view = this.getView(),
            CMSQualFacility = view.down('#CMSQualFacility');

        if (carrierLobID == '2') {
            CMSQualFacility.allowBlank = false;
        }
        else {
            CMSQualFacility.allowBlank = true;
        }
    },

    cbxPrescriber_Select: function (combo, record) {
        var view = this.getView();

        view.down('#prescriberName').setValue(record.data.firstName + ' ' + record.data.lastname);

        view.down('#prescriberPhone').setValue(Atlas.common.Util.formatPhone(record.data.locphone));
        var fieldList = 'FWAPrescriberLockFlag';
        var modelPresMasterData = Ext.create('Atlas.portals.rxmember.model.PrescriberInfoStoreModel');
        modelPresMasterData.getProxy().setExtraParam('pKeyValue', record.data.npi);
        modelPresMasterData.getProxy().setExtraParam('pKeyType', 'npi');
        modelPresMasterData.getProxy().setExtraParam('pFieldList', fieldList);
        modelPresMasterData.load({
            callback: function (record, operation, success) {
                var objRespPresMasterData = Ext.decode(operation.getResponse().responseText);
                if (objRespPresMasterData.message[0].code == 0) {
                    view.down('#FWAPrescriberLockFlag').setValue(objRespPresMasterData.data[0].FWAPrescriberLockFlag.toUpperCase());
                }
                else {
                    view.down('#FWAPrescriberLockFlag').setValue('');
                }
            }
        });

        this.NPI = record.data.npi;
    },

    cbxPharmacy_Select: function (combo, record) {
        var view = this.getView(),
            vm = this.getViewModel(),
            PharmacyMasterData = vm.getStore('PharmacyMasterData'),
            fieldList = 'locCity,locState,locAddress1,locAddress2,locZip,locPhone';

        PharmacyMasterData.getProxy().setExtraParam('pKeyValue', record.data.ncpdpId);
        PharmacyMasterData.getProxy().setExtraParam('pKeyType', 'ncpdpId');
        PharmacyMasterData.getProxy().setExtraParam('pFieldList', fieldList);
        PharmacyMasterData.load({
            callback: function (record, operation, success) {
                if (record.length != 0) {
                    var s = record[0].data.locAddress1.toUpperCase();
                    var s2 = record[0].data.locAddress2.toUpperCase();
                    var s3 = record[0].data.locCity.toUpperCase();
                    var s4= record[0].data.locState.toUpperCase();
                    var s5 = record[0].data.locZip;
                    var a = s+' ' + s2 + ' ' + s3+ ' '+s4+ ' '+s5;
                    view.down('#pharmacyAddress').setValue(a);
                    /*view.down('#pharmacyAddress').setValue(record[0].data.locAddress1.toUpperCase() + ' ' +
                     record[0].data.locAddress2.toUpperCase() + ' ' +                                                                                                                      record[0].data.locCity.toUpperCase() + ' ' +
                     record[0].data.locCity.toUpperCase() + ' ' +
                     record[0].data.locState.toUpperCase() + ' ' +
                     record[0].data.locZip);*/
                    view.down('#PharmacyPhone').setValue(Atlas.common.Util.formatPhone(record[0].data.locPhone));
                }
            }
        });

        this.NCPDPID = record.data.ncpdpId;
    },

    cbxMedication_Select: function (combo, record) {
        var view = this.getView();

        view.down('#medicationLN').setValue(record.data.LN);
        view.down('#gcnseq').setValue(record.data.GCN_SEQNO);

        this.NDC = record.data.NDC;

        if (record.data.GCN_SEQNO == '9999999') {
            this.disableCompoundField(false);
        }
        else {
            this.disableCompoundField(true);
        }
    },

    disableCompoundField: function (disable) {
        var view = this.getView();

        view.down('#compoundDosageForm').setDisabled(disable);
        view.down('#compoundDispUnitForm').setDisabled(disable);
        view.down('#compoundDosageForm').allowBlank = disable;
        view.down('#compoundDispUnitForm').allowBlank = disable;
    },

    btnCompoundGCN_Click: function () {
        var view = this.getView(),
            gcn = view.down('#gcnseq').getValue();

        if (gcn == '9999999') {
            var searchWindow = view.add({
                xtype: 'claims-compoundgcnwindow'
            });
            searchWindow.show();
        }
        else Ext.Msg.alert('Information', 'Please select compound GCN to enter the compound drug.');
    },

    onAddClinicalInfo: function () {
        var me = this,
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Clinical Information',
            iconCls: 'x-fa fa-search',
            modal: true,
            width: 600,
            height: 300,
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            scope: me,
            items: [
                {
                    xtype: 'grid',
                    itemId: 'clinicalInfoGrid',
                    height: '100%',
                    plugins: [
                        {
                            ptype: 'rowediting',
                            triggerEvent: 'celldblclick',
                            //removeUnmodified: true,
                            id: 'rowClicnicalEdit',
                            listeners: {
                                scope: me,
                                cancelEdit: 'cancelEditButton',
                                beforeEdit: 'beforeEdit'
                            }
                        }
                    ],
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'x-fa fa-plus-circle',
                            scope: me,
                            handler: 'onClinicalAdd'
                        }
                    ],
                    bind: {
                        store: '{DUROverride}'
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'DUR Override Code',
                                dataIndex: 'serviceRsnCode',
                                renderer: 'rendererServiceRsnCode',
                                editor: {
                                    xtype: 'combobox',
                                    allowBlank: false,
                                    bind: {store: '{DURType}'},
                                    matchFieldWidth: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value'
                                }
                            },
                            {
                                text: 'Prof. Serv. Code',
                                dataIndex: 'profServCode',
                                renderer: 'rendererProfServCode',
                                editor: {
                                    xtype: 'combobox',
                                    allowBlank: false,
                                    bind: {store: '{TDOverrideServiceCodes}'},
                                    matchFieldWidth: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value'
                                }
                            },
                            {
                                text: 'Result of Serv. Code',
                                dataIndex: 'resultOfServiceCode',
                                renderer: 'rendererResultOfServiceCode',
                                editor: {
                                    xtype: 'combobox',
                                    allowBlank: false,
                                    bind: {store: '{DURResultOfService}'},
                                    matchFieldWidth: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                hideable: false,
                                width: 80,
                                iconCls: 'x-fa fa-minus-circle',
                                align: 'center',
                                handler: 'onClinicalRemove',
                                scope: me
                            }
                        ]
                    }
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },

    onClinicalAdd: function (btn) {
        var store = this.getViewModel().get('DUROverride'),
            plugin = this.getView().down('#clinicalInfoGrid').getPlugin('rowClicnicalEdit');

        var newRec = Ext.data.Record.create({
            serviceRsnCode: '',
            profServCode: '',
            resultOfServiceCode: ''
        });

        store.insert(0, newRec);
        plugin.startEdit(0);
    },

    onClinicalRemove: function (grid, rowIndex, colIndex) {
        grid.getStore().removeAt(rowIndex);
    },

    onAdd: function (btn) {
        var store = this.getViewModel().get('PatientResponsibility'),
            plugin = this.getView().down('#responsibilityGrid').getPlugin('rowEdit');

        var newRec = Ext.data.Record.create({
            otherPayerPatRespQual: '',
            otherPayerPatRespAmt: 0
        });

        store.insert(0, newRec);
        plugin.startEdit(0);
    },

    onRemove: function (grid, rowIndex, colIndex) {
        grid.getStore().removeAt(rowIndex);
    },

    btnSearchClick: function () {
        var view = this.getView(),
            claimTestSearchWindow = view.add({
                xtype: 'claims-claimtestsearchwindow'
            });
        claimTestSearchWindow.show();
    },

    onCheckStatus: function () {
        var view = this.getView(),
            lblClaimStsatus = view.down('#lblClaimStsatus').getValue();

        if (lblClaimStsatus == null || lblClaimStsatus == undefined || lblClaimStsatus == '') {
            return;
        }

        this.claimPricingDetail();
    },

    claimPricingDetail: function () {
        var me = this,
            vm = this.getViewModel(),
            view = this.getView(),
            testClaimId = view.down('#testClaimId').getValue(),
            ApplyPlanPricing = vm.get('ApplyPlanPricing'),
            PharmacyDispQty = vm.get('PharmacyDispQty'),
            PlanDispQty = vm.get('PlanDispQty'),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Pricing Details',
            itemId: 'winPricingDetail',
            modal: true,
            width: 1000,
            height: 800,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            scope: me,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Transaction Id',
                            value: testClaimId
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Ok',
                            iconCls: 'x-fa fa-check-circle',
                            scope: me,
                            handler: 'btnPricingOk'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'container',
                    flex: 3,
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            itemId: 'rejectionDetailGrid',
                            title: 'Claim Reject Info',
                            height: '100%',
                            bind: {
                                store: '{ClaimRejectionDetail}'
                            },



                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        text: 'Reject Code',
                                        dataIndex: 'rejectCode'
                                    },
                                    {
                                        text: 'Description',
                                        dataIndex: 'DESCRIPTION'
                                    },
                                    {
                                        text: 'Secondary Message',
                                        dataIndex: 'respMessage',
                                        renderer : function(value, metadata) {
                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 3,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            itemId: 'gridPharmacyPricing',
                            flex: 3,
                            title: 'Pharmacy Pricing Detail',
                            bind: {
                                store: '{PharmacyPricingStore}'
                            },
                            columns: {
                                defaults: {
                                    //flex: 1
                                },
                                items: [
                                    {
                                        text: 'Contract ID',
                                        dataIndex: 'ContractId'
                                    },
                                    {
                                        text: 'Cost Basis',
                                        dataIndex: 'CostBasis'
                                    },
                                    {
                                        text: 'Unit Price',
                                        dataIndex: 'UnitPrice',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00000'
                                    },
                                    {
                                        text: 'Discount %',
                                        dataIndex: 'DiscPercent',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.000%'
                                    },
                                    {
                                        text: 'Discount Amt.',
                                        dataIndex: 'DiscAmount',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00000'
                                    },
                                    {
                                        text: 'Final Price',
                                        dataIndex: 'FinalPrice',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00000'
                                    },
                                    {
                                        text: 'Dispense Fee',
                                        dataIndex: 'DispFee',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00000'
                                    },
                                    {
                                        xtype: 'checkcolumn',
                                        text: 'Used',
                                        dataIndex: 'usedForClaimPricing'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            title: 'Plan Pricing Detail',
                            itemId: 'gridPlanPricing',
                            flex: 3,
                            bind: {
                                store: '{PlanPricingStore}'
                            },
                            columns: {
                                defaults: {
                                    //flex: 1
                                },
                                items: [
                                    {
                                        text: 'Cost Basis',
                                        dataIndex: 'CostBasis'
                                    },
                                    {
                                        text: 'Unit Price',
                                        dataIndex: 'UnitPrice',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00000'
                                    },
                                    {
                                        text: 'Discount %',
                                        dataIndex: 'DiscPercent',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.000%'
                                    },
                                    {
                                        text: 'Discount Amt.',
                                        dataIndex: 'DiscAmount',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00000'
                                    },
                                    {
                                        text: 'Final Price',
                                        dataIndex: 'FinalPrice',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00000'
                                    },
                                    {
                                        text: 'Dispense Fee',
                                        dataIndex: 'DispFee',
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00000'
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 3,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            itemId: 'gridPharmacySubmitPaid',
                            flex: 3,
                            bind: {
                                store: '{SubmitPaid}'
                            },
                            tbar: [
                                {
                                    xtype: 'displayfield',
                                    value: 'Dispensed Quantity = ' + PharmacyDispQty
                                }
                            ],
                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        text: 'Description',
                                        dataIndex: 'DESCRIPTION'
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00',
                                        text: 'Submitted',
                                        dataIndex: 'submitted'
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00',
                                        text: 'Pharmacy Pricing',
                                        dataIndex: 'paid'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            itemId: 'gridPlanSubmitPaid',
                            flex: 3,
                            bind: {
                                store: '{SubmitPaid}'
                            },
                            tbar: [
                                {
                                    xtype: 'displayfield',
                                    value: 'Dispensed Quantity = ' + PlanDispQty
                                }
                            ],
                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        text: 'Description',
                                        dataIndex: 'DESCRIPTION'
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00',
                                        text: 'Submitted',
                                        dataIndex: 'submitted'
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        format: '$0,0.00',
                                        text: 'Plan Pricing',
                                        dataIndex: 'PlanPricing'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();

        if (!ApplyPlanPricing) {
            win.down('#gridPlanPricing').hide();
            win.down('#gridPlanSubmitPaid').hide();
        }
    },

    onSubmitClaim: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            me = this,
            PatientResponsibility = vm.getStore('PatientResponsibility'),
            DUROverride = vm.getStore('DUROverride'),
            storecompoundgcn = vm.getStore('storecompoundgcn'),
            otherPayerPatRespQual = '',
            otherPayerPatRespAmt = '',
            memberName = view.down('#memberName').getValue(),
            CMSQualFacility = view.down('#CMSQualFacility'),
            firstName = '',
            lastName = '',
            tabClaimDetails = view.down('#tabClaimDetails');

        if (!CMSQualFacility.isValid()) {
            Ext.Msg.alert('Validation Error', 'Please select cms qualified facility first.');
            return;
        }

        if (!tabClaimDetails.isValid()) {
            Ext.Msg.alert('Validation Error', 'Please fix all the validation errors before saving the data.');
            return;
        }

        this.getView().mask('Processing Claim...');

        if (memberName != undefined && memberName != null && memberName != '') {
            var memberFullName = memberName.split(' ');
            firstName = memberFullName[0];
            lastName = memberFullName[memberFullName.length - 1]
        }

        var ttClaimCompDetail = [],
            ttClaimPPSDetail = [],
            ttGroupSegment = [];

        PatientResponsibility.each(function (record) {
            otherPayerPatRespQual = otherPayerPatRespQual + (otherPayerPatRespQual == '' ? '' : '|') + record.get('otherPayerPatRespQual');
            otherPayerPatRespAmt = otherPayerPatRespAmt + (otherPayerPatRespAmt == '' ? '' : '|') + record.get('otherPayerPatRespAmt');
        });

        var ttClaimDetail = [{
            InsuredID: view.down('#InsuredID').getValue(),
            patFirstName: firstName,
            patLastName: lastName,
            dateOfBirth: Ext.Date.format(new Date(view.down('#memberDOB').getValue()), 'Y-m-d'),
            genderCode: view.down('#memberGender').getValue() == 'MALE' ? 'M' : 'F',
            serviceDate: Ext.Date.format(view.down('#serviceDate').getValue(), 'Y-m-d'),
            PCN: view.down('#cbxPCN').getValue(),
            patResidenceCode: view.down('#patResidenceCode').getValue() == null ? '' : view.down('#patResidenceCode').getValue(),
            NDC: view.down('#NDC').getValue(),
            gcnseq: view.down('#gcnseq').getValue(),
            dispQuantity: view.down('#dispQuantity').getValue(),
            daysSupply: view.down('#daysSupply').getValue(),
            rxOrigin: view.down('#rxOrigin').getValue() == null ? '' : view.down('#rxOrigin').getValue(),
            dawCode: view.down('#dawCode').getValue() == null ? '' : view.down('#dawCode').getValue(),
            compoundCode: view.down('#gcnseq').getValue() == '9999999' ? '2' : '1',
            compoundDosageForm: view.down('#compoundDosageForm').getValue() == null ? '' : view.down('#compoundDosageForm').getValue(),
            compoundDispUnitForm: view.down('#compoundDispUnitForm').getValue() == null ? '' : view.down('#compoundDispUnitForm').getValue(),
            NCPDPId: view.down('#cbxPharmacy').getValue(),
            rxNum: view.down('#rxNum').getValue(),
            fillNumber: view.down('#fillNumber').getValue() == null ? '' : view.down('#fillNumber').getValue(),
            dateWritten: Ext.Date.format(view.down('#dateWritten').getValue(), 'Y-m-d'),
            basisOfCost: '',
            pharmacyServType: view.down('#pharmacyServType').getValue() == null ? '' : view.down('#pharmacyServType').getValue(),
            otherCoverageCode: view.down('#otherCoverageCode').getValue() == null ? '' : view.down('#otherCoverageCode').getValue(),
            prescriberNPI: view.down('#prescriberNPI').getValue(),
            Representative: view.down('#Representative').getValue(),
            Notes: view.down('#notes').getValue(),
            CMSQualFacility: view.down('#CMSQualFacility').getValue() == null ? '' : view.down('#CMSQualFacility').getValue()
        }];

        storecompoundgcn.each(function (record) {
            ttClaimCompDetail.push (
                {
                    NDC: record.get('NDC'),
                    ingQuantity: record.get('ingQuantity'),
                    ingCost: record.get('ingCost'),
                    ingBasisOfCost: record.get('ingBasisOfCost')
                }
            )
        });

        DUROverride.each(function (record) {
            ttClaimPPSDetail.push (
                {
                    serviceRsnCode: record.get('serviceRsnCode'),
                    profServCode: record.get('profServCode'),
                    resultOfServiceCode: record.get('resultOfServiceCode')
                }
            )
        });

        var ttClaimCOBDetail = [{
            paidAmt: view.down('#paidAmt').getValue(),
            PayerIdQual: view.down('#PayerIdQual').getValue(),
            PayerID: view.down('#PayerID').getValue(),
            payerDate: Ext.Date.format(view.down('#payerDate').getValue(), 'Y-m-d'),
            RejCode: view.down('#RejCode').getValue(),
            otherPayerPatRespQual: otherPayerPatRespQual,
            otherPayerPatRespAmt: otherPayerPatRespAmt
        }];

        var dsTestClaimData = {
            ttClaimDetail: ttClaimDetail,
            ttClaimCompDetail: ttClaimCompDetail,
            ttClaimPPSDetail: ttClaimPPSDetail,
            ttClaimCOBDetail: ttClaimCOBDetail,
            ttGroupSegment: ttGroupSegment
        };

        var ProcessTestClaim = Ext.create('Atlas.claims.model.ProcessTestClaim');
        ProcessTestClaim.getProxy().setExtraParam('dsTestClaimData', dsTestClaimData);
        ProcessTestClaim.phantom = false;

        ProcessTestClaim.save(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    me.getView().unmask();

                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText),
                            pResult = objResp.message[0].code,
                            pMessage = objResp.message[0].message,
                            pRetTranId = objResp.metadata.pRetTranId,
                            pRespStatus = objResp.metadata.pRespStatus;

                        if (pRetTranId != '' && pRetTranId != '0') {
                            me.GetTestClaimData(pRetTranId, true);
                        }
                        else {
                            Ext.Msg.alert('Error', pMessage);
                        }

                    }
                }
            }
        );

    },

    btnOk: function (win) {
        var view = this.getView(),
            win = view.down('#winRejectionDetail');

        win.destroy();
    },

    btnPricingOk: function (win) {
        var view = this.getView(),
            win = view.down('#winPricingDetail');

        win.destroy();
    },

    onbtnNotes: function (btn, event) {
        var me = this,
            vm = this.getViewModel(),
            Notes = vm.get('Notes'),
            winNotes;

        winNotes = Ext.create('Ext.window.Window', {
            itemId: 'winAction',
            height: 200,
            width: 500,
            modal : true,
            iconCls: 'x-fa fa-sticky-note-o',
            title: 'Notes History',
            layout: 'fit',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Notes History',
                            itemId: 'actionNotes',
                            readOnly: true,
                            value: Notes,
                            flex: 1,
                            grow: true,
                            anchor: '100%'
                        }
                    ]
                }

            ]
        });

        me.getView().add(winNotes);
        winNotes.show();
    },

    rendererOtherPayerPatRespQual: function (value) {
        var viewModel= this.getViewModel();
        var UCFPatRespAmtQualifier = viewModel.getStore('UCFPatRespAmtQualifier');
        var r=  UCFPatRespAmtQualifier.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },

    rendererServiceRsnCode: function (value) {
        var viewModel= this.getViewModel();
        var UCFPatRespAmtQualifier = viewModel.getStore('DURType');
        var r=  UCFPatRespAmtQualifier.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },

    rendererProfServCode: function (value) {
        var viewModel= this.getViewModel();
        var UCFPatRespAmtQualifier = viewModel.getStore('TDOverrideServiceCodes');
        var r=  UCFPatRespAmtQualifier.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },

    rendererResultOfServiceCode: function (value) {
        var viewModel= this.getViewModel();
        var UCFPatRespAmtQualifier = viewModel.getStore('DURResultOfService');
        var r=  UCFPatRespAmtQualifier.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    },

    routeToMember:function () {
        var me = this,
            recipientID = this.recipientID,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');

        if (recipientID != '' && recipientID != null) {
            me.fireEvent('openView','merlin','member','MemberToolbar', {
                menuId: menuId,
                RID:recipientID,
                atlasId: recipientID,
                keyValue: '0',
                openView: true,
                recordCase:null,
                subTabs:['member-demographics']
            });
        }
    },

    routeToPrescriber: function () {
        this.routeTo(this.NPI, 'merlin/prescriber/PrescriberToolbar');
    },

    routeToPharmacy: function () {
        this.routeTo(this.NCPDPID, 'merlin/pharmacy/Pharmacy');
    },

    routeToDrugSearch: function () {
        this.routeTo(this.NDC, 'merlin/formulary/FDBDrugSearch', 'NDC', this.NDC);
    },

    routeTo: function (atlasId, route, selectedField, selectedValue) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route),
            viewRoute = route.split('/');

        if (atlasId == null || atlasId == undefined) {
            return;
        }

        me.fireEvent('openView', viewRoute[0], viewRoute[1], viewRoute[2], {
            menuId: menuId,
            atlasId: atlasId,
            selectedField: selectedField,
            selectedValue: selectedValue
        });
    },

    beforeEdit:function(editor,context)
    {
        if(context.column.getXType() == 'actioncolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = context.grid;
                grid.store.removeAt(context.rowIdx);
                return false;
            }

        }
    },

    cancelEditButton: function(editor, context) {
        if (context.record.phantom)
            context.grid.store.removeAt(context.rowIdx);
    }

});