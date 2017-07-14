Ext.define('Atlas.benefitplan.view.tenanthierarchy.Tree', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.benefitplan-tenanthierarchy-tree',
	layout: 'border',
  	atlasId: 0,
  	height:'100%',
  	controller: 'benefitplan-tenanthierarchycontroller',
	requires: [
		'Atlas.benefitplan.view.CustomTrigger'
	],
  	viewModel: {
      	stores: {
          	hierarchytree: {
              	type:'tree',
              	id: 'hierarchytree',
              	model: 'Atlas.benefitplan.model.TenantHierarchyTree',
				filterer: 'bottomup',
				autoload: false
          	}
      	}
  	},
	items: [
		{
			region: 'north',
			xtype: 'searchtenanthierarchytrigger',
			emptyText: 'search',
			itemId: 'tenant-family-tree-search'
		},
		{
			region: 'center',
			xtype: 'panel',
      	itemId: 'hierarchytreepanel',
			scrollable: true,
			width: '100%',
			height: '100%',
			items: [
				{
					itemId: 'benefitplan-tenanthierarchy-tree',
					rootVisible: false,
					xtype: 'treepanel',
					plugins: 'gridfilters',
					emptyText: 'No Matching Records',
					bind:{
						store: '{hierarchytree}'
					},
					columns: [{
						xtype: 'treecolumn',
						header: 'Name',
						dataIndex: 'name',
						flex: 1
					}],
					listeners: {
						itemclick: 'onTreeItemClick',
						afterrender: 'afterTreeRender'
					}
				}
			]
		},
		{
			region: 'south',
			xtype: 'checkbox',
			itemId: 'tenant-family-tree-active',
			boxLabel: 'View only active',
			name: 'active',
			reference: 'active',

			hideLabel: true,
			checked: true,
			listeners: {
				change: 'searchHierarchy'
			}
		}
	]
});
