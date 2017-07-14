Ext.define('Atlas.plan.view.group.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-detail',

    // listen: {
    //     controller: {
    //         'plan-groups': {
    //             groupchange: 'onGroupChange',
    //             groupchangeDetail: 'onGroupChangeDetail'
    //
    //         }
    //     }
    // },
    init: function () {
       // debugger;
        var me = this;

        //var plnGroupDetail = this.getView().down('plan-group-detail');
        me.getViewModel().set('canEdit', false);
        me.getViewModel().set('canActivate', false);
        me.getViewModel().set('canDeactivate', false);
        me.enableDisableDataEntry(true);

    },
    boxReady:function()
    {

        var store = this.getViewModel().get('nonpharmanetworks');

        store.on('load',
            function(){
                var existinnaRecord = store.find('NetworkID', 0, 0, false, false, true);
                if (existinnaRecord < 0) {

                    var naRecord = new Atlas.plan.model.PharmaNetwork;
                    naRecord.data.NetworkID = 0;
                    naRecord.data.NetworkDescription = "N/A";
                    store.insert(0,naRecord);
                }

            });
        

    },
    onGroupChangeDetail: function (record) {
        this.onGroupChange(record);
    },

    onGroupChange: function (record) {


        if (!record) {
            return false;
        }

        if (this.getViewModel().get('isNewPlanGroupRecord'))
            return false;

        var me = this,
            form = this.getView().down('form'),
            storePCN = this.getViewModel().get('pcndetails'),
            storeAccounts = this.getViewModel().get('accounts'),
            storelobs = this.getViewModel().get('lobs'),
            storePlanGroupBenefits = this.getViewModel().get('plangroupbenefits'),
            //groupInfo = Ext.create('Atlas.plan.model.PlanGroupInfo');
            groupInfo = this.getViewModel().getStore('plangroupdetailinfo'),
            planDefaultAddress = this.getViewModel().getStore('plandefaultaddress');


        // storeAccounts.filterBy(function (srecord) {
        //     return srecord.get('carrierId') == record.get('carrierId');
        // });

        storeAccounts.getProxy().setExtraParam('pWhere', 'carrierId=' + record.get('carrierId'));
        storeAccounts.getProxy().setExtraParam('pBatchSize', 0);
        storeAccounts.load();
        storelobs.filterBy(function (srecord) {
            return srecord.get('carrierId') == record.get('carrierId');
        });

        planDefaultAddress.getProxy().setExtraParam('ipiPlanGroupID', record.get('planGroupId'));
        planDefaultAddress.getProxy().setExtraParam('ipcPortalAddresses', '');

        planDefaultAddress.load({
            scope: this,
            callback: function (records, operation, success) {
            groupInfo.getProxy().setExtraParam('pplanGroupId', record.get('planGroupId'));
            groupInfo.load({

            scope: this,
            callback: function (records, operation, success) {
                var recordInfo = records[0];
                console.log(record);
                console.log(recordInfo);
                var planGrpBnfts = Ext.decode(operation.getResponse().responseText);
                if (planGrpBnfts != null && planGrpBnfts.metadata != null) {
                    if (storePlanGroupBenefits)
                        storePlanGroupBenefits.loadData(planGrpBnfts.metadata.ttplanInfo);
                }


                //filter plan PCN
                storePCN.getProxy().setExtraParam('pBatchSize', 0);
                storePCN.getProxy().setExtraParam('pApplyPCNCondition', 'no');
                storePCN.getProxy().setExtraParam('pWhere', 'carrierId = ' + recordInfo.get('carrierId') + ' and (carrierAcctNumber = \'' + recordInfo.get('carrierAcctNumber') + '\' or (carrierAcctNumber = \'\' and multiaccount = yes)) and carrierLOBId = ' + recordInfo.get('carrierLOBId'));
                storePCN.load({
                    callback: function (recorddata2, operation2, success) {
                        //finally bind the form once stores are ready
                        form.loadRecord(recordInfo);
                        //debugger;
                        var cmsplanType = me.lookupReference('CMSPlanType');

                        if (recordInfo.get("carrierLOBId") == 2) {
                            cmsplanType.clearInvalid();
                            cmsplanType.allowBlank = false;

                            if (!cmsplanType.value) {
                                cmsplanType.markInvalid('');
                            }
                        }

                        else {
                            cmsplanType.clearInvalid();
                            cmsplanType.allowBlank = true;

                        }

                        var status = recordInfo.get('planGroupStatus');
                        if (status == 'A') // Active
                        {
                            me.getViewModel().set('canEdit', true);
                            me.getViewModel().set('canActivate', false);
                            me.getViewModel().set('canDeactivate', true);
                            me.getViewModel().set('isEditing', false);
                            me.enableDisableDataEntry(true);
                        }
                        else if (status == 'I') // Inactive
                        {
                            me.getViewModel().set('canEdit', false);
                            me.getViewModel().set('canActivate', true);
                            me.getViewModel().set('canDeactivate', false);
                            me.getViewModel().set('isEditing', true);
                            me.enableDisableDataEntry(false);
                        }

                        else   //Draft
                        {
                            me.getViewModel().set('canEdit', false);
                            me.getViewModel().set('canActivate', true);
                            me.getViewModel().set('canDeactivate', false);
                            me.getViewModel().set('isEditing', true);
                            me.enableDisableDataEntry(false);
                        }

                        var plangroupView = me.getView().up('plan-groups');
                         if(plangroupView)
                        {
                           // debugger;
                            if(plangroupView.getViewModel().get('isAtlasRecord'))
                            {
                                me.getViewModel().set('canEdit', false);
                                me.getViewModel().set('canActivate', false);
                                me.getViewModel().set('canDeactivate', false);
                                me.getViewModel().set('isEditing', false);
                                me.enableDisableDataEntry(true);
                            }
                         }
                        //cbPcnCodeList

                        //save the record into the view model
                        me.getViewModel().set('masterRecord', recordInfo);
                        me.getViewModel().set('isNewPlanGroupRecord', false);
                        //me.fireEvent('newGroupSelected','');
                        var pcnl = [];
                        if (recordInfo.data.pcnCodeList.indexOf(',') == -1)
                            pcnl[0] = recordInfo.data.pcnCodeList;
                        else
                            pcnl = recordInfo.data.pcnCodeList.split(',');
                        me.getView().down('#cbPcnCodeList').setValue(pcnl);

                        if (recordInfo.get('medAdminFeeAmt') == '0' && !recordInfo.get('allowMedAdminFee')) {
                            me.getView().down('#medAdminFeeAmt').setValue('');
                        }


                    }
                });

            }

            })
        }
        })
    },

    onEditClick: function (button) {
        var me = this;
        me.getViewModel().set('isEditing', true);
        me.enableDisableDataEntry(false);

    },

    onCancelClick: function (button) {
        var me = this;
        Ext.Msg.show({
            title: 'Cancel?',
            message: 'Cancel your changes?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.repopulateGroupDetails();
                } else {
                    console.log('No pressed');
                }
            }
        });


    },

    onSaveClick: function (button) {
        var me = this,
            form = this.getView().down('form'),
            values = form.getValues();

        if(form.isValid()) {

            Ext.Msg.show({
                title: 'Save Changes?',
                message: 'Would you like to save your changes?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,

                fn: function (btn) {
                    if (btn === 'yes') {
                        me.performSave();

                    } else {
                        console.log('No pressed');
                    }
                }
            });
        }
        else
        {
            Ext.MessageBox.alert("PBM","Please fill all required fields.");
        }


    },

    onLOBSelected : function(combo,record) {
        var me=this,
            storePCN = this.getViewModel().get('pcndetails'),
            carrierAcctNumber ='';

        if(this.getViewModel().get('isNewPlanGroupRecord')) {

            var comboCarrierAcctNumber = this.lookupReference('carrierAcctNumber');

            if(comboCarrierAcctNumber!=null && comboCarrierAcctNumber.value !=null )
                carrierAcctNumber = comboCarrierAcctNumber.value;

            var newCarrierid = me.getViewModel().get('newCarrierid');
            var newCarrierName = me.getViewModel().get('newCarrierName');

            storePCN.getProxy().setExtraParam('pBatchSize', 0);
            storePCN.getProxy().setExtraParam('pApplyPCNCondition', 'no');
            storePCN.getProxy().setExtraParam('pWhere', 'carrierId = ' + newCarrierid + ' and (carrierAcctNumber = \'' + carrierAcctNumber + '\' or (carrierAcctNumber = \'\' and multiaccount = yes)) and carrierLOBId = ' + record.data.carrierLOBId);
            storePCN.load({
                callback: function (recorddata2, operation2, success) {
                    me.getView().down('#cbPcnCodeList').bindStore(me.getViewModel().get('pcndetails')) ;
                }
            });
        }
        //debugger;
        var cmsplanType = this.lookupReference('CMSPlanType');
        if(record.get("carrierLOBId") == 2 )
        {
            cmsplanType.clearInvalid();
            cmsplanType.allowBlank = false;

            if(!cmsplanType.value)
            {
                cmsplanType.markInvalid('');
            }
        }
        else
        {
            cmsplanType.clearInvalid();
            cmsplanType.allowBlank = true;
        }
    },


    performSave: function()
    {
        var me = this,
            form = this.getView().down('form'),
            values = form.getValues(),
            url = Atlas.apiURL + 'plan/rx/plangroupinfo/update',
            record = this.getViewModel().get('masterRecord');

        if(values && values['formularyId'] && values['exclFormularyId'])
        {
            if( values['formularyId'] == values['exclFormularyId']) {
                Ext.MessageBox.alert("","Excluded Formulary can not be same as Plan Formulary.");
                return false;
            }
        }

        if(values && values['effDate'] && values['termDate'])
        {
            if( values['termDate'] < values['effDate']) {
                Ext.MessageBox.alert("PBM","Termination Date must be after or equal to effective date.");
                return false;
            }
        }

        var planGroupId = null;
        if(!this.getViewModel().get('isNewPlanGroupRecord'))
            planGroupId = me.getViewModel().get('masterRecord.plangroupId') || values['planGroupId'];
        else
            record = Ext.create('Atlas.plan.model.PlanGroupInfo');
        var params = me.generateParams(record, values);

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        if(!this.getViewModel().get('isNewPlanGroupRecord'))
        {
            params['pPlanGroupId'] = record.get(record.getIdProperty());
        }
        else
        {
            params['pPlanGroupId'] = 0;
        }

        var saveData = Atlas.common.utility.Utilities.saveData([], 'plan/rx/plangroupinfo/update', null, [false], params,
            saveAction, ['pDataAccessStatus','pRetPlanGroupId']);

        if(saveData!=null && saveData.message =="Successful") {


            me.getViewModel().set('isEditing', false);

            if (this.getViewModel().get('isNewPlanGroupRecord')) {

                if(values!=null)
                {
                    values['planGroupId'] = saveData.pRetPlanGroupId;
                }
                params['pPlanGroupId'] = saveData.pRetPlanGroupId;

                record = me.assignRecordvalue(record,values);
                record.id = saveData.pRetPlanGroupId;
                record.data.planGroupId = saveData.pRetPlanGroupId;
                values['planGroupId'] = saveData.pRetPlanGroupId;
                me.getViewModel().set('masterRecord', record);

                if(me.getViewModel().get('masterRecord.plangroupId') == null)
                {
                    me.getViewModel().set('masterRecord.plangroupId') === saveData.pRetPlanGroupId;
                }

            }

            if (record && !this.getViewModel().get('isNewPlanGroupRecord')) {
                form.updateRecord(record);
            }

            //me.fireEvent('groupUpdated', record.get(record.getIdProperty()));

            var planGroupCombo =  me.getView().up('plan-groups').lookupReference('plangroup');

            if(planGroupCombo!=null) {

                if(this.getViewModel().get('isNewPlanGroupRecord'))
                {
                    // var plangroups = this.getView().up('plan-groups').getViewModel().get('plangroups');
                    // if(plangroups!=null)
                    //     plangroups.load();

                    this.getViewModel().set('newPlanId', params['pPlanGroupId']);
                }
                else {
                    planGroupCombo.getStore().load();
                }

                var planGroupName = this.lookupReference('planGroupName');

                var selectedItem = planGroupCombo.getStore().findRecord('planGroupId', params['pPlanGroupId'],0,false,true,true);
                if(selectedItem!=null) {
                    planGroupCombo.setValue(params['pPlanGroupId']);
                    planGroupCombo.fireEvent('select', planGroupCombo, selectedItem);
                    if(planGroupName!=null)
                        planGroupCombo.setRawValue(planGroupName.getRawValue());
                }
            }
            if(this.getViewModel().get('isNewPlanGroupRecord'))
                me.getViewModel().set('isEditing', true);

            if (this.getViewModel().get('isNewPlanGroupRecord')) {
                me.getViewModel().set('isNewPlanGroupRecord', false);
                me.showUserGroup();
            }
            else
            {
                Ext.MessageBox.alert("PBM","Plan group saved!");
            }



        }
        // else if(saveData!=null && saveData.message !="Successful") {
        //
        //     Ext.MessageBox.alert("PBM- Error",saveData.message);
        //
        // }

        if(saveData && saveData.code != 0)
        {
            Ext.MessageBox.alert('Failure', saveData.message, this.showResult, this);
        }

    },

    showUserGroup : function(){
        var userGrpWin = Ext.create('Ext.window.Window', {
            width : 300,
            height : 500,
            title : 'Assign User Groups',
            layout : 'fit',
            tools: false,
            closable: false,
            onEsc: function() {
                return false;
            },
            items : [
                {
                    xtype : 'panel',
                    layout : 'fit',
                    items : [
                        {
                            xtype : 'grid',
                            reference : 'userGrpWinRef',
                            selModel: {
                                selType: 'checkboxmodel',
                                mode   : 'MULTI'
                            },
                            bind : {
                                store: '{planusergroup}'
                            },
                            columns : [
                                {
                                    text : 'Group Name',
                                    dataIndex : 'groupName',
                                    flex : 1
                                },
                                {
                                    text : 'Group Id',
                                    hidden : true,
                                    dataIndex : 'groupId'
                                }
                            ]
                        }
                    ]
                }
            ],
            bbar : [
                '->',
                {
                    iconCls: 'x-fa fa-floppy-o',
                    text : 'Save',
                    handler : 'onSelectUserGrps'
                }
            ]
        });
        this.getView().add(userGrpWin);
        userGrpWin.show()
    },

    onSelectUserGrps : function(btn, item) {
        var me = this,
            grid = me.lookupReference('userGrpWinRef'),
            selected = grid.getSelectionModel().getSelected().items,
            selGroupIds =[];


        var planGroupId = me.getView().getViewModel().get('masterRecord').data.planGroupId;

        for (var i = 0; i < selected.length; i++){
            selGroupIds.push(selected[i].get('groupId'));
        }

        if(selGroupIds.length >0 &&  planGroupId > 0) {
            var groups = selGroupIds.join(',');

            var params = {
                pSessionID: Atlas.user.sessionId,
                pGroupIDList: groups,
                pPlanGroupId: planGroupId
            };

            var testReturn = Atlas.common.utility.Utilities.post('plan/rx/plangroupdataaccess/update', params,null);

            // Ext.MessageBox.alert("PBM","Plan group saved!");


            this.getViewModel().set('isEditing', false);
            this.getViewModel().set('canEdit', true);
            this.getViewModel().set('canActivate',true);
            this.onLoadPlanGroups();
            btn.up('window').close();
        }
        else if(selGroupIds.length == 0)
        {
            Ext.MessageBox.alert("PBM","Please select a user group!");
        }
    },


    onLoadPlanGroups: function(){
        var me = this,
            planGroupName = me.lookupReference('planGroupName'),
            planGroupCombo = me.getView().up('plan-groups').lookupReference('plangroup'),
            plangroups = this.getView().up('plan-groups').getViewModel().get('plangroups'),
            planGroupId = this.getViewModel().get('newPlanId');

        if(plangroups!=null)
            plangroups.reload
            ({
                callback: function (recordInfo, operation, success) {

                    var selectedItem = planGroupCombo.getStore().findRecord('planGroupId', planGroupId,0,false,true,true);
                    if(selectedItem!=null) {
                        planGroupCombo.setValue(planGroupId);
                        planGroupCombo.fireEvent('select', planGroupCombo, selectedItem);
                        if(planGroupName!=null)
                            planGroupCombo.setRawValue(planGroupName.getRawValue());
                    }
                    else
                    {
                        planGroupCombo.setValue(planGroupId);
                        planGroupCombo.setRawValue(planGroupName.getRawValue());

                    }
                    Ext.MessageBox.alert("PBM","Plan group saved!");
                }
            });
    },



    updatePlanGroupStatus:function(status) {
        var me = this,
            form = this.getView().down('form');

        if(!form)
            form = me.getView().parentWindow.getViewModel().getView().down('form');

        var values = form.getValues(),
            url = Atlas.apiURL + 'plan/rx/plangroupinfo/update',
            pValues = '',
            modeParams,
            params = {
                pSessionID: Atlas.user.sessionId,
                // pAction: record.crudState = 'R' ? 'U' : 'A', //if reading a record then we're updating otherwise adding
                pFieldlist: 'planGroupStatus',
                pFields: status
            },
            record = this.getViewModel().get('masterRecord'),
            planGroupId = this.getViewModel().get('masterRecord.planGroupId') || values['planGroupId'];
            params['pPlanGroupId'] = record.get(record.getIdProperty());
            params['pSessionID'] = Atlas.user.sessionId;
            params['pDataAccessStatus'] = status;

        // if (form.isValid() && values) {
        //
        //
        //
        // }
        //form.reset();
        var returnValue = Atlas.common.utility.Utilities.post(
            'plan/rx/plangroupinfo/update',
            params,
            null
        );

        if(returnValue && returnValue.code == 0)
        {
            var planGroupCombo = me.getView().up('plan-groups').lookupReference('plangroup');
            if(planGroupCombo) {
                var planGroupRecord = planGroupCombo.getSelection();
                if(planGroupRecord)
                {
                    planGroupRecord.set('planGroupStatus',status);
                }
            }
            //var planGroupCombo = this.getView().up('plan-groups').lookupReference('plangroup');

            this.onGroupChange(planGroupRecord);

        }
        else
        {
            Ext.MessageBox.alert('Failure', returnValue.message, this.showResult, this);
        }



    },

    /*validateAndUpdatePlanGroup:function(status){
        // debugger;
        var me = this,
            form = this.getView().down('form'),
            values = form.getValues(),
            url = Atlas.apiURL + 'plan/rx/validateplangroup/update',
            record = this.getViewModel().get('masterRecord'),

            params = {
                pSessionID: Atlas.user.sessionId,
                // pAction: record.crudState = 'R' ? 'U' : 'A', //if reading a record then we're updating otherwise adding
                pFieldlist: null,
                pFields: null
            };

        params['pPlanGroupId'] = record.get(record.getIdProperty());
        params['pSessionID'] = Atlas.user.sessionId;
        if (form.isValid() && values) {


            //debugger;

            var returnValue = Atlas.common.utility.Utilities.post(
                'plan/rx/validateplangroup/update',
                params,
                ['errorMessage']
            );


            if(returnValue.code == 0)
            {
                me.updatePlanGroupStatus(status);

                var planGroupStatusCntrl = me.getView().lookupReference('plnGroupStatus');
                if (planGroupStatusCntrl)
                    planGroupStatusCntrl.setValue(status);
                var record = me.getViewModel().get('masterRecord');
                if (record && record.data) {
                    record.data.planGroupStatus = status;
                }

                me.getViewModel().set('canEdit', true);
                me.getViewModel().set('canActivate', false);
                me.getViewModel().set('canDeactivate', true);
                me.getViewModel().set('isEditing', false);
                me.enableDisableDataEntry(true);

            }
            else {

                if (returnValue.code == 2) {
                    me.getViewModel().set('isWarning', true);
                    me.getViewModel().set('errorScreenText', 'Click Ok to activate the plan group or click Cancel to make any changes.');

                }
                else {
                    me.getViewModel().set('isWarning', false);
                    me.getViewModel().set('errorScreenText', 'Please fix all the errors before activating the plan group.');
                }

                var validationerrorinformation = me.getViewModel().get('validationerrorinformation');
                if(returnValue !=null && returnValue.data !=null)
                {
                    validationerrorinformation.loadData(validationResult.data);
                    me.getViewModel().set('isMaximized', false);
                    me.showValidationResult();
                }
            }


            // if(returnValue && returnValue.code != 0)
            // {
            //     Ext.MessageBox.alert('Failure', returnValue.message, this.showResult, this);
            // }


        }

    },*/

    validateAndUpdatePlanGroup:function(status){
        // debugger;
        var me = this,
            form = this.getView().down('form'),
            values = form.getValues(),
            record = this.getViewModel().get('masterRecord');
        // if (form.isValid() && values) {
        //
        //
        //
        // }

        var validationErrorInformation = me.getView().up().getViewModel().getStore('validationerrorinformation');

        validationErrorInformation.getProxy().setExtraParam('pPlanGroupId', record.get(record.getIdProperty()));

        validationErrorInformation.load({
            callback: function (records, operation, success) {

                var validationResult =  Ext.decode(operation._response.responseText);

                if(validationResult!=null && validationResult.message!=null
                    &&validationResult.message[0].code !=null && validationResult.message[0].code !=0)
                {
                    if(validationResult.message[0].code == 0)
                    {
                        me.updatePlanGroupStatus(status);

                        var planGroupStatusCntrl = me.getView().lookupReference('plnGroupStatus');
                        if (planGroupStatusCntrl)
                            planGroupStatusCntrl.setValue(status);
                        var record = me.getViewModel().get('masterRecord');
                        if (record && record.data) {
                            record.data.planGroupStatus = status;
                        }

                        me.getViewModel().set('canEdit', true);
                        me.getViewModel().set('canActivate', false);
                        me.getViewModel().set('canDeactivate', true);
                        me.getViewModel().set('isEditing', false);
                        me.enableDisableDataEntry(true);

                    }
                    else {

                        if (validationResult.message[0].code == 2) {
                            me.getViewModel().set('isWarning', true);
                            me.getViewModel().set('errorScreenText', 'Click Ok to activate the plan group or click Cancel to make any changes.');

                        }
                        else {
                            me.getViewModel().set('isWarning', false);
                            me.getViewModel().set('errorScreenText', 'Please fix all the errors before activating the plan group.');
                        }

                        if(records  && records.length > 0 )
                        {
                            me.getViewModel().set('isMaximized', false);
                            me.showValidationResult();
                        }
                    }
                }
            }});

    },

    generateParams: function (record, formvalues) {
        var recordFields = record.getFields(),
            recordFieldList = record.getProxy()['updateList'],
            recordFieldListArray = [],
            tempFields = [],
            values = [],
            params = {
                pSessionID: Atlas.user.sessionId,
                // pAction: record.crudState = 'R' ? 'U' : 'A', //if reading a record then we're updating otherwise adding
                pFieldlist: null,
                pFields: null
            };
        if (recordFieldList) {
            recordFieldListArray = recordFieldList.split(',');
            //looping though model proxy extraparams fieldlist
            for (var i = 0; i < recordFieldListArray.length; i++) {
                tempFields.push(recordFieldListArray[i]);


                if(recordFieldListArray[i] == 'PayNonPartDIngredients' ||
                    recordFieldListArray[i] == 'allowMedAdminFee' ||
                    recordFieldListArray[i] == 'allowMemberLocks' ||
                    recordFieldListArray[i] == 'asthmaHEDISAlert' ||
                    recordFieldListArray[i] == 'licsSubsidy' ||
                    recordFieldListArray[i] == 'passThroughPricing' ||
                    recordFieldListArray[i] == 'processMTMCase' ||
                    recordFieldListArray[i] == 'processMAPCase' ||
                    recordFieldListArray[i] == 'useAllowedPrescribers'||
                    recordFieldListArray[i] == 'includeNonPartDOnPDE' ||
                    recordFieldListArray[i] == 'exclPHIInReports' ||
                    recordFieldListArray[i] == 'mandatoryGeneric')
                {
                    if(formvalues[recordFieldListArray[i]])
                    {
                        values.push('yes');
                    }
                    else {
                        values.push('no');
                    }

                }
                else if( recordFieldListArray[i]== 'medAdminFeeAmt' )
                {
                var medamount = formvalues[recordFieldListArray[i]];
                    if(medamount)
                    {
                        values.push(medamount);
                    }
                    else
                    {
                        values.push('0');
                    }

                }
                else {
                    values.push(formvalues[recordFieldListArray[i]]);
                }



            }
        }
        params.pFieldlist = tempFields.join();
        params.pFields = values.join('|');


        return params
    },

    onActivateClick: function(){
        // debugger;
        var me = this;
        Ext.Msg.show({
            title: 'Activate Plan Group?',
            message: 'Are you sure you want to activate the plan group?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,

            fn: function (btn) {

                if (btn === 'yes') {
                    // me.performSave();
                    // var form = me.getView().down('form');
                    // if (form)
                    // {
                    //     form.reset();
                    // }
                    me.validateAndUpdatePlanGroup('A');
                }
                else {
                    console.log('No pressed');
                }
            }
        });

    },

    onDeactivateClick: function(){

        var me = this;
        Ext.Msg.show({
            title: 'Deactivate Plan Group?',
            message: 'Are you sure you want to deactivate the plan group?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,

            fn: function (btn) {
                if (btn === 'yes') {
                    me.enableDisableDataEntry(false);
                    var status = 'I';
                    //me.performSave();
                    // var form = me.getView().down('form');
                    // if (form)
                    // {
                    //     form.reset();
                    // }

                    me.updatePlanGroupStatus(status);

                    var planGroupStatusCntrl = me.getView().lookupReference('plnGroupStatus');
                    if (planGroupStatusCntrl)
                        planGroupStatusCntrl.setValue(status);
                    var record = me.getViewModel().get('masterRecord');
                    if (record && record.data) {
                        record.data.planGroupStatus = status;
                    }

                    me.getViewModel().set('canEdit', false);
                    me.getViewModel().set('canActivate', true);
                    me.getViewModel().set('canDeactivate', false);
                    me.getViewModel().set('isEditing', true);
                    me.enableDisableDataEntry(false);

                }
                else {
                    console.log('No pressed');
                }
            }
        });


    },

    onPharmanetworkChange: function (combo, newValue, oldValue) {

        var me = this,
            form = this.getView().down('form'),
            store = this.getViewModel().get('nonpharmanetworks');
        if (store) {
            store.clearFilter();

            store.filterBy(function (srecord) {
                if(newValue > 0)
                    return srecord.get('NetworkID') != newValue && !!newValue;
                else
                    return srecord;
            });

        }
    },

    onNonPharmanetworkChange: function (combo, newValue, oldValue) {
        var me = this,
            form = this.getView().down('form'),
            store = this.getViewModel().get('pharmanetworks');
        if (store) {
            store.clearFilter();
            store.filterBy(function (srecord) {
                if(newValue > 0)
                    return srecord.get('NetworkID') != newValue && !!newValue;
                else
                    return srecord;

            });
        }
    },
    onBenefitItemdblclick: function (grid, record) {
        var me = this;
        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');

        menuId = Atlas.common.Util.menuIdFromRoute('merlin/plan/Benefits');
          /*  node = me.getView().up('merlinworkspace').getViewModel().get('menuitems').findNode('route','merlin/plan/Benefits'),
            client = me.getView().atlasClient,
            route = node.get('route') || node.get('routeId'),
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle'),
            atlasId = record.get('planBenefitId');*/
        record.data.planGroupId =this.getViewModel().get('masterRecord').data.planGroupId;

        me.fireEvent('openView','merlin','plan','Benefits', {
            ID: menuId,
            PlanBenefitID: record.data.planBenefitId,
            BenefitName: record.data.benefitName,
            PlanGroupID: this.getViewModel().get('masterRecord').data.planGroupId,
            plangroupRecord: record,
            keyValue: '0',
            openView: true,
            /*routeId: route + '/' + atlasId,
            parentMenuId: parentMenuId,*/
            menuId: menuId,
            title: 'Plan Benefit Setup',
            atlasId: record.data.planBenefitId,
            benefitRecord : record,
            atlasRecord:atlasRecord
        });


        // me.fireEvent('openView','merlin','letter','CreateEditLetter', {
        //     ID: menuId,
        //     LetterID: rec.data.LetterID,
        //     LetterType: rec.data.LetterName,
        //     keyValue: '0',
        //     openView: true
        // });
    },

    enableDisableDataEntry:function (value) {
        var containerOne = this.lookupReference('container1');
        if(containerOne!=null && containerOne.items) {

            containerOne.items.each(function(item1, index,length)
                {
                    if(item1.xtype != 'container')
                        item1.setReadOnly(value);
                }
            )
        }
        var containerTwo = this.lookupReference('container2');

        if(containerTwo!=null && containerTwo.items) {

            containerTwo.items.each(function(item2, index,length)
                {
                    if(item2.xtype != 'container')
                        item2.setReadOnly(value);
                }
            )
        }

        var allowMedAdminFee = this.lookupReference('allowMedAdminFee');
        if(allowMedAdminFee)
        {
            allowMedAdminFee.setReadOnly(value);
        }

        var medAdminFeeAmt = this.lookupReference('medAdminFeeAmt');
        if(medAdminFeeAmt)
        {
            medAdminFeeAmt.setReadOnly(value);
        }

    },

    repopulateGroupDetails:function(){
       //debugger;
        var disableFields = true;// needed only for the new record and if we can't find the record in the combo box , else combobox fireevent will take care of it.
        if(this.getViewModel().get('isNewPlanGroupRecord'))
        {
            this.getView().up('plan-groups').getController().setNewPlanFields();
        }
        else
        {
            var planGroupCombo = this.getView().up('plan-groups').lookupReference('plangroup');
            if (planGroupCombo != null) {
                var toSelect = planGroupCombo.getRawValue();
                var groupValue = planGroupCombo.getValue();
                if (groupValue) {
                    disableFields = false;
                    planGroupCombo.select(toSelect);
                    var record = planGroupCombo.getStore().findRecord('planGroupId', groupValue, 0, false, true, true);
                    planGroupCombo.setValue(groupValue);
                    planGroupCombo.setRawValue(toSelect);
                    planGroupCombo.fireEvent('select', planGroupCombo, record);
                }
                else {
                    //this.getView().up('plan-groups').getController().setNewPlanFields();
                }
            }
        }

        if(disableFields)
        {
            this.enableDisableDataEntry(true);

            this.lookupReference('carrierName').setValue('');
            this.lookupReference('carrierName').setRawValue('');

            this.lookupReference('plnGroupStatus').setValue("null");
            this.lookupReference('plnGroupStatus').setRawValue("null");

            this.getViewModel().set('isEditing', false);
            this.getViewModel().set('canActivate', false);
            this.getViewModel().set('isNewPlanGroupRecord', false);
        }

    },

    showValidationResult:function(){
        var me = this,
            win = Ext.create('Ext.window.Window', {
                title: 'Validation Errors',
                height: 800,
                width: 800,
                // parentWindow: me.getView(),
                modal: true,
                layout: 'fit',
                // controller: me, //viewcontroller for the window
                // viewModel: {
                //     parent: me.getViewModel() //windows need to have the VM chain added to them
                // },

                tools:[
                    {
                        type:'maximize',
                        tooltip: 'Maximize',
                        //handler: 'onMaximizeClick',
                        listeners :
                        {
                            click : 'onMaximizeClick'
                        }
                        ,
                        bind: {
                            // hidden: '{!isMaximized}'
                            hidden:true

                        }
                    }
                    ,
                    {
                        type:'restore',
                        tooltip: 'Restore',
                        //handler: 'onRestoreClick',
                        listeners :
                        {
                            click : 'onRestoreClick'
                        }
                        ,
                        bind: {
                            hidden:true
                        }
                    }
                    ],


                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [

                        '->',
                        {
                            xtype: 'button',
                            alignment: 'right',
                            text: 'Ok',
                            handler: 'onAccpetAndActivateWithWarnings',
                            bind:{
                                hidden: '{!isWarning }'
                            }
                        },
                        {
                            xtype: 'button',
                            alignment: 'right',
                            text: 'Cancel',
                            handler: 'onCancelCloseErrorInfo',
                            bind:{
                                hidden: '{!isWarning }'
                            }

                        },
                        {
                            xtype: 'button',
                            alignment: 'right',
                            text: 'Close',
                            handler: 'onCancelCloseErrorInfo',
                            bind:{
                                hidden: '{isWarning }'
                            }

                        }
                    ]
                }],



                items: [
                    {
                        xtype:'gridpanel',
                        scrollable: 'true',
                        layout: 'fit',
                        name : 'erroGrid',
                        //html: '<div class="infoTab">{errorScreenText} </div>',
                        columns:[
                            {text:'Error Type',dataIndex: 'errorCode', width: 100,
                                renderer: function (value) {
                                    if (value == 1) return "Error";
                                    else if (value == 2) return "Warning";
                                    else  return "";
                                }
                            },
                            {text:'Error Message',dataIndex: 'errorMessage',width: 250},
                            {text:'Corrective Action',dataIndex: 'correctiveAction',width: 450}
                        ],


                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [

                                {
                                    xtype: 'displayfield',
                                    bind:{
                                        value: '{errorScreenText }'
                                    }
                                }
                            ]
                        }],

                        bind: {
                            store: '{validationerrorinformation}'
                        }
                    }
                ]
            });

        this.getView().add(win);
        //userGrpWin.show()
        win.show();
    },

    onAccpetAndActivateWithWarnings: function (button) {

        var me = this;
        var status = 'A';
        me.updatePlanGroupStatus(status);

        var planGroupStatusCntrl = me.getView().lookupReference('plnGroupStatus');
        if (planGroupStatusCntrl)
            planGroupStatusCntrl.setValue(status);
        var record = me.getViewModel().get('masterRecord');
        if (record && record.data) {
            record.data.planGroupStatus = status;
        }

        me.getView().getViewModel().set('canEdit', true);
        me.getView().getViewModel().set('canActivate', false);
        me.getView().getViewModel().set('canDeactivate', true);
        me.getView().getViewModel().set('isEditing', false);
        me.enableDisableDataEntry(true);

        button.up('window').close();
    },

    onCancelCloseErrorInfo: function (button) {
        //debugger;
        button.up('window').close();
    },

    onMaximizeClick:function(item, event){
        // debugger;
        var me = this;

        me.getViewModel().set('myXYCoordinate', item.getXY());
        me.getViewModel().set('isMaximized', true);

        item.up('window').setWidth(item.up('window').parentWindow.getWidth());
        item.up('window').setHeight(item.up('window').parentWindow.getHeight());
        item.up('window').setXY(item.up('window').parentWindow.getXY());
    },

    onRestoreClick:function(item, event){
        // debugger;
        var me = this;

        item.up('window').setWidth(800);
        item.up('window').setHeight(800);
        item.up('window').setXY(me.getViewModel().get('myXYCoordinate'));
        me.getViewModel().set('isMaximized', false);

    },
    assignRecordvalue:function(record,values)
    {

        var recordFieldList = record.getProxy()['updateList'],
            recordFieldListArray = [];
        if (recordFieldList) {
            recordFieldListArray = recordFieldList.split(',');
            //looping though model proxy extraparams fieldlist
            for (var i = 0; i < recordFieldListArray.length; i++) {
                record.data[recordFieldListArray[i]] = values[recordFieldListArray[i]];
            }
        }

        return record;

    }

});