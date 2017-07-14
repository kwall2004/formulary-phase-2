/**
 * Created by n6684 on 5/22/2017.
 */
Ext.define('Atlas.common.model.merlin.serverdatetime',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    // idProperty: 'username',
    fields: [],
    proxy: {
        url: 'system/{0}/serverdatetime'
    }
});