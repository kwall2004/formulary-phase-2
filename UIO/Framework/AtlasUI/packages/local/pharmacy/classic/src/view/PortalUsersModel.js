Ext.define('Atlas.pharmacy.view.PortalUsersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pharmacy-portalusers',
    data: {
        searchBy: 'ncpdpId', //ncpdpId | npi
        ncpdpId: null,
        npi: null,
        searchText: null,
        searchEmptyText: '[Relationship]',
        activePharmacy: null,
        fmtSearchDisplay: null,
        fmtLast4SSN: null,
        fmtLastLoginDate: null,
        fmtPassChageDate: null,
        fmtPhone: null,
        listRec: null,
        pharmacyUserMasterRec: null,
        cDisableAll: 0,
        cDisableSave: 1,
        cDisableEdit: 2
    }
});
