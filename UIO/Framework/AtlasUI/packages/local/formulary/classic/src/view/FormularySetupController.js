/**
 * Created by mkorivi on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.FormularySetupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formularysetup',
    listen: {
        controller: {
            'formulary': {
                FormularyListChange: 'cbxFormularyList_SelectHandler'
            },
            'fileuploader': {
                successfulUpload: 'onUploadAttachmentFormulary'
            }
        }
    },
    _fldList:'',
    _fldVals:'',
    _bStepTherapyInd:false,
    _LevelId:'',
    _LevelType:'',
    _OtcOrOpd:'',
    _iFormuStatus:0,
    bIsFDB:false,
    bIsMedicare:false,
    init: function () {
        var view=this.getView();
        view.down('#formularyTreePanel').setDisabled(true);
        view.down('#pnlRules').setDisabled(true);
        var vm = this.getViewModel();
        if (vm.get('masterrecord.FormularyID') != null && vm.get('masterrecord.FormularyID')!="")
        {
            vm.getStore('storeMedication').getProxy().setExtraParam('iplExcludeObsDrug',true);
            vm.getStore('storeMedication').getProxy().setExtraParam('pFilter','');
            view.down('#hdnFormularyId').setValue(parseInt(vm.get('masterrecord.FormularyID')));
            view.down('#hdnFormularyVersion').setValue(parseInt(vm.get('masterrecord.FormularyVersion')));
            view.down('#hdnFormularyName').setValue(vm.get('masterrecord.FormularyName'));
            view.down('#hdnFormularyStatus').setValue(parseInt(vm.get('masterrecord.Stat')));
            view.down('#hidFormuType').setValue(vm.get('masterrecord.formularyType'));
            view.down('#hidFormuDataSource').setValue(vm.get('masterrecord.dataSource'));
            view.down('#pnlTree').setDisabled(false);
            view.down('#PanelTreeSearch').setDisabled(false);
            this._iFormuStatus = parseInt(view.down('#hdnFormularyStatus').getValue());
            var formularyTreeStore=view.down('#fdbTreePanel').getViewModel().getStore('formularydrugs');
            formularyTreeStore.getProxy().setExtraParam('pFormularyId', parseInt(vm.get('masterrecord.FormularyID')));
            formularyTreeStore.getProxy().setExtraParam('pFormVersion', parseInt(vm.get('masterrecord.FormularyVersion')));
            formularyTreeStore.getProxy().setExtraParam('pETCId', 0);
            formularyTreeStore.getProxy().setExtraParam('pNDC', "");
            formularyTreeStore.getProxy().setExtraParam('pParentNodeId', 0);
            formularyTreeStore.getProxy().setExtraParam('pLastNodeIdUsed', 0);
            formularyTreeStore.load();
            if (this._iFormuStatus == 2 || this._iFormuStatus == 3 || this._iFormuStatus == 4) //Approved
            {
                view.down('#btnSave').setDisabled(true);
            }
            if (this._iFormuStatus == 2)
            {
                view.down('#btnImportRule').setDisabled(true);
            }
            else
            {
                view.down('#btnImportRule').setDisabled(false);
            }

            if (this._iFormuStatus == 1 && view.down('#hidFormuType').getValue() == "Medicare")
            {
                view.down('#btnRelink').setDisabled(false);
            }
            else
            {
                view.down('#btnRelink').setDisabled(true);
            }
            //Check to see if the Data Source is FDB or MDB
            if(view.down('#hidFormuDataSource').getValue()!="")
            {
                this.bIsFDB = view.down('#hidFormuDataSource').getValue() == "FDB"? true : false;
            }
            else {
                this.bIsFDB=false;
            }
            this.bIsMedicare = view.down('#hidFormuType').getValue()== "Medicare" ? true : false;

            view.down('#fldSetMedicare').hidden = !(this.bIsMedicare);
            view.down('#fldSetMedicaid').hidden = this.bIsMedicare;
            view.down('#btnLoadCMS').setDisabled(false);
            view.down('#btnValidateRxCUI').setDisabled(false);
            this.LoadStepTherapiesAndTiers(vm.get('masterrecord.FormularyID'));
            if(vm.get('isAtlasFormulary'))
            {
                view.down('#btnSave').setDisabled(true);
                view.down('#btnImportRule').setDisabled(true);
                view.down('#btnRelink').setDisabled(true);
                view.down('#btnValidateRxCUI').setDisabled(true);
                view.down('#btnLoadCMS').setDisabled(true);
            }
        }
        else
        {
            view.down('#btnSave').setDisabled(true);
            view.down('#btnImportRule').setDisabled(true);
            view.down('#pnlTree').setDisabled(true);
            view.down('#PanelTreeSearch').setDisabled(true);
            view.down('#btnExportRule').setDisabled(true);
            view.down('#btnLoadCMS').setDisabled(true);
            view.down('#btnValidateRxCUI').setDisabled(true);
            Ext.Msg.alert("Formulary Configuration", "Please select a Formulary from the drop down.");
        }
    },
    btnValidateRxCUI_Click: function () {
        var me = this,
            win;
        win = Ext.create('Ext.window.Window', {
            title: 'Select a FF File',
            modal: true,
            height:300,
            width:700,
            closable: true,
            scrollable: true,
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            scope: me,
            itemId:'winVerifyAttachment',
            items: [
                {
                            xtype: 'merlin.fileuploader',
                            keyType: 'imagePBMUpload',
                            height:'100%',
                            itemId: 'FileUploadField1',
                            origin: me.getView().id,
                            fileType: 'csv',
                            endpoint: 'shared/rx/document/update'
                        }
                        //{
                        //    xtype: 'textfield',
                        //    fieldLabel: 'Description',
                        //    itemId: 'txtDescriptionRxCUI',
                        //    allowBlank: false
                        //},
                        //{
                        //    xtype: 'filefield',
                        //    name: 'file',
                        //    fieldLabel: 'File',
                        //    msgTarget: 'side',
                        //    allowBlank: false,
                        //    anchor: '100%',
                        //    buttonText: '',
                        //    buttonConfig: {
                        //        iconCls: 'upload-icon'
                        //    },
                        //    emptyText: 'Select a file',
                        //    itemId: 'uploadRxCUI'
                        //}


            ]
            //dockedItems: [
            //    {
            //        xtype: 'toolbar',
            //        dock: 'bottom',
            //        style: {borderColor: 'black', borderStyle: 'solid'},
            //        items: [
            //            '->'
            //            , {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler:'VerifyAttachmentSave_Click'}
            //            , {xtype: 'button', text: 'Reset', iconCls: 'fa fa-remove',handler:'VerifyAttachmentReset_click'}
            //        ]
            //
            //
            //    }
            //]

        });
        var view = this.getView();
        var winLoad = false;
        if (view.down('#hdnFFDocID').getValue() == '') {
            winLoad = true;
        }
        else {
            Ext.Msg.confirm('Confirm', 'Do you wish to use last uploaded FF file for RxCUI validation?', function (btn) {
                if (btn == 'yes') {
                    this.LoadValidateRxCUI();
                }
                else {
                    winLoad = true;
                }
            },this);
        }
        if (winLoad) {
            this.getView().add(win);
            win.show();
        }
    },
    onEtcExpand:function(node, index) {
        var view=this.getView();
        var fdbTreePanel=view.down('#fdbTreePanel');
        var store=fdbTreePanel.getViewModel().getStore('formularydrugsappend');
        if(node.data.CallFunction &&!node.data.leaf) {
            if(node.childNodes.length==0) {
                store.getProxy().setExtraParam('pFormularyId', parseInt(view.down('#hdnFormularyId').getValue()));
                store.getProxy().setExtraParam('pFormVersion', parseInt(view.down('#hdnFormularyVersion').getValue()));
                store.getProxy().setExtraParam('pETCId', node.data.RuleLevelId);
                store.getProxy().setExtraParam('pNDC', "");
                store.getProxy().setExtraParam('pParentNodeId', node.data.ParentNodeId);
                store.getProxy().setExtraParam('pLastNodeIdUsed', 0);
                store.load({
                    addRecords: true,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        node.removeAll();
                        node.appendChild(record);

                    }

                })
            }
        }
    },
    VerifyAttachmentReset_click:function(sender,e) {
        var view=this.getView();
        var winVerifyAttachment =view.down('#winVerifyAttachment');
        winVerifyAttachment.down('#VerifyAttachmentBasicForm').reset();
    },
    VerifyAttachmentSave_Click:function(sender,e) {
        var view=this.getView();
        var winVerifyAttachment =view.down('#winVerifyAttachment');
        if(!winVerifyAttachment.down('#VerifyAttachmentBasicForm').isValid())
        {
            return false;
        }
        else {
            this.LoadValidateRxCUI();
        }

    },
    btnLoadCMSFile_Click: function () {
        var me = this,
            win;
        win = Ext.create('Ext.window.Window', {
            title: 'Import Rules',
            modal: true,
            closable: true,
            scrollable: true,
            height: 350,
            width: 700,
            itemId: 'winAttachment',
            scope: me,
            items: [
                {
                    xtype: 'form', itemId: 'AttachmentForm',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'radio',
                            fieldLabel: 'FF File',
                            name: 'FileType',
                            itemId: 'rdoFF',
                            handler: 'rdoFF_checked',
                            checked: true
                        },
                        {
                            xtype: 'form', layout: 'hbox',
                            itemId: 'CompositeFieldFF',
                            items: [
                                {
                                    xtype: 'combobox', fieldLabel: 'Month', itemId: 'cbxMonth',
                                    displayField: 'name',
                                    valueField: 'value',
                                    store: {
                                        data: [{"name": 'January', "value": '1'},
                                            {"name": 'February', "value": '2'},
                                            {"name": 'March', "value": '3'},
                                            {"text": 'April', "value": '4'},
                                            {"name": 'May', "value": '5'},
                                            {"name": 'June', "value": '6'},
                                            {"name": 'July', "value": '7'},
                                            {"name": 'August', "value": '8'},
                                            {"name": 'September', "value": '9'},
                                            {"name": 'October', "value": '10'},
                                            {"name": 'November', "value": '11'},
                                            {"name": 'December', "value": '12'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'combobox', fieldLabel: 'Year', itemId: 'cbxYear',
                                    displayField: 'name',
                                    valueField: 'value',
                                    bind: {
                                        store: '{storeYear}'
                                    }
                                }


                            ]

                        },
                        {xtype: 'radio', fieldLabel: 'ADD File', name: 'FileType', itemId: 'rdoAdd'},


                                //{xtype: 'textfield', fieldLabel: 'Description', itemId: 'txtDescription', allowBlank: false},
                                {
                                    xtype: 'merlin.fileuploader',
                                    keyType: 'imagePBMUpload',
                                    itemId: 'FileUploadField1',
                                    height:200,
                                    layout: {
                                        type: 'fit',
                                        align: 'stretch'
                                    },
                                    fileType: 'csv',
                                    origin: me.getView().id,
                                    endpoint: 'shared/rx/document/update'

                        }]
                }
                //{
                //    xtype: 'filefield',
                //    name: 'file',
                //    fieldLabel: 'File',
                //    msgTarget: 'side',
                //    allowBlank: false,
                //    anchor: '100%',
                //    buttonText: '',
                //    buttonConfig: {
                //        iconCls: 'upload-icon'
                //    },
                //    emptyText: 'Select a file',
                //    itemId: 'FileUploadField1'
                //}

            ]
            //dockedItems: [
            //    {
            //        xtype: 'toolbar',
            //        dock: 'bottom',
            //        style: {borderColor: 'black', borderStyle: 'solid'},
            //        items: [
            //            '->'
            //            , {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler:'LoadCMSRule'}
            //            , {
            //                xtype: 'button', text: 'Reset', iconCls: 'fa fa-remove', handler:'ClearControls'
            //            }
            //        ]
            //    }
            //]

        });
        this.getView().add(win);
        win.show();
    },
    btnExportRule_Click: function () {
        var me = this,
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Export Formulary Rules',
            modal: true,
            closable: true,
            itemId:'winExportRule',
            scope: me,
            scrollable: true,
            layout: 'vbox',
            items: [
                {xtype: 'displayfield', fieldLabel: 'Formulary Name',itemId:'lblFormularyName'},
                {xtype: 'displayfield', fieldLabel: 'Formulary Version',itemId:'lblFormularyVersion'},
                {
                    xtype: 'radiogroup', fieldLabel: 'Output Format', items: [
                    {boxLabel: 'Excel',itemId:'rdExcel'},
                    {boxLabel: 'CSV',itemId:'rdCSV'}
                ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {xtype: 'button', text: 'Submit', iconCls: 'fa fa-save', handler: 'ExportFormularyRule'}
                        , {
                            xtype: 'button', text: 'Cancel', handler: 'Cancel_winExportRule'
                        }
                    ]
                }
            ]

        });
        this.getView().add(win);
        var view=this.getView();
        win.down('#rdExcel').setValue(true);
        win.down('#lblFormularyName').setValue(view.down('#hdnFormularyName').getValue());
        win.down('#lblFormularyVersion').setValue(view.down('#hdnFormularyVersion').getValue());
        win.show();
    },
    Cancel_winExportRule:function(sender,e) {
        this.getView().down('#winExportRule').close();
    },
    onEtcSelected: function (etcTree, record) {
        var view=this.getView();
        if(record.data.NodeId!=null&& record.data.NodeName!="All Drugs") {
            this.ResetCtrlValues(false);
            view.down('#hdnActiveTab').setValue('pnlTree');
            view.down('#pnlRules').setDisabled(false);
            view.down('#hdnNodeId').setValue(record.data.NodeId);
            view.down('#hdnNodeText').setValue(record.data.NodeName);
            view.down('#hdnLevelType').setValue(record.data.LevelType);
            view.down('#hdnRuleLevelId').setValue(record.data.RuleLevelId);
            view.down('#hdnRuleAllowed').setValue(record.data.RuleAllowed);
            view.down('#hdnOtcOrOpd').setValue(record.data.OTCInd);
            this.GetSelectedNodeDetails(record.data.NodeId, record.data.NodeName,record.data.LevelType,record.data.RuleLevelId,record.data.RuleAllowed,record.data.OTCInd);
        }
        else {
            view.down('#pnlRules').setDisabled(true);
            view.down('#hdnNodeId').setValue('');
            view.down('#hdnNodeText').setValue('');
            view.down('#hdnLevelType').setValue('');
            view.down('#hdnRuleLevelId').setValue('');
            view.down('#hdnRuleAllowed').setValue('');
            this.ResetCtrlValues(true);
        }
    },
    ResetCtrlValues: function (isResetNode) {
        var view=this.getView();
        if (isResetNode) {
            var record1 =view.down('#fdbTreePanel').getStore().getNodeById('1');
            view.down('#fdbTreePanel').getSelectionModel().select(record1);
            var record2 =view.down('#formularyTreePanel').getStore().getNodeById('1');
            view.down('#formularyTreePanel').getSelectionModel().select(record2);
        }
        view.down('#chkCovered').setValue(false);
        view.down('#chkTransFillExclude').setValue(false);
        view.down('#cbxMedicarePATypes').clearValue();
        view.down('#cbxMedicareSTGrpCount').clearValue();
        view.down('#cbxMedicareSt1Desc').clearValue();
        view.down('#cbxMedicareSt1Val').clearValue();
        view.down('#cbxMedicareSt2Desc').clearValue();
        view.down('#cbxMedicareSt2Val').clearValue();
        view.down('#cbxMedicareSt3Desc').clearValue();
        view.down('#cbxMedicareSt3Val').clearValue();
        view.down('#chkSpecialty').setValue(false);
        view.down('#chkPreferred').setValue(false);
        view.down('#cbxPA').clearValue();
        view.down('#PAMinAge').setValue('');
        view.down('#PAMaxAge').setValue('');
        view.down('#cbxPaGender').clearValue();
        view.down('#cbxStepTherapy').clearValue();
        view.down('#AgeLimitMin').setValue('');
        view.down('#AgeLimitMax').setValue('');
        view.down('#cbxAgeLimitType').clearValue();
        view.down('#cbxGender').clearValue();
        view.down('#cbxCopayType').clearValue();
        view.down('#CopayAmt').setValue('');
        view.down('#txtAreaTxtMsg').setValue("");
        view.down('#txtAreaNotes').setValue("");
        view.down('#txtResLink').setValue("");
        view.down('#DaysSupply').setValue("");
        view.down('#cbxQLDaysSupply').clearValue();
        view.down('#txtExtendDaysSupply').setValue("");
        view.down('#FillsMax').setValue("");
        view.down('#cbxQLFills').clearValue();
        view.down('#QLMax').setValue("");
        view.down('#cbxQL').clearValue();
        view.down('#cbxTier').clearValue();
        view.down('#cbxPdlStatus').clearValue();

        if (view.down('#hdnFormularyId').getValue() != null && view.down('#hdnFormularyId').getValue() != "") {
            //formuBean = FormularyManagementBll.getFormularyTiersBll(PBMUser.SessionID, Convert.ToInt32(hdnFormularyId.Value));

            //  StoreTierList.DataSource = formuBean.dtFormularyTiers;
            // StoreTierList.DataBind();
        }

    },
    cbxFormularyList_SelectHandler: function (selectedFormuRec) {
        try {
            var view = this.getView();
            var selectedFormuID = selectedFormuRec.FormularyID;
            var selectedFormuVer = selectedFormuRec.FormularyVersion;
           var  selectedFormuStat = selectedFormuRec.Stat;
           var  selectedFormuName = selectedFormuRec.FormularyName;
            var selectedFormuType = selectedFormuRec.formularyType;
            var selectedFormuDataSource = selectedFormuRec.dataSource;
            view.down('#hdnFormularyId').setValue(selectedFormuID);
            view.down('#hdnFormularyVersion').setValue(selectedFormuVer);
            view.down('#hdnFormularyStatus').setValue(selectedFormuStat);
            view.down('#hdnFormularyName').setValue(selectedFormuName);
            view.down('#hidFormuType').setValue(selectedFormuType);
            view.down('#hidFormuDataSource').setValue(selectedFormuDataSource);
            view.down('#pnlTree').setDisabled(false);
            view.down('#PanelTreeSearch').setDisabled(false);
            if (selectedFormuType == "Medicare") {
                view.down('#fldSetMedicare').show();
                view.down('#cmpFldMedicare1').show();
                view.down('#cmpMedicareSTCount').show();
                view.down('#CompositeField1').show();
                view.down('#CompositeField2').show();
                view.down('#CompositeField3').show();

                view.down('#fldSetMedicaid').hide();
                view.down('#cmpFldExclusions').hide();
            }
            else {
                view.down('#fldSetMedicare').hide();
                view.down('#cmpMedicareSTCount').hide();
                view.down('#CompositeField1').hide();
                view.down('#CompositeField2').hide();
                view.down('#CompositeField3').hide();

                view.down('#fldSetMedicaid').show();
                view.down('#cmpFldExclusions').show();
                var viewmodel = this.getViewModel();
                var store = viewmodel.getStore('StoreMedicarePANames');
                store.getProxy().setExtraParam('pListName', 'PANames');
                store.load();
            }
            if (selectedFormuID != undefined && selectedFormuID != '') {
                view.down('#btnLoadCMS').setDisabled(false);
                view.down('#btnValidateRxCUI').setDisabled(false);
            }
            var store=view.down('#fdbTreePanel').getViewModel().getStore('formularydrugs');
            store.getProxy().setExtraParam('pFormularyId', parseInt(view.down('#hdnFormularyId').getValue()));
            store.getProxy().setExtraParam('pFormVersion', parseInt(view.down('#hdnFormularyVersion').getValue()));
            store.getProxy().setExtraParam('pETCId',0);
            store.getProxy().setExtraParam('pNDC', "");
            store.getProxy().setExtraParam('pParentNodeId',  0);
            store.getProxy().setExtraParam('pLastNodeIdUsed', 0);
            view.down('#fdbTreePanel').getStore().load(
                {
                    callback: function (record, operation, success) {
                        if (view.down('#hdnActiveTab').getValue() != '') {
                            var record1 =view.down('#fdbTreePanel').getStore().getNodeById('1');
                            view.down('#fdbTreePanel').getSelectionModel().select(record1);
                        }
                    }

                }
            );
            view.down('#pnlRules').setDisabled(true);
            view.down('#hdnNodeId').setValue('');
            view.down('#hdnNodeText').setValue('');
            view.down('#hdnLevelType').setValue('');
            view.down('#hdnRuleLevelId').setValue('');
            view.down('#hdnRuleAllowed').setValue('');
            view.down('#hdnNodeIdSearch').setValue('');
            view.down('#hdnNodeTextSearch').setValue('');
            view.down('#hdnLevelTypeSearch').setValue('');
            view.down('#hdnRuleLevelIdSearch').setValue('');
            view.down('#hdnRuleAllowedSearch').setValue('');
            var _iFormuStatus = parseInt(view.down('#hdnFormularyStatus').getValue());
            if (view.down('#hdnFormularyId').getValue() != "") {
                view.down('#btnExportRule').setDisabled(false);
            }
            else {
                view.down('#btnExportRule').setDisabled(true);
            }

            if (_iFormuStatus == 2 || _iFormuStatus == 3 || _iFormuStatus == 4) //Approved
            {
                view.down('#btnSave').setDisabled(true);
                //btnCreateFormulary.Disabled = true;
            }
            else {
                view.down('#btnSave').setDisabled(false);
            }

            if (_iFormuStatus == 2) {
                view.down('#btnImportRule').setDisabled(true);
            }
            else {
                view.down('#btnImportRule').setDisabled(false);
            }

            if (_iFormuStatus == 1 && selectedFormuType == "Medicare") {
                view.down('#btnRelink').setDisabled(false);
            }
            else {
                view.down('#btnRelink').setDisabled(true);
            }
            this.SetHiddenVariables(selectedFormuID, selectedFormuVer, selectedFormuStat, selectedFormuName, selectedFormuType, selectedFormuDataSource, { eventMask: { showMask: true } });
            this.btnResetClick();
            if(this.getViewModel().get('isAtlasFormulary'))
            {
                view.down('#btnSave').setDisabled(true);
                view.down('#btnImportRule').setDisabled(true);
                view.down('#btnRelink').setDisabled(true);
                view.down('#btnValidateRxCUI').setDisabled(true);
                view.down('#btnLoadCMS').setDisabled(true);
            }
        }
        catch (e) {
            Ext.Msg.alert('Failure', ' error, Please contact admin.');
        }
    },
    CoveredChecked:function(sender, e) {
        var view=this.getView();
        if (view.down('#chkCovered').checked) {
            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#cmpFldExclusions').setDisabled(false);
            view.down('#chkMedCarveOut').setDisabled(true);
            view.down('#chkMedicaidFeeScreen').setDisabled(false);
            view.down('#cmpFldCovered').setDisabled(false);
        }
        else if (view.down('#chkSpecialty').checked) {
            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#cmpFldExclusions').setDisabled(false);
            view.down('#chkMedCarveOut').setDisabled(true);
            view.down('#chkCovered').setDisabled(false);
            view.down('#chkSpecialty').setDisabled(false);
            view.down('#chkPreferred').setDisabled(false);
            view.down('#chkMedicaidFeeScreen').setValue(false);
        }
        else if (view.down('#chkMedCarveOut').checked) {
            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkPartDExcDrug').setDisabled(true);
            view.down('#chkMedicaidFeeScreen').setValue(false);
            view.down('#chkMedicaidFeeScreen').setDisabled(true);
            view.down('#chkCovered').setValue(false);
            view.down('#chkCovered').setDisabled(true);
            view.down('#chkPreferred').setValue(false);
            view.down('#chkPreferred').setDisabled(true);
            view.down('#chkSpecialty').setValue(false);
            view.down('#chkSpecialty').setDisabled(true);
        }
        else if (view.down('#chkPartDExcDrug').checked) {
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#chkMedCarveOut').setDisabled(true);
            view.down('#chkMedicaidFeeScreen').setValue(false);
            view.down('#chkMedicaidFeeScreen').setDisabled(true);
            view.down('#chkCovered').setValue(false);
            view.down('#chkCovered').setDisabled(true);
            view.down('#chkPreferred').setValue(false);
            view.down('#chkPreferred').setDisabled(true);
            view.down('#chkSpecialty').setValue(false);
            view.down('#chkSpecialty').setDisabled(true);
        }
        else if (view.down('#chkMedicaidFeeScreen').checked) {
            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkPartDExcDrug').setDisabled(true);
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#chkMedCarveOut').setDisabled(true);
            view.down('#chkPreferred').setValue(false);
            view.down('#chkPreferred').setDisabled(true);
            view.down('#chkSpecialty').setDisabled(false);
        }
        else {
            if (!view.down('#chkCovered').checked && view.down('#chkPartDDrug').checked) {
                view.down('#chkPartDDrug').setValue(false);
            }

            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#chkMedicaidFeeScreen').setValue(false);
            view.down('#chkSpecialty').setValue(false);
            view.down('#cmpFldExclusions').setDisabled(false);
            view.down('#chkMedCarveOut').setDisabled(false);
            view.down('#chkPreferred').setValue(false);
            view.down('#chkPreferred').setDisabled(true);
        }

        if (view.down('#chkCovered').checked || view.down('#chkSpecialty').checked) {
            view.down('#cmpPa').setDisabled(false);
            view.down('#cbxStepTherapy').setDisabled(false);
            view.down('#compFldAgeLmt').setDisabled(false);
            view.down('#cbxGender').setDisabled(false);
            view.down('#cbxTier').setDisabled(false);
            view.down('#cmpCopay').setDisabled(false);
            view.down('#txtAreaTxtMsg').setDisabled(false);
            view.down('#txtAreaNotes').setDisabled(false);
            view.down('#txtResLink').setDisabled(false);
            view.down('#qtyLimitCompositeField').setDisabled(false);
        }
        if (view.down('#chkCovered').checked) {
            view.down('#chkRestrictToPkgSize').setDisabled(false);
            view.down('#chkOverrideGenericCheck').setDisabled(false);
            view.down('#chkTransFillExclude').setDisabled(false);
        }
        else {
            view.down('#chkRestrictToPkgSize').setDisabled(true);
            view.down('#chkOverrideGenericCheck').setDisabled(true);
            view.down('#chkTransFillExclude').setDisabled(true);
            if(!view.down('#chkSpecialty').checked) {
                view.down('#cmpFldExclusions').setDisabled(false);
                view.down('#chkMedCarveOut').setDisabled(false);
            }
        }

    },
    ExclusionChecked:function(sender,e) {
        var view=this.getView();
        if (view.down('#chkMedCarveOut').checked) {

            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkPartDExcDrug').setDisabled(true);
            view.down('#chkMedicaidFeeScreen').setValue(false);
            view.down('#chkMedicaidFeeScreen').setDisabled(true);
            view.down('#chkCovered').setValue(false);
            view.down('#chkCovered').setDisabled(true);
            view.down('#chkSpecialty').setValue(false);
            view.down('#chkSpecialty').setDisabled(true);
        }
        else if (view.down('#chkPartDExcDrug').checked) {
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#chkMedCarveOut').setDisabled(true);
            view.down('#chkMedicaidFeeScreen').setValue(false);
            view.down('#chkMedicaidFeeScreen').setDisabled(true);
            view.down('#chkCovered').setValue(false);
            view.down('#chkCovered').setDisabled(true);
            view.down('#chkSpecialty').setValue(false);
            view.down('#chkSpecialty').setDisabled(true);
        }
        else if (view.down('#chkMedicaidFeeScreen').checked) {
            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkPartDExcDrug').setDisabled(true);
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#chkMedCarveOut').setDisabled(true);
            view.down('#chkCovered').setDisabled(false);
            view.down('#chkSpecialty').setDisabled(false);
        }
        else if (view.down('#chkCovered').checked) {
            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#cmpFldExclusions').setDisabled(false);
            view.down('#chkMedCarveOut').setDisabled(true);
            view.down('#chkMedicaidFeeScreen').setDisabled(false);
            view.down('#chkSpecialty').setDisabled(false);
        }
        else if (view.down('#chkSpecialty').checked) {
            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#cmpFldExclusions').setDisabled(false);
            view.down('#chkMedCarveOut').setDisabled(true);
            view.down('#chkMedicaidFeeScreen').setDisabled(false);
        }
        else {
            if (view.down('#chkPartDDrug').checked) {
                view.down('#chkCovered').setValue(true);
            }
            else {
                view.down('#chkCovered').setValue(false);
            }
            view.down('#chkPartDExcDrug').setValue(false);
            view.down('#chkMedCarveOut').setValue(false);
            view.down('#chkMedicaidFeeScreen').setValue(false);
            view.down('#cmpFldExclusions').setDisabled(false);
            view.down('#chkMedCarveOut').setDisabled(false);
            view.down('#chkCovered').setDisabled(false);
            view.down('#chkSpecialty').setValue(false);
            view.down('#chkSpecialty').setDisabled(false);
            view.down('#chkMedicaidFeeScreen').setDisabled(false);
            view.down('#chkMedCarveOut').setDisabled(false);

        }
    },
    PartDChecked:function(sender, e) {
        var view=this.getView();
        if (view.down('#chkPartDDrug').checked) {
            view.down('#chkCovered').setValue(true);
            view.down('#chkCovered').setDisabled(false);
        }
    },
    btnGenerateVerDiff_Click:function(sender,e) {
        try {
            var view=this.getView();
            if (view.down('#hdnFormularyId').getValue()!="") {
                var sParam = view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue();

                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var extraParameters = {
                    'pDescription': 'Formulary Rules Delta Report',
                    'pProgramName': 'getFormRuleDelta.p',
                    'pParameters': sParam,
                    'pRunMode': 2,
                    'pProgramType': "Report",
                    'pSaveDocument': false,
                    'pFaxNumber': ''
                };
                var returnField = ['pJobNumber'];
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                    saveAction, returnField);
                if (returnField.pJobNumber != "") {
                    Ext.Msg.alert("PBM", "Formulary Rules Delta Report Job # " + returnField.pJobNumber + " has been successfully queued. Please review the Job in the Job Queue.");
                }
            }
        }
        catch (ex) {

        }
    },
    btnSaveRule_Click:function(sender,e) {
        try {
            var view = this.getView();
            if (this.validateSave()) {
                if (view.down('#chkCovered').checked == false) {
                    Ext.Msg.confirm('Confirm', 'Are you sure you want to save a \'Not Covered\' Rule', function (btn) {
                        if (btn == 'yes') {
                            if (view.down('#hdnLevelId').getValue()!="") {
                                {
                                    this._LevelId = view.down('#hdnLevelId').getValue();
                                    this._LevelType = view.down('#hdnLevelType').getValue();
                                    this._OtcOrOpd = view.down('#hdnOtcOrOpd').getValue();
                                    var fields = this.generateFldListAndValues();
                                    this._fldList = fields.split('#')[0];
                                    this._fldVals = fields.split('#')[1];
                                    var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                                    var extraParameters = {
                                        'pFormularyID': view.down('#hdnFormularyId').getValue(),
                                        'pFormularyVersion': view.down('#hdnFormularyVersion').getValue(),
                                        'pRuleLevelID': this._LevelId,
                                        'pLevelType': this._LevelType,
                                        'pOTCOPD': this._OtcOrOpd,
                                        'pFieldList': this._fldList,
                                        'pFieldValues': this._fldVals
                                    };
                                    var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/formularyrules/update', null, [true], extraParameters,
                                        saveAction, null);
                                    var _iRetCode = parseInt(testReturn.code);
                                    var _sRetMsg = testReturn.message;
                                    view.down('#chkMedCarveOut').setValue(false);
                                    view.down('#chkPartDExcDrug').setValue(false);
                                    view.down('#chkPartDDrug').setValue(false);
                                    view.down('#chkMedicaidFeeScreen').setValue(false);
                                    view.down('#cmpFldExclusions').setDisabled(true);
                                    if (_iRetCode == 0) {
                                        Ext.Msg.alert("Success", "Rule saved successfully");
                                    }
                                    this.ResetCtrlValues(false);
                                    if (view.down('#hdnActiveTab').getValue() == 'pnlTree') {
                                        this.GetSelectedNodeDetails(view.down('#hdnNodeId').getValue(), view.down('#hdnNodeText').getValue(),view.down('#hdnLevelType').getValue(),view.down('#hdnRuleLevelId').getValue(),view.down('#hdnRuleAllowed').getValue()=="true"?true:false,view.down('#hdnOtcOrOpd').getValue());
                                    }
                                    else {
                                        this.GetSelectedNodeDetailsBySearch(view.down('#hdnNodeIdSearch').getValue(), view.down('#hdnNodeTextSearch').getValue(),view.down('#hdnLevelTypeSearch').getValue(),view.down('#hdnRuleLevelIdSearch').getValue(),view.down('#hdnRuleAllowedSearch').getValue()=="true"?true:false,view.down('#hdnOtcOrOpd').getValue());

                                    }
                                }
                            }
                        }
                        else {
                            return false;
                        }
                    },this)
                }
                else {
                    if (view.down('#hdnLevelId').getValue()!="") {
                        {
                            this._LevelId = view.down('#hdnLevelId').getValue();
                            this._LevelType = view.down('#hdnLevelType').getValue();
                            this._OtcOrOpd = view.down('#hdnOtcOrOpd').getValue();
                            var fields = this.generateFldListAndValues();
                            this._fldList = fields.split('#')[0];
                            this._fldVals = fields.split('#')[1];
                            var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                            var extraParameters = {
                                'pFormularyID': view.down('#hdnFormularyId').getValue(),
                                'pFormularyVersion': view.down('#hdnFormularyVersion').getValue(),
                                'pRuleLevelID': this._LevelId,
                                'pLevelType': this._LevelType,
                                'pOTCOPD': this._OtcOrOpd,
                                'pFieldList': this._fldList,
                                'pFieldValues': this._fldVals
                            };
                            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/formularyrules/update', null, [true], extraParameters,
                                saveAction, null);
                            var _iRetCode = parseInt(testReturn.code);
                            var _sRetMsg = testReturn.message;
                            view.down('#chkMedCarveOut').setValue(false);
                            view.down('#chkPartDExcDrug').setValue(false);
                            view.down('#chkPartDDrug').setValue(false);
                            view.down('#chkMedicaidFeeScreen').setValue(false);
                            view.down('#cmpFldExclusions').setDisabled(true);
                            if (_iRetCode == 0) {
                                Ext.Msg.alert("Success", "Rule saved successfully");
                            }
                            this.ResetCtrlValues(false);
                            if (view.down('#hdnActiveTab').getValue() == 'pnlTree') {
                                this.GetSelectedNodeDetails(view.down('#hdnNodeId').getValue(), view.down('#hdnNodeText').getValue(),view.down('#hdnLevelType').getValue(),view.down('#hdnRuleLevelId').getValue(),view.down('#hdnRuleAllowed').getValue()=="true"?true:false,view.down('#hdnOtcOrOpd').getValue());
                            }
                            else {
                                this.GetSelectedNodeDetailsBySearch(view.down('#hdnNodeIdSearch').getValue(), view.down('#hdnNodeTextSearch').getValue(),view.down('#hdnLevelTypeSearch').getValue(),view.down('#hdnRuleLevelIdSearch').getValue(),view.down('#hdnRuleAllowedSearch').getValue()=="true"?true:false,view.down('#hdnOtcOrOpd').getValue());

                            }
                        }
                    }
                }
            }
        }
        catch (ex)
        {

        }
    },
    generateFldListAndValues:function() {
        try {
            var view=this.getView();
            var sFldList = '';
            var sFldVals = '';
            sFldList = 'Covered,spareField01,PartDExcludedDrug,PartDDrug,MedicaidCarveOutDrug,MedicaidFeeScreen,SpecialtyDrugInd,restrictToPkgSize,ovrGenericCheck,PAName';
            sFldVals = view.down('#chkCovered').checked;
            if(view.down('#chkPreferred').checked)
            {
                sFldVals=sFldVals+ '|'+'1';
            }
            else {
                sFldVals=sFldVals+ '|'+'0';
            }
            sFldVals=sFldVals + '|' + view.down('#chkPartDExcDrug').checked + '|' + view.down('#chkPartDDrug').checked + '|' + view.down('#chkMedCarveOut').checked;
            sFldVals = sFldVals + '|' + view.down('#chkMedicaidFeeScreen').checked + '|' + view.down('#chkSpecialty').checked + '|' + view.down('#chkRestrictToPkgSize').checked + '|' + view.down('#chkOverrideGenericCheck').checked ;
            if(view.down('#cbxPA').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxPA').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if (view.down('#cbxPA').text!="") {
                sFldList = sFldList + ',' + 'PAInd';
                sFldVals = sFldVals + '|' + '1';
            }
            else {
                sFldList = sFldList + ',' + 'PAInd';
                sFldVals = sFldVals + '|' + '0';
            }
            sFldList = sFldList + ',' + 'PAMinAge,PAMaxAge,PAGenderCode,MedicarePAType,MedicareSTGrpCount,MedicareSTGrpDesc1,MedicareSTStepValue1,MedicareSTGrpDesc2,MedicareSTStepValue2,MedicareSTGrpDesc3,MedicareSTStepValue3';
            sFldList = sFldList + ',TransFillExcluded,DollarAmount,DollarAmtTimePeriod,DaysSupply,DaysSupplyTimePeriod,PDLFlag,Fills,FillsTimePeriod,QtyLimit,QtyLmtTimePeriod,StepTherapyName,StepTherapyInd,MinAge,MaxAge,AgeType';
            sFldList = sFldList + ',GenderRestriction,TierCode,CopayType,CopayAmt,TextMessage,Notes,ResourceLink,extendedDaysSupply,CMS_RxCUI';
            if(view.down('#PAMinAge').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#PAMinAge').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#PAMaxAge').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#PAMaxAge').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxPaGender').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxPaGender').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxMedicarePATypes').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxMedicarePATypes').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxMedicareSTGrpCount').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxMedicareSTGrpCount').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxMedicareSt1Desc').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxMedicareSt1Desc').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxMedicareSt1Val').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxMedicareSt1Val').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxMedicareSt2Desc').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxMedicareSt2Desc').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxMedicareSt2Val').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxMedicareSt2Val').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxMedicareSt3Desc').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxMedicareSt3Desc').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxMedicareSt3Val').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxMedicareSt3Val').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            sFldVals =sFldVals+'|' + view.down('#chkTransFillExclude').checked;
            this._bStepTherapyInd=view.down('#cbxStepTherapy').getRawValue()!=null ? 'true' : 'false';

            //sFldList = sFldList + ',DollarAmount,DollarAmtTimePeriod,DaysSupply,DaysSupplyTimePeriod,PDLFlag,Fills,FillsTimePeriod,QtyLimit,QtyLmtTimePeriod,StepTherapyName,StepTherapyInd,MinAge,MaxAge,AgeType';
            //sFldList = sFldList + ',GenderRestriction,TierCode,CopayType,CopayAmt,TextMessage,Notes,ResourceLink,extendedDaysSupply,CMS_RxCUI';
            if(view.down('#DollarMax').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#DollarMax').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxQLDollarAmt').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxQLDollarAmt').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#DaysSupply').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#DaysSupply').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxQLDaysSupply').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxQLDaysSupply').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxPdlStatus').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxPdlStatus').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#FillsMax').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#FillsMax').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxQLFills').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxQLFills').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#QLMax').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#QLMax').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxQL').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxQL').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxStepTherapy').getRawValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxStepTherapy').getRawValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            sFldVals=sFldVals+'|'+this._bStepTherapyInd.toString();
            if(view.down('#AgeLimitMin').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#AgeLimitMin').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#AgeLimitMax').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#AgeLimitMax').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxAgeLimitType').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxAgeLimitType').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxGender').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxGender').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxTier').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxTier').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#cbxCopayType').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#cbxCopayType').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#CopayAmt').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#CopayAmt').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#txtAreaTxtMsg').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#txtAreaTxtMsg').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#txtAreaNotes').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#txtAreaNotes').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#txtResLink').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#txtResLink').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#txtExtendDaysSupply').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#txtExtendDaysSupply').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            if(view.down('#txtRXCUIvalue').getValue()!=null)
            {
                sFldVals=sFldVals+'|'+view.down('#txtRXCUIvalue').getValue();
            }
            else {
                sFldVals=sFldVals+'|'+'';
            }
            return sFldList+'#'+sFldVals;
        }
        catch (ex) {
            throw ex;
        }
    },
    GetSelectedNodeDetails:function(selNodeId,selNodeText,LevelType,RuleLevelId,RuleAllowed,OTCInd) {
        var me=this;
        var view = this.getView();
        var _selNodeId = selNodeId;
        if(selNodeText!= "All Drugs")
        {view.down('#pnlRules').setDisabled(false);
            var _selNodeText = selNodeText;
            //pnlRules.Disabled = false;
            var _selNodeId = _selNodeId;// e.ExtraParams["selNodeId"];
            var _selNodeText = _selNodeText;// e.ExtraParams["selNodeText"];
            var _sLevel = LevelType;
            var _sOtcOrOpd = OTCInd;
            var _sLevelId = RuleLevelId;
            var _sFields = "formularyId,formularyVersion,levelType,ruleLevelId,Covered,specialtyDrugInd,PAInd,PANAME,PAGENDERCODE,stepTherapyInd,stepTherapyName,MinAge,MaxAge,AgeType,GenderRestriction,TierCode,CopayAmt,CopayType,TextMessage,NOTES,dollarAmount,dollarAmtTimePeriod,daysSupply,daysSupplyTimePeriod,fills,fillsTimePeriod,qtyLimit,qtyLmtTimePeriod,lastUpdateDateTime,lastUpdateBy,OTCind,PartDDrug,PartDExcludedDrug,MedicaidCarveOutDrug,MedicaidFeeScreen,ResourceLink,onPrefListFlag,PAMinAge,PAMaxAge,MedicarePAType,MedicareSTGrpCount,MedicareSTGrpDesc1,MedicareSTStepValue1,MedicareSTGrpDesc2,MedicareSTStepValue2,MedicareSTGrpDesc3,MedicareSTStepValue3,TransFillExcluded,restrictToPkgSize,ovrGenericCheck,CMS_RxCUI,AHFSClass,AHFSCategory,PDLFlag,extendedDaysSupply";

            view.down('#hdnLevelId').setValue(_sLevelId);
            view.down('#hdnLevelType').setValue(_sLevel);
            view.down('#hdnOtcOrOpd').setValue(_sOtcOrOpd);

            //Enable the Quantity Limit rule at anything below GCN level
            if (_sLevel == "GCN" || _sLevel == "NDC" || _sLevel == "GEN" || _sLevel == "SSB" || _sLevel == "MSB") {
                view.down('#qtyLimitCompositeField').setDisabled(false);
            }
            else {
                view.down('#qtyLimitCompositeField').setDisabled(true);
            }
            var reset=false;
            //var searchParams = this.getViewModel().data.searchParams;
            var model = Ext.create('Atlas.formulary.model.FormularyRulesModel');
            var saveProxy = model.getProxy();
            saveProxy.setExtraParam('pcFields', _sFields);
            saveProxy.setExtraParam('piFormulary', view.down('#hdnFormularyId').getValue());
            saveProxy.setExtraParam('piVersion', view.down('#hdnFormularyVersion').getValue());
            saveProxy.setExtraParam('pcLevelType', _sLevel);
            saveProxy.setExtraParam('pcLevelID', _sLevelId);
            saveProxy.setExtraParam('pcOTCInd',  view.down('#hdnOtcOrOpd').getValue());
            model.phantom = false;
            model.load({
                failure: function (record, operation) {
                },
                success: function (recorddata, operation) {
                    var record = recorddata.data;
                    me.CoveredChecked();
                    view.down('#chkCovered').setValue(record.Covered=='yes'?true:false);
                    view.down('#chkSpecialty').setValue(record.specialtyDrugInd=='yes'?true:false);
                    view.down('#chkPartDExcDrug').setValue(record.PartDExcludedDrug=='yes'?true:false);
                    view.down('#chkPartDDrug').setValue(record.PartDDrug=='yes'?true:false);
                    view.down('#chkMedCarveOut').setValue(record.MedicaidCarveOutDrug=='yes'?true:false);
                    view.down('#chkMedicaidFeeScreen').setValue(record.MedicaidFeeScreen=='yes'?true:false);
                    view.down('#chkRestrictToPkgSize').setValue(record.restrictToPkgSize=='yes'?true:false);
                    view.down('#chkOverrideGenericCheck').setValue(record.ovrGenericCheck=='yes'?true:false);
                    view.down('#txtExtendDaysSupply').setValue(record.extendedDaysSupply.trim() == "0" ? "" : record.extendedDaysSupply.trim());
                    if (view.down('#hidFormuType').getValue() == "Medicare") {
                        view.down('#lblAHFSClassValue').setText(record.AHFSClass);
                        view.down('#lblAHFSCategoryvalue').setText(record.AHFSCategory);
                        view.down('#txtRXCUIvalue').setValue(record.CMS_RxCUI);
                    }
                    view.down('#DollarMax').setValue(record.dollarAmount.trim() == "0.00" ? "" : record.dollarAmount.trim());
                    view.down('#cbxQLDollarAmt').setValue(record.dollarAmtTimePeriod);
                    view.down('#DaysSupply').setValue(record.daysSupply.trim() == "0.00" ? "" : record.daysSupply.trim());
                    view.down('#cbxQLDaysSupply').setValue(record.daysSupplyTimePeriod);
                    view.down('#cbxPdlStatus').setValue(record.PDLFlag);
                    view.down('#FillsMax').setValue(record.fills.trim() == "0.00" ? "" : record.fills.trim());
                    view.down('#cbxQLFills').setValue(record.fillsTimePeriod);
                    view.down('#QLMax').setValue(record.qtyLimit.trim() == "0.00" ? "" : record.qtyLimit.trim());
                    view.down('#cbxQL').setValue(record.qtyLmtTimePeriod);
                    view.down('#chkTransFillExclude').setValue(record.TransFillExcluded=='yes'?true:false);
                    if (view.down('#chkCovered').checked || view.down('#chkSpecialty').checked) {
                        view.down('#chkPreferred').setValue(record.onPrefListFlag=='yes'?true:false);
                        view.down('#cbxPA').setValue(record.PANAME);
                        view.down('#PAMinAge').setValue(record.PAMinAge != "0" ? record.PAMinAge : "");
                        view.down('#PAMaxAge').setValue(record.PAMaxAge != "0" ? record.PAMaxAge : "");
                        view.down('#cbxPaGender').setValue(record.PAGENDERCODE);
                        view.down('#dispAssoPlans').setText(record.AssociatedPlans);
                        view.down('#cbxStepTherapy').setValue(record.stepTherapyName);
                        view.down('#AgeLimitMin').setValue(record.MinAge != "0" ? record.MinAge : "");
                        view.down('#AgeLimitMax').setValue(record.MaxAge != "0" ? record.MaxAge : "");
                        view.down('#cbxAgeLimitType').setValue(record.AgeType);
                        view.down('#cbxGender').setValue(record.GenderRestriction);
                        view.down('#cbxTier').setValue(record.TierCode);
                        view.down('#CopayAmt').setValue(record.CopayAmt.trim() == "0.00" ? "" : record.CopayAmt.trim());
                        view.down('#cbxCopayType').setValue(record.CopayType);
                        view.down('#txtAreaTxtMsg').setValue(record.TextMessage);
                        view.down('#txtAreaNotes').setValue(record.NOTES);
                        view.down('#txtResLink').setValue(record.ResourceLink);
                        view.down('#cbxMedicarePATypes').setValue(record.MedicarePAType);
                        view.down('#cbxMedicareSTGrpCount').setValue(record.MedicareSTGrpCount);
                        view.down('#cbxMedicareSt1Desc').setValue(record.MedicareSTGrpDesc1);
                        view.down('#cbxMedicareSt1Val').setValue(record.MedicareSTStepValue1);
                        view.down('#cbxMedicareSt2Desc').setValue(record.MedicareSTGrpDesc2);
                        view.down('#cbxMedicareSt2Val').setValue(record.MedicareSTStepValue2);
                        view.down('#cbxMedicareSt3Desc').setValue(record.MedicareSTGrpDesc3);
                        view.down('#cbxMedicareSt3Val').setValue(record.MedicareSTStepValue3);

                    }
                    else {
                        reset=true;


                        // DisableControls(true);
                    }

                },
                callback: function (record, operation, success) {
                    //do something whether the load succeeded or faile
                }
            });
            if(reset)
            {
                this.ResetCtrlValues(false);
                view.down('#cmpFldExclusions').setDisabled(false);
            }

        }
        else{
            view.down('#pnlRules').setDisabled(true);
        }
    },
    GetSelectedNodeBySearch:function(sender,record) {
        try
        {
            var view=this.getView();
            if (record.data.NodeId!=null && record.data.NodeName!="All Drugs")
            {
                this.ResetCtrlValues(false);
                view.down('#hdnNodeIdSearch').setValue(record.data.NodeId);
                view.down('#hdnNodeTextSearch').setValue(record.data.NodeName);
                view.down('#hdnLevelTypeSearch').setValue(record.data.LevelType);
                view.down('#hdnRuleLevelIdSearch').setValue(record.data.RuleLevelId);
                view.down('#hdnRuleAllowedSearch').setValue(record.data.RuleAllowed);
                view.down('#hdnActiveTab').setValue('PanelTreeSearch');
                var record2 =view.down('#formularyTreePanel').getStore().getNodeById(record.data.NodeId);
                view.down('#formularyTreePanel').getSelectionModel().select(record2);
                view.down('#pnlRules').setDisabled(false);
                var _selNodeId = record.data.NodeId;
                var _selNodeText = record.data.NodeName;
                var _LevelType=record.data.LevelType;
                var _RuleLevelId=record.data.RuleLevelId;
                var _RuleAllowed=record.data.RuleAllowed;
                var OTCInd=record.data.OTCInd;
                this.GetSelectedNodeDetailsBySearch(_selNodeId, _selNodeText,_LevelType,_RuleLevelId,_RuleAllowed,OTCInd);
            }
            else { view.down('#pnlRules').setDisabled(true); }
        }
        catch (ex)
        {

        }
    },
    GetSelectedNodeDetailsBySearch:function(selNodeId,selNodeText,LevelType,RuleLevelId,RuleAllowed,OTCInd) {
        try
        {
            var me=this;
            var view=this.getView();
            if ( selNodeText!= "All Drugs")
            {
                view.down('#pnlRules').setDisabled(false);
                var _selNodeText = selNodeText;
                var _sLevel = LevelType;
                var _sOtcOrOpd = OTCInd;
                var _sLevelId = RuleLevelId;
                var _sFields = "formularyId,formularyVersion,levelType,ruleLevelId,Covered,specialtyDrugInd,PAInd,PANAME,PAGENDERCODE,stepTherapyInd,stepTherapyName,MinAge,MaxAge,AgeType,GenderRestriction,TierCode,CopayAmt,CopayType,TextMessage,NOTES,dollarAmount,dollarAmtTimePeriod,daysSupply,daysSupplyTimePeriod,fills,fillsTimePeriod,qtyLimit,qtyLmtTimePeriod,lastUpdateDateTime,lastUpdateBy,OTCind,PartDDrug,PartDExcludedDrug,MedicaidCarveOutDrug,MedicaidFeeScreen,ResourceLink,onPrefListFlag,PAMinAge,PAMaxAge,MedicarePAType,MedicareSTGrpCount,MedicareSTGrpDesc1,MedicareSTStepValue1,MedicareSTGrpDesc2,MedicareSTStepValue2,MedicareSTGrpDesc3,MedicareSTStepValue3,TransFillExcluded,restrictToPkgSize,ovrGenericCheck,CMS_RxCUI,AHFSClass,AHFSCategory,PDLFlag,extendedDaysSupply";

                view.down('#hdnLevelId').setValue(_sLevelId);
                view.down('#hdnLevelType').setValue(_sLevel);
                view.down('#hdnOtcOrOpd').setValue(_sOtcOrOpd);
                //Enable the Quantity Limit rule at anything below GCN level
                if (_sLevel== "GCN"|| _sLevel== "NDC"|| _sLevel== "GEN"|| _sLevel== "SSB" || _sLevel== "MSB")
                {
                    view.down('#qtyLimitCompositeField').setDisabled(false);
                }
                else
                {
                    view.down('#qtyLimitCompositeField').setDisabled(true);
                }
                var reset=false;
                //Load Rules for the selected Id
                if (_sLevelId!="")
                {
                    var model = Ext.create('Atlas.formulary.model.FormularyRulesModel');
                    var saveProxy = model.getProxy();
                    saveProxy.setExtraParam('pcFields', _sFields);
                    saveProxy.setExtraParam('piFormulary', view.down('#hdnFormularyId').getValue());
                    saveProxy.setExtraParam('piVersion', view.down('#hdnFormularyVersion').getValue());
                    saveProxy.setExtraParam('pcLevelType', _sLevel);
                    saveProxy.setExtraParam('pcLevelID', _sLevelId);
                    saveProxy.setExtraParam('pcOTCInd', view.down('#hdnOtcOrOpd').getValue());
                    model.phantom = false;
                    model.load({
                        failure: function (record, operation) {
                        },
                        success: function (recorddata, operation) {
                            var record = recorddata.data;
                            me.CoveredChecked();
                            view.down('#chkCovered').setValue(record.Covered=='yes'?true:false);
                            view.down('#chkSpecialty').setValue(record.specialtyDrugInd=='yes'?true:false);
                            view.down('#chkPartDExcDrug').setValue(record.PartDExcludedDrug=='yes'?true:false);
                            view.down('#chkPartDDrug').setValue(record.PartDDrug=='yes'?true:false);
                            view.down('#chkMedCarveOut').setValue(record.MedicaidCarveOutDrug=='yes'?true:false);
                            view.down('#chkMedicaidFeeScreen').setValue(record.MedicaidFeeScreen=='yes'?true:false);
                            view.down('#chkRestrictToPkgSize').setValue(record.restrictToPkgSize=='yes'?true:false);
                            view.down('#chkOverrideGenericCheck').setValue(record.ovrGenericCheck=='yes'?true:false);
                            view.down('#txtExtendDaysSupply').setValue(record.extendedDaysSupply.trim() == "0" ? "" : record.extendedDaysSupply.trim());
                            if (view.down('#hidFormuType').getValue() == "Medicare") {
                                view.down('#lblAHFSClassValue').setText(record.AHFSClass);
                                view.down('#lblAHFSCategoryvalue').setText(record.AHFSCategory);
                                view.down('#txtRXCUIvalue').setValue(record.CMS_RxCUI);
                            }
                            view.down('#DollarMax').setValue(record.dollarAmount.trim() == "0.00" ? "" : record.dollarAmount.trim());
                            view.down('#cbxQLDollarAmt').setValue(record.dollarAmtTimePeriod);
                            view.down('#DaysSupply').setValue(record.daysSupply.trim() == "0.00" ? "" : record.daysSupply.trim());
                            view.down('#cbxQLDaysSupply').setValue(record.daysSupplyTimePeriod);
                            view.down('#cbxPdlStatus').setValue(record.PDLFlag);
                            view.down('#FillsMax').setValue(record.fills.trim() == "0.00" ? "" : record.fills.trim());
                            view.down('#cbxQLFills').setValue(record.fillsTimePeriod);
                            view.down('#QLMax').setValue(record.qtyLimit.trim() == "0.00" ? "" : record.qtyLimit.trim());
                            view.down('#cbxQL').setValue(record.qtyLmtTimePeriod);
                            view.down('#chkTransFillExclude').setValue(record.TransFillExcluded=='yes'?true:false);
                            if (view.down('#chkCovered').checked || view.down('#chkSpecialty').checked) {
                                view.down('#chkPreferred').setValue(record.onPrefListFlag=='yes'?true:false);
                                view.down('#cbxPA').setValue(record.PANAME);
                                view.down('#PAMinAge').setValue(record.PAMinAge != "0" ? record.PAMinAge : "");
                                view.down('#PAMaxAge').setValue(record.PAMaxAge != "0" ? record.PAMaxAge : "");
                                view.down('#cbxPaGender').setValue(record.PAGENDERCODE);
                                view.down('#dispAssoPlans').text = record.AssociatedPlans;
                                view.down('#cbxStepTherapy').setValue(record.stepTherapyName);
                                view.down('#AgeLimitMin').setValue(record.MinAge != "0" ? record.MinAge : "");
                                view.down('#AgeLimitMax').setValue(record.MaxAge != "0" ? record.MaxAge : "");
                                view.down('#cbxAgeLimitType').setValue(record.AgeType);
                                view.down('#cbxGender').setValue(record.GenderRestriction);
                                view.down('#cbxTier').setValue(record.TierCode);
                                view.down('#CopayAmt').setValue(record.CopayAmt.trim() == "0.00" ? "" : record.CopayAmt.trim());
                                view.down('#cbxCopayType').setValue(record.CopayType);
                                view.down('#txtAreaTxtMsg').setValue(record.TextMessage);
                                view.down('#txtAreaNotes').setValue(record.NOTES);
                                view.down('#txtResLink').setValue(record.ResourceLink);
                                view.down('#cbxMedicarePATypes').setValue(record.MedicarePAType);
                                view.down('#cbxMedicareSTGrpCount').setValue(record.MedicareSTGrpCount);
                                view.down('#cbxMedicareSt1Desc').setValue(record.MedicareSTGrpDesc1);
                                view.down('#cbxMedicareSt1Val').setValue(record.MedicareSTStepValue1);
                                view.down('#cbxMedicareSt2Desc').setValue(record.MedicareSTGrpDesc2);
                                view.down('#cbxMedicareSt2Val').setValue(record.MedicareSTStepValue2);
                                view.down('#cbxMedicareSt3Desc').setValue(record.MedicareSTGrpDesc3);
                                view.down('#cbxMedicareSt3Val').setValue(record.MedicareSTStepValue3);

                            }
                            else {
                                reset=true;

                            }

                        },
                        callback: function (record, operation, success) {
                            //do something whether the load succeeded or faile
                        }
                    });
                    if(reset)
                    {
                        this.ResetCtrlValues(false);
                        view.down('#cmpFldExclusions').setDisabled(false);
                        // DisableControls(true);)}
                    }
                }
                //fdbTreePanel.SelectNode(_selNodeId);
            }
            else {view.down('#pnlRules').setDisabled(true); }
        }
        catch (ex)
        {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    LoadValidateRxCUI:function() {
        try {
            var view = this.getView();
            var winVerifyAttachment = view.down('#winVerifyAttachment');
            //HttpPostedFile file = .Files[1];
            //Stream str = file.InputStream;
            //byte[] data = new byte[file.ContentLength];
            //str.Read(data, 0, file.ContentLength);

            var imgData ='';//= DAL.Utility.Base64Encoder.ToBase64(data);
            //  BLL.Shared.AttachmentsBll bll = new BLL.Shared.AttachmentsBll();
            // Models.Shared.AttachmentsBean objBean = new Models.Shared.AttachmentsBean();
            var imagePath = "imagePBMUpload";
            //var docTypeDesc = winVerifyAttachment.down('#txtDescriptionRxCUI').getValue();
            var FileType = '';
            var sFileNameOnly='';
            var pParameters = '';
            pParameters = view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue() + "|" + view.down('#hdnFFDocID').getValue();
            view.down('#hdnFFDocID').setValue('');
            var sReportName = "FF File RxCUI Validation";
            var sProgramName = "ValidateFFRxCUI.p";
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
            var extraParameters = {
                'pDescription': sReportName,
                'pProgramName': sProgramName,
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Report",
                'pSaveDocument': true,
                'pFaxNumber': ''
            }
            var returnField=['pJobNumber'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0) {
                Ext.Msg.alert("Information", "Please check FF File RxCUI validation status in Job Queue with Job Number:" + submitJobReturn.pJobNumber);
                if(winVerifyAttachment!=null)
                    winVerifyAttachment.close();
            }
            else {
                Ext.Msg.alert("Error", "Job submission fail");
            }
        }
        catch (ex) {
            view.down('#hdnFFDocID').setValue('');
            Ext.Msg.alert("Exception", ex.message);
        }

    },
    ClearControls:function() {
        var view = this.getView();
        var winAttachment = view.down('#winAttachment');
        winAttachment.down('#rdoFF').setValue(true);
        winAttachment.down('#rdoAdd').setValue(false);
        winAttachment.down('#cbxMonth').setValue('');
        winAttachment.down('#cbxYear').setValue('');
        winAttachment.down('#txtDescription').setValue('');
        winAttachment.down('#txtDescription').clearInvalid();
        winAttachment.down('#FileUploadField1').setValue('');
        winAttachment.down('#FileUploadField1').clearInvalid();
        winAttachment.down('#FileUploadField1').reset();
    },
    onUploadAttachmentFormulary: function (arrayDocumentId,origin) {
        var view=this.getView();
        if (origin !== view.id) {
            return; // ignore
        }
        else
        {
            var win = Ext.WindowManager.getActive();
            if (win) {
                if (win.itemId == "winVerifyAttachment") {

                    view.down('#hdnFFDocID').setValue(arrayDocumentId[0].trim());
                    this.LoadValidateRxCUI();
                }
                else if (win.itemId == "winAttachment") {
                    this.LoadCMSRule(arrayDocumentId[0].trim());
                }
                else {
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                    var panelFileUpload = view.down('#fileUploadGrid'),
                        fileStore = panelFileUpload.getViewModel().getStore('fileStore');
                    var params = {
                        pcPlanID: '',
                        pcKeyType: 'FormularyId',
                        pcKeyValue: view.down('#hdnFormularyId').getValue(),
                        pcKeyAction: 'A',
                        pcDocIDList: arrayDocumentId[0].trim(),
                        pcDescrData: fileStore.getAt(0).get('description')
                    };
                    var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params,
                        saveAction, null);
                    win.close();
                    this.ImportSelecteddFile(arrayDocumentId[0].trim());
                   // Ext.Msg.alert('Success', 'File Upload Sucessfully');
                }
            }
        }
    },
    ImportSelecteddFile:function(documentID) {
        var me = this,
            view = this.getView(),
            win;
        win = Ext.create('Ext.window.Window', {
            title: 'Formulary Select Fields',
            modal: true,
            closable: true,
            scrollable: true,
            height: 400,
            width: 700,
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            scope: me,
            itemId: 'winImportFields',
            items: [
                {
                    xtype: 'panel',
                    height: 300,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'panel', itemId: 'Panel22', flex: 0.5, autoScroll: true, title: 'Available Fields', items: [
                            {
                                anchor: '100%',
                                height: 300,
                                width:350,
                                xtype: 'multiselect',
                                msgTarget: 'side',
                                itemId: 'MultiAllFields',
                                valueField: 'KeyName',
                                dragGroup:'grp1',
                                dropGroup:"grp2",
                                displayField: 'KeyName'
                            }
                        ]
                        },
                        {
                            xtype: 'panel', itemId: 'Panel21', flex: 0.5, title: 'Removed Fields',  autoScroll: true,items: [
                            {
                                anchor: '100%',
                                height: 300,
                                width:350,
                                xtype: 'multiselect',
                                itemId: 'MultiAllRemovedFields',
                                valueField: 'KeyName',
                                dragGroup:'grp2',
                                dropGroup:'grp1',
                                displayField: 'KeyName',
                                bind: {
                                    store:'{StoreImportFieldsRemoved}'
                                }
                            }]
                        },
                        {xtype: 'hidden', itemId: 'hdnDocumentIDImport'}
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {xtype: 'button', text: 'Submit', iconCls: 'fa fa-save',handler:'GetSelectedFormularyFields'}
                    ]
                }
            ]
        });
        view.add(win);
        win.down('#hdnDocumentIDImport').setValue(documentID);
        var storeremove=me.getViewModel().getStore('StoreImportFieldsRemoved');
        storeremove.removeAll();
        var store=me.getViewModel().getStore('StoreImportFields');
        if(store.data.length>0) {
            var datar = new Array();
            var data = store.data.items[0].data.opcKeyValue.split(',')
            for (var i = 0; i < data.length; i++) {
                datar.push({"KeyName": data[i]});
            }
            var StoreImportFieldsClone = me.getViewModel().getStore('StoreImportFieldsClone');
            StoreImportFieldsClone.loadData(datar);
            win.down('#MultiAllFields').setStore(StoreImportFieldsClone);
            win.show();
        }
        else {
            me.getViewModel().getStore('StoreImportFields').on('load', function (store, records, successful, eOpts) {
                var datar = new Array();
                if (records && records.length > 0) {
                    var data = records[0].data.opcKeyValue.split(',')
                    for (var i = 0; i < data.length; i++) {
                        datar.push({"KeyName": data[i]});
                    }
                }
                var StoreImportFieldsClone = me.getViewModel().getStore('StoreImportFieldsClone');
                StoreImportFieldsClone.loadData(datar);
                win.down('#MultiAllFields').setStore(StoreImportFieldsClone);
                win.show();
            });
            me.getViewModel().getStore('StoreImportFields').load();
        }
    },
    GetSelectedFormularyFields:function()
    {
        var view=this.getView();
        var store= view.down('#MultiAllFields').getStore();
        var fields=store.data;
        var sReportName = "Formulary Rules Import " + " | " + view.down('#hdnFormularyName').getValue();
        var sProgramName = "FormRulesImport.p";
        var pParameters = "";
        var fieldParameter = "";
        for (var i = 0; i < fields.length; i++)
        {
            if (!(fields.items[i].data.KeyName == "" || fields.items[i].data.KeyName == "value"))
            {
                if(fieldParameter=="")
                {
                    fieldParameter= fields.items[i].data.KeyName;
                }
                else {
                    fieldParameter = fieldParameter + "," + fields.items[i].data.KeyName;
                }

            }
        }
        pParameters =view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue() + "|" + view.down('#hdnDocumentIDImport').getValue() + "|" + fieldParameter;
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
        var extraParameters = {
            'pDescription': sReportName,
            'pProgramName': sProgramName,
            'pParameters': pParameters,
            'pRunMode': 2,
            'pProgramType': "Formulary",
            'pSaveDocument': true,
            'pFaxNumber': ''
        }
        var returnField=['pJobNumber'];
        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
            saveAction, returnField);
        if (submitJobReturn.code == 0) {
            view.down('#winImportFields').close();
            Ext.Msg.alert("Information", "Job has been submitted successfully. JobNumber is : " + submitJobReturn.pJobNumber + ". Please look at report for import errors.");
        }
    },
    LoadCMSRule:function(pcRetDocID) {
        try {
            var view = this.getView();
            var  winAttachment = view.down('#winAttachment');

            var importType = '';
            var pParameters = '';
            if (winAttachment.down('#rdoFF').checked) {
                importType = "FF";
                pParameters = importType + "|" + view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue() + "|" + winAttachment.down('#cbxYear').getRawValue() + "|" + winAttachment.down('#cbxMonth').getValue() + "|" + pcRetDocID;
                view.down('#hdnFFDocID').setValue(pcRetDocID);
            }
            else {
                importType = "ADD";
                pParameters = importType + "|" + view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue() + "|" + "0" + "|" + "0" + "|" + pcRetDocID;
                view.down('#hdnFFDocID').setValue('');
            }
            var sReportName = "Formulary Rules Import Through" + importType;
            var sProgramName = "FFToFormularyRulesSetup.p";
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
            var extraParameters = {
                'pDescription': sReportName,
                'pProgramName': sProgramName,
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "Formulary",
                'pSaveDocument': true,
                'pFaxNumber': ''
            }
            var returnField = ['pJobNumber'];
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            if (submitJobReturn.code == 0) {
                Ext.Msg.alert("Information", "Please check CMS file load status in Job Queue with Job Number:" + submitJobReturn.pJobNumber);
                winAttachment.close();
            }
            else {
                Ext.Msg.alert("Error", "Job submission fail");
            }
        }
        catch (ex) {
            view.down('#hdnFFDocID').setValue('');
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    btnImportRule_Click:function() {
        var view=this.getView();
        var msg= 'This will upload Formulary Rules into database. Do you want to continue?';
        Ext.Msg.confirm('Formulary Upload', msg,
            function(btn)
            {
                if(btn=='yes')
                {
                    var formularyId = view.down('#hdnFormularyId').getValue(); var formularyVersion = view.down('#hdnFormularyVersion').getValue();
                    //OpenWindow('../Shared/AddAttachment.aspx?KeyType=FormularyId&KeyValue='+formularyId+'&imagePath=imagePBMUpload&attach=false&IsImportRuleButton=true', {title: 'Import Rules', height: 150, width: 520});
                    var me = this,
                        win;
                    win = Ext.create('Ext.window.Window', {
                        title: 'Import Rules',
                        modal: true,
                        closable: true,
                        scrollable: true,
                        height:300,
                        width:700,
                        layout: {
                            type: 'fit',
                            align: 'stretch'
                        },
                        scope: me,
                        itemId:'winImportRules',
                        items: [
                            {
                                        xtype: 'merlin.fileuploader',
                                        keyType: 'imagePBMUpload',
                                        layout: 'fit',
                                        height:'100%',
                                        origin: view.id,
                                        fileType: 'csv,xls',
                                        endpoint: 'shared/rx/document/update'
                                    }


                        ]
                        //dockedItems: [
                        //    {
                        //        xtype: 'toolbar',
                        //        dock: 'bottom',
                        //        style: {borderColor: 'black', borderStyle: 'solid'},
                        //        items: [
                        //            '->'
                        //            , {xtype: 'button', text: 'Save', iconCls: 'fa fa-save',handler:'UploadClick'}
                        //            , {xtype: 'button', text: 'Reset', iconCls: 'fa fa-remove',handler:'Reset_click'}
                        //        ]
                        //    }
                        //]
                    });
                    view.add(win);
                    win.show();
                }
            }
        )
    },
    Reset_click:function(sender,e) {
        var view=this.getView();
        var winImportRules = view.down('#winImportRules');
        winImportRules.down('#formImportRules').reset();
    },
    UploadClick:function() {
        var tpl = "Uploaded file: {0}<br/>Size: {1} bytes";
        var view = this.getView();
        var winImportRules = view.down('#winImportRules');
        if (!winImportRules.down('#formImportRules').isValid()) {
            return false;
        }
        else {
            //HttpPostedFile file = .Files[1];
            //Stream str = file.InputStream;
            //byte[] data = new byte[file.ContentLength];
            //str.Read(data, 0, file.ContentLength);

            var imgData ='';// DAL.Utility.Base64Encoder.ToBase64(data);
            //  BLL.Shared.AttachmentsBll bll = new BLL.Shared.AttachmentsBll();
            // Models.Shared.AttachmentsBean objBean = new Models.Shared.AttachmentsBean();
            var imagePath = "imagePBMUpload";
            var docTypeDesc = winImportRules.down('#txtDescriptionImportRules').getValue();
            var FileType = '';
            var sFileNameOnly='';;
            var pParameters = '';
            //FileInfo fObj = new FileInfo(this.uploadRxCUI.PostedFile.FileName.ToString());
            //FileType = fObj.Extension;
            // sFileNameOnly = Path.GetFileNameWithoutExtension(fObj.FullName);
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
            var extraParameters = {
                'pcDocDescr': docTypeDesc,
                'pcKeyType': imagePath,
                'pcFileName': sFileNameOnly,
                'plcImgData': imgData,
                'pcFileType': FileType
            }
            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/document/update', null, [true], extraParameters,
                saveAction, null);
            if (testReturn.code == 0) {
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'File Upload Sucessfully',
                    minWidth: 200,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }

    },
    ExportFormularyRule:function() {
        var view = this.getView();
        var winExportRule = view.down('#winExportRule');
        var sReportName = "Formulary Rules Export " + " | " + view.down('#hdnFormularyName').getValue();
        var sProgramName = "FormRulesExport.p";
        var pParameters = "";

        pParameters = view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue() + "|" + (winExportRule.down('#rdExcel').checked == true ? "xls" : "csv");
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
        var extraParameters = {
            'pDescription': sReportName,
            'pProgramName': sProgramName,
            'pParameters': pParameters,
            'pRunMode': 2,
            'pProgramType': "Formulary",
            'pSaveDocument': true,
            'pFaxNumber': ''
        }
        var returnField=['pJobNumber'];
        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
            saveAction, returnField);
        if (submitJobReturn.code == 0) {
            winExportRule.close();
            Ext.Msg.alert("Information", "Please check formulary rules export status in Job Queue with Job Number:" + submitJobReturn.pJobNumber);
        }
    },
    btnRelinkRXCUI_Click:function() {
        var view = this.getView();
        if (view.down('#hdnFormularyId').getValue() == '' || view.down('#hdnFormularyVersion').getValue() == '') {
            Ext.Msg.alert('Relinking', 'There is no selected formulary to relink');
            return;
        }
        else {
            Ext.Msg.confirm("FRF Relink", "Please select the relinking mode",
                function (btn) {
                    if (btn == 'yes') {
                        this.RXCUIFullLinkingYes();
                    }
                    else if (btn == 'no') {
                        this.RXCUIDeltaLinkingYes();
                    }
                    else {
                    }
                },this);
        }
    },
    RXCUIFullLinkingYes:function() {
        var view = this.getView();
        try {
            var pParameters = "0|0|" + "MANUAL" + "|" + view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue() + "|" + "FULL";
            var extraParameters = {
                'pDescription': "Full formulary relinking with FRF.",
                'pProgramName': "reLinkRXCUI.p",
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "batch",
                'pSaveDocument': true,
                'pFaxNumber': ''
            }
            var returnField=['pJobNumber'];
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            Ext.Msg.alert("FRF", "Please check Full Relinking status in Job Queue with Job Number:" + submitJobReturn.pJobNumber);
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    RXCUIDeltaLinkingYes:function() {
        var view = this.getView();
        try {
            var pParameters = "0|0|" + "MANUAL" + "|" + view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue() + "|" + "DELTA";
            var extraParameters = {
                'pDescription': "Delta formulary relinking with FRF",
                'pProgramName': "reLinkRXCUI.p",
                'pParameters': pParameters,
                'pRunMode': 2,
                'pProgramType': "batch",
                'pSaveDocument': true,
                'pFaxNumber': ''
            }
            var returnField=['pJobNumber'];
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
            var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                saveAction, returnField);
            Ext.Msg.alert("FRF", "Please check Delta Relinking status in Job Queue with Job Number:" + submitJobReturn.pJobNumber);
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    btnCollapseAll_Click:function(sender,e) {
        var view=this.getView();
        view.down('#fdbTreePanel').collapseAll();
    },
    GenerateDifferenceRpt:function(sender,e) {
        var view = this.getView();
        try {
            if (view.down('#hdnFormularyId').getValue()!="") {
                var sParam = view.down('#hdnFormularyId').getValue() + "|" + view.down('#hdnFormularyVersion').getValue();
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]
                var extraParameters = {
                    'pDescription': "Formulary Rules Delta Report",
                    'pProgramName': "getFormRuleDelta.p",
                    'pParameters': sParam,
                    'pRunMode': 2,
                    'pProgramType': "report",
                    'pSaveDocument': false,
                    'pFaxNumber': ''
                }
                var returnField=['pJobNumber'];
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], extraParameters,
                    saveAction, returnField);
                if (submitJobReturn.code == 0) {
                    Ext.Msg.alert("PBM", "Formulary Rules Delta Report Job # " + submitJobReturn.pJobNumber + " has been successfully queued. Please review the Job in the Job Queue.");
                }
            }
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    cbxNDC_Select:function(combo, record) {
        var view=this.getView();
        var recorddata="";
        view.down('#hdnSelectedNDC').setValue(record.data.NDC);
        var formularyTreePanel = view.down('#formularyTreePanel');
        view.down('#formularyTreePanel').setDisabled(false);
        var formularyTreeStore=view.down('#formularyTreePanel').getViewModel().getStore('formularydrugsearch');
        formularyTreeStore.getProxy().setExtraParam('pFormularyId', parseInt(view.down('#hdnFormularyId').getValue()));
        formularyTreeStore.getProxy().setExtraParam('pFormVersion', parseInt(view.down('#hdnFormularyVersion').getValue()));
        formularyTreeStore.getProxy().setExtraParam('pETCId', 0);
        formularyTreeStore.getProxy().setExtraParam('pNDC', record.data.NDC);
        formularyTreeStore.getProxy().setExtraParam('pParentNodeId', 0);
        formularyTreeStore.getProxy().setExtraParam('pLastNodeIdUsed', 0);
        formularyTreeStore.load({
            callback: function (records, operation, success) {
                recorddata = formularyTreePanel.getRootNode().findChild('CallFunction', true, true);
                if (recorddata != null) {
                    var store = formularyTreePanel.getViewModel().getStore('formularydrugsappend');
                    store.getProxy().setExtraParam('pFormularyId', parseInt(view.down('#hdnFormularyId').getValue()));
                    store.getProxy().setExtraParam('pFormVersion', parseInt(view.down('#hdnFormularyVersion').getValue()));
                    store.getProxy().setExtraParam('pETCId', recorddata.data.RuleLevelId);
                    store.getProxy().setExtraParam('pNDC', view.down('#hdnSelectedNDC').getValue());
                    store.getProxy().setExtraParam('pParentNodeId', 0);
                    store.getProxy().setExtraParam('pLastNodeIdUsed', 0);
                    store.load({
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {
                            recorddata.removeAll();
                            recorddata.appendChild(record);
                            var record = formularyTreePanel.getRootNode().findChild('RuleLevelId', view.down('#hdnSelectedNDC').getValue(), true);
                            if(record!=null)
                            formularyTreePanel.selectPath(record.getPath());
                        }
                    })
                }
            }
        });
    },
    ShowHideMonthYearPanel:function () {
        var view = this.getView();
        var isChecked = view.down('#rdoFF').getValue();
        if (isChecked) {
            view.down('#CompositeFieldFF').setDisabled(false);
        }
        else {
            view.down('#cbxMonth').setValue('');
            view.down('#cbxYear').setValue('');
            view.down('#CompositeFieldFF').setDisabled(true);
        }
    },
    ValidateMonthAndYear:function() {
        var view = this.getView();
        var isChecked = view.down('#rdoFF').getValue();
        if (isChecked) {
            var monthValue = view.down('#cbxMonth').getValue();
            var yearValue = view.down('#cbxYear').getValue();
            if (monthValue == '') {
                Ext.Msg.alert('Validate', "Please select a month.");
                return false;
            }
            else if (yearValue == '') {
                Ext.Msg.alert('Validate', "Please select a year.");
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    },
    btnResetClick:function() {
        var view=this.getView();
        view.down('#cbxDrug').setValue('');
        view.down('#formularyTreePanel').getRootNode().removeAll();
        // view.down('#formularyTreePanel').getRootNode().select();
        view.down('#pnlRules').setDisabled(true);
        view.down('#hdnNodeIdSearch').setValue('');
        view.down('#hdnNodeTextSearch').setValue('');
        view.down('#hdnLevelTypeSearch').setValue('');
        view.down('#hdnRuleLevelIdSearch').setValue('');
        view.down('#hdnRuleAllowedSearch').setValue('');
        this.ResetCtrlValues(true);
        view.down('#cbxDrug').clearValue();
        // var store= viewModel.getStore('storeMedispan');
        //store.getProxy().setExtraParam('pNDC','');
        //store.load();
    },
    SetHiddenVariables:function(pFormuId,pFormuVer,pFormuStat,pFormuName,pFormuType,pFormuDataSrc) {
        try {
            var view = this.getView();
            if (pFormuId.toString()!="") {
                view.down('#hdnFormularyId').setValue(pFormuId);
                view.down('#hdnFormularyVersion').setValue(pFormuVer);
                view.down('#hdnFormularyStatus').setValue(pFormuStat);
                view.down('#hdnFormularyName').setValue(pFormuName);
                view.down('#hidFormuType').setValue(pFormuType);
                view.down('#hidFormuDataSource').setValue(pFormuDataSrc);
                this.bIsFDB = (!(pFormuDataSrc) ? pFormuDataSrc : "") == "FDB" ? true : false;
                this.bIsMedicare = pFormuType == "Medicare" ? true : false;
                view.down('#fldSetMedicare').hidden = !(this.bIsMedicare);
                view.down('#fldSetMedicaid').hidden = this.bIsMedicare;
                this.LoadStepTherapiesAndTiers(pFormuId);
                this._iFormuStatus = parseInt(view.down('#hdnFormularyStatus').getValue());
                if (view.down('#hdnFormularyId').getValue() != "") {
                    view.down('#btnExportRule').setDisabled(false);
                }
                else {
                    view.down('#btnExportRule').setDisabled(true);
                }

                if (this._iFormuStatus == 2 || this._iFormuStatus == 3 || this._iFormuStatus == 4) //Approved
                {
                    view.down('#btnSave').setDisabled(true);
                }
                else {
                    view.down('#btnSave').setDisabled(false);
                }
                if (this._iFormuStatus == 2) {
                    view.down('#btnImportRule').setDisabled(true);
                }
                else {
                    view.down('#btnImportRule').setDisabled(false);
                }
                if (this._iFormuStatus == 1 && pFormuType == "Medicare") {
                    view.down('#btnRelink').setDisabled(false);
                }
                else {
                    view.down('#btnRelink').setDisabled(true);
                }
                this.ResetCtrlValues(true);
            }
        }
        catch (ex) {
            throw ex;
        }
    },
    LoadStepTherapiesAndTiers:function(pFormularyID) {
        try {
            var sPBMRuleToLoad = '';
            sPBMRuleToLoad = (this.bIsMedicare == true ? "Medicare Step Therapies" : "Step Therapies");
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('StorePBMRules');
            store.getProxy().setExtraParam('pRuleType', sPBMRuleToLoad);
            store.load();
            var StoreTierList = viewmodel.getStore('StoreTierList');
            StoreTierList.getProxy().setExtraParam('piFormularyID', pFormularyID);
            StoreTierList.load();
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    validateSave:function() {
        var view=this.getView();
        if (view.down('#hdnActiveTab').getValue() == 'pnlTree') {
            if (view.down('#fdbTreePanel').selModel.selected.length == 0 || view.down('#fdbTreePanel').selModel.selected.items[0].data.NodeId==null  || view.down('#fdbTreePanel').selModel.selected.items[0].data.NodeName == "All Drugs") {
                Ext.Msg.alert('Validation Error', 'Please select a drug.');
                return false;
            }
        }
        else if (view.down('#formularyTreePanel').selModel.selected.length == 0 || view.down('#formularyTreePanel').selModel.selected.items[0].data.NodeId==null ||  view.down('#formularyTreePanel').selModel.selected.items[0].data.NodeName == "All Drugs") {
            Ext.Msg.alert('Validation Error', 'Please select a drug.');
            return false;
        }
        if((view.down('#AgeLimitMin').getValue()!=null || view.down('#AgeLimitMax').getValue()!=null)&& view.down('#cbxAgeLimitType').getValue()==null)
        {
            Ext.Msg.alert('Validation Error', 'Please select Age Limit Type.');
            return false;
        }
        if (!view.down('#StatusForm').getForm().isValid()) {
            Ext.Msg.alert('Validation Error', 'Please fix the validation errors before saving the data.');
            return false;
        }
        else if (view.down('#chkPartDExcDrug').checked == true && view.down('#chkPartDDrug').checked == true) {
            Ext.Msg.alert('Validation Error', 'Rule should be either Part D or Part D excluded.');
            return false;
        }
        return true;
    },
    validateAgeRestriction:function () {
        var view=this.getView();
        var minAgeVal = view.down('#AgeLimitMin').GetValue();
        var maxAgeVal = view.down('#AgeLimitMax').GetValue();
        if ((minAgeVal != '' || maxAgeVal != '') && view.down('#cbxAgeLimitType').value == '') {
            Ext.Msg.alert('Validation Error', 'Please select the Age Type.');
            return false;
        }
        else {
            view.down('#cbxAgeLimitType').clearInvalid();
            return true;
        }
    },
    rdoFF_checked:function() {
        this.ShowHideMonthYearPanel();
    },
    tabTreeChange:function(tabPanel, tab) {
        var view = this.getView();
        if (tab.itemId=="PanelTreeSearch") {
            view.down('#btnCollapseAll').setDisabled(false);
            view.down('#pnlRules').setDisabled(true);
            view.down('#hdnActiveTab').setValue('PanelTreeSearch');
            view.down('#btnCollapseAll').setDisabled(true);
            if(view.down('#hdnNodeIdSearch') != undefined && view.down('#hdnNodeIdSearch').getValue() != ''){
                this.GetSelectedNodeDetailsBySearch(view.down('#hdnNodeIdSearch').getValue() ,view.down('#hdnNodeTextSearch').getValue(),view.down('#hdnLevelTypeSearch').getValue(), view.down('#hdnRuleLevelIdSearch').getValue(), view.down('#hdnRuleAllowedSearch').getValue() == "true" ? true : false,view.down('#hdnOtcOrOpd').getValue());
            }
            else{
                this.ResetCtrlValues(true);
            }
        }
        else
        {
            view.down('#btnCollapseAll').setDisabled(false);
            view.down('#pnlRules').setDisabled(true);
            view.down('#hdnActiveTab').setValue('pnlTree');
            if (view.down('#hdnNodeId') != undefined && view.down('#hdnNodeId').getValue() != '') {
                this.GetSelectedNodeDetails(view.down('#hdnNodeId').getValue(), view.down('#hdnNodeText').getValue(), view.down('#hdnLevelType').getValue(), view.down('#hdnRuleLevelId').getValue(), view.down('#hdnRuleAllowed').getValue() == "true" ? true : false,view.down('#hdnOtcOrOpd').getValue());
            }
            else {
                this.ResetCtrlValues(false);
            }
        }
    }
});