Ext.define('Atlas.finance.view.bank.BankMasterModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-bankmaster',

    stores: {
        bankacctmaster: {
            model:'Atlas.finance.model.BankMaster',
            storeId:'bankstore'
        },

        cbxBank: {
            model: 'Atlas.common.model.shared.ListModel'
        }
    },

    data: {

    }
});