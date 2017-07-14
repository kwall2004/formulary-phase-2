Ext.define('Atlas.benefitplan.view.configuration.TenantConfigurationController', {
    extend: 'Atlas.benefitplan.view.configuration.ConfigurationController',
    alias: 'controller.benefitplan-tenantconfigurationcontroller',
    init: function() {
        this.basicDetailsKey = "TenantSK";
        this.parentDetailsKey = "TenantFamSK";
        this.basicDetailsParentTitle = "Tenant Family";
        this.entityType = 20;
        this.entityModel = 'Atlas.benefitplan.model.Tenant';
        this.XType = 'benefitplan-tenantdetails';
        this.ChildXType = 'benefitplan-accountdetails';
        this.ParentXType = 'benefitplan-tenantfamilydetails';
    }
});
