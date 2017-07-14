Ext.define('Atlas.home.view.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboardhomemaincontroller',
    listen: {
        controller: {
            myprofilecontroller: {
                dashboardchange: 'onDashboardUpdate'
            }
        }
    },

    boxReady: function () {
        this.onDashboardUpdate();
    },

    onDashboardUpdate: function () {
        var me = this,
            view = this.getView(),
            viewModel = me.getViewModel(),
            store = viewModel.getStore('userdashboarditems');

        store.load({
                params: {
                    pUserName: SetUser.un
                },
                callback: function (records, operation, success) {
                    var uniquearr = [],
                        portletName;

                    if (success) {

                        Ext.suspendLayouts();
                        //Remove current portlets and other items the view has
                        view.removeAll(true, true); //all items should be destroyed

                        records.forEach(function (rec, index) {
                            var item = rec.data;

                            if (item.isDefault || item.FavFlag) {
                                var doesExist = false;

                                uniquearr.forEach(function (itemuni, indexuni) {
                                    if (itemuni.dashboardId == item.dashboardId) {
                                        itemuni.menuIds += ':' + item.menuId.toString();
                                        itemuni.menuDashboardIds += '|' + item.menuId + ":" + item.dashboardId;

                                        if (item.isDefault)
                                            itemuni.isDefault = item.isDefault;

                                        if (item.FavFlag)
                                            itemuni.FavFlag = item.FavFlag;

                                        doesExist = true;
                                    }
                                });

                                if (!doesExist) {
                                    item.menuIds = item.menuId.toString();
                                    item.menuDashboardIds = item.menuId + ':' + item.dashboardId;
                                    uniquearr.push(item);
                                }
                            }
                        });

                        // Add items to Dashboard
                        var i = 0, iLen = uniquearr.length,
                            modulus = iLen % 2,
                            gap = (iLen - modulus) / 2,
                            pos;

                        //Default portlet
                        //TODO  Dynamically adjust default items?
                        view.addView({
                            type: 'contactlogalert',
                            height: 435
                        }, 0);
                        var HasContactLogAccess = false;
                        for (; i < iLen; i++) {
                            if (HasContactLogAccess == false && uniquearr[i].isDefault == false) {
                                HasContactLogAccess = uniquearr[i].FavFlag;
                            }
                            portletName = uniquearr[i].dashboardProgramName.split('/')[1].split('.')[0].toLowerCase();
                            pos = i < gap ? 0 : 1; // Separate variable  for clarity

                            // Exclude certain portlets here
                            if (portletName === 'financecollectionalert' || //TODO Was listed as exclued before
                             portletName === 'jcodealert' // TODO This portlet is missing
                            ) {
                                continue;
                            }

                            if (uniquearr[i].isDefault || uniquearr[i].FavFlag) {
                                view.addView({
                                    type: portletName,
                                    height: uniquearr[i].dashboardHeight
                                }, pos);
                            }
                        }
                        if (!HasContactLogAccess) {
                            view.down('#plncontactlogalert').setVisible(false);
                        }
                        //Resume layouts
                        Ext.resumeLayouts(true);
                    }
                }
            }
        );
    }
});