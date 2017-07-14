Ext.define('SSO.controller.Main', {
    extend: 'Ext.app.Controller',

    init: function () {
        this.doSSO();
    },

    doSSO: function () {
        var user = JSON.parse(sessionStorage.getItem('AtlasAuthorization-user')),
            me = this,
            qs = Ext.Object.fromQueryString(location.search),
            resumePath = qs['resumePath'],
            vendorID = qs['vendorID'] || 'jnj',
            pUserName = sessionStorage.getItem('ssouser'),
            pPlanId = sessionStorage.getItem('ssouserplan'),
            pRecId = sessionStorage.getItem('ssouserrecid'),
            url = Atlas.apiURL + 'authentication/sso/read';

        if (user) {
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
                    userAgent: navigator.userAgent,
                    pVendorID: vendorID,
                    pPlanID: pPlanId,
                    pRecipientID: pRecId,
                    pUserName: pUserName,
                    resumePath: resumePath,
                    pUserType: user.start
                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);
                    window.location.replace(obj.data[0].URL);
                },
                callback: function (){
                    Ext.defer(function () {
                        sessionStorage.setItem('ssouser',null);
                        sessionStorage.setItem('ssouserplan',null);
                        sessionStorage.setItem('ssouserportalplan',null);
                        sessionStorage.setItem('ssouserrecid',null);
                    }, 10000);
                }
            });
        }
    }
});