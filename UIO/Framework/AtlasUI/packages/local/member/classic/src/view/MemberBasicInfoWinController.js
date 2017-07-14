/**
 * Created by agupta on 12/13/2016.
 */


Ext.define('Atlas.member.view.MemberBasicInfoWinController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.memberbasicinfowincontroller',

        btnOk_Click: function () {
            var view = this.getView();
            if (view.down('#gpMemberBasicInfo').getSelectionModel().hasSelection()) {
                Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hiddenRecipientId')[0].setValue(view.down('#gpMemberBasicInfo').getSelectionModel().getSelected().items[0].data.RecipientID);
                Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnIsForcefullyEnroll')[0].setValue(true);
                this.fireEvent('parentSave');
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }
            }
            else {
                Ext.Msg.alert('PBM', 'Please Select a member first.');
            }
        },

        btnCreate_Click: function () {
            var view = this.getView();
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hiddenRecipientId')[0].setValue(0);
            Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnIsForcefullyEnroll')[0].setValue(true);
            this.fireEvent('parentSave');
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        },


        btnClose_Click: function () {
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        },

        init: function () {
            var view = this.getView();
            var vm = this.getViewModel();
            var dt = view.extraParams["dtMemBasicInfo"];
            var isHideBtnCreate = view.extraParams["isHideBtnCreate"];
            var isHideBtnClose = view.extraParams["isHideBtnClose"];
            if(isHideBtnCreate == true){
                view.down('#btnCreate').hide();
            }
            else{
                view.down('#btnCreate').show();
            }

            if(isHideBtnClose == true){
                view.down('#btnClose').hide();
            }
            else{
                view.down('#btnClose').show();
            }

            //var store = vm.getStore('storeMemberBasicInfo');
            vm.getStore('storeMemberBasicInfo').loadData(dt);

        }


    }
)
;

