/*
 * Last Developer: Chima Duru
 * Date: 03-22-2017
 * Previous Developers: []
 * Origin: MHP Provider - Create New Auth Extension
 * Description: Store for the Saving New Request
 */

Ext.define('Atlas.portals.provider.model.ODCDAuthExtension', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name:"result" , type:"string" },
        { name:"pResult" , type:"number" },
        { name:"pMessage" , type:"string" },
        { name:"pRequestID" , type:"string" }
    ],

    proxy: {
        extraParams: {

        },

        url: 'caremanagement/hp/odcdauthextension'
    }
});
