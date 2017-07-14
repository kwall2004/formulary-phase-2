Ext.define('Atlas.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    SetUser: {},
    listen: {
        controller: {
            '*': {
                authvalid: 'onAuthValid',
                logout: 'doLogout'
            },
            myprofilecontroller: {
                profilechange: 'onProfileChange'
            }
        }
    },

    init: function () {
        var me = this;

        me.fireEvent('authorize');

        Ext.on('resize', function () {
            if (me.lookup('loginWindow') !== null) {
                me.lookup('loginWindow').center();
            }
        });
    },

    //from button
    onLogout: function () {
        this.fireEvent('logout');
    },

    //listener from auth controller
    doLogout: function () {
        this.getView().removeAll();
    },

    onAuthValid: function (user) {
        SetUser = user;
        var me = this;
        me.buildToolbar(user);
        me.buildWorkspace(user.start);

        //try setting the viewModel for known user information
        me.getViewModel().set('user', user);
        me.fireEvent('userSet');
    },

    onProfileChange: function(data){
        var vm = this.getViewModel();
        // For now we just update firstname.
        vm.set('user.firstname', data.firstname);
    },

    buildToolbar: function (user) {
        var me = this,
            vm = me.getViewModel(),
            logoInput = 'mhp.png',
            tenentPicker,
            projectPicker,
            datasourcePicker,
            splitter,
            store = vm.getStore('dataaccess'),
            superuserButton = {
                xtype: 'segmentedbutton',
                reference: 'superuserButton',
                items: [
                    {
                        text: 'Masquerade Active',
                        reference:'activateButton',
                        disabled:true,
                        tooltip: 'Get super user access to a users account',
                        action: 'super'
                    },
                    {
                        text: 'Masquerade In-active',
                        reference: 'deactivateButton',
                        tooltip: 'Return to current user account',
                        action: 'standard',
                        pressed: true
                    }
                ],
                listeners: {
                    toggle: 'onToggle'
                }
            },
            superuserTextbox = {
                xtype: 'container',
                reference: 'superuserTextContainer',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    reference: 'superuserTextfield',
                    style: {
                        height: '18px'
                    }
                }, {
                    xtype: 'button',
                    reference:'goButton',
                    style: {
                        'margin-top': '5px'
                    },
                    text: 'Go',
                    handler: 'onToggle',
                    itemId: 'superuserGoButton'
                }]
            },
            userButton = {
                iconCls: 'x-fa fa-user',
                itemId: 'userProfileBtn',
                handler: 'onUserClick'
            },
            inboxButton,
            jobQueueButton,
            HealthPlanWelcome;

        if (user.start === 'merlin') {
            store.getProxy().setExtraParam('pUserName', Atlas.user.un);
            store.getProxy().setExtraParam('pSessionId', Atlas.sessionId);
            store.getProxy().setExtraParam('pSessionID', Atlas.sessionId);
            store.load();

            Atlas.common.utility.Utilities.updatePlanGroupList();

            datasourcePicker = {
                xtype: 'common-tri-treepicker',
                emptyText: 'Data Access List',
                cls: 'header-tri-state',
                width: 350,
                name: 'dataaccess',
                store: store,
                //system/rx/dataaccesstree/update
                // system/rx/sessionsfilterpglist/update
                pickerURL: 'system/rx/dataaccesstree/update', //required for save
                pickerUI: 'header-data-tree',
                displayField: 'nodeName'
            };

            userButton.bind = 'My Settings - {user.firstname}';

            jobQueueButton = {
                xtype: 'button',
                text: 'Job Queue',
                handler: 'onJobQueueClick',
                iconCls: 'x-fa fa-print'
            };

        } else if (user.start == 'rxmember') {
            logoInput = 'MeridianRx_logo_color.png';
            userButton.hidden = true;

        } else if (user.start == 'hpmember') {
            logoInput = 'Meridian_logo_color.png';
            userButton.bind = 'User Settings';

        } else if (user.start == 'rxprescriber') {
            logoInput = 'MeridianRx_logo_color.png';
            userButton.bind = '{user.retFullName}';

        } else if (user.start == 'rxpharmacy') {
            logoInput = 'MeridianRx_logo_color.png';
            userButton.bind = '{user.un}';

        } else if (user.start == 'hpprovider') {
            logoInput = 'Meridian_logo_color.png';
            userButton.bind = 'User Settings';
            if (Atlas.user.providerStateSelected == 'MI'){
                HealthPlanWelcome = {
                    xtype: 'panel',
                    html: '<strong>Welcome to Meridian Health Plan<br>Tech Support Line: 866-968-1935<br>Tech Support Hours: 7:30am - 5:00pm EST</strong>',
                    cls: 'formPanel'
                }
            } else if (Atlas.user.providerStateSelected == 'IL') {
                HealthPlanWelcome = {
                    xtype: 'panel',
                    html: '<strong>Welcome to Meridian Health Plan<br>Tech Support Line: 866-968-1935<br>Tech Support Hours: 6:30am - 4:00pm CST</strong>',
                    cls: 'formPanel'
                }
            }

        } else {

        }

        if (1 == 0) {
            splitter = {
                xtype: 'segmentedbutton',
                bind: {
                    hidden: '{!user.splitPanelEnabled}'
                },
                items: [{
                    iconCls: 'x-fa fa-desktop',
                    style: 'padding: 2px',
                    value: false,
                    disabled: true,
                    text: 'merge',
                    itemId: 'workspaceMergeButton',  //unique for now for ux control logic to disable
                    listeners: {
                        click: 'onMergeWorkspacePanel'
                    },
                    pressed: true
                }, {
                    listeners: {
                        click: 'onSplitWorkspacePanel'
                    },
                    text: 'split',
                    value: true,
                    iconCls: 'x-fa fa-columns',
                    style: 'padding: 2px'
                }]
            };
        }

        //temporary way to segment the login based permissions
        if (1 == 0) {
            projectPicker = {
                xtype: 'combo',
                emptyText: 'Choose a Project',
                width: 250,
                bind: {
                    store: '{projects}'
                },
                listeners: {
                    change: 'onProjectChange'
                },
                reference: 'projectcombo',
                editable: false,
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id'
            };
        }

        if (1 == 0) {
            tenentPicker = {
                //  xtype: 'main-datasourcepicker'
            };
        }

        if (1 == 0) {
            inboxButton = {
                xtype: 'button',
                iconCls: 'x-fa fa-inbox',
                reference: 'inboxButton',
                publishes: 'pressed',
                enableToggle: true,
                bind: {
                    hidden: '{!user.inboxEnabled}'
                }

            };
            me.enableInbox();
        }


        me.getView().add(
            {
                xtype: 'toolbar',
                region: 'north',
                reference: 'mainHeader',
                height: 50,
                cls: 'shadow',
                margin: '0 0 4 0',
                items: [
                    // For testing openView with particular module
                    // E.g. here I am opening new Pharmacy with ncpdpId: 2300159
                    // Receiving view should know how to handle this
                    // typical scenario as follows:
                    // Controller init method checks for ncpdpId presence on class
                    // Then it sets this value to View Model and adds flag - shouldAutoLoad:true
                    // box ready method should check for presence of this flag and adjust UI
                    // Example provided in Pharmacy class
                    // {
                    //     text: 'open Pharmacy 2311239',
                    //     handler: function () {
                    //         var menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy'),
                    //             id = 2311239;
                    //         //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
                    //         me.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
                    //             atlasId: id,
                    //             ncpdpId: id,
                    //             menuId: menuId
                    //         }, null);
                    //     }
                    // },
                    // {
                    //     text: 'open Pharmacy 2300159',
                    //     handler: function () {
                    //         var menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy'),
                    //             id = 2300159;
                    //         //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
                    //         me.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
                    //             atlasId: id,
                    //             ncpdpId: id,
                    //             menuId: menuId
                    //         }, null);
                    //     }
                    // },
                    {
                        xtype: 'component',
                        cls: 'logo',
                        html: '<div class="main-logo"><a href="#home"><img src="resources/images/' + logoInput + '" height= "32" ></a></div>',
                        width: 200  //todo: this should be moved to the class..
                    },
                    projectPicker,
                    '->',
                    splitter,
                    '->',
                    tenentPicker,
                    '->',
                    jobQueueButton,
                    {
                        xtype: 'tbspacer',
                        width: 20
                    },
                    datasourcePicker,
                    inboxButton,
                    HealthPlanWelcome,
                    userButton,
                    superuserButton,
                    superuserTextbox,
                    {
                        xtype: 'tbspacer',
                        width: 20
                    },
                    {
                        iconCls: 'x-fa fa-power-off',
                        reference: 'powerButton',
                        handler: 'onLogout'
                    }
                ]
            }
        );

        if (user.start == 'hpprovider') {
            me.getView().lookup('mainHeader').setHeight(60);
        }
    },


    // sampleViewRedirect: function (combo, record) {
    //     this.fireEvent('openView', 'merlin', 'letter', 'CreateEditLetter', {
    //         atlasId: 123,
    //         userId: 2456,
    //         greetingMsg: 'Hello'
    //     });
    // },
    onJobQueueClick: function () {
        //debugger;
        var win = Ext.WindowManager.getActive();
        if (win && win.title.toLowerCase()=="job queue") {
            win.close();
        }
        var theWin = Ext.create('Atlas.common.view.merlin.JobQueueMain');
        //this.getView().add(theWin);
        theWin.show();

    },

    onProjectChange: function (combo, name) {
        var view = this.getView().down('[reference=mainPanel]');

        if (name) {
            Ext.suspendLayouts();
            view.removeAll(true, true);
            this.buildWorkspace(name);
            Ext.resumeLayouts(true);
        }
    },

    buildWorkspace: function (name) {
        var newWorkspace,
            view = this.getView().down('[reference=mainPanel]'),
            info = Atlas.common.Util.getWorkspaceInfo(name);

        if (info.cls) {
            newWorkspace = Ext.create('Atlas.common.view.' + info.cls, {
                atlasClient: name
            });

            newWorkspace.getViewModel().set('workspaceTitle', info.title);
            view.setActiveItem(view.add(newWorkspace));
        }
    },

    enableInbox: function () {
        var me = this;
        me.getView().add({
            xtype: 'panel',
            region: 'east',
            title: '<i class="x-fa fa-inbox" aria-hidden="true"></i> Inbox',
            split: true,
            collapseMode: 'mini',
            collapsible: true,
            width: 200,
            layout: 'fit',
            bind: {
                hidden: '{!inboxButton.pressed}'
            },
            items: [{
                xtype: 'common-inbox-main'
            }]
        });
    },

    // onclientSelect: function (combo, record) {
    //     if (record) {
    //         this.redirectTo(record.id);
    //     }
    // },
    //
    // onclientChange: function (combo, newValue) {
    //     if (newValue) {
    //         this.redirectTo(newValue);
    //     }
    // },

    // onDataSourceChange: function (combo, value) {
    //     var route = this.getView().routePath;
    //
    //     if (route) {
    //         route = this.routePathChange(route, 4, value);
    //         this.redirectTo(route);
    //     }
    // },

    activateSuperuser: function(button) {
        var me = this;
        var textfield = this.lookup('superuserTextfield');
        var user = textfield.value;
        var activateButton = this.lookup('activateButton');
        var segBttn = this.lookup('superuserButton');
        var goButton = this.lookup('goButton');
        var deactivateButton = this.lookup('deactivateButton');
        var validateUserSwitch = Ext.create('Atlas.common.model.ValidateUserSwitch');
        var userPrefs;

        activateButton.setDisabled(false);
        segBttn.setValue(0);
        deactivateButton.setText('Deactivate');
        goButton.setHidden(true);
        textfield.setDisabled(true);

        validateUserSwitch.phantom = false;
        validateUserSwitch.getProxy().setExtraParam('pSwitchUser', user);
        validateUserSwitch.getProxy().setExtraParam('webSuperUserName', Atlas.user.un);
        validateUserSwitch.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);

        validateUserSwitch.save({
            failure: function (record) {
            },
            success: function (record) {
                // load the user here.
                userPrefs =  Ext.create('Atlas.portals.provider.model.UserSetupWeb');
                userPrefs.getProxy().setExtraParam('pUserName', user);
                userPrefs.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);

                userPrefs.load({
                    callback: function (response, opts) {
                        var returnFields = Ext.decode(opts._response.responseText);
                        var userPreferences = '';
                        var providerNavPanel = me.getView().down().down().lookup('providerpanel');

                        userPreferences = returnFields.metadata.pFields.split('|');

                        userPreferences = {
                            providerGroupId: userPreferences[0],
                            providerGroupDesc: userPreferences[1],
                            firstName: userPreferences[2],
                            lastName: userPreferences[3],
                            address1: userPreferences[4],
                            address2: userPreferences[5],
                            city: userPreferences[6],
                            state: userPreferences[7],
                            zip: userPreferences[8],
                            email: userPreferences[9],
                            homePhone: userPreferences[10],
                            fax: userPreferences[11],
                            theme: userPreferences[12],
                            activate: (userPreferences[13].toLowerCase() !== "no"),
                            phone: userPreferences[14],
                            cell: userPreferences[15],
                            ext: userPreferences[16],
                            adminUser: userPreferences[17],
                            defaultReportOutput: userPreferences[18],
                            createWebMessage: userPreferences[19],
                            providerType: userPreferences[20],
                            providerGroupType: userPreferences[21]
                        };

                        Atlas.user.tempUserPreference = Atlas.user.userPreferences;
                        Atlas.user.tempUserPreference = Atlas.user.un;
                        Atlas.user.userPreferences = userPreferences;
                        Atlas.user.un = user;

                        me.loadProviders();
                        me.loadInitialNotifications();
                        me.loadInitialMessages();

                        providerNavPanel.show();
                    }
                });
            },
            callback: function (record) {
            }
        });
    },
    deactivateSuperuser: function(button) {
        var textfield = this.lookup('superuserTextfield')
        var activateButton = this.lookup('activateButton');
        var segBttn = this.lookup('superuserButton');
        var goButton = this.lookup('goButton');
        var deactivateButton = this.lookup('deactivateButton');
        var providerNavPanel = this.getView().down().down().lookup('providerpanel');

        activateButton.setDisabled(true);
        segBttn.setValue(1);
        deactivateButton.setText('Superuser In-active');
        goButton.setHidden(false);
        textfield.setDisabled(false);

        Atlas.user.userPreferences = Atlas.user.tempUserPreference;
        Atlas.user.un = Atlas.user.tempUn;
        Atlas.user.tempUserPreference = '';
        Atlas.user.tempUn = '';

        this.loadProviders();
        this.loadInitialNotifications();
        this.loadInitialMessages();

        providerNavPanel.hide();
    },
    onToggle: function(e) {
        var that =  this;
        if(e.value === 1) {
            this.deactivateSuperuser();
        } else {
            Ext.MessageBox.confirm('Confirm Super User', 'Are you sure you would like to enter super user mode for ' + this.lookup('superuserTextfield').value,  function (id, value) {
                if (id === 'yes') {
                    that.activateSuperuser();
                }
            }, this);
        }
    },
    onUserClick: function (button) {
        var me = this,
            vm = me.getViewModel(),
            user = vm.get('user'),
            userForm;

        if (user.start == 'merlin') {
            Ext.create({
                xtype: 'common-myprofile',
                autoShow: true
            });
        }
        else {
            if (user.start == 'rxprescriber') {
                userForm = 'userrxprescriber'
            }
            else if (user.start == 'rxpharmacy') {
                userForm = 'userrxpharmacy'
            }
            else if (user.start == 'hpprovider') {
                userForm = 'userhpprovider'
            }
            else if (user.start == 'hpmember') {
                userForm = 'userhpmember'
            }

            Ext.create('Ext.window.Window', {
                title: 'User Settings',
                modal: true,
                autoShow: true,
                viewModel: {
                    parent: vm //windows need to have the VM chain added to them
                },

                layout: 'fit',
                items: [
                    {
                        xtype: userForm
                    }
                ]
            });
        }
    },
    loadInitialNotifications: function () {
    var me = this,
      
    homeStores = this.getView().down().down().items.items[2].items.items[0].viewModel.storeInfo;
    notifications = homeStores.notifications;

    notifications.getProxy().setExtraParam('pUserName', Atlas.user.un);
    notifications.getProxy().setExtraParam('userState', Atlas.user.providerStateSelected);
    notifications.load({
      callback: function (record) {
        var unread = 0,
          i = 0;

        if (null !== record) {
          for (i = 0; i < record.length; i++) {
            if ('false' === record[i].getData().read) {
              unread += 1;
            }
          }
        }

        me.getViewModel().set('unreadNotifications', unread);
      }
    });
  },

  loadInitialMessages: function () {
    var me = this,

    homeStores = this.getView().down().down().items.items[2].items.items[0].viewModel.storeInfo;
    providerListStore = homeStores.providerList,
    cocSearchParam = ' taskFlag = false ',
    cocMessagesStore = homeStores.coc,
    cocProviderIds = null;

    providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerListStore.load({
      callback: function (record) {
        var i = 0;

        if (null !== record) {
          for (i = 0; i < record.length; i++) {
            cocProviderIds += ',' + record[i].getData().provID;
          }

          cocProviderIds = cocProviderIds.substring(5);

          cocSearchParam = cocSearchParam + ' AND messageReadDate=? AND LOOKUP(trim(messageTo),\'' + cocProviderIds +
            '\')>0';

          cocMessagesStore.getProxy().setExtraParam('pWhere', cocSearchParam);
          cocMessagesStore.load({
            callback: function (messageRecord) {
              var unread = 0,
                j = 0,
                currentUser = null;

              if (messageRecord[0] !== undefined) {
                currentUser = messageRecord[0].getData().messageTo;
              }

              for (j = 0; j < messageRecord.length; j++) {
                if (null === messageRecord[j].getData().messageReadDate) {
                  unread += 1;
                }
              }

              me.getViewModel().set('currentUser', currentUser);
              me.getViewModel().set('unreadMessages', unread);
            }
          });
        }
      }
    });
  },

    loadProviders: function () {
        var homeStores = this.getView().down().down().items.items[2].items.items[0].viewModel.storeInfo;
        var providerListStore = homeStores.providerList;

        providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
        providerListStore.load();
    },


    onIncludeRemovalClick: function () {
        var vm = this.getViewModel(),
            grid = this.lookup('removalListGrid'),
            gridStore = grid.getStore(),
            gridData = gridStore.getData(),
            duplicate = false,
            selectedProviderName = this.lookup('providersCombo').rawValue,
            selectedProviderID = this.lookup('providersCombo').value,
            removalListStore = vm.getStore('providerRemovalList'),
            providerObjectArray = vm.get('providerListForRemovalData'),
            i = 0,
            provID = null;

        if ('' === selectedProviderName) {
            Ext.MessageBox.alert('Inclusion Failed', 'No Provider selected. Please choose one from the dropdown.');
        } else {
            for (i = 0; i < gridData.items.length; i++) {
                provID = gridData.items[i].getData().provID;

                if (provID === selectedProviderID) {
                    duplicate = true;
                }
            }

            if (false === duplicate) {
                providerObjectArray.push({
                    'fullName': selectedProviderName,
                    'provID': selectedProviderID,
                    'npiNum': null
                });

                removalListStore.setData(null);
                removalListStore.setData(providerObjectArray);
                vm.set('providerListForRemovalData', providerObjectArray);
            } else {
                Ext.MessageBox.alert('Duplicate Entry', 'Provider has already been added.');
            }
        }
    }


    // onSplitWorkspacePanel: function (button) {
    //     var activeWorkspace = this.getReferences().mainPanel.getLayout().getActiveItem();
    //     this.fireEvent('splitWorkspaceTabs', activeWorkspace);
    // },
    //
    // onMergeWorkspacePanel: function (button) {
    //     var activeWorkspace = this.getReferences().mainPanel.getLayout().getActiveItem();
    //     this.fireEvent('mergeWorkspaceTabs', activeWorkspace);
    // }

});