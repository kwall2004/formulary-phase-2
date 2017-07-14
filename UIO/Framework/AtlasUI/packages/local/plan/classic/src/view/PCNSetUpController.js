/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.view.PCNSetUpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-planpcnsetup',

    listen: {
        controller: {
            '*': {
                selectPcnCode: 'onPCNCodeSelected',
                loadPCNGrid: 'onLoadPCNGrid'
            }
        }
    },

    init: function () {
        //debugger;
        var me = this,
            storeCarrier = this.getViewModel().getStore('carriers'),
            storeAccount = this.getViewModel().getStore('pcnaccounts'),
            storeLob = this.getViewModel().getStore('lobs'),
            storePCN = this.getViewModel().getStore('pcnsetups');
           // storePlanlineofbusiness = me.getViewModel().get('planlineofbusiness');
        

        var canEdit = true;
        this.getViewModel().set('canEdit', true);
        this.getViewModel().set('isEditing', false);
        this.lookupReference('pcnruledetailgridRef').setDisabled(true);
          storeCarrier.load();
         storeAccount.removeAll();
         storeLob.removeAll();
        storePCN.removeAll();
       // storePCN.load();
        //storePlanlineofbusiness.load();

    },

    onCarrierChange: function (combo, record) {
        if (!record) {return false;}

        this.lookupReference('deletePCNCode').setDisabled(true);
        var carrierId = this.lookupReference('carrierId').getValue(),
         cboAccount = this.lookupReference('account'),
         cboLOB = this.lookupReference('lob');
        var me = this,
        storeAccounts = this.getViewModel().get('pcnaccounts');
        storeAccounts.getProxy().setExtraParam('pWhere', 'carrierId=' + carrierId);
        storeAccounts.load();
        cboAccount.bindStore(storeAccounts);

        var storePCN = this.getViewModel().getStore('pcnsetups');
        storePCN.removeAll();//loadData([],false);

        var storelobs = this.getViewModel().get('lobs');
        storelobs.getProxy().setExtraParam('pWhere', 'carrierId=' + carrierId);
        storelobs.load();
        cboLOB.bindStore(storelobs);


        var storePCNRuleDetails = this.lookupReference('pcnruledetailgridRef').getStore();
        storePCNRuleDetails.removeAll();
        me.getView().down('[text=Add]').disable();
        me.getView().down('[text=Save]').disable();
    },

    onAccountChange: function (combo, record) {
        if (!record) {
            return false;
        }
        this.lookupReference('deletePCNCode').setDisabled(true);
        var carrierId = this.lookupReference('carrierId').getValue();
        var account = this.lookupReference('account').getValue();
        var lob = this.lookupReference('lob').getValue();
        var me = this;

        if(lob!=null && account!=null ) {
            this.fireEvent('loadPCNGrid', carrierId,
                account, lob);
        }

            me.getView().down('[text=Add]').disable();
            me.getView().down('[text=Save]').disable();

        var storePCNRuleDetails = this.lookupReference('pcnruledetailgridRef').getStore();
        storePCNRuleDetails.removeAll();

    },

    onLobChange: function (combo, record) {
        if (!record) {
            return false;
        }
        this.lookupReference('deletePCNCode').setDisabled(true);

        var carrierId = this.lookupReference('carrierId').getValue();
        var account = this.lookupReference('account').getValue();
        var lob = this.lookupReference('lob').getValue();
        var me = this;
        if(lob!=null && account!=null ) {
            this.fireEvent('loadPCNGrid', carrierId,
                account, lob);
        }

            me.getView().down('[text=Add]').disable();
            me.getView().down('[text=Save]').disable();

        var storePCNRuleDetails = this.lookupReference('pcnruledetailgridRef').getStore();
        storePCNRuleDetails.removeAll();

    },
    onAdd: function () {
        var me=this;
        var winModel = Ext.create('Atlas.plan.model.PlanPCNsetup', {
            carrierId: this.lookupReference('carrierId').getValue(),
            carrierName: this.lookupReference('carrierId').getRawValue(),
            carrierAcctNumber: this.lookupReference('account').getValue(),
            carrierAcctName: this.lookupReference('account').getRawValue(),
            carrierLOBId: this.lookupReference('lob').getValue(),
            carrierLOBName: this.lookupReference('lob').getRawValue()
        });

        var addPCNwin = Ext.create('Atlas.plan.view.AddPCN', {
                grid: this.lookupReference('PCNSetUpGrid'),
                viewModel: {
                    parent: me.getViewModel()
                },

                winModel: winModel

            }
        );
        me.getView().add(addPCNwin).show();
        addPCNwin.down('form').loadRecord(winModel);
    },
    onCancelClick: function () {
        this.getView().destroy();
    },
    onPCNCodeSelect: function (grid, record, index, eOpts) {

        this.lookupReference('deletePCNCode').setDisabled(false);
        this.fireEvent('selectPcnCode', record);
    },

    onPCNCodeSelected: function (record) {

        this.lookupReference('pcnruledetailgridRef').setDisabled(false);

    },
    getplanPCNSetUpGrid: function () {
       // debugger;
        var grid = this.lookupReference('PCNSetUpGrid');
         if (grid) {
            return grid.getSelection()[0];
        }
    },

    onDeletePCN: function () {

        //debugger;
        var me = this,
            record = this.getplanPCNSetUpGrid();

        if(record !=null) {

            Ext.Msg.show({
                title: 'Delete',
                message: 'Are you sure you want to delete selected PCN Details?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,

                fn: function (btn) {
                    // debugger;
                    if (btn === 'yes') {
                        var fmtParms = me.generateParams(record);

                        var testReturn = Atlas.common.utility.Utilities.post('claims/rx/pcnmaster/update', fmtParms, null);
                        if(testReturn!=null ) {

                            if(testReturn.message =="Successful") {
                                Ext.MessageBox.alert("PBM", "PCN Details Sucessfully Deleted!");
                                me.getView().down('#pcnruledetailgridRef').getStore().removeAll();
                            }
                            else
                            {
                                Ext.MessageBox.alert("PBM - Error", testReturn.message);
                            }
                        }
                        var myStore = me.getView().getViewModel().getStore('pcnsetups');
                        myStore.load();
                    }
                }
            });
        }



    },

    generateParams: function (inRecord) {

        // debugger;
        if (inRecord == null)
            return null;
        var values = [],
            params = {
                pSessionID: Atlas.user.sessionId,
                pPCNCode: inRecord.data.pcnCode,
                pCarrierId: inRecord.data.carrierId,
                pCarrierAcctNumber: inRecord.data.carrierAcctNumber,
                pCarrierLOBId: inRecord.data.carrierLOBId,
                pAction: 'D',
                pFields: 'pcnDesc,BIN,carrierAcctNumber,multiAccount,DMRCustCode,DMRlobname'

            };

        values.push(inRecord.data.pcnDesc);
        values.push(inRecord.data.BIN);
        values.push(inRecord.data.carrierAcctNumber);
        values.push(inRecord.data.multiAccount);
        values.push(inRecord.data.dmrCustCode);
        values.push(inRecord.data.dmrLobName);

        params.pValues = values.join('|');

        return params
    },

    onPCNCodedblClick: function (grid, record, tr, rowIndex, e, eOpts) {
        // debugger;

        var me = this,
            record = this.getplanPCNSetUpGrid();

        var winModel = Ext.create('Atlas.plan.model.PlanPCNsetup', {
            carrierId: this.lookupReference('carrierId').getValue(),
            carrierName: this.lookupReference('carrierId').getRawValue(),

            carrierAcctNumber: this.lookupReference('account').getValue(),
            carrierAcctName: this.lookupReference('account').getRawValue(),
            carrierLOBId: this.lookupReference('lob').getValue(),
            carrierLOBName: this.lookupReference('lob').getRawValue(),
            BIN: record.data.BIN,
            pcnCode: record.data.pcnCode,
            pcnDesc: record.data.pcnDesc,
            dmrCustCode: record.data.dmrCustCode,
            dmrLobName: record.data.dmrLobName,
            multiAccount: record.data.multiAccount,
            systemId: record.data.systemID

        });

        var updatePCNwin = Ext.create('Atlas.plan.view.AddPCN', {
                grid: this.lookupReference('PCNSetUpGrid'),
                viewModel: {
                    parent: me.getViewModel()
                },
                winModel: winModel,
                action: 'update'

            }
        );
        me.getView().add(updatePCNwin).show();

    },
    onLoadPCNGrid: function (carrierId, account, lob) {
        //debugger;

        this.getViewModel().set('isEditing', true);
        var storePCNsetup = this.getViewModel().get('pcnsetups');
        storePCNsetup.getProxy().setExtraParam('pApplyPCNCondition', 'NO');
        storePCNsetup.getProxy().setExtraParam('pBatchSize', 0);
        storePCNsetup.getProxy().setExtraParam('pWhere', 'carrierId = ' + carrierId +
            ' and (carrierAcctNumber = ' + '"' + account + '"' +
            ' or multiAccount = yes)' + 'and carrierLOBId = ' + lob);
       // storePCNsetup.load();
        storePCNsetup.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if(success) {
                    queDescrptGlobal = Ext.decode(operation.getResponse().responseText);
                }
            }

        });
    },
    planDMRLOBRenderer: function (value) {
       // debugger;
        if (value != 0) {
            var plnLobList = this.getViewModel().get('planlineofbusiness');

            if (plnLobList != null) {
                var plnLobItem = plnLobList.findRecord('ListItem', value);
                if (plnLobItem != null) {
                    var plnLobItemName = plnLobItem.get('ListDescription');
                    if (plnLobItemName != null)
                        return plnLobItemName;
                }
            }
        }
        return 'All';
    }

});