/**
 * Created by n6684 on 11/29/2016.
 */

// Revisited by @Sencha
Ext.define('Atlas.common.view.MyProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myprofilecontroller',

    //Note: User is in SetUser global variable
    boxReady: function () {
        this.loadDashboardItems();
        this.loadUserProfile();
    },

    loadDashboardItems: function () {
        var me = this,
            viewModel = me.getViewModel(),
            store = viewModel.getStore('userdashboarditems'),
            dashboard = me.lookup('dashboard'),
            uniquearr = [],
            formItems = [];

        dashboard.mask('Loading settings...');

        store.load({
                params: {
                    pUserName: SetUser.un
                },
                callback: function (records, operation, success) {
                    if (success) {

                        Ext.suspendLayouts();
                        dashboard.down('fieldset').removeAll(true);

                        records.forEach(function (rec, index) {
                            var item = rec.data;

                            if (!item.isDefault) {
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

                        uniquearr.forEach(function (itemDT, countDT) {
                            formItems.push({
                                xtype: 'checkbox',
                                name: 'chkdashboard' + countDT,
                                boxLabel: itemDT.dashboardName,
                                checked: itemDT.FavFlag,
                                dashobj: itemDT
                            });
                        });

                        dashboard.down('fieldset').add(formItems);
                        dashboard.unmask();

                        Ext.resumeLayouts(true);
                        me.getView().center();
                    }
                }
            }
        );
    },

    loadUserProfile: function () {
        var profile = this.lookup('profile'),
            vm = this.getViewModel(),
            fieldList = 'username,firstname,lastname,middlename,groupid,active,queueAdmin,createDateTime,' +
                'email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,' +
                'cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo',
            rec = Ext.create('Atlas.common.view.GetUserMasterData');

        rec.load({
                params: {
                    pUserName: SetUser.un,
                    pFieldList: fieldList
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var rec = record;
                        vm.set('profileRec', rec);
                        profile.loadRecord(rec);
                    }
                }
            }
        )
    },

    onDashboardChange: function () {
        var me = this,
            formFields = me.lookup('dashboard').query('checkbox'), // Grab checkboxes
            rec = Ext.create('Atlas.common.view.SetUserDashboardItems'),
            payload = {
                ttUserDashboardItems: []
            };

        formFields.forEach(function (item, index) {
            if (item.value) {
                var itemsplitbypipe = item.dashobj.menuDashboardIds.split('|');

                itemsplitbypipe.forEach(function (pipeitem, pipeindex) {
                    var itemsplitbycolan = pipeitem.split(':');
                    if (itemsplitbycolan.length != 0) {
                        var newrow = {};
                        newrow.menuId = itemsplitbycolan[0];
                        newrow.dashboardId = itemsplitbycolan[1];
                        payload.ttUserDashboardItems.push(newrow);
                    }
                });
            }
        });

        rec.phantom = false;

        rec.save({
            params:{
                pUserName: SetUser.un,
                ttUserDashboardItems: payload
            },
            callback: function (records, operation, success) {
                if (success) {
                    Ext.MessageBox.show({
                        title: 'Dashboard',
                        msg: "Dashboard items have been saved",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });

                    me.loadDashboardItems(); //reload with fresh values
                    me.fireEvent('dashboardchange'); // Let Home Tab know that there were changes so we can update portlets
                    me.getView().close();
                }
            }
        });
    },

    onProfileSave: function () {
        var me = this,
            profile = me.lookup('profile'),
            vm = me.getViewModel(),
            fieldList = 'firstname,lastname,middlename,email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,' +
                'cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo',
            rec, saveData, values, data;

        //Update record
        profile.updateRecord(); // This will write data back in to record that resides in VM

        rec = vm.get('profileRec');
        saveData = rec.getSaveData(true, fieldList); // convinience method to match with fields definitions on model
        data = saveData.raw;

        values = [data['firstname'], data['lastname'], data['middlename'], data['email.ContactInfo'],
            data['homephone.ContactInfo'], data['workphone.ContactInfo'], data['cell.ContactInfo'],
            data['Ext.ContactInfo'], data['fax.ContactInfo']
        ];

        rec.save({
            params: {
                'pUserName': SetUser.un,
                'pMode': 'U',
                'pFieldList': fieldList,
                'pFields': values.join('|')
            },
            callback: function (record, operation, success) {
                // var objResp = Ext.decode(operation.getResponse().responseText);
                if (success) {
                    Ext.MessageBox.show({
                        title: 'Profile',
                        msg: "Profile data has been saved",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    // Let any subscriber know that we have new profile data (e.g. user button)
                    me.fireEvent('profilechange', record.data);
                    me.getView().close();
                }
            }
        });
    },

    onChangePassword: function () {
        Ext.create({
            xtype: 'common_changepassword',
            autoShow: true
        });
    }
});
//Orig 326