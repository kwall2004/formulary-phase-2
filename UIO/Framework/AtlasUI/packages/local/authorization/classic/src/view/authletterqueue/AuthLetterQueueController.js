/**
 * Created by s6685 on 11/7/2016.
 */
Ext.define('Atlas.authorization.view.authletterqueue.AuthLetterQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AuthLetterQueueController',
    onRowClick:function(component, eOpts) {
        var authid = component.getWidgetRecord().data.AuthId;
        var memberid = component.getWidgetRecord().data.authID;
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
        me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
            atlasId: authid,
            menuId: menuId,
            activeTab: 3
        }, null);
    },
    init: function () {

        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            ReqApprovalLetterStore = vm.getStore('ReqApprovalLetterStore'),
            ReqDenialLetterStore = vm.getStore('ReqDenialLetterStore'),
            ReqAppealLetterStore = vm.getStore('ReqAppealLetterStore'),
            ReqInterventionLetterStore = vm.getStore('ReqInterventionLetterStore'),
            PendingAppealStore = vm.getStore('PendingAppealStore'),
            PendingLetterStore = vm.getStore('PendingLetterStore'),
            ApprovedLetterStore = vm.getStore('ApprovedLetterStore'),
            MedicareRequiredLetterStore = vm.getStore('MedicareRequiredLetterStore'),
            MedicarePendingLetterStore = vm.getStore('MedicarePendingLetterStore'),
            MedicareApprovedLetterStore = vm.getStore('MedicareApprovedLetterStore');

        ReqApprovalLetterStore.load({
            callback: function (record, operation, success) {
                if (success && ReqApprovalLetterStore.data) {
                    view.down('#gridApprovalLetterReq').setTitle('Approval Letters Required<font style=color:red;> (' + ReqApprovalLetterStore.getTotalCount() + ')</font>');
                }
            }
        });

        ReqDenialLetterStore.load({
            callback: function (record, operation, success) {
                if (success && ReqDenialLetterStore.data) {
                    view.down('#gridDenialLetterReq').setTitle('Denial Letters Required <font style=color:green;>('+ ReqDenialLetterStore.getTotalCount() + ')</font>');
                }
            }
        });

        ReqAppealLetterStore.load({
            callback: function (record, operation, success) {
                if (success && ReqAppealLetterStore.data) {
                    view.down('#gridReqAppealLetter').setTitle('Appeal Letters Required<font style=color:blue;> (' + ReqAppealLetterStore.getTotalCount() + ')</font>');
                }
            }
        });

        ReqDenialLetterStore.load({
            callback: function (record, operation, success) {
                if (success && ReqDenialLetterStore.data) {
                    view.down('#gridDenialLetterReq').setTitle('Denial Letters Required <font style=color:green;>('+ ReqDenialLetterStore.getTotalCount() + ')</font>');
                }
            }
        });

        ReqInterventionLetterStore.load({
            callback: function (record, operation, success) {
                if (success && ReqInterventionLetterStore.data) {
                    view.down('#gridReqInterventionLetter').setTitle('Intervention Letters Required<font style=color:gray;> (' + ReqInterventionLetterStore.getTotalCount() + ')</font>');
                }
            }
        });

        PendingAppealStore.load({
            callback: function (record, operation, success) {
                if (success && PendingAppealStore.data) {
                    view.down('#gridPendingAppeal').setTitle('Pending Appeal Decisions <font style=color:red;>(' + PendingAppealStore.getTotalCount()+ ')</font>');
                }
            }
        });

        PendingLetterStore.getProxy().setExtraParam('ipcLOB','');
        PendingLetterStore.load({
            callback: function (record, operation, success) {
                if (success && PendingLetterStore.data) {
                    view.down('#gridPendingLetter').setTitle('Pending Letters <font style=color:purple;>(' + PendingLetterStore.getTotalCount()+ ')</font>');
                }
            }
        });

        ApprovedLetterStore.getProxy().setExtraParam('ipcLOB','');
        ApprovedLetterStore.load({
            callback: function (record, operation, success) {
                if (success && ApprovedLetterStore.data) {
                    view.down('#gridApprovedLetter').setTitle('Approved Letters <font style=color:black;>(' + ApprovedLetterStore.getTotalCount()+ ')</font>');
                }
            }
        });

        MedicareRequiredLetterStore.getProxy().setExtraParam('ipcLOB','Medicare');
        MedicareRequiredLetterStore.getProxy().setExtraParam('medicareCallQueue',false);
        MedicareRequiredLetterStore.load({
            callback: function (record, operation, success) {
                if (success && MedicareRequiredLetterStore.data) {
                    view.down('#gridMedicareRequiredLetter').setTitle('Medicare Letters Required <font style=color:black;>(' + MedicareRequiredLetterStore.getTotalCount()+ ')</font>');
                }
            }
        });

        MedicarePendingLetterStore.getProxy().setExtraParam('ipcLOB','Medicare');
        MedicarePendingLetterStore.load({
            callback: function (record, operation, success) {
                if (success && MedicarePendingLetterStore.data) {
                    view.down('#gridMedicarePendingLetter').setTitle('Medicare Letters Pending <font style=color:purple;>(' + MedicarePendingLetterStore.getTotalCount()+ ')</font>');
                }
            }
        });

        MedicareApprovedLetterStore.getProxy().setExtraParam('ipcLOB','Medicare');
        MedicareApprovedLetterStore.load({
            callback: function (record, operation, success) {
                if (success && MedicareApprovedLetterStore.data) {
                    view.down('#gridMedicareApprovedLetter').setTitle('Medicare Letters Approved <font style=color:black;>(' + MedicareApprovedLetterStore.getTotalCount()+ ')</font>');
                }
            }
        });
    },

    onEachRowClick: function(component, eOpts) {
        var authid = component.getWidgetRecord().data.AuthID,
        menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
        this.fireEvent('openView','merlin','authorization','cdag_CDAGMain',{
            authID: authid,
            menuId: menuId,
            atlasId: authid
        })
    }
});


