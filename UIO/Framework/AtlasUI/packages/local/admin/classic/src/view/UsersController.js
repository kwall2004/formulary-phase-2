Ext.define('Atlas.admin.view.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-users',

    listen: {
        controller: {
            '*': {
                userchange: 'onUserChange'
            }
        }
    },

    init: function () {
        var me = this,
            vm = me.getViewModel();
        /*vm.get('dashboardlistUnique').on('load',function(store , recordInfo , successful , operation , eOpts){
         debugger;
         });*/
        //vm.get('users').getProxy().setExtraParam('pShowActive', '');
        //vm.get('users').load();
        me.getView().down('[reference=userlist]').add({
            xtype: 'common-tri-treepicker',
            fieldLabel: 'User Access List',
            emptyText: 'select a group first to view settings',
            cls: 'header-tri-state',
            width: 350,
            name: 'dataaccess',
            store: vm.getStore('userdataaccess'),
            onItemClick: function (view, record, node, rowIndex, e) {
                //this.up('view-adminusers').getController().onDataAccessSelect(view,record,node,rowIndex,e);
            },
            hideApply: true,
            // pickerURL: 'system/rx/dataaccesstree/update', //required for save
            pickerUI: 'header-data-tree',
            displayField: 'nodeName'
        });
    },

    //triggered when the store loads
    onUsersLoad: function (store, records, successful, operation) {
        var combo = this.lookupReference('usercombo');
        combo.setReadOnly(false);
        Ext.defer(this.setupAtlasRecord, 100, this);
    },

    setupAtlasRecord: function () {
        var me = this,
            combo = this.lookupReference('usercombo');
        if (me.getView().atlasId) {
            me.getViewModel().set('atlasId', me.getView().atlasId);
            this.lookupReference('usercombo').select(me.getView().atlasId);
            //not sure why not firing
            combo.fireEvent('select', combo, combo.getSelection());
        }
    },

    onUserSelect: function (combo, record) {
        var vm = this.getViewModel();
        vm.set('isUserSelected', true);
        this.fireEvent('userchange', record);
    },

    onUserChange: function (record) {
        if (record == null) {
            return false;
        }
        var me = this,
            view = this.getView(),
            vm = me.getViewModel(),
            username = record.data.userName,
            usergroupcombo = me.getView().down('[reference=usergroupcombo]'),
            user = Ext.create('Atlas.common.model.merlin.User');

        vm.set('activeUser', username);

        //fill queuelist
        vm.getStore('userqueuelist').getProxy().setExtraParam('pUserName', username);
        vm.getStore('userqueuelist').load({
            callback: function (recordInfo, operation, success) {
                var list = [];
                for (var i in recordInfo) {
                    list.push(recordInfo[i].get('queueListId'));
                }
                //set viewModel to hold the users quelists values
                me.getViewModel().set('userqueuelistdata', list.join());
                view.down("#tagQueueList").setValue(list);
            }
        });


        vm.getStore('userdataaccess').getProxy().setExtraParam('pUserName', username);
        vm.getStore('userdataaccess').getProxy().setExtraParam('pFullTree', true);
        vm.getStore('userdataaccess').getProxy().setExtraParam('pSessionOnly', false);
        vm.getStore('userdataaccess').load();

        /*  vm.get('userdataaccesslist').getProxy().setExtraParam('pUserName', username);
         vm.get('userdataaccesslist').load(
         {
         callback: function (recordInfo, operation, success) {
         /!* vm.getStore('userdataaccess').getProxy().setExtraParam('pUserName', username);
         vm.getStore('userdataaccess').getProxy().setExtraParam('pDataAccess', username);
         vm.getStore('userdataaccess').load();*!/


         }
         }
         );
         */
        //fill form info
        user.getProxy().setExtraParam('pUserName', username);
        user.getProxy().setExtraParam('pFieldList', 'username,firstname,lastname,middlename,groupid,Employee,active,queueAdmin,createDateTime,email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo,acctLocked,accreditation');
        user.load({
            callback: function (recordInfo, operation, success) {
                var selectedItem = usergroupcombo.getStore().findRecord('groupId', recordInfo.get('groupid'));
                vm.set('isUserLocked', recordInfo.data.acctLocked);
                var arrCreatedOnDate = recordInfo.data.createDateTime.split(' ');
                //arrCreatedOnDate[0] = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(arrCreatedOnDate,'m/d/Y');
                recordInfo.data.createDateTime = arrCreatedOnDate[0];
                recordInfo.data.groupid = recordInfo.data.groupid == 0 ? '*' : recordInfo.data.groupid;
                me.getViewModel().set('masterRecord', recordInfo);
                me.getView().loadRecord(recordInfo);
                usergroupcombo.fireEvent('select', usergroupcombo, selectedItem);
            }
        });

        // fill coverage list right side
        vm.getStore('coveragelist').getProxy().setExtraParam('pUserName', username);
        vm.getStore('coveragelist').load({
            callback: function () {
                me.onExpandAllCoverage();
            }
        });

        //load right side
        me.onDataAccessSelect();
    },
    /* onclickdblist:function(combo, record)
     {
     debugger;
     },*/


    bubbleSort: function (a) {
        var swapped;
        do {
            swapped = false;
            for (var i = 0; i < a.length ; i++) {
                if(a[i].menuDashboardID.indexOf('|') > -1){
                    var arrMenuIds = a[i].menuDashboardID.split('|');
                    for(var j = 0 ; j < arrMenuIds.length -1 ; j++){
                        if (parseInt(arrMenuIds[j].split(':')[0]) > parseInt(arrMenuIds[j + 1].split(':')[0])) {
                            var temp = arrMenuIds[j];
                            arrMenuIds[j] = arrMenuIds[j + 1];
                            arrMenuIds[j + 1] = temp;
                            swapped = true;
                        }
                    }
                    a[i].menuDashboardID = arrMenuIds.join('|');
                }

            }
        } while (swapped);
        return a;
    },

    bubbleSortArray: function (a) {
        var swapped;
        do {
            swapped = false;
            for (var i = 0; i < a.length ; i++) {
                if(a[i].indexOf('|') > -1){
                    var arrMenuIds = a[i].split('|');
                    for(var j = 0 ; j < arrMenuIds.length -1 ; j++){
                        if (parseInt(arrMenuIds[j].split(':')[0]) > parseInt(arrMenuIds[j + 1].split(':')[0])) {
                            var temp = arrMenuIds[j];
                            arrMenuIds[j] = arrMenuIds[j + 1];
                            arrMenuIds[j + 1] = temp;
                            swapped = true;
                        }
                    }
                    a[i] = arrMenuIds.join('|');
                }

            }
        } while (swapped);
        return a;
    },


    onDashboardListLoad: function (store, records) {
        var me = this,
            view = this.getView(),
            vm = me.getViewModel(),
            uniqueIdArray = [];
        for (var recCountMaster in records) {
            var item = records[recCountMaster],
                isUniqueId = true,
                uniqueItem = {
                    dashboardId: item.get('dashboardId'),
                    dashboardName: item.get('dashboardName'),
                    menuId: item.get('menuId'),
                    menuDashboardID: item.get('menuId') + ":" + item.get('dashboardId')
                };
            uniqueIdArray.forEach(function (dashboardItem, count) {
                if (dashboardItem.dashboardId == uniqueItem.dashboardId) {
                    dashboardItem.menuDashboardID += "|" + uniqueItem.menuDashboardID;
                    isUniqueId = false;
                }
            }, this);
            if (isUniqueId) {
                uniqueIdArray.push(uniqueItem);
            }
            //this.getViewModel().get('dashboardlistUnique').loadRawData(uniqueIdArray);
        }
        uniqueIdArray = me.bubbleSort(uniqueIdArray);
        me.getViewModel().get('dashboardlistUnique').loadRawData(uniqueIdArray);
        var x = me.getViewModel().get('masterRecord').get('groupid');
        var y = me.getView().lookupReference('usergroupcombo').getValue();
        if (me.getViewModel().get('masterRecord').get('username') != '' && me.getViewModel().get('masterRecord').get('groupid') != 0 && me.getViewModel().get('masterRecord').get('groupid') == me.getView().lookupReference('usergroupcombo').getValue()) {
            var storeUserDashboard = vm.get('storeuserdashboarditems') == null ? vm.getStore('storeuserdashboarditems') : vm.get('storeuserdashboarditems');
            storeUserDashboard.getProxy().setExtraParam('pUserName', me.getViewModel().get('masterRecord').get('username'));
            storeUserDashboard.load(
                {
                    callback: function (recordInfo, operation, success) {
                        var list = [],
                            filterList = [],
                            arrRever = [];
                        for (var recCount in recordInfo) {
                            var item = recordInfo[recCount],
                                isUniqueId = true,
                                uniqueItem = {
                                    FavFlag: item.get('FavFlag'),
                                    isDefault: item.get('isDefault'),
                                    dashboardId: item.get('dashboardId'),
                                    menuDashboardID: item.get('menuId') + ":" + item.get('dashboardId')
                                };
                            list.forEach(function (dashboardItem, count) {
                                if (dashboardItem.dashboardId == uniqueItem.dashboardId) {
                                    dashboardItem.menuDashboardID = dashboardItem.menuDashboardID + "|" + uniqueItem.menuDashboardID;
                                    arrRever.push(dashboardItem.menuDashboardID);
                                    isUniqueId = false;
                                }
                            }, this);
                            if (isUniqueId) {
                                list.push(uniqueItem);
                            }
                        }
                        for (var itemCount in list) {
                            if ((!list[itemCount].isDefault) && list[itemCount].FavFlag) {
                                filterList.push(list[itemCount].menuDashboardID);
                            }
                        }
                        filterList = me.bubbleSortArray(filterList);
                        me.getViewModel().set('userdashboardlistdata', filterList.join());

                        view.down('#tagDashboardList').setValue(filterList);
                    }
                }
            );
        }
        else {
            var list = [];
            for (var counter in uniqueIdArray) {
                list.push(uniqueIdArray[counter].menuDashboardID);
            }
            me.getViewModel().set('userdashboardlistdata', list.join());
            view.down('#tagDashboardList').setValue(list);
        }
    },

    onUserGroupSelect: function (combo, record) {
        var me = this,
            vm = me.getViewModel(),
            view = this.getView(),
            storeDashboard = vm.get('dashboardlist') == null ? vm.getStore('dashboardlist') : vm.get('dashboardlist');

        //fill dashboard list when group changes
        storeDashboard.getProxy().setExtraParam('pGroupID', combo.getValue());
        storeDashboard.load(
            {
                callback: function (recordInfo, operation, success) {
                    // var list = [];
                    // for (var i in recordInfo) {
                    //     list.push(recordInfo[i].get('dashboardId'));
                    // }
                    // me.getViewModel().set('userdashboardlistdata', list.join());
                    // view.down('#tagDashboardList').setValue(list);

                    // if(recordInfo.length == 0){
                    //     var list = [];
                    //     me.getViewModel().set('userdashboardlistdata', list.join());
                    //     view.down('#tagDashboardList').setValue(list);
                    //     vm.get('dashboardlistUnique').loadRawData(list);
                    // }
                    //me.onDashboardListLoad('', recordInfo);
                }
            }
        );
    },

    onDataAccessSelect: function () {
        var me = this,
            vm = me.getViewModel(),
            username = vm.get('activeUser');

        // fill coverage list right side
        vm.getStore('coveragelist').getProxy().setExtraParam('pUserName', username);
        vm.getStore('coveragelist').load({
            callback: function () {
                me.onExpandAllCoverage();
            }
        });

    },

    onAdd: function () {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            user = Ext.create('Atlas.common.model.merlin.User', {
                createDateTime: '',
                homephone: '',
                workphone: '',
                email: '',
                cell: '',
                fax: '',
                Ext: '',
                active: 'yes',
                acctLocked: 'no',
                groupid: 0
            });

        vm.set('isEditing', true);
        vm.set('newUser', true);
        vm.set('userqueuelistdata', null);
        vm.set('userdashboardlistdata', null);
        vm.set('masterRecord', user);

        me.getView().down('[reference=usercombo]').setValue(null);

        me.getView().loadRecord(user);
        vm.get('userdataaccess').getProxy().setExtraParam('pUserName', '');
        vm.get('userdataaccess').getProxy().setExtraParam('pFullTree', true);
        vm.get('userdataaccess').getProxy().setExtraParam('pSessionOnly', false);
        vm.get('userdataaccess').load();

        vm.get('coveragelist').getProxy().setExtraParam('pUserName', '');
        vm.get('coveragelist').load();
        //me.getView().getForm().isValid();
        view.down('#tagQueueList').setValue('');
        view.down('#tagDashboardList').setValue('');
    },

    onEdit: function () {
        var me = this;
        me.getViewModel().set('isEditing', true);

    },

    onCancel: function () {
        var me = this,
            vm = me.getViewModel();
        vm.set('newUser', false);  //username is only editble on new users
        vm.set('isEditing', false);
        var combo = this.lookupReference('usercombo');
        if (combo.getSelection() != null) {
            combo.fireEvent('select', combo, combo.getSelection());
            vm.set('isUserSelected', true);
        }
        else {
            vm.set('isUserSelected', false);
            me.lookup('form1').reset();
        }
    },

    onDelete: function () {
        var me = this,
            vm = me.getViewModel(),
            username = vm.get('masterRecord.username'),
            userDashboardList = [],
            userListAccess = [];
        userDashboardList.push({
            "menuId": 0,
            "dashboardId": 0
        });

        userListAccess.push({
            "ListItem": '',
            "PGHierarchySystemId": ''
        });
        Ext.Msg.show({
            title: 'Delete User?',
            message: 'Are you sure you would like to delete user ' + username + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var removeUser = Atlas.common.utility.Utilities.saveData(
                        [], //stores array of stores
                        'system/rx/usermasterdata/update', //url
                        null, //temptablenames
                        [false], //trackingRemoved
                        params = {
                            pMode: 'D',
                            pUserName: username
                        }, //extraParams
                        saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                        [] //returnfields
                    );


                    var removeAccess = Atlas.common.utility.Utilities.saveData(
                        [], //stores array of stores
                        'system/rx/deluserdataaccess/update', //url
                        null, //temptablenames
                        [false], //trackingRemoved
                        params = {
                            pUserName: username
                        }, //extraParams
                        saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                        [] //returnfields
                    );

                    var removeUserListAccess = Atlas.common.utility.Utilities.saveData(
                        [], //stores array of stores
                        'shared/rx/userlistsaccess/update', //url
                        null, //temptablenames
                        [false], //trackingRemoved
                        params = {
                            pMode: 'D',
                            pListName: 'priorAuthStatus',
                            pUserName: username,
                            ttUserListAccess: {
                                ttUserListAccess: userListAccess
                            }
                        }, //extraParams
                        saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                        [] //returnfields
                    );

                    var removeUserDashboardItems = Atlas.common.utility.Utilities.saveData(
                        [], //stores array of stores
                        'system/rx/userdashboarditems/update', //url
                        null, //temptablenames
                        [false], //trackingRemoved
                        params = {

                            pUserName: username,
                            ttUserDashboardItems: {
                                ttUserDashboardItems: userDashboardList
                            }
                        }, //extraParams
                        saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                        [] //returnfields
                    );
                    me.lookup('form1').reset();
                    vm.get('users').getProxy().setExtraParam('pShowActive', '');
                    vm.get('users').load();
                    me.lookup('usercombo').setValue('');
                    vm.set('isUserSelected', false);
                    vm.set('isEditing', false);
                    vm.get('coveragelist').getProxy().setExtraParam('pUserName', '');
                    vm.get('coveragelist').load();
                }
            }
        });
    },

    onSave: function () {

        var me = this,
            vm = me.getViewModel(),
            form = me.getView().getForm(),
            mode = vm.get('newUser') ? 'A' : 'U',
            r = vm.get('masterRecord'),
            pFieldList, pFields, username,
            coveragelistStore = vm.get('coveragelist'),
            userListAccess = [],
            userdashboardStore = vm.get('dashboardlistUnique'),
            userDashboardList = [],
            dashboardMenuIds = [],
            userdataaccessStore = vm.get('userdataaccess'),
            userPermissionsList = [],
            queuelistStore = vm.get('queuelist'),
            queueLists = '',
            listItem,
            chkAdminUserVal = me.lookup('queueAdmin').getValue(),
            Title = me.getView().down('#txtaccreditation').getValue(),
            chkActiveVal = me.lookup('active').getValue(),
            chkEmployee = me.lookup('Employee').getValue(),
            chkLockedVal = me.lookup('acctLocked').getValue(),
            groupId = me.lookup('usergroupcombo').getValue();

        if (form.isValid()) {
            me.getView().updateRecord(r);
            username = r.get('username');
            r.getProxy().setExtraParam('pUserName', username);
            r.getProxy().setExtraParam('pMode', mode);

            //field lists are different for add and update
            if (mode == 'A') {
                pFieldList = 'firstname,lastname,accreditation,middlename,groupid,Employee,active,queueAdmin,createDateTime,email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo';
                // pFields = r.get('firstname') + '|' + r.get('lastname') + Title + '|'+ '|' + r.get('middlename') + '|' + groupId + '|' +chkEmployee+'|'+ chkActiveVal + '|' + chkAdminUserVal + '|' + Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y  H:i:s ') + '|' + r.get('email') + '|' + r.get('homephone').replace(/\D/g, '') + '|' + r.get('workphone').replace(/\D/g, '') + '|' + r.get('cell').replace(/\D/g, '') + '|' + r.get('Ext') + '|' + r.get('fax').replace(/\D/g, '');
                pFields = r.get('firstname') + '|' + r.get('lastname') + Title + '|'+ '|' + r.get('middlename') + '|' + groupId + '|' +chkEmployee+'|'+ chkActiveVal + '|' + chkAdminUserVal + '|' + Ext.util.Format.date(new Date(), 'm/d/Y') + '|' + r.get('email') + '|' + r.get('homephone').replace(/\D/g, '') + '|' + r.get('workphone').replace(/\D/g, '') + '|' + r.get('cell').replace(/\D/g, '') + '|' + r.get('Ext') + '|' + r.get('fax').replace(/\D/g, '');
            } else {
                pFieldList = 'firstname,lastname,accreditation,middlename,groupid,Employee,active,queueAdmin,email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo,acctLocked';
                pFields = r.get('firstname') + '|' + r.get('lastname') + '|'+ Title + '|' + r.get('middlename') + '|' + groupId + '|'+chkEmployee+'|' + chkActiveVal + '|' + chkAdminUserVal + '|' + r.get('email') + '|' + r.get('homephone').replace(/\D/g, '') + '|' + r.get('workphone').replace(/\D/g, '') + '|' + r.get('cell').replace(/\D/g, '') + '|' + r.get('Ext') + '|' + r.get('fax').replace(/\D/g, '') + '|' + chkLockedVal;
            }


            var saveUser = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/usermasterdata/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                params = {
                    pMode: mode,
                    pUserName: username,
                    pFieldList: pFieldList,
                    pFields: pFields
                }, //extraParams
                saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                [] //returnfields
            );
            var combo = me.lookup('usercombo');
            if (saveUser.code == 0) { //&& saveUser.message == "Successful"
                vm.get('users').load({
                    callback: function (record, operation, success) {
                        if (combo.getSelection() == null) {
                            var store = combo.store;
                            var recordNumber = store.findExact('userName', username, 0);
                            if (recordNumber == -1)
                                return -1;

                            var displayValue = store.getAt(recordNumber).data['userName'];
                            combo.setValue(username);
                            combo.setRawValue(displayValue);
                            combo.selectedIndex = recordNumber;

                            combo.fireEvent('select', combo, combo.getSelection());
                        }
                        me.onCancel();
                    }
                });
                vm.get('userdataaccess').load();
            }
            else {
                me.onCancel();
                Ext.Msg.alert('Failure',saveUser.message);
                return false;
            }

            //Set Queue list
            queueLists = this.getView().down('#tagQueueList').getValue().join();
            var setQueueList = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/queuelist/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                params = {
                    pUserName: username,
                    pQueueLists: queueLists
                }, //extraParams
                saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                [] //returnfields
            );

            //user permission list
            for (var iii in userdataaccessStore.data.items) {
                var itemi = userdataaccessStore.data.items[iii];
                if (!!itemi.data.leaf && itemi.data.checked) {
                    userPermissionsList.push({
                        "CarrierId": itemi.parentNode.parentNode.get('nodeValue'),
                        "CarrierAcctNumber": itemi.parentNode.get('nodeValue'),
                        "CarrierLOBID": itemi.get('nodeValue')
                    });
                }
            }

            //delete user permission list
            var delUserDataAccess = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/deluserdataaccess/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                params = {
                    pUserName: username
                }, //extraParams
                saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                [] //returnfields
            );

            //user permission list
            var setUserDataAccess = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/userdataaccess/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                params = {
                    pMode: mode,
                    pUserName: username,
                    ttUserDataAccess: {
                        ttUserDataAccess: userPermissionsList
                    }
                }, //extraParams
                saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                [] //returnfields
            );
            //right side list
            for (var i in coveragelistStore.data.items) {
                var item = coveragelistStore.data.items[i];
                if (item.data.depth == 1) {
                    listItem = item
                }
                if (!!item.data.leaf && item.data.checked) {
                    userListAccess.push({
                        "ListItem": listItem.get('nodeValue'),
                        "PGHierarchySystemId": item.get('nodeValue')
                    });
                }
                else if(!item.data.leaf && !item.data.expanded)
                {
                    for (var j in coveragelistStore.data.items[i].data.children) {
                        var itemchild = coveragelistStore.data.items[i].data.children[j];
                        if (itemchild.checked) {
                            userListAccess.push({
                                "ListItem": listItem.get('nodeValue'),
                                "PGHierarchySystemId": itemchild.nodeValue
                            });
                        }
                    }
                }
            }

            //right side list
            var setUserListAccess = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'shared/rx/userlistsaccess/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                params = {
                    pListName: 'PriorAuthStatus',
                    pMode: mode,
                    pUserName: username,
                    ttUserListAccess: {
                        ttUserListAccess: userListAccess
                    }
                }, //extraParams
                saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                [] //returnfields
            );

            //dashboard items
            dashboardMenuIds = this.getView().down('#tagDashboardList').getValue();
            dashboardMenuIds.forEach(function (ids) {
                var menuItems = ids.split('|');
                menuItems.forEach(function (item) {
                    userDashboardList.push({
                        "menuId": item.split(':')[0],
                        "dashboardId": item.split(':')[1]
                    });
                });
            });

            var setUserDashboardItems = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/userdashboarditems/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                params = {
                    pMode: mode,
                    pUserName: username,
                    ttUserDashboardItems: {
                        ttUserDashboardItems: userDashboardList
                    }
                }, //extraParams
                saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                [] //returnfields
            );
            vm.set('isEditing', false);
            vm.set('isUserSelected', true);
            this.lookupReference('usercombo').setValue(username);
            var record= {data:{userName:username}};
            this.onUserChange(record)
        }
    },


    onUnlock: function () {
        var me = this,
            combo = me.lookupReference('usercombo');
        Ext.Msg.show({
            title: 'Unlock User',
            message: 'Are you sure you would like to unlock user ' + this.getViewModel().get('masterRecord.username') + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var username = me.getViewModel().get('masterRecord.username'),
                        unlockUser = Atlas.common.utility.Utilities.saveData(
                            [], //stores array of stores
                            'system/rx/usermasterdata/update', //url
                            null, //temptablenames
                            [false], //trackingRemoved
                            params = {
                                pFieldList: 'username,acctLocked',
                                pFields: username + '|' + false,
                                pMode: 'U',
                                pUserName: username
                            }, //extraParams
                            saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                            [] //returnfields

                        );
                    if (unlockUser.code == 0) {
                        me.fireEvent('userchange', combo.getSelection());

                    }
                }
            }
        });
    },

    onResetPassword: function () {
        var me = this;

        Ext.Msg.show({
            title: 'Reset Password',
            message: 'Are you sure you would like to set password for user ' + this.getViewModel().get('masterRecord.username') + '? User will be notified via email.',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var username = me.getViewModel().get('masterRecord.username'),
                        reset = Atlas.common.utility.Utilities.saveData(
                            [], //stores array of stores
                            'system/rx/resetuserpassword/update', //url
                            null, //temptablenames
                            [false], //trackingRemoved
                            params = {
                                pUserName: username
                            }, //extraParams
                            saveAction = [{"Save": {"key": "mode", "value": "Update"}}], //saveactions
                            [] //returnfields
                        );

                }
            }
        });
    },

    onExpandAllCoverage: function () {
        this.getView().down('[reference=coveragelisttree]').expandAll()
    },

    onCollapseAllCoverage: function () {
        this.getView().down('[reference=coveragelisttree]').collapseAll();
    }

});

