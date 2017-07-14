Ext.define('Atlas.finance.view.bank.BankMasterFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-bankmasterform',

    id: 'finance-bankmasterformcontroller',

    init: function () {
        var me = this,
            view = me.getView(),
            storeCbxBank = me.getViewModel().getStore('cbxBank');
        //me.getViewModel().getStore('bankmaster').load();

        if (view.addOrEdit === 'Add'){
        storeCbxBank.onAfter('load', 'onLoadCbxBank');
        }
        else {
            var record = view.recBankAcctMaster,
                btnNotes = view.down('[text = Notes]');

            btnNotes.enable();

            view.loadRecord(record);
        }

        storeCbxBank.getProxy().setExtraParam('pListName', 'Banks');
        storeCbxBank.load();
    },

    onLoadCbxBank: function(storeCbxBank){
        var me = this,
            cbxBank = me.getView().down('[fieldLabel = Bank]');

        if(storeCbxBank.data.count() < 1)
        cbxBank.setValue(storeCbxBank.first().get('value'));

        /*var view = this.getView();
        view.down("#frmcreatededitpharmacy").isValid();*/
        this.lookupReference('bankcodecombo').isValid();
        this.lookupReference('refaccountNum').isValid();
        this.lookupReference('refAcctDescription').isValid();
    },

    onSaveClick: function () {
        var me = this,
            form = me.getView(),
            formVal = form.getValues(),
            fieldList = 'accountNum,AcctDescription,bankCode,companyId,companyName,lastCheckNum,lastEFTnum,originDFI,originId,originName,sungardMemoChecks',
            fields = formVal.accountNum + '|' + formVal.AcctDescription + '|' + formVal.bankCode + '|' + formVal.companyId + '|' + formVal.companyName + '|' + formVal.lastCheckNum + '|' + formVal.lastEFTnum + '|' + formVal.originDFI + '|' + formVal.originId + '|' + formVal.originName + '|',
            systemId = 0,
            mode;

        /*for (var key in formVal){
            tempFields = tempFields + '|' + formVal[key];
        }
        var fields = tempFields.slice(1);*/

        if (form.addOrEdit === 'Add'){
            mode = 'A';
            //disable add note button here
        }
        else {
            mode = 'U';
            systemId = form.recBankAcctMaster.get('systemID');
        }

        if (!formVal.sungardMemoChecks){
            fields = fields + 'no';
        }
        else {
            fields = fields + 'yes';
        }

        var saveAction =[{
            "Save": {"key": '', "value": ''}
        }];

        var setBankAccountMaster = Atlas.common.utility.Utilities.saveData([], 'finance/rx/bankacctmaster/update', null,[false], {pMode: mode, pSystemId: systemId, pFieldList: fieldList, pFields: fields},
            saveAction, null);

        if (setBankAccountMaster.code === 0){
            //Ext.Msg.alert('Success', form.addOrEdit + ' successful');
            me.fireEvent('bankMasterLoadStore');
        }       
    },

    onCancelClick: function () {
        var window = this.getView().up();
        this.editor = Ext.destroy(window);
    },

    onNotesClick: function () {
        var me = this,
            view = me.getView(),
            record = view.recBankAcctMaster;

        me.editor = Ext.create({
            xtype: 'window',
            bind: {
                title: '{title}'
            },
            //iconCls: 'icon-finance,6',
            layout: 'fit',
            ghost: false,
            modal: true,
            closable: true,
            resizable: false,
            width: 600,
            height: 400,

            items: [{
                xtype: 'bankmaster.notes',
                parentSystemId: record.data.systemID
            }],

            session: {
                schema: 'atlas'
            },

            viewModel: {
                data: {
                    //title: 'Edit Bank Information'
                    title: 'Note'
                }
            }
        });

        me.editor.show();

    }

});