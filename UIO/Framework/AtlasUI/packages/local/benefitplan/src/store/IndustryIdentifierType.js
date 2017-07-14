/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.store.IndustryIdentifierType', {
    alias: 'store.industryIdentifierType-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.IndustryIdentifierType',
    sorters: 'Text',
    autoLoad: true
});