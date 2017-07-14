Ext.define('Atlas.atlasformulary.view.common.HierarchyTreePanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.hierarchytreepanel',
  layout: 'fit',

  controller: {
    init: function () {
      this.getView().configure();
    },

    onLoad: function () {
      this.getView().unmask();
    }
  },

  viewModel: {
    stores: {
      etc: {
        type: 'etctree',
        listeners: {
          load: 'onLoad'
        }
      },
      gpi: {
        type: 'gpitree',
        listeners: {
          load: 'onLoad'
        }
      }
    }
  },

  configure: function () {
    var vm = this.getViewModel(),
      tree = vm.get('hierarchyTreeSingleSelect') ? this.down('#singleselecttree') : this.down('#multiselecttree');

    this.down('toolbar').setVisible(!vm.get('drugRefDbName'));
    this.down('#multiselecttree').setVisible(!vm.get('hierarchyTreeSingleSelect'));
    this.down('#singleselecttree').setVisible(vm.get('hierarchyTreeSingleSelect'));

    if (!vm.get('dataSource') || vm.get('dataSource') === 'fdb') {
      tree.setStore(vm.getStore('etc'));
      tree.down('treecolumn').setText('ETC Hierarchy');
    } else if (vm.get('dataSource') === 'medispan') {
      tree.setStore(vm.getStore('gpi'));
      tree.down('treecolumn').setText('GPI Hierarchy');
    } else {
      Ext.raise({
        msg: 'Invalid source.',
        source: vm.get('dataSource')
      });
    }
  },

  getStore: function () {
    var vm = this.getViewModel(),
      tree = vm.get('hierarchyTreeSingleSelect') ? this.down('#singleselecttree') : this.down('#multiselecttree');

    return tree.getStore();
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      layout: 'center',
      items: [
        {
          xtype: 'segmentedbutton',
          allowMultiple: false,
          items: [
            {
              itemId: 'etcButton',
              text: 'ETC'
            },
            {
              itemId: 'gpiButton',
              text: 'GPI'
            }
          ],
          bubbleEvents: ['toggle']
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'hierarchytree',
      itemId: 'multiselecttree',
      multiSelect: true,
      bubbleEvents: ['selectionChange']
    },
    {
      xtype: 'hierarchytree',
      itemId: 'singleselecttree',
      multiSelect: false,
      bubbleEvents: ['select'],
      hidden: true
    }
  ]
});