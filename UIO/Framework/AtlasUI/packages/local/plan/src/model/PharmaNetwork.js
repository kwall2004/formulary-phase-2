/**
 * Created by b2352 on 12/19/2016.
 */


Ext.define('Atlas.plan.model.PharmaNetwork',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'systemID',
    fields: [
        {name: 'systemID',  type: 'string'},
        {name: 'NetworkID',  type: 'number'},
        {name: 'NetworkDescription',  type: 'string'}
    ],
    proxy: {
        url: 'pharmacy/{0}/networkmaster'
    }
});