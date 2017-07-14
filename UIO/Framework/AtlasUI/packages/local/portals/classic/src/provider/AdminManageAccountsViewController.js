Ext.define('Atlas.portals.provider.AdminManageAccountsViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.adminmanageaccounts',

  requires: [
    'Ext.exporter.text.CSV'
  ],

  init: function () {
    var me = this,
      vm = me.getViewModel();

    me.getUserCount();
    vm.set('isReadOnly', true);
  },

  getUserCount: function () {
    var me = this,
      vm = me.getViewModel();

    Ext.Ajax.request({
      useDefaultXhrHeader: false,
      withCredentials: true,
      paramsAsJson: true,
      noCache: false,
      url: Atlas.apiURL + 'system/hp/userslist4admin/read',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      params: Ext.JSON.encode({
        pSessionID: Atlas.user.sessionId,
        userState: Atlas.user.providerStateSelected,
        pUsername: Atlas.user.un
      }),
      success: function (response) {
        var obj = Ext.decode(response.responseText);

        vm.set('userCount', obj.metadata.pCount);
        vm.set('userNames', obj.metadata.pFields);
      },
      failure: function (response) {
        var obj = Ext.decode(response.responseText);

        Ext.Msg.show('Error', obj.message[0].message);
      }
    });
  },

  createAdditionalUsers: function () {
    var me = this,
      vm = me.getViewModel(),
      userCount = parseInt(vm.get('userCount')),
      numberOfUsers = parseInt(me.lookupReference('numberOfUsers').getValue()),
      sCnt = userCount + 1,
      eCnt = userCount + numberOfUsers,
      obj = '';

    Ext.Ajax.request({
      useDefaultXhrHeader: false,
      withCredentials: true,
      paramsAsJson: true,
      noCache: false,
      url: Atlas.apiURL + 'system/hp/createadditionalusers/update',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      params: Ext.JSON.encode({
        pSessionID: Atlas.user.sessionId,
        userState: Atlas.user.providerStateSelected,
        vUserName: Atlas.user.un,
        sCnt: sCnt,
        eCnt: eCnt
      }),
      success: function (response) {
        me.getUserCount();

        obj = Ext.decode(response.responseText);

        vm.set('createUsersMessage', obj.data[0].pMessage);
      },
      failure: function (response) {
        obj = Ext.decode(response.responseText);

        Ext.Msg.show('Error', obj.message[0].message);
      }
    });
  },

  exportUsers: function () {
    var me = this,
      userListStore = this.getViewModel().getStore('userList'),
      proxy = userListStore.getProxy(),
      userData = '',
      csvData = '',
      exporter = '';

    Ext.MessageBox.show({
      title: 'Request Submitted',
      msg: 'Please Wait...',
      closable: false
    });

    proxy.setExtraParam('pUsername', Atlas.user.un);
    proxy.setExtraParam('pagination', false);
    userListStore.load(function (records, operation, success) {
      if (success) {
        userData = Ext.JSON.decode(operation._response.responseText).data;
        csvData = me.prepareCSVData(userData, ['rowNum', 'username', 'lastname', 'firstname', 'email', 'usrstatus']);
        exporter = Ext.Factory.exporter({
          type: 'csv',
          data: {
            columns: [{
              text: '#'
            }, {
              text: 'User ID'
            }, {
              text: 'Last Name'
            }, {
              text: 'First Name'
            }, {
              text: 'Email'
            }, {
              text: 'User Status'
            }],

            groups: {
              rows: csvData
            }
          }

        });

        exporter.saveAs();
        Ext.MessageBox.hide();
      } else {
        Ext.MessageBox.alert('Request Failed', 'Something went wrong. Please try again later.');
      }
    });
  },

  prepareCSVData: function (data, columns) {
    var rows = [],
      cells = [],
      i = 0,
      j = 0;

    for (i = 0; i < data.length; i++) {
      cells = [];

      for (j = 0; j < columns.length; j++) {
        if (data[i].hasOwnProperty(columns[j])) {
          cells.push({
            value: data[i][columns[j]]
          });
        }
      }

      rows.push({
        cells: cells
      });
    }

    return rows;
  },

  idsNeverUsed: function () {
    var me = this,
      vm = me.getViewModel();

    Ext.Ajax.request({
      useDefaultXhrHeader: false,
      withCredentials: true,
      paramsAsJson: true,
      noCache: false,
      url: Atlas.apiURL + 'system/hp/userslistneverused4admin/read',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      params: Ext.JSON.encode({
        pSessionID: Atlas.user.sessionId,
        userState: Atlas.user.providerStateSelected,
        pUsername: Atlas.user.un
      }),
      success: function (response) {
        var obj = Ext.decode(response.responseText);

        if (0 === obj.metadata.pCount) {
          vm.set('unusedActiveTerminatedUsers', 'Currently there are no user IDs that are never used.');
        } else {
          vm.set('unusedActiveTerminatedUsers', Ext.String.format('ID(s) never' +
          'used : Currently there are {0} user ID(s) never used. The user(s)' +
          'range from ({1}).', obj.metadata.pFields, obj.metadata.pCount));
        }
      },
      failure: function (response) {
        Ext.Msg.show('Error', response.data[0].pMessage);
      }
    });
  },

  activeUsers: function () {
    this.getActiveOrTerminatedUsers('A');
  },

  terminatedUsers: function () {
    this.getActiveOrTerminatedUsers('T');
  },

  getActiveOrTerminatedUsers: function (status) {
    var me = this,
      vm = me.getViewModel(),
      pType = '',
      formatString = '';

    if ('A' === status) {
      pType = 'YES';
      formatString = 'Active user(s) : {0}';
    } else if ('T' === status) {
      pType = 'NO';
      formatString = 'Terminated user(s) : {0}';
    }

    Ext.Ajax.request({
      useDefaultXhrHeader: false,
      withCredentials: true,
      paramsAsJson: true,
      noCache: false,
      url: Atlas.apiURL + 'system/hp/activeuserslistweb/read',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      params: Ext.JSON.encode({
        pSessionID: Atlas.user.sessionId,
        userState: Atlas.user.providerStateSelected,
        pUsername: Atlas.user.un,
        pType: pType
      }),
      success: function (response) {
        var obj = Ext.decode(response.responseText);

        vm.set('unusedActiveTerminatedUsers', Ext.String.format(formatString, obj.metadata.pFields));
      },
      failure: function (response) {
        Ext.Msg.show('Error', response.data[0].pMessage);
      }
    });
  },

  formatPhone: function (phoneNum) {
    if ('' !== phoneNum) {
      if (-1 === phoneNum.indexOf('(')) {
        return '(' + phoneNum.substring(0, 3) + ') ' + phoneNum.substring(3, 6) + '-' + phoneNum.substring(6, 10);
      }

      return phoneNum.substring(0, 5) + ' ' + phoneNum.substring(5);
    }

    return phoneNum;
  },

  getUser: function (sender) {
    var me = this,
      vm = me.getViewModel(),
      userName = sender.getValue(),
      record = {},
      UserSetupModel = '';

    if (true === Atlas.user.adminUser && Atlas.user.un.substring(0, 3) === userName.substring(0, 3)) {
      UserSetupModel = Ext.create('Atlas.portals.provider.model.UserSetupWeb', {});

      UserSetupModel.getProxy().setExtraParam('pUserName', userName);
      UserSetupModel.load({
        callback: function (records, operation) {
          var metadata = Ext.decode(operation.getResponse().responseText).metadata,
            returnFields = metadata.pFields ? metadata.pFields.split('|') : '';

          if (0 < returnFields.length) {
            record.UserName = userName;
            record.ProviderGroupId = returnFields[0];
            record.ProviderGroupDesc = returnFields[1];
            record.FirstName = returnFields[2];
            record.LastName = returnFields[3];
            record.Address1 = returnFields[4];
            record.Address2 = returnFields[5];
            record.City = returnFields[6];
            record.State = returnFields[7];
            record.Zip = returnFields[8];
            record.Email = returnFields[9];
            record.HomePhone = me.formatPhone(returnFields[10]);
            record.Fax = me.formatPhone(returnFields[11]);
            record.Theme = returnFields[12];
            record.Activate = 'yes' === returnFields[13]; //(("no".equalsIgnoreCase(st.nextToken())? false ]; true));
            record.Terminate = !record.Activate;
            record.Phone = me.formatPhone(returnFields[14]);
            record.Cell = me.formatPhone(returnFields[15]);
            record.Ext = returnFields[16];
            record.AdminUser = returnFields[17]; //	userPrefDetails.setAdminUser(st.nextToken());
            record.DefaultReportOutput = returnFields[18];
            //this is the web message flag that allows population of the notifications
            record.CreateWebMessage = returnFields[19];
            record.ProviderType = returnFields[20];
            record.ProviderGroupType = returnFields[21];

            vm.set('isReadOnly', record.Terminate);
          } else {
            record.UserName = userName;
            record.ProviderGroupId = '';
            record.ProviderGroupDesc = '';
            record.FirstName = '';
            record.LastName = '';
            record.Address1 = '';
            record.Address2 = '';
            record.City = '';
            record.State = '';
            record.Zip = '';
            record.Email = '';
            record.HomePhone = '';
            record.Fax = '';
            record.Theme = '';
            record.Activate = false;
            record.Phone = '';
            record.Cell = '';
            record.Ext = '';
            record.AdminUser = '';
            record.DefaultReportOutput = '';
            record.CreateWebMessage = '';
            record.ProviderType = '';
            record.ProviderGroupType = '';

            vm.set('isReadOnly', true);
            me.showStatusMessage(Ext.String.format('{0} is not a valid user name.', userName));
          }

          vm.set('record', record);
        }
      });
    } else {
      vm.set('isReadOnly', true);
      vm.set('record', record);
      if (userName) {
        me.showStatusMessage('You are not authorized to access this user information.');
      }
    }
  },

  onUserNameFocus: function (sender) {
    var me = this,
      vm = me.getViewModel(),
      record = {
        UserName: sender.getValue()
      };

    vm.set('record', record);
    vm.set('isReadOnly', true);
  },

  updateUser: function () {
    var me = this,
      form = me.lookupReference('userDetailsForm').getForm(),
      record = form.getValues(),
      inputValues = [];

    if (form.isValid()) {
      inputValues.push(record.FirstName); // 1
      inputValues.push(record.LastName); // 2
      inputValues.push(record.Address1); // 3
      inputValues.push(record.Address2); // 4
      inputValues.push(record.City); // 5
      inputValues.push(record.State); // 6
      inputValues.push(record.Zip); // 7
      inputValues.push(record.Email); // 8
      inputValues.push(record.HomePhone); // 9
      inputValues.push(record.Fax); // 10
      inputValues.push('null' === record.Theme ? '' : record.Theme); // 11
      inputValues.push(record.Phone); // 12
      inputValues.push(record.Cell); // 13
      inputValues.push(record.Ext); // 14

      Ext.Ajax.request({
        useDefaultXhrHeader: false,
        withCredentials: true,
        paramsAsJson: true,
        noCache: false,
        url: Atlas.apiURL + 'system/hp/usersetupweb/update',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        params: Ext.JSON.encode({
          pSessionID: Atlas.user.sessionId,
          userState: Atlas.user.providerStateSelected,
          pUserName: record.UserName,
          pFields: inputValues.join('|')
        }),
        success: function (response) {
          var obj = Ext.decode(response.responseText);

          me.getUserCount();

          if ('Success' === obj.message[0].message) {
            me.showStatusMessage('Your preferences were successfully saved.');
          } else {
            me.showStatusMessage('Request failed: ' + obj.message[0].message);
          }
        },
        failure: function (response) {
          var obj = Ext.decode(response.responseText);

          Ext.Msg.show('Error', obj.message[0].message);
        }
      });
    } else {
      Ext.Msg.alert('Error', 'Please fill in all required fields');
    }
  },

  showStatusMessage: function (msg) {
    if (msg) {
      Ext.Msg.alert('Manage Accounts', msg);
    }
  },

  onTerminateChange: function (sender, newValue) {
    var me = this,
      userName = me.lookupReference('userName'),
      createDate = '',
      createTime = '';

    if (!sender.disabled && newValue) {
      Ext.Msg.confirm(
        'Confirm',
        'User account terminated cannot be activated again or reassigned to another (new) user.' +
        'Are you sure you want to terminate this user?',
        function (btn) {
          if ('yes' === btn) {
            if (userName) {
              createDate = new Date();
              createTime = (createDate.getHours() * 3600) + (createDate.getMinutes() * 60) + createDate.getSeconds();

              Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'system/hp/terminateuser/update',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                  pSessionID: Atlas.user.sessionId,
                  userState: Atlas.user.providerStateSelected,
                  pUserName: userName.getValue(), // the user being terminated
                  pCreateDate: createDate,
                  pCreateTime: createTime,
                  pCreateUser: Atlas.user.un,
                  pTermDate: createDate
                }),
                success: function (response) {
                  var obj = Ext.decode(response.responseText);

                  if (true === obj.message[0].message) {
                    me.showStatusMessage('User has been terminated');
                  } else {
                    me.showStatusMessage(obj.message[0].message);
                  }
                },
                failure: function (response) {
                  Ext.Msg.show('Error', response.message);
                }
              });
            } else {
              me.showStatusMessage('Please enter the username.');
            }
          }
        }
      );
    }
  },

  clearFields: function () {
    var me = this,
      vm = me.getViewModel();

    vm.set('record', {});
    vm.set('unusedActiveTerminatedUsers', '');
    vm.set('createUsersMessage', '');
  },

  resetPasswordAndQuestions: function () {
    var me = this,
      userName = me.lookupReference('userName').getValue();

    Ext.Msg.confirm('Confirm', 'Do you also want to reset the Secret Question/Answers for this user?', function (btn) {
      if ('yes' === btn) {
        if (!userName) {
          me.showStatusMessage('Please enter the username.');

          return;
        }
        Ext.Ajax.request({
          useDefaultXhrHeader: false,
          withCredentials: true,
          paramsAsJson: true,
          noCache: false,
          url: Atlas.apiURL + 'system/hp/userdataweb/update',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          params: Ext.JSON.encode({
            pSessionID: Atlas.user.sessionId,
            userState: Atlas.user.providerStateSelected,
            pUserName: userName,
            pFieldList: 'secretQASetupStatus,questionid1,questionid2,answer1,answer2,newuser',
            pFields: 'false|||||true'
          }),
          success: function (response) {
            var obj = Ext.decode(response.responseText);

            if ('' === obj.message[0].message) {
              // reset the password
              me.resetPassword(userName);
            } else {
              me.showStatusMessage('Request failed: ' + obj.message[0].message);
            }
          },
          failure: function (response) {
            var obj = Ext.decode(response.responseText);

            Ext.Msg.show('Error', obj.message[0].message);
          }
        });
      } else {
        me.resetPassword(userName);
      }
    });
  },

  resetPassword: function (userName) {
    var me = this;

    Ext.Ajax.request({
      useDefaultXhrHeader: false,
      withCredentials: true,
      paramsAsJson: true,
      noCache: false,
      url: Atlas.apiURL + 'system/hp/resetpasswordweb/update',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      params: Ext.JSON.encode({
        pSessionID: Atlas.user.sessionId,
        userState: Atlas.user.providerStateSelected,
        pChangeType: 'ResetPasswordByAdmin',
        pUserName: userName,
        pEmail: '',
        pOldPassword: '',
        pNewPassword: ''
      }),
      success: function (response) {
        var obj = Ext.decode(response.responseText),
          msg = obj.message[0].message;

        if (msg) {
          me.showStatusMessage(obj.message[0].message);
        } else {
          me.showStatusMessage('The password was not reset.  Please try again.');
        }
      },
      failure: function (response) {
        var obj = Ext.decode(response.responseText);

        Ext.Msg.show('Error', obj.message[0].message);
      }
    });
  },

  bulkPasswordReset: function () {
    var me = this,
      vm = me.getViewModel(),
      userNames = vm.get('userNames'), // abc001-abc029
      userName = '',
      firstId = '',
      lastId = '',
      win = me.lookupReference('bulkPasswordResetDialog');

    if (userNames) {
      userName = userNames.substring(0, 3);
      firstId = userNames.substring(3, 6);
      lastId = userNames.substring(userNames.length - 3, userNames.length);

      vm.set('bulkReset', {
        userName: userName,
        firstId: parseInt(firstId),
        lastId: parseInt(lastId)
      });

      vm.set('bulkMessage', '');

      win.show();
    } else {
      Ext.Msg.alert('Error', 'There are no users to reset');
    }
  },

  onBulkPasswordReset: function () {
    var me = this,
      vm = me.getViewModel(),
      bulkReset = vm.get('bulkReset'),
      firstId = me.lookupReference('firstId').getValue(),
      intFirstId = parseInt(firstId),
      lastId = me.lookupReference('lastId').getValue(),
      intLastId = parseInt(lastId);

    if (!firstId || !lastId) {
      Ext.Msg.alert('Range Validation', 'Start or End range cannot be blank.');

      return;
    }

    if (1 >= intFirstId || intFirstId < bulkReset.firstId) {
      Ext.Msg.alert('Range Validation', 'Start range cannot be either 0 or 1.');
    } else if (intLastId > bulkReset.lastId) {
      Ext.Msg.alert('Range Validation', 'End range cannot exceed ' + bulkReset.lastId);
    } else if (intLastId < intFirstId) {
      Ext.Msg.alert('Range Validation', 'End range should be greater than start range.');
    } else {
      Ext.Ajax.request({
        useDefaultXhrHeader: false,
        withCredentials: true,
        paramsAsJson: true,
        noCache: false,
        url: Atlas.apiURL + 'system/hp/resetpassword4batchweb/update',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        params: Ext.JSON.encode({
          pSessionID: Atlas.user.sessionId,
          userState: Atlas.user.providerStateSelected,
          pUserName: Atlas.user.un,
          sCnt: intFirstId,
          eCnt: intLastId
        }),
        success: function (response) {
          var obj = Ext.decode(response.responseText),
            msg = obj.message[0].message;

          if (msg) {
            vm.set('bulkMessage', obj.message[0].message);
          } else {
            vm.set('bulkMessage', 'The passwords were not reset.  Please try again.');
          }
        },
        failure: function (response) {
          var obj = Ext.decode(response.responseText);

          Ext.Msg.show('Error', obj.message[0].message);
        }
      });
    }
  },

  onBulkCancel: function () {
    var me = this,
      win = me.lookupReference('bulkPasswordResetDialog');

    win.hide();
  }
});