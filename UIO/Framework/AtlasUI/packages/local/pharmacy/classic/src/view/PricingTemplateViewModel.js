/**
 * Created by n6684 on 11/23/2016.
 */

Ext.define('Atlas.authorization.view.PricingTemplateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pricingtemplateviewmodel',

    stores: {
        storePricingTemplateServiceTypes: {
            model: 'Atlas.pharmacy.model.PricingTemplateServiceTypes',
            autoLoad: false
        }
    }
});

