/**
 * Created by akumar on 11/30/2016.
 */
Ext.define('Atlas.common.view.sharedviews.AuditTrailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.AuditTrailModel',
    stores: {
        AuditMaster: {
            model: 'Atlas.member.model.AuditMaster',
            autoLoad: false
        },

        AuditChange: {
            model: 'Atlas.member.model.AuditChange',
            autoLoad: false
        }
    }
});