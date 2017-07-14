Ext.define('Atlas.finance.view.check.AdvancedSearchModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.finance-check-advsearch',

    data: {
        isRecordExists: false,
        isRelChecked: false,
        isPharChecked: false,
        isPayChecked: false,
        isChkDateChecked: false,
        isClaimChecked: false,
        sum: ''
    },

    stores: {
        storeRADetail: {
            model: 'Atlas.finance.model.ClaimRADetail',
            pageSize : 15
        },

        storeVendorLedgerDetail: {
            model: 'Atlas.finance.model.VendorLedger',
            pageSize : 15
            //sorters : 'CheckNum'
            /*sorters:
            {
                field: 'CheckNum',
                direction: 'ASC'
            }*/
            /*sorters: [{
                property: 'CheckNum',
                direction: 'ASC'
            }]*/

        },

        storeCheckDate: {
            model: 'Atlas.finance.model.CheckDates',
            pageSize : 15,
            autoLoad: true,
            listeners: {
                load: 'storeCheckDateAfterLoad'
            }
        }
    }
});
