/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.view.MemberPortalUsersModel', {
    extend: 'Ext.app.ViewModel',
    //extend: 'Atlas.common.model.Base',
    alias: 'viewmodel.memberportalusers',
    data: {
        fmtSearchDisplay: null,
        fmtLast4SSN: null,
        listRec: null,
        mbrUserMasterRec: null,
        cDisableAll: 0,
        cDisableSave: 1,
        cDisableEdit: 2,
        fmtPWChgDate: null,
        fmtLastLoginDate: null
    }
});