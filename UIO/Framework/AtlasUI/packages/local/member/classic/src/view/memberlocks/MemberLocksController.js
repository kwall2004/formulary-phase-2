/**
 * Created by j2487 on 10/13/2016.
 * Controller for Member --> MemberLocks
 */
Ext.define('Atlas.member.view.MemberLocksController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberlocksgrid',

    listen:{
        controller:{
            '*': {
                refreshmemberlocks: 'refreshMemberLocks'
            }
        }
    },

    init: function () {
        var me = this,
            view = me.getView(),
            inLockType = view.inLockType,
            inLockStatus = view.inLockStatus;

        //linked from dashboard lock alerts widget
        if (inLockType !== undefined && inLockStatus !== undefined) {
            view.down('#cbxLockType').setValue(inLockType);
            view.down('#cbxLockStatus').setValue(inLockStatus);
            me.onSearchClick();
        }
    },

    refreshMemberLocks: function (type, status) {
        var me = this,
            view = me.getView();

        view.down('#cbxLockType').setValue(type);
        view.down('#cbxLockStatus').setValue(status);
        me.onSearchClick();
    },

    onSearchClick: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            lockType = view.down('#cbxLockType').getValue(),
            lockStatus = view.down('#cbxLockStatus').getValue();

        if (lockType == null || lockStatus == null)
        {
            Ext.Msg.alert('Validation', 'Please select lock type and status first.');
            return false;
        }

        var memberlockstore = vm.getStore('memberlockstore');

        memberlockstore.getProxy().setExtraParam('pLockType',lockType);
        memberlockstore.getProxy().setExtraParam('pStatus', lockStatus);
        memberlockstore.load();
    },

    onExportClick: function () {
        var memberlockstore = this.getViewModel().getStore('memberlockstore');
    },

    onItemDblClick: function (dataview, record, item, index, e, eOpts) {
        // console.log('Item Double Clicked: ' + record.data.memberID + ' | ' + record.data.recipientID);
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');
      /*  var me = this,
            vm = me.getViewModel(),
            myParent = vm.getParent(),
            menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
            node =  menuItems.findNode('route', 'merlin/member/MemberToolbar'),
            client = me.getView().atlasClient,
            route = node.get('route') || node.get('routeId'),
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle'),
            routeParams = menuId + '/' + record.data.recipientID;*/

        this.fireEvent('openView','merlin','member','MemberToolbar', {
            menuId: menuId,
            atlasId: record.data.recipientID,
            RID:record.data.recipientID,
            keyValue: '0',
            openView: true,
            recordCase:record,
            subTabs:['member-memlocks']
        });
    },
    ExportToExcel:function(){
        var store = this.getViewModel().getStore('memberlockstore');
        Atlas.common.utility.Utilities.exportToExcel(store,'changeDate,changedBy,approvalDeniedDate,approvedDeniedBy,carrierID,removalBy,	removalDate,removalDeniedBy,' +
            'removalDeniedDate,spareField01,spareField02,spareField03,spareIndexedField,systemID,officeContact,officeContactPhone,planContactExtn,planContactJobDesc,planContactName,recipientID,' +
            'removalDate,parentSystemID,recordVersion,memberName,lockName,lockAddress1,lockAddress2,lockCity,lockState,lockZip,Carrier,Account,LOB,plangroupId');
    }
});