Ext.define('Atlas.benefitplan.view.configuration.PopulationGroupConfigurationController', {
    extend: 'Atlas.benefitplan.view.configuration.ConfigurationController',
    alias: 'controller.benefitplan-populationgroupconfigurationcontroller',
    init: function() {
        this.basicDetailsKey = "PopGrpSK";
        this.parentDetailsKey = "GrpSK";
        this.basicDetailsParentTitle = "Group";
        this.entityType = 50;
        this.entityModel = 'Atlas.benefitplan.model.PopulationGroup';
        this.XType = 'benefitplan-populationgroupdetails';
        this.ChildXType = '';
        this.ParentXType = 'benefitplan-groupdetails';
    }
});
