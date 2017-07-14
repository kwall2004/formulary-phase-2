Ext.define('Atlas.benefitplan.view.configuration.TenantFamilyConfigurationController', {
    extend: 'Atlas.benefitplan.view.configuration.ConfigurationController',
    alias: 'controller.benefitplan-tenantfamilyconfigurationcontroller',
    init: function() {
        this.basicDetailsKey = "TenantFamSK";
        this.parentDetailsKey = "";
        this.basicDetailsParentTitle = "";
        this.entityType = 10;
        this.entityModel = 'Atlas.benefitplan.model.TenantFamily';
        this.XType = 'benefitplan-tenantfamilydetails';
        this.ChildXType = 'benefitplan-tenantdetails';
        this.ParentXType = '';
	}
});
