Ext.define('Atlas.view.auth.MerlinLoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-merlinlogin',

    listen: {
        controller: {
            'auth-merlinchangepassword':  {
                'changePassword': 'onChangePassword'
            }
        }
    },
    onChangePassword: function(credentials) {
        this.lookupReference('username').setValue(credentials.credentials.username);
        this.lookupReference('password').setValue(credentials.credentials.password);
        this.onLogin();
    },
    init: function () {
        //Ext.getBody().addCls('mFooter');
        //Ext.getBody().addCls('mHeader');
        //this.getView().addCls('dudeMLC');
        var me   = this,
            view = this.getView(),
            url = 'system/rx/ctlsystem/read';

        /*var vewport = Ext.getViewPort();
        var northRegion = viewPort.region({
            .addcls())
        })*/

        var serverEnv = Atlas.common.utility.Utilities.post(
                url,
                null,
                ['pDatabaseType']
            );

        var databaseType = serverEnv.pDatabaseType,
            loginTitle = '',
            documentTitle = '';

        if (!databaseType) {
            me.updateStatus('The system is currently down for maintenance. Please try again later.');
            me.lookupReference('username').setDisabled(true);
            me.lookupReference('password').setDisabled(true);
            me.lookupReference('resetButton').setDisabled(true);
            me.lookupReference('login').setDisabled(true);
            return;
        }

        switch(databaseType) {
            case '1':
                loginTitle = 'Atlas Login';
                documentTitle = 'Atlas';

                break;

            case '2':
                loginTitle = 'QA Login - This is NOT PRODUCTION';
                documentTitle = 'Atlas[QA]';

                break;

            case '3':
                loginTitle = 'Development Login - This is NOT PRODUCTION';
                documentTitle = 'Atlas[DEV]';

                break;

            case '4':
                loginTitle = 'UAT Login - This is NOT PRODUCTION';
                documentTitle = 'Atlas[UAT]';
                break;

            case '5':
                loginTitle = 'DEMO Login - This is NOT PRODUCTION';
                documentTitle = 'Atlas[DEMO]';
                break;
        }

        view.setTitle (loginTitle);
        document.title = documentTitle;



/*
        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            paramsAsJson: false,
            noCache: false,
            url: url,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            success: function (response, opts) {

                var obj = Ext.decode(response.responseText),
                    dataBaseType = obj.metadata.pDatabaseType
                    envTitleText = '';


                if (dataBaseType == '2')
                {
                    envTitleText = 'QA Login - This is NOT PRODUCTION';
                    Atlas.docServiceNode = "http://mindjs01-qvl.caidan.local:3000/api/merlinviewdoc";
                    Atlas.docServiceRESTRead = "http://mirxdb01-qvl.caidan.local:8080/atlasrxshared/rest/atlasrxshared/getDocument";
                    Atlas.docServiceRESTUpdate = "http://mirxdb01-qvl.caidan.local:8080/atlasrxshared/rest/atlasrxshared/getDocument";
                }
                else if (dataBaseType == '3')
                {
                }
                else if (dataBaseType == '4')
                {
                    envTitleText = 'Demo Login - This is NOT PRODUCTION';
                }
                else if (dataBaseType == '5')
                {
 
                }

                view.setTitle (envTitleText);
            },
            failure: function (response, opts)
            {
                me.updateStatus('System is temperorily down for maintenance. System will be back up shortly. please contact Admin if any questions.');
            }
        })*/
    },

    onBoxReady: function(){
        var body =  Ext.fly(document.body);
        body.addCls('merlin-login');
        var vp = Ext.ComponentQuery.query('#mainViewPort')[0];
        vp.add(
            {
                itemId:'northPanel',
                region:'north',
                layout:'hbox',
                bodyStyle: 'background:transparent',
                frame: false,
                border: false,


                items:[
                    {
                        itemId:'merlinLogo',
                        xtype:'panel',
                        flex:1,
                        frame: false,
                        border: false,
                        bodyStyle: 'background:transparent'
                    },
                    {
                        itemId:'headerText',
                        xtype:'panel',
                        flex:1,
                        frame: false,
                        border: false,
                        bodyStyle: 'background:transparent; text-align:right '
                    }



                ]
            }
        );
        vp.add(
            {
                itemId:'southPanel',
                xtype:'panel',
                region:'south',
                frame: false,
                border: false,
                bodyStyle: 'background:transparent'
            }
        );
        var logo = Ext.ComponentQuery.query('#merlinLogo')[0];
        logo.addCls('mLogo');
        var np = Ext.ComponentQuery.query('#headerText')[0];
        np.addCls('mHeader');
        np.setHtml('<div>Welcome to MeridianRx</br>Tech Support: 1-866-984-6462</br>Email: mrxaccountmanagement@meridianrx.com</div>');
        var sp = Ext.ComponentQuery.query('#southPanel')[0];
        sp.addCls('mFooter');
        sp.setHtml('<div>Copyright © 2009-2017. All rights reserved.</br> <a href ="http://www.meridianrx.com">MeridianRx Website</a></div>');

    },

    onBeforeClose: function(){
        var body =  Ext.fly(document.body);
        body.removeCls('merlin-login');
        var vp = Ext.ComponentQuery.query('#mainViewPort')[0];
        var logo = Ext.ComponentQuery.query('#northPanel')[0];
        var x =vp.remove(logo);
        var np = Ext.ComponentQuery.query('#southPanel')[0];
        var y = vp.remove(np);

        return true;
    },

    onLogin: function () {

        var me = this,
            form = me.getView().down('form'),
            user = {},
            info = Ext.browser.name + '|' + window.screen.availWidth + '/' + window.screen.availHeight + '|' + 'iphere' + '|' + Ext.os.name + '|' + window.location.href,
            // url = Atlas.apiURL + 'authentication/rx/authenticateuser/read',
            url = 'authentication/rx/authenticateuser/read',
            credentials = form.getValues();

        if (form.isValid()) {
            me.updateStatus('working...');

            // var password = Atlas.common.utility.Utilities.passwordEncode(credentials.pwd);
            // debugger;




/*            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                paramsAsJson: true,
                noCache: false,
                url: url,
                //cors: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pUserName: credentials.un.toLowerCase(),
                    pPassword: credentials.pwd,
                    browserinfo: info
                    // Ext.util.Base64.encode(credentials.pwd)
                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText),
                        user = {};
                    // console.dir(obj);
                    if (!!obj.metadata.pSessionID) { //obj.success

                        user.start = me.getViewModel().get('start');
                        user.un = credentials.un.toLowerCase();
                        user.sessionId = obj.metadata.pSessionID;

                        //call validate to get more info
                        me.fireEvent('validatesession',user);
                        me.getView().close();

                    }
                    else if (obj.message[0].code == 5)
                    {
                        me.updateStatus(obj.message[0].message);
                        Ext.create('Atlas.view.auth.MerlinChangePassword');
                    }else {
                        me.updateStatus(obj.message[0].message);
                    }

                }
            });

            */
            var returnValue = Atlas.common.utility.Utilities.post(
                    'authentication/rx/authenticateuser/read',
                    {
                        pUserName: credentials.un.toLowerCase(),
                        pPassword: me.Encode(credentials.pwd),
                        cbrowserinfo: info
                    },

                    [ 'pSessionID']
                );


            if(!!returnValue.pSessionID) {
                var user = {};
                user.start = me.getViewModel().get('start');
                user.un = credentials.un.toLowerCase();
                user.sessionId = returnValue.pSessionID;

                //call validate to get more info
                //
                // me.fireEvent('validatesession',user);

                var url = Atlas.apiURL + 'system/rx/usermasterdata/read';
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
                        pSessionID: user.sessionId,
                        pUserName: user.un,
                        pFieldList: 'firstname,lastname,middlename,groupid,active,queueAdmin,createDateTime,email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo'
                    }),
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText),
                            userInfo;

                        if(obj.message[0].code == 0) {
                            userInfo = obj.data[0];

                            Ext.apply(user, userInfo);

                            me.fireEvent('authValid', user);

                            me.getView().close();
                        }
                        else {
                            if(obj.message[0].code === 104) {
                                me.updateStatus('No data access defined, please contact admin.');
                            }
                            else {
                                me.updateStatus(obj.message[0].message);
                            }
                        }
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
            else if (returnValue.code == 5)
            {
                me.updateStatus(returnValue.message);
                var s= Ext.create('Atlas.view.auth.MerlinChangePassword');
                s.getViewModel().data.username = this.lookupReference('username').getValue();
            }else {
                me.updateStatus(returnValue.message);
            }
        }
    },

    onReset: function () {
        var s = Ext.create('Atlas.view.auth.MerlinPassword');
        s.getViewModel().data.username = this.lookupReference('username').getValue();
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    },

    Encode:function (intputString) {

        var input = new ArrayBuffer(intputString.length);
        if(!intputString)
        {
            return;
        }

        else
        {
            input = this.string2Bin(intputString);
        }

        if(!input)
        {
            return;
        }

        var scratch = new ArrayBuffer(16) ;


        var hash = 17;
        var i = 0;
        for (i = 0; i < 5; i++)
        {
            if(i == 5) break;

            var j = 0;
            for (j = 0; j < 16; j++)
            {
                if(j == 16) break;
                scratch[15 - (j % 16)] ^= input[j];
            }
            // console.log (scratch);

            var k = 0;

            for (var k = 0; k < 16; k += 2)
            {
                if(k == 16) break;
                hash = this.Hash(scratch, hash);

                scratch[k] = (hash & 0xff);
                scratch[k + 1] = ((hash >> 8) & 0xff);
            }
        }

        var target = new ArrayBuffer(16) ;
        i = 0;
        for (i = 0; i < 16; i++)
        {
            if(i == 16) break;
            var lower = (scratch[i] & 0x7f);

            if (lower >= 65 && lower <= 90 || lower >= 97 && lower <= 122) // value is in string either A-Z or a-z
                target[i] = lower;
            else
                target[i] = ((scratch[i] >> 4) + 0x61);
        }

        var returnstring = this.bin2String(target);

        return returnstring;

    },

    Hash:function(scratch, hash)
    {

        var _lookup =
            [
                0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648,
                2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8000, 56577, 7616, 7296,
                56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401,
                62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16000, 65089, 64001, 15040, 15232, 64321,
                14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408,
                9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112,
                42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137,
                26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32000, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464,
                47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400,
                38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817,
                18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048,
                34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448
            ];
        var i = 15;
        for (i = 15; i >= 0; i--)
        {
            if(i < 0 ) break;
            hash = (
                hash >> 8 ^
                _lookup[hash & 0xff] ^
                _lookup[scratch[i]]
            );
        }

        return hash;
},

    bin2String:function(array) {
        var result = "";
        for (var i = 0; i < 16; i++) {
            result += String.fromCharCode(parseInt(array[i]));
        }
        return result;
},


    string2Bin:function(str) {
        var result = [];
        for (var i = 0; i < str.length; i++) {
            var arrayval = str.charCodeAt(i);
            if(arrayval)
            {
                result.push(arrayval);
            }
        }
        return result;
}

    

});