/**
 * Created by agupta on 11/28/2016.
 */

//var LastTaskConfigMaster = '';
var carrierId = '';
var carrierAcctNumber = '';
var lobId = '';

var dblClickPGroupCode = '';
var dblClickPBenefitCode = '';

var masterRecordSelectionChanged = true;
var configID = '';

Ext.define('Atlas.admin.view.TaskConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-taskconfigurationcontroller',

    listen: {
        controller: {
            '*': {
                parentEventSetEDIPartnerId: 'setEdiPartnerId',
                parentEventSetMonitorDetail: 'setMonitorDetail'
            }
        }
    },

    setMonitorDetail: function (record) {
        var view = this.getView();
        if (view.down('#hdnMonitorRequestID').getValue() == "ACK") {
            view.down('#hdnAckRespMonitorID').setValue(record.MonitorID);
            view.down('#txtAckProgramName').setValue(record.ProgramName);
            view.down('#txtAckCheckIntervalSeconds').setValue(record.CheckIntervalSeconds);
            view.down('#txtAckParameters').setValue(record.Parameters);
            view.down('#txtAckFilePattern').setValue(record.FilePattern);
            view.down('#txtAckDescription').setValue(record.Description);
            view.down('#txtAckDirectory').setValue(record.TempDirectory);
            view.down('#txtAckArchiveDirectory').setValue(record.ArchiveDirectory);
            view.down('#txtAckTempDirectory').setValue(record.TempDirectory);
            view.down('#txtAckMinFileAge').setValue(record.MinFileAge);
            view.down('#chkAckActive').setValue(record.Active);
        }
        else {
            view.down('#hdnValRespMonitorID').setValue(record.MonitorID);
            view.down('#txtValProgramName').setValue(record.ProgramName);
            view.down('#txtValCheckIntervalSeconds').setValue(record.CheckIntervalSeconds);
            view.down('#txtValParameters').setValue(record.Parameters);
            view.down('#txtValFilePattern').setValue(record.FilePattern);
            view.down('#txtValDescription').setValue(record.Description);
            view.down('#txtValDirectory').setValue(record.TempDirectory);
            view.down('#txtValArchiveDirectory').setValue(record.ArchiveDirectory);
            view.down('#txtValTempDirectory').setValue(record.TempDirectory);
            view.down('#txtValMinFileAge').setValue(record.MinFileAge);
            view.down('#chkValActive').setValue(record.Active);
        }
    },

    btnValMonitorID_Click: function () {
        var view = this.getView();
        view.down('#hdnMonitorRequestID').setValue('VAL');
        var me = this;
        var win = Ext.create({
            xtype: 'admin-monitorwindow',
            autoShow: false
        });
        me.getView().add(win).show();
    },

    btnAckMonitorId_Click: function () {
        var view = this.getView();
        view.down('#hdnMonitorRequestID').setValue('ACK');
        var me = this;
        var win = Ext.create({
            xtype: 'admin-monitorwindow',
            autoShow: false
        });
        me.getView().add(win).show();
    },

    setEdiPartnerId: function (partnerId) {
        var view = this.getView();
        view.down('#txtEDIPartnerID').setValue(partnerId);
    },

    btnSelectEDIPartner_Click: function () {
        var me = this;
        var win = Ext.create({
            xtype: 'admin-edipartnerwindow',
            autoShow: false
        });
        me.getView().add(win).show();
    },

    getFormChanges: function () {
        var view = this.getView();
        var objTaskConfigMaster = {};
        objTaskConfigMaster.TaskName = view.down('#txtTaskName').getValue();
        objTaskConfigMaster.Description = view.down('#txtDescription').getValue();
        objTaskConfigMaster.CarrierId = view.down('#cbxCarrierID').getValue() == '' ? "0" : view.down('#cbxCarrierID').getValue();
        objTaskConfigMaster.CarrierAccount = view.down('#cbxCarrierAccount').getValue();
        objTaskConfigMaster.CarrierLOBId = view.down('#cbxLOB').getValue() == "All" ? "999" : view.down('#cbxLOB').getValue();
        objTaskConfigMaster.ProgramName = view.down('#txtProgramName').getValue();
        objTaskConfigMaster.Active = view.down('#chkActive').checked;
        objTaskConfigMaster.DataSource = view.down('#cbxDataSource').getValue();
        objTaskConfigMaster.SourceEntity = view.down('#cbxSourceEntity').getValue();
        objTaskConfigMaster.TargetEntity = view.down('#cbxTargetEntity').getValue();
        objTaskConfigMaster.FileFormat = view.down('#cbxFileFormat').getValue();
        objTaskConfigMaster.EdiPartnerId = view.down('#txtEDIPartnerID').getValue();
        objTaskConfigMaster.DefaultParameters = view.down('#txtDefaultParameters').getValue();
        objTaskConfigMaster.FileNamePattern = view.down('#txtFileNamePattern').getValue();
        objTaskConfigMaster.PbmErrorListId = view.down('#cbxPBMErrorListID').getValue() == '' ? "0" : view.down('#cbxPBMErrorListID').getValue();

        objTaskConfigMaster.AckRespMonitorID = view.down('#hdnAckRespMonitorID').getValue() == '' ? 0 : view.down('#hdnAckRespMonitorID').getValue();
        objTaskConfigMaster.AckProgramName = view.down('#txtAckProgramName').getValue();
        objTaskConfigMaster.AckCheckInterval = view.down('#txtAckCheckIntervalSeconds').getValue() == '' ? "0" : view.down('#txtAckCheckIntervalSeconds').getValue();
        objTaskConfigMaster.AckActive = view.down('#chkAckActive').checked;
        objTaskConfigMaster.AckParameters = view.down('#txtAckParameters').getValue();
        objTaskConfigMaster.AckFilePattern = view.down('#txtAckFilePattern').getValue();
        objTaskConfigMaster.AckDescription = view.down('#txtAckDescription').getValue();
        objTaskConfigMaster.AckDirectoryName = view.down('#txtAckDirectory').getValue();
        objTaskConfigMaster.AckArchiveDirectory = view.down('#txtAckArchiveDirectory').getValue();
        objTaskConfigMaster.AckTempDirectory = view.down('#txtAckTempDirectory').getValue();
        objTaskConfigMaster.AckMinFileAge = view.down('#txtAckMinFileAge').getValue() == '' ? "0" : view.down('#txtAckMinFileAge').getValue();

        objTaskConfigMaster.ValRespMonitorID = view.down('#hdnValRespMonitorID').getValue() ? 0 : view.down('#hdnValRespMonitorID').getValue();
        objTaskConfigMaster.ValProgramName = view.down('#txtValProgramName').getValue();
        objTaskConfigMaster.ValCheckInterval = view.down('#txtValCheckIntervalSeconds').getValue() == '' ? "0" : view.down('#txtValCheckIntervalSeconds').getValue();
        objTaskConfigMaster.ValActive = view.down('#chkValActive').checked;
        objTaskConfigMaster.ValParameters = view.down('#txtValParameters').getValue();
        objTaskConfigMaster.ValFilePattern = view.down('#txtValFilePattern').getValue();
        objTaskConfigMaster.ValDescription = view.down('#txtValDescription').getValue();
        objTaskConfigMaster.ValDirectoryName = view.down('#txtValDirectory').getValue();
        objTaskConfigMaster.ValArchiveDirectory = view.down('#txtValArchiveDirectory').getValue();
        objTaskConfigMaster.ValTempDirectory = view.down('#txtValTempDirectory').getValue();
        objTaskConfigMaster.ValMinFileAge = view.down('#txtValMinFileAge').getValue() == '' ? "0" : view.down('#txtValMinFileAge').getValue();
        objTaskConfigMaster.SystemID = view.down('#hdnTaskSystemID').getValue() == '' ? "0" : view.down('#hdnTaskSystemID').getValue();

        return objTaskConfigMaster;
    },

    setPbmTaskConfigMaster_Priv: function (configDetail) {


        var view = this.getView();
        var vm = this.getViewModel();
        var objTaskConfigMaster = this.getFormChanges();
        var taskConfigId = view.down('#hdnTaskConfigID').getValue() == '' ? 0 : view.down('#hdnTaskConfigID').getValue();
        var modelTaskConfig = Ext.create('Atlas.plan.model.PbmTaskConfiguration');
        modelTaskConfig.getProxy().setExtraParam('pTaskConfigID', taskConfigId);
        modelTaskConfig.getProxy().setExtraParam('ttTaskConfigMaster', objTaskConfigMaster);
        modelTaskConfig.getProxy().setExtraParam('ttTaskConfigDetail', configDetail);
        modelTaskConfig.phantom = false;
        modelTaskConfig.save({
            scope: this,
            callback: function (record, operation, success) {
                var objRespTaskConfig = Ext.decode(operation.getResponse().responseText);
                if (objRespTaskConfig.message[0].code == 0) {
                    this.getPbmTaskConfigMaster(objRespTaskConfig.metadata.pOutTaskConfigID);
                }
                else {
                    //Ext.Msg.alert("PBM", message, "Ext.net.DirectMethods.GetPbmTaskConfigDetail(" + taskConfigID + ", {eventMask: { showMask: true }}); ").Show();
                    Ext.Msg.alert('PBM', objRespTaskConfig.message[0].message);
                    var model = Ext.create('Atlas.plan.model.PbmTaskConfiguration');
                    model.load({
                        scope: this,
                        callback: function (record, operation, success) {
                            if (success) {
                                var arr = [];
                                var objResp = Ext.decode(operation.getResponse().responseText);
                                    objResp.metadata.ttTaskConfigDetail.ttTaskConfigDetail.forEach(function (item, index) {
                                    if (item.TaskConfigId == objRespTaskConfig.metadata.pOutTaskConfigID) {
                                        arr.push(item);
                                    }
                                });
                                var storeDetail = vm.getStore('storeTaskDetail');
                                storeDetail.loadData(arr, false);
                            }
                        }
                    });
                }

            }
        });
    },

    SetPbmTaskConfigMaster: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        if (view.down('#fpInfoPart1').getForm().isValid() && view.down('#fpInfoPart2').getForm().isValid()) {
            if (view.down('#txtValCheckIntervalSeconds').getValue() == "0" || view.down('#txtAckCheckIntervalSeconds').getValue() == "0") {
                Ext.Msg.alert('PBM', 'Check Interval Seconds should be greater than zero.');
                return false;
            }
            var ackResponseAllowBlank = true;
            view.down('#fsAcknowledgementResponse').items.items.forEach(function (f) {
                if (f.xtype != 'container' && f.itemId != 'cmpAckMonitorID' && f.itemId != 'txtAckParameters' && f.itemId != 'chkAckActive' && f.itemId != 'txtAckMinFileAge') {
                    if (f.getValue() != "" || view.down('#txtAckProgramName').getValue() != "") {
                        ackResponseAllowBlank = false;
                        return false;
                    }
                }
            });
            view.down('#fsAcknowledgementResponse').items.items.forEach(function (f) {
                if (f.xtype != 'container' && f.itemId != 'cmpAckMonitorID' && f.itemId != 'txtAckParameters' && f.itemId != 'chkAckActive' && f.itemId != 'txtAckMinFileAge') {
                    f.allowBlank = ackResponseAllowBlank;
                }
            });
            view.down('#txtAckProgramName').allowBlank = ackResponseAllowBlank;
            var valResponseAllowBlank = true;
            view.down('#fsValidationResponse').items.items.forEach(function (f) {
                if (f.xtype != 'container' && f.itemId != 'cmpValMonitorID' && f.itemId != 'txtValParameters' && f.itemId != 'chkValActive' && f.itemId != 'txtValMinFileAge') {
                    if (f.getValue() != "" || view.down('#txtValProgramName').getValue() != "") {
                        valResponseAllowBlank = false;
                        return false;
                    }
                }
            });
            view.down('#fsValidationResponse').items.items.forEach(function (f) {
                if (f.xtype != 'container' && f.itemId != 'cmpValMonitorID' && f.itemId != 'txtValParameters' && f.itemId != 'chkValActive' && f.itemId != 'txtValMinFileAge') {
                    f.allowBlank = valResponseAllowBlank;
                }
            });
            view.down('#txtValProgramName').allowBlank = valResponseAllowBlank;
            if (view.down('#fpResponse').isValid()) {
                var grid = view.down('#gridTaskDetail');
                var store = grid.getStore();



                if (grid.plugins[0].editing) {
                    view.down('#tpTaskSetup').setActiveTab('fpTaskDetail');
                    Ext.Msg.alert('PBM', 'Please complete edit record before proceed.');
                }
                else {
                    var arrTaskDetail = [];
                    var emptyRecord = {};
                    emptyRecord.TaskConfigId = '';
                    emptyRecord.ProgGroupCode = '';
                    emptyRecord.ProgBenefitCode = '';
                    emptyRecord.SystemID = '';
                    emptyRecord.Mode = '';

                    for (var i in store.removed) {
                        var rec = store.removed[i];
                        var recordData = rec.data;
                        var taskConfigDetail = {};
                        taskConfigDetail.TaskConfigId = recordData.TaskConfigId;
                        taskConfigDetail.ProgGroupCode = recordData.ProgGroupCode;
                        taskConfigDetail.ProgBenefitCode = recordData.ProgBenefitCode;
                        taskConfigDetail.SystemID = recordData.SystemID;
                        taskConfigDetail.Mode = 'D';
                        arrTaskDetail.push(taskConfigDetail);
                        this.setPbmTaskConfigMaster_Priv(taskConfigDetail);
                    }

                    for (var i in store.data.items) {
                        var item = store.data.items[i];
                        if (!!item.dirty) {
                            var recordData = item.data;
                            if (recordData.SystemID == undefined || recordData.SystemID == 0) {
                                var taskConfigDetail = {};
                                taskConfigDetail.TaskConfigId = 0;
                                taskConfigDetail.ProgGroupCode = recordData.ProgGroupCode;
                                taskConfigDetail.ProgBenefitCode = recordData.ProgBenefitCode;
                                taskConfigDetail.SystemID = 0;
                                taskConfigDetail.Mode = 'A';
                                arrTaskDetail.push(taskConfigDetail);
                                this.setPbmTaskConfigMaster_Priv(taskConfigDetail);
                            }
                            else if (recordData.SystemID != undefined) {
                                var taskConfigDetail = {};
                                taskConfigDetail.TaskConfigId = recordData.TaskConfigId;
                                taskConfigDetail.ProgGroupCode = recordData.ProgGroupCode;
                                taskConfigDetail.ProgBenefitCode = recordData.ProgBenefitCode;
                                taskConfigDetail.SystemID = recordData.SystemID;
                                taskConfigDetail.Mode = 'U';
                                arrTaskDetail.push(taskConfigDetail);
                                this.setPbmTaskConfigMaster_Priv(taskConfigDetail);
                            }
                        }
                    }

                    if(arrTaskDetail.length == 0){
                        //arrTaskDetail.push(emptyRecord);
                        this.setPbmTaskConfigMaster_Priv(emptyRecord);
                    }
                    //this.setPbmTaskConfigMaster_Priv(arrTaskDetail[0]);

                        /*if (vm.getStore('storeTaskDetail').getUpdatedRecords().length > 0) {
                        //view.down('#gridTaskDetail').save();
                        //vm.getStore('storeTaskDetail').commitChanges();
                        //vm.getStore('storeTaskDetail').data.items[1].dirty
                        vm.getStore('storeTaskDetail').data.forEach(function (item, index) {
                            if (item.dirty) {
                                var taskConfigDetail = {};
                                taskConfigDetail.TaskConfigId = 0;
                                taskConfigDetail.ProgGroupCode = item.data.ProgGroupCode;
                                taskConfigDetail.ProgBenefitCode = item.data.ProgBenefitCode;
                                taskConfigDetail.SystemID = 0;
                                taskConfigDetail.Mode = 'A';
                            }
                        })
                    }
                    else {
                        //Ext.net.DirectMethods.SetPbmTaskConfigMaster({eventMask: {showMask: true}});

                        this.setPbmTaskConfigMaster_Priv(taskConfigDetail);
                    }*/
                }
            }
            else {
                Ext.Msg.alert('PBM', 'Please enter all required fields before saving.');
                view.down('#tpTaskSetup').setActiveTab('fpTaskStatus');
                view.down('#tpInfo').setActiveTab('fpResponse');
            }
        }
        else {
            Ext.Msg.alert('PBM', 'Please enter all required fields before saving.');
            view.down('#tpTaskSetup').setActiveTab('fpTaskStatus');
            view.down('#tpInfo').setActiveTab('fpInfo');
        }
    },

    cancelChange: function () {
        var view = this.getView();
        var gridTaskConfigMaster = view.down('#gridTaskConfigMaster');
        if (gridTaskConfigMaster.getSelectionModel().hasSelection()) {
            var lstTaskConfigMaster = gridTaskConfigMaster.getSelectionModel().getSelected();
            this.resetControls('', lstTaskConfigMaster.items[0]);
        }
        else if (view.down('#LastTaskConfigMaster').getValue() != '') {
            var parseJson = JSON.parse(view.down('#LastTaskConfigMaster').getValue());
            var jsn = {};
            jsn.data = parseJson;
            var rowIndex = gridTaskConfigMaster.getStore().find('SystemID', parseJson.SystemID);
            gridTaskConfigMaster.getSelectionModel().select(rowIndex);
            this.resetControls('', jsn);
        }
        else {
            this.resetControls();
        }

    },

    newRow: function () {
        var view = this.getView();
        var gridTaskConfigMaster = view.down('#gridTaskConfigMaster');
        if (gridTaskConfigMaster.getSelectionModel().hasSelection()) {
            view.down('#LastTaskConfigMaster').setValue(JSON.stringify(gridTaskConfigMaster.getSelectionModel().getSelected().items[0].data));
        }
        this.resetControls();
        view.down('#tpTaskSetup').setActiveTab('fpTaskStatus');
        view.down('#tpInfo').setActiveTab('fpInfo');
    },

    btnAddClick : function(){
        var view=this.getView();
        var viewModel=this.getViewModel();
        var grid =  view.down('#gridTaskDetail');
        var store=viewModel.getStore('storeTaskDetail');
        if(!grid.plugins[0].editing) {
            store.insert(0, {
                TaskConfigId: 0,
                ProgGroupCode: '',
                ProgBenefitCode: ''
            });

            grid.plugins[0].startEdit(0, 0)
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
        }
    },


    btnRemoveClick:function(){
        var view=this.getView();
        var grid =  view.down('#gridTaskDetail');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");

        }
        else {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('storeTaskDetail');
            grid.getSelectionModel().getSelection()[0].phantom = false;
            store.remove( store.remove(grid.getSelectionModel().getSelection()[0]));
        }
    },

    getProgramBenefitCode: function (element, record, isDoubleClicked) {
        var me = this,
            vm = this.getViewModel();
        var selProgGroupCode = record.data.progGroupCode;
        // var storeProgGroupCode = vm.getStore('storeMCSProgGroupCode');
        // storeProgGroupCode.getProxy().setExtraParam('pPlanGroupId', 0);
        // storeProgGroupCode.getProxy().setExtraParam('pPlanBenefitId', 0);
        // storeProgGroupCode.getProxy().setExtraParam('pCarrierID', carrierId);
        // storeProgGroupCode.getProxy().setExtraParam('pCarrierAccountNumber', carrierAcctNumber);
        // storeProgGroupCode.getProxy().setExtraParam('pLobID', lobId);
        // storeProgGroupCode.load({
        //     scope: this,
        //     callback: function (record, operation, success) {
        //         if (success) {
        //             var arr = [];
        //             var objRespProgGroupCode = Ext.decode(operation.getResponse().responseText);
        //             objRespProgGroupCode.data.forEach(function (item, index) {
        //                 if (item.progGroupCode == selProgGroupCode) {
        //                     arr.push(item);
        //                 }
        //             });
        //             var storeBenefitCode = vm.getStore('storeMCSprogBenefitCode');
        //             storeBenefitCode.loadData(arr, false);
        //             this.lookupReference('cbxProgBenefitCode').setValue('');
        //             if(isDoubleClicked == true) {
        //                 this.lookupReference('cbxProgGroupCode').setValue(dblClickPGroupCode);
        //                 this.lookupReference('cbxProgBenefitCode').setValue(dblClickPBenefitCode);
        //             }
        //         }
        //     }
        // });
        var arr = [];
        vm.getStore('storeProgGroupCodeAll').data.items.forEach(function(item, index){
            if (item.data.progGroupCode == selProgGroupCode) {
                arr.push(item);
            }
        });
        var storeBenefitCode = vm.getStore('storeMCSprogBenefitCode');
        storeBenefitCode.loadData(arr, false);
        this.lookupReference('cbxProgBenefitCode').setValue('');
        if(isDoubleClicked == true) {
            Ext.defer(function(){
                me.lookupReference('cbxProgGroupCode').setValue(dblClickPGroupCode);
                me.lookupReference('cbxProgBenefitCode').setValue(dblClickPBenefitCode);

                me.lookupReference('cbxProgGroupCode').setRawValue(dblClickPGroupCode);
                me.lookupReference('cbxProgBenefitCode').setRawValue(dblClickPBenefitCode);
            }, 200);

        }
    },

    gridTaskDetail_DblClick: function (cntrl, item) {
        dblClickPGroupCode = item.data.ProgGroupCode;
        dblClickPBenefitCode = item.data.ProgBenefitCode;
        var rcd = {
            data: {
                progGroupCode : ''
            }
        };
        rcd.data.progGroupCode = item.data.ProgGroupCode;

        this.getProgramBenefitCode('', rcd, true);

    },

    onUndoChangeClick: function (button) {
        var dataToRevert = Ext.getCmp('dispensingFeeRuleDetailGrid').getView().store;
        dataToRevert.getAt(Ext.getCmp(button.id).up()._rowContext.recordIndex).reject();
    },


    resetControls: function (lstTaskConfigMaster, record) {
        var view = this.getView();
        var vm = this.getViewModel();
        view.down('#fpTaskDetail').setDisabled(record != undefined ? false : true);

        if (record == undefined) {
            view.down('#gridTaskConfigMaster').getSelectionModel().clearSelections();
        }
        configID = record != undefined ? record.data.TaskConfigId : 0;
        view.down('#hdnTaskConfigID').setValue(record != undefined ? record.data.TaskConfigId : 0);
        view.down('#hdnTaskSystemID').setValue(record != undefined ? record.data.SystemID : 0);
        view.down('#txtTaskName').setValue(record != undefined ? record.data.TaskName : '');
        view.down('#txtDescription').setValue(record != undefined ? record.data.Description : '');
        view.down('#cbxCarrierID').setValue(record != undefined ? record.data.CarrierId : '');
        view.down('#cbxCarrierAccount').setValue(record != undefined ? record.data.CarrierAccount : '');
        view.down('#cbxLOB').setValue(record != undefined ? record.data.CarrierLOBId : '');
        view.down('#txtProgramName').setValue(record != undefined ? record.data.ProgramName : '');
        view.down('#chkActive').setValue(record != undefined ? record.data.Active : false);
        view.down('#cbxDataSource').setValue(record != undefined ? record.data.DataSource : '');
        view.down('#cbxSourceEntity').setValue(record != undefined ? record.data.SourceEntity : '');
        view.down('#cbxTargetEntity').setValue(record != undefined ? record.data.TargetEntity : '');
        view.down('#cbxFileFormat').setValue(record != undefined ? record.data.FileFormat : '');
        view.down('#txtEDIPartnerID').setValue(record != undefined ? record.data.EdiPartnerId : '');
        view.down('#txtDefaultParameters').setValue(record != undefined ? record.data.DefaultParameters : '');
        view.down('#txtFileNamePattern').setValue(record != undefined ? record.data.FileNamePattern : '');
        view.down('#cbxPBMErrorListID').setValue(record != undefined ? record.data.PbmErrorListId : '');

        view.down('#hdnAckRespMonitorID').setValue(record != undefined ? record.data.AckRespMonitorID : 0);
        view.down('#txtAckProgramName').setValue(record != undefined ? record.data.AckProgramName : '');
        view.down('#txtAckCheckIntervalSeconds').setValue(record != undefined ? (record.data.AckCheckInterval == 0 ? '' : record.data.AckCheckInterval) : '');
        view.down('#chkAckActive').setValue(record != undefined ? record.data.AckActive : false);
        view.down('#txtAckParameters').setValue(record != undefined ? record.data.AckParameters : '');
        view.down('#txtAckFilePattern').setValue(record != undefined ? record.data.AckFilePattern : '');
        view.down('#txtAckDescription').setValue(record != undefined ? record.data.AckDescription : '');
        view.down('#txtAckDirectory').setValue(record != undefined ? record.data.AckDirectoryName : '');
        view.down('#txtAckArchiveDirectory').setValue(record != undefined ? record.data.AckArchiveDirectory : '');
        view.down('#txtAckTempDirectory').setValue(record != undefined ? record.data.AckTempDirectory : '');
        view.down('#txtAckMinFileAge').setValue(record != undefined ? (record.data.AckMinFileAge == 0 ? '' : record.data.AckMinFileAge) : '');

        view.down('#hdnValRespMonitorID').setValue(record != undefined ? record.data.ValRespMonitorID : 0);
        view.down('#txtValProgramName').setValue(record != undefined ? record.data.ValProgramName : '');
        view.down('#txtValCheckIntervalSeconds').setValue(record != undefined ? (record.data.ValCheckInterval == 0 ? '' : record.data.ValCheckInterval) : '');
        view.down('#chkValActive').setValue(record != undefined ? record.data.ValActive : false);
        view.down('#txtValParameters').setValue(record != undefined ? record.data.ValParameters : '');
        view.down('#txtValFilePattern').setValue(record != undefined ? record.data.ValFilePattern : '');
        view.down('#txtValDescription').setValue(record != undefined ? record.data.ValDescription : '');
        view.down('#txtValDirectory').setValue(record != undefined ? record.data.ValDirectoryName : '');
        view.down('#txtValArchiveDirectory').setValue(record != undefined ? record.data.ValArchiveDirectory : '');
        view.down('#txtValTempDirectory').setValue(record != undefined ? record.data.ValTempDirectory : '');
        view.down('#txtValMinFileAge').setValue(record != undefined ? (record.data.ValMinFileAge == 0 ? '' : record.data.ValMinFileAge) : '');
        if (configID != 0) {
            //GetPbmTaskConfigDetail(configID);
            var arr = [];

            // var store = vm.getStore('storeTaskConfigMaster');
            // var model = Ext.create('Atlas.plan.model.PbmTaskConfiguration');
            // model.load({
            //    scope: this,
            //    callback: function (record, operation, success) {
            //        if (success) {
            //            var objResp = Ext.decode(operation.getResponse().responseText);
            //            objResp.metadata.ttTaskConfigDetail.ttTaskConfigDetail.forEach(function (item, index) {
            //                if (item.TaskConfigId == configID) {
            //                    arr.push(item);
            //                }
            //            });
            //            var storeDetail = vm.getStore('storeTaskDetail');
            //            storeDetail.loadData(arr, false);
            //        }
            //   }
            // });

            carrierId = record.data.CarrierId;
            carrierAcctNumber = record.data.CarrierAccount;
            lobId = record.data.CarrierLOBId;
            var tabBar = view.down('#tpTaskSetup'),
            activeTabTitle = tabBar.getActiveTab().title;
            if (activeTabTitle == 'Task Detail') {
                vm.getStore('storeTaskConfigDetail').data.items.forEach(function(item, index){
                    if (item.data.TaskConfigId == configID) {
                        arr.push(item);
                    }
                });
                var storeDetail = vm.getStore('storeTaskDetail');
                storeDetail.loadData(arr, false);

                masterRecordSelectionChanged = false;
                var storeProgGroupCode = vm.getStore('storeMCSProgGroupCode');
                storeProgGroupCode.getProxy().setExtraParam('pPlanGroupId', 0);
                storeProgGroupCode.getProxy().setExtraParam('pPlanBenefitId', 0);
                storeProgGroupCode.getProxy().setExtraParam('pCarrierID', carrierId);
                storeProgGroupCode.getProxy().setExtraParam('pCarrierAccountNumber', carrierAcctNumber);
                storeProgGroupCode.getProxy().setExtraParam('pLobID', lobId);
                storeProgGroupCode.load({
                    scope: this,
                    callback: function (record, operation, success) {
                        if (success) {
                            var arrProgGroupCode = [];
                            var jsonData = [];
                            var json = '';
                            var jsonAll = '',
                                jsonAllData=[],
                                tempAll='';
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            objResp.data.forEach(function (item, index) {
                                jsonAll = '{ "progGroupCode" : "' + item.progGroupCode + '", "progBenefitCode" : "' + item.progBenefitCode + '"}';
                                tempAll = JSON.parse(jsonAll);
                                jsonAllData.push(tempAll);
                                if (arrProgGroupCode.indexOf(item.progGroupCode) < 0) {
                                    arrProgGroupCode.push(item.progGroupCode);
                                    //json = '{ "progGroupCode" : "' + item.progGroupCode + '"}';
                                    json = '{ "progGroupCode" : "' + item.progGroupCode + '", "progBenefitCode" : "' + item.progBenefitCode + '"}';
                                    var temp = JSON.parse(json);
                                    jsonData.push(temp);
                                }
                            });
                            var storeFilteredProgGroupCode = vm.getStore('storeMCSProgGroupCode');
                            storeFilteredProgGroupCode.loadRawData(jsonData, false);
                            var storeProgGroupCodeAll = vm.getStore('storeProgGroupCodeAll');
                            storeProgGroupCodeAll.loadRawData(jsonAllData, false);
                        }
                    }
                });
            }
            else{
                masterRecordSelectionChanged = true;
            }
        }
        else {
            var storeDetail = vm.getStore('storeTaskDetail');
            storeDetail.removeAll();
        }
        view.down('#cbxCarrierID').setDisabled(configID != 0);
        view.down('#cbxCarrierAccount').setDisabled(configID != 0);
        view.down('#cbxLOB').setDisabled(configID != 0);

        view.down('#fsAcknowledgementResponse').items.each(function (f) {
            if (f.id != 'cmpAckMonitorID' && f.id != 'txtAckParameters' && f.id != 'chkAckActive' && f.id != 'txtAckMinFileAge') {
                f.allowBlank = true;
            }
        });
        view.down('#txtAckProgramName').allowBlank = true;
        view.down('#fsValidationResponse').items.each(function (f) {
            if (f.id != 'cmpValMonitorID' && f.id != 'txtValParameters' && f.id != 'chkValActive' && f.id != 'txtValMinFileAge') {
                f.allowBlank = true;
            }
        });
        view.down('#txtValProgramName').allowBlank = true;
    },

    cbxCarrierID_Select: function (item, rcd) {
        var carrierId = rcd.data.carrierId;
        var view = this.getView();
        var vm = this.getViewModel();
        var storCarrierAccount = vm.getStore('storeCarrierAccount');
        storCarrierAccount.removeAll();
        storCarrierAccount.load({
            scope: this,
            callback: function (record, operation, success) {
                if (success) {
                    var objRespCarrierAccount = Ext.decode(operation.getResponse().responseText);
                    var arr = [];
                    var rcd = {
                        accountName: '',
                        accountNumber: '',
                        carrierId: ''
                    };
                    rcd.accountName = 'All';
                    rcd.accountNumber = 'All';
                    arr.push(rcd);
                    objRespCarrierAccount.data.forEach(function (item, index) {
                        if (carrierId == item.carrierId) {
                            var itm = {
                                accountName: '',
                                accountNumber: '',
                                carrierId: ''
                            };
                            itm.accountName = item.accountName;
                            itm.accountNumber = item.carrierAcctNumber;
                            itm.carrierId = item.carrierId;
                            arr.push(itm);
                        }
                    });
                    storCarrierAccount.loadData(arr, false);
                    view.down('#cbxCarrierAccount').setValue('All');
                }
            }
        });

        var storLOB = vm.getStore('storeLOB');
        storLOB.removeAll();
        storLOB.load({
            scope: this,
            callback: function (record, operation, success) {
                if (success) {
                    var objRespCarrierAccount = Ext.decode(operation.getResponse().responseText);
                    var arr = [];
                    var rcd = {
                        carrierId: '',
                        lobName: '',
                        carrierLOBId: ''
                    };
                    rcd.lobName = 'All';
                    rcd.carrierLOBId = '999';
                    arr.push(rcd);
                    objRespCarrierAccount.data.forEach(function (item, index) {
                        if (carrierId == item.carrierId) {
                            var itm = {
                                carrierId: '',
                                lobName: '',
                                carrierLOBId: ''
                            };
                            itm.carrierId = item.carrierId;
                            itm.lobName = item.lobName;
                            itm.carrierLOBId = item.carrierLOBId;
                            arr.push(itm);
                        }
                    });
                    storLOB.loadData(arr, false);
                    view.down('#cbxLOB').setValue('999');
                }
            }
        });

    },

    bindCombos: function () {
        var vm = this.getViewModel();
        var store = vm.getStore('storeCarrierID');
        store.load();

        var storeError = vm.getStore('storePBMErrorListID');
        storeError.load();
    },

    getPbmTaskConfigMaster: function (taskConfigId) {
        var view = this.getView();
        var vm = this.getViewModel();
        var store = vm.getStore('storeTaskConfigMaster');
        store.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.data.length > 0) {
                        var rcd = '';
                        var rowIndex = 0;
                        if (taskConfigId == undefined || taskConfigId == 0) {
                            rcd = objResp.data[0];
                            rowIndex = objResp.data.indexOf(rcd);
                        }
                        else {
                            objResp.data.forEach(function (item, index) {
                                if (item.TaskConfigId == taskConfigId) {
                                    if (rcd == '') {
                                        rcd = item;
                                        rowIndex = objResp.data.indexOf(rcd);
                                        return;
                                    }
                                }
                            });

                        }
                        view.down('#gridTaskConfigMaster').getSelectionModel().select(rowIndex);
                        var jsn = {};
                        jsn.data = rcd;
                        this.cbxCarrierID_Select('', jsn);
                        vm.getStore('storeTaskConfigDetail').loadData(objResp.metadata.ttTaskConfigDetail.ttTaskConfigDetail);
                        this.resetControls('', jsn);
                    }

                    //var rowIndex = gridTaskConfigMaster.getStore().data.items.indexOf(LastTaskConfigMaster.items[0]);
                    //gridTaskConfigMaster.getSelectionModel().selectRow(rowIndex);
                    //this.resetControls('', LastTaskConfigMaster.items[0]);
                }
            }
        });
    },

    onTabChange : function(){
        var view = this.getView(),
            vm = this.getViewModel(),
            tabBar = view.down('#tpTaskSetup'),
            activeTabTitle = tabBar.getActiveTab().title;
        if (activeTabTitle == 'Task Detail' && masterRecordSelectionChanged) {
            var storeProgGroupCode = vm.getStore('storeMCSProgGroupCode');
            storeProgGroupCode.getProxy().setExtraParam('pPlanGroupId', 0);
            storeProgGroupCode.getProxy().setExtraParam('pPlanBenefitId', 0);
            storeProgGroupCode.getProxy().setExtraParam('pCarrierID', carrierId);
            storeProgGroupCode.getProxy().setExtraParam('pCarrierAccountNumber', carrierAcctNumber);
            storeProgGroupCode.getProxy().setExtraParam('pLobID', lobId);
            storeProgGroupCode.load({
                scope: this,
                callback: function (record, operation, success) {
                    if (success) {
                        var arrProgGroupCode = [];
                        var jsonData = [];
                        var json = '';
                        var jsonAll = '',
                            jsonAllData=[],
                            tempAll='';
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        objResp.data.forEach(function (item, index) {
                            jsonAll = '{ "progGroupCode" : "' + item.progGroupCode + '", "progBenefitCode" : "' + item.progBenefitCode + '"}';
                            tempAll = JSON.parse(jsonAll);
                            jsonAllData.push(tempAll);
                            if (arrProgGroupCode.indexOf(item.progGroupCode) < 0) {
                                arrProgGroupCode.push(item.progGroupCode);
                                //json = '{ "progGroupCode" : "' + item.progGroupCode + '"}';
                                json = '{ "progGroupCode" : "' + item.progGroupCode + '", "progBenefitCode" : "' + item.progBenefitCode + '"}';
                                var temp = JSON.parse(json);
                                jsonData.push(temp);
                            }
                        });
                        var storeFilteredProgGroupCode = vm.getStore('storeMCSProgGroupCode');
                        storeFilteredProgGroupCode.loadRawData(jsonData, false);
                        var storeProgGroupCodeAll = vm.getStore('storeProgGroupCodeAll');
                        storeProgGroupCodeAll.loadRawData(jsonAllData, false);
                    }
                }
            });
            var arr = [];
            vm.getStore('storeTaskConfigDetail').data.items.forEach(function(item, index){
                if (item.data.TaskConfigId == configID) {
                    arr.push(item);
                }
            });
            var storeDetail = vm.getStore('storeTaskDetail');
            storeDetail.loadData(arr, false);
            masterRecordSelectionChanged = false;
        }
    },

    initViewModel: function () {
        this.getPbmTaskConfigMaster();
        this.bindCombos();
    }


});