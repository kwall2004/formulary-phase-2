/**
 * Created by S4505 on 10/27/2016.
 */

// This is a Store Created to Load the Validation Messages
Ext.define('Atlas.plan.store.ValidationErrorInformation',{
    alias: 'store.plan-validationerrorinformation',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.ValidationErrorInformation',
    autoLoad: false

});
