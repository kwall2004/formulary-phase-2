/*
 * Last Developer: Srujith Cheruku
 * Date: 11-17-2016
 * Previous Developers: []
 * Origin: Provider - Member
 * Description: Store for Member Notify Health Plan
 */
Ext.define('Atlas.portals.provider.model.CONotificationData', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'member/hp/conotificationdata'
    }
});