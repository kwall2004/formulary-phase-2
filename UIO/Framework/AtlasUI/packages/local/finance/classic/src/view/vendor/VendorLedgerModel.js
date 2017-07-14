Ext.define('Atlas.finance.view.vendor.VendorLedgerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-vendorledger',

    stores: {
        vendorledger: {
            model:'Atlas.finance.model.VendorLedger',
            listeners: {
                beforeload: 'buildSearchQuery'
            }
        },
        vendorledgerexport: {
            model:'Atlas.finance.model.VendorLedger',
            listeners: {
                beforeload: 'buildSearchQuery'
            }
        },
        claimshistory: {
            model: 'Atlas.common.model.Claims',
            pageSize: 25
        },
        PagingToolbarStore: {
            storeId: 'PagingToolbarStore',
            pageSize: 25,
            autoLoad: false,
            fields: ['PageNumber'],
            proxy: {
                type: 'RemotePagination'
            }
        }
    },

    data: {
        initialized: false,
        searchBy: 'relationship', //relationship | pharmacy
        searchValue: null,
        searchValuePayee: null,
        lastSearch: {
            lastDateTo: null,
            lastDateFrom: null,
            lastPayeeNo: null,
            lastSearchBy: null,
            lastSearchVal: null
        },
        isRelationshipSearch: true,
        isPharmacySearch: false,
        relationship: null,
        pharmacy: null,
        searchEmptyText: '[e.g. CVS MI]',
        searchEmptyTextPayeeId: '[Payee No]',
        isResetBtn: false,
        searchParams: {
            ipiBatchSize: 25,
            ipiJumpStart: 0,
            ipcDirection:'Fwd',
            ipcBckRecPointer: '',
            ipcFwdRecPointer: '',
            pagination: false,
            loadPagination: true
        }
    }
});