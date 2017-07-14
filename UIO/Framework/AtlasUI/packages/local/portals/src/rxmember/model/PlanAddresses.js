Ext.define('Atlas.portals.rxmember.model.PlanAddresses', {
    extend: 'Atlas.common.model.Base',
    
    fields: [
        { name: 'ShowOnPortal', type: 'boolean' },
        { name: 'Email', type: 'string'},
        { name: 'ZipCode', type: 'string'},
        { name: 'latitude', type: 'int'},
        { name: 'Address2', type: 'string'},
        { name: 'SystemID', type: 'int'},
        { name: 'Address1', type: 'string'},
        { name: 'City', type: 'string'},
        { name: 'PlanPhone', type: 'string'},
        { name: 'State', type: 'string'},
        { name: 'WebAddress', type: 'string'},
        { name: 'AddressType', type: 'string'},
        { name: 'Fax', type: 'string'},
        { name: 'PhoneExt', type: 'string'},
        { name: 'longitude', type: 'int'}
    ],

    proxy: {
        url: 'plan/rx/planaddresses'
    }
});