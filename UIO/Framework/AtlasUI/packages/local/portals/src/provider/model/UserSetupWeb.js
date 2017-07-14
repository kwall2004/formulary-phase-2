/*
 * Last Developer: Srujith Cheruku
 * Date: 11-16-2016
 * Previous Developers: []
 * Origin: Provider - Member 
 * Description: Model for User
 */
Ext.define('Atlas.portals.provider.model.UserSetupWeb', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'system/hp/usersetupweb'
    }
});