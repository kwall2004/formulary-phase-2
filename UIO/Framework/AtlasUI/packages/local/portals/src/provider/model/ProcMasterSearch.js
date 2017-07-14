/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Request - Procedure Search
 * Description: Procedure search 
 */
Ext.define('Atlas.portals.provider.model.ProcMasterSearch', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'member/hp/procmastersearch'
    }
});