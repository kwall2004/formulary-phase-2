/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Provider Main
 * Description: Provider Main LOB drop Model
 */
Ext.define('Atlas.portals.provider.model.ProviderLobList', {
    extend: 'Atlas.common.model.Base',


    proxy: {
        url: 'provider/hp/providerloblist'
    }
});