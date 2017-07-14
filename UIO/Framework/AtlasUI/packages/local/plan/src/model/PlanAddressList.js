/**
 * Created by S4505 on 11/13/2016.
 */
Ext.define('Atlas.plan.model.PlanAddressList', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'AddressType', type: 'string'},
        {name: 'Address1', type: 'string'},
        {name: 'Address2', type: 'string'},
        {name: 'City', type: 'string'},
        {name: 'State', type: 'string'},
        {name: 'ZipCode', type: 'zipcode'},  //validator is on this type
        {name: 'PlanPhone', type: 'string'},
        {name: 'Fax', type: 'string'},
        {name: 'PhoneExt', type: 'string'},
        {name: 'WebAddress', type: 'string'},
        {name: 'Email', type: 'string'},
        {name: 'ShowOnPortal', type: 'boolean'}
    ],
    proxy: {
        url: 'plan/{0}/planaddresses'
    }
});