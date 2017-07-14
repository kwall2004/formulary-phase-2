Ext.define('Atlas.benefitplan.view.configuration.MainConfigurationController', {
    extend: 'Atlas.benefitplan.view.configuration.ConfigurationController',
    alias: 'controller.benefitplan-mainconfigurationcontroller',
    beforeInit: function(){
        this.getViewModel().set('tenantHierarchyEntityId', this.getView().atlasId);
        this.getViewModel().set('tenantHierarchyEntityType', this.getView().viewtype);
        this.getViewModel().set('rootsk', this.getView().rootsk);
    },
    listen : {
		//listen to events using GlobalEvents
		controller : {
			'*': {
				tenantFamilyCreateCanceled : 'onTenantFamilyCreateCanceled',
				createNewHierarchyElement : 'onCreateNewHierarchyElement',
				closeHierarchyConfiguration : 'onCloseHierarchyConfiguration',
                afterHierarchyTreeRender: 'loadPanel',
                onHierarchyTreeItemClick: 'loadPanel',
                setTenantHierarchyEntityId: 'setTenantHierarchyEntityId'
			}
		}
	},
    loadPanel: function(args) {
        var EntityId = args.EntityId,
            EntityType = args.EntityType,
            RootSK=args.RootSK,
            vm = this.getViewModel();
        if(EntityType != undefined && (EntityType == 10 || EntityType == 20 || EntityType == 30 || EntityType == 40 || EntityType == 50)) {
            Ext.suspendLayouts();
            vm.set('tenantHierarchyEntityId', EntityId);
            vm.set('rootSK', RootSK);
            vm.set('tenantHierarchyEntityType', EntityType);
            var detailPanel = null,
                detailSection = this.getView().getComponent('configuration-detail-section');
            detailSection.removeAll();
            if (EntityType == 10) {
                detailpanel = Ext.create({xtype: 'benefitplan-tenantfamilydetails'});
            } else if (EntityType == 20) {
                detailpanel = Ext.create({xtype: 'benefitplan-tenantdetails'});
            } else if (EntityType == 30) {
                detailpanel = Ext.create({xtype: 'benefitplan-accountdetails'});
            } else if (EntityType == 40) {
                detailpanel = Ext.create({xtype: 'benefitplan-groupdetails'});
            } else if (EntityType == 50) {
                detailpanel = Ext.create({xtype: 'benefitplan-populationgroupdetails'});
            }
            var cont = detailpanel.getController();
            detailSection.add(detailpanel);
            Ext.resumeLayouts(true);
            cont.setEntityId(EntityId, EntityType, RootSK);
            cont.loadData( function() {
                if (EntityType == 40) {
                    cont.loadGroupData();
                }
            });
        } else {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Expected EntityType of 10, 20, 30, 40 or 50',
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
    },
	onTenantFamilyCreateCanceled : function() {
		this.getView().close();
	},
	onCreateNewHierarchyElement: function(args) {
		Ext.suspendLayouts();
		var detailSection = this.getView().getComponent('configuration-detail-section');
		detailSection.removeAll();
		var detailpanel = Ext.create({xtype: args.XType});
		detailSection.add(detailpanel);
        Ext.resumeLayouts(true);
		detailpanel.getController().setEntityId(0);
		detailpanel.getController().ParentSK = args.ParentSK;
		detailpanel.getController().loadData(null, args.EfctvStartDt, args.EfctvEndDt);
	},
	onCloseHierarchyConfiguration: function() {
		this.getView().close();
	},
    setTenantHierarchyEntityId: function(args) {
	    var vm = this.getViewModel();
        vm.set('tenantHierarchyEntityId', args.tenantHierarchyEntityId);
        vm.set('tenantHierarchyEntityType', args.tenantHierarchyEntityType);
        vm.set('rootsk', args.rootSK);
    }
});
