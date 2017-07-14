Ext.define('Atlas.benefitplan.view.tenanthierarchy.TreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-tenanthierarchycontroller',
    refs: [{
        ref: 'viewport',
        selector: 'viewport'
    }],
	init: function() {
    this.loadTree();
	},
  reloadTree: function (EntityId, EntityType, RootSK) {
      var me = this;
      this.loadTree(EntityId, EntityType, RootSK);
      this.getViewModel().getStore('hierarchytree').load(function(){
          if(EntityId != 'undefined' && EntityType!= 'undefined') {
              me.selectTreeNode({EntityId: EntityId, EntityType: EntityType});
          }
      });
  },
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                selectTreeNode: 'selectTreeNode',
                checkTreeActive:'checkTreeActive'
            }
        }
    },

    selectTreeNode: function(args) {
        var entityId = args.EntityId,
        entityType = args.EntityType,
        tree=this.getView().down('[itemId=benefitplan-tenanthierarchy-tree]');
        var myTreeStore= tree.getStore();
        myTreeStore.filter(this.filter);
        this.checkTreeActive(myTreeStore);
        var thenode = null;
        myTreeStore.each(function(record){
            if(record.get('EntityType') == entityType && record.get('EntitySK') == entityId) {
                thenode = record;
            }
        });
         if(thenode) {
             tree.expandPath(thenode.getPath());
             //scroll the node into view
             var thetreenode = tree.view.getNodeByRecord(thenode);
             if(!thetreenode) {
                 thetreenode = tree.view.getNodeById(thenode.id);
             }
             if(thetreenode) {
                 thetreenode.scrollIntoView();
             }
             //select the node in the tree
             tree.getSelectionModel().select(thenode, false, true);
         }
    },
    checkTreeActive: function(store){
        if(store != undefined && this.RootSK != 0){
            var viewPort = Ext.first('viewport');
            if(store.data.length == 0){
                viewPort.down("[itemId='detailsection']").setDisabled(true);
                viewPort.down("[itemId='addresssection']").setDisabled(true);
                if(viewPort.down("[itemId='BCNGrid']")!=undefined){
                    viewPort.down("[itemId='BCNGrid']").setDisabled(true);

                }
                else if(viewPort.down("[itemId='populationGroupPlanBenefitPackageSummaryGrid']")!=undefined){
                    viewPort.down("[itemId='populationGroupPlanBenefitPackageSummaryGrid']").setDisabled(true);
                }
                viewPort.down("[itemId='SaveButton']").setDisabled(true);
                viewPort.down("[itemId='ViewContactsButton']").setDisabled(true);
                viewPort.down("[itemId='CancelButton']").setDisabled(true);
                if(viewPort.down("[itemId='communicationsBtn']")!=undefined){
                    viewPort.down("[itemId='communicationsBtn']").setDisabled(true);
                }
                Ext.Msg.show({
                    title: 'Alert',
                    msg: 'No items to display',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });


            }else{
                viewPort.down("[itemId='detailsection']").setDisabled(false);
                viewPort.down("[itemId='addresssection']").setDisabled(false);
                if(viewPort.down("[itemId='BCNGrid']")!=undefined){
                    viewPort.down("[itemId='BCNGrid']").setDisabled(false);
                }
                else if(viewPort.down("[itemId='populationGroupPlanBenefitPackageSummaryGrid']")!=undefined){
                    viewPort.down("[itemId='populationGroupPlanBenefitPackageSummaryGrid']").setDisabled(false);
                }
                viewPort.down("[itemId='SaveButton']").setDisabled(false);
                viewPort.down("[itemId='ViewContactsButton']").setDisabled(false);
                viewPort.down("[itemId='CancelButton']").setDisabled(false);
                if(viewPort.down("[itemId='communicationsBtn']")!=undefined){
                    viewPort.down("[itemId='communicationsBtn']").setDisabled(false);
                }
            }
        }

    },
    loadTree: function(EntityId, EntityType, RootSK){
      var store = this.getViewModel().getStore('hierarchytree');
      if(EntityId != undefined) {
        this.entityId = EntityId;
        this.entityType = EntityType;
        this.RootSK = RootSK;
      } else {
        this.entityId = this.getViewModel().get('tenantHierarchyEntityId');
        this.entityType = this.getViewModel().get('tenantHierarchyEntityType');
        this.RootSK = this.getViewModel().get('rootsk');
      }
       // if(this.RootSK != 0) {
        var thisController = this;
        store.getProxy().setExtraParam('rootSK', this.RootSK);
        var count = 0;
        this.filter = new Ext.util.Filter({
            filterFn: function (item) {
                count++;
                var re = new RegExp(thisController.getView().getComponent('tenant-family-tree-search').getValue(), 'gi');
                var activeflag = thisController.getView().getComponent('tenant-family-tree-active').checked;
                if (activeflag) {
                    return (item.data.EntityDescription != undefined) && (thisController.getView().getComponent('tenant-family-tree-search').getValue() == '' || (item.data.EntityDescription.match(re) != null)) && item.data.Active == true;
                } else {
                    return (item.data.EntityDescription != undefined) && (thisController.getView().getComponent('tenant-family-tree-search').getValue() == '' || (item.data.EntityDescription.match(re) != null));
                }
                if(count == store.data.items.length){
                    thisController.checkTreeActive(store);
                }
            }
        });
        //}
  },
  afterTreeRender: function(thisTree){
      this.fireEvent('afterHierarchyTreeRender',{
          EntityId: this.entityId,
          EntityType: this.entityType,
          RootSK: this.RootSK
      });
  },
    /**
     * Filters the tree according to whether the checkbox is checked.
     */
    onActiveChange: function (checkbox, isActive) {
		    searchHierarchy();
    },
    onTreeItemClick: function (tree, record, item) {
        this.fireEvent('onHierarchyTreeItemClick',{
            EntityId: tree.getSelectionModel().getSelection()[0].get('EntitySK'),
            EntityType: tree.getSelectionModel().getSelection()[0].get('EntityType'),
            RootSK: tree.getSelectionModel().getSelection()[0].get('RootSK')
        });

    },
	searchHierarchy: function(){
		var store = this.getViewModel().getStore('hierarchytree');
        store.filter(this.filter);
        this.checkTreeActive(store);
	},
	searchHierarchyKeyUp: function(event, item, eOpts){
        if(event.keyCode === 13) {
            this.searchHierarchy();
        }
    }
});
