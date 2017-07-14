/**
 * Created by l6630 on 10/13/2016.
 */

Ext.define('Atlas.benefitplan.view.populationgroup.benefitconfiguration.BenefitConfigurationViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.populationgroupbenefitconfiguration',

    listen: {
        //listen to events using GlobalEvents
        controller: {
            '*': {
                onClosePopGroupBenefitConfiguration: 'onClosePopGroupBenefitConfiguration',
                onWorkFlowUpdate:'onWorkFlowUpdate'
            }
        }
    },
    onClosePopGroupBenefitConfiguration: function (args) {
        this.getView().close();
    },
    onWorkFlowUpdate:function(){
        this.init();
    },
    showMessage: function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            buttons: Ext.Msg.OK,
            closable: false,
            draggable: false,
            resizable: false
        });
    },
    init: function () {

        this.medicalGrid = false;
        this.pharmacyGrid = false;
        this.save = false;
        this.onLoadData = '';
        this.onLoadDataArray = [];
        var vm = this.getViewModel(),
            store = vm.getStore('populationgroupbenefitconfiguration'),
            proxy = store.getProxy(),
            atlasId = this.getView().atlasId;
        vm.set('PBPSK', atlasId.pbpSK);
        vm.set('popGrpPBPSK', atlasId.popGrpPBPSK);
        if (atlasId.popGrpPBPSK === 0) {
            proxy.setExtraParam('pbpSK', atlasId.pbpSK);
            proxy.setExtraParam('popGrpSK', atlasId.popGrpSK);
        }
        else {
            vm.set('cansavings', true);
            proxy.setExtraParam('popGrpPBPSK', atlasId.popGrpPBPSK);
        }
        Ext.getBody().mask('Loading');
        store.load({callback: function() {
            Ext.getBody().unmask();
        }});
    },
    checkForUnsavedRecords: function(panel,eOpts, fromCancel) {
        var formDataValues = this.onLoadDataArray,
            viewdata = this.getView().getForm(),
            duplicateflag = false,
            formattedstartdate = Ext.Date.format(new Date(viewdata.findField('DOSProcsngStartDt').value), 'Y-m-d\\TH:i:s'),
            formattedenddate = Ext.Date.format(new Date(viewdata.findField('reversalWindow').value), 'Y-m-d\\TH:i:s');
        if (formDataValues[0] == null) {
            formDataValues[0] = '';
        }
        if (formDataValues[3] == viewdata.findField('AccumtrRestartDay').value && formDataValues[4] == viewdata.findField('AccumtrRestartMth').value && formDataValues[2] == formattedenddate && formDataValues[1] == formattedstartdate && formDataValues[0] == viewdata.findField('planpgmcode').value) {
        } else {
            duplicateflag = true;
        }
        var medCnt = formDataValues[5],
            phCnt = formDataValues[6],
            gridData = formDataValues[7],
            finCnt = medCnt + phCnt,
            reversaldayCmp = Ext.ComponentQuery.query('numberfield[name=reversalday]'),
            dmrsubmissionCmp = Ext.ComponentQuery.query('numberfield[name=dmrsubmission]'),
            ElctrnPrcsngCmp = Ext.ComponentQuery.query('numberfield[name=ElctrnPrcsng]'),
            papersubmissionCmp = Ext.ComponentQuery.query('numberfield[name=papersubmission]'),
            prcsOutofNtwrkClaimsIndCmp = Ext.ComponentQuery.query('checkbox[name=prcsOutofNtwrkClaimsInd]');
        for (var i = 0; i < medCnt; i++) {
            var benefitplan = gridData[i];
            if (benefitplan[1] == reversaldayCmp[i].value && benefitplan[0] == dmrsubmissionCmp[i].value && benefitplan[2] == ElctrnPrcsngCmp[i].value &&
                benefitplan[3] == papersubmissionCmp[i].value && benefitplan[4] == prcsOutofNtwrkClaimsIndCmp[i].value) {
            } else {
                duplicateflag = true;
            }
        }
        if (phCnt > 0) {
            var BincomboCmp = Ext.ComponentQuery.query('combo[name=Bincombo]'),
                pcncomboCmp = Ext.ComponentQuery.query('combo[name=pcncombo]'),
                payableamtCmp = Ext.ComponentQuery.query('textfield[name=payableamt]'),
                dmrnCmp = Ext.ComponentQuery.query('numberfield[name=dmr]'),
                pswCmp = Ext.ComponentQuery.query('numberfield[name=psw]'),
                eswCmp = Ext.ComponentQuery.query('numberfield[name=esw]'),
                rwCmp = Ext.ComponentQuery.query('numberfield[name=rw]'),
                poncCmp = Ext.ComponentQuery.query('checkbox[name=ponc]');
            var k = 0;
            for (var i = medCnt; i < finCnt; i++) {
                var benefitplan = gridData[i];
                if (benefitplan[1] == rwCmp[k].value && benefitplan[4] == pcncomboCmp[k].value && benefitplan[5] == BincomboCmp[k].value &&
                    benefitplan[0] == dmrnCmp[k].value && benefitplan[2] == eswCmp[k].value &&
                    benefitplan[3] == pswCmp[k].value && (benefitplan[6] == payableamtCmp[k].value || benefitplan[6] == null) && benefitplan[7] == poncCmp[k].value) {
                } else {
                    duplicateflag = true;
                }
                k++;
            }
        }
        if(!fromCancel){
                if (!duplicateflag && !this.medicalGrid || this.save) {
                    if (!this.pharmacyGrid) {
                        panel.events.beforeclose.clearListeners();
                        panel.close();
                        return false;
                    } else {
                        Ext.MessageBox.confirm('Close Window', 'This window contains unsaved rows that will be lost. Are you sure you want to close the window?', function (id, value) {
                            if (id === 'yes') {
                                panel.events.beforeclose.clearListeners();
                                panel.close();
                            }
                        });
                    }
                    panel.events.beforeclose.clearListeners();
                    panel.close();
                    return false;
                } else {
                    Ext.MessageBox.confirm('Close Window', 'This window contains unsaved rows that will be lost. Are you sure you want to close the window?', function (id, value) {
                        if (id === 'yes') {
                            panel.events.beforeclose.clearListeners();
                            panel.close();
                        }
                    });
                }
            return false;
        }else{
            if(duplicateflag || this.medicalGrid || this.pharmacyGrid)
                return true;
            else
                return false;
        }
    },
    onConfigurationLoad: function (store, records, successful, operation, eOpts) {
        Ext.suspendLayouts();
        var me = this,
            vm = this.getViewModel();
        if (!records) {
            return;
        }
        if (records[0].data.PopulationGroupPlanBenefitPackage.DOSProcsngStartDt == null) {
            records[0].data.PopulationGroupPlanBenefitPackage.DOSProcsngStartDt = records[0].data.PopulationGroupPlanBenefitPackage.PBPEfctvStartDt;
        }
        if (records[0].data.PopulationGroupPlanBenefitPackage.DOSProcsngEndDt == null) {
            records[0].data.PopulationGroupPlanBenefitPackage.DOSProcsngEndDt = records[0].data.PopulationGroupPlanBenefitPackage.PBPEfctvEndDt;
        }
        if(this.getViewModel().data.populationgroupbenefitconfiguration.data.items[0].data.PopulationGroupPlanBenefitPackage.WorkFlowStatus == "Pending" || this.getViewModel().data.populationgroupbenefitconfiguration.data.items[0].data.PopulationGroupPlanBenefitPackage.WorkFlowStatus == "Approved" || this.getViewModel().data.populationgroupbenefitconfiguration.data.items[0].data.PopulationGroupPlanBenefitPackage.WorkFlowStatus == "Level 1 Approved"){
                                      this.getViewModel().set('onstatuscheck', true);
        }else{      this.getViewModel().set('onstatuscheck', false);   }
        var data = records[0].data,
            pkg = data.PopulationGroupPlanBenefitPackage;
        this.onLoadData = data;
        this.onLoadDataArray[0] = pkg.PlanPgmCode;
        this.onLoadDataArray[1] =pkg.DOSProcsngStartDt;
        this.onLoadDataArray[2] =pkg.DOSProcsngEndDt;
        this.onLoadDataArray[3] =pkg.AccumtrRestartDay;
        this.onLoadDataArray[4] =pkg.AccumtrRestartMth;
        vm.getStore('pcnList').loadData(data.AccountPCN);
        vm.getStore('binList').loadData(data.AccountRXBIN);
        vm.getStore('macList').loadData(data.MACList);
        vm.set('populationGroupPlanBenefitPackage', pkg);
        vm.set('Account', data.NavigationBreadCrumb.AcctName);
        vm.set('PopulationGroup', data.NavigationBreadCrumb.PopGrpName);
        this.getReferences().medicalPlanSection.removeAll();
        this.getReferences().pharmacyPlanSection.removeAll();
        var gridsData = [], medCnt=0, phCnt=0, loopCnt = 0;
        pkg.BenefitPlans.forEach(function (planObj) {
        var innerData = [];
            planObj.CurrentUser = this.getViewModel().get('user').un;
            planObj.ProviderNetworkTiers.forEach(function (networkObj) {
                if ((networkObj.EfctvStartDt == null || networkObj.EfctvStartDt < Date('1/1/1900'))) {
                    networkObj.EfctvStartDt = pkg.DOSProcsngStartDt;
                }
                if ((networkObj.EfctvEndDt == null || networkObj.EfctvEndDt < Date('1/1/1900'))) {
                    networkObj.EfctvEndDt = pkg.DOSProcsngEndDt;
                }
            });
            if (planObj.BenefitPlanType == "Medical") {
                medCnt++;
                innerData[0] = planObj.DMRProcsngDayLim;
                innerData[1] = planObj.ClmReversalDayLim;
                innerData[2] = planObj.ElctrncProcsngDayLim;
                innerData[3] = planObj.PaperProcsngDayLim;
                innerData[4] = planObj.PrcsOutofNtwrkClaimsInd;
                innerData[5] = planObj.ProviderNetworkTiers;
                var newmedview = Ext.create('Atlas.benefitplan.view.populationgroup.benefitconfiguration.MedicalBenefitPlanDetails');
                this.getReferences().medicalPlanSection.add(newmedview);
                newmedview.getViewModel().set('medicalBenefitPlanDetails', planObj);
                newmedview.getViewModel().getStore('medicalBenefitPlanGrid').loadData(planObj.ProviderNetworkTiers);
                newmedview.getViewModel().getStore('networks').loadData(data.Networks);
            }
            if (planObj.BenefitPlanType == "Pharmacy") {
                phCnt++;
                innerData[0] = planObj.DMRProcsngDayLim;
                innerData[1] = planObj.ClmReversalDayLim;
                innerData[2] = planObj.ElctrncProcsngDayLim;
                innerData[3] = planObj.PaperProcsngDayLim;
                innerData[4] = planObj.AcctPCNSK;
                innerData[5] = planObj.AcctRXBINSK;
                innerData[6] = planObj.PayblPatRespCodes;
                innerData[7] = planObj.PrcsOutofNtwrkClaimsInd;
                innerData[8] = planObj.ProviderNetworkTiers;
                var newpharmview = Ext.create('Atlas.benefitplan.view.populationgroup.benefitconfiguration.PharmacyBenefitPlanDetails');
                this.getReferences().pharmacyPlanSection.add(newpharmview);
                newpharmview.getViewModel().set('pharmacyBenefitPlanDetails', planObj);
                newpharmview.getViewModel().getStore('pharmacyBenefitPlanGrid').loadData(planObj.ProviderNetworkTiers);
                newpharmview.getViewModel().getStore('pharmacynetworks').loadData(data.PharmacyNetworks);
                if (data.AccountPCN.length < 1 || data.AccountRXBIN.length < 1) {
                    Ext.Msg.alert('BIN and PCN Required', "The Account " + vm.get('Account') + " for the population group " + vm.get('PopulationGroup') + " must have at least one BIN and one PCN in order to assign a Pharmacy plan.");
                }
            }
            gridsData[loopCnt] = innerData;
            loopCnt++;
        }, this);
        this.onLoadDataArray[5] = medCnt;
        this.onLoadDataArray[6] = phCnt;
        this.onLoadDataArray[7] = gridsData;
        Ext.resumeLayouts(true);
        this.setBreadCrumb(data, vm);
    },
    onMedTierAdd: function (grid, rowIndex) {
        this.addedMedRow = true;
        this.doAddGridRow(grid, rowIndex, 'Medical');
        this.medicalGrid = true;
    },
    onPharmaTierAdd: function (grid, rowIndex) {
        this.addedPharmRow = true;
        this.doAddGridRow(grid, rowIndex, 'Pharmacy');
        this.pharmacyGrid = true;

    },
    onMedTierRemove: function (grid, rowIndex) {
        this.onTierRemove(grid, rowIndex, 'Medical');
        this.medicalGrid = true;
    },
    onPharmaTierRemove: function (grid, rowIndex) {
        this.onTierRemove(grid, rowIndex, 'Pharmacy');
        this.pharmacyGrid = true;
    },
    doAddGridRow: function (grid, rowIndex, tierType, selRowFromRemove) {
        var me = this,
            refs = me.getReferences(),
            NetworkEffectiveStartDate = new Date('1/1/1900'),
            NetworkEffectiveEndDate = new Date('12/31/9999');
        if (refs.serStartDte.getValue().length > 0) {
            NetworkEffectiveStartDate = refs.serStartDte.getValue();
        }
        if (refs.serEndDte.getValue().length > 0) {
            NetworkEffectiveEndDate = refs.serEndDte.getValue();
        }
        var selRow = grid.getStore().getAt(rowIndex),
            store = grid.getStore();
        if(Ext.isObject(selRowFromRemove)){
            selRow = selRowFromRemove;
        }
       var newRecord = new Atlas.benefitplan.model.ProviderNetworkTiers({
            NtwrkTierSK: selRow.data.NtwrkTierSK,
            CurrentUser: this.getViewModel().get('user').un,
            PopGrpBnftPlanSK: selRow.data.PopGrpBnftPlanSK,
            BnftPlanSK: selRow.data.BnftPlanSK,
            EfctvStartDt: NetworkEffectiveStartDate,
            EfctvEndDt: NetworkEffectiveEndDate,
           NtwrkTierName:selRow.data.NtwrkTierName
        });
        store.insert(rowIndex, newRecord);
        var storeMain = this.getViewModel().getStore('populationgroupbenefitconfiguration'),
            pkg = storeMain.getData().items[0].getData().PopulationGroupPlanBenefitPackage,
            tier = null;
        pkg.BenefitPlans.forEach(function (planObj) {
            if (planObj.BenefitPlanType == tierType) {
                tier = planObj.ProviderNetworkTiers;
                tier.push(newRecord.data);
            }
        }, this);
        if(!Ext.isObject(selRowFromRemove))
        grid.panel.findPlugin('rowediting').startEdit(newRecord, 0);
    },
    onTierRemove: function (grid, rowIndex, tierType) {
        Ext.MessageBox.confirm('Confirm Remove', 'Are you sure you want to remove?',
            function (btn) {
                if (btn === 'yes') {
                    this.doTierRemove(grid, rowIndex, tierType);
                }
            },
            this
        );
    },
    doTierRemove: function (grid, rowIndex, tierType) {
        var store = grid.getStore(),
            selRow = store.getAt(rowIndex),
            storeMain = this.getViewModel().getStore('populationgroupbenefitconfiguration'),
            pkg = storeMain.getData().items[0].getData().PopulationGroupPlanBenefitPackage,
            tier = null;
        store.removeAt(rowIndex);  //Remove from grid only
        pkg.BenefitPlans.forEach(function (planObj) {
            if (planObj.BenefitPlanType == tierType) {
                tier = planObj.ProviderNetworkTiers;
                tier.forEach(function (iterObj) {
                    if (iterObj.NtwrkSK === selRow.get('NtwrkSK') || iterObj.NtwrkSK == 0) {
                        iterObj.Deleted = true;
                    }
                });
            }
        });
        if(store.getCount()==0){
            this.doAddGridRow(grid, rowIndex, tierType, selRow);
        }
    },
    renderGridDate: function (val) {
        return Ext.Date.format(new Date(val), 'n/j/Y');
    },
    onNetworkRenderer: function (value, obj, rec) {
        rec.data.CurrentUser = this.getViewModel().get('user').un;
        if (Ext.isNumber(Number(value)) && Number(value) > 0) {
            var stor = obj.column.up('medicalbenefitplandetails').getViewModel().getStore('networks');
            var cmbRec = stor.findRecord('NtwrkSK', value, 0, false, false, true);
            return cmbRec.get('NtwrkName');
        } else {
            return 'Select a Network';
        }
    },
    onPharmacyNetworkRenderer: function (value, obj, rec) {
        rec.data.CurrentUser = this.getViewModel().get('user').un;
        if (Ext.isNumber(Number(value)) && Number(value) > 0) {
            var stor = obj.column.up('pharmacybenefitplandetails').getViewModel().getStore('pharmacynetworks');
            var cmbRec = stor.findRecord('NtwrkSK', value, 0, false, false, true);
            return cmbRec.get('NtwrkName');
        } else {
            return 'Select a Network';
        }
    },
    onMACRenderer: function (value, obj, rec) {
        if (Ext.isNumber(Number(value)) && Number(value) > 0) {
            var stor = this.getViewModel().getStore('macList');
            var cmbRec = stor.findRecord('MACListSK', value, 0, false, false, true);
            return cmbRec.get('MACListName');
        } else {
            return 'Select a MAC List';
        }
    },
    setBreadCrumb: function (data, vm) {
        var me = this;
        var bc = data.NavigationBreadCrumb,
            bp = data.PopulationGroupPlanBenefitPackage,
            bcStr = "",
            lim = '&nbsp;>&nbsp;';
        var breadcrumbarea = this.getReferences().breadcrumbarea;
        breadcrumbarea.removeAll();
        var label = Ext.create('Ext.form.Label', {
            html: '<b>' + "Tenant Family: " + '<b>' + bc.TenantFamName + '</b>' + lim,
            listeners: {
                render: function (c) {
                    c.getEl().on('click', function () {

                        me.openView(bc.TenantFamSK, bc.TenantFamSK, 10);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '<b>' + "Tenant: " + '<b>' + bc.TenantName + '</b>' + lim,
            listeners: {
                render: function (c) {
                    c.getEl().on('click', function () {
                        me.openView(bc.TenantFamSK, bc.TenantSK, 20);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '<b>' + "Account: " + '<b>' + bc.AcctName + '</b>' + lim,
            listeners: {
                render: function (c) {
                    c.getEl().on('click', function () {
                        me.openView(bc.TenantFamSK, bc.AcctSK, 30);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '<b>' + "Group: " + '<b>' + bc.GrpName + '</b>' + lim,
            listeners: {
                render: function (c) {
                    c.getEl().on('click', function () {
                        me.openView(bc.TenantFamSK, bc.GrpSK, 40);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '<b>' + "Population Group: " + '<b>' + bc.PopGrpName + '</b>',
            listeners: {
                render: function (c) {
                    c.getEl().on('click', function () {
                        me.openView(bc.TenantFamSK, bc.PopGrpSK, 50);
                    }, c);
                }
            }
        });
        breadcrumbarea.add(label);
        label = Ext.create('Ext.form.Label', {
            html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status : <b>' + bp.WorkFlowStatus + '</b>'
        });
        breadcrumbarea.add(label);
        /*Submit for Approval can happen only if Assign PBP saved to PopGrp, Show this button when the status is Draft.
         * Show Make Changes buttons if the status is Pending*/
        vm.set("popGrpPBPStatusIsDraft", bp.WorkFlowStatus == 'Draft');
        vm.set("popGrpPBPStatusIsDraftorReject", bp.WorkFlowStatus == 'Draft' || bp.WorkFlowStatus == 'Rejected');
    },
    openView: function (rootsk, viewsk, viewtype) {
        this.fireEvent('closeHierarchyConfiguration');
        this.fireEvent('openView', 'merlin', 'benefitplan', 'configuration.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: viewsk,
            viewtype: viewtype,
            rootsk: rootsk
        });
    },
    onSave: function () {
        Ext.MessageBox.confirm('Confirm Save', 'Are you sure you want to Save?',
            function (btn) {
                if (btn === 'yes') {
                    this.doSaveAction();
                }
            },
            this
        );
    },
    onCancel: function (silent, eOpts) {
        var flag = true;
        flag = this.checkForUnsavedRecords(silent, eOpts, flag);
        if (flag) {
             Ext.MessageBox.confirm('Cancel Changes', 'Are you sure you want to cancel your changes?',
                function (btn) {
                    if (btn === 'yes') {
                        var vm = this.getViewModel(),
                            st = vm.getStore('populationgroupbenefitconfiguration');
                        st.load();
                    }
                },
                 this
             );
        }
    },
    onSavingsAccountClick: function () {
        var me = this, vm = me.getViewModel();
        me.fireEvent('openView', 'merlin', 'benefitplan', 'healthcarefinancialaccount.HealthcareFinancialAccount',
        {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            autoShow: true,
            atlasId: vm.get('popGrpPBPSK'),
            isReadOnly: !vm.get('popGrpPBPStatusIsDraftorReject')
        });
    },
    onWorkflowHistoryClick: function () {
        var me = this, vm = me.getViewModel();
        me.fireEvent('openView', 'merlin', 'benefitplan', 'populationgroup.workflow.WorkflowHistory',
        {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: vm.get('popGrpPBPSK')

        });
    },
    onbtnPFCTClick:function(button, eOpts){
        var flagPFCT = true, flagsave = true;
        if(!this.getViewModel().getData().validforms){
            this.showMessage('Info','Please enter valid data');
            flagPFCT = true;
            flagsave = false;
        }
        else{
            flagPFCT = this.checkForUnsavedRecords(button, eOpts, flagPFCT);
        }

        if(!flagPFCT){
            var record = new Atlas.benefitplan.model.workflow.BenefitPlanIntegration({});
            record.set('popGrpPBPSK',this.getViewModel().get('popGrpPBPSK'));
            record.set('isSandbox',true );
            var me = this,
                vm = me.getViewModel(),
                store = vm.getStore('benefitPlanIntegration');
            store.insert(0, record);
            if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                Ext.getBody().mask('Saving');
            }
            store.sync({
                callback:function(){
                    Ext.getBody().unmask();
                },
                success: function (results, operation, success) {
                    var responsemessage = "";
                    for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                        var responsedata = JSON.parse(results.operations[i].getResponse().responseText);
                        if (responsemessage != '') {
                            responsemessage += '<br />';
                        }
                        responsemessage += responsedata.messages.map(function (elem) {
                            return elem.message;
                        }).join(",");
                    }
                    me.showMessage('Success', 'Data saved successfully' + responsemessage);
                },
                failure: function (results, operation, success) {
                    var responsemessage = "";
                    for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                        var responsedata = JSON.parse(results.operations[i].getResponse().responseText);
                        if (responsemessage != '') {
                            responsemessage += '<br />';
                        }
                        responsemessage += responsedata.messages.map(function (elem) {
                            return elem.message;
                        }).join(",");
                    }
                    me.showMessage('Failure', responsemessage);
                }
            }, this);
        }
        if(flagsave && flagPFCT){
            this.showMessage('Info','Please save data before Publishing for Claims Testing');
        }

    },
    onSubmitForApprovalClick: function (button,eOpts)
    {

        var flagApproval = true, flagsave = true;
        if(!this.getViewModel().getData().validforms){
            this.showMessage('Info','Please enter valid data');
            flagApproval = true;
            flagsave = false;
        }
        else{
            flagApproval = this.checkForUnsavedRecords(button, eOpts, flagApproval);

        }
        if(!flagApproval){
            var me = this,
                vm=me.getViewModel(),
                validSubmission=false;
            Ext.MessageBox.confirm('Confirm Submit', 'Are you sure you want to Submit for Approval?',
                function (btn) {
                    if (btn === 'yes') {
                        me.validSub(vm.get('popGrpPBPSK'), function(validSubmission) {
                            if(validSubmission == true) {
                                var store = vm.getStore('popGrpBenefitWorkflow');
                                var newRecord = new Atlas.benefitplan.model.workflow.PGBenefitWorkflow(
                                    {
                                        'CurrentUser': me.getViewModel().get('user').un,
                                        'StatTypeSK': 2,
                                        'PopGrpPBPSK': me.getViewModel().get('popGrpPBPSK')
                                    }
                                );
                                store.insert(0, newRecord);
                                store.getProxy().setExtraParams({});
                                if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                                    Ext.getBody().mask('Saving');
                                }
                                store.sync({
                                    callback:function(){
                                        Ext.getBody().unmask();
                                    },
                                    success: function (request, response) {
                                        /*Add status Notes to workflow*/
                                        var responsedata = JSON.parse(request.operations[0].getResponse().responseText);
                                        me.onAddNotes('Submitted for Approval', 'Submitted for Approval', 2, responsedata.id);
                                        // TODO: CANNOT HARD CODE A DATABASE SK IN THE FRONT END CODE!!! GET THE API TO TELL  ME WHAT THIS IS!
                                        me.showMessage('Success', "Submitted for Approval");
                                        me.fireEvent('onWorkFlowUpdate', {status: 'Pending'});
                                    },
                                    failure: function (request, response) {
                                        me.showMessage('Failed to Save', "Submit for Approval Failed");
                                    }
                                });
                            }
                        });
                    }
                }, me);
        }
        if(flagsave && flagApproval){
            this.showMessage('Info','Please save data before Submitting for Approval');
        }

    },
    validSub:function(popGrpPBPSK, callbackFunction){
        var isValid=true,
            me=this,
            vm = me.getViewModel(),
            store = vm.getStore('PopulationGroupPlanBenefitPackageSubmitForApproval'),
            proxy = store.getProxy();
        if (popGrpPBPSK != 0) {
            proxy.setExtraParam('popGrpPBPSK', popGrpPBPSK);
            Ext.getBody().mask('loading');
            store.load(function (records, operation, success){
                if(records && records.length){
                var ErrMessage="";
                    records.forEach(function (rec) {

                        if (rec.data.message != "") {
                            ErrMessage += rec.data.message + "<br>";
                        }
                    });
                    Ext.Msg.alert("Please Fix before submitting for Approval",ErrMessage);
                    isValid=false;
                    Ext.getBody().unmask();
                }
                callbackFunction(isValid);
            });
        }
    },
    onMakeChangesClick: function () {
        var me = this;
        Ext.MessageBox.confirm('Confirm Submit', 'Are you sure you want to Make Changes?',
            function (btn) {
                if (btn === 'yes') {
                    var vm = this.getViewModel();
                    var store = vm.getStore('popGrpBenefitWorkflow');
                    var newRecord = new Atlas.benefitplan.model.workflow.PGBenefitWorkflow(
                        {
                            'CurrentUser': this.getViewModel().get('user').un,
                            'StatTypeSK': 1,
                            'PopGrpPBPSK': this.getViewModel().get('popGrpPBPSK')
                        }
                    );
                    store.insert(0, newRecord);
                    store.getProxy().setExtraParams({});
                    if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    store.sync({
                        callback:function(){
                            Ext.getBody().unmask();
                        },
                        success: function (request, response) {
                            var responsedata = JSON.parse(request.operations[0].getResponse().responseText);
                            me.onAddNotes('Make Changes', 'Changed the Status Back to Draft to make changes', 1, responsedata.id);
                            // TODO: CANNOT HARD CODE A DATABASE SK IN THE FRONT END CODE!!! GET THE API TO TELL  ME WHAT THIS IS!
                            me.showMessage('Success', "Status Changed to Draft and Ready to Make Changes");
                            me.fireEvent('onWorkFlowUpdate');
                        },
                        failure: function (request, response) {
                            me.showMessage('Failed to Save', "Change the Status to Draft Failed");
                        }
                    });
                }
            }, me);
    },
    onMedGridBeforeEdit: function () {
        this.getViewModel().set('editingmedrow', this.getViewModel().get('editingmedrow')+1);
        this.medicalGrid = true;
    },
    onMedGridItemCancelEdit: function (editor, context, eOpts) {
        //if this was an added row, remove it
        if (this.addedMedRow) {
            context.grid.getStore().remove(context.grid.getStore().getAt(0));
            this.addedMedRow = false;
        }
        this.getViewModel().set('editingmedrow', this.getViewModel().get('editingmedrow')-1);
        this.medicalGrid = false;
    },
    onMedGridItemComplete: function (editor, e, opt) {
        var me = this;
        me.addedMedRow = false;
        me.getViewModel().set('editingmedrow', this.getViewModel().get('editingmedrow')-1);
        me.getViewModel().set("changed", true);
        this.medicalGrid = true;
    },
    onPharmGridBeforeEdit: function () {
        this.getViewModel().set('editingpharmrow', this.getViewModel().get('editingpharmrow')+1);
        this.pharmacyGrid = true;
    },
    onPharmGridItemCancelEdit: function (editor, context, eOpts) {
        //if this was an added row, remove it
        if (this.addedPharmRow) {
            context.grid.getStore().remove(context.grid.getStore().getAt(0));
            this.addedPharmRow = false;
        }
        this.getViewModel().set('editingpharmrow', this.getViewModel().get('editingpharmrow')-1);
        this.pharmacyGrid = false;
    },
    onPharmGridItemComplete: function (editor, e, opt) {
        var me = this;
        me.addedPharmRow = false;
        me.getViewModel().set('editingpharmrow', this.getViewModel().get('editingpharmrow')-1);
        me.getViewModel().set("changed", true);
        this.pharmacyGrid = true;
    },
    onItemChanged: function (field, oldValue, newValue, eOpts ) {
        var me = this;
        me.getViewModel().set('changed', true);
        me.getViewModel().set('validforms', me.getView().isValid());
    },
    onAddNotes: function (subject, notes, status, PopGrpPBPStatSK) {
        /*Add status Notes to workflow*/
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('statusnotes'),
            currentUser = vm.get('user').un;
        store.add({
            CurrentUser: currentUser,
            NoteDtl: notes,
            NoteSubject: subject,
            PopGrpPBPStatSK: PopGrpPBPStatSK,
            StatNoteSK: status
        });
        this.resetForm();
        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
            Ext.getBody().mask('Saving');
        }
        store.getProxy().setExtraParams({'PopGrpPBPStatSK': PopGrpPBPStatSK[0]});
        store.sync({
            callback:function(){
                Ext.getBody().unmask();
            },
            success: function (results, operation, success) {
                me.showMessage('Success', 'Status Update saved successfully.');
            },
            failure: function (results, operation, messages) {
                me.showMessage('Failed to Save', 'Status Update failed to save');
            }
        });
    },
    resetForm: function () {
        var me = this;
        var vm = this.getViewModel();
        var store = vm.getStore('populationgroupbenefitconfiguration');
        store.reload();
    },
    validPlanData: function (planObj) {
        var validPlan = true;
        planObj.ProviderNetworkTiers.forEach(function (networkObj) {

            if (networkObj.NtwrkSK == 0) {
                validPlan = false;
            }
        });
        return validPlan;
    },
    doSaveAction: function () {

        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('populationgroupbenefitconfiguration'),
            data = store.getData() && store.getData().items[0] && store.getData().items[0].getData().PopulationGroupPlanBenefitPackage,
            hasmedplans = false,
            haspharmplans = false,
            refs = this.getReferences(),
            form = me.getView(),
            submitMethod = 'PUT';
        me.getReferences().medicalPlanSection.items.each(function(medview){
            hasmedplans = true;
            medview.getViewModel().get('medicalBenefitPlanDetails').CurrentUser = vm.get('user').un;
        });
        me.getReferences().pharmacyPlanSection.items.each(function(pharmview){
            haspharmplans = true;
            pharmview.getViewModel().get('pharmacyBenefitPlanDetails').CurrentUser = vm.get('user').un;
        });
        if(!data || (!hasmedplans && !haspharmplans)){
            me.showMessage('Failed to Save', "Insufficient data found to save this configuration.");
            return;
        }
        if(!form.isValid()){
            me.showMessage('Failed to Save', "Please enter valid data for missing fields.");
            return;
        }
        if (this.getView().atlasId.popGrpPBPSK === 0) {
            submitMethod = 'POST';
        }
        data.AccumtrRestartMth = refs.AccumtrRestartMth.getValue();
        data.AccumtrRestartDay = refs.AccumtrRestartDay.getValue();
        data.DOSProcsngEndDt = refs.serEndDte.getValue();
        data.DOSProcsngStartDt = refs.serStartDte.getValue();
        data.CurrentUser = vm.get('user').un;
        var me = this;
        Ext.getBody().mask('saving');
        Atlas.benefitplan.data.proxy.BenefitPlanAjax.request({
            url: Atlas.benefitplan.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/PopulationGroupBenefitConfiguration',
            method: submitMethod,
            headers: {
                'Content-Type': 'application/json',
                'username': Atlas.user.un,
                'sessionid': Atlas.sessionId
            },
            extraParams: {
                popGrpPBPSK: me.getView().atlasId.popGrpPBPSK
            },
            scope: me,
            success: function (request, response) {
                var res = Ext.decode(request.responseText);
                if (res.success == true) {
                    var store = this.getViewModel().getStore('populationgroupbenefitconfiguration');
                    store.getProxy().setExtraParams({
                        PopGrpPBPSK: res.id[0]
                    });
                    store.load();
                    if(vm.get('popGrpPBPSK') === 0) {
                        this.fireEvent('pbpAssigned');
                    }
                    vm.set('popGrpPBPSK', res.id[0]);
                    this.getView().atlasId.popGrpPBPSK = res.id[0];
                    vm.set('cansavings', true);
                    vm.set('IsSaved',   res.success);
                    vm.set('IsSaved', res.success);
                    Ext.Msg.alert(res.messages[0].type, res.messages[0].message);
                    this.save = true;
                    me.fireEvent('onWorkFlowUpdate');
                } else {
                    var messages = res.messages,
                        err = "";
                    messages.forEach(function (item) {
                        err += '<br>-' + item.message;
                    });
                    me.showMessage('Failed to Save', 'Data failed to save: <br />' + err);
                }
            },
            callback:function(){
                Ext.getBody().unmask();
            },
            failure: function(request, response)
            {
                var res =  Ext.decode (request.responseText);
                me.showMessage('Failed to Save', 'Data failed to save');
            },
            scope: me,
            jsonData: data
        });
    }
});