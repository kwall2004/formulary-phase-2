Ext.define('Atlas.view.main.MainBaseRouteController', {
    extend: 'Ext.app.ViewController',

    // bool if we're actively engaged in routing so we don't spawn new routes mid-route
    processingRoute: false,

    //used to keep track of state
    lastRoute: null,

    routes: {

        //Routes are handled in a a first match case, so we organize them in most to least specific


        //3rd level module with  module with Id with / and without
        ':client/:sourcepackage/:app/:id/:appsection': {
            before: 'onRouteDoAuth',
            action: 'processRoute'
        },
        ':client/:sourcepackage/:app/:id/:appsection/': {
            before: 'onRouteDoAuth',
            action: 'processRoute'
        },


        //package module with Id using default datasource with / and without
        ':client/:sourcepackage/:app/:id': {
            before: 'onRouteDoAuth',
            action: 'processRoute'
        },
        ':client/:sourcepackage/:app/:id/': {
            before: 'onRouteDoAuth',
            action: 'processRoute'
        },


        //package module without Id with / and without
        ':client/:sourcepackage/:app/': {
            before: 'onRouteDoAuth',
            action: 'processRoute'
        },
        ':client/:sourcepackage/:app': {
            before: 'onRouteDoAuth',
            action: 'processRoute'
        },

        //note: since all packages should route to an app this is likely not a valid pattern for routes
        //package module without Id with / and without

         ':client/:sourcepackage': {
         before: 'onRouteDoAuth',
         action: 'processRoute'
         },
         ':client/:sourcepackage/': {
         before: 'onRouteDoAuth',
         action: 'processRoute'
         },



        //package base with and without /
        ':client/': {
            before: 'onRouteDoAuth',
            action: 'processRoute'
        },
        ':client': {
            before: 'onRouteDoAuth',
            action: 'processRoute'
        }

    },

    init: function(){
       // console.log (Ext.util.History.getToken());

        var token = Ext.util.History.getToken();
        this.redirectTo(token, true);
    },

    onSubComponentRedirect: function (origin, hash) {
        this.redirectTo(hash);
        this.processingRoute = false;
    },

    onUnmatchedRoute: function (hash) {
        var me = this;
        // me.fireEvent('authorize');
        this.processRoute('home');
        this.processingRoute = false;
    }

});
