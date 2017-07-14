/**
 * Created by agupta on 12/12/2016.
 */

Ext.define('Atlas.member.view.MemAddEditEnrollWinController', {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.memaddeditenrollwincontroller',
        listen: {
            controller: {
                '*': {
                    parentSaveEnrollNotes: 'btnSaveWinEnroll_Click'
                }
            }
        },

        winEnrollSaveSuccess: function () {
            this.fireEvent('parentWinEnrollSaveSuccess');
        },
        beforeSaveEnrollment: function () {
            var view = this.getView();
            var pg = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0];
            if (view.down('#cmbSearchPlanGroupsWin').hidden == false) {
                view.down('#cmbSearchPlanGroupsWin').allowBlank = false;
            }
            else {
                view.down('#cmbSearchPlanGroupsWin').allowBlank = true;
            }
            if (pg.query('#hdnAction')[0].getValue() == 'Create' && view.down('#cmbSearchPlanGroupsWin').hidden == false && view.down('#cmbSearchPlanGroupsWin').getRawValue() == '') {
                Ext.Msg.alert('Message', 'Please Select Plan Groups');
                return false;
            }
            if (pg.query('#hdnAction')[0].getValue() == 'Create' && view.down('#txtTempPlanGroup').hidden == false && view.down('#txtTempPlanGroup').getRawValue() == '') {
                Ext.Msg.alert('Message', 'Please Select Plan Groups');
                return false;
            }

            if (pg.query('#hdnAction')[0].getValue() == 'Create' && view.down('#cmbSearchPlanBenefitWin').getRawValue() == '') {
                Ext.Msg.alert('Message', 'Please Select Plan Benifit');
                return false;
            }
            if (pg.query('#hdnAction')[0].getValue() == 'Edit' && view.down('#formWinEnrollment').getForm().isValid() && view.down('#TermDateWin').getValue() != null) {
                if (new Date(view.down('#TermDateWin').getValue()).setHours(0, 0, 0, 0) == new Date(Ext.ComponentQuery.query('#coverageGrid')[0].getSelectionModel().selected.items[0].data.tTermDate).setHours(0, 0, 0, 0)) {
                    //view.down('#txtNotesWin').setValue(Ext.ComponentQuery.query('#coverageGrid')[0].getSelectionModel().selected.items[0].data.tTermReason);
                    //view.down('#txtNotesWin').setDisabled(true);
                    //Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].setValue(Ext.ComponentQuery.query('#coverageGrid')[0].getSelectionModel().selected.items[0].data.tTermReason);
                    //Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].setDisabled(true);
                }
                else {
                    /* var winNotes = Ext.create(WinNotes);
                     view.add(winNotes);
                     winNotes.show();*/

                    win = Ext.create({
                        xtype: 'memaddeditnoteswin',
                        autoShow: true
                    });

                    //this.getView().add(win);
                    //win.show();

                    //Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].setValue('');
                    //Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].setDisabled(false);

                    //view.down('#txtNotesWin').setValue('');
                    //view.down('#txtNotesWin').setDisabled(false);
                    //winNotes.show();
                    return false;
                }

            }
            var valid = view.down('#formWinEnrollment').getForm().isValid();
            if (valid) {

                if (view.down('#cmbSearchPlanBenefitWin').getRawValue() == 'CMCEMPRX01' || view.down('#cmbSearchPlanBenefitWin').getRawValue() == 'CMCEXCRX01') {
                    if (pg.query('#hdnAction')[0].getValue() == 'Create') {
                        if (confirm('Do you want to submit an ID card request for this member\'s enrollment?')) {
                            pg.query('#hdnRequestIDCard')[0].setValue('Y');
                        }
                        else {
                            pg.query('#hdnRequestIDCard')[0].setValue('N');
                        }
                    }
                }
                else {
                    pg.query('#hdnRequestIDCard')[0].setValue('N');
                }
            }
            else {
                Ext.Msg.alert('Error', 'Please Enter valid field values');
            }
            return valid;
        },

        onProgramGroupCodeWinSelection: function (combo, rcd) {
            var view = this.getView();
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgGroupCode')[0].setValue(rcd.data.progGroupCode);
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgBenefitCode')[0].setValue(rcd.data.progBenefitCode);
        },

        btnSaveWinEnroll_Click: function (winNotes) {
            //this.fireEvent('parentSaveNotes', this.getView().down('#winTxtNotes').rawValue);
            var view = this.getView();
            var vm = this.getViewModel();
            //if (source == 'winNotesEditEnrollment') {
            // view = view.up().up();
            // vm = view.getViewModel();
            // }
            //notes = notes == undefined ? '' : notes;
            /*if (source != undefined && source != 'winNotesEditEnrollment' && this.beforeSaveEnrollment() == false) {
             return false;
             }*/
            if ((winNotes.xtype != undefined) && this.beforeSaveEnrollment() == false) {
                return false;
            }
            else {
                var termReason = winNotes.xtype != undefined ? '' : winNotes;//Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].getValue();//view.down('#txtNotesWin').getValue();
                var systemID = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hiddenEnrollmentSystemID')[0].getValue();
                var memberID = view.down('#txtMemberIDWin').getValue();
                var personCode = view.down('#txtPersonCodeWin').getValue();

                var AltInsInd = view.down('#chkAltInsIndWin').getValue();
                var AltInsID = view.down('#txtAltInsIdWin').getValue();
                var AltInsCarrierName = view.down('#txtAltInsNameWin').getValue();


                var AltInsEffDate = view.down('#dtAltInsEffDateWin').getValue() == null ? '' : Ext.Date.format(view.down('#dtAltInsEffDateWin').getValue(), 'Y/m/d');
                var AltInsTermDate = view.down('#dtAltInsTermDateWin').getValue() == null ? '' : Ext.Date.format(view.down('#dtAltInsTermDateWin').getValue(), 'Y/m/d');

                var HICN = view.down('#txtHICNWin').getValue();

                var pRequestIDCard = "N";

                if (Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnRequestIDCard')[0] != null && Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnRequestIDCard')[0].getValue() != null) {
                    pRequestIDCard = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnRequestIDCard')[0].getValue();
                }

                var tableTemp = {};
                tableTemp.PlanGroupId = view.down('#cmbSearchPlanGroupsWin').getValue();
                tableTemp.PlanBenefitID = view.down('#cmbSearchPlanBenefitWin').getValue();
                tableTemp.EffDate = view.down('#effDateWin').getValue() == null ? '' : Ext.Date.format(view.down('#effDateWin').getValue(), 'Y/m/d');
                tableTemp.TermDate = view.down('#TermDateWin').getValue() == null ? '' : Ext.Date.format(view.down('#TermDateWin').getValue(), 'Y/m/d');
                tableTemp.RecipientId = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hiddenRecipientId')[0].getValue();
                tableTemp.memberID = memberID;
                tableTemp.TermReason = termReason;
                tableTemp.SystemId = systemID;
                tableTemp.tRelationshipCode = view.down('#cbxRelationshipWin').getValue();
                tableTemp.MCSProgGroupCode = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgGroupCode')[0].getValue();
                tableTemp.mcsProgramCode = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgBenefitCode')[0].getValue();
                tableTemp.PersonCode = personCode;
                tableTemp.AltInsInd = AltInsInd;
                tableTemp.AltInsMemberID = AltInsID;
                tableTemp.AltInsCarrierName = AltInsCarrierName;
                tableTemp.AltInsEffDate = AltInsEffDate;
                tableTemp.AltInsTermDate = AltInsTermDate;
                tableTemp.AltMemberId = HICN;

                var ActionName = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnAction')[0].getValue();
                if (ActionName == "Create") {
                    tableTemp.Action = "Add";
                }
                else if (ActionName == "Edit") {
                    tableTemp.Action = "Update";
                }
                var saveMessage = '';
                if (ActionName == "Create") {
                    saveMessage = "Enrollment is created";
                }
                else if (ActionName == "Edit") {
                    saveMessage = "Enrollment is updated";
                }

                var ttMEmberEnrollment = {};
                ttMEmberEnrollment.ttMEmberEnrollment = [];
                ttMEmberEnrollment.ttMEmberEnrollment.push(tableTemp);

                var modelSetEnrollment = Ext.create('Atlas.member.model.MemberEnrollmentSet');
                modelSetEnrollment.getProxy().setExtraParam('ttmemberEnrollment', ttMEmberEnrollment);
                modelSetEnrollment.getProxy().setExtraParam('pRequestIDCard', pRequestIDCard);
                modelSetEnrollment.phantom = false;
                modelSetEnrollment.save({
                    scope: this,
                    callback: function (record, operation, success) {
                        var objRespMemberMaster = Ext.decode(operation.getResponse().responseText);
                        //if (objRespMemberMaster.message[0].code == 0) {
                        var win = Ext.WindowManager.getActive();
                        if (win) {
                            win.close();
                        }
                        var win2 = Ext.WindowManager.getActive();
                        if (win2) {
                            win2.close();
                        }
                        Ext.Msg.alert('PBM', objRespMemberMaster.message[0].message);
                        //}
                    }
                });
            }
        },

        onBenefitSelection_Win: function (cntrl, rcd) {
            var view = this.getView();
            var vm = this.getViewModel();
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnParentPlanGroupId')[0].setValue(rcd.data.planGroupId);
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnParentPlanBenefitId')[0].setValue(rcd.data.planBenefitId);
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnParentPlanBenefitStatus')[0].setValue(rcd.data.benefitStatus);

            //view.down('#cbxMCSProgGroupCode').setValue('');
            vm.getStore('storeMCSProgGroupCode').removeAll();

            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgGroupCode')[0].setValue('');

            //var modelPlanProgCode = Ext.create('Atlas.plan.model.PlanProgramCode');
            //modelPlanProgCode.getProxy().setExtraParam('pPlanGroupId', view.down('#cmbSearchPlanGroupsWin').getValue());
            //modelPlanProgCode.getProxy().setExtraParam('pPlanBenefitId', 0);
            //modelPlanProgCode.getProxy().setExtraParam('pCarrierID', 0);
            //modelPlanProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
            //modelPlanProgCode.getProxy().setExtraParam('pLobID', 0);
            var planGroupId = view.down('#txtTempPlanGroup').hidden == true ? view.down('#cmbSearchPlanGroupsWin').getValue() : view.down('#txtTempPlanGroup').getValue();
            var storeProgCode = vm.getStore('storeMCSProgGroupCode');
            storeProgCode.getProxy().setExtraParam('pPlanGroupId', planGroupId);
            storeProgCode.getProxy().setExtraParam('pPlanBenefitId', 0);
            storeProgCode.getProxy().setExtraParam('pCarrierID', 0);
            storeProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
            storeProgCode.getProxy().setExtraParam('pLobID', 0);
            storeProgCode.load({
                scope: this,
                callback: function (record, operation, success) {
                    var activeProgramCodes1 = [];
                    var objRespPlanProgCode = Ext.decode(operation.getResponse().responseText);
                    objRespPlanProgCode.data.forEach(function (item, index) {
                        if (item.active == true) {
                            activeProgramCodes1.push(item);
                        }
                    });

                    if (rcd.data.planBenefitId > 0) {
                        var modelPlanProgCode2 = Ext.create('Atlas.plan.model.PlanProgramCode');
                        modelPlanProgCode2.getProxy().setExtraParam('pPlanGroupId', planGroupId);
                        modelPlanProgCode2.getProxy().setExtraParam('pPlanBenefitId', rcd.data.planBenefitId);
                        modelPlanProgCode2.getProxy().setExtraParam('pCarrierID', 0);
                        modelPlanProgCode2.getProxy().setExtraParam('pCarrierAccountNumber', '');
                        modelPlanProgCode2.getProxy().setExtraParam('pLobID', 0);
                        modelPlanProgCode2.load({
                            scope: this,
                            callback: function (record, operation, success) {
                                var activeProgramCodes2 = [];
                                var objRespPlanProgCode2 = Ext.decode(operation.getResponse().responseText);
                                objRespPlanProgCode2.data.forEach(function (item, index) {
                                    if (item.active == true) {
                                        activeProgramCodes2.push(item);
                                    }
                                });
                                var arrFinal = activeProgramCodes1.concat(activeProgramCodes2);
                                if (arrFinal != null && arrFinal.length > 0) {
                                    vm.getStore('storeMCSProgGroupCode').loadData(arrFinal);
                                    view.down('#cbxMCSProgGroupCodeWin').bindStore(vm.getStore('storeMCSProgGroupCode'));
                                }
                            }
                        });
                    }

                }
            });

            view.down('#cbxMCSProgGroupCodeWin').setDisabled(false);
        },

        onPlanSelection_Win: function (combo, rcd) {
            var view = this.getView();
            var planGroupId = rcd.get('planGroupId');
            var vm = this.getViewModel();
            view.down('#cmbSearchPlanBenefitWin').setReadOnly(false);
            view.down('#cmbSearchPlanBenefitWin').setValue('');
            //view.down('#cbxMCSProgGroupCode').setReadOnly(false);
            //view.down('#cbxMCSProgGroupCode').setValue('');
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgGroupCode')[0].setValue('');
            var planbenefitstore = vm.getStore('PlanBenefitStore');
            planbenefitstore.getProxy().setExtraParam('pWhere', " planGroupId = " + planGroupId);
            planbenefitstore.load();
            /*var modelBenefit = Ext.create('Atlas.plan.model.PlanBenefitListItem');
             modelBenefit.load({
             scope: this,
             callback: function (record, operation, success) {
             var objRespBenefitStore = Ext.decode(operation.getResponse().responseText);
             var planIdList = {};
             var planBenefitList = [];
             objRespBenefitStore.data.forEach(function (item, index) {
             if (item.planGroupId == planGroupId) {
             planBenefitList.push(item);
             }
             });
             planbenefitstore.loadData(planBenefitList);
             }
             });*/
            //view.down('#hidPlanGroupId').setValue(rcd.get('planGroupId'));
            //view.down('#hidPlanGroupStatusCode').setValue(rcd.get('planGroupStatus'));

            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidPlanGroupId')[0].setValue(rcd.get('planGroupId'));
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidPlanGroupStatusCode')[0].setValue(rcd.get('planGroupStatus'));


        },

        btnCancelWinEnroll_Click: function () {
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
            var win2 = Ext.WindowManager.getActive();
            if (win2) {
                win2.close();
            }
        },

        txtTempPlanGroup_Keyup: function (item, value) {
            var view = this.getView();
            view.down('#cmbSearchPlanGroupsWin').show();
            view.down('#cmbSearchPlanGroupsWin').setRawValue(item.getValue());
            item.hide();
        },
        setAltAllowBlanks:function(checked){
            var view = this.getView();
            view.down('#txtAltInsIdWin').allowBlank=!checked;
            view.down('#txtAltInsNameWin').allowBlank=!checked;
            view.down('#dtAltInsEffDateWin').allowBlank=!checked;
        },

        init: function () {
            var view = this.getView();
            this.setAltAllowBlanks(view.down('#chkAltInsIndWin').checked);
         },
        onAltInsIndicatorChange:function(cb){
            this.setAltAllowBlanks(cb.checked);
        }



    }
);
