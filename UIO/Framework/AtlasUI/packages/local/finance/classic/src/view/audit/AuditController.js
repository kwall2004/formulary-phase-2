Ext.define('Atlas.finance.view.audit.AuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-audit',

    listen: {
        controller: {
            '*': {
                searchaudittakebacks: 'onSearch'
            }
        }
    },

    init: function () {
        var me = this,
            view = me.getView(),
            auditId = view.auditId,
            vm = me.getViewModel();

        vm.getStore('audittakebacks').onAfter('load', 'onLoadAuditTakebacks');
        vm.set('backupAuditId', null);

        if (view) {
            view.down('#btnAddNotes').setDisabled(!view.parentSystemId);
            if (view.parentSystemId) {
                me.getNotes();
            }
        }

        if (auditId !== undefined) {
            me.onSearch(auditId);
        }
    },

    onAdvancedSearch: function () {
        var me = this,
            vm = me.getViewModel(),
            searchWin = this.searchWin;

        if (!me.getView().down('#AuditAdvSearchWindow')) {
            searchWin = Ext.create('Atlas.finance.view.audit.AdvancedSearch', {
                itemId:'AuditAdvSearchWindow',
                //autoShow: true,
                closeAction: 'hide' // Keep window around and don't destroy
            });
        }

        me.getView().add(searchWin);
        me.getView().down('#AuditAdvSearchWindow').show();
    },

    onSearch: function (value) {
        var me = this,
            vm = me.getViewModel();

        if (!value) {
            Ext.Msg.alert('Message', 'Please enter Audit ID');
            return;
        }

        vm.set('auditId', value);
        vm.set('claimsToProcess', []);

        me.searchForTakebacks(value);
        // me.getAuditDetails(value);
    },

    searchForTakebacks: function (value) {
        var me = this,
            vm = me.getViewModel();
        var auditId = value;

        if (auditId == "" || auditId == "0") {
            return;
        }

        var audittakebacks = this.getViewModel().getStore('audittakebacks');

        var myProxy = audittakebacks.getProxy();

        myProxy.setExtraParam('pNcpdpID', '');
        myProxy.setExtraParam('prxNum', '');
        myProxy.setExtraParam('pAuditID', auditId);
        myProxy.setExtraParam('pTransactionID', 0);
        myProxy.setExtraParam('pAdjustTransID', 0);
        myProxy.setExtraParam('pProcessDateFrom', null);
        myProxy.setExtraParam('pProcessDateTo', null);
        myProxy.setExtraParam('pagination', false);

        audittakebacks.load();
    },

    onLoadAuditTakebacks: function(myStore, recs){
        var me = this,
            vm = me.getViewModel(),
            cloneAuditTakebacks = vm.getStore('cloneaudittakebacks');

        if (recs.length === 0){
            Ext.Msg.alert('PBM', 'No records found');
            vm.set('auditId', vm.get('backupAuditId'));
            return;
        }
        vm.set('backupAuditId', vm.get('auditId'));

        me.getView().down('pagingtoolbar').moveFirst();

        Atlas.common.view.GetFilteredStore.getFilteredStore(myStore, [], cloneAuditTakebacks);

        me.getAuditDetails(vm.get('auditId'));
    },

    onColumnBtn:function(btn){
        var me = this,
            record = btn._rowContext.record,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar'),
            atlasId,
          /*  node = me.getView().up('merlinworkspace').getViewModel().get('menuitems').findNode('route','merlin/claims/ClaimsToolbar'),

            menuId = node.get('menuID');*/

        atlasId = btn.getWidgetColumn().text === 'Claim ID' ? record.get('transactionId'): record.get('adjustTransId');

        me.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
            atlasId: atlasId,
            menuId: menuId
        });
    },

    getAuditDetails: function(value){
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();
        var auditId = value;
        if (auditId == "" || auditId == "0")
            return;
        var where = '';
        if (auditId != "")
        {
            where = (where != "" ? where + " and auditId = " + auditId : "auditId = " + auditId);
        }
        var auditdetail = this.getViewModel().getStore('auditdetail');
        auditdetail.getProxy().setExtraParam('pBatchSize', 0);
        auditdetail.getProxy().setExtraParam('pWhere', where);
        auditdetail.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success)
            {
                vm.set('auditdetailrec',record);
                vm.set('ncpdpId', vm.get('auditdetailrec')[0].get('NCPDPID'));
                vm.set('parentSystemId', vm.get('auditdetailrec')[0].get('systemID'));
                me.reloadNotes(vm.get('parentSystemId'));

                theView.down('#assignTo').setValue(vm.get('auditdetailrec')[0].get('assignTo'));

                if(vm.get('auditdetailrec')[0].get('passed') == null){
                    return "";
                }
                else{
                  var passed =  vm.get('auditdetailrec')[0].get('passed').toString().toLowerCase();
                    if(passed == 'yes' || passed == 'y' || passed == 'true' || passed == '1'){
                        theView.down('#passed').setValue('Pass');
                    }
                    else
                        theView.down('#passed').setValue('Fail')
                }

                theView.down('#completeDate').setValue(vm.get('auditdetailrec')[0].get('completeDate'));

                me.getPharmacyDetails(vm.get('ncpdpId'));
            }
        });

    },

    getPharmacyDetails: function (ncpdpId) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel()
            storeAuditPharmacy = vm.getStore('auditpharmacy'),
            storePharmRelationshipDetail = vm.getStore('pharmRelationshipDetail');

        storeAuditPharmacy.on({
            load: function (store, records, success) {
                if (records.length) {
                    vm.set('pharmacymasterrec', records[0].getData());
                }
            },
            scope: me,
            single: true
        });

        storeAuditPharmacy.load({
            params: {
                pKeyValue: ncpdpId,
                pKeyType: "ncpdpid",
                pFieldList: "npi,ncpdpid,deaid,name,locCity,locState,locAddress1,locAddress2,locZip,locCrossStreet,mailAddress1,mailCity,mailState,mailZip,locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactExt,ContactEmail,legalBusinessName"
            }
        });

        storePharmRelationshipDetail.onAfter({
            load: function (storePharmRelatDetail, records, success) {
                var activeContract = false;

                function returnDate(rec, nameOfField){
                    if (rec.get(nameOfField)){
                        return Ext.Date.utcToLocal(rec.get(nameOfField));
                    }
                }
                for (var idx = 0, lengthStore = records.length; idx < lengthStore; idx += 1){
                    var rec = records[idx],
                        excl = rec.get('Excluded'),
                        termDate = returnDate(rec, 'Termdate'),
                        effDate = returnDate(rec, 'EffectiveDate'),
                        pharTermdate = returnDate(rec, 'PharTermdate'),
                        pharEffDate = returnDate(rec, 'PharEffDate');

                    if ((rec.get('contractStatus') === 'Active')
                        && (!excl)
                        && (!pharTermdate)
                        &&(!termDate) || (termDate >= Atlas.common.utility.Utilities.getLocalDateTime().setHours(0, 0, 0, 0))
                        && (effDate <= Atlas.common.utility.Utilities.getLocalDateTime().setHours(0, 0, 0, 0))
                        && (pharEffDate <= Atlas.common.utility.Utilities.getLocalDateTime().setHours(0, 0, 0, 0))){

                        activeContract = true;
                        break;
                    }
                }
                if(activeContract){
                    vm.set('pharmacyContractStatus', '<span class="m-green-color">In Network Active</span>');
                    vm.set('activeContract', true);
                }
                else{
                    vm.set('pharmacyContractStatus', '<span class="m-red-color">No Active Contract</span>');
                    vm.set('activeContract', false);
                }
            },
            scope: me,
            single: true
        });

        storePharmRelationshipDetail.load({
            params: {
                pRowId: '0',
                pRowNum: 0,
                pBatchSize: 0,
                pKeyType: 'NCPDPID',
                pWhere: 'ncpdpid=\'' + ncpdpId + '\'',
                pSort: ''
            }
        });
    },

    onCheckChange: function(chkbx, newVal, oldVal, eOpts){
        var recCloneAuditTakebacks = chkbx._rowContext.record,
            transId = recCloneAuditTakebacks.get('transactionId'),
            vm = this.getViewModel(),
            claimsToProcess = vm.get('claimsToProcess'),
            recAuditTakebacks = vm.getStore('audittakebacks').findRecord('transactionId', transId, 0, false, true, true);
        if (newVal === true){
            var recData = recCloneAuditTakebacks.data,
                tempRec = {
                Processed: recData.selectedItems ? recData.selectedItems : null,
                ErrorReason: null,
                AuditId: parseInt(recData.auditId),
                ScriptId: recData.scriptId ? parseInt(recData.scriptId) : null,
                TransactionId: recData.transactionId ? parseInt(recData.transactionId) : 0,
                takebackType: recData.takebackType,
                takeBackQty: recData.takebackQty ? parseFloat(recData.takebackQty) : 0,
                SystemId: recData.systemID ? parseFloat(recData.systemID) : null,
                takeBackAmount: recData.takebackAmount ? parseFloat(recData.takebackAmount) : 0,
                AdjustTransId: recData.adjustTransId ? parseFloat(recData.adjustTransId) : null
            };

            claimsToProcess.push(tempRec);
            // claimsToProcess.push(recCloneAuditTakebacks);
        }
        else if (newVal === false){
            for (var idx = 0, myLength = claimsToProcess.length; idx < myLength; idx += 1){
                var arrayRec = claimsToProcess[idx];
                if (arrayRec.TransactionId === transId){
                    claimsToProcess.splice(idx, 1);
                    if (myLength - idx > 1){
                        idx = idx - 1;
                    }
                }
            }
        }
    },

    onProcessClick: function (button) {

        var vm = this.getViewModel(),
            claimsToProcess = vm.get('claimsToProcess');
        if(claimsToProcess.length <= 0){
            Ext.Msg.alert('PBM', 'Please select records to be processed. ');
        }
        else {
            Ext.Msg.confirm('PBM',
                'Processing Takebacks will reverse original claims and reprocess amounts with new claim ID’s. Do you wish to continue?',
                function(choice){
                    if (choice === 'yes'){

                        var vm = this.getViewModel(),
                            tempTabVal = {
                                ttPharmacyTakeBackIn: vm.get('claimsToProcess')
                            },
                            saveAction =[{
                                "Save": {"key": '', "value": ''}
                            }],
                            params = {
                                pOutFileName: '',
                                ttPharmacyTakeBackIn: tempTabVal
                        };
                        var processPharmacyTakeback = Atlas.common.utility.Utilities.post('finance/rx/processpharmacytakeback/update',
                            params,
                            ['ttPharmacyTakeBackOut', 'pDocumentType', 'opiResult', 'opcMessage']);
                        if (processPharmacyTakeback.result === 'Succeed'){
                            var storeAuditTbProcessResults = vm.getStore('audittbprocessresults');
                            storeAuditTbProcessResults.loadData(processPharmacyTakeback.data);

                            var takebackProcessingWin = Ext.create('Ext.window.Window', {
                                floating: true,
                                modal: true,
                                closable: true,
                                resizable: true,
                                title: 'Takeback Processing Result',
                                iconCls: 'x-fa fa-file-o',
                                width: 600,
                                height: 400,
                                listeners: {
                                    resize: function(win, width, height, eOpts){
                                        //the page for some reason does not resize the grid, and so this function resizes the grid
                                        win.down('grid').setWidth(width - 4);
                                    }
                                },
                                items: [{
                                    xtype: 'grid',
                                    layout: 'fit',
                                    bind: {
                                        store: '{audittbprocessresults}'
                                    },
                                    columns:{
                                        defaults: {
                                            flex: 2
                                        },
                                        items: [{
                                            text: 'Claim Id',
                                            dataIndex: 'TransactionId'
                                        }, {
                                            text: 'Processed',
                                            dataIndex: 'Processed',
                                            renderer: function(tempVal){
                                                if (tempVal === true){
                                                    return 'Yes';
                                                }
                                                else {
                                                    return 'No';
                                                }
                                            }
                                        }, {
                                            text: 'Process Descr.',
                                            dataIndex: 'ErrorReason',
                                            flex: 4
                                        }, {
                                            text: 'Audit Id',
                                            dataIndex: 'AuditId',
                                            hidden: true
                                        }, {
                                            text: 'Script Id',
                                            dataIndex: 'ScriptId',
                                            hidden: true
                                        }, {
                                            text: 'TB Type',
                                            dataIndex: 'takebackType'
                                        }, {
                                            text: 'TB Qty.',
                                            dataIndex: 'takeBackQty'
                                        }, {
                                            text: 'New Claim Id',
                                            dataIndex: 'AdjustTransId'
                                        }, {
                                            text: 'System Id',
                                            dataIndex: 'SystemId',
                                            hidden: true
                                        }]
                                    }
                                }],
                                bbar: [
                                    '->',
                                    {
                                        text: 'Close',
                                        iconCls: 'x-fa fa-times',
                                        handler: function(closeBtn){
                                            closeBtn.up('window').close();
                                        }
                                    }]
                            });
                            this.getView().add(takebackProcessingWin);
                            takebackProcessingWin.show();

                            this.onSearch(vm.get('auditId'));
                        }
                    }
                    else {
                        return;
                    }
                },
                this);
        }
    },

    onUpdateClick: function (button) {
        var me = this,
            storeAuditTakebacks = me.getViewModel().getStore('audittakebacks'),
            record = button._rowContext.record,
            view= me.getView(),
            svcDateLocalTime = Ext.Date.utcToLocal(new Date(Date.parse(record.get('serviceDate')))),
            takebackDescr = record.get('takebackTypeDescr'),
            tempTakeBackDescr;

        if (takebackDescr === 'Full'){
            tempTakeBackDescr = 'F';
        }
        else if (takebackDescr === 'Partial'){
            tempTakeBackDescr = 'P';
        }
        else{
            tempTakeBackDescr = '';
        }

        view.updateRec = record;
        var updateDetailWin = Ext.create('Ext.window.Window', {
            title: 'Update Takeback Detail',
            floatable: true,
            modal: true,
            draggable: true,
            closable: true,
            height: 575,
            width: 500,
            items: [{
                xtype: 'form',
                height: '100%',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'fieldset',
                    collapsible: true,
                    width: '100%'
                },
                items:[{
                    title: 'Take Back Info',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Takeback Qty',
                        labelWidth: 125,
                        width: '98%',
                        value: record.get('takebackQty')
                    }]
                }, {
                    title: 'Additional Info',
                    defaults: {
                        labelWidth: 125,
                        width: '98%'
                    },
                    items: [{
                        xtype: 'combobox',
                        store: {
                            data: [{
                                type: 'Full',
                                val: 'F'
                            }, {
                                type: 'None',
                                val: ''
                            }, {
                                type: 'Partial',
                                val: 'P'
                            }]
                        },
                        fieldLabel: 'Takeback Type',
                        displayField: 'type',
                        valueField: 'val',
                        forceSelection: true,
                        value: tempTakeBackDescr,
                        listeners: {
                            change: 'onChangeTakebackType',
                            render: 'onChangeTakebackType'
                        }
                    }, {
                        xtype: 'textarea',
                        fieldLabel: 'Takeback Reason',
                        disabled: true,
                        value: record.get('reason')
                    }]
                }, {
                    title: 'Claim Info',
                    defaults: {
                        xtype: 'displayfield',
                        labelWidth: 125,
                        width: '98%'
                    },
                    items: [{
                        fieldLabel: 'Claim ID',
                        value: record.get('transactionId')
                    }, {
                        fieldLabel: 'Service Date',
                        value: Ext.Date.format(svcDateLocalTime, 'm/d/Y')
                    }, {
                        fieldLabel: 'Quantity',
                        value: record.get('qty')
                    }, {
                        fieldLabel: 'Days Supply',
                        value: record.get('daysSupply')
                    }, {
                        fieldLabel: 'Drug Name',
                        value: record.get('medication')
                    }, {
                        fieldLabel: 'Total Amt.',
                        value: record.get('totalAmt')
                    }]
                }],
                bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onSaveUpdateTakebackDetail'
                }, {
                    xtype: 'button',
                    text: 'Close',
                    iconCls: 'x-fa fa-times',
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }]
            }]
        });
        view.add(updateDetailWin);
        updateDetailWin.show();
    },

    onChangeTakebackType: function(cbx){
        var form = cbx.up('form'),
            takebackQty = form.down('[fieldLabel = Takeback Qty]');
        if (cbx.getValue() === 'F'){
            takebackQty.disable();
        }
        else{
            takebackQty.enable();
        }
    },

    onSaveUpdateTakebackDetail: function(btn){
        var me = this,
            form = btn.up('window').down('form'),
            takebackQty = form.down('[fieldLabel = Takeback Qty]').getValue(),
            intTakebackQty = parseInt(takebackQty),
            flagNotNum = false,
            updateRec = me.getView().updateRec,
            auditId = updateRec.get('auditId'),
            scriptId = updateRec.get('scriptId'),
            claimId = updateRec.get('transactionId'),
            pFields = 'takebackQty,takebackAmount,takebackType',
            pValues = takebackQty + '|' + '' + '|' + form.down('combobox').getValue(),
            updateTakebackWin = me.getView().down('[title = Update Takeback Detail]');

        for(var idx = 0, length = takebackQty.length; idx < length; idx = idx + 1){
            if (isNaN(parseInt(takebackQty[idx]))){
                flagNotNum = true;
                break;
            }
        }

        if ((!(takebackQty)) || flagNotNum || (intTakebackQty <= 0)){
            Ext.Msg.alert('Validation Error', 'Please enter a valid quantity');
            return;
        }
        else if ((!auditId ) || (auditId === '0') || (!scriptId) || (scriptId === '0') || (!claimId) || (claimId === '0')){
            Ext.Msg.alert('PBM', 'Invalid takeback record. Save failed');
            return;
        }

        var saveAction = [{
            "Save": {"key": 'mode', "value": 'U'}
        }];
        var params = {
            pAuditId: parseInt(auditId),
            pScriptId: parseInt(scriptId),
            pTransId: parseInt(claimId),
            pAction: 'U',
            pFields: pFields,
            pValues: pValues
        };

        var setPharmacyAuditClaimsExt = Atlas.common.utility.Utilities.saveData([], 'finance/rx/pharmacyauditclaimsext/update', null,[false], params,
            saveAction, null);

        if(setPharmacyAuditClaimsExt.code === 0){
            Ext.Msg.alert('PBM', 'Successfully updated takeback details');
            me.onSearch(auditId);
            updateTakebackWin.close();
        }
        else {
            Ext.Msg.alert('PBM', setPharmacyAuditClaimsExt.message);
        }
    },

    onOpenPayment: function (btn) {
        var me = this,
            rec = btn._rowContext.record,
            transId;

        transId = btn.getWidgetColumn().text === 'Total Amt' ? rec.get('transactionId'): rec.get('adjustTransId');

        if (transId !== '0'){
            me.getPaymentDetail(transId);
        }
    },

    getPaymentDetail: function (transId) {
        var vm = this.getViewModel(),
            transactionId = transId;

        var win = Ext.create('Ext.window.Window', {
            title: 'Pricing Detail',
            height: 400,
            width: 600,
            layout: 'fit',
            modal : true,
            items: [{
                xtype: 'ClaimDetailStatusDrugPricing',
                viewConfig: {
                    stripeRows: true,
                    getRowClass: function (record, index) {
                        var result = "";
                        if (record.data.DESCRIPTION == 'Total Amt Due') {
                            //result = 'disabled-row';
                            result = 'm-red-color';
                        }
                        return result;
                    }
                },
                viewModel: {
                    parent: vm
                },
                dockedItems: [
                    {
                        //TODO this style needs to go into the theme stylesheet, but with all the merge issues, I'm not even going there right now.
                        xtype: 'container',
                        html: "<style>.disabled-row{color: red;}</style>"
                    }
                ]
            }]
        });

        var drugPricing = vm.getStore('drugpricing');
        var claimPricing = vm.getStore('pricing');
        var planPricing = vm.getStore('auditplanpricing');

        claimPricing.getProxy().setExtraParam('pClaimID', transactionId);
        claimPricing.getProxy().setExtraParam('pPlanPricing', 'false');
        planPricing.getProxy().setExtraParam('pClaimID', transactionId);
        planPricing.getProxy().setExtraParam('pPlanPricing', 'true');
        drugPricing.getProxy().setExtraParam('pClaimID', transactionId);

        drugPricing.load({
            callback: function (record, operation) {
                claimPricing.load();
                planPricing.load();
                if (record.length > 0) {
                    var dispensedquantityrecord = drugPricing.findRecord('DESCRIPTION', 'Dispensed Quantity');
                    if (dispensedquantityrecord) {
                        drugPricing.remove(dispensedquantityrecord);
                    }
                }
                else {
                    vm.set('dispensedquantity', '');
                }

            }
        });

        var fieldlist = '@applyPlanPricing';
        var claimmaster = Ext.create('Atlas.common.model.ClaimMasterData');

        claimmaster.getProxy().setExtraParam('pPlanID', 'HPM');
        claimmaster.getProxy().setExtraParam('pTransactionID', transactionId);
        claimmaster.getProxy().setExtraParam('pFieldList', fieldlist);

        claimmaster.load({
            callback: function (record) {
                if (record.get('@applyPlanPricing') === 'True') {
                    vm.set('planpricing', true);
                } else {
                    vm.set('planpricing', false);
                }
            }
        });

        this.getView().add(win).show();
    },

    //---------------------------------------------- Notes section
    getNotes: function () {
        var view = this.getView();
        if (view) {
            var parentSystemId = view.parentSystemId;
            view.down('#btnUpdateNotes').setDisabled(true);
            view.down('#btnDeleteNotes').setDisabled(true);
            var storeNotes = this.getViewModel().getStore('auditnotes');
            storeNotes.getProxy().setExtraParam('pParentSystemID', parentSystemId);
            storeNotes.getProxy().setExtraParam('pagination', true);
            // view.down('#gpNotes').down('pagingtoolbar').moveFirst();
            storeNotes.load({
                scope: this,
                callback: function (records, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            if (objResp.data.length > 0) {
                                objResp.data.forEach(function(item,index){
                                    item.CreateDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(item.CreateDate, 'm/d/Y');
                                });
                                Ext.defer(function () {
                                    view.down('#gpNotes').getSelectionModel().select(0);
                                }, 300);
                            }
                        }
                    }
                }
            });
        }
    },

    onPageChangeNotes:function(pagingTb, pageInfo, eOpts){
        var storeAuditNotes = this.getViewModel().getStore('auditnotes');

        for (var idx = 0, myLength = storeAuditNotes.getCount(); idx < myLength; idx = idx + 1){
            var rec = storeAuditNotes.getAt(idx);
            rec.set('CreateDate', Ext.Date.utcToLocal(rec.get('CreateDate')));
        }
        storeAuditNotes.commitChanges();
    },

    onAddNotes: function () {
        var view = this.getView(),
            user = Atlas.user.un,
            winAddNotes = Ext.create(winNotes),
            today =Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');
        winAddNotes.show();
        view.add(winAddNotes);
        view.down('#noteUser').setValue(user);
        view.down('#noteDate').setValue(today);
        view.down('#btnSave').setText('Add');
        view.down('#winNotes').setTitle('Add');
    },

    onUpdateNotes: function (btnUpdate) {
        var view = this.getView(),
            vm = this.getViewModel(),
            user = Atlas.user.un,
            winUpdateNotes = Ext.create(winNotes),
            today = Ext.Date.format(new Date(), 'm/d/Y'),
            panelNotes = view.down('finance-audit-notes'),
            selRec = panelNotes.down('grid').getSelection()[0],
            createDate = Ext.util.Format.date(selRec.get('CreateDate')),
            btnSave = winUpdateNotes.down('#btnSave');

        view.add(winUpdateNotes);
        view.down('#noteDate').setValue(createDate);
        view.down('#noteUser').setValue(selRec.get('CreateUser'));
        view.down('#btnSave').setText('Update');
        view.down('#winNotes').setTitle('Update');
        view.down('#txtDesc').setValue(vm.get('selectedNoteRecord').get('Note'));
        view.down('#txtSbj').setValue(vm.get('selectedNoteRecord').get('Subject'));

        if ((today === createDate) && (user === selRec.get('CreateUser'))){
            btnSave.enable();
        }
        else{
            btnSave.disable();
        }

        winUpdateNotes.show();
    },

    onDeleteNotes: function () {
        Ext.Msg.confirm('Delete', 'Are you sure you would like to delete selected note?', function (btn) {
            if (btn == 'yes') {
                var saveAction = [{"Save": {"key": "pMode", "value": "D"}}];
                var systemID = parseFloat(this.getViewModel().get('selectedNoteRecord').get('SystemID'));
                this.setNotes(systemID, '', '', saveAction);
            }
        }, this);
    },

    winNotesSave: function () {
        var saveAction = '',
            seconds = 0,
            systemID = 0,
            view = this.getView(),
            vm = this.getViewModel(),
            parentSystemId = parseFloat(view.parentSystemId),
            pFieldList = 'ParentSystemID,Subject,Note,CreateUser,CreateDate';
        if (view.down('#winNotes').getTitle() == 'Add') {
            saveAction = [{"Save": {"key": "pMode", "value": "A"}}];
        }
        else if (view.down('#winNotes').getTitle() == 'Update') {
            saveAction = [{"Save": {"key": "pMode", "value": "U"}}];
            systemID = vm.get('selectedNoteRecord').get('SystemID');
        }
        var pFieldValues = parseFloat(parentSystemId) + "|" + view.down('#txtSbj').getValue() + "|" + view.down('#txtDesc').getValue() + "|" + view.down('#noteUser').getValue() + "|" +Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(), 'm/d/Y');
        this.setNotes(systemID, pFieldList, pFieldValues, saveAction);
        if (view.down('#winNotes')) {
            view.down('#winNotes').close();
        }
    },

    setNotes: function (systemID, pFieldList, pFieldValues, saveAction) {
        var extraParameters = {
            psystemId: systemID,
            pFieldList: pFieldList,
            pFields: pFieldValues
        };
        var saveNotesData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], extraParameters,
            saveAction, null);
        if (saveNotesData.code != 0) {
            Ext.Msg.alert('Error', saveNotesData.message);
        }
        this.getNotes();
    },

    onGridRowSelect: function (me, record, tr, rowIndex, e, eOpts) {
        var btnDate = this.getView().down('#btnDeleteNotes'),
            dateToday = Atlas.common.utility.Utilities.getLocalDateTime();
        this.getView().down('#btnUpdateNotes').setDisabled(false);
        if ((Atlas.user.un === record.get('CreateUser')) && (Ext.util.Format.date(dateToday, 'm/d/Y') === Ext.util.Format.date(record.get('CreateDate'), 'm/d/Y'))){
            btnDate.setDisabled(false);
        }
        else{
            btnDate.setDisabled(true);
        }
        this.getViewModel().set('selectedNoteRecord', record);
    },

    winNotesClose: function () {
        this.getView().down('#winNotes').close();
    },

    reloadNotes: function (parentSystemId) {
        var view = this.getView();

        if (view) {
            view.parentSystemId = parentSystemId;
            view.down('#btnAddNotes').setDisabled(!view.parentSystemId);
            if (view.parentSystemId) {
                this.getNotes();
            }
        }
    },

    renderSvcDate: function(val){
        var arrayVal = val.split('-');

        return arrayVal[1] + '/' + arrayVal[2] + '/' + arrayVal[0];
    }
});

var winNotes = Ext.create('Ext.window.Window', {
    itemId: 'winNotes',
    height: 230,
    width: 300,
    layout: 'vbox',
    modal: true,
    items: [
        {xtype: 'textfield', itemId: 'txtSbj', fieldLabel: 'Subject'},
        {xtype: 'textarea', itemId: 'txtDesc', fieldLabel: 'Description'}
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {xtype: 'button', itemId: 'btnSave', handler: 'winNotesSave'},
                {xtype: 'button', text: 'Cancel', handler: 'winNotesClose'}
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {xtype: 'displayfield', itemId: 'noteDate'}, '-',
                {xtype: 'displayfield', itemId: 'noteUser'}
            ]
        }
    ]
});