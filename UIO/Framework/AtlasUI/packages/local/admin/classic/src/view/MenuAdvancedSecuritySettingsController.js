/**
 * Created by n6684 on 12/9/2016.
 */
Ext.define('Atlas.admin.view.MenuAdvancedSecuritySettingsController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin_menuadvancedsecuritysettingscontroller',

        init:function()
        {
            var me = this;
            vm = me.getViewModel();
            vm.get('users').getProxy().setExtraParam('pShowActive', '');
            vm.get('users').load();
            me.getView().down("#txtgpgroupname").setValue(me.getView().extraParams["pRecord"].groupName);
            vm.set('groupdata',{});
            var fieldList = "fieldsList,hiddenfieldslist,operationalControls,allowExtAccess";
            var groupdata = vm.getStore("storegroupdata");
            groupdata.load({
                params: {
                    pMenuID: me.getView().extraParams["pRecord"].menuID,
                    pGroupID: me.getView().extraParams["pRecord"].groupID,
                    pFieldList:fieldList
                },
                callback: function (record, operation) {
                    var status = operation.getResultSet().message[0];
                    if (status.code === 0) {
                        vm.set('groupdata',record[0].data);
                    }
                }
            });
        },

        btncancel :function () {
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        },

        btnsave :function () {
            var me = this;
            var fieldList = "fieldsList ,hiddenfieldslist,operationalControls";
            var fields =  me.getViewModel().get("groupdata").hiddenfieldslist  + "|" + me.getViewModel().get("groupdata").fieldsList + "|" + me.getViewModel().get("groupdata").operationalControls;

            var addenuGroupData = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/idxmenugroupdata/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                params = {
                    pMenuID: me.getView().extraParams["pRecord"].menuID,
                    pGroupID: me.getView().extraParams["pRecord"].groupID,
                    pFieldList:fieldList,
                    pFields:fields
                }, //extraParams
                saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                [] //returnfields
            );

            if(addenuGroupData)
            {
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }

                Ext.MessageBox.show({
                    title: 'PBM',
                    msg: 'Record has been saved',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }

        }
    }
);