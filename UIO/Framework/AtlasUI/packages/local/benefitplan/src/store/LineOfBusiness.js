/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.store.LineOfBusiness', {
    alias: 'store.benefitplan-lob-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.LineOfBusiness',
    sorters: 'lobName',
    autoLoad: true
});