Ext.define('Atlas.controller.Auth', {
  extend: 'Ext.app.Controller',
  requires: [
    'Atlas.view.AtlasLogin',
    'Atlas.view.AtlasLoginController'
  ],
  listen: {
    controller: {
      '*': {
        authorize: 'onAuthorize',
        validatesession: 'doValidateSession',
        login: 'onLogin',
        authvalid: 'onAuthValid',
        authinvalid: 'onAuthInvalid',
        servererror: 'onServerError',
        logout: 'onLogout',
        activate: 'onActivate',
                // dologin: 'doLogin',
        resetpassword: 'onResetPassword'
                // doresetpassword: 'doResetPassword',
      }
    }
  },

  storageName: 'AtlasAuthorization',

  isAuthenticating: false,
  isIdle: false,
  idleTime: 0,
  idleTimeout: 60 * 60,

  init: function () {
    var me = this,
      logout = Boolean(location.pathname.match(/logout/g)) || Boolean(location.search.match(/logout/g));
        // observe all connections to the server and handle request errors.
    Ext.util.Observable.observe(Ext.data.Connection, {
      requestexception: this.onRequestException,
      scope: me
    });

    if (logout) {
      me.fireEvent('logout');
    }

    me.determineStartPage();

    me.startIdleWatch();
  },

  determineStartPage: function () {
    var me = this,
      sessionStart = this.getStart(),
      parts = location.hostname.split('.');

    if (sessionStart == 'rxmember' || Boolean(parts[0].match(/rxmember/g)) || Boolean(location.pathname.match(/memberrx/g)) || Boolean(location.search.match(/rxmember/g))) {
      me.start = 'rxmember';
      me.loginWindow = 'Atlas.view.auth.RxMemberLogin';
    } else if (sessionStart == 'rxprescriber' || Boolean(parts[0].match(/rxprescriber/g)) || Boolean(location.pathname.match(/prescriber/g)) || Boolean(location.search.match(/rxprescriber/g))) {
      me.start = 'rxprescriber';
      me.loginWindow = 'Atlas.view.auth.RxPrescriberLogin';
      me.passwordResetWindow = 'Atlas.view.auth.RxPrescriberUserActivation';
    } else if (sessionStart == 'rxpharmacy' || Boolean(parts[0].match(/rxpharmacy/g)) || Boolean(location.pathname.match(/pharmacyrx/g)) || Boolean(location.search.match(/rxpharmacy/g))) {
      me.start = 'rxpharmacy';
      me.loginWindow = 'Atlas.view.auth.RxPharmacyLogin';
    } else if (sessionStart == 'merlin' || parts[0].match(/rx/g) || Boolean(location.pathname.match(/merlin/g)) || Boolean(location.search.match(/merlin/g)) || Boolean(location.pathname.match(/benefitplan/g)) || Boolean(location.search.match(/benefitplan/g)) || Boolean(location.pathname.match(/formulary/g)) || Boolean(location.search.match(/formulary/g))) {
      me.start = 'merlin';
      me.loginWindow = 'Atlas.view.auth.MerlinLogin';
    } else if (sessionStart == 'hpmember' || Boolean(parts[0].match(/hpmember/g)) || Boolean(location.pathname.match(/membermhp/g)) || Boolean(location.search.match(/hpmember/g))) {
      me.start = 'hpmember';
      me.loginWindow = 'Atlas.view.auth.HpMemberLogin';
      me.activateWindow = 'Atlas.view.auth.HpMemberActivation';
    } else if (sessionStart == 'hpprovider' || Boolean(parts[0].match(/hpprovider/g)) || Boolean(location.pathname.match(/provider/g)) || Boolean(location.search.match(/hpprovider/g))) {
      me.start = 'hpprovider';
      me.loginWindow = 'Atlas.view.auth.HpProviderLogin';
    } else {
      me.start = 'empty';
      me.loginWindow = 'Atlas.view.AtlasLogin';
    }
  },

    //any 401 or 403 means the authentication fails.
    // any 500 is internal server error
  onRequestException: function (conn, response, options) {
    if (response && Ext.Array.contains([ 401, 403 ], response.status)) {
      this.fireEvent('authinvalid');
      return false; //prevent further propagation
    } else if (response && Ext.Array.contains([ 500 ], response.status)) {
      this.fireEvent('servererror');
      return false; //prevent further propagation
    }
  },

  onAuthorize: function () {
    var me = this,
      user = me.getUser(),
      isActivateLink = false,
      isResetLink = false,
      queryStringValues = window.location.search.substring(1).split('&').reduce(function (prev, curr) {
        var delimiterPosition = curr.indexOf('='),
          key = delimiterPosition > 0 ? curr.slice(0, delimiterPosition) : curr,
          value = delimiterPosition > 0 ? curr.slice(delimiterPosition + 1) : curr;

        prev[decodeURIComponent(key)] = value === undefined ? '' : decodeURIComponent(value);

        if (key.toLowerCase() == 'actionname' && value.toLowerCase() == 'a') {
          isActivateLink = true;
        }

        if (me.start == 'rxprescriber' && key.toLowerCase() == 'resetlinkclick') {
          isResetLink = true;
        }

        return prev;
      }, {
      });

    me.isAuthenticating = true;

    if (user) {
      this.doValidateSession(user);
    } else if (isActivateLink && me.start == 'hpmember') {
      this.fireEvent('activate', queryStringValues);
    } else if (isResetLink && me.start == 'rxprescriber') {
      this.fireEvent('resetPassword', queryStringValues);
    } else {
      this.fireEvent('login');
    }
  },

  onActivate: function (queryStringValues) {
    Ext.create(this.activateWindow, {
      viewModel: {
        data: {
          activationCode: queryStringValues.activationcode,
          email: queryStringValues.mememail
        }
      }
    });
  },

  getUser: function () {
    var me = this,
      storage = window.sessionStorage,
      user;

    if (storage) {
      user = JSON.parse(storage.getItem(me.storageName + '-user'));
    }

    return user;
  },

  setUser: function (user) {
    var me = this,
      storage = window.sessionStorage;

    if (storage && user) {
      storage.setItem(me.storageName + '-user', JSON.stringify(user));
      me.fireEvent('userupdate', user);
    } else if (storage && !user) {
      storage.removeItem(me.storageName + '-user');
    }

    return true;
  },

  getStart: function () {
    var me = this,
      storage = Ext.util.LocalStorage.get(me.storageName),
      start;

    if (storage) {
      start = JSON.parse(storage.getItem('start'));
    }
    storage.release();
    return start;
  },

  onLogin: function () {
        // This is defined when we determin the startpage on init
    Ext.create(this.loginWindow);
  },

  doLogin: function (credentials) {
    var me = this,
      user = {
      },
      info = Ext.browser.name + '|' + window.screen.availWidth + '/' + window.screen.availHeight + '|' + 'iphere' + '|' + Ext.os.name,
      url;

    me.fireEvent('updateLoginStatus', 'working...');
  },

  endHPSession: function () {
    if (Atlas.user) {
      var response = Ext.Ajax.request({
        async: false,
        useDefaultXhrHeader: false,
        withCredentials: true,
        paramsAsJson: true,
        noCache: false,
        url: Atlas.apiURL + 'system/hp/logoutuser/update',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        params: Ext.JSON.encode({
          pSessionID: Atlas.user.sessionId,
          userState: Atlas.user.portalStateSelected
        })
      });

      if (Ext.decode(response.responseText).message[0].code == 200) {
        var obj = Ext.decode(response.responseText),
          user = {
          };

        console.dir(obj);

        Atlas.user.SessionID = null;
      } else {
        console.log('server-side failure with status code ' + Ext.decode(response.responseText).message[0].code);

                //fake it
        Atlas.user.SessionID = null;
      }
    }
  },

  endRxSession: function () {
    var me = this;

    if (Atlas.user) {
      Ext.Ajax.request({
        useDefaultXhrHeader: false,
        withCredentials: true,
        paramsAsJson: true,
        noCache: false,
        url: Atlas.apiURL + 'system/rx/endsession/update',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        params: Ext.JSON.encode({
          pSessionID: Atlas.user.sessionId
        }),
        success: function (response, opts) {
          var obj = Ext.decode(response.responseText),
            user = {
            };

          console.dir(obj);

          Atlas.user.SessionID = null;
        },
        failure: function (response, opts) {
          console.log('server-side failure with status code ' + response.status);
                    //  me.setUser(null);

                    //fake it
          Atlas.user.SessionID = null;
        }
      });
    }
  },

  onLogout: function () {
    var me = this,
      url,
      user = Atlas.user;
    if (user) {
      if (user.start === 'rxmember') {
        me.endRxSession();
      }

      if (user.start === 'hpmember') {
        me.endHPSession();
      }

      if (user.start === 'rxprescriber') {
        me.endRxSession();
      }

      if (user.start === 'hpprovider') {
        url = Atlas.apiURL + 'system/rx/logout/read';
      }

      if (user.start === 'rxpharmacy') {
        me.endRxSession();
      }

      if (user.start === 'merlin') {
        me.endRxSession();
      }
    }

    me.setUser(null);
    Atlas.user.SessionID = null;
    location.reload();
  },

  onAuthValid: function (user) {
    var me = this,
      win = Ext.first('window[reference=login]');

    Atlas.common.data.proxy.Layer7.prototype.config.extraParams = {
      pSessionID: user.sessionId,
      pSessionId: user.sessionId
    };

    if (user.homeState) {
      Atlas.common.data.proxy.Layer7.prototype.config.extraParams = {
        userState: user.homeState,
        pSessionID: user.sessionId,
        pSessionId: user.sessionId
      };
    }

    if (Atlas.atlasformulary) {
      Atlas.atlasformulary.data.proxy.FormularyProxy.prototype.config.headers = {
        accept: 'application/json',
        sessionid: user.sessionId,
        username: user.un
      };

      Atlas.atlasformulary.data.proxy.FormularyAjax.setDefaultHeaders({
        'sessionid': user.sessionId,
        'username': user.un
      });
    }

    if (Atlas.benefitplan) {
      Atlas.benefitplan.data.proxy.BenefitPlanProxy.prototype.config.headers = {
        accept: 'application/json',
        sessionid: user.sessionId,
        username: user.un
      };
    }

    Atlas.user = user;
    if(user.start=="merlin")
      Atlas.common.utility.Utilities.setServerDateTime();
	//Atlas.common.Util.setServerDateTime();
    Atlas.sessionId = user.sessionId;
        // persist user so we can get back if the whole page refreshes
    me.setUser(user);
    this.isAuthenticating = false;

    if (win) {
      win.destroy();
    }
  },

  onAuthInvalid: function () {
    this.fireEvent('logout');
  },

  onServerError: function () {
        // this.setUser(null);
        // Atlas.user.SessionID = null;
        // location.reload();
  },

  doValidateSession: function (user) {
    var me = this,
      userInfo,
      sessionId = user.sessionId,
      start = user.start,
      username = user.un,
      url;

    if (start === 'merlin') {
      url = Atlas.apiURL + 'system/rx/usermasterdata/read';
      Ext.Ajax.request({
        useDefaultXhrHeader: false,
        withCredentials: true,
        paramsAsJson: true,
        noCache: false,
        url: url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        params: Ext.JSON.encode({
          pSessionID: sessionId,
          pUserName: username,
          pFieldList: 'firstname,lastname,middlename,groupid,active,queueAdmin,createDateTime,email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo'
        }),
        success: function (response, opts) {
          var obj = Ext.decode(response.responseText),
            userInfo;

          userInfo = obj.data[0];

          Ext.apply(user, userInfo);

          me.fireEvent('authValid', user);
        },
        failure: function (response, opts) {
          console.log('server-side failure with status code ' + response.status);

                    //fake it
          if (user) {
            me.fireEvent('authValid', user);
          } else {
            me.fireEvent('login');
          }

                    //  me.setUser(null);
        }
      });
    }

    if (start === 'rxmember') {
      url = Atlas.apiURL + 'system/rx/memberusermaster/read';
      Ext.Ajax.request({
        useDefaultXhrHeader: false,
        withCredentials: true,
        paramsAsJson: true,
        noCache: false,
        url: url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        params: Ext.JSON.encode({
          pSessionId: sessionId,
          ipiRecipientId: user.retRecipientID
        }),
        success: function (response, opts) {
          var obj = Ext.decode(response.responseText),
            userInfo;

          userInfo = obj.data[0];
          userInfo.sessionId = user.retSessionID;

          Ext.apply(user, userInfo);
          me.fireEvent('authValid', user);
        }
      });
    }

    if (start === 'hpmember') {
      url = Atlas.apiURL + 'authentication/rx/validatesession/read';
      me.fireEvent('authValid', user);
    }

    if (start === 'rxprescriber') {
      url = Atlas.apiURL + 'system/rx/memberusermaster/read';
      me.fireEvent('authValid', user);
    }

    if (start === 'hpprovider') {
      url = Atlas.apiURL + 'authentication/rx/validatesession/read';
      me.fireEvent('authValid', user);
    }

    if (start === 'rxpharmacy') {
      url = Atlas.apiURL + 'authentication/rx/validatesession/read';
      me.fireEvent('authValid', user);
    }
  },

  onResetPassword: function (queryStringValues) {
    if (this.start == 'rxprescriber') {
      Ext.create(this.passwordResetWindow, {
        viewModel: {
          data: {
            emailVerfId: queryStringValues.ResetLinkClick,
            action: 'resetpassword'
          }
        }
      });
    }
  },

  doResetPassword: function (credentials) {
    var start = credentials.start;

    if (start === 'merlin') {
      Ext.MessageBox.show({
        title: 'Save Changes?',
        msg: 'Your password will be reset and the new password will be emailed to your registerd email id. Are you sure?',
        buttons: Ext.MessageBox.YESNO,
        scope: this,
        fn: function (btn) {
          if (btn === 'yes') {
            Ext.Ajax.request({
              useDefaultXhrHeader: false,
              withCredentials: true,
              paramsAsJson: true,
              noCache: false,
              url: Atlas.apiURL + 'system/rx/resetuserpassword/update',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },

              params: Ext.JSON.encode({
                pUserName: credentials.un,
                pSessionID: credentials.sessionId
                                // Ext.util.Base64.encode(credentials.pwd)
              }),
              success: function (response, opts) {
                var obj = Ext.decode(response.responseText),
                  user = {
                  };

                this.fireEvent('updateResetStatus', 'Instructions will be sent to your email.');

                                // console.dir(obj);
                                /*
                                 if (!!obj.metadata.pSessionID) { //obj.success
                                 Atlas.pSessionId = obj.metadata.pSessionID;
                                 Atlas.pSessionID = obj.metadata.pSessionID;

                                 user.start = credentials.start;
                                 user.un = credentials.un;
                                 user.sessionId = obj.metadata.pSessionID;
                                 me.setUser(user);

                                 me.fireEvent('authValid', user);
                                 } else {

                                 me.fireEvent('updateLoginStatus', obj.message[0].message);
                                 }
                                 */
              },
              failure: function (response, opts) {
                var user = {
                };
                console.log('server-side failure with status code ' + response.status);
              }
            });
          }
        },
        icon: Ext.MessageBox.QUESTION
      });
    }
  },

  startIdleWatch: function () {
    var me = this;

        //resets when activity happens
    me.resetTimer = function () {
      me.fireEvent('activity');
      if (me.isIdle) {
        me.fireEvent('active');
        me.isIdle = false;
      }
      me.idleTime = 0;
    };

    me.idleLoop = setInterval(me.onTimerIncrement, 1000, me);

        //events to reset
    window.onclick = me.resetTimer;
    window.onmousemove = me.resetTimer;
    window.onkeydown = me.resetTimer;
  },

  onTimerIncrement: function (me) {
    me.idleTime++;

        //don't logout if authenticating.
    if (me.idleTime > me.idleTimeout && !me.isAuthenticating) {
      me.fireEvent('logout');
    }
  }
});