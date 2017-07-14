/**
 * Created by S4505 on 4/10/2017.
 */

Ext.define('Atlas.casemanagement.store.casedetails.LTCDetails',{
    alias: 'store.casemanagement-ltcdetails',
    extend: 'Ext.data.Store',
    model: 'Atlas.casemanagement.model.LTCModel',
    autoLoad: false,
    proxy: {
        type:'layer7',
        url: 'member/{0}/mtmcasedetails'
    }

});
