Ext.define('Atlas.admin.view.MenusUpdateFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-menusupdateform',
    id: 'admin-menusupdateform', //for domain event filtering
    oldDashboardIds: '',

    onMenuDashboardLoad: function(store,records,success){
        var me = this,
            record = this.getViewModel().get('masterRecord'),
            menuID = record.get('menuID'),
            selectedDashboardIds = [];

        if (menuID == 0) {
            return;
        }
        store.each(function (record) {
            selectedDashboardIds.push(record.get('dashboardId'));
            me.oldDashboardIds = me.oldDashboardIds + (me.oldDashboardIds == '' ? '' : ',') + record.get('dashboardId');
        });
        this.getView().down('form').down('#dashboardId').setValue(selectedDashboardIds);
    },
    doClose:function(){
      this.getView().close();
    },

    doUpdate: function(){
        var me=this,
            form = this.getView().down('form'),
            values = form.getValues(),
            record = this.getViewModel().get('masterRecord'),
            parentRecord = this.getViewModel().get('parentRecord'),
            saveData;
        if (parentRecord){
            var pFieldsText = parentRecord.get('menuTitle') + '|' + parentRecord.get('maxRunning') + '|' + parentRecord.get('iconName') + '|' + parentRecord.get('programName') + '|' + (parentRecord.get('defaultMenu') || false) + '|' + parentRecord.get('allowExtAccess') + '|' + parentRecord.get('xType') + '|' + parentRecord.get('iconCLS') + '|' + parentRecord.get('route') + '|' + false;

            //form.updateRecord(record);
            saveData = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/systemmenus/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                {
                    pMenuID: parentRecord.get('menuID'),
                    pParentMenuID: parentRecord.get('parentMenuID'),
                    pMenuOrder: parentRecord.get('menuOrder'),
                    pFieldList: 'menuTitle,maxRunning, iconName,programName,defaultMenu,allowExtAccess,xType,iconCLS,route,leaf',
                    pFields: pFieldsText
                },
                [{"Save": {"key": "mode", "value": "Update"}}],
                [] //returnfields
            );

        }
        if(form.isValid() && values){

            record.set('menuTitle',values.menuTitle);
            record.set('allowExtAccess',values.allowExtAccess);
            record.set('dashboardId',values.dashboardId);
            record.set('iconCls',values.iconCls||'');
            record.set('iconName',values.iconName||'');
            if (values.leaf=='on')
                record.set('leaf',true);
            else
                record.set('leaf',false);
            if (values.defaultMenu=='on')
                record.set('defaultMenu',true);
            else
                record.set('defaultMenu',false);
            record.set('maxRunning',values.maxRunning);
            record.set('menuOrder',values.menuOrder);
            record.set('menuTitle',values.menuTitle);
            record.set('programName',values.programName);
            record.set('route',values.route||'');
            record.set('xType',values.xType);
            var pFieldsText = record.get('menuTitle') + '|' + record.get('maxRunning') + '|' + record.get('iconName') + '|' + record.get('programName') + '|' + (record.get('defaultMenu') || false) + '|' + values.allowExtAccess + '|' + record.get('xType') + '|' + (record.get('iconCls')||'') + '|' + record.get('route') + '|' + (record.get('leaf'));
            //form.updateRecord(record);
            saveData = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/systemmenus/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                {
                    pMenuID: record.get('menuID'),
                    pParentMenuID: record.get('parentMenuID'),
                    pMenuOrder: record.get('menuOrder'),
                    pFieldList: 'menuTitle,maxRunning, iconName,programName,defaultMenu,allowExtAccess,xType,iconCLS,route,leaf',
                    pFields: pFieldsText
                },
                [{"Save": {"key": "mode", "value": "Update"}}],
                ['pOutMenuID'] //returnfields
            );

            if (saveData.code == 0) {
                var newDashboardIds = '',
                    selMenuId = saveData.pOutMenuID,
                    selectedDashboardIds = this.getView().down('form').down('#dashboardId').getValue();

                for (var iCnt in selectedDashboardIds)
                {
                    newDashboardIds = newDashboardIds + (newDashboardIds == '' ? '' : ',') + selectedDashboardIds[iCnt];
                }

                if (this.oldDashboardIds != newDashboardIds) {

                    saveData = Atlas.common.utility.Utilities.saveData(
                        [], //stores array of stores
                        'system/rx/dashboardmenuaccess/update', //url
                        null, //temptablenames
                        [false], //trackingRemoved
                        {
                            pMenuID: selMenuId,
                            pDashboardIDs: newDashboardIds
                        },
                        [{"Save": {"key": "mode", "value": "Update"}}],
                        [] //returnfields
                    );
                }
            }

            if (saveData != null ) { //todo: && saveData.message == "Successful"
                this.fireEvent('loadMenuTree');
                this.getView().close();

            }
        }
    }

});