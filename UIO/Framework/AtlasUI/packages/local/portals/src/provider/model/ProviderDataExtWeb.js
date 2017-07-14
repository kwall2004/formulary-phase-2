/**
 * Created by c4539 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.model.ProviderDataExtWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'providerId', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'firstName', type: 'string' },
        { name: 'pcp', type: 'string' },
        { name: 'inPlan', type: 'string' },
        { name: 'accepting', type: 'string' },
        { name: 'providerType', type: 'string' },
        { name: 'open', type: 'string' },
        { name: 'specialty', type: 'string' },
        { name: 'billingNpi', type: 'string' },
        { name: 'billingTin', type: 'string' },
        { name: 'servProvTaxonomy', type: 'string' }
    ],

    proxy: {
        url: 'provider/hp/providerdataextweb'
    }
});