Ext.define('Atlas.benefitplan.view.configuration.AccountConfigurationController', {
    extend: 'Atlas.benefitplan.view.configuration.ConfigurationController',
    alias: 'controller.benefitplan-accountconfigurationcontroller',
    init: function() {
        this.basicDetailsKey = "AcctSK";
        this.parentDetailsKey = "TenantSK";
        this.basicDetailsParentTitle = "Tenant";
        this.entityType = 30;
        this.entityModel = 'Atlas.benefitplan.model.Account';
        this.XType = 'benefitplan-accountdetails';
        this.ChildXType = 'benefitplan-groupdetails';
        this.ParentXType = 'benefitplan-tenantdetails';
  }
});
