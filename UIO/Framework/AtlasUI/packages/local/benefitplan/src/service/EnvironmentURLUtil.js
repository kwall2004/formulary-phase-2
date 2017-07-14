/**
 * Created by n6570 on 11/28/2016.
 */

Ext.define('Atlas.benefitplan.service.EnvironmentURLUtil', {
    singleton: true,

    useVisualStudioForProxy: false,

    getEnvironmentBaseURL: function () {
        var currentEnv = Atlas.benefitplan.service.EnvironmentURLUtil.getEnvironmentName();
        var baseUrl;

        switch (currentEnv) {
            case 'dev':
                if (this.useVisualStudioForProxy) {
                    baseUrl = 'http://localhost:55229/benefitplanapi/api';
                    //When u want to test in local sandbox(http://localhost:1841/apps/atlas/#atlas/?sandbox)
                    // uncomment below line and comment above line
                    //baseUrl = 'http://micagw01-sva:8080/atlas/benefitplan';
                } else {
                    //TODO: use layer 7 so we can detect issues earlier.. This is broken for BP, so deal with it after the cors/proxy rewrite stuff happens
                    //baseUrl = 'http://apidev.atlascomplete.local/atlas/benefitplan';
                    baseUrl = 'http://api-dev.merlinpbm.com/benefitplanapi/api';
                    //When u want to test in local sandbox(http://localhost:1841/apps/atlas/#atlas/?sandbox)
                    // uncomment below line and comment above line
                    //baseUrl = 'http://micagw01-sva:8080/atlas/benefitplan';
                }
                break;
            case 'qa':
                baseUrl = 'http://api-qa.merlinpbm.com/benefitplanapi/api';
                break;
            case 'layer7dev':
                baseUrl = 'http://apidev.atlascomplete.local/atlas/benefitplan';
                //To hit backend directly without layer 7 uncomment below line and comment above line
                // baseUrl = 'http://apidev.atlascomplete.local/atlas/benefitplan/api';
                break;
            case 'layer7qa':
                baseUrl = 'http://apiqa.atlascomplete.local/atlas/benefitplan';
                //To hit backend directly without layer 7 uncomment below line and comment above line
                //baseUrl = 'http://apiqa.atlascomplete.local/atlas/benefitplan/api';
                break;
            case 'layer7uat':
                baseUrl = 'http://apiuat.atlascomplete.local/atlas/benefitplan';
                //To hit backend directly without layer 7 uncomment below line and comment above line
                //baseUrl = 'https://apiuat.atlascomplete.local/atlas/benefitplan/api';
                break;
            case 'prod':
                baseUrl = 'https://api.atlascomplete.com/atlas/benefitplan';
                break;
        }
        return baseUrl;
    },

    getEnvironmentName: function () {
        var env = 'remotedev';

        switch (window.location.host) {
            case 'localhost:1841':
                //console.log('---- Running local dev!');
                env = 'dev';
                break;
            case 'api-dev.merlinpbm.com':
                env = 'dev';
                break;
            case 'api-qa.merlinpbm.com':
                //console.log('---- Running private qa!');
                env = 'qa';
                break;
            case 'internaldevrx.atlascomplete.local':
            case 'dev.atlascomplete.local':
                //console.log('---- Running dev layer 7!');
                env = 'layer7dev';
                break;
            case 'internalqarx.atlascomplete.local':
            case 'qa.atlascomplete.local':
                //console.log('---- Running qa layer 7!');
                env = 'layer7qa';
                break;
            case 'internaluatrx.atlascomplete.local':
            case 'uat.atlascomplete.local':
                // console.log('---- Running uat layer 7!');
                env = 'layer7uat';
                break;
            case 'rx.atlascomplete.com':
            case 'internalrx.atlascomplete.com':
            case 'secure.atlascomplete.com':
                env = 'prod';
                break;
        }

        return env;
    },

    getEnvironmentReportingURL: function() {
        var env = this.getEnvironmentName();
        var URL = '';

        switch (env) {
            case 'dev':
                //URL = 'http://mirxsql01-dvw/ReportServer_INST01D';
                URL = 'http://SQLRS2014D/ReportServer_INST01D';
                break;
            case 'qa':
                //URL = 'http://mirxsql01-qvw/ReportServer_INST01Q';
                URL = 'http://SQLRS2014Q/ReportServer_INST01Q';
                break;
            case 'uat':
                URL = 'http://SQLRS2014U/ReportServer_INST01U';
                break;
            case 'prod':
                URL = 'http://SQLRS2014P/ReportServer_INST01P';
                break;
            case 'layer7dev':
               // URL = 'http://mirxsql01-dvw/ReportServer_INST01D';
                URL = 'http://SQLRS2014D/ReportServer_INST01D';
                break;
            case 'layer7qa':
               // URL = 'http://mirxsql01-qvw/ReportServer_INST01Q';
                URL = 'http://SQLRS2014Q/ReportServer_INST01Q';
                break;
            case 'layer7uat':
                URL = 'http://SQLRS2014U/ReportServer_INST01U';
                break;
            case 'layer7prod':
                URL = 'http://SQLRS2014P/ReportServer_INST01P';
                break;
        }
        return URL;
    }
});

