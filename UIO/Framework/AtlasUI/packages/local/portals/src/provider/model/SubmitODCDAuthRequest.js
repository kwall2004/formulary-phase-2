/*
 * Last Developer: Srujith Cheruku
 * Date: 12-08-2016
 * Previous Developers: []
 * Origin: MHP Provider - Create New Request
 * Description: Store for the Saving New Request
 */

Ext.define('Atlas.portals.provider.model.SubmitODCDAuthRequest', {
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

        url: 'caremanagement/hp/submitODCDAuthRequest'
    }
});
