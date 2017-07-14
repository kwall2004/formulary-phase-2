Ext.define('Atlas.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Localize.Base',
        'Ext.data.identifier.Uuid',

        'Atlas.view.main.Main',
        'Atlas.view.auth.*',
        'Atlas.view.user.*',
        //<debug>
        'Atlas.view.main.Single', //Included only during development
        //</debug>

        // Wildcard the package files
        // Merlin Modules
        'Atlas.home.*',
        'Atlas.common.*',

        //Hint: If you would like to work on your module only - comment out any other modules below that are not directly used and rebuild development env
        // 'Atlas.admin.*',
        // 'Atlas.formulary.*',
        // 'Atlas.pharmacy.*',
        // 'Atlas.member.*',
        // 'Atlas.prescriber.*',
        // 'Atlas.claims.*',
        // 'Atlas.finance.*',
        // 'Atlas.plan.*',
        // 'Atlas.provider.*',
        // 'Atlas.authorization.*',
        // 'Atlas.letter.*',
        // 'Atlas.grievances.*',
        // 'Atlas.encounter.*',
        // 'Atlas.rebate.*',
        // 'Atlas.casemanagement.*',
        // 'Atlas.fwa.*',
        // 'Atlas.macprice.*',
        // 'Atlas.obiee.*',
        // 'Atlas.reports.*',
        // 'Atlas.portals.*',
        // 'Atlas.benefitplan.*',
        'Atlas.atlasformulary.*'
        // 'Atlas.view.Unknown'
    ],

    name: 'Atlas',

    stores: [],

    controllers: [
        'Atlas.controller.Error',
        'Atlas.controller.Auth',
        'Atlas.controller.Route'
    ],

    init: function () {

        if (window.top == window) {

            //Auth request to get a cookie
            /*
             Ext.Ajax.request({
             url: 'api/security/authenticate',
             method: 'POST',
             success: function(response, opts) {
             var obj = Ext.decode(response.responseText);
             console.dir(obj);
             //this is where we can set the authCookie
             },
             failure: function(response, opts) {
             console.log('server-side failure with status code ' + response.status);
             //this is where we redirect to lock screen
             }
             });
             */
        }
    },

    launch: function () {
        // Set state provider to local storage for all stateful components.
        Ext.state.Manager.setProvider(Ext.create('Ext.state.LocalStorageProvider'));

        // Important security measure below. Single page view will not be created in production.
        var view = 'Main';
        //<debug>
        var view = Ext.singlePage ? 'Single' : 'Main';
        //</debug>

        //silence aria warnings
        Ext.ariaWarn = Ext.emptyFn;
        Ext.fly('css-preloader').destroy();

        //test error messages
        //this.fireEvent('Error:Server','Test');
        //this.fireEvent('Error:Critical','Test');
        //this.fireEvent('Error:Timeout','Test');
        //this.fireEvent('Error','Test');

        Atlas.UUIDgen = new Ext.data.identifier.Uuid;

        Ext.create('Atlas.view.main.' + view);
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
