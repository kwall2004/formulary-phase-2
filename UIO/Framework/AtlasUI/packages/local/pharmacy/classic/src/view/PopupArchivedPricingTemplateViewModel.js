/**
 * Created by n6684 on 11/24/2016.
 */

Ext.define('Atlas.authorization.view.PopupArchivedPricingTemplateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pricingtemplateinfo_popuparchivedpricingtemplateviewmodel',
    stores: {
        storepricingdetailtemplatearchive: {
            model: 'Atlas.pharmacy.model.PopupArchivedPricingTemplate',
            autoLoad: false
        },
        storepricingdetailtemplatearchivedate: {
            model: 'Atlas.pharmacy.model.PricingDetailTemplateArchiveDate',
            autoLoad: false
        }
    }
});