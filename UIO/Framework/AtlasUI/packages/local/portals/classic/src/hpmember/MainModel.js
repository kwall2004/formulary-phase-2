/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - Home
 * Description: Model for the Home Page
 */
Ext.define('Atlas.portals.view.hpmember.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.portalsMemberMHPMainModel',

    stores: {
       welcomeMessageStore: {
            model: 'Atlas.portals.hpmember.model.PortalDynamicDataWeb'
        }
    }
});